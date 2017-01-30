'use strict';

/* handle postbacks */
const FB = require('./facebook');


//Handle the different postback action
function Attachment(sender, atts) {
    let type = atts.type;
    console.log('attachments', atts);
    switch(type) {
        case "location":
            console.log('Got Location: ', atts);
            
            break;
        default:
            break;
    }
}


module.exports = Attachment;