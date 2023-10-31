const siteInfos = require("../resources/siteinfo.json");
const StructedGetURL = require("../classes/structedGetURL.js");

const constructURLobject = (site, offset = 0) => {
    const siteInfo = siteInfos[site.name];
    const requestType = siteInfo.requestType;
    
    let obj;
    if (requestType === "GET") {
        obj = new StructedGetURL(site, offset);
    } else {
        throw new Error(`Method not implemented or supported: On constructURLobject() received requestType=${requestType}.`); // TODO: test it out
    }
    // TODO: add POST version
    return obj;
};

module.exports = constructURLobject;