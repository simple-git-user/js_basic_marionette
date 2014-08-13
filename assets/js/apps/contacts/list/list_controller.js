ContactManager.module("ContactsApp.List", function(List, ContactManager, Backbone, Marionette, $, _){
  List.Controller = {
    listContacts: function(){
      var contacts = ContactManager.request("contact:entities");

      var contactsListView = new List.Contacts({
        collection: contacts
      });

        var contactsListView1 = new List.Contacts({
            collection: contacts
        });

      contactsListView.on("childview:contact:delete", function(childView, model){
        contacts.remove(model);
      });

        contactsListView1.on("childview:contact:delete", function(childView, model){
        contacts.remove(model);
      });

      ContactManager.mainRegion.show(contactsListView);
      ContactManager.secRegion.show(contactsListView1);
    }
  }
});
