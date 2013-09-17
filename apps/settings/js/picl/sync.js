/* -*- Mode: js; js-indent-level: 2; indent-tabs-mode: nil -*- */
/* vim: set shiftwidth=2 tabstop=2 autoindent cindent expandtab: */

'use strict';

function SyncClient(options) {
    this.url = options.url;
}

SyncClient.prototype.auth = function(assertion, callback) {

    var URLIdentifier = this.url + '/1.0/sync/1.1';

    var xhr = new XMLHttpRequest({
        mozSystem: true
    });
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.response);
            callback({ response: xhr.response });
        }
    };
    xhr.onerror = function() {
        console.error(xhr.status);
        console.error(xhr.readyState);
        callback({ error: xhr.status });
    };
    xhr.open('GET', URLIdentifier, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', 'BrowserID' + assertion);
    xhr.send();
};

SyncClient.prototype.request = function(path, options, callback) {
    options = options || {};
    if (typeof path === 'sting') {
        options.path = path;
    } else {
        options = path;
    }
    if (!options.method) {
        options.method = 'GET';
    }

    var credentials = {
        id: this.token.id,
        key: this.token.key,
        algorithm: 'sha256'
    };
    var uri = this.token.api_endpoint + options.path;
    var header = Hawk.client.header(options.uri, 'GET', {credentials: credentials});

    var xhr = new XMLHttpRequest({
        mozSystem: true
    });
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.response);
            callback({ response: xhr.response });
        }
    };
    xhr.onerror = function() {
        console.error(xhr.status);
        callback({ error: xhr.status });
    };
    xhr.open(options.method, uri, true);
    xhr.setRequestHeader('Authorization', header.field);
    if (options.json) {
        xhr.send(options.json);
    } else {
        xhr.send();
    }
};

SyncClient.prototype.get = function(path, callback) {
    this.request(path, { method: 'GET' }, function(response) {
        callback(response);
    });
};

SyncClient.prototype.post = function(path, payload, callback) {
    this.request(path, { method: 'POST', json: payload }, function(response) {
        callback(response);
    });
};

SyncClient.prototype.put = function(path, payload, callback) {
    this.request(path, { method: 'PUT', json: payload }, function(response) {
        callback(response);
    });
};
