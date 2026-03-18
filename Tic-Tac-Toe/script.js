let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let popup = document.querySelector(".popup");
let popupMsg = document.querySelector("#popup-msg");
let newBtn = document.querySelector("#new-btn");

let turnO = true;
let count = 0;

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        count++;

        let isWinner = checkWinner();
        if (count === 9 && !isWinner) {
            showPopup("🤝 Match Draw");
        }
    });
});

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
            showPopup(`🎉 Winner is ${pos1}`);
            disableBoxes();
            return true;
        }
    }
    return false;
};

const showPopup = (msg) => {
    popupMsg.innerText = msg;
    popup.classList.remove("hide");
};

const disableBoxes = () => {
    boxes.forEach(box => box.disabled = true);
};

const enableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = false;
        box.innerText = "";
    });
    count = 0;
};

newBtn.addEventListener("click", () => {
    popup.classList.add("hide");
    turnO = true;
    enableBoxes();
});

resetBtn.addEventListener("click", () => {
    popup.classList.add("hide");
    turnO = true;
    enableBoxes();
});
