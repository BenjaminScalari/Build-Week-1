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
const risposteDiv = document.getElementById("answers");
const tabellaRisultati = document.getElementById('tabellaRisultati');


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
let risposteUtente = []
const domandeSaltate = []
// Funzione per mostrare la domanda successiva

function mostraDomandaSuccessiva() {
  if (indiceDomanda < questions.length) {
    let domandaCorrente = questions[indiceDomanda];
    domande.innerHTML = domandaCorrente.question;
    conteggioDomande.innerHTML = 'QUESTION ' + (indiceDomanda + 1);

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
        // risposteErrate++; // Considera la risposta come sbagliata
        // risposteSaltate++;
        gestisciRisposta('', domandaCorrente.correct_answer); // Aggiunta per gestire la risposta saltata
        indiceDomanda++; // Passa alla prossima domanda
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

let risposteErrate = 0;


// Funzione per gestire la risposta data
function gestisciRisposta(rispostaData, rispostaCorretta) {
  let domandaCorrente = questions[indiceDomanda];
  let rispostaUtente = {
    domanda: domandaCorrente.question,
    rispostaData: rispostaData,
    rispostaCorretta: rispostaCorretta,

  };
  risposteUtente.push(rispostaUtente); // Aggiunge la domanda e la risposta all'array

  if (rispostaData === rispostaCorretta) {
    risposteGiuste++;
    console.log("Risposta corretta");
  } else {
    risposteSbagliate++;
    risposteSaltate += rispostaData === '' ? 1 : 0; //operatore ternario funzione uguale a quella sotto
    /*
    if (rispostaData === '') {
  risposteSaltate += 1;
} else {
  risposteSaltate += 0;
}
   */ console.log("Risposta errata o saltata");

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
  let listaRisultati = document.getElementById('tabellaRisultati');
  let risultatoFinale = document.getElementById('risultatoFinale');
  risultatoFinale.style.display = 'block'

  // Pulisci la tabella prima di aggiungere nuove righe
  tabellaRisultati.innerHTML = '';



  // Creazione dell'intestazione della tabella
  let headerRow = tabellaRisultati.insertRow(0);//intestazione tabella
  let headerCell0 = headerRow.insertCell(0);  //crea una nuova cella nella riga appena creata
  headerCell0.textContent = 'N.';  //assegna il testo 'N.' a questa cella
  let headerCell1 = headerRow.insertCell(1); //crea un'altra cella nella stessa riga
  headerCell1.textContent = 'Domanda'; //rappresenta l'intestazione per la colonna delle domande nella tabella
  let headerCell2 = headerRow.insertCell(2);
  headerCell2.textContent = 'Risposta Data'; //creare una cella contenente il testo Risposta Data
  let headerCell3 = headerRow.insertCell(3);
  headerCell3.textContent = 'Risposta Corretta'; //creare una cella contenente il testo Risposta Corretta

  risposteUtente.forEach((risposta, index) => {
    let row = tabellaRisultati.insertRow(index + 1); //viene creata una nuova riga nella tabella dei risultati. L'indice viene incrementato di 1 perché la prima riga è già stata utilizzata per l'intestazione.
    let cell0 = row.insertCell(0);// viene creata una cella nella riga corrente
    cell0.textContent = index + 1;//rappresenta il numero dell'elemento 0, nel tuo contesto, il numero della risposta.
    let cell1 = row.insertCell(1);
    cell1.textContent = risposta.domanda;//viene assegnato il testo risposta.domanda, che rappresenta la domanda corrispondente alla risposta dell'utente
    let cell2 = row.insertCell(2);
    cell2.textContent = risposta.rispostaData;
    let cell3 = row.insertCell(3);
    cell3.textContent = risposta.rispostaCorretta;


    //ho messo questo se vogliamo mettere classi CSS dopo 
    if (risposta.rispostaData === risposta.rispostaCorretta) {
      row.classList.add('risposta-corretta');//Se la condizione sopra è vera, viene aggiunta la classe CSS 'risposta-corretta' alla riga corrente
    } else {
      row.classList.add('risposta-errata');//viene aggiunta la classe CSS 'risposta-errata' alla riga corrente
    }
  });

  risultato.textContent = "Risposte giuste: " + risposteGiuste + ', Risposte errate: ' + risposteErrate + ', Risposte saltate: ' + risposteSaltate;
  if (risposteGiuste >= 6) {
    risultato.textContent = "Test superato! " + risposteGiuste + ' risposte giuste' + risposteSbagliate + ' risposte errate' + 'Risposte Saltate: ' + risposteSaltate;
    //modifico il 'risultato' con 'risposte giuste o sbagliate: Nouha
  } else {
    risultato.textContent = "Test fallito! " + risposteGiuste + ' risposte giuste ' + risposteSbagliate + ' risposte errate' + ' risposte saltate: ' + risposteSaltate;
    console.log("Test fallito!" + risposteSbagliate + ' risposte errate');
  }
}
/*risposteUtente.forEach((risposta) => {  // Nouha: faccio qualche modifica spero giuste
  let listItem = document.createElement('li');
  let icona = document.createElement('i');
  icona.classList.add('fas');
  if (risposta.rispostaData === risposta.rispostaCorretta) {
    icona.classList.add('fa-check'); // aggiungo l'icona V nel caso fosse sbagliato
  } else if (risposta.rispostaData === '' && risposta.rispostaCorretta !== '') {
    icona.classList.add('fa-clock');
  }
  else {
    icona.classList.add('fa-times'); // Aggiungo l'icona X nel caso fosse una domanda azzeccata :D
  }
  listItem.textContent = 'Domanda: ' + risposta.domanda + ', Risposta data: ' + risposta.rispostaData + ', Risposta corretta: ' + risposta.rispostaCorretta;
  listaRisultati.appendChild(listItem);
  listItem.appendChild(icona); // Aggiungi l'icona alla risposta
});

if (risposteGiuste >= 6) {
  risultato.textContent = "Test superato! " + risposteGiuste + ' risposte giuste' + risposteSbagliate + ' risposte errate' + 'Risposte Saltate: ' + risposteSaltate;
  //modifico il 'risultato' con 'risposte giuste o sbagliate: Nouha
} else {
  risultato.textContent = "Test fallito! " + risposteGiuste + ' risposte giuste ' + risposteSbagliate + ' risposte errate' + ' risposte saltate: ' + risposteSaltate;
  console.log("Test fallito!" + risposteSbagliate + ' risposte errate');
}

console.log(risposteGiuste + risposteSbagliate + risposteSaltate)

}*/


