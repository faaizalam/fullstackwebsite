let username
let socket = io()


do {
    username = prompt('enter your name');
} while(!username)


const textarea = document.querySelector('#textarea')
const btnc = document.querySelector('#btnc')

const commentbox = document.querySelector('.commentbox')

btnc.addEventListener('click',(e)=>{
    e.preventDefault()
    let comment =textarea.value
    if(!comment){
        return
    }
    postComment(comment)
})

function postComment(comment) {
    let data ={
        username: username,
        comment : comment
    }
    appendTodom(data)
    textarea.value =''
    broadcastComment(data)

    syncWithDb(data)
    
}
function appendTodom(data) {

let ltag =document.createElement('li')
ltag.classList.add('comment','cardbody')


let markup = `

    <div class="cardbody">
        <h3>${data.username}</h3>
        <p>${data.comment}</p>
        <div class="img">
            <img src="../statics/download.jfif" alt="">
            <small>${moment(data.time).format('LT')}</small>
        </div>
    </div>


`





ltag.innerHTML=markup
commentbox.prepend(ltag)

}

function broadcastComment(data) {
    
    socket.emit('comment',data)
}
socket.on('comment',(data)=>{
    appendTodom(data)
})


// api calls
function syncWithDb(data) {

    const headers={
        'content-Type':'application/json'
    }
    fetch('/postman/comments',{method:'post',body:JSON.stringify(data),headers})
    .then(response=> response.json())
    .then(result=>{
        console.log(result)
    })
    
}



// to keep commnets on screen after saving data in database

function fetchComments() {
    fetch('/postman/comments')
    .then(res=>res.json())
    .then(result=> {
        result.forEach((comment)=>{
        comment.time=comment.createdAt
        appendTodom(comment)
        })
        
        
    })
    
}
window.onload =fetchComments