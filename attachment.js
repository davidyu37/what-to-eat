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
            console.log('Got Location: ', attach.payload.coordinates);
            GOO.glPlaceQuery(attach.payload.coordinates, (err, data) => {
                console.log('google place API: ', data);
                //Send list of wonderful places
            });
            break;
        default:
            break;
    }
}


module.exports = Attachment;