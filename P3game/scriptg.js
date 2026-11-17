const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('#score');
const startBtn = document.querySelector('#start-btn');
const moles = document.querySelectorAll('.mole');

let lastHole;
let timeUp = false;
let score = 0;

// Generate a random time interval for the mole to stay up
function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

// Select a random hole layout, preventing duplicates in sequence
function randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if (hole === lastHole) {
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
}

// Control the mole movement cycles
function peep() {
    const time = randomTime(600, 1200); 
    const hole = randomHole(holes);
    const mole = hole.querySelector('.mole');
    
    mole.classList.add('up');

    setTimeout(() => {
        mole.classList.remove('up');
        if (!timeUp) peep();
    }, time);
}

// Initialize and launch the game loop
function startGame() {
    scoreBoard.textContent = 0;
    score = 0;
    timeUp = false;
    startBtn.disabled = true;
    startBtn.textContent = "Playing...";
    
    peep();

    // End the session after 15 seconds
    setTimeout(() => {
        timeUp = true;
        startBtn.disabled = false;
        startBtn.textContent = "Start Game";
        alert(`Game Over! Your final score is: ${score}`);
    }, 15000);
}

// Track valid clicks and update player score
function whack(e) {
    if(!e.isTrusted) return; // Prevents programmatic cheating/scripts
    score++;
    this.classList.remove('up');
    scoreBoard.textContent = score;
}

// Assign click listeners to elements
startBtn.addEventListener('click', startGame);
moles.forEach(mole => mole.addEventListener('click', whack));
