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
let highScore = 0;
let h2 = document.querySelector("h2");
let highScoreDisplay = document.getElementById("high-score");

const rules = {
  en: "simon says game is a sequence of colors (like red, purple, green, yellow), and you must repeat it exactly by clicking or pressing the right keys. Each round, the sequence gets longer. If you get it wrong, you lose and start over. The goal is to beat your high score by remembering the longest sequence possible.",
  // hin: '"साइमन सेज़" खेल रंगों की एक श्रृंखला है (जैसे लाल, बैंगनी, हरा, पीला), और आपको इसे ठीक उसी तरह क्लिक करके या की दबाकर दोहराना होता है। हर राउंड में श्रृंखला लंबी होती जाती है। अगर आप गलती करते हैं, तो आप हार जाते हैं और फिर से शुरू करना पड़ता है। लक्ष्य है सबसे लंबी श्रृंखला याद रखकर अपना उच्च स्कोर बनाना।',
  hin: '"Simon Says" game ek colors ki sequence hai (jaise red, purple, green, yellow), aur tumhe usko exactly click karke ya key dabake repeat karna hai. Har round mein sequence lambi ho jati hai. Agar tum galti karte ho, toh haar jate ho aur fir se start karna padta hai. Target hai sabse lambi sequence yaad rakhke apna high score bananna.',
  // gj: "'સાઇમન સેઝ' રમત એ રંગોની શ્રેણી છે (જેમ કે લાલ, જાંબલી, લીલો, પીળો), અને તમારે તેને બરાબર ક્લિક કરીને કે કી દબાવીને પુનરાવર્તન કરવું પડે છે. દરેક રાઉન્ડમાં શ્રેણી લાંબી થાય છે. જો તમે ભૂલ કરો, તો તમે હારી જાઓ અને ફરી શરૂ કરવું પડે છે. ધ્યેય છે કે સૌથી લાંબી શ્રેણી યાદ રાખીને તમારો ઉચ્ચ સ્કોર હાંસલ કરવો.",
  ar: "لعبة سايمون يقول هي سلسلة من الألوان (مثل الأحمر، البنفسجي، الأخضر، الأصفر)، ويجب عليك تكرارها بدقة عن طريق النقر أو الضغط على المفاتيح الصحيحة. في كل جولة، تصبح السلسلة أطول. إذا أخطأت، تخسر وتبدأ من جديد. الهدف هو تحقيق أعلى درجة بتذكر أطول سلسلة ممكنة.",
  am : '"Սայմոնն ասում է" խաղը գույների հաջորդականություն է (օրինակ՝ կարմիր, մանուշակագույն, կանաչ, դեղին), և դուք պետք է այն ճշգրիտ կրկնեք՝ սեղմելով կամ ստեղներով: Յուրաքանչյուր փուլում հաջորդականությունն ավելի երկար է դառնում: Եթե սխալվեք, պարտվում եք և նորից սկսում: Նպատակն է հիշել ամենաերկար հաջորդականությունը և գերազանցել Ձեր բարձրագույն միավորը'
};

function changeLanguage(lang) {
  document.getElementById("rules-text").innerText = rules[lang];
}

function closePopup() {
  document.getElementById("rules-popup").style.display = "none";
}

window.onload = () => {
  document.getElementById("rules-popup").style.display = "flex";
};
changeLanguage("en");

// document.addEventListener("keypress", () => {
//   if (!started) {
//     console.log("game started");
//     started = true;
//     levelUp();
//   }
// });
document.getElementById("start-btn").addEventListener("click", () => {
  if (!started) {
    console.log("game started");
    started = true;
    levelUp();
  }
});

document.getElementById("quit-btn").addEventListener("click", () => {
  if (started) {
    h2.innerHTML = `Game Quit! Your score was <b>${level}</b> <br> Press Start to play again`;
    highScore = Math.max(highScore, level);
    updateHighScoreDisplay();
    reset();
  }
});

document.getElementById("restart-btn").addEventListener("click", () => {
  h2.innerHTML = `Game Restarted! <br> Level ${level}`;
  highScore = Math.max(highScore, level);
  updateHighScoreDisplay();
  reset();
  started = true;
  levelUp();
});

