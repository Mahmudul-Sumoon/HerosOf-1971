const express = require("express");
const puppeteer = require("puppeteer");
const dotenv = require("dotenv");
const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();

app.get('/:name', async (req, res) => {
    (async function scrape() {
        const browser = await puppeteer.launch({
            headless: true, args: [
                '--disable-gpu',
                '--disable-dev-shm-usage',
                '--disable-setuid-sandbox',
                '--no-first-run',
                '--no-sandbox',
                '--no-zygote',
                '--deterministic-fetch',
                '--disable-features=IsolateOrigins',
                '--disable-site-isolation-trials',
                '--single-process',
            ],
        });
        let db;
        if (req.params.name == 'BirShrestha')
        {
            db = process.env.BS;
        }
       else if (req.params.name == 'BirUttam')
        {
            db = process.env.BU;
        }
       else if (req.params.name == 'BirProtik')
        {
            db = process.env.BP;
        }
       else
        {
            db = process.env.BB;
        }
        
        const page = await browser.newPage();
        console.log("We are scraping from " + db+ ":");
        await page.goto(db);

        var hrefs;
        hrefs = await page.evaluate(() => {
            let table = Array.from(document.querySelectorAll('table[class="wikitable"]'));
            let headLine = Array.from(document.querySelectorAll('h3>span[class="mw-headline"]:not(#Civilian_recipients),h4>span[class="mw-headline"]')).map(e => e.innerText);
            let duplicate = headLine.filter((e, i) => headLine.indexOf(e) != i);
            let duplicateValueIndex = headLine.lastIndexOf(duplicate[0]);
            headLine[duplicateValueIndex] = duplicate[0] + '1';
            let tableHeader = Array.from(table[2].querySelectorAll(`tbody>tr>th`)).map(e => e.innerText);
         //   var allData = [];
            var dataTemp = {};
            let allDataLength = Array.from(document.querySelectorAll('table[class="wikitable"]>tbody:nth-of-type(1)>tr>td:nth-of-type(3)')).length;
            function grabData(table, x) {
      let all = Array.from(table[x].querySelectorAll(`tbody>tr:not(:first-child)`)).map(
                    function (e) {
                        var obj = {};
                        for (let i = 0; i < tableHeader.length; i++) {
                            obj[tableHeader[i]] = e.innerText.split('\t')[i];
                        }
                        return obj;
                    }
                );
                return all;
            };
            for (let i = 0; i < table.length; i++) {
                dataTemp[headLine[i]] = grabData(table, i);
            }
            //allData.push(dataTemp);
            return { dataTemp, allDataLength };
        });
        console.log(hrefs.dataTemp);
        console.log(hrefs.allDataLength);
        var obj = {length:hrefs.allDataLength,data:hrefs.dataTemp}
       // res.send({hrefs.allData, hrefs.allDataLength);
       res.status(200).json(obj);
        await browser.close();
    })().catch(function (err) {
        console.log(err);
    });
})

app.listen(port, () => {
    console.log(`connection established at port ${port} `);
})
