'use strict';

/* handle postbacks */
const FB = require('./facebook');


//Handle the different postback action
function handlePostback(sender, postback) {
    let payload = postback.payload;
    switch(payload) {
        case "GET_STARTED":
            console.log('Execute GET STARTED');
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


module.exports = handlePostback;