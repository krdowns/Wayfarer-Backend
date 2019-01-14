const mongoose = require('../models/City')
const data = require('./city-data')

const City = mongoose.model('City')

City.remove({})
    .then(_ => {
        City.collection.insert(data)
            .then(seededEntries => {
                console.log(seededEntries)
                process.exit()
            })
    })
    .catch(err => {
        console.log(err)
    })