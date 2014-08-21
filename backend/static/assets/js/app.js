var ContactManager = new Marionette.Application();

ContactManager.addRegions({
  mainRegion: "#main-region",
  dialogRegion: "#dialog-region"
});

ContactManager.navigate = function(route,  options){
  options || (options = {});
  Backbone.history.navigate(route, options);
};

ContactManager.getCurrentRoute = function(){
  return Backbone.history.fragment
};

ContactManager.on("start", function(){
  if(Backbone.history){
    Backbone.history.start();

    if(this.getCurrentRoute() === ""){
      ContactManager.trigger("contacts:list");
    }
  }
});

ContactManager.module('articles',function(Entities, ContactManager, Backbone, Marionette, $, _){

     var Article_v = Marionette.ItemView.extend({
        template:"#article-item"
    });
    var empty_view = Marionette.ItemView.extend({
        template:"#empty-article-item"
    });
    var loading_view = Marionette.ItemView.extend({
        template:"#loading-article-item"
    });
    Articles_v = Marionette.CollectionView.extend({
        childView:Article_v,
        emptyView:empty_view
    });
    var Article = Backbone.Model.extend({});
    var Articles = Backbone.Collection.extend({
        model:Article

    });
//    var a1 = new  Article({title:'t1'});
//    var a2 = new  Article({title:'t2'});
//    var a3 = new  Article({title:'t3'});

//    var arts = new Articles([a1, a2, a3]);
    //should be 'urlRoot' and nor 'url', otherwise delete request will be
    //DELETE /url instead of DELETE /url/id
    Entities.M=Backbone.Model.extend({description:null,urlRoot:"/arts"});
    Entities.C=Backbone.Collection.extend({model:Entities.M,url:"/arts"});
    Entities.c=new Entities.C();

    //global timeout
//    Entities.c.fetch();
//    $.ajaxSetup({
//        timeout: 5000
//    });
    var defer = $.Deferred();
    setTimeout(function(){
        Entities.c.fetch({
            success: function(data){
                defer.resolve(data);
            },
            error: function(data){
                console.log('error on HTTP request')
                defer.resolve(undefined);
            },
            //timeout for http requests
            timeout: 5000

        });
    }, 2000);
//    var data= defer.promise();
//    Entities.c.add(data);

    Entities.c.on('request',function(){
        Entities.articles_v.emptyView=loading_view;
        Entities.articles_v.render();
        console.log('request event...')
    });
    Entities.articles_v = new Articles_v({collection:Entities.c});
    //called only on collection create and not on model save
    Entities.c.on('add',function(model,collection){
       console.log('added model');
    });
    //Entities.articles_v.collection.add({titles:'123'});

    /*
    M=Backbone.Model.extend({});
    C=Backbone.Collection.extend({model:M,url:"/arts"});
    c=new C();
    c.fetch();
    */

    /*

    //create model insta
    var ma1=new ContactManager.articles.M({"title":"ta1","description":"da"})
    //ask collection to create new model
    ContactManager.articles.c.create(ma1)
    //add one more to same collection
    ma1.url='/arts'
    ma1.save()

    //update the model
     m0=ContactManager.articles.c.get(0)
     m0.set('title','t10')
     m0.isNew() //false
     m0.save()

     //detail a model
     m=new ContactManager.articles.M({id:1}).fetch()
     json=m.responseJson
     test=m.responseText
    */
    ContactManager.addRegions({newApp: "#newApp"});
    ContactManager.newApp.show(Entities.articles_v);
    ContactManager.addInitializer(function(){});
});


