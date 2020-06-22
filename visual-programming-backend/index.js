const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const url = `mongodb://localhost/visal-programming`
mongoose.connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}, () => {
    console.log('mongodb connect success')
})

const app = new express()

app.use(express.json())
app.use(cors())

const User = require('./models/User')

app.get('/api/user', async (req, res) => {
    const users = await User.find()
    res.send(users)
})


app.post('/api/user', async (req, res) => {
    const user = await User.create({
        username: req.body.username,
        password: req.body.password
    })
    console.log(req.body)
    res.send(user)
})

app.delete('/api/user/:id', async (req, res) => {
    const user = await User.deleteOne({
        _id: req.params.id
    })

    res.send(user)
})

const Module = require('./models/Module')
app.get('/api/module', async (req, res) => {
    const modules = await Module.find().populate('user')
    res.send(modules)
})

app.post('/api/module', async (req, res) => {
    console.log(req.body)
    const module = await Module.create(req.body)
    res.send(module)
})

app.delete('/api/module/:id', async (req, res) => {
    const module = await Module.deleteOne({
        _id: req.params.id
    })
    res.send(module)
})

app.put('/api/module/:id', async (req, res) => {
    const module = await Module.findByIdAndUpdate(req.params.id, req.body)
    res.send(module)
})

app.listen(3000, () => {
    console.log(`http://localhost:3000`)
})