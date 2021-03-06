'use strict';

const request = require('request');
const Config = require('./const.js');
const API_KEY = Config.GOOGLE_API_KEY;

const googleNearByReq = request.defaults({
  uri: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
  method: 'GET',
  json: true,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
});

const googlePlaceDetail = request.defaults({
  uri: 'https://maps.googleapis.com/maps/api/place/details/json',
  method: 'GET',
  json: true,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
});



const glPlaceQuery = (location, cb) => {
  const opts = {
    qs: {
        location: location.lat + ', ' + location.long,
        types: 'food',
        language: 'zh-TW',
        rankby: 'distance',
        key: API_KEY
    }
  };
  googleNearByReq(opts, (err, resp, data) => {
    if (cb) {
      cb(err || data.error && data.error.message, data);
    }
    
  });
};

const glPlaceId = (id, cb) => {
  const opts = {
    qs: {
        placeid: id,
        key: API_KEY
    }
  };
  googlePlaceDetail(opts, (err, resp, data) => {
    if (cb) {
      cb(err || data.error && data.error.message, data);
    }
    
  });
};


module.exports = {
  googleNearByReq: googleNearByReq,
  googlePlaceDetail: googlePlaceDetail,
  glPlaceQuery: glPlaceQuery,
  glPlaceId: glPlaceId
};