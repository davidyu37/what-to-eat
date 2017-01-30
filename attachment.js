'use strict';

/* handle postbacks */
const FB = require('./facebook');


//Handle the different postback action
function Attachment(sender, atts) {
    const attach = atts[0];
    let type = attach.type;
    console.log('attachments', atts);
    switch(type) {
        case "location":
            console.log('Got Location: ', attach.payload.coordinates);
            
            break;
        default:
            break;
    }
}


module.exports = Attachment;