const express = require('express');
const asyncHandler = require('express-async-handler');

const axios = require('axios')
const request = require('request');
const cheerio = require('cheerio')

const router = express.Router();


const url = "https://gee.bccr.fi.cr/IndicadoresEconomicos/Cuadros/frmConsultaTCVentanilla.aspx"



router.post("/", (async (req, res) => {
    const data = req.body
    let banksArr = []

    axios(url).then(response => {
        const html = response.data
        const $ = cheerio.load(html)

        const banks = $('#DG > tbody > tr')
        let tipoBanco
        banks.each((index, element) => {
            const tds = $(element).find("td");

            // if($(tds[0]).text().trim() !== "")
            let col1 = $(tds[0]).text().trim();
            if (col1.length > 0) tipoBanco = col1
            else col1 = tipoBanco
            const col2 = $(tds[1]).text().trim();
            const col3 = $(tds[2]).text().trim();
            const col4 = $(tds[3]).text().trim();
            const col5 = $(tds[4]).text().trim();
            const col6 = $(tds[5]).text().trim();
            const row = [col1,col2,col3,col4,col5,col5,col6]
            banksArr.push(row)
        });

        banksArr.shift()
        banksArr.pop()
        let resArray = banksArr.filter(ele => ele[1].toLowerCase().includes(data.bank.toLowerCase()))
        return res.json(resArray)

    })
    // const response = request(url, (err, res, html) => {
    //     if (!err && res.statusCode == 200){
    //         const $ = cheerio.load(html)


    //         const banks = $('#DG > tbody > tr').text()
    //         let listOfBanks = banks.split("\n")
    //         listOfBanks.forEach(ele => {
    //             banksArr.push([ele])
    //         })
    //     }
    //     return banksArr
    // })
    // console.log(response)
    // return res1.json(response)


}))


module.exports = router
