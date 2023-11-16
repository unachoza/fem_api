const PORT = process.env.PORT || 8000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const app = express()


app.get('/', (req, res) => {
    res.json('find quotes here')
})


const websiteGoodgoodgood = "https://www.goodgoodgood.co/articles/feminist-quotes#:~:text=%E2%80%9CI%20raise%20up%20my%20voice,of%20us%20are%20held%20back.%E2%80%9D&text=%E2%80%9CEach%20time%20a%20woman%20stands,stands%20up%20for%20all%20women.%E2%80%9D"
const websiteHarpers = "https://www.harpersbazaar.com/culture/features/a4056/empowering-female-quotes/"
const websiteCosmo = "https://www.cosmopolitan.com/uk/reports/a39363877/feminist-quotes/"
const websiteGoodReads = "https://www.goodreads.com/quotes/tag/feminism"
const websiteAudible = "https://www.audible.com/blog/quotes-feminist"
const websiteStylist = "https://www.stylist.co.uk/books/quotes/most-empowering-feminist-quotes-of-all-time-women-suffragette-feminism/61548"
const websiteParade = "https://parade.com/971993/marynliles/feminist-quotes/"
const resultFromScrape = []
 

const cleanStrings = (string) => {
     string = (string.replace(/\n/g, "")).replace(/―/g, "")
     let newString = string.trim()
     return newString
}

const removeDuplicateEntries = (dataArray) => {
    const cleanDataArray = []
    dataArray.forEach(obj => {
        let entry = Object.fromEntries(Object.entries(obj).filter(([_, obj]) => obj != ""));
        if(Object.keys(entry).length > 1){
            cleanDataArray.push(entry)
        }
      })
      return cleanDataArray
}

const resultsFromCosmo = []
axios.get(websiteCosmo)
.then(res => {
    const html =  res.data
    const $ = cheerio.load(html)
    $(".css-106f026", html).each(function() {
        let text = $(this).text()
        let quote = ""
        if(text.includes(")")){
            quote = text.substring(text.indexOf(")")+1)
        }
        let author = ""
        if(text.includes("– ")){
            author = text.replace(/–/g, "")
            author = cleanStrings(author)
        }
        resultsFromCosmo.push({
            quote,
            author
        })
        removeDuplicateEntries(resultsFromCosmo)

    })
})



const harperScrape = []
    axios.get(websiteHarpers)
    .then((res) => {
        const html =  res.data
        const $ = cheerio.load(html)
        $('.css-106f026', html).each(function () {
            let quote = $(this).text()
            $(this).find('em').each(function () {
                const author = $(this).text()
                quote = quote.substring(0, quote.lastIndexOf(author))
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


//////////////////////////Works
const elevateQuotes = []
app.get('/ellevatenetwork', (req, res) => {
    axios.get('https://www.ellevatenetwork.com/articles/8013-inspirational-quotes-from-black-women-pioneers')
    .then((response) => {  const html = response.data
      const $ = cheerio.load(html)
      $('.formatted-content', html).each(function () {
        $(this).find('p').each(function () {
          herQuote = $(this).text()
          herName = herQuote.substring(herQuote.indexOf("-") + 2)
          herQuote = herQuote.substring(0, herQuote.indexOf("-"))
          elevateQuotes.push({
            quote: herQuote,
            author: herName,
          })
        });
     
      })

      let elevateNoDupes = []
      elevateQuotes.forEach(w => {
        let women = Object.fromEntries(Object.entries(w).filter(([_, w]) => w != ""));
        elevateNoDupes.push(women)
      })

      res.json(elevateNoDupes)
    }).catch(err => { console.log(err) })
})


app.get('/harpersQuotes', (req, res) => {
        res.json(harperScrape)
    })
    
    const scrapeWithOut = []
axios.get(websiteGoodgoodgood)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            
            $('p', html).each(function () {
                const text = $(this).text()
                let hyphen = text.lastIndexOf("—")
                let comma = text.lastIndexOf(",")
                let quote = text.substring(0, hyphen)
                let author = text.substring(hyphen + 2 )
                if(author.indexOf(",") !== -1){
                    author = author.substring(0, author.indexOf(","))
                }
                resultFromScrape.push({
                    quote,
                    author
                 })
            })
            resultFromScrape.forEach(obj => {
                let quoteObject = Object.fromEntries(Object.entries(obj).filter(([_, obj]) => obj != ""));
                if(Object.keys(quoteObject).length > 1){

                    scrapeWithOut.push(quoteObject)
                }
              })

        })

app.get('/quotes', (req, res) => {
    res.json(scrapeWithOut)
})

const goodReadsQuotes = []
axios.get(websiteGoodReads)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            $('.quoteText', html).each(function () {
                const text = $(this).text()
                const start = text.indexOf('')
            let q = text.substring(start + 7, text.indexOf('―' ) - 8)
            q = cleanStrings(q)
            let author = text.substring(text.indexOf('―'))
            let trimmedAuthor = cleanStrings(author)
            if (author.indexOf(",") !== -1){
                author = text.substring(text.indexOf('―'), text.lastIndexOf(',') )
                trimmedAuthor = cleanStrings(author)
            }
              goodReadsQuotes.push({
                           text: q,
                           author: trimmedAuthor
                        })
            })
        })
            .catch(err => console.log(err))

        app.get('/goodReads', (req, res) => {
res.json(goodReadsQuotes)
})

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))