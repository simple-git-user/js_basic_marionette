ContactManager.module('articles',function(Entities, ContactManager, Backbone, Marionette, $, _){

    Entities.Article_v = Marionette.ItemView.extend({
                    template:"#article-item"
    });
    Entities.Articles_v = Marionette.CollectionView.extend({
                    tagName:"ol",
                    childView:Article_v
    });
    Entities.Article = Backbone.model.extent({});
    Entities.Articles = Backbone.collection.extent({
        model:Article
    });
    var a1 = new  Entities.Article({title:'t1'});
    var a2 = new  Entities.Article({title:'t2'});
    var a3 = new  Entities.Article({title:'t3'});

    var arts = new Entities.Articles([a1, a2, a3]);

    var articles_v = new Entities.Articles_v({collection:arts});

    ContactManager.addRegion({newApp: "#newApp"});
    ContactManager.newApp.show(articles_v);
    ContactManager.addInitializer(function(){});
});


