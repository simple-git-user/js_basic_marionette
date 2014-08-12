ContactManager.module("S.ContactsApp1.List", function( List1, ContactManager, Backbone, Marionette, $, _){
  List1.Controller = {
    listContacts1: function(){
      var contacts = ContactManager.request("contact:entities");

      var contactsListView = new List1.Contacts({
        collection: contacts
      });

      ContactManager.mainRegion.show(contactsListView);
    }
  }
});
