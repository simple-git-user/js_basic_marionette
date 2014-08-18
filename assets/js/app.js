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
    var Articles_v = Marionette.CollectionView.extend({
        childView:Article_v
    });
    var Article = Backbone.Model.extend({});
    var Articles = Backbone.Collection.extend({
        model:Article
    });
    var a1 = new  Article({title:'t1'});
    var a2 = new  Article({title:'t2'});
    var a3 = new  Article({title:'t3'});

    var arts = new Articles([a1, a2, a3]);

    Entities.articles_v = new Articles_v({collection:arts});
    Entities.articles_v.collection.add({titles:'123'});

    /*
    M=Backbone.Model.extend({});
    C=Backbone.Collection.extend({model:M,url:"/arts"});
    c=new C();
    c.fetch();
    */
    ContactManager.addRegions({newApp: "#newApp"});
    ContactManager.newApp.show(articles_v);
    ContactManager.addInitializer(function(){});
});


