# from pymongo import MongoClient
import pymongo,json
from bson import  json_util
client = pymongo.MongoClient('mongodb://localhost:27017')
# client = MongoClient('mongodb://localhost:27017/')
dblist = client.list_database_names()
mydb = client['mydb']
mycollection = mydb['test']
result=[]
for x in mycollection.find():
    result.append(x)
data = json_util.dumps(result)
print(data)
# if 'blog' in dblist:
#     print('exist')
# else:
#     print('no')