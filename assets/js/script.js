 // Collect username from index.html page -----------------------------------------------------------------

 const btnInitial = document.querySelector('.initial-btn');
 const collectName = document.querySelector('.user');
 
     btnInitial.addEventListener('click', () => {
     const collectName = document.querySelector('.userName').value; 
     localStorage.setItem('userName', collectName); 
     })
 
     if(collectName !== null) collectName.textContent = localStorage.getItem('userName');
 
 
 //-----------------------------------------GAME STRUCTURE---------------------------------------------------
 
 // Array de perguntas e respostas
 const questions = [
   {
     title: 'The Cold War was between the United States and what other world power?',
     answers: ['The Soviet Union', 'Japan', 'China', 'Canada'],
     correct: 0
   },
   {
     title: 'What scandal forced US President Richard Nixon to resign in 1974?',
     answers: ['Iran-Contra Affair', 'Lewinsky Scandal', 'Watergate Scandal', 'Whitewater Scandal'],
     correct: 2
   },
   {
     title: 'Who was the first woman prime minister of Britain?',
     answers: ['Florence Nightingale', 'Margaret Thatcher', 'Queen Elizabeth II', 'Jane Austen'],
     correct: 1
   },
   {
     title: 'Along with Hiroshima, Japan, which Japanese city was hit by an atomic bomb in 1945?',
     answers: ['Tokyo', 'Osaka', 'Nagoya', 'Nagasaki'],
     correct: 3
   },
   {
     title: 'Who assassinated Abraham Lincoln?',
     answers: ['Lee Harvey Oswald', 'James Earl Ray', 'John Wilkes Booth', 'Leon Czolgosz'],
     correct: 2
   },
   {
     title: 'Adolf Hitler was the leader of which party?',
     answers: ['Communist Party', 'Fascist Republican Party', 'Republican Party', 'Nazi Party'],
     correct: 3
   },
   {
     title: 'What charter was approved by King John of England in 1215?',
     answers: ['The Mayflower Compact', 'Stamp Act', 'The Quartering Act', 'Magna Carta'],
     correct: 3
   },
   {
     title: 'Which continent was ravaged by the Black Death in the 1300s?',
     answers: ['Europe', 'North America', 'South America', 'Africa'],
     correct: 0
   },
   {
     title: 'Who created the first successful printer?',
     answers: ['Nikola Tesla', 'Johannes Gutenberg', 'Henry Ford', 'Benjamin Franklin'],
     correct: 1
   },
   {
     title: 'What was the name of the first computer?',
     answers: ['INIAC', 'CAINE', 'ENIAC', 'CNIEC'],
     correct: 2
   }
 ];
 
 // Função para embaralhar as perguntas
 function shuffleQuestions() {
   for (let i = questions.length - 1; i > 0; i--) {
     const j = Math.floor(Math.random() * (i + 1));
     [questions[i], questions[j]] = [questions[j], questions[i]];
   }
 }
 
 // Embaralha as perguntas antes de iniciar o quiz
 shuffleQuestions();
 
 // Variáveis de controle
 let currentQuestion = 0;
 let score = 0;
 
 // Função para exibir a pergunta atual e suas respostas
 function displayQuestion() {
   const questionElement = document.getElementById('title');
   const answersElements = document.getElementsByClassName('answers');
   const numberQuestionElement = document.getElementsByClassName('numberQuestion')[0];
   
   const current = questions[currentQuestion];
   questionElement.textContent = current.title;
 
   for (let i = 0; i < answersElements.length; i++) {
     const answerElement = answersElements[i];
     answerElement.textContent = current.answers[i];
     answerElement.classList.remove('correct', 'incorrect');
     answerElement.addEventListener('click', checkAnswer);
   }
   
   numberQuestionElement.textContent = currentQuestion + 1; // Atualiza o contador de perguntas
 }
 
 // Função para verificar a resposta selecionada
 function checkAnswer(event) {
   const selectedAnswer = event.target;
   const selectedAnswerIndex = Array.from(selectedAnswer.parentElement.children).indexOf(selectedAnswer);
   const current = questions[currentQuestion];
 
   if (selectedAnswerIndex === current.correct) {
     selectedAnswer.classList.add('correct');
     score++;
   } else {
     selectedAnswer.classList.add('incorrect');
     const correctAnswerElement = selectedAnswer.parentElement.children[current.correct];
     correctAnswerElement.classList.add('correct');
   }
 
   // Desabilita o clique nas respostas após verificar
   const answersElements = document.getElementsByClassName('answers');
   for (let i = 0; i < answersElements.length; i++) {
     answersElements[i].removeEventListener('click', checkAnswer);
   }
 
   // Mostra o botão "Next" após verificar a resposta
   const nextButton = document.getElementsByClassName('btn-next')[0];
   nextButton.classList.remove('hidden');
 }
 
 // Função para avançar para a próxima pergunta ou finalizar o quiz
 function nextQuestion() {
   currentQuestion++;
 
   if (currentQuestion >= questions.length) {
     finishQuiz();
   } else {
     displayQuestion();
   }
 }
 
 // Função para finalizar o quiz
 function finishQuiz() {
   const totalQuestions = questions.length;
   const percentage = (score / totalQuestions) * 100;
 
   document.getElementById('display-score').textContent = `${percentage.toFixed(2)}%`;
   document.getElementById('correct-answers').textContent = score;
   document.getElementById('questions-qty').textContent = totalQuestions;
 
   document.getElementById('hello').classList.add('hidden');
   document.getElementById('congrats').classList.remove('hidden');
 
   // Esconde o botão "Next" após finalizar o quiz
   const nextButton = document.getElementsByClassName('btn-next')[0];
   nextButton.classList.add('hidden');
 }
 
 // Função para reiniciar o quiz
 function restartQuiz() {
   currentQuestion = 0;
   score = 0;
 
   document.getElementById('hello').classList.remove('hidden');
   document.getElementById('congrats').classList.add('hidden');
 
   const nextButton = document.getElementsByClassName('btn-next')[0];
   nextButton.classList.add('hidden');
 
   displayQuestion();
 }
 
 // Função para sair do jogo
 function exitGame() {
   window.close();
 }
 
 // Função para jogar novamente
 function playAgain() {
   currentQuestion = 0;
   score = 0;
 
   document.getElementById('hello').classList.remove('hidden');
   document.getElementById('congrats').classList.add('hidden');
 
   const nextButton = document.getElementsByClassName('btn-next')[0];
   nextButton.classList.add('hidden');
 
   displayQuestion();
 }
 
 // Inicialização do quiz
 function startQuiz() {
   displayQuestion();
 
   const totalQuestionsElement = document.getElementsByClassName('totalQuestions')[0];
   totalQuestionsElement.textContent = questions.length;
 
   const nextButton = document.getElementsByClassName('btn-next')[0];
   nextButton.addEventListener('click', nextQuestion);
 
   const restartButton = document.getElementsByClassName('btn-exit')[0];
   restartButton.addEventListener('click', restartQuiz);
 
   const exitButton = document.getElementsByClassName('btn-exit')[1];
   exitButton.addEventListener('click', exitGame);
 
   const playAgainButton = document.getElementsByClassName('btn-play')[0];
   playAgainButton.addEventListener('click', playAgain);
 
   document.getElementById('footer-btn').classList.remove('hidden');
   document.getElementById('congrats-btn').classList.add('hidden');
 }
 
 // Inicia o quiz quando a página é carregada
 window.addEventListener('load', startQuiz);
 