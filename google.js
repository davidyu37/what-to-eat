'use strict';

const request = require('request');
const Config = require('./const.js');

const googleReq = request.defaults({
  uri: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
  method: 'GET',
  json: true,
  qs: {
    access_token: Config.GOOGLE_API_KEY
  },
  headers: {
    'Content-Type': 'application/json'
  },
});


const glPlaceQuery = (recipientId, location, cb) => {
  const opts = {
    form: {
        location: location.lat + ', ' + location.long,
        radius: 1000,
        types: 'food',
        language: 'zh-TW' 
    }
  };

  googleReq(opts, (err, resp, data) => {
    if (cb) {
      cb(err || data.error && data.error.message, data);
    }
    
  });
};

// const fbQuickReply = (recipientId, text, replies, cb) => {
//   const opts = {
//     form: {
//       recipient: {
//         id: recipientId,
//       },
//       message: {
//         text: text,
//         quick_replies: replies
//       },
//     },
//   };

//   fbReq(opts, (err, resp, data) => {
//     if (cb) {
//       cb(err || data.error && data.error.message, data);
//     }
//   });
// };


// // See the Webhook reference
// // https://developers.facebook.com/docs/messenger-platform/webhook-reference
// const getFirstMessagingEntry = (body) => {
//   const val = body.object === 'page' &&
//     body.entry &&
//     Array.isArray(body.entry) &&
//     body.entry.length > 0 &&
//     body.entry[0] &&
//     body.entry[0].messaging &&
//     Array.isArray(body.entry[0].messaging) &&
//     body.entry[0].messaging.length > 0 &&
//     body.entry[0].messaging[0];

//   return val || null;
// };


module.exports = {
  googleReq: googleReq,
  glPlaceQuery: glPlaceQuery
};