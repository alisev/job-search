// class for constructing search URLs
class StructedURL {
    #baseURL;
    #name;
    #requestType;
    #searchArgs;

    constructor (site, requestType = null) {
        this.#baseURL = site.url;
        this.#name = site.name;
        this.#requestType = requestType;
        this.#searchArgs = site.searchArgs;
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

    get requestType () {
        return this.#requestType;
    }

    get searchArgs () {
        return this.#searchArgs;
    }
}

module.exports = StructedURL;