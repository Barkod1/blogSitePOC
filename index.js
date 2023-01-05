var express = require('express');
var path = require('path');
var app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/dvartorahs', {useNewUrlParser: true, useUnifiedTopology: true});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('public', path.join(__dirname, 'public'));
app.use(express.urlencoded({extended: true}))
app.set('view engine', 'ejs');

const DvarTorahsSchema = new mongoose.Schema({
    writer: {
        type: String
    },
    header: {
        type: String
    },
    content: {
        type: String
    },
    parasha: {
        type: String
    }
  });

const Torah = mongoose.model('Torah', DvarTorahsSchema);

app.get('/', async (req, res) => {

    if(!req.query.q){
        let divrei = await Torah.find({})
        res.render('home', {divrei});
    }
    else{
        let divrei = await Torah.find({parasha: req.query.q})
        res.render('home', {divrei});
    }
    
})
app.get('/new', (req, res) => {
    res.render('new');
})
app.post('/', async (req, res) => {
    
    const newDvar = new Torah(req.body);
    console.log(newDvar);
    await newDvar.save();
    
    res.redirect('/')
})

app.get('/:id', async (req, res) => {
const {id} = req.params
    const dvar = await Torah.findById(id)
    res.render('dvarTorah', {dvar})
})
// app.get('/search', async (req, res) => {
//     res.send(req.query)
//      const divrei = await Torah.find({parasha: req.query.q}).then((re) => {
//          console.log(re)
//      }).catch((err) => {
//          console.log(err)
//      })
//      res.render('/search', {divrei})
// })
app.listen(3000, function (){
    console.log("listening on port 3000!")
})

module.exports = app;