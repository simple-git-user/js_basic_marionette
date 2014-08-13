var ContactManager = new Marionette.Application();

ContactManager.addRegions({
  mainRegion: "#main-region",
    secRegion:"#main-region1"
});

ContactManager.on("start", function(){
  ContactManager.ContactsApp.List.Controller.listContacts();
});
