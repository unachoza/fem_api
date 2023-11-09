const PORT = process.env.PORT || 8000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const app = express()


app.get('/', (req, res) => {
    res.json('find quotes here')
})

app.get('/arianna', (req, res) => {
    res.json('arianna')
})

const websiteGoodgoodgood = "https://www.goodgoodgood.co/articles/feminist-quotes#:~:text=%E2%80%9CI%20raise%20up%20my%20voice,of%20us%20are%20held%20back.%E2%80%9D&text=%E2%80%9CEach%20time%20a%20woman%20stands,stands%20up%20for%20all%20women.%E2%80%9D"

const resultFromScrape = []
axios.get(websiteGoodgoodgood)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            
            $('strong', html).each(function () {
                const text = $(this).text()
            //     const url = $(this).attr('href')

                resultFromScrape.push({
                   text,
                //    author
                   
                })
                // console.log(resultFromScrape.length)
            })

            //if a tag after "- " move to atag


        })
        
app.get('/quotes', (req, res) => {
    res.json(resultFromScrape)
})


app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))