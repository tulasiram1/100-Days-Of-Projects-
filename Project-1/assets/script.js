const questions = [
    {
        questionText: "Commonly used data types DO NOT include:",
        options: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
        answer: "3. alerts",
    },
    {
        questionText: "Arrays in JavaScript can be used to store ______.",
        options: [
            "1. numbers and strings",
            "2. other arrays",
            "3. booleans",
            "4. all of the above",
        ],
        answer: "4. all of the above",
    },
    {
        questionText:
            "String values must be enclosed within _____ when being assigned to variables.",
        options: ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"],
        answer: "3. quotes",
    },
    {
        questionText:
            "A very useful tool used during development and debugging for printing content to the debugger is:",
        options: [
            "1. JavaScript",
            "2. terminal/bash",
            "3. for loops",
            "4. console.log",
        ],
        answer: "4. console.log",
    },
    {
        questionText:
            "Which of the following is a statement that can be used to terminate a loop, switch or label statement?",
        options: ["1. break", "2. stop", "3. halt", "4. exit"],
        answer: "1. break",
    },
];

let qNo = 0;

// let names = localStorage.getItem('name');


console.log(questions[0]["questionText"]);

const box = document.querySelector(".box");
const scoreCard = document.querySelector(".scores");
const questionsTemplate = document.querySelector(".questions");
const op1 = document.querySelector('#option1');
const op2 = document.querySelector('#option2');
const op3 = document.querySelector('#option3');
const op4 = document.querySelector('#option4');
const time = document.querySelector('.seconds');
const results = document.querySelector('.results');
const fScore = document.querySelector('#fScore');
const btn_submit = document.querySelector('.btn-submit');
// const name = document.querySelector('#name');
const iScores = document.querySelector('.iScores');

let interval;

//questions
const questionText = document.createElement('div');
questionText.classList.add('question');
questionsTemplate.prepend(questionText);




const displayScoreCard = () => {
    box.classList.add('hide');
    questionsTemplate.classList.add('hide');
    scoreCard.classList.remove('hide');
    iScores.textContent = "";
    names = localStorage.getItem('name');
    names = names.split(',');
    // console.log(names);
    for (let i = 0; i < names.length; i++) {
        const p = document.createElement('P');
        const t = document.createTextNode(names[i]);
        p.appendChild(t);
        iScores.append(p);
        // console.log(p);
    }
}
const homePage = () => {
    // console.log("adf");
    box.classList.remove('hide');
    questionsTemplate.classList.add('hide');
    scoreCard.classList.add('hide');
    results.classList.add('hide');
    time.textContent = "";
}

const displayQuestions = (qNo) => {

    questionText.textContent = questions[qNo]["questionText"]

    op1.textContent = questions[qNo]['options'][0];
    op2.textContent = questions[qNo]['options'][1];
    op3.textContent = questions[qNo]['options'][2];
    op4.textContent = questions[qNo]['options'][3];
}

const startTime = () => {
    time.textContent = 60;
    interval = setInterval(() => {
        t = Number.parseInt(time.textContent);
        time.textContent = --t;
        if (t <= 0) {
            // console.log(t);
            clearInterval(interval);
        }
    }, 1000);
}

const startQuiz = (qNo) => {
    box.classList.add("hide");
    questionsTemplate.classList.remove('hide');
    if (qNo < questions.length) {
        displayQuestions(qNo);
    } else {
        questionsTemplate.classList.add('hide');
        results.classList.remove('hide');
        clearInterval(interval);
        const t = time.textContent;
        fScore.textContent = t;
    }


}

const checkAnswer = (n, aStr) => {
    if (aStr == questions[n]['answer']) {
        qNo++;
        startQuiz(qNo);
    }
    else {
        t = Number.parseInt(time.textContent);
        time.textContent = t - 10;
        qNo++;
        startQuiz(qNo);
    }
    // console.log(aStr);
}

// console.log("Hello");
document.querySelector(".button").addEventListener('click', () => {
    startQuiz(qNo);
    startTime();
});
document.querySelector('#leaderboard').addEventListener('click', displayScoreCard)
document.querySelector('.goBack').addEventListener('click', homePage);
op1.addEventListener('click', () => {
    // console.log(1);
    checkAnswer(qNo, op1.textContent);
});
op2.addEventListener('click', () => {
    // console.log(2);
    checkAnswer(qNo, op2.textContent);
});
op3.addEventListener('click', () => {
    // console.log(3);
    checkAnswer(qNo, op3.textContent);
});
op4.addEventListener('click', () => {
    // console.log(4);
    checkAnswer(qNo, op4.textContent);
});
btn_submit.addEventListener('click', () => {
    if (localStorage.getItem('name') == null) {
        names = [];
        let data = 1 + ". " + document.getElementById('name').value + " - " + fScore.textContent;
        names.push(data);
    } else {
        names = localStorage.getItem('name');
        names = names.split(',');
        let data = names.length + 1 + ". " + document.getElementById('name').value + " - " + fScore.textContent;
        names.push(data);
    }
    localStorage.setItem('name', names);
    qNo = 0;
    homePage();
});

document.querySelector('.clearScores').addEventListener('click', () => {
    localStorage.removeItem('name');
    displayScoreCard();
})



