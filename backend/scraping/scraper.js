const axios = require("axios");
const cheerio = require("cheerio");
const pretty = require("pretty");
const Product = require("../models/product");
const Stock = require("../models/stock");

const scrape = () => {
    const productsData = []
    axios.get('https://www.terminalx.com/sports/activity/basketball').then((response) => {
        extracted(response, productsData, 1);
    }).then(() => axios.get('https://www.terminalx.com/sports/activity/soccer').then((response) => {
        extracted(response, productsData, 2);
    }).then(() => axios.get('https://www.terminalx.com/sports/activity/swimming').then((response) => {
        extracted(response, productsData, 3);
    }).then(() => axios.get('https://www.terminalx.com/sports/activity/running').then((response) => {
        extracted(response, productsData, 4);
    }).then(() => axios.get('https://www.terminalx.com/sports/activity/style').then((response) => {
        extracted(response, productsData, 5);
    }).then(() => axios.get('https://www.terminalx.com/sports/activity/yoga').then((response) => {
        extracted(response, productsData, 6);
    })))))).finally(() => {
        const productsDataNoDuplicates = productsData.filter((arr, index, self) => index === self.findIndex((t) => (t.description === arr.description && t.image === arr.image)))
        const stock = [];

        Product.create(productsDataNoDuplicates, (err, res) => {
            if (err) //console.log(err);
            //console.log(`Inserted ${res.length} documents`);

            res.map(product => stock.push({product: product._id, quantity: getRandomStock(10, 500)}));
            Stock.create(stock, (err, res) => {
                if (err) console.log(err);
                //console.log(`Inserted ${res.length} documents`);
            });
        });
    });
}

function getRandomStock(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function extracted(response, productsData, category) {
    const body = response.data;
    const $ = cheerio.load(body);
    const products = $(".listing-product_3mjp");
    products.each((index, el) => {
        const product = {};
        product.image = $(el).find('div > a > div > div > img').attr('src')
        product.name = $(el).find('div > div > div > span').text()
        product.description = $(el).find('a.title_3ZxJ').text()
        const price = $(el).find('div.final-price_8CiX').text()
        product.price = parseInt(price.includes('.') ? price.split('.')[0] : price.split(' ')[0])
        product.category = category;
        product.name.length > 0 && productsData.push(product);
    });
}

module.exports = {scrape};