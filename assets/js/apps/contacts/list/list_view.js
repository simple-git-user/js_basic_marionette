ContactManager.module("ContactsApp.List", function(List, ContactManager, Backbone, Marionette, $, _){
  List.Contact = Marionette.ItemView.extend({
    tagName: "tr",
    template: "#contact-list-item",

    events: {
      "click": "highlightName",
      "click button.js-delete": "deleteClicked"
    },

    highlightName: function(e){
      this.$el.toggleClass("warning");
    },

    deleteClicked: function(e){
      e.stopPropagation();
        //alert(ContactManager.request("contact:entities").length);
      this.trigger("contact:delete", this.model);
    },

    remove: function(){
      var self = this;
      this.$el.fadeOut(function(){
          //alert(ContactManager.request("contact:entities").length);
        Marionette.ItemView.prototype.remove.call(self);
          //alert(ContactManager.request("contact:entities").length);
      });
    }
  });

  List.Contacts = Marionette.CompositeView.extend({
    tagName: "table",
    className: "table table-hover",
    template: "#contact-list",
    childView: List.Contact,
    childViewContainer: "tbody",
      events: {
          "click": "highlightName1"
      },
      highlightName1: function(e){
          //this.$el.toggleClass("warning");
          alert('from table');
      },
      onChildviewContactDelete: function(){
          this.$el.fadeOut(1000, function(){
              $(this).fadeIn(1000);
          });}

      });
});
