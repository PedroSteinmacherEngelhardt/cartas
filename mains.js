import { Card } from "./card.js";

document.onmousemove = handleMouseMove;

const hand = document.getElementById("hand");
const table = document.getElementById("table");

table.onmouseup = () => {
    if (dragging) {
        console.log(hand.children)
        console.log(cards[dragging])
        hand.removeChild(cards[dragging].movement)
        table.appendChild(cards[dragging].movement)
        cards.splice(dragging, 1)
        hand.style.width = `${(cards.length - 1) * 300}px`
    }
}

let dragging = 0;

let cards = [0]

for (let index = 1; index <= 4; index++) {
    let containerDiv = document.createElement('div');
    containerDiv.className = 'container';

    let cardDiv = document.createElement('div');
    cardDiv.className = 'card';

    containerDiv.appendChild(cardDiv);
    hand.appendChild(containerDiv);

    let card = new Card(containerDiv, cardDiv);

    containerDiv.onmousedown = () => {
        dragging = index;
    }

    cards.push(card);
}

hand.style.width = `${(cards.length - 1) * 300}px`

window.addEventListener("mouseup", function (e) {
    if (!dragging) return;
    cards[dragging].movement.style.transform = `translate(0%,0%)`;
    dragging = 0;
}, false);

function handleMouseMove(event) {
    let [offsetX, offsetY] = [hand.getBoundingClientRect().x, hand.getBoundingClientRect().y];
    if (event.buttons == 1 && dragging) {
        cards[dragging].move(event.clientX, event.clientY, offsetX, offsetY, dragging - 1);
    }
}