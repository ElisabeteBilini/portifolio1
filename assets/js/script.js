 // Collect username from index.html page -----------------------------------------------------------------

 const btnInitial = document.querySelector('.initial-btn');
 const collectName = document.querySelector('.user');

 const urlParams = new URLSearchParams(window.location.search);
 console.log(urlParams.get('username'));


 btnInitial.addEventListener('click', () => {
 	const collectName = document.querySelector('.user').value;
 	localStorage.setItem('userName', collectName);
 });

 if (collectName !== null) collectName.textContent = localStorage.getItem('userName');

 //somnete lettras input
 function lettersOnly() {
 	const input = document.querySelector('.userName');
 	input.value = input.value.replace(/[^a-zA-Z]/g, '');

 	if (input.value.match(/[^a-zA-Z]/g)) {
 		evt.preventDefault();
 		alert("Enter letters only.");
 	}
 }

 //-----------------------------------------GAME STRUCTURE---------------------------------------------------

 // Array de perguntas e respostas 
 const questions = [{
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
 	return questions;
 }
 shuffleQuestions();

 // Variáveis
 let currentQuestion = 0;
 let score = 0;

 const messageFinal = document.getElementById('message');
 messageFinal.classList.add('hidden');

 const nextButton = document.getElementsByClassName('btn-next')[0];


 function displayQuestion() {
 	const questionElement = document.getElementById('title');
 	const answersElements = document.getElementsByClassName('answers');
 	const numberQuestionElement = document.getElementsByClassName('numberQuestion')[0];

 	// Add eventListener for next button only when displayQuestion called


 	const current = questions[currentQuestion];
 	questionElement.textContent = current.title;

 	for (let i = 0; i < answersElements.length; i++) {
 		const answerElement = answersElements[i];
 		answerElement.textContent = current.answers[i];
 		answerElement.classList.remove('correct', 'incorrect');
 		answerElement.addEventListener('click', checkAnswer);
 	}

 	const questionNumber = currentQuestion + 1;
 	numberQuestionElement.textContent = questionNumber <= 10 ? questionNumber : '';
 }

 // Função para verificar a resposta
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

 	// Desabilita o clique após verificacao
 	const answersElements = document.getElementsByClassName('answers');
 	for (let i = 0; i < answersElements.length; i++) {
 		answersElements[i].removeEventListener('click', checkAnswer);
 	}

 	// Botão "Next"
 	const nextButton = document.getElementsByClassName('btn-next')[0];
 	nextButton.classList.remove('hidden');
 }

 // Avançar para a próxima pergunta ou encerrar o quiz
 function nextQuestion() {

 	// Remove the eventListener so it isn't attached multiple times
 	nextButton.removeEventListener('click', nextQuestion);
 	currentQuestion++;

 	if (currentQuestion >= questions.length) {
 		finishQuiz();
 	} else {
 		displayQuestion();
 	}
 }

 // Encerrar o quiz
 function finishQuiz() {
 	const totalQuestions = questions.length;
 	const percentage = (score / totalQuestions) * 100;

 	document.getElementById('display-score').textContent = `${percentage}%`;
 	document.getElementById('correct-answers').textContent = score;
 	document.getElementById('questions-qty').textContent = totalQuestions;

 	const mainDiv = document.getElementsByClassName('main')[0];
 	mainDiv.classList.add('hidden');

 	document.getElementById('hello').classList.add('hidden');
 	document.getElementById('congrats').classList.remove('hidden');

 	// Remove o atributo "hidden" dos botões "Restart" e "Exit"
 	document.getElementById('congrats-btn').classList.remove('hidden');

 	// Esconde o botão "Next"
 	const nextButton = document.getElementsByClassName('btn-next')[0];
 	nextButton.classList.add('hidden');

 }

 // Reiniciar o quiz
 function restartQuiz() {
 	currentQuestion = 0;
 	score = 0;

 	document.getElementById('hello').classList.remove('hidden');
 	document.getElementById('congrats').classList.add('hidden');

 	const nextButton = document.getElementsByClassName('btn-next')[0];
 	nextButton.classList.add('hidden');

 	displayQuestion();
 }

 // Sair do jogo
 function exitGame() {
 	document.getElementById('congrats').classList.add('hidden');
 	document.getElementsByClassName('main')[0].classList.add('hidden');
 	messageFinal.classList.remove('hidden');
 }

 // Jogar novamente
 function playAgain() {
 	currentQuestion = 0;
 	score = 0;

 	document.getElementsByClassName('main')[0].classList.remove('hidden');
 	document.getElementById('congrats').classList.add('hidden');

 	const nextButton = document.getElementsByClassName('btn-next')[0];
 	nextButton.classList.add('hidden');

 	displayQuestion();
 }


 // Inicia o quiz
 function startQuiz() {
 	displayQuestion();

 	nextButton.addEventListener('click', nextQuestion);

 	const totalQuestionsElement = document.getElementsByClassName('totalQuestions')[0];
 	totalQuestionsElement.textContent = questions.length;

 	//  const nextButton = document.getElementsByClassName('btn-next')[0];
 	//  nextButton.addEventListener('click', nextQuestion);

 	const restartButton = document.getElementsByClassName('btn-exit')[0];
 	restartButton.addEventListener('click', restartQuiz);

 	const exitButton = document.getElementsByClassName('btn-exit')[1];
 	exitButton.addEventListener('click', exitGame);

 	const playAgainButton = document.getElementsByClassName('btn-play')[0];
 	playAgainButton.addEventListener('click', playAgain);

 	document.getElementById('footer-btn').classList.remove('hidden');
 	document.getElementById('congrats-btn').classList.add('hidden');

 }

 window.addEventListener('load', startQuiz);