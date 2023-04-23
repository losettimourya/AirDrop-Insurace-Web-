const mongoose = require('mongoose')

const InsuranceOptionSchema = new mongoose.Schema({
    Name: { type: String, required: true },
    Description: { type: String, required: true },
    Price: { type: Number, required: true },
    Expirationdate: { type: Date, required: true },
    Creationdate: { type: Date, required: true },
    provider:{type:String},
    Payout:{type:Number,required:true},
    Automated:{type:Boolean}
})

InsuranceOptionSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject.__v 
    }
})

const InsuranceOption = mongoose.model('InsuranceOption', InsuranceOptionSchema)

module.exports = InsuranceOption