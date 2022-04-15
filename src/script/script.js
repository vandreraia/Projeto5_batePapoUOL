let objNome;
let message;
let from;
let to = "Todos";
let type = "message";

function getMensagens() {
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    promise.then(postMensagens);
    promise.catch(function () { alert("getMensagens error"); });
}

function postMensagens(Mensagens) {
    const msgs = Mensagens.data;
    const el = document.querySelector("main")
    el.innerHTML = "";
    for (let i = 0; i < msgs.length; i++) {
        if (msgs[i].type == "status") {
            //el.innerHTML += `<div class='status'>(${msgs[i].time}) <b>${msgs[i].from}</b> ${msgs[i].text}</div>`;
        }
        if (msgs[i].type == "message") {
            el.innerHTML += `<div class='message'>(${msgs[i].time}) <b>${msgs[i].from}</b> para <b>${msgs[i].to}</b>: ${msgs[i].text}</div>`;
        }
        if (msgs[i].type == "private_message") {
            if (msgs[i].to == from){
            el.innerHTML += `<div class='private_message'>(${msgs[i].time}) <b>${msgs[i].from}</b> reservadamente para <b>${msgs[i].to}</b>: ${msgs[i].text}</div>`;
            }
        }
    }
    document.querySelector(".scroller").scrollIntoView();
}

function sendMensagem() {
    let text = document.querySelector("input").value;
    message = {
        from,
        to,
        text,
        type
    };

    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", message);
    promise.then()
    promise.catch(function () {
        console.log("sendMensagem fail");
    });
}

function entrarNaSala() {
    let name = "ana catarina";//prompt("Qual seu nome?");
    objNome = { name };
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", objNome);
    promise.then(enterRoom);
    promise.catch(enterRoomError);
    from = name;
}

function enterRoom() {
    setInterval(continuarNaRoom, 4000);
}

function continuarNaRoom() {
    axios.post("https://mock-api.driven.com.br/api/v6/uol/status", objNome);
}

function enterRoomError(error) {
    const statusCode = error.response.status;

    if (statusCode == 400) {
        console.log("entrarNaSala error")
        //alert("digite outro lindo nome, pois o esse seu lindo nome já está em uso")
        //entrarNaSala();
    }
}

function menuShow() {
    let el = document.querySelector(".overlay");
    el.classList.remove("hide");
    el = document.querySelector(".menu-lateral");
    el.classList.remove("hide");
}

function menuHide() {
    let el = document.querySelector(".overlay");
    el.classList.add("hide");
    el = document.querySelector(".menu-lateral");
    el.classList.add("hide");
}

function scroll() {
    window.scrollTo(0, document.body.scrollHeight)
}

function getParticipantes() {
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/participants");
    promise.then(postParticipantes);
    promise.catch(function () { console.log("getParticipantes error"); });

}

function postParticipantes(participantes) {
    const participante = participantes.data;
    const el = document.querySelector(".populate")
    el.innerHTML = `
    <div class="to selected" onclick="selectContact(this)">
        <div>
            <ion-icon name="people"></ion-icon>
            <spam>Todos</spam>
        </div>
        <div class="ion selected">
            <ion-icon name="checkmark-outline"></ion-icon>
        </div>
    </div>`;
    for (let i = 0; i < participante.length; i++) {
        el.innerHTML += `
        <div class="to" onclick="selectContact(this)">
            <div>
                <ion-icon name="people"></ion-icon>
                <spam>${participante[i].name}</spam>
            </div>
            <div class="ion">
                <ion-icon name="checkmark-outline"></ion-icon>
            </div>
        </div>`;
    }
}

function selectContact(contato) {
    const el = contato;
    const selected = document.querySelector(".to.selected");
    to = el.querySelector("spam").innerHTML;
    selected.classList.remove("selected");
    el.classList.add("selected");
    selected.querySelector(".ion").classList.remove("selected");
    el.querySelector(".ion").classList.add("selected");
}

function selectPubico() {
    type = "message";
    el = document.querySelector(".visibilidade");
    el.innerHTML = `
    <div class="to" onclick="selectPubico()">
        <div>
            <ion-icon name="lock-closed"></ion-icon>
            <spam>Público</spam>
        </div>
        <ion-icon name="checkmark-outline"></ion-icon>
    </div>
    <div class="to" onclick="selectReservadamente()">
        <div>
            <ion-icon name="lock-closed"></ion-icon>
            <spam>Reservadamente</spam>
        </div>
    </div>`
    el = document.querySelector("footer");
    el.innerHTML = `
    <input placeholder="Escreva aqui..." type="text">
    <ion-icon onclick="sendMensagem()" size="large" name="paper-plane-outline"></ion-icon>`;
}

function selectReservadamente() {
    type = "private_message";
    el = document.querySelector(".visibilidade");
    el.innerHTML = `
    <div class="to" onclick="selectPubico()">
        <div>
            <ion-icon name="lock-closed"></ion-icon>
            <spam>Público</spam>
        </div>
    </div>
    <div class="to" onclick="selectReservadamente()">
        <div>
            <ion-icon name="lock-closed"></ion-icon>
            <spam>Reservadamente</spam>
        </div>
        <ion-icon name="checkmark-outline"></ion-icon>
    </div>`
    el = document.querySelector("footer");
    el.innerHTML = `
    <div>
        <input placeholder="Escreva aqui..." type="text">
        <spam>Enviando para ${to} (reservadamente)</spam>
    </div>
    <ion-icon onclick="sendMensagem()" size="large" name="paper-plane-outline"></ion-icon>`;
}

function sendOnEnter() {
    el = document.querySelector("input")
    el.addEventListener('keydown', function (event) {
        if (event.key === "Enter") {
            sendMensagem();
        }
    })
}

getMensagens();
entrarNaSala();
sendOnEnter();
getParticipantes();
setInterval(getMensagens, 3000);
setInterval(getParticipantes, 10000);
//setInterval(scroll, 10000);