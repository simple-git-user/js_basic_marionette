var M=  Backbone.Model.extend({
    value:null
});
var C=  Backbone.Collection.extend({
    model:M
});

var data = new C();

function init_data(ele){
    data.push(new M({value:ele}));
}

items =["i1","i2","i3","i4"]
items.forEach(init_data);

var ItemView = Marionette.ItemView.extend({
    template:"#item",
    css:"row"
});

var V= Marionette.CollectionView.extend({
    tagName:'div',
    childView:ItemView,
    collection:data,
    className:'container'

});
var v=new V();

var vapp = new Marionette.Application();
    vapp.addRegions({
        mainRegion:'#main'
    });

function run() {
    vapp.mainRegion.show(v);
}
vapp.on("initialize:after",function () {
    vapp.mainRegion.show(v);
});
