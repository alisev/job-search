const siteInfos = require("../resources/siteinfo.json");
const StructedURL = require("./structedURL.js");

class StructedGetURL extends StructedURL {
    #nextPageFlag;
    #selectors; // dict, contains item, title, company, location
    offset;

    constructor (site, offset = 0) {
        super(site, "GET");
        this.#nextPageFlag = siteInfos[super.name].nextPageFlag;
        this.#selectors = siteInfos[super.name].selectors;
        this.offset = offset;
    }

    // helper function for selectVacancies
    // selects elements and return their values
    // returns empty string if there is no text to select
    #createSearchString (element, $) {
        let searchStr = "";
        for (let sel in this.#selectors) {
            if (sel === "item" || sel === "link") continue;
            searchStr += `${$(element).find(this.#selectors[sel]).text()}*`;
        }
        return searchStr;
    }

    // gets URL to vacancy offer
    #getVacancyURL (element, $) {
        const link = $(element).find(this.#selectors.link).attr("href").slice(4); //TODO: slicing off first 4 symbols is cv-online specific
        //const link = $(element).attr("href").slice(4); 
        const hitURL = `${super.URL}/${link}`;
        return hitURL;
    }

    // checks if string contains only desired keywords
    #hasDesiredKeywords (searchStr, whitelist, blacklist) { // TODO: Possible issue - location filter matched with company
        searchStr = searchStr.toLowerCase();
        const containsWhite = whitelist.some(keyword => searchStr.includes(keyword));
        const containsBlack = blacklist.some(keyword => searchStr.includes(keyword));
        return (containsWhite && !containsBlack);
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

    // increases offset, so next page of results can be returned
    increaseOffset () {
        const resultSize = super.searchArgs.limit; // TODO: limit property is cv-online specific, other sites may operate differently
        this.offset += resultSize;
    }

    // selects vacancy items from the DOM
    selectVacancies ($, whitelist, blacklist) {
        const correspondingURLs = [];
        $(this.#selectors.item).each((index, element) => {
            const searchStr = this.#createSearchString(element, $);
            if (this.#hasDesiredKeywords(searchStr, whitelist, blacklist)) {
                const hitURL = this.#getVacancyURL(element, $);
                correspondingURLs.push(hitURL);
            }
        });
        return correspondingURLs;
    }

    // returns read-only fields
    get requestType () {
        return "GET";
    }

    get nextPageFlag () {
        return this.#nextPageFlag;
    }

    get selectors () {
        return this.#selectors;
    }
}

module.exports = StructedGetURL;