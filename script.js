// Получаем ссылку на элемент canvas из HTML
const canvas = document.getElementById('gameCanvas');
// Получаем контекст рисования на canvas (2D)
const ctx = canvas.getContext('2d');

// Размер одной клетки (одного блока) на поле
const boxSize = 20;

// Устанавливаем размер canvas
canvas.width = 400;
canvas.height = 400;

// Объявляем переменные для состояния игры
let snake, food, direction, score;
let changingDirection, gameInterval;

// Получаем ссылки на элементы интерфейса для экрана окончания игры
const gameOverScreen = document.getElementById('gameOverScreen');
const scoreElement = document.getElementById('score');
const restartButton = document.getElementById('restartButton');

// Назначаем обработчик на кнопку перезапуска игры
restartButton.addEventListener('click', startGame);

// Функция для старта или перезапуска игры
function startGame() {
    // Инициализируем змейку как массив объектов, где каждый объект — сегмент змейки
    snake = [{ x: 10 * boxSize, y: 10 * boxSize }];

    // Генерируем начальное положение еды в случайном месте на поле
    food = {
        x: Math.floor(Math.random() * canvas.width / boxSize) * boxSize,
        y: Math.floor(Math.random() * canvas.height / boxSize) * boxSize
    };

    // Устанавливаем начальное направление движения змейки
    direction = 'RIGHT';

    // Флаг для предотвращения изменения направления во время одного шага
    changingDirection = false;

    // Сброс счета
    score = 0;

    // Скрываем экран окончания игры, если он отображался
    gameOverScreen.classList.add('hidden');

    // Очищаем предыдущий игровой цикл, если он был запущен
    if (gameInterval) clearInterval(gameInterval);

    // Запускаем игровой цикл с частотой 100 мс (10 кадров в секунду)
    gameInterval = setInterval(draw, 100);
}

// Функция для обработки изменения направления движения змейки
function changeDirection(event) {
    const key = event.keyCode;

    // Если направление уже изменилось, игнорируем последующие нажатия клавиш
    if (changingDirection) return;

    // Обработка клавиш со стрелками для изменения направления движения змейки
    if (key === 37 && direction !== 'RIGHT') {
        direction = 'LEFT';
    } else if (key === 38 && direction !== 'DOWN') {
        direction = 'UP';
    } else if (key === 39 && direction !== 'LEFT') {
        direction = 'RIGHT';
    } else if (key === 40 && direction !== 'UP') {
        direction = 'DOWN';
    }

    // Блокируем дальнейшие изменения направления до следующего шага змейки
    changingDirection = true;
}

// Функция для рисования змейки на поле
function drawSnake() {
    // Проходим по каждому сегменту змейки и рисуем его
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i === 0) ? '#FFF' : '#00FF00'; // Голова змейки белая, тело — зеленое
        ctx.fillRect(snake[i].x, snake[i].y, boxSize, boxSize);
        ctx.strokeStyle = '#000';
        ctx.strokeRect(snake[i].x, snake[i].y, boxSize, boxSize); // Черная граница для каждого сегмента
    }
}

// Функция для рисования еды на поле
function drawFood() {
    ctx.fillStyle = 'red'; // Еда красного цвета
    ctx.fillRect(food.x, food.y, boxSize, boxSize);
}

// Функция для перемещения змейки
function moveSnake() {
    // Определяем координаты головы змейки
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Обновляем координаты в зависимости от текущего направления
    if (direction === 'LEFT') snakeX -= boxSize;
    if (direction === 'UP') snakeY -= boxSize;
    if (direction === 'RIGHT') snakeX += boxSize;
    if (direction === 'DOWN') snakeY += boxSize;

    // Проверяем, съела ли змейка еду
    if (snakeX === food.x && snakeY === food.y) {
        score++; // Увеличиваем счет
        // Генерируем новую еду в случайном месте на поле
        food = {
            x: Math.floor(Math.random() * canvas.width / boxSize) * boxSize,
            y: Math.floor(Math.random() * canvas.height / boxSize) * boxSize
        };
    } else {
        // Если еда не съедена, удаляем последний сегмент змейки (иначе змейка удлиняется)
        snake.pop();
    }

    // Создаем новый сегмент для головы змейки
    let newHead = { x: snakeX, y: snakeY };

    // Проверяем столкновения (с границами или своим телом)
    if (snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height || collision(newHead, snake)) {
        gameOver(); // Завершаем игру при столкновении
    } else {
        // Добавляем новый сегмент головы к змейке
        snake.unshift(newHead);
    }

    // Разрешаем дальнейшее изменение направления после шага
    changingDirection = false;
}

// Функция для проверки столкновения головы змейки с её телом
function collision(head, snake) {
    for (let i = 0; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true; // Столкновение найдено
        }
    }
    return false; // Столкновений нет
}

// Основная функция рисования игры (каждый кадр)
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Очищаем поле
    drawSnake(); // Рисуем змейку
    drawFood(); // Рисуем еду
    moveSnake(); // Обновляем положение змейки
}

// Функция для завершения игры
function gameOver() {
    clearInterval(gameInterval); // Останавливаем игровой цикл
    gameOverScreen.classList.remove('hidden'); // Показываем экран окончания игры
    scoreElement.textContent = score; // Отображаем текущий счет
}

// Запуск игры при загрузке страницы
startGame();

// Назначаем обработчик нажатия клавиш для изменения направления
document.addEventListener('keydown', changeDirection);
