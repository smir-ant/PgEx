/*
статус при работе с sql | при подключении вызвать, setStatus()
*/

const statusElement = document.getElementById('status');

function setStatus(message) {
    console.log(message);
    statusElement.textContent = message;
}