export class Card {
    constructor(parent, callback) {
        let containerDiv = document.createElement('div');
        containerDiv.className = 'container';

        let cardDiv = document.createElement('div');
        cardDiv.className = 'card';

        cardDiv.onmouseenter = () => {
            this.card.style.height = `500px`;
            this.card.style.width = `375px`;
        }
        cardDiv.onmouseleave = () => {
            this.card.style.height = `400px`;
            this.card.style.width = `300px`;
        }

        containerDiv.appendChild(cardDiv);
        parent.appendChild(containerDiv);

        containerDiv.onmousedown = callback;

        this.container = containerDiv;
        this.card = cardDiv;
    }

    x = 0
    y = 0
    timer

    move(mouseX, mouseY) {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => this.mouse_stopped(), 100);

        let parent = this.container.parentNode;

        const width = window.innerWidth;
        const height = window.innerHeight;

        let [offsetX, offsetY] = [parent.getBoundingClientRect().x, parent.getBoundingClientRect().y];
        let [cardX, cardY] = [this.card.getBoundingClientRect().x - width / 2, this.card.getBoundingClientRect().y - height / 2];

        let index = Array.from(parent.children).indexOf(this.container);
        let cardXoffset = 150 + (index * 300)

        this.container.style.transform = `translate(${mouseX - offsetX - cardXoffset}px,${mouseY - offsetY - 250}px)`;

        let deltaX = this.x - mouseX;
        let deltaY = this.y - mouseY;

        let directionX = Math.sign(-deltaX);
        let directionY = Math.sign(-deltaY);

        let degX = Math.atan(Math.abs(deltaY) / Math.abs(deltaX)) * 180 / Math.PI;
        let degY = 90 - degX;

        degX = Math.min(degX, 45);
        degY = Math.min(degY, 45);

        let shadowX = (cardX / (width / 2)) * -150
        let shadowY = (cardY / (height / 2)) * -150

        this.card.style.boxShadow = `${shadowX}px ${shadowY}px 21px 0px rgba(0, 0, 0, 0.45)`;
        this.card.style.transform = `rotateY(${degY * directionX}deg) rotateX(${degX * -directionY}deg) rotateZ(${15 * -directionX}deg)`;

        this.card.style.height = `500px`;
        this.card.style.width = `375px`;

        this.x = mouseX;
        this.y = mouseY;
    }

    mouse_stopped() {
        this.card.style.transform = `rotateY(${0}deg) rotateX(${0}deg)`;
        [this.x, this.y] = [0, 0];
    }

    reset_position() {
        this.container.style.transform = `translate(0%,0%)`;
        this.card.style.boxShadow = `${0}px ${0}px 0px 0px rgba(0, 0, 0, 0.45)`;
        this.card.style.height = `400px`;
        this.card.style.width = `300px`;

    }

}