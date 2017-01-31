'use strict';

const request = require('request');
const Config = require('./const.js');

const fbSetup = request.defaults({
  uri: 'https://graph.facebook.com/v2.6/me/thread_settings',
  method: 'POST',
  qs: {access_token: Config.FB_PAGE_TOKEN},

});

// Setup get started button
const getStartedButton = () => {
    const opts = {
        json: {
            "setting_type": "call_to_actions",
            "thread_state": "new_thread",
            "call_to_actions":[
                {
                "payload": "GET_STARTED"
                }
            ]
        }
    };
    fbSetup(opts, (err, resp, data) => {
        if (err) {
            console.log('err setting up get started');
        }
        console.log('get started btn set up');
    });
};


// Setup whitelist
const whitelist = () => {
    const opts = {
        json: {
            "setting_type": "domain_whitelisting",
            "whitelisted_domains" : ["https://maps.google.com", "https://www.facebook.com"],
            "domain_action_type": "add"
        }
    };
    fbSetup(opts, (err, resp, data) => {
        if (err) {
            console.log('err setting up get started');
        }
        console.log('whitelist set up');
    });
};

module.exports = {
    getStartedButton: getStartedButton,
    whitelist: whitelist
};