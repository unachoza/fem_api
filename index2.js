const PORT = process.env.PORT || 8010
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const app = express()


app.get('/', (req, res) => {
    res.json('find quotes here')
})

const websiteParade = "https://parade.com/971993/marynliles/feminist-quotes/"
const websiteAudible = "https://www.audible.com/blog/quotes-feminist"
const audibleScrape = []

axios.get(websiteAudible)
.then(res => {
    const html =  res.data
    const $ = cheerio.load(html)
    $("p", html).each(function () {
        let quoteAndAuthor = $(this).text()
        let hyphen = quoteAndAuthor.lastIndexOf("—")
        let comma = quoteAndAuthor.lastIndexOf(",") -3
        quoteAndAuthor = quoteAndAuthor.substring((quoteAndAuthor.indexOf("."))+ 1)
        let author = quoteAndAuthor.substring((hyphen) - 1 ,comma + 1)
        audibleScrape.push({
            quote: quoteAndAuthor,
            author
        })

    })
}).catch(error => console.log({error}))
app.get('/audible', (req, res) => {
   
    res.json(audibleScrape)
})


app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))