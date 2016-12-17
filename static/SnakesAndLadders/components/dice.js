class Dice{
    constructor() {
        this._ANGLE = {
            1: {x: -10, y: -10, z: 0},
            2: {x: -10, y: 260, z: 0},
            3: {x: 80,  y: 0,   z: 10},
            4: {x: 260, y: 0,   z: -10},
            5: {x: 260, y: 0,   z: 80},
            6: {x: -10, y: 170, z: 90},
        }
    }

    _angleGenerator() {
        let factor    = Math.floor(1 + Math.random() * 6);
        let {x, y, z} = this._ANGLE[factor];
        return {
            x: x + 3600,
            y: y + 3600,
            z: z + 3600,
            factor
        };
    };

    roll(callback, speed = 750) {
        let dice = document.querySelectorAll('.cubic')[0];
        let transitionSpeed = speed;

        let { x, y, z, factor } = this._angleGenerator();

        dice.style.cssText = `
            -webkit-transform: none;
            transform: none;
        `;

        setTimeout(() => {
            dice.style.cssText = `
                -webkit-transition-duration: ${transitionSpeed}ms;
                -moz-transition-duration: ${transitionSpeed}ms;
                transition-duration: ${transitionSpeed}ms;
                -webkit-transform: rotateX(${x}deg) rotateY(${y}deg) rotateZ(${z}deg);
                -moz-transform: rotateX(${x}deg) rotateY(${y}deg) rotateZ(${z}deg);
                transform: rotateX(${x}deg) rotateY(${y}deg) rotateZ(${z}deg);
            `;
        }, 10);

        return callback && callback.call(this, factor);
    };
}

export default Dice;