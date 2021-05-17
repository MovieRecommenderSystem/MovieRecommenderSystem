from flask import Flask, request, jsonify
from sklearn.metrics.pairwise import cosine_similarity
from ast import literal_eval
import pandas as pd
import numpy as np
import pickle
import time
import os
app = Flask(__name__)
# app.config['JSON_SORT_KEYS'] = False

smd=pickle.load(open('Small_Movies.pickle', 'rb'))
count_matrix=pickle.load(open('Count_Matrix.pickle', 'rb'))
md = pd.read_csv('movies_metadata.csv',low_memory=False)
md['genres']=md['genres'].fillna('[]').apply(literal_eval).apply(lambda x: [i['name'] for i in x] if isinstance(x,list) else [])
md['original_language']=md['original_language'].astype('str')
md=md[md['id'].notnull()]

@app.route('/apiRecommender/simple', methods=['POST'])
def process_request():
    i = time.time()
    global md
    user_input = request.get_json()
    genres = user_input['GENRE']
    # print(genres)
    genres = pd.DataFrame(genres)
    languages = user_input['LANG']
    languages = pd.DataFrame(languages)
    s = md.apply(lambda x: pd.Series(x['genres']), axis=1).stack(
    ).reset_index(level=1, drop=True)
    s.name = 'genre'
    gen_md = md.drop('genres', axis=1).join(s)
#     print(gen_md["title"].head())
    genres = genres[0]
    languages = languages[0]
    print(genres)
    df = gen_md[gen_md['genre'].isin(genres)]
    df = df[df['original_language'].isin(languages)]
    SR = md[md['id'].isin(df['id'])]
    vote_counts_SR = SR[SR['vote_count'].notnull()]['vote_count'].astype('int')
    vote_averages_SR = SR[SR['vote_average'].notnull()
                          ]['vote_average'].astype('int')
    C_SR = vote_averages_SR.mean()
    m_SR = vote_counts_SR.quantile(0.90)
    qualified_SR = SR[(SR['vote_count'] >= m_SR) & (
        SR['vote_count'].notnull()) & (SR['vote_average'].notnull())]
    qualified_SR['vote_count'] = qualified_SR['vote_count'].astype('int')
    qualified_SR['vote_average'] = qualified_SR['vote_average'].astype('int')
    qualified_SR['wr'] = ((qualified_SR['vote_count']*qualified_SR['vote_average']
                           )+(m_SR*C_SR))/(qualified_SR['vote_count']+m_SR)
    qualified_SR = qualified_SR.sort_values('wr', ascending=False)
    # This line was added
    names_list = qualified_SR[['original_title']].head(10).values.tolist()
    release_date = qualified_SR[['release_date']].head(10).values.tolist()
    names=[]
    answer = qualified_SR[['id']].head(10).values.tolist()
    
    answer = list(np.concatenate(answer).flat)
    release_date = list(np.concatenate(release_date).flat)
    ## 
    for tr in names_list:
        names.append(tr[0])
    # changed string list to integer
    print(names)
    answer = list(map(int, answer))
    json_dict = {"result_id": answer, "result_name": names,"year":release_date}
    f = time.time()
    print(f-i)
    return jsonify(json_dict)

@app.route('/apiRecommender/content', methods=['POST'])
def process_request2():

    #Parse received JSON request
    user_input = request.get_json()
    tmdb = user_input['TMDB']
    try:
        IDX=smd.index[smd['id']==tmdb][0]
    except:
        return "NA"
    cos_sim=cosine_similarity(count_matrix[IDX],count_matrix).flatten()
    sim_scores=list(enumerate(cos_sim))
    sim_scores=sorted(sim_scores, key=lambda x:x[1], reverse=True)
    sim_scores=sim_scores[1:6]
    response = {'result': [smd.iloc[t_vect[0]].loc["id"] for t_vect in sim_scores]}
    response2 = {'result_name': [smd.iloc[t_vect[0]].loc["original_title"] for t_vect in sim_scores]}
    response = {"response": list(map(int,response["result"])),"name": list(map(str,response2["result_name"]))}
    return jsonify(response)

if __name__ == '__main__':
    # Bind to PORT if defined, otherwise default to 5000.
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
