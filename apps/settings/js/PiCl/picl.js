/* -*- Mode: js; js-indent-level: 2; indent-tabs-mode: nil -*- */
/* vim: set shiftwidth=2 tabstop=2 autoindent cindent expandtab: */

'use strict';


/* StorageProtocolZero contacts data format:
* https://gist.github.com/MrDHat/5502008
*/

/*
* Abstract class for basic PiCl functions
*   -Checks if sync is turned on
*   -gets connected persona ID
*   -gets auth-token from keyserver.
*/
var PiCl = {

  _serverHost: null,
  _keyServerHost: 'http://127.0.0.1:8090',
  _syncFlag: null, // if sync_flag is set then sync service is active
  _personaID: null,

  init: function picl_init(options) {
    options = options || {};
  },

  handleError: function picl_handleError(error) {
    console.error(error);
  },

  // Gets logged in Persona ID
  getID: function get_personaID() {
    return PiCl._personaID;
  },

  enableSync: function picl_enableSync() {
    PiCl._syncFlag = 1;
  },

  disableSync: function picl_disableSync() {
    PiCl._syncFlag = 0;
  },

  /* POST /user
  *  Valid args:
  *   -email:string User's email (required)
  */
  createUser: function picl_createUser(args) {
    args = args || {};
    if (!args.email) {
      PiCl.handleError('No email in argument to createUser: ' + args);
    }
    else {
      args = JSON.stringify(args);
      console.log(args);
      var xhr = new XMLHttpRequest({
        mozSystem: true
      });
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          console.log(xhr.response);
        }
      };
      xhr.onerror = function() {
        PiCl.handleError('xhr POST error, status: ' + xhr.status);
      };
      xhr.open('POST', PiCl._keyServerHost + '/user', true);
      xhr.setRequestHeader('Content-type', 'application/json');
      xhr.send(args);
    }
  },

  /* GET /user/?email=<email>
  *  Valid args:
  *   -email:string User's email (required)
  */
  getUser: function picl_getUser(args) {
    args = args || {};
    if (!args.email) {
      PiCl.handleError('No email in argument to picl_getUser ' + args);
    }

    //XXX Needs Fix: response code returning 2 times from key-server when 404.
    else {
      var xhr = new XMLHttpRequest({
        mozSystem: true
      });
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          //Success i.e. user exists
          console.log(xhr.response);
        }
        if (xhr.status === 404) {
          // User does not exist
          console.log(xhr.response);
        }
      };
      xhr.onerror = function() {
        PiCl.handleError('xhr.response, onerror: ' + xhr.response);
      };
      xhr.open('GET', PiCl._keyServerHost + '/user/?email=' + args.email, true);
      xhr.send();
    }
  }
};


//XXX Remove these buttons when done testing.
var getUser_button = document.getElementById('mock-picl-getUser');
getUser_button.addEventListener('click', function() {

  PiCl.getUser({'email': 'ktyaks@gmail.com'});
  console.log('getUser button clicked.');

});

var createUser_button = document.getElementById('mock-picl-createUser');
createUser_button.addEventListener('click', function() {

  console.log('createUser button clicked.');
  PiCl.createUser({'email': 'ktyaks@gmail.com'});

});
///
