'use strict';

/* handle postbacks */
const FB = require('./facebook');
const GOO = require('./google');
const Config = require('./const.js');
const API_KEY = Config.GOOGLE_API_KEY;


//Handle the different postback action
function Postback(sender, postback) {
    let payload = postback.payload;
    switch(payload) {
        case "GET_STARTED":
            console.log('Execute GET STARTED');
            let elements = [{
                title: '餓了嗎？',
                subtitle: '少點時間決定，多點時間吃飯吧',
                image_url: "http://038326600.tranews.com/images/Info/Y017673000001_1_1.jpg",
                buttons: [
                    {
                        type: 'postback',
                        title: '找附近吃的',
                        payload: 'ASK_LOCATION'
                    }
                ]       
            }];
            FB.fbGenericTemplate(sender, elements, (err, data) => {
                if (err) {
                    console.log(
                        'Oops! An error occurred while forwarding the response to',
                        recipientId,
                        ':',
                        err
                    );
                }
            })
            break;
        case "ASK_LOCATION":
            const replies = [
                {
                    "content_type":"location",
                }
            ];
            FB.fbQuickReply(sender, '請分享您的位置', replies, (err, data) => {
                if (err) {
                    console.log(
                        'Oops! An error occurred while forwarding the response to',
                        recipientId,
                        ':',
                        err
                    );
                }
            });
            break;
        default:
             if(payload.startsWith('SHOW_DETAIL_')) {
                 let id = payload.slice(12, payload.length);
                 console.log('place id', id);

                 GOO.glPlaceId(id, (err, data) => {
                    if (err) {
                        console.log('err with google place id get request', err);
                    }


                    const result = data.result;

                    console.log('result', result.url);

                    let pic = 'https://www.awoo.org/images/poa/placeholder.png'
                    if(result.photos) {
                        pic = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&key=' + API_KEY + '&photoreference=' + result.photos[0].photo_reference;
                    }

                    let firstElement = {
                        title: result.name,
                        subtitle: '⭐ ' + result.rating,
                        image_url: pic
                    };

                    if(result.website) {
                        firstElement.subtitle = result.website;
                        // firstElement.buttons = [
                        //     {
                        //         title: "官網",
                        //         type: "web_url",
                        //         url: result.website,
                        //         messenger_extensions: true,
                        //         webview_height_ratio: "tall",
                        //         fallback_url: "https://www.messenger.com/t/1107667369345599"                        
                        //     }
                        // ];
                    }

                    let elements = [
                        firstElement,
                        {
                            title: '地址',
                            image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Map_ballonicon2.svg/2000px-Map_ballonicon2.svg.png',
                            subtitle: result.formatted_address,
                            buttons: [
                                {
                                    title: "打開",
                                    type: "web_url",
                                    url: result.url,
                                    messenger_extensions: true,
                                    webview_height_ratio: "tall",
                                    fallback_url: "https://www.messenger.com/t/1107667369345599"                        
                                }
                            ]
                        },
                        {
                            title: '聯絡',
                            image_url: 'https://cdn2.iconfinder.com/data/icons/ios-7-style-metro-ui-icons/512/MetroUI_Phone.png',
                            subtitle: result.formatted_phone_number,
                            buttons: [
                                {
                                    title: "撥打",
                                    type: "phone_number",
                                    payload: result.formatted_phone_number                      
                                }
                            ]
                        }
                    ];

                    FB.fbListTemplate(sender, elements, (err, data) => {
                        if(err) {
                            console.log('err while sending list', err);
                        }
                    });
                 });
             }

            break;
    }
}


module.exports = Postback;