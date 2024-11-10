
let currentLevel = 1;
const character = document.getElementById('character');
const door = document.getElementById('door');
let questions = [];

// Массив уровней с вопросами и ответами
const first_questions = [
    {
        question: 'Erstens müssen wir herausfinden, wo sich die Deutschen am häufigsten mit Freunden treffen? ',
        options: [' In Cafés ', 'zu Hause'],
        correctIndex: 0,
        correctMessage: "Die Deutschen ziehen es vor, Freunde auf neutralem Boden zu treffen. Eine Einladung zu einem Besuch in Deutschland bedeutet ein hohes Maß an Vertrauen. Sie ist ein Zeichen der Zuneigung der Familie zu ihrem Gast.",
        incorrectMessage: 'Leider ist es nicht so!'
    },
    {
        question: 'Juhu! Ich bin zu einem Besuch eingeladen worden. Anscheinend bin ich ein wirklich wichtiger Freund. Wie habe ich die Einladung bekommen? ',
        options: ['Meine Freunde haben einen Termin für mich vereinbart, mit genauer Uhrzeit und Format der Veranstaltung  ', 'Meine Freunde haben mir angeboten, am Wochenende zu einer für mich günstigen Zeit zu kommen.'],
        correctIndex: 0,
        correctMessage: 'Merken Sie sich das Wort „Termin“ (Termin). Das gilt nicht nur, wenn Sie ein Geschäftstreffen oder einen Arzttermin haben, sondern auch, wenn Sie Freunde zu einem Besuch einladen. Spontane Treffen sind bei den Deutschen sehr selten. ',
        incorrectMessage: 'Leider ist es nicht so!'
    },
    {
        question: 'Ich freue mich, eingeladen zu werden. Vielleicht wäre es besser, abzulehnen, um meine Freunde nicht zu stören? ',
        options: ['Das Treffen annehmen ', 'die Einladung ablehnen '],
        correctIndex: 0,
        correctMessage: 'Es ist unschicklich, eine Einladung in das Haus einer Person abzulehnen. Es könnte die Einstellung des Deutschen gegenüber der Person verderben.',
        incorrectMessage: 'Leider ist es nicht so!'
    }
];

function loadQuestions() {

    
    if (window.location.href.includes("first_questions.html")) {
        questions = first_questions;
    }

    // Далее можно использовать переменную questions для отображения нужных вопросов на странице
    loadLevel(questions);
}
// Функция загрузки текущего уровня
function loadLevel(levels) {
    levels = questions;
    const levelData = levels[currentLevel - 1];
    document.querySelector('.question').textContent = `Frage ${currentLevel}: ${levelData.question}`;
    const options = document.querySelectorAll('.option');
    options.forEach((option, index) => {
        option.textContent = levelData.options[index];
    });
    document.querySelector('.next-level').style.display = 'none'; // Скрываем дверь для нового уровня
    document.querySelectorAll('.option').forEach(option => option.style.pointerEvents = 'auto'); // Разблокируем варианты
    resetCharacter(); // Сброс позиции персонажа
}



function chooseOption(index) {
    levels = questions;
    const levelData = levels[currentLevel - 1];
    
    // Перемещение персонажа к выбранному варианту (левый = 0, правый = 1)
    moveCharacter(index);
    
    if (index === levelData.correctIndex) {
        setTimeout(() => {
            alert(levelData.correctMessage);
            document.querySelector('.next-level').style.display = 'block'; // Показываем дверь
        }, 600);
    } else {

        setTimeout(() => alert(levelData.incorrectMessage), 600); 
    }
}


function moveCharacter(index) {
    resetCharacter(); // Сбрасываем позицию перед перемещением
    const offset = index === 0 ? -150 : 150; // Определяем смещение влево или вправо
    character.style.transform = `translateX(${offset}px)`;
}

function resetCharacter() {
    character.style.transition = 'none'; // Убираем плавный переход перед сбросом
    character.style.transform = 'translateX(0)'; // Сбрасываем позицию
    setTimeout(() => {
        character.style.transition = 'transform 0.5s ease'; // Включаем плавный переход снова
    }, 50); // Небольшая задержка для плавного включения анимации
}

function approachDoor() {
    moveCharacter('door'); // Человечек подходит к двери
    setTimeout(nextLevel, 600); // Переход на следующий уровень
}

function nextLevel() {
    currentLevel++;
    resetCharacter(); // Сброс позиции перед началом нового уровня

    if (currentLevel <= levels.length) {
        loadLevel(); // Загружаем следующий уровень
    } else {
        alert('Ich habe einem Treffen zugestimmt! Welches Format der Veranstaltung haben meine Freunde vorgeschlagen? ');
        window.location.href = 'four_levels.html'; // Переход на start.html

    }
}
function success_no(){
    alert('Bitte wählen Sie das Format der Veranstaltung aus.');
}
// Загружаем первый уровень при старте игры
window.onload = loadQuestions;