import { Card } from "./card.js";

document.onmousemove = handleMouseMove;

const hand = document.getElementById("hand");
const table = document.getElementById("table");

table.onmouseup = () => {
    if (dragging) {
        hand.removeChild(cards[dragging].movement)
        table.appendChild(cards[dragging].movement)
        pile[dragging] = cards[dragging].clone()
        delete cards[dragging]
    }
}

let dragging = null;

let cards = {}
let pile = {}

for (let index = 1; index <= 6; index++) {
    let uuid = crypto.randomUUID();

    let callback = () => {
        dragging = uuid;
    }

    let card = new Card(hand, callback);

    cards[uuid] = card;
}

window.addEventListener("mouseup", function (e) {
    if (!dragging) return;
    cards[dragging].reset_position();
    dragging = 0;
}, false);

function handleMouseMove(event) {
    if (event.buttons == 1 && dragging) {
        cards[dragging].move(event.clientX, event.clientY);
    }
}