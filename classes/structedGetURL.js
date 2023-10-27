const siteInfos = require("../resources/siteinfo.json");
const StructedURL = require("./structedURL.js");

class StructedGetURL extends StructedURL {
    offset;
    #requestType;
    #nextPageFlag;
    #selectors;

    constructor (site, offset = 0) {
        super(site, offset);

        const siteInfo = siteInfos[super.name];
        this.#requestType = "GET";
        this.#nextPageFlag = siteInfo.nextPageFlag;
        this.#selectors = siteInfo.selectors;
        this.offset = offset;
    }

    // combines the URL of the site with provided search arguments
    getSearchURL () {
        let searchURL = super.URL + "/search?"; //TODO: 'search' portion of a link is cv-online specific
        for (let key in super.searchArgs) {
            const searchArg = `${key}=${super.searchArgs[key]}&`;
            searchURL += searchArg;
        }
        if (this.offset != 0) {
            searchURL += `${this.#nextPageFlag}=${this.offset}`;
        }
        return searchURL;
    }

    // creates a list of paginationed links with help of searchArgs
    getPaginations (maxPages) {
        const paginations = [];
        for (let i = 0; i < maxPages; i++) {
            const url = this.getSearchURL();
            paginations.push(url);
            this.increaseOffset();
        }
        return paginations;
    }

    // increases offset, so next page of results can be returned
    increaseOffset () {
        const resultSize = super.searchArgs.limit; // TODO: limit property is cv-online specific, other sites may operate differently
        this.offset += resultSize;
    }

    // returns read-only fields
    get requestType () {
        return this.#requestType;
    }

    get nextPageFlag () {
        return this.#nextPageFlag;
    }

    get selectors () {
        return this.#selectors;
    }
}

module.exports = StructedGetURL;