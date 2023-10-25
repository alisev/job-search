// get a list of all listed URLs found in args.json

const getUrls = (sites) => {
    let urls = [];
    for (let site of sites) {
        urls.push(site.url);
    }
    return urls;
};

module.exports = getUrls;