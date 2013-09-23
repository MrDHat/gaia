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

var ContactsWrapper = (function() {

    var readContacts = function(args, callback) {
            args = args || {};
            if (args.id) {
                //Get single contact
                console.log('Reading contact #' + args.id);
                var contacts_filter = { filterBy: ['id'], filterValue: args.id, filterOp: 'equals', filterLimit: 1};
                var contact = navigator.mozContacts.find(contacts_filter);
                contacts.onsuccess = function(event) {
                    console.log('Success reading contact');
                    console.log(JSON.stringify(event.target.result));
                    callback(event.target.result);
                };
                contacts.onerror = function() {
                    console.error('Error reading contact #' + args.id);
                    callback({ error: 'Error reading contact #' + args.id});
                };

            } else {
                //Get all contacts
                console.log('Reading all contacts');
                var contacts_filter = {sortBy: 'familyName', sortOrder: 'descending'};
                var contacts = navigator.mozContacts.getAll(contacts_filter);
                contacts.onsuccess = function(event) {
                console.log('Success reading contacts');
                console.log(JSON.stringify(event.target.result));
                callback(event.target.result);
                };
                contacts.onerror = function() {
                ContactsWrapper.handleError('Error reading contacts');
                };
            }
        };

        return {
            readContacts: readContacts
        };
})();
