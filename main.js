(() => {
    let canvas = document.getElementById('canvas'),
        c = canvas.getContext('2d'),
        w = canvas.width = window.innerWidth,
        h = canvas.height = window.innerHeight,
        pi = Math.PI,
        pi2 = pi * 2,
        opts = {
            backgroungColor: '#fefefe',
            circlesAmount: 500,
            minRadius: 7,
            maxRadius: 16,
            maxIncreaseRadius: 60,
            colors: ['#EFD9CE', '#B79CED', '#ADD9F4', '#957FEF', '#7161EF']
        },
        mouse = {
            x: 0,
            y: 0
        },
        circles = [],
        Circle = function(options) {
            this.x = options.x;
            this.y = options.y;
            this.dx = options.dx;
            this.dy = options.dy;
            this.radius = options.radius;
            this.color = opts.colors[Math.floor(randomTo(opts.colors.length))];

            this.draw = function() {
                c.beginPath();
                c.arc(this.x, this.y, this.radius, 0, pi2);
                // c.strokeStyle = 'red';
                // c.stroke();
                c.fillStyle = this.color;
                c.fill();

                return this;
            };

            this.update = function() {
                if (this.x > w - this.radius || this.x - this.radius < 0) {
                    this.dx = -this.dx;
                }
                if (this.y > h - this.radius || this.y - this.radius < 0) {
                    this.dy = -this.dy;
                }

                this.x += this.dx;
                this.y += this.dy;

                if (mouse.x - this.x < 70 && mouse.x - this.x > -70
                    && mouse.y - this.y < 70 && mouse.y - this.y > -70) {

                    if (this.radius < opts.maxIncreaseRadius) {
                        this.radius += 2;
                    }
                } else {
                    if (this.radius > options.radius) {
                        this.radius -= 2;
                    }
                }

                this.draw();

                return this;
            };
        }
        ;

    function loop() {
        c.fillStyle = opts.backgroungColor;
        c.fillRect(0, 0, w, h);

        circles.forEach( (circle) => {
            circle.update();
        });

        window.requestAnimationFrame(loop);
    }

    function setup() {
        for (let i = 0; i < opts.circlesAmount; i++){
            let x = randomTo(w);
            let y = randomTo(h);
            let dx = randomRange(-1.5, 1.5);
            let dy = randomRange(-1.5, 1.5);
            let radius = randomRange(opts.minRadius, opts.maxRadius);

            // Check if (x, y) climbs over the edges
            if (x < radius) {
                x += radius;
            } else if (x + radius > w) {
                x -= radius;
            }
            if (y < radius) {
                y += radius;
            } else if (y + radius > h) {
                y -= radius;
            }

            circles.push(new Circle( {x, y, dx, dy, radius} ));
        }

        window.requestAnimationFrame(loop);
    }

    setup();

    function randomRange(min, max){
        return (Math.random() * (max - min)) + min;
    }
    function randomTo(number){
        return Math.random() * number;
    }

    window.addEventListener('resize', () => {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    });

    window.addEventListener('mousemove', (event) => {
        mouse = {
            x: event.x,
            y: event.y
        };
    });
})();
