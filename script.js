let lives = 3;
let currentLevel = 1;
const character = document.getElementById('character');
const door = document.getElementById('door');
let questions = [];

// Массив уровней с вопросами и ответами
const first_questions = [
    {
        question: ': Erstens müssen wir herausfinden, wo sich die Deutschen am ehesten mit Freunden treffen? ',
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
const levels_coffee = [
    {
        question: 'Ich wurde zum Kaffee eingeladen. Um wie viel Uhr war mein Termin',
        options: ['Um 12:00 Uhr ', 'Um 15:00 Uhr'],
        correctIndex: 1,
        correctMessage: "Wenn Sie zum Kaffee gerufen werden, ist die häufigste Zeit für solche Treffen in Deutschland gegen 15 Uhr. Das ist das Analogon zum englischen five o'clock, das etwa um 3 Uhr nachmittags beginnt. Aber allmählich werden solche Treffen immer seltener, und wahrscheinlich werden sie bald ganz verschwinden.",
        incorrectMessage: 'Leider ist es nicht so!'
    },
    {
        question: 'Was wird zum Kaffee serviert?',
        options: ['Brötchen und Kuchen ', 'Milch und Sahne ohne Nachspeise'],
        correctIndex: 0,
        correctMessage: 'Kaffee und Dessert. Klingt lecker.',
        incorrectMessage: 'Leider ist es nicht so!'
    },
    {
        question: 'Was sollte ich als Geschenk mitnehmen?',
        options: ['Nichts', 'eine Flasche Wein'],
        correctIndex: 0,
        correctMessage: 'In diesem Fall ist es besser, nichts mitzunehmen, denn Alkohol ist hier unangebracht. Wenn Sie zum Kaffee eingeladen sind, dann wird Kaffee serviert. Und wenn Sie ohne Geschenk kommen, wird das niemanden beleidigen. Wenn Sie wirklich wollen, können Sie selbstgebackene Kuchen mitbringen.',
        incorrectMessage: 'Leider ist es nicht so!'
    },
    {
        question: 'Wie lange wird das Treffen dauern?',
        options: ['2-3 Stunden', '4-5 Stunden'],
        correctIndex: 0,
        correctMessage: 'Wenn Sie zu einem Kaffee eingeladen werden, sind solche Treffen in Deutschland meist um 15 Uhr für 2-3 Stunden angesetzt.',
        incorrectMessage: 'Leider ist es nicht so!'
    }
    // Можно добавить другие уровни аналогично
];

const levels_wine = [
    {
        question: 'Warum bin ich zu einem Glas Wein eingeladen worden? ',
        options: ['Um gemeinsam Pläne zu besprechen ', 'Um die gute Nachricht zu überbringen'],
        correctIndex: 1,
        correctMessage: "Wenn deutsche Freunde frohe Nachrichten mitteilen wollen, laden sie Sie auf ein Glas Wein ein.",
        incorrectMessage: 'Leider ist es nicht so!'
    },
    {
        question: 'Was soll ich als Geschenk mitbringen?',
        options: ['Blumen ', 'eine Flasche Wein'],
        correctIndex: 0,
        correctMessage: ': In diesem Fall reichen Blumen aus, ohne die Flasche. Wir reden hier von ein paar Gläsern Wein oder Champagner.',
        incorrectMessage: 'Leider ist es nicht so!'
    },
    {
        question: 'Was wird man mir nach dem Wein anbieten?',
        options: ['Kaffee ', 'Käsesnacks'],
        correctIndex: 0,
        correctMessage: 'Nach ein paar Gläsern Wein oder Champagner wird ein Kaffee angeboten.',
        incorrectMessage: 'Leider ist es nicht so!'
    },
    {
        question: 'Welche Art von Essen wird mir angeboten?',
        options: ['Leichte Snacks ', 'Leichte Salate'],
        correctIndex: 0,
        correctMessage: 'Wenn Sie zu einem Glas Wein eingeladen sind, ist es wahrscheinlicher, dass Sie nicht gefüttert werden, sondern nur leichte Snacks wie Chips, Nüsse, Cracker auf dem Tisch stehen.',
        incorrectMessage: 'Leider ist es nicht so!'
    }

];

const levels_dinner = [
    {
        question: 'Was soll ich als Geschenk mitbringen?',
        options: ['Heimdekoration ', 'eine Flasche Wein'],
        correctIndex: 1,
        correctMessage: "Wenn Sie zum Mittag- oder Abendessen eingeladen sind, soll es eine längere Interaktion mit alkoholischen Getränken geben. Dann können Sie Blumen und eine gute Flasche Wein kaufen.",
        incorrectMessage: 'Leider ist es nicht so!'
    },
    {
        question: 'Wenn ich Blumen verschenken möchte, wie viele sollte ich lieber nicht verschenken?',
        options: ['Jede gerade Zahl  ', '13 Blumen'],
        correctIndex: 1,
        correctMessage: 'Die meisten Menschen legen keinen Wert auf die Anzahl der Blumen in einem Strauß. Aber einige Leute denken immer noch, dass 13 keine Glückszahl ist. Wichtiger ist jedoch die Farbe. Manche Menschen halten weiße Blumen für schwermütig.',
        incorrectMessage: 'Leider ist es nicht so!'
    },
    {
        question: 'Welche Leckereien kann ich erwarten?',
        options: ['Die Gastgeber werden Salate und Vorspeisen auf Einweggeschirr zubereiten. Der Hauptgang wird gemeinsam mit den Gästen gegrillt.', 'Das Hauptgericht wird von den Gastgebern auf einem Tablett serviert. Die Gäste bringen die Vorspeisen mit.'],
        correctIndex: 0,
        correctMessage: 'Wenn Sie zum Abendessen eingeladen sind, wird Ihnen Essen angeboten. Und es ist möglich, dass Sie Ihr Abendessen selbst zubereiten müssen, indem Sie Fleisch oder Würstchen grillen. Die Gastgeber stellen ein paar Schüsseln mit Salaten und Snacks auf Einweggeschirr bereit, um sich die Stunden in der Küche am Spülbecken zu sparen.',
        incorrectMessage: 'Leider ist es nicht so!'
    },
    {
        question: 'Wie lange sollte ich das Gericht essen?',
        options: ['Je länger, desto besser. Das zeugt von Respekt vor der Gastgeberin', 'Ich ziehe das Essen nicht in die Länge, um an einem leeren Tisch zu sitzen.'],
        correctIndex: 1,
        correctMessage: 'Es ist nicht üblich, beim Abendessen eine lange Mahlzeit einzunehmen. Niemand isst 45 Minuten lang ein Gericht, normalerweise sitzen die Deutschen an leeren Tischen, an denen nur Getränke und Gläser für sie bereitstehen.',
        incorrectMessage: 'Leider ist es nicht so!'
    }
];

const levels_hb = [
    {
        question: 'Wie lange dauert es, bis ich meine Einladung erhalte? ',
        options: ['7-9 Monate ', '2-3 Monate'],
        correctIndex: 0,
        correctMessage: "Zu Jubiläen und Feierlichkeiten werden Sie 7-9 Monate im Voraus eingeladen, damit diese Termine noch verfügbar sind.",
        incorrectMessage: 'Leider ist es nicht so!'
    },
    {
        question: 'Was soll ich als Geschenk mitbringen?',
        options: ['Gutschein ', 'Geld'],
        correctIndex: 0,
        correctMessage: 'In Deutschland ist es weniger üblich, Geld zu schenken. Oft wird ein Zertifikat für ein Geschenk ausgestellt, das auf den Interessen einer Person basiert. Es ist auch verbreitet, ein Geschenk aus der Geschenkliste zu geben. Die Feiernden reservieren in der Regel einen Artikel in einem bestimmten Geschäft, und der Schenkende kauft ihn zurück und schenkt ihn ihnen. Manchmal bitten die Feiernden anstelle von Geschenken um eine Geldspende für wohltätige Zwecke.',
        incorrectMessage: 'Leider ist es nicht so!'
    },
    {
        question: 'Was muss ich nach dem Treffen tun?',
        options: ['Bedanken Sie sich für die Veranstaltung ', 'Laden Sie zu einem Gegenbesuch ein'],
        correctIndex: 0,
        correctMessage: 'Nach der Feier können Sie sich online bedanken oder eine Karte schicken. Es sind nicht nur die Gäste, denen man für die Feier dankt, sondern auch die Feiernden.',
        incorrectMessage: 'Leider ist es nicht so!'
    },
    {
        question: 'Wie endet eine Kindergeburtstagsfeier?',
        options: ['Alle Kinder erhalten kleine Geschenke ', 'Nur das Geburtstagskind erhält Geschenke.'],
        correctIndex: 0,
        correctMessage: 'Bei Kindergeburtstagen erhalten alle Kinder kleine symbolische Geschenke. Schließlich soll bei einem Kindergeburtstag niemand übergangen werden.',
        incorrectMessage: 'Leider ist es nicht so!'
    }
];
function loadQuestions() {

    
    if (window.location.href.includes("coffee_level.html")) {
        questions = levels_coffee;
    } else if (window.location.href.includes("wine_level.html")) {
        questions = levels_wine;
    }else if (window.location.href.includes("dinner_level.html")) {
        questions = levels_dinner;
    }else if (window.location.href.includes("hb_level.html")) {
        questions = levels_hb;
    }
    else if (window.location.href.includes("first_questions.html")) {
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

function updateLives() {
    document.querySelector('.lives').textContent = 'Жизни: ' + '❤️'.repeat(lives > 0 ? lives : 0);
    if (lives === 0) {
        setTimeout(() => {
            alert('Leider habe ich mich nicht gut auf dieses Treffen vorbereitet. Sollen wir es noch einmal versuchen?');
            if (window.location.href.includes("coffee_level.html")) {
                window.location.href = 'coffee_level.html';
            } else if (window.location.href.includes("wine_level.html")) {
                window.location.href = 'wine_level.html';
            }else if (window.location.href.includes("dinner_level.html")) {
                window.location.href = 'dinner_level.html';
            }else if (window.location.href.includes("hb_level.html")) {
                window.location.href = 'hb_level.html';
            }
            else if (window.location.href.includes("first_questions.html")) {
                questions = window.location.href = 'first_questions.html';
            }
    
        }, 600);
    }
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
        lives--;
        updateLives();
        setTimeout(() => alert(levelData.incorrectMessage), 600);

        // Проверяем, остались ли жизни
        if (lives > 0) {
            document.querySelectorAll('.option').forEach(option => option.style.pointerEvents = 'auto'); // Разблокируем опции для нового выбора
        } //else {
        //     alert('Вы потратили все жизни, переходите к следующему уровню.');
        //     document.querySelector('.next-level').style.display = 'block'; // Показываем дверь
        // }
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
        alert('Vielen Dank für Ihre Hilfe! Das Treffen war wunderbar. Können Sie mir helfen, mich auf meinen nächsten Termin vorzubereiten?');
        window.location.href = 'four_levels.html'; // Переход на start.html

    }
}

// Загружаем первый уровень при старте игры
window.onload = loadQuestions;