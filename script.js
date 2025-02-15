let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

function setRandomFirstPlayer() {
    activePlayer = Math.floor(Math.random() * 2); // Nasumično dodeljujemo igrača (0 ili 1)

    document.querySelector(".player1").classList.remove("active");
    document.querySelector(".player2").classList.remove("active");

    document.querySelector(`.player${activePlayer + 1}`).classList.add("active");
}

// Dodajemo događaj za dugme Save
document.getElementById("save-names").addEventListener("click", function () {
    document.getElementById("name1").textContent = document.getElementById("player1-name").value || "Player 1";
    document.getElementById("name2").textContent = document.getElementById("player2-name").value || "Player 2";

    setRandomFirstPlayer(); // Dodeljujemo nasumično ko je prvi igrač kad se klikne Save
});

// Isto to pri učitavanju stranice
window.onload = function() {
    setRandomFirstPlayer(); // Nasumično dodeljujemo prvog igrača kada se stranica učita
};

document.getElementById("roll").addEventListener("click", function () {
    if (!playing) return;

    let dice = Math.floor(Math.random() * 6) + 1;
    document.getElementById("dice-result").textContent = dice; // Prikazuje broj kocke

    if (dice === 1) {
        scores[activePlayer] -= 5;
        document.getElementById(`score${activePlayer + 1}`).textContent = scores[activePlayer];

        let playerBoard = document.querySelector(`.player${activePlayer + 1}`);
        playerBoard.classList.add("lose-animation");

        let minusFive = document.createElement("p");
        minusFive.textContent = "-5";
        minusFive.classList.add("minus-five");
        playerBoard.appendChild(minusFive);

        setTimeout(() => {
            minusFive.remove();
            playerBoard.classList.remove("lose-animation");
            switchPlayer();
        }, 600);
    } else {
        currentScore += dice;
    }

    document.getElementById(`current${activePlayer + 1}`).textContent = currentScore;
});

document.getElementById("hold").addEventListener("click", function () {
    if (!playing) return;

    scores[activePlayer] += currentScore;
    document.getElementById(`score${activePlayer + 1}`).textContent = scores[activePlayer];

    if (scores[activePlayer] >= 20) {
        playing = false;
        let winnerBoard = document.querySelector(`.player${activePlayer + 1}`);
        winnerBoard.classList.add("winner");
    } else {
        switchPlayer();
    }
});

document.getElementById("new-game").addEventListener("click", function () {
    scores = [0, 0];
    currentScore = 0;
    playing = true;
    activePlayer = 0;

    document.querySelector(".player1").classList.remove("winner");
    document.querySelector(".player2").classList.remove("winner");

    document.getElementById("score1").textContent = "0";
    document.getElementById("score2").textContent = "0";
    document.getElementById("current1").textContent = "0";
    document.getElementById("current2").textContent = "0";

    document.querySelector(".player1").classList.add("active");
    document.querySelector(".player2").classList.remove("active");

    setRandomFirstPlayer(); // Nasumično dodeljujemo prvog igrača kada se klikne New Game
});

function switchPlayer() {
    currentScore = 0;
    document.getElementById(`current${activePlayer + 1}`).textContent = "0";

    activePlayer = activePlayer === 0 ? 1 : 0;

    document.querySelector(".player1").classList.toggle("active");
    document.querySelector(".player2").classList.toggle("active");
}
