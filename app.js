// let gameSeq = [];
// let userSeq = [];

// let btns = ["yellow", "red", "purple", "green"];

// let started = false;
// let level = 0;

// let h2 = document.querySelector("h2");

// document.addEventListener("keypress", () => {
//   if (started == false) {
//     console.log("game started");
//     started = true;
//     levelUp();
//   }
// });

// btnFlash = (btn) => {
//   btn.classList.add("flash");
//   setTimeout(function () {
//     btn.classList.remove("flash");
//   }, 250);
// };

// function levelUp() {
//   level++;
//   h2.innerText = `Level ${level}`;

//   let randIdx = Math.floor(Math.random() * 3);
//   let randColor = btns[randIdx];
//   let randbtn = document.querySelector(`.${randColor}`);
//   console.log(randIdx);
//   console.log(randColor);
//   console.log(randbtn);
//   btnFlash(randbtn);
// }

// btnPress = () => {
//   let btn = this;
//   btnFlash(btn);
// };

// let allBtns = document.querySelectorAll(".btn");

// for (btn of allBtns) {
//   btn.addEventListener("click", btnPress);
// }

let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", () => {
  if (!started) {
    console.log("game started");
    started = true;
    levelUp();
  }
});

const gameFlash = (btn) => {
  btn.classList.add("flash");
  setTimeout(() => {
    btn.classList.remove("flash");
  }, 400);
};
const userFlash = (btn) => {
  btn.classList.add("userflash");
  setTimeout(() => {
    btn.classList.remove("userflash");
  }, 400);
};

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;
  let randIdx = Math.floor(Math.random() * 4);
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`.${randColor}`);
  // console.log(randIdx);
  // console.log(randColor);
  // console.log(randBtn);

  gameSeq.push(randColor);
  console.log(gameSeq);
  gameFlash(randBtn);
}

checkAns = (idx) => {
  if (userSeq[idx] == gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any key to start`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(() => {
      document.querySelector("body").style.backgroundColor = "white";
    }, 150);
    reset();
  }
};

function btnPress() {
  let btn = this;
  userFlash(btn);

  userColor = btn.getAttribute("id");
  userSeq.push(userColor);
  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");

for (let btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

reset = () => {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
};
