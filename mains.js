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
        hand.style.width = `${(cards.length - 1) * 300}px`
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

hand.style.width = `${(cards.length - 1) * 300}px`

window.addEventListener("mouseup", function (e) {
    if (!dragging) return;
    cards[dragging].movement.style.transform = `translate(0%,0%)`;
    dragging = 0;
}, false);

function handleMouseMove(event) {
    if (event.buttons == 1 && dragging) {
        cards[dragging].move(event.clientX, event.clientY);
    }
}