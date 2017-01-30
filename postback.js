'use strict';

/* handle postbacks */
const FB = require('./facebook');


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
            break;
    }
}


module.exports = Postback;