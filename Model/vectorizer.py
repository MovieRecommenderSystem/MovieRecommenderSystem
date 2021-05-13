import numpy as np # linear algebra
import pandas as pd # data processing, CSV file I/O (e.g. pd.read_csv)
import os
%matplotlib inline
import matplotlib.pyplot as plt
import seaborn as sns
from scipy import stats
from ast import literal_eval
from sklearn.feature_extraction.text import TfidfVectorizer, CountVectorizer
from sklearn.metrics.pairwise import linear_kernel, cosine_similarity
from nltk.stem.snowball import SnowballStemmer
from nltk.stem.wordnet import WordNetLemmatizer
from nltk.corpus import wordnet

pd.options.display.max_columns=None
#pd.set_option('display.max_colwidth', None)

import warnings; warnings.simplefilter('ignore')
from tabulate import tabulate
md = pd.read_csv('movies_metadata.csv')
md=md[md['imdb_id'].notnull()]
md['genres']=md['genres'].fillna('[]').apply(literal_eval).apply(lambda x: [i['name'] for i in x] if isinstance(x,list) else [])
credits=pd.read_csv('dataset/credits.csv')
keywords=pd.read_csv('keywords.csv')
md=md.drop([19730, 29503, 35587])
md['id']=md['id'].astype('int')
keywords['id']=keywords['id'].astype('int')
credits['id']=credits['id'].astype('int')
md=md.merge(credits,on='id')
md=md.merge(keywords,on='id')
md['cast']=md['cast'].apply(literal_eval)
md['keywords']=md['keywords'].apply(literal_eval)
md['crew']=md['crew'].apply(literal_eval)
md['cast']=md['cast'].apply(lambda x: [i['name'] for i in x] if isinstance(x,list) else[])
md['cast']=md['cast'].apply(lambda x: x[:4] if len(x)>=4 else x)
md['keywords']=md['keywords'].apply(lambda x: [i['name'] for i in x] if isinstance(x,list) else[])
md=md[md['imdb_id'].notnull()]
def get_director(x):
    for i in x:
        if i['job']=='Director':
            return i['name']
        return np.nan
md['director']=md['crew'].apply(get_director)
md['cast']=md['cast'].apply(lambda x: [str.lower(i.replace(" ","")) for i in x])
md['director']=md['director'].astype('str').apply(lambda x: str.lower(x.replace(" ","")))
s=md.apply(lambda x: pd.Series(x['keywords']),axis=1).stack().reset_index(level=1,drop=True)
s=s.value_counts()
s=s[s>1]
stemmer=SnowballStemmer('english')
def filter_keywords(x):
    words=[]
    for i in x:
        if i in s:
            words.append(i)
    return words
md['original_language']=md['original_language'].astype('str')
md['ol']=md['original_language']
md['keywords']=md['keywords'].apply(filter_keywords)
md['keywords']=md['keywords'].apply(lambda x: [stemmer.stem(i) for i in x])
md['keywords']=md['keywords'].apply(lambda x: [str.lower(i.replace(" ","")) for i in x])
md['director']=md['director'].apply(lambda x: [x,x,x])
md['original_language']=md['original_language'].apply(lambda x: [x,x])
md['soup']=md['keywords']+md['cast']+md['director']+md['genres']+md['original_language']
md['soup']=md['soup'].apply(lambda x: ' '.join(x))
dataset_small=pd.read_csv('links_small.csv')
dataset_small=dataset_small[dataset_small['tmdbId'].notnull()]['tmdbId'].astype('int')
smd=md[md['id'].isin(dataset_small)]
count=CountVectorizer(analyzer='word',ngram_range=(1,2),min_df=0,stop_words='english')
count_matrix=count.fit_transform(smd['soup'])
cosine_sim=cosine_similarity(count_matrix,count_matrix)
smd=smd.reset_index()
import pickle
pickle.dump(count_matrix, open('Count_Matrix.pickle', 'wb'))
pickle.dump(smd, open('Small_Movies.pickle', 'wb'))
