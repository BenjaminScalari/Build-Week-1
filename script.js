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







// Inizio del codice
const domande = document.getElementById("question-container");
const conteggioDomande = document.getElementById("conteggioDomande");
const timer = document.getElementById('timer');
const secondContainer = document.getElementById('second-container');

// Funzione per il tasto proceed
let proceed = document.getElementById('proceed');
proceed.addEventListener('click', function () {
    let checkBox = document.getElementById('checkBoxx');
    if (checkBox.checked) {
        let nascondi = document.getElementById('nascondi');
        nascondi.style.display = 'block';
        let firstContainer = document.getElementById('first-container');
        firstContainer.style.display = 'none';
        indiceDomanda = 0; // Reimposta l'indice della domanda
        mostraDomandaSuccessiva(); // Mostra la prima domanda
        timer.style.display = 'block'
    } else {
        document.getElementById('checkBoxx').classList.remove('checkBoxx');
        document.getElementById('checkBoxx').classList.add('bordo-rosso');
        alert('Per proseguire devi promettere di non barare!');
    }
});

//funzione domande e risposte
let quizTerminato = false
let tempo = 60; // Tempo iniziale
let timerIntervallo = null; // Variabile per memorizzare l'intervallo del timer
let indiceDomanda = 0; // Indice della domanda corrente
let risposteSbagliate = 0;
let risposteGiuste = 0;
let risposteSaltate = 0;

  // Funzione per mostrare la domanda successiva
  
  function mostraDomandaSuccessiva() {
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
                clearInterval(timerIntervallo); // Ferma il timer quando si risponde
                gestisciRisposta(risposta, domandaCorrente.correct_answer); // Controlla la risposta data
                indiceDomanda++; // Passa alla prossima domanda
                mostraDomandaSuccessiva(); // Mostra la prossima domanda
            });
            risposteDiv.appendChild(button);
        });

        // Avvia il timer per la domanda
        
        tempo = 11; // Ripristina il tempo a 60 secondi
        clearInterval(timerIntervallo); // Ferma il timer 
        timerIntervallo = setInterval(function () { // Avvia un nuovo timer
            tempo--;
            if (tempo >= 0) {
                timer.textContent = tempo;
            } else {         //IMPORTANTE
              console.log(risposteSaltate);
                console.log('Tempo scaduto'); //bisogna trovare come far in modo che nei risultati esca fuori che non è stata data alcuna risposta.
                clearInterval(timerIntervallo);
                risposteSbagliate++; // Considera la risposta come sbagliata
                indiceDomanda++; // Passa alla prossima domanda
                risposteSaltate++
                mostraDomandaSuccessiva(); // Mostra la prossima domanda
            }
        }, 1000);
    } else {
        console.log("Quiz completato");
        clearInterval(timerIntervallo); // Ferma il timer alla fine del quiz
        let vediRisultatoBtn = document.getElementById('vediRisultato')
        let btnRisultato = document.createElement('button')
        btnRisultato.id = 'btnRisultato'
        vediRisultatoBtn.appendChild(btnRisultato)
        btnRisultato.textContent = 'Test terminato: clicca per vedere il risultato!'
        conteggioDomande.style.display = 'none';
        secondContainer.style.display = 'none';
        timer.style.display = 'none';
        btnRisultato.addEventListener('click', function() {
          mostraRisultato()
          btnRisultato.style.display = 'none'
        })
    }
}

let risposteUtente = [];
// Funzione per gestire la risposta data
function gestisciRisposta(rispostaData, rispostaCorretta) {
  let domandaCorrente = questions[indiceDomanda];
    let rispostaUtente = {
        domanda: domandaCorrente.question,
        rispostaData: rispostaData,
        rispostaCorretta: rispostaCorretta
    };
    risposteUtente.push(rispostaUtente); // Aggiunge la domanda e la risposta all'array

  if (rispostaData === rispostaCorretta) {
      risposteGiuste++;
      console.log("Risposta corretta");
  } else if (rispostaData === '') {
    console.log("Tempo esaurito");
  } else {
      risposteSbagliate++;
      console.log("Risposta errata");
  }
}
  

//funzione per randomizzare risposte O MEGLIO ALGORITMO DI FISHER-YATES //BISOGNA NON FARGLI MESCOLARE I BOOLEAN
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

//test carmen (grandissima) per test superato o fallito    
function mostraRisultato() {
  let risultato = document.getElementById('risultato');
  let listaRisultati = document.getElementById('listaRisultati');
  let risultatoFinale = document.getElementById('risultatoFinale');
  risultatoFinale.style.display = 'block'

  risposteUtente.forEach((risposta) => {  // Nouha: faccio qualche modifica
    let listItem = document.createElement('li');
    let icona = document.createElement('i');
  icona.classList.add('fas');
  if (risposta.rispostaData === risposta.rispostaCorretta) {
    icona.classList.add('fa-check'); // aggiungo l'icona V nel caso fosse sbagliato
  } else {
    icona.classList.add('fa-times'); // Aggiungo l'icona X nel caso fosse una domanda azzeccata :D
  } 
    listItem.textContent = 'Domanda: ' + risposta.domanda + ', Risposta data: ' + risposta.rispostaData + ', Risposta corretta: ' + risposta.rispostaCorretta;
    listaRisultati.appendChild(listItem);
    listItem.appendChild(icona); // Aggiungi l'icona alla risposta
  });
  
  if (risposteGiuste >= 6) {
    risultato.textContent = "Test superato! "+ risposteGiuste + ' risposte giuste' + 'Risposte Saltate: ' + risposteSaltate;
     //modifico il 'risultato' con 'risposte giuste o sbagliate: Nouha
  } else {
    risultato.textContent = "Test fallito! "+ risposteSbagliate + ' risposte errate' + ' risposte saltate: ' + risposteSaltate;
    console.log("Test fallito!"+ risposteSbagliate + ' risposte errate');
  }

  console.log(risposteGiuste + risposteSbagliate + risposteSaltate)

}


