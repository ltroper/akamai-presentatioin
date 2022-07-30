const express = require('express');
const asyncHandler = require('express-async-handler');

const axios = require('axios')
const request = require('request');
const cheerio = require('cheerio')

const router = express.Router();


const url = "https://gee.bccr.fi.cr/IndicadoresEconomicos/Cuadros/frmConsultaTCVentanilla.aspx"



router.post("/", (async (req, res) => {
    const bank = req.body
    // console.log(req, bank, "HERE")
    let banksArr = []

    axios(url).then(response => {
        const html = response.data
        const $ = cheerio.load(html)

        const banks = $('#DG > tbody > tr').text()
        console.log(banks)
            let listOfBanks = banks.split("\n")
            listOfBanks.forEach(ele => {
                let str = ele.replace(/\s/g, '')
                banksArr.push([str])
            })

        let resArray = banksArr.filter(arr => arr[0].length > 0)
        resArray.shift()
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
