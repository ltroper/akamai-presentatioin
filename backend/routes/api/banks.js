const express = require('express');
const asyncHandler = require('express-async-handler');

const axios = require('axios')
const request = require("request")
const cheerio = require('cheerio')

const router = express.Router();


const url = "https://gee.bccr.fi.cr/IndicadoresEconomicos/Cuadros/frmConsultaTCVentanilla.aspx"



router.post("/", asyncHandler (async (req, res) => {
    const bank = req.body

    console.log(bank)
    request(url, (err, res, html) => {
        if (!err && res.statusCode == 200){
            const $ = cheerio.load(html)
            const table = $("#DG")

            const thisBank = table.find(bank).text()
            // console.log(table.text())
            // console.log(thisBank)
        }
    })
    // axios(url).then(res => {
    //     let html = res.data
    //     let $ = cheerio.load(html)
    //     $(bank, html)
    // })
    return "hello"
}))


module.exports = router
