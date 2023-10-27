// selects vacancy items from the DOM
// uses ".vacancy-item"

const selectVacancies = ($, site) => {
    const correspondingURLs = [];
    $(site.selectors.item).each((index, element) => {
        // first, we check if this element matches our search criteria
        let searchStr = "";
        for (let key in site.selectors) {
            if (key === "item") continue;
            const sel = this.selectors[key];
            searchStr += $(element).find(sel).text();
        }
        //const itemTitle = $(element).find(site.selectors.title).text();
        //const itemCompany = $(element).find(site.selectors.company).text(); 
        //const itemLocation = $(element).find(site.selectors.location).text();
        console.log(searchStr); //some items are empty strings

        // TODO: if it corresponds to whitelist/blacklist rules, we add it to the list and return it
    });
    return correspondingURLs;
}

module.exports = selectVacancies;