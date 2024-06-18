export class Card {
    constructor(parent, callback) {
        let containerDiv = document.createElement('div');
        containerDiv.className = 'container';

        let cardDiv = document.createElement('div');
        cardDiv.className = 'card';

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

        let parent = this.movement.parentNode

        let [offsetX, offsetY] = [parent.getBoundingClientRect().x, parent.getBoundingClientRect().y];

        let index = Array.from(parent.children).indexOf(this.movement);
        let cardXoffset = 150 + (index * 300)

        this.movement.style.transform = `translate(${mouseX - offsetX - cardXoffset}px,${mouseY - offsetY - 200}px)`;

        let deltaX = this.x - mouseX;
        let deltaY = this.y - mouseY;

        let directionX = Math.sign(-deltaX);
        let directionY = Math.sign(-deltaY);

        let degX = Math.atan(Math.abs(deltaY) / Math.abs(deltaX)) * 180 / Math.PI;
        let degY = 90 - degX;

        degX = Math.min(degX, 45);
        degY = Math.min(degY, 45);

        this.rotation.style.transform = `rotateY(${degY * directionX}deg) rotateX(${degX * -directionY}deg)`;

        this.x = mouseX;
        this.y = mouseY;
    }

    mouse_stopped() {
        this.rotation.style.transform = `rotateY(${0}deg) rotateX(${0}deg)`;
        [this.x, this.y] = [0, 0];
    }

}