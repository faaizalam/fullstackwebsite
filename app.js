const express = require("express");
const path = require("path");
const app = express(); 
const bodyparser = require("body-parser")
var  mongoose =require("mongoose");
// const { response } = require("express");

mongoose.connect('mongodb://localhost/don',{useNewUrlParser:true , useUnifiedTopology:true});


const port = 80;
// routs

const Comment = require('./models/comment')

app.use(express.json())

app.post('/postman/comments',(req,res)=>{
    const comment = new Comment ({
        username:req.body.username,
        comment:req.body.comment
    })
    comment.save().then(response=>{
        res.send(response)
    })
})





 
var newoneSchema = new mongoose.Schema({
    name: String,
    father: String,
    number: String,
    email: String,
    Address: String


});

var newone = mongoose.model('newone', newoneSchema)

app.use('/statics' ,express.static('statics'))
app.use(express.urlencoded())

app.set('views' , path.join(__dirname , 'views'));


app.get('/',(req, res)=>{
    const params ={ }
    res.status(200).render('home.pug',params);

})
app.get('/contact',(req,res)=>{
    const params ={ }
    res.status(200).render('contact.pug',params)
})

app.post('/contact',(req,res)=>{
    var myData = new newone(req.body)
    myData.save().then(()=>{
        res.send('been sent')
    }).catch(()=>{
        res.status(400).send('has not been sent')
    });
})
// about

app.get('/about',(req,res)=>{
    const params = { }
    res.status(200).render('about.pug',params)

})













// about end

const server = app.listen(port, ()=>{
    console.log(`application has been run ${port}`);

});
let io = require('socket.io')(server)

io.on('connection',(socket)=>{
    console.log(`new connection:${socket.id}`)

   socket.on('comment',(data)=>{
     data.time =Date()
       socket.broadcast.emit('comment',data)
   })
})


// to bring on screen in database
app.get('/postman/comments',(req,res)=>{
    Comment.find().then(comments=>{
        res.send(comments)
    })
})

