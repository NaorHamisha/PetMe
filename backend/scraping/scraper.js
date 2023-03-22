const axios = require("axios");
const cheerio = require("cheerio");
const pretty = require("pretty");
const Product = require("../models/product");
const Stock = require("../models/stock");

const firstResource = 'https://tiktakpet.co.il/en/product-category/%d7%9b%d7%9c%d7%91%d7%99%d7%9d-%d7%a8%d7%a6%d7%95%d7%a2%d7%95%d7%aa-%d7%a7%d7%95%d7%9c%d7%a8%d7%99%d7%9d-%d7%9e%d7%97%d7%a1%d7%95%d7%9e%d7%99%d7%9d-%d7%9e%d7%96%d7%95%d7%9f-%d7%99%d7%91%d7%a9-%d7%91/%d7%9b%d7%9c%d7%99-%d7%90%d7%95%d7%9b%d7%9c-%d7%95%d7%a9%d7%aa%d7%99%d7%94-%d7%9c%d7%9b%d7%9c%d7%91/';
const secondResource = 'https://tiktakpet.co.il/en/product-category/%d7%9b%d7%9c%d7%91%d7%99%d7%9d-%d7%a8%d7%a6%d7%95%d7%a2%d7%95%d7%aa-%d7%a7%d7%95%d7%9c%d7%a8%d7%99%d7%9d-%d7%9e%d7%97%d7%a1%d7%95%d7%9e%d7%99%d7%9d-%d7%9e%d7%96%d7%95%d7%9f-%d7%99%d7%91%d7%a9-%d7%91/%d7%9e%d7%96%d7%95%d7%9f-%d7%99%d7%91%d7%a9-%d7%9c%d7%9b%d7%9c%d7%91%d7%99%d7%9d/';
const thirdResource = 'https://tiktakpet.co.il/en/product-category/%d7%9b%d7%9c%d7%91%d7%99%d7%9d-%d7%a8%d7%a6%d7%95%d7%a2%d7%95%d7%aa-%d7%a7%d7%95%d7%9c%d7%a8%d7%99%d7%9d-%d7%9e%d7%97%d7%a1%d7%95%d7%9e%d7%99%d7%9d-%d7%9e%d7%96%d7%95%d7%9f-%d7%99%d7%91%d7%a9-%d7%91/%d7%9e%d7%96%d7%95%d7%9f-%d7%99%d7%91%d7%a9-%d7%9c%d7%92%d7%95%d7%a8%d7%99-%d7%9b%d7%9c%d7%91%d7%99%d7%9d-%d7%9e%d7%95%d7%a0%d7%92-%d7%a8%d7%95%d7%99%d7%90%d7%9c-%d7%a7%d7%a0%d7%99%d7%9f-%d7%9e%d7%96/';


const scrape = () => {
    const productsData = []
    axios.get(firstResource).then((response) => {
        extracted(response, productsData, 1);
    }).then(() => axios.get(secondResource).then((response) => {
        extracted(response, productsData, 2);
    }).then(() => axios.get(thirdResource).then((response) => {
        extracted(response, productsData, 3);
    }))).finally(() => {
        const productsDataNoDuplicates = productsData.filter((arr, index, self) => index === self.findIndex((t) => (t.description === arr.description && t.image === arr.image)))
        const stock = [];

        Product.create(productsDataNoDuplicates, (err, res) => {
            if (err) console.log(err);
            console.log(`Inserted ${res.length} documents`);

            res.map(product => stock.push({product: product._id, quantity: getRandomStock(10, 500)}));
            Stock.create(stock, (err, res) => {
                if (err) console.log(err);
                console.log(`Inserted ${res.length} documents`);
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
    const products = $(".listing-ProductListingGrid_overlayWrapper__A5GZ8");
    products.each((index, el) => {
        const product = {};
        product.image = $(el).find('div > div > div > a > img').attr('src')
        product.name = $(el).find('div > div > div > div > h2').text()
        product.description = $(el).find('div > div > div > div > h2').text()
        const price = $(el).find('div > div > div > div > div').text()
        product.price = parseInt(price.includes('.') ? price.split('.')[0] : price.split(' ')[0])
        product.category = category;
        product.name.length > 0 && productsData.push(product);
    });
}

module.exports = {scrape};