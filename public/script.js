
const socket = io(); // to create a connectoin with the server without any console

$('#chat-box').hide()//hides the chatbox .hide() is a class in jquery

$('#send-btn').on('click' , ()=>{
    const msgText = $('#inp').val(); //get the value from text area
    if(!msgText){
        return;
    }
    else{
        // console.log(msgText);
    socket.emit('send-msg' , { //sending message to the pipeline
        msg:msgText
    })
    }
    $('#inp').val(""); // empties the textarea after we get the value
    
})

socket.on('received-msg' , (data)=>{
    console.log(data);
    //adding the element li and chat data inside the html
    $('#chat').append(`<li class="border mt-2 mb-2 p-2 rounded-pill bg-light"> <strong class="fw-bold">${data.username}:</strong> ->${data.msg}</li>`)
})

$('#login-btn').on('click' , ()=>{
    // console.log('clicked');
    const username = $('#username').val();
    //ab username server me bhi to bhejna padega na
    socket.emit('login' , { //sending the username toserver
        username:username
    })

    $('#login').hide();
    $('#chat-box').show();

    $('#username').val(""); // emptying the input 
})

