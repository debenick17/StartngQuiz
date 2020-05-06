(function () {

  function buildQuiz() {

    const output = [];


    myQuestions.forEach(
      (currentQuestion, questionNumber) => {


        const answers = [];


        for (letter in currentQuestion.answers) {


          answers.push(
            `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
          );
        }


        output.push(
          `<div class="slide">
            <div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join("")} </div>
          </div>`
        );
      }
    );

    quizContainer.innerHTML = output.join('');
  }

  function showResults() {

    const answerContainers = quizContainer.querySelectorAll('.answers');

    let numCorrect = 0;

    myQuestions.forEach((currentQuestion, questionNumber) => {

      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      if (userAnswer === currentQuestion.correctAnswer) {
        numCorrect++;
        answerContainers[questionNumber].style.color = 'lightgreen';
      }
      else {
        answerContainers[questionNumber].style.color = 'red';
      }
    });

    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  function showSlide(n) {
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;
    if (currentSlide === 0) {
      previousButton.style.display = 'none';
    }
    else {
      previousButton.style.display = 'inline-block';
    }
    if (currentSlide === slides.length - 1) {
      nextButton.style.display = 'none';
      submitButton.style.display = 'inline-block';
    }
    else {
      nextButton.style.display = 'inline-block';
      submitButton.style.display = 'none';
    }
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

  const quizContainer = document.getElementById('quiz');
  const resultsContainer = document.getElementById('results');
  const submitButton = document.getElementById('submit');
  const myQuestions = [
    {
      question: "How effective has this program been for you?",
      answers: {
        a: "Not Effective",
        b: "Medium",
        c: "Very Effective"
      },
      correctAnswer: "c"
    },
    {
      question: "Is the program meeting your expectations?",
      answers: {
        a: "Not Even Close",
        b: "Almost",
        c: "Surpasses"
      },
      correctAnswer: "c"
    },
    {
      question: "Would you recommend this program to others?",
      answers: {
        a: "Definitely",
        b: "Maybe",
        c: "Certainly Not"
      },
      correctAnswer: "a"
    },
    {
      question: "Would you pay for a more thorough one-on-one version of this program?",
      answers: {
        a: "Certainly Not",
        b: "Depends",
        c: "Sure"
      },
      correctAnswer: "b"
    },
    {
      question: "How well have the tutors done?",
      answers: {
        a: "Bad",
        b: "Good",
        c: "Exceptionally Good"
      },
      correctAnswer: "c"
    }
  ];

  buildQuiz();

  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  showSlide(currentSlide);

  submitButton.addEventListener('click', showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
})();
