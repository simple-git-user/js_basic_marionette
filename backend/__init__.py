from wsgiref.simple_server import make_server
from pyramid.config import Configurator
from pyramid.response import Response
import json
from memory_profiler import profile
import yaml


def list_articles(request):
    arts = yaml.load(open('arts.yaml', 'r'))
    return Response(json.dumps(arts))

def detail_article(request):
    art_id=int(request.matchdict.get('id'))
    arts = yaml.load(open('arts.yaml', 'r'))
    art =  [e for e in arts if e['id']==art_id]
    if len(art)>0:
        return Response(json.dumps(art[0]))
    return Response('')


def post_article(request):
    new_art = request.json
    arts = yaml.load(open('arts.yaml', 'r'))
    try:
        if not hasattr(arts, '__iter__'):
            arts = []
        elif len(arts) <= 0:
            arts = []
    except:
        arts = []
    if arts == None:
        arts = []

    new_art['id'] = len(arts)
    arts.append(new_art)
    yaml.dump(arts, open('arts.yaml', 'w'))
    return Response('')


def put_article(request):
    art_id=int(request.matchdict.get('id'))
    updated_art = request.json
    arts = yaml.load(open('arts.yaml', 'r'))
    try:
        if not hasattr(arts, '__iter__'):
            arts = []
        elif len(arts) <= 0:
            arts = []
    except:
        arts = []
    if arts == None:
        arts = []
    [arts.remove(e) for e in arts if e['id'] == art_id]
    arts.append(updated_art)
    yaml.dump(arts, open('arts.yaml', 'w'))
    return Response('')


def get_article(request):
    pass


def delete_article(request):
    del_id = int(request.matchdict.get('id'))
    arts = yaml.load(open('arts.yaml', 'r'))
    try:
        if not hasattr(arts, '__iter__'):
            arts = []
        elif len(arts) <= 0:
            arts = []
    except:
        arts = []
    if arts == None:
        arts = []
    [arts.remove(e) for e in arts if e['id'] == del_id]
    yaml.dump(arts, open('arts.yaml', 'w'))
    return Response('')


def main(global_config, **settings):
    config = Configurator()
    config.add_route('hello', pattern='/arts', request_method='GET')
    config.add_route('post_arts', pattern='/arts', request_method='POST')
    config.add_route('put_arts', pattern='/arts/{id}', request_method='PUT')
    config.add_route('delete_art', pattern='/arts/{id}', request_method='DELETE')
    config.add_route('detail_art', pattern='/arts/{id}', request_method='GET')
    config.add_view(list_articles, route_name='hello')
    config.add_view(post_article, route_name='post_arts')
    config.add_view(put_article, route_name='put_arts')
    config.add_view(delete_article, route_name='delete_art')
    config.add_view(detail_article, route_name='detail_art')
    config.add_static_view('static', 'backend:/static')
    app = config.make_wsgi_app()
    server = make_server('0.0.0.0', 8080, app)
    server.serve_forever()
