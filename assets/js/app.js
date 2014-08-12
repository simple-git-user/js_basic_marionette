var ContactManager = new Marionette.Application();

ContactManager.addRegions({
  mainRegion: "#main-region"
});

ContactManager.on("start", function(){
  ContactManager.S.ContactsApp1.List.Controller.listContacts1();
});
