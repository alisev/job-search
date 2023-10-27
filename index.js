const userPrefs = require("./resources/userprefs.json");
const constructURLobject = require("./modules/constructURLobject.js");
const save = require("./modules/save.js");
const puppeteer = require('puppeteer');
const cheerio = require("cheerio");

async function main() {
    const sites = userPrefs.sites; // list of site objects from .json file

    // list of URLs that match given keywords
    const hitURLs = [];
    const maxPages = 5;
    
    // keyword lists
    const whitelist = userPrefs.whitelist;
    const blacklist = userPrefs.blacklist;

    // puppeteer
    const browser = await puppeteer.launch();
    const browserPage = await browser.newPage();

    //iterates through list of URLs
    // the two while functions make a linear n*maxPages time complexity
    while (sites.length !== 0) {
        // actual webcrawling happens here
        // foreach site get pagination URLs
        // then grab the desired advertisments
        const siteData = sites.pop();
        const site = constructURLobject(siteData);
        const paginations = site.getPaginations(maxPages);

        while (paginations.length !== 0) {
            // load HITML of given url
            // and wait for page to be fully loaded
            const searchURL = paginations.pop();
            await browserPage.goto(searchURL);
            await browserPage.waitForSelector(site.selectors.item);

            const pageHTML = await browserPage.content();
            const $ = cheerio.load(pageHTML);
            
            const foundVacancies = site.selectVacancies($, whitelist, blacklist);
            hitURLs.push(...foundVacancies); // TODO: flatten array before retuning it
        }
    }
    save.vacancies(hitURLs, "found");
    //browser.close(); // TODO: Terminal reports its already closed
}

main()
    .then(() => {
        process.exit(0);
    })
    .catch((e) => {
        console.error(e);
        process.exit(1);
    });