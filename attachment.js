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
                let elements = [];
                const lengthOfResults = results.length;
                console.log('Number of results', lengthOfResults);

                results.forEach((result, index) => {
                    let content = '🍴 ' + result.vicinity + '\n';
                    content += '⭐ ' + result.rating + '\n';
                    if(result.opening_hours) {
                        if(result.opening_hours.open_now) {
                            content += '營業中(y)'
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
                                "payload": "SHOW_" + result.place_id
                            }
                        ]
                    };
                    if(index < 10) {
                        elements.push(restaurant);
                    }
                });

                console.log('elements', elements);


                FB.fbGenericTemplate(sender, elements, (err, data) => {
                    if (err) {
                        console.log(
                            'Oops! An error occurred while forwarding the response to',
                            recipientId,
                            ':',
                            err
                        );
                    }

                });

            });
            break;
        default:
            break;
    }
}


module.exports = Attachment;