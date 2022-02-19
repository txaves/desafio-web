const retrieveUsers = async  () => {
    let response = await fetch('https://run.mocky.io/v3/d615cab5-8e86-48e6-acf3-411878eec01d');
    response = await response.json();
    return response.senders;
}

const retrieveMessages = async  () => {
    let response = await fetch('https://run.mocky.io/v3/1cc823d1-af23-4501-9b70-c8c78d11b0f9');
    response = await response.json();
    return response.messages;
}

const fillUserList = (userList) => {
    userList.forEach(element => {
        $("#userList").append(`<li>${element}</li>`);
    });

}

const addMessage = (sender, message) => {
    $("#history").append(`<div class="msg"><span>${sender} falou:  ${message}</span></div>`);
    $("#history").scrollTop($("#history").height());
} 

const showMessages = (messages) => {
    const interval = 2000;
    const size = messages.length;
    let lastIndex = 0;
    setInterval(function () {
        addMessage(messages[lastIndex].sender, messages[lastIndex].msg);
        lastIndex === size - 1 ? lastIndex = 0 : lastIndex++;
    }, interval);
}

const sendMessage = () => {
    if($("#message").val() !== ""){
        addMessage('Você', $("#message").val());
        $("#message").val("");
    }
}

window.onload = async () =>{
    $("#button").click(() => {
        sendMessage();
    });
    $("#message").on('keyup', (event) => {
        if(event.which === 13) sendMessage();
    });  
    const users = await retrieveUsers();
    fillUserList(users);
    const messages = await retrieveMessages();
    showMessages(messages);
}