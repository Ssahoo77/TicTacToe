let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let msg = document.querySelector(".message-container");
let msgPara = document.querySelector("#msg");
let newBtn = document.querySelector("#new-btn");

const winPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

let count = 0;

const resetGame = () => {
    enableBoxes();
    msg.classList.add("hidden");
    count = 0;
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const computerMove = () => {
    let availableBoxes = [];
    boxes.forEach((box, index) => {
        if (box.innerText === "") {
            availableBoxes.push(index);
        }
    });
    if (availableBoxes.length > 0) {
        let randomIndex = availableBoxes[Math.floor(Math.random() * availableBoxes.length)];
        boxes[randomIndex].innerText = "X";
        boxes[randomIndex].disabled = true;
        count++;
        checkWinner();
    }
};

const playerMove = (box) => {
    box.innerText = "O";
    box.disabled = true;
    count++;
    if (count < 9) {
        computerMove();
    }
    if (count === 9 && !checkWinner()) {
        msgPara.innerText = 'DRAW!!';
        msg.classList.remove("hidden");
    }
};

boxes.forEach((box) => {
    box.addEventListener('click', () => {
        playerMove(box);
    });
});

const showWinner = (winner) => {
    msgPara.innerText = `Winner is ${winner}`;
    msg.classList.remove("hidden");
    disableBoxes();
};

const checkWinner = () => {
    for (let pattern of winPattern) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
            if (pos1 === pos2 && pos2 === pos3) {
                showWinner(pos1);
                return true;
            }
        }
    }
    return false;
};

newBtn.addEventListener('click', resetGame);
resetBtn.addEventListener('click', resetGame);