// document.getElementById("score-btn").addEventListener("click", () => {
//   alert(`High Score: ${highScore}`);
// });

const gameFlash = (btn) => {
  btn.classList.add("flash");
  setTimeout(() => {
    btn.classList.remove("flash");
  }, 250);
};
const userFlash = (btn) => {
  btn.classList.add("userflash");
  setTimeout(() => {
    btn.classList.remove("userflash");
  }, 250);
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
updateHighScoreDisplay = () => {
  if (highScoreDisplay) {
    highScoreDisplay.innerText = `High Score: ${highScore}`;
  }else {
    console.error("High score display element not found")
  }
};

// function checkAns(idx) {
//   if (userSeq[idx] === gameSeq[idx]) {
//     if (userSeq.length === gameSeq.length) {
//       setTimeout(levelUp, 1000);
//     }
//   } else {
//     // highScore = Math.max(highScore, level);
//     h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any key to start`;
//     let flashCount = 0;
//     const flashInterval = setInterval(() => {
//       document.body.style.background =
//         flashCount % 2 === 0
//           ? "red"
//           : "linear-gradient(to bottom right, #E6E6FA, #C1E1C1, #FFD1DC)";
//       flashCount++;
//       if (flashCount >= 6) clearInterval(flashInterval);
//     }, 150);
//     showGameOverPopup(level);
//     reset();
//   }
// }

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

document.getElementById("start-btn").addEventListener("click", () => {
  if (!started) {
    console.log("game started");
    started = true;
    levelUp();
  }
});

document.getElementById("quit-btn").addEventListener("click", () => {
  if (started) {
    h2.innerHTML = `Game Quit! Your score was <b>${level}</b> <br> Press Start to play again`;
    reset();
  }
});

document.getElementById("score-btn").addEventListener("click", () => {
  alert(`High Score: ${highScore}`);
});

// function checkAns(idx) {
//   if (userSeq[idx] === gameSeq[idx]) {
//     if (userSeq.length === gameSeq.length) {
//       setTimeout(levelUp, 1000);
//     }
//   } else {
//     highScore = Math.max(highScore, level);
//     h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press Start to play again`;
//     document.querySelector("body").style.backgroundColor = "red";
//     setTimeout(() => {
//       document.querySelector("body").style.backgroundColor =
//         "linear-gradient(to bottom right, #E6E6FA, #C1E1C1, #FFD1DC)";
//     }, 150);
//     reset();
//   }
// }

checkAns = (idx) => {
  if (userSeq[idx] == gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    highScore = Math.max(highScore, level);
    updateHighScoreDisplay();
    h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any key to start`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(() => {
      document.querySelector("body").style.backgroundColor = "white";
    }, 200);
    showGameOverPopup(level);
    reset();
  }
};

// checkAns = (idx) => {
//   if (userSeq[idx] == gameSeq[idx]) {
//     if (userSeq.length == gameSeq.length) {
//       setTimeout(levelUp, 1000);
//     }
//   } else {
//     highSore = Math.max(highScore,level)
//     updateHighScoreDisplay()
//     h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press start to start`;
//     document.querySelector("body").style.backgroundColor = "red";
//     setTimeout(() => {
//       document.querySelector("body").style.backgroundColor = "white";

//     }, 150);
//     showGameOverPopup(level)
//     reset();
//   }
// };

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}

// updateHighScoreDisplay = ()=> {
//   highScoreDisplay.innerText = `High Score: ${highScore}`;
// }
function showGameOverPopup(score) {
  setTimeout(() => {
    document.getElementById(
      "game-over-text"
    ).innerText = `Your score was ${score}. Press Start to play again!`;
    document.getElementById("game-over-popup").style.display = "flex";
  });
}

function closeGameOverPopup() {
  document.getElementById("game-over-popup").style.display = "none";
}

window.onload = () => {
  changeLanguage("en");
  updateHighScoreDisplay();
  document.getElementById("rules-popup").style.display = "flex";
};
