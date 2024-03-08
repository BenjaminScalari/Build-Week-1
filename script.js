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
let tempoScaduto = false;

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
    tempo = 10; // Ripristina il tempo a 60 secondi
    clearInterval(timerIntervallo); // Ferma il timer 
    timerIntervallo = setInterval(function () { // Avvia un nuovo timer
      tempo--;
      if (tempo >= 0) {
        timer.textContent = tempo;
      } else {                           //IMPORTANTE
        console.log('Tempo scaduto'); //bisogna trovare come far in modo che nei risultati esca fuori che non è stata data alcuna risposta.
        clearInterval(timerIntervallo);
        risposteSbagliate++; // Considera la risposta come sbagliata
        indiceDomanda++; // Passa alla prossima domanda
        tempoScaduto = true;
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
    btnRisultato.addEventListener('click', function () {
      mostraRisultato()
      btnRisultato.style.display = 'none'
    })
  }
}

let risposteUtente = [];
console.log(risposteUtente);
// Funzione per gestire la risposta data
function gestisciRisposta(rispostaData, rispostaCorretta) {
  let domandaCorrente = questions[indiceDomanda];
  let rispostaUtente = {
    domanda: domandaCorrente.question,
    rispostaData: rispostaData,
    rispostaCorretta: rispostaCorretta,
    rispostaSaltata: tempoScaduto,
  };
  risposteUtente.push(rispostaUtente); // Aggiunge la domanda e la risposta all'array

  if (!tempoScaduto) {
    if (rispostaData === rispostaCorretta) {
      risposteGiuste++;
      console.log("Risposta corretta");
    } else {
      risposteSbagliate++;
      console.log("Risposta errata");
    }
  } else {
    console.log("Risposta saltata");
  }

}


//funzione per randomizzare risposte O MEGLIO ALGORITMO DI FISHER-YATES //BISOGNA NON FARGLI MESCOLARE I BOOLEAN
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}


function mostraRisultato() {
  let risultato = document.getElementById('risultato');
  let risultatoFinale = document.getElementById('risultatoFinale');
  risultatoFinale.style.display = 'block';
  risultato.style.display = 'block'
  let tabellaHTML = `
      <table class="risultati-table">
          <thead>
              <tr>
                  <th>Domande</th>
                  <th>Risposte Corrette <i class="fas fa-check"></i></th>
                  <th>Risposte Date <i class="fas fa-edit"></i></th> <!-- Modifica qui -->
              </tr>
          </thead>
          <tbody>
  `;

  // Itera su tutte le domande
  questions.forEach((domanda) => {
    let rispostaData = ''; // Inizializza la risposta data come vuota
    let icona = ''; // Inizializza l'icona come vuota

    // Cerca se l'utente ha fornito una risposta per questa domanda
    risposteUtente.forEach((rispostaUtente) => {
      if (rispostaUtente.domanda === domanda.question) {
        rispostaData = rispostaUtente.rispostaData; // Aggiorna la risposta data se trovata
      }
    });

    // Aggiungi la riga della tabella per questa domanda
    tabellaHTML += `
          <tr>
              <td>${domanda.question}</td>
              <td>${domanda.correct_answer} ${icona}</td> <!-- Modifica qui -->
              <td>${rispostaData || 'Non risposta'} ${icona}</td> <!-- Modifica qui -->
          </tr>
      `;
  });

  tabellaHTML += `
          </tbody>
      </table>
  `;

  risultatoFinale.innerHTML = tabellaHTML;

  if (risposteGiuste >= 6) {
    risultato.textContent = "Test superato! " + risposteGiuste + ' risposte giuste';
  } else {
    risultato.textContent = "Test fallito! " + risposteSbagliate + ' risposte errate';
  }
}




