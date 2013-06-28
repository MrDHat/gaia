/* -*- Mode: js; js-indent-level: 2; indent-tabs-mode: nil -*- */
/* vim: set shiftwidth=2 tabstop=2 autoindent cindent expandtab: */

'use strict';

/*
* -Access the contacts using the Contacts API
* -Listens for change in contacts
* -Merges 'almost similar' contacts
*/

/*
* Almost similar contacts are those which have same name and email
* but different numbers or same name and phone numbers but different emails.
* These contacts are considered equivalent and merged.
*/

var ContactsWrapper = {

  init: function picl_contacts_init(options) {
    options = options || {};
  },

  handleError: function picl_contacts_handleError(error) {
    console.error(error);
  },

  readContacts: function picl_contactsReader(args) {
    args = args || {};
    var contacts_filter = {sortBy: 'familyName', sortOrder: 'descending'};
    if (args.classifier === 'all') {
      //Get all contacts
      console.log('Reading all contacts');
      var contacts = navigator.mozContacts.getAll(contacts_filter);
      contacts.onsuccess = function(event) {
        console.log('Success reading contacts');
        console.log(JSON.stringify(event.target.result));
        //var cursor = event.target;
        /*if(cursor.result) {
          console.log("Found: " + JSON.stringify(cursor.result));
          cursor.continue();
        }*/
      };
      contacts.onerror = function() {
        ContactsWrapper.handleError('Error reading contacts');
      };
    }
  },

  mergeContacts: function picl_contactsMerger() {

  }
};


//XXX Remove these buttons when done testing.
var getContacts_button = document.getElementById('mock-getContacts');
getContacts_button.addEventListener('click', function() {

  ContactsWrapper.readContacts({'classifier': 'all'});
  console.log('getContacts button clicked.');

});
