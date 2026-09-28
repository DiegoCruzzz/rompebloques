const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const overlay = document.getElementById("overlay");
const overlayTitle = document.getElementById("overlay-title");
const startBtn = document.getElementById("start-btn");
const scoreEl = document.getElementById("score");
const livesEl = document.getElementById("lives");

let score = 0;
let lives = 3;

// Propiedades de la bola
const ballRadius = 8;
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 4;
let dy = -4;
const ballColor = "#ec4899"; // Rosa vibrante

// Propiedades de la paleta
const paddleHeight = 12;
const paddleWidth = 100;
let paddleX = (canvas.width - paddleWidth) / 2;
const paddleColor = "#3b82f6"; // Azul primario

// Entradas
let rightPressed = false;
let leftPressed = false;

// Bloques
const brickRowCount = 5;
const brickColumnCount = 9;
const brickWidth = 72;
const brickHeight = 24;
const brickPadding = 12;
const brickOffsetTop = 50;
const brickOffsetLeft = 30;

let bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

let gameRunning = false;
let animationId;

// Listeners
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

// Touch support para mobile
canvas.addEventListener("touchmove", (e) => {
    const relativeX = e.touches[0].clientX - canvas.getBoundingClientRect().left;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
    }
    e.preventDefault();
}, {passive: false});

function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

function mouseMoveHandler(e) {
    const relativeX = e.clientX - canvas.getBoundingClientRect().left;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
    }
}

function collisionDetection() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            let b = bricks[c][r];
            if (b.status == 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score += 10;
                    scoreEl.innerText = score;
                    if (score == brickRowCount * brickColumnCount * 10) {
                        gameOver("¡Has Ganado!");
                    }
                }
            }
        }
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = ballColor;
    ctx.shadowBlur = 15;
    ctx.shadowColor = ballColor;
    ctx.fill();
    ctx.closePath();
    ctx.shadowBlur = 0; 
}

function drawPaddle() {
    ctx.beginPath();
    ctx.roundRect(paddleX, canvas.height - paddleHeight - 10, paddleWidth, paddleHeight, 6);
    ctx.fillStyle = paddleColor;
    ctx.shadowBlur = 10;
    ctx.shadowColor = paddleColor;
    ctx.fill();
    ctx.closePath();
    ctx.shadowBlur = 0;
}

function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status == 1) {
                let brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                let brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.roundRect(brickX, brickY, brickWidth, brickHeight, 4);
                
                let gradient = ctx.createLinearGradient(brickX, brickY, brickX, brickY + brickHeight);
                const hues = [280, 260, 240, 220, 200]; 
                gradient.addColorStop(0, `hsl(${hues[r]}, 80%, 60%)`);
                gradient.addColorStop(1, `hsl(${hues[r]}, 80%, 40%)`);
                
                ctx.fillStyle = gradient;
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function draw() {
    if (!gameRunning) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    drawBricks();
    drawBall();
    drawPaddle();
    collisionDetection();

    // Rebote paredes
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    // Rebote techo
    if (y + dy < ballRadius) {
        dy = -dy;
    } 
    // Suelo o paleta
    else if (y + dy > canvas.height - ballRadius - 10) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            let hitPoint = x - (paddleX + paddleWidth / 2);
            dx = hitPoint * 0.15; 
            dy = -dy;
        } else if (y + dy > canvas.height - ballRadius) {
            lives--;
            livesEl.innerText = lives;
            if (!lives) {
                gameOver("Juego Terminado");
            } else {
                x = canvas.width / 2;
                y = canvas.height - 30;
                dx = 4;
                dy = -4;
                paddleX = (canvas.width - paddleWidth) / 2;
            }
        }
    }

    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    x += dx;
    y += dy;
    
    animationId = requestAnimationFrame(draw);
}

function gameOver(msg) {
    gameRunning = false;
    cancelAnimationFrame(animationId);
    overlayTitle.innerText = msg;
    startBtn.innerText = "Jugar de Nuevo";
    overlay.classList.remove("hidden");
}

function initGame() {
    score = 0;
    lives = 3;
    scoreEl.innerText = score;
    livesEl.innerText = lives;
    x = canvas.width / 2;
    y = canvas.height - 30;
    dx = 4;
    dy = -4;
    paddleX = (canvas.width - paddleWidth) / 2;
    
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            bricks[c][r].status = 1;
        }
    }
    
    overlay.classList.add("hidden");
    gameRunning = true;
    draw();
}

startBtn.addEventListener("click", initGame);

// Render inicial
drawBricks();
drawPaddle();
drawBall();
