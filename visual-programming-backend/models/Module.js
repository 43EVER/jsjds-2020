const mongoose = require('mongoose')

const ModuleSchema = new mongoose.Schema({
    modulename: { type: String, unique: true },
    data: Object,
    description: { type: String },
    path: { type: String},
    user: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' }
})

const Module = mongoose.model('Module', ModuleSchema)

module.exports = Module