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
const websiteHarpers = "https://www.harpersbazaar.com/culture/features/a4056/empowering-female-quotes/"
const websiteCosmo = "https://www.cosmopolitan.com/uk/reports/a39363877/feminist-quotes/"
const websiteGoodReads = "https://www.goodreads.com/quotes/tag/feminism"
const websiteAudible = "https://www.audible.com/blog/quotes-feminist"
const websiteStylist = "https://www.stylist.co.uk/books/quotes/most-empowering-feminist-quotes-of-all-time-women-suffragette-feminism/61548"
const websiteParade = "https://parade.com/971993/marynliles/feminist-quotes/"
const resultFromScrape = []
 

const resultsFromCosmo = []
axios.get(websiteCosmo)
.then(res => {
    const html =  res.data
    const $ = cheerio.load(html)
})
const harperScrape = []
// app.get('/harperq', (req, res) => {
    axios.get(websiteHarpers)
    .then((res) => {
        const html =  res.data
        const $ = cheerio.load(html)
        $('.css-106f026', html).each(function () {
            const quote = $(this).text()
            $(this).find('a').each(() => {
                const author = $(this).text()
                // console.log({author})
                harperScrape.push({
                    quote,
                    author
                })
            })
        })
    }).catch(err => console.log(err))
// })

app.get("/goal", (req, res)=> {
    res.json(harperScrape)
})


//////////////////////////TRYING
const elevateQuotes = []
app.get('/ellevatenetwork', (req, res) => {
    axios.get('https://www.ellevatenetwork.com/articles/8013-inspirational-quotes-from-black-women-pioneers')
    .then((response) => {  const html = response.data
      const $ = cheerio.load(html)
      $('.formatted-content', html).each(function () {
        $(this).find('p').each(function () {
          herQuote = $(this).text()
          console.log({herQuote})
          herName = herQuote.substring(herQuote.indexOf("-") + 2)
          herQuote = herQuote.substring(0, herQuote.indexOf("-"))
          elevateQuotes.push({
            herName,
            herQuote,
          })
        });
     
      })

      let elevateNoDupes = []
      elevateQuotes.forEach(w => {
        let women = Object.fromEntries(Object.entries(w).filter(([_, w]) => w != ""));
        elevateNoDupes.push(women)
      })

      console.log(elevateNoDupes.length, 'less')
      res.json(elevateNoDupes)
    }).catch(err => { console.log(err) })
})
    // })
  //////////////////////


app.get('/harpersQuotes', (req, res) => {
        res.json(harperScrape)
    })

axios.get(websiteGoodgoodgood)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            
            $('p', html).each(function () {
                const text = $(this).text()
              
            })
            $('strong', html).each(function () {
                const text = $(this).text()
                resultFromScrape.push({
                   text,
                })
            })

        })
        
app.get('/quotes', (req, res) => {
    res.json(resultFromScrape)
})

const goodReadsQuotes = []
axios.get(websiteGoodReads)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            
            // $('p', html).each(function () {
            //     const text = $(this).text()
              
            // })
            $('.quoteText', html).each(function () {
                const text = $(this).text()
            //     const url = $(this).attr('href')

            goodReadsQuotes.push({
                   text,
                })
            })
        })
app.get('/goodReads', (req, res) => {
    res.json(goodReadsQuotes)
})

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))