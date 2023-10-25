// class for constructing search URLs
class StructedURL {
    #baseURL;
    #name;
    #searchArgs;
    //#paginationHTML;

    constructor (site) {
        this.#baseURL = site.url;
        this.#name = site.name;
        this.#searchArgs = site.searchArgs;
        //const siteInfo = siteInfos[this.#name];
        //this.#paginationHTML = siteInfo.paginationHTML;
    }

    getSearchURL () {
        return "getSearchURL: Not implemented!";
    }

    getPaginations () {
        return "getPaginations: Not implemented!";
    }

    // returns read-only fields
    get URL () {
        return this.#baseURL;
    }

    get name () {
        return this.#name;
    }

    get searchArgs () {
        return this.#searchArgs;
    }
}

module.exports = StructedURL;