const questions = [
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What does CPU stand for?",
    correct_answer: "Central Processing Unit",
    incorrect_answers: [
      "Central Process Unit",
      "Computer Personal Unit",
      "Central Processor Unit",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn&#039;t get modified?",
    correct_answer: "Final",
    incorrect_answers: ["Static", "Private", "Public"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "The logo for Snapchat is a Bell.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question:
      "Pointers were not used in the original C programming language; they were added later on in C++.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the most preferred image format used for logos in the Wikimedia database?",
    correct_answer: ".svg",
    incorrect_answers: [".png", ".jpeg", ".gif"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "In web design, what does CSS stand for?",
    correct_answer: "Cascading Style Sheet",
    incorrect_answers: [
      "Counter Strike: Source",
      "Corrective Style Sheet",
      "Computer Style Sheet",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the code name for the mobile operating system Android 7.0?",
    correct_answer: "Nougat",
    incorrect_answers: [
      "Ice Cream Sandwich",
      "Jelly Bean",
      "Marshmallow",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "On Twitter, what is the character limit for a Tweet?",
    correct_answer: "140",
    incorrect_answers: ["120", "160", "100"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "Linux was first created as an alternative to Windows XP.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "Which programming language shares its name with an island in Indonesia?",
    correct_answer: "Java",
    incorrect_answers: ["Python", "C", "Jakarta"],
  },
];

//funzione timer che dovrà essere aggiornata
let tempo = 60;
let timer = document.getElementById('timer');

function tempoRimanente() {
  if (tempo <= 0) {
    console.log('tempo scaduto');
    return;
  }
  tempo--;
  timer.textContent = tempo;
};
const timerIntervallo = setInterval(tempoRimanente, 1000);



//funzione per il tasto proceed
let proceed = document.getElementById('proceed')

proceed.addEventListener('click', function () {
  let checkBox = document.getElementById('checkBoxx');
  if (checkBox.checked) {
    let nascondi = document.getElementById('nascondi');
    nascondi.style.display = 'block';
    let firstContainer = document.getElementById('first-container');
    firstContainer.style.display = 'none';
  } else {
    document.getElementById('checkBoxx').classList.remove('checkBoxx')
    document.getElementById('checkBoxx').classList.add('bordo-rosso')
    alert('Per proseguire devi promettere di non barare!')
  }

})

//funzione domande

const domande = document.getElementById("question-container")
const risposte = document.getElementById("answers")
const conteggioDomande = document.getElementById("conteggioDomande")

let risposteSbagliate = 0;
let risposteGiuste = 0;

function posizionamentoDomande() {
  let indiceDomanda = 0;

  function mostraDomandaSuccessiva() {
    if (indiceDomanda < questions.length) {
      let domandaCorrente = questions[indiceDomanda].question;
      domande.innerHTML = domandaCorrente;

      const risposteDiv = document.getElementById("answers");
      risposteDiv.innerHTML = ""; // Pulisce le risposte precedenti

      const risposte = [questions[indiceDomanda].correct_answer, ...questions[indiceDomanda].incorrect_answers];
      shuffleArray(risposte); // Mischia le risposte

      risposte.forEach((risposta) => {
        const button = document.createElement("button");
        button.className = "tastoRisposta";
        button.innerHTML = risposta;
        button.addEventListener("click", function () {
          mostraDomandaSuccessiva();

          if (risposta[indiceDomanda] === domandaCorrente.correct_answer) {
            risposteGiuste++;
            console.log("Risposte Sbagliate: " + risposteGiuste);
          } else if (risposta[indiceDomanda] === domandaCorrente.correct_answer) {
            risposteSbagliate++;
            console.log("Risposte Giuste: " + risposteSbagliate);
          } else {

          }
        });
        risposteDiv.appendChild(button);
      });

      indiceDomanda++;

      // const risposteGiuste = questions[indiceDomanda - 1].correct_answer;
      // const risposteSbagliate = questions[indiceDomanda - 1].incorrect_answers;
      // let rispostaSelezionata = risposte;
    
      // if (rispostaSelezionata === rispostaGiusta) {
      //     console.log("Risposte Giuste: " + risposteGiuste);
      // } else {
      //   console.log("Risposte Sbagliate: " + risposteSbagliate);
      // }

      // function conteggioRisposte() {
      //   if (risposte === questions[indiceDomanda].correct_answer) {
      //     risposteGiuste += 1;
      //   } else if (risposte === questions[indiceDomanda].incorrect_answers) {
      //     risposteSbagliate += 1;
      //   }

      //   return risposteGiuste;
      //   return risposteSbagliate;
      // }

      // conteggioRisposte();
      // console.log("Risposte Giuste: " + risposteGiuste);
      // console.log("Risposte Sbagliate: " + risposteSbagliate);

      conteggioDomande.innerHTML = "QUESTION " + indiceDomanda
    } else {
      domande.innerHTML = "Fine delle domande";
    }
  }

  mostraDomandaSuccessiva();
}

posizionamentoDomande();

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

