

const socket = new WebSocket(`wss://${window.location.host}`);
const input = document.querySelector('input');
const messagesDiv = document.getElementById('messages');

//const input = document.getElementById('message');
input.addEventListener('keypress', function (e) {

    if (e.code === 'Enter') {
        document.getElementById('btn').click();
    }
})

socket.onmessage = async function (e) {

    const div = document.createElement('div');
    if (e.data instanceof Blob) {
        div.textContent = await e.data.text();
    } else {
        div.textContent = e.data;
    }
    messagesDiv.appendChild(div);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function sendMessage() {

    if (input?.value.trim() !== '') {
        socket.send(input.value);
        input.value = '';
    }
}