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
let timerIntervallo = null;

function tempoRimanente() {
  if (tempo <= 0) {
    console.log('tempo scaduto');
    clearInterval(timerIntervallo);
    mostraDomandaSuccessiva();
    return;
  }
  tempo--;
  timer.textContent = tempo;
};




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
  let quizTerminato = false

  function mostraDomandaSuccessiva() {
    //test carmen timer
    tempo = 60;
    clearInterval(timerIntervallo);
    timerIntervallo = setInterval(tempoRimanente, 1000);
    //fino a qui
    if (indiceDomanda < questions.length) {
      let domandaCorrente = questions[indiceDomanda];
      domande.innerHTML = domandaCorrente.question;
      conteggioDomande.innerHTML = 'QUESTION ' + (indiceDomanda + 1);

      const risposteDiv = document.getElementById("answers");
      risposteDiv.innerHTML = ""; // Pulisce le risposte precedenti

      const risposte = [questions[indiceDomanda].correct_answer, ...questions[indiceDomanda].incorrect_answers];
      shuffleArray(risposte); // Mischia le risposte

      risposte.forEach((risposta) => {
        const button = document.createElement("button");
        button.className = "tastoRisposta";
        button.innerHTML = risposta;
        button.addEventListener("click", function () {
          if (quizTerminato) {
            console.log("Il quiz è terminato")
            return
          }

          if (risposta === domandaCorrente.correct_answer) {
            risposteGiuste++;
            console.log("Risposte Giuste: " + risposteGiuste);
          } else {
            risposteSbagliate++;
            console.log("Risposte Sbagliate: " + risposteSbagliate);
          }
          if (indiceDomanda === questions.length - 1) {//se arriviamo all'ultima domanda
            console.log("Ultima domanda raggiunta. Risposte giuste: " + risposteGiuste + ", Risposte sbagliate: " + risposteSbagliate);
            quizTerminato = true;
            mostraRisultato();//testcarmen
            clearInterval(timerIntervallo); // Ferma il timer
          } else {

            indiceDomanda++

            mostraDomandaSuccessiva();
            
          }


        });
        risposteDiv.appendChild(button);
      });
    }
  }
  mostraDomandaSuccessiva();
  

  //sicuramente da cambiare 
  setInterval(function () {
    mostraDomandaSuccessiva();
    tempo = 60; // Resetta il timer
    clearInterval(timerIntervallo);
    timerIntervallo = setInterval(tempoRimanente, 1000); // Riavvia il timer
  }, 45000);
}

posizionamentoDomande();


//funzione per randomizzare risposte
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
//test carmen per test superato o fallito
function mostraRisultato() {
  let risultato = document.getElementById('risultato');
  if (risposteGiuste > 6) {
    console.log("Test superato!"+ risultato);
  } else {
    console.log("Test fallito!"+ risultato);
  }
}


posizionamentoDomande();

