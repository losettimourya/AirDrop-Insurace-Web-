const InsuranceOption = require("../models/InsuranceOption.model")
const config = require('../utils/config')
const Posts = require("../models/Posts.model")
const Report = require("../models/Report.model")
const { request } = require('express')
const InsuranceOptionRouter = require('express').Router()
InsuranceOptionRouter.post('/', async (request, response) => {
    const { Name,
        Description,
        Price,
        Expirationdate,
        Creationdate,
        provider,
        Payout,
        Automated } = request.body
    if (!Name || !Description) {
        return response.status(400).json({
            error: 'Name or Description is Null'
        })
    }
    const InsuranceOption = new InsuranceOption({
        Name,
        Description,
        Price,
        Expirationdate,
        Creationdate,
        provider,
        Payout,
        Automated
    })
    const savedInsuranceOption = await InsuranceOption.save()
    console.log(savedInsuranceOption)
    response.status(201).json(savedInsuranceOption)
})

InsuranceOptionRouter.get('/', async (request, response) => {
    const AllInsuranceOptions = await InsuranceOption
        .find({})
    response.json(AllInsuranceOptions)
})

InsuranceOptionRouter.get('/:id', async (request, response) => {
    const ID = request.params.id
    const InsuranceOption = await InsuranceOption.findById(ID)
    console.log(InsuranceOption)
    response.json(InsuranceOption)
})

InsuranceOptionRouter.delete('/:id', async (request, response) => {
    const ID = request.params.id
    const InsuranceOption = await InsuranceOption
        .findById(ID)
    const DeleteInsuranceOption = await InsuranceOption.findByIdAndDelete(ID)
    response.json(DeleteInsuranceOption)
})

module.exports = InsuranceOptionRouter










