//core modules
const fs = require('fs');
const http = require('http')
const url = require('url')

//3rd party modules
//const slugify=require('slugify')

//user defined modules
const replaceTemplate = require('./modules/replaceTemplate')


//this block will execute only once so not a problem to use Sync
const data = fs.readFileSync('/home/ubuntu/repos/React/LearningNode/complete-node-bootcamp/1-node-farm/starter/dev-data/data.json', 'utf-8');
const productData = JSON.parse(data);
const overviewData = fs.readFileSync('/home/ubuntu/repos/React/LearningNode/complete-node-bootcamp/1-node-farm/starter/templates/template-overview.html', 'utf-8')
const templateCard = fs.readFileSync('/home/ubuntu/repos/React/LearningNode/complete-node-bootcamp/1-node-farm/starter/templates/template-card.html', 'utf-8')
const templateProduct = fs.readFileSync('/home/ubuntu/repos/React/LearningNode/complete-node-bootcamp/1-node-farm/starter/templates/template-product.html', 'utf-8')

//const slugs = productData.map(el => slugify(el.productName, { lower: true }))


//callback fn executes everytime a new req hits the server
const server = http.createServer((req, res) => {

    const { pathname, query } = url.parse(req.url, true);

    if (pathname === '/' || pathname === '/overview') {
        res.writeHead(200, {
            'content-type': 'text/html'
        })

        const cardHtml = productData.map(el => replaceTemplate(templateCard, el)).join('');
        const out = overviewData.replace('{%PRODUCT_CARDS%}', cardHtml)
        res.end(out);
    }
    else if (pathname === '/product') {
        res.writeHead(200, {
            'content-type': 'text/html'
        })
        const product = productData[query.id];
        const out = replaceTemplate(templateProduct, product)
        res.end(out);
    }
    else if (pathname === '/api') {
        res.writeHead(200, {
            'content-type': 'application/json'
        })
        res.end(data)
    }
    else {
        res.writeHead(404, { // to give info to the browser
            'content-type': 'text/html',
            'my-own-header': 'hello-world'
        })
        res.end("<h1>PAGE NOT FOUND</h1>") // set the header info before sending out the response
    }


})

server.listen(8001, "localhost", () => {
    console.log("Server Started!")
})