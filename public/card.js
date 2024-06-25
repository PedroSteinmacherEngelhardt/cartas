export class Card {
    constructor(parent, callback) {
        let containerDiv = document.createElement('div');
        containerDiv.className = 'container';

        let cardDiv = document.createElement('div');
        cardDiv.className = 'card';

        cardDiv.onmouseenter = () => {
            this.rotation.style.height = `500px`;
            this.rotation.style.width = `375px`;
        }
        cardDiv.onmouseleave = () => {
            console.log('leave')
            this.rotation.style.height = `400px`;
            this.rotation.style.width = `300px`;
        }

        containerDiv.appendChild(cardDiv);
        parent.appendChild(containerDiv);

        containerDiv.onmousedown = callback;

        this.movement = containerDiv;
        this.rotation = cardDiv;
    }

    x = 0
    y = 0
    timer

    move(mouseX, mouseY) {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => this.mouse_stopped(), 100);

        let parent = this.movement.parentNode;

        const width = window.innerWidth;
        const height = window.innerHeight;

        let [offsetX, offsetY] = [parent.getBoundingClientRect().x, parent.getBoundingClientRect().y];
        let [cardX, cardY] = [this.rotation.getBoundingClientRect().x - width / 2, this.rotation.getBoundingClientRect().y - height / 2];

        let index = Array.from(parent.children).indexOf(this.movement);
        let cardXoffset = 150 + (index * 300)

        this.movement.style.transform = `translate(${mouseX - offsetX - cardXoffset}px,${mouseY - offsetY - 250}px)`;

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

        this.rotation.style.boxShadow = `${shadowX}px ${shadowY}px 21px 0px rgba(0, 0, 0, 0.45)`;
        this.rotation.style.transform = `rotateY(${degY * directionX}deg) rotateX(${degX * -directionY}deg) rotateZ(${15 * -directionX}deg)`;

        this.rotation.style.height = `500px`;
        this.rotation.style.width = `375px`;

        this.x = mouseX;
        this.y = mouseY;
    }

    mouse_stopped() {
        this.rotation.style.transform = `rotateY(${0}deg) rotateX(${0}deg)`;
        [this.x, this.y] = [0, 0];
    }

    reset_position() {
        this.movement.style.transform = `translate(0%,0%)`;
        this.rotation.style.boxShadow = `${0}px ${0}px 0px 0px rgba(0, 0, 0, 0.45)`;
        this.rotation.style.height = `400px`;
        this.rotation.style.width = `300px`;

    }

}