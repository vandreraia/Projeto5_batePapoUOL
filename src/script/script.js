let from;
let objNome;
let message;

function getMensagens() {
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    promise.then(postMensagens);
    promise.catch(function(){alert("getMensagens error");});
}

function postMensagens(Mensagens) {
    const msgs = Mensagens.data;
    const el = document.querySelector("main")
    el.innerHTML = "";
    for(let i = 0; i < msgs.length; i++){
        if (msgs[i].type == "status"){
            el.innerHTML += `<div class='status'>(${msgs[i].time}) <b>${msgs[i].from}</b> ${msgs[i].text}</div>`;
        }
        if (msgs[i].type == "message"){
            el.innerHTML += `<div class='message'>(${msgs[i].time}) <b>${msgs[i].from}</b> para <b>${msgs[i].to}</b>: ${msgs[i].text}</div>`;
        }
        if (msgs[i].type == "private_message"){
            el.innerHTML += `<div class='private_message'>(${msgs[i].time}) <b>${msgs[i].from}</b> reservadamente para <b>${msgs[i].to}</b>: ${msgs[i].text}</div>`;
        }
    }
    document.querySelector(".scroller").scrollIntoView();
}

/*********/
function sendMensagem() {
    let to = "Todos";

    let text = document.querySelector("input").value;
    message = {
        from,
        to,
        text,
        type: "message"
    };

    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", message);
    promise.then()
    promise.catch(function () {
        alert("deu ruim");
    });
}

function entrarNaSala() {
    const nome = prompt("name");
    objNome = { nome };
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", objNome);
    promise.then(enterRoom);
    promise.catch(enterRoomError);
    from = nome;
}

function enterRoom() {
    setInterval(continuarNaRoom, 5000);
}

function continuarNaRoom(){
    axios.post("https://mock-api.driven.com.br/api/v6/uol/status", objNome);
}

function enterRoomError(error) {
    const statusCode = error.response.status;

    if (statusCode == 400) {
        alert("digite outro lindo nome, pois o esse seu lindo nome já está em uso")
        entrarNaSala();
    }
}

function menuShow(){
    el = document.querySelector(".overlay");
    el.classList.remove("hide");
}

function menuHide(){
    el = document.querySelector(".overlay");
    el.classList.add("hide");
}

function scroll(){
    window.scrollTo(0, document.body.scrollHeight)
}

function getParticipantes(){
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/participants");
    promise.then(postParticipantes);
    promise.catch(function(){alert("getParticipantes error");});
}
let participante;
function postParticipantes(participantes) {
    participante = participantes.data;
    const el = document.querySelector("main")
    el.innerHTML = "";
    // for(let i = 0; i < msgs.length; i++){
    //     if (msgs[i].type == "status"){
    //         el.innerHTML += `<div class='status'>(${msgs[i].time}) <b>${msgs[i].from}</b> ${msgs[i].text}</div>`;
    //     }
    //     if (msgs[i].type == "message"){
    //         el.innerHTML += `<div class='message'>(${msgs[i].time}) <b>${msgs[i].from}</b> para <b>${msgs[i].to}</b>: ${msgs[i].text}</div>`;
    //     }
    //     if (msgs[i].type == "private_message"){
    //         el.innerHTML += `<div class='private_message'>(${msgs[i].time}) <b>${msgs[i].from}</b> reservadamente para <b>${msgs[i].to}</b>: ${msgs[i].text}</div>`;
    //     }
    // }
}
getMensagens();
setTimeout(scroll, 1000);
entrarNaSala();
setInterval(getMensagens, 3000);
getParticipantes();
//setInterval(scroll, 10000);