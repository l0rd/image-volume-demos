const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

// Game objects
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    speed: 5,
    dx: 5,
    dy: 5,
    color: '#fff'
};

const paddleHeight = 100;
const paddleWidth = 10;
const paddleSpeed = 8;

const player = {
    x: 0,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    color: '#fff',
    score: 0
};

const computer = {
    x: canvas.width - paddleWidth,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    color: '#fff',
    score: 0
};

// Game state
let gameStarted = false;
let keys = {};

// Event listeners
document.addEventListener('keydown', (e) => {
    keys[e.key] = true;
    if (e.key === ' ' && !gameStarted) {
        gameStarted = true;
    }
});

document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

// Game functions
function movePaddles() {
    // Player movement
    if (keys['w'] && player.y > 0) {
        player.y -= paddleSpeed;
    }
    if (keys['s'] && player.y < canvas.height - player.height) {
        player.y += paddleSpeed;
    }

    // Computer AI
    const computerCenter = computer.y + computer.height / 2;
    if (computerCenter < ball.y - 35) {
        computer.y += paddleSpeed;
    } else if (computerCenter > ball.y + 35) {
        computer.y -= paddleSpeed;
    }
}

function moveBall() {
    if (!gameStarted) return;

    ball.x += ball.dx;
    ball.y += ball.dy;

    // Ball collision with top and bottom
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.dy *= -1;
    }

    // Ball collision with paddles
    if (checkCollision(ball, player) || checkCollision(ball, computer)) {
        ball.dx *= -1;
    }

    // Score points
    if (ball.x < 0) {
        computer.score++;
        resetBall();
    } else if (ball.x > canvas.width) {
        player.score++;
        resetBall();
    }
}

function checkCollision(ball, paddle) {
    return ball.x + ball.radius > paddle.x &&
           ball.x - ball.radius < paddle.x + paddle.width &&
           ball.y + ball.radius > paddle.y &&
           ball.y - ball.radius < paddle.y + paddle.height;
}

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = -ball.dx;
    ball.dy = Math.random() * 10 - 5;
}

function draw() {
    // Clear canvas
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw ball
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();

    // Draw paddles
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);

    ctx.fillStyle = computer.color;
    ctx.fillRect(computer.x, computer.y, computer.width, computer.height);

    // Draw scores
    ctx.fillStyle = '#fff';
    ctx.font = '24px Arial';
    ctx.fillText(player.score, canvas.width / 4, 30);
    ctx.fillText(computer.score, 3 * canvas.width / 4, 30);

    // Draw start message
    if (!gameStarted) {
        ctx.fillStyle = '#fff';
        ctx.font = '20px Arial';
        ctx.fillText('Press SPACE to start', canvas.width / 2 - 100, canvas.height / 2);
    }
}

function gameLoop() {
    movePaddles();
    moveBall();
    draw();
    requestAnimationFrame(gameLoop);
}

// Start the game
gameLoop(); 