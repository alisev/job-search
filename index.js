const userPrefs = require("./resources/userprefs.json");
const constructURLobject = require("./modules/constructURLobject.js");
const save = require("./modules/save.js");
const puppeteer = require('puppeteer');
const cheerio = require("cheerio");

async function main() {
    // list of sites
    const sites = userPrefs.sites; // list of site objects from .json file
    //const URLs = getUrls(userPrefs.sites); // list of URLs only

    // list of URLs that match given keywords
    const visitedURLs = [];
    const hitURLs = [];
    const maxPages = 2;
    
    // keyword lists
    const whitelist = userPrefs.whitelist;
    const blacklist = userPrefs.blacklist;

    // puppeteer
    const browser = await puppeteer.launch();
    const browserPage = await browser.newPage();

    //iterates through list of URLs
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
            await browserPage.waitForSelector(site.itemSelector);
            const pageHTML = await browserPage.content();
            const $ = cheerio.load(pageHTML);
            visitedURLs.push(searchURL);

            //creates duplicates of found links
            console.log($(site.itemSelector).length);
            $(site.itemSelector).each((index, element) => {
                const hitURL = $(element).attr("href");
                hitURLs.push(hitURL);
            });
        }
        /*
        // foreach pagination item on page grab the URL and add it to the list
        // TODO: not much happens here yet, because we are not looking at actual job search results!
        $(site.paginationHTML).each((index, element) => {
            const url = $(element).attr("href"); //according to org code it would be searchURL
            if (!visitedURLs.includes(url) && !URLs.includes(url)
            ) {
                URLs.push(url);
            }
        });
        console.log(URLs);

        // retrieving product URLs
        /*
        $("li.product a.woocommerce-LoopProduct-link").each((index, element) => {
            const hitUrl = $(element).attr("href");
            hitUrls.add(hitUrl);
        });
       */ 
        
    }
    console.log([...hitURLs]);
    await browser.close();
}

main()
    .then(() => {
        process.exit(0);
    })
    .catch((e) => {
        console.error(e);
        process.exit(1);
    });