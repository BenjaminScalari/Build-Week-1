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

function posizionamentoDomande() {
  let arrayDomande = []
  for (let i = 0; i < questions.length; i++) {
    let domandaCorrente = questions[i].question

    arrayDomande.push(domandaCorrente)
    domande.innerHTML = domandaCorrente

    const pulsantiRisposta = document.getElementsByClassName("tastoRisposta")
    let cliccato = false
    pulsantiRisposta.addEventListener("click", function () {
      if (!cliccato) {
        domandaCorrente += 1
      }
    })


  }

}
posizionamentoDomande()
