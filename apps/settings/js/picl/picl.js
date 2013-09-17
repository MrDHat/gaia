/* -*- Mode: js; js-indent-level: 2; indent-tabs-mode: nil -*- */
/* vim: set shiftwidth=2 tabstop=2 autoindent cindent expandtab: */

'use strict';

LazyLoader.load(['js/picl/lib/hawk.js', 'js/picl/idp.js', 'js/picl/sync.js'],
    startSync);

function startSync () {

    //Seed the generator
    navigator.jwcrypto.addEntropy(crypto.getRandomValues(new Uint8Array(32)));

    const duration = 3600 * 24 * 365;
    const audience = 'http://auth.oldsync.dev.lcip.org';
    const email = 'gaia@mockmyid.com';

    var mockIdp = new Idp();
    var syncClient = new SyncClient({ url: audience });

    mockIdp.getAssertion({
      email: email,
      certDuration: duration,
      audience: audience,
      assertionDuration: duration
    }, function(assertion) {
        console.log(assertion);
        syncClient.auth(assertion, function(response) {
            console.log(JSON.stringify(response));
        })
    });
}