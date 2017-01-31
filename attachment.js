'use strict';

/* handle postbacks */
const FB = require('./facebook');
const GOO = require('./google');

//Handle the different postback action
function Attachment(sender, atts) {
    const attach = atts[0];
    let type = attach.type;
    switch(type) {
        case "location":
            // console.log('Got Location: ', attach.payload.coordinates);
            GOO.glPlaceQuery(attach.payload.coordinates, (err, data) => {
                // console.log('google place API: ', data);
                //Send list of wonderful places
                const next_page_token = data.next_page_token;
                const results = data.results;
                let elements1 = [];
                let elements2 = [];
                const lengthOfResults = results.length;

                results.forEach((result, index) => {
                    let content = '🍴 ' + result.vicinity + '\n';
                    if(result.rating) {
                        content += '⭐ ' + result.rating + '\n';
                    }
                    if(result.opening_hours) {
                        if(result.opening_hours.open_now) {
                            content += '營業中⏳'
                        } else {
                            content += '休息中💤'
                        }
                    }

                    let restaurant = {
                        "title": result.name,
                        "subtitle": content,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "瞭解更多",
                                "payload": "SHOW_DETAIL_" + result.place_id
                            }
                        ]
                    };
                    if(index < 10) {
                        elements1.push(restaurant);
                    } else { 
                        elements2.push(restaurant);
                    }
                });

                FB.fbGenericTemplate(sender, elements1, (err, data) => {
                    if (err) {
                        console.log(
                            'Oops! An error occurred while forwarding the response to',
                            recipientId,
                            ':',
                            err
                        );
                    }

                });

                if(lengthOfResults >= 10) {

                    FB.fbGenericTemplate(sender, elements2, (err, data) => {
                        if (err) {
                            console.log(
                                'Oops! An error occurred while forwarding the response to',
                                recipientId,
                                ':',
                                err
                            );
                        }

                    });
                }

            });
            break;
        default:
            break;
    }
}


module.exports = Attachment;