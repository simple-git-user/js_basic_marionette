from wsgiref.simple_server import make_server
from pyramid.config import Configurator
from pyramid.response import Response
import json
from memory_profiler import profile
import yaml

def hello_world(request):
	arts=yaml.load(open('arts.yaml','r'))
	return Response(json.dumps(arts))

def post_article(request):
    new_art = request.json
    arts=yaml.load(open('arts.yaml','r'))
    try:
        if not hasattr(arts,'__iter__'):
            arts=[]
        elif len(arts)<=0:
            arts=[]
    except:
        arts=[]
    if arts==None:
        arts=[]

    new_art['id']=len(arts)
    arts.append(new_art)
    yaml.dump(arts,open('arts.yaml','w'))
    return Response('')

def put_article(request):
    updated_art = request.json
    arts=yaml.load(open('arts.yaml','r'))
    if not hasattr(arts,'__iter__'):
        arts=[]
    elif len(arts)<=0:
        arts=[]
    [arts.pop(e) for e in arts if e['id']==updated_art['id']]
    arts.append(updated_art)
    yaml.dump(arts,open('arts.yaml','w'))
    return Response('')

def get_article(request):
    pass
def delete_article(request):
    pass

if __name__ == '__main__':
    config = Configurator()
    config.add_route('hello', pattern='/arts',request_method='GET')
    config.add_route('post_arts', pattern='/arts',request_method='POST')
    config.add_view(hello_world, route_name='hello')
    config.add_view(post_article, route_name='post_arts')
    config.add_static_view('mario','mario')
    app = config.make_wsgi_app()
    server = make_server('0.0.0.0', 8080, app)
    server.serve_forever()
