let start = Date.now();
let id = null;

let totalElapsed = 0;
const startButton = document.getElementById("start");
const resetButton = document.getElementById("reset");
const time = document.getElementById("time");

let playing = false;

function startTime () {
    playing = true;
    start = Date.now() - totalElapsed;
    id = setInterval(() => {
        const elapsed = Date.now() - start;
        const newDate = new Date(elapsed);
        totalElapsed = elapsed;
        time.innerText = newDate.toUTCString().split(" ")[4];
    }, 500);
}

function pauseTime () {
    playing = false;
    if (id !== null) {
        clearInterval(id);
    }
}

function resetTimer() {
    totalElapsed = 0;
    time.innerText = "00:00:00"
    startButton.innerText = "START";
    pauseTime();
}

function toggleButton() {
    startButton.innerText = (startButton.innerText === "START" ? "STOP" : "START");
}
// onclick
// displaying the real time
startButton.addEventListener('click', function () {
    toggleButton();
    playing ? pauseTime() : startTime();
});
// pausing and playing 
resetButton.addEventListener('click', resetTimer);