// selects the corresponding elements in HTML page and adds them to list of URLs
// ueses ".vacancy-item" - the links themselves

const getLink = ($, site, hitURLs) => {
    $(site.itemSelector).each((index, element) => {
        const link = $(element).attr("href").slice(4); //slicing off first 4 symbols is cv-online specific
        const hitURL = `${site.URL}/${link}`;
        // grab only the desired job offers
        // TODO: check if given element is desirable
        
        if (!hitURLs.includes(hitURL)) {
            hitURLs.push(hitURL);
        }
    });
    return hitURLs; // TODO: hitURLs are const in index.js
}

module.exports = getLink;