// --- ЭФФЕКТ МАТРИЦЫ С СЕРДЦАМИ ---
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Символы: Бинарный код + Разные виды сердец
const mainSymbols = '01'; 
const hearts = '♥♡❤❣❦❧'; // Набор сердец

const fontSize = 18; // Чуть увеличил для читаемости
const columns = canvas.width / fontSize;

const rainDrops = [];

for (let x = 0; x < columns; x++) {
    rainDrops[x] = 1;
}

const draw = () => {
    // Полупрозрачный черный фон для эффекта плавного затухания (шлейфа)
    ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < rainDrops.length; i++) {
        // Шанс появления сердца примерно 15%, в остальных случаях - 0 или 1
        const isHeart = Math.random() > 0.85;
        const text = isHeart 
            ? hearts.charAt(Math.floor(Math.random() * hearts.length))
            : mainSymbols.charAt(Math.floor(Math.random() * mainSymbols.length));

        // Если это сердце - делаем его ярко-розовым, если цифра - нежно-розовым
        ctx.fillStyle = isHeart ? '#ff3399' : '#ffcce6';
        
        // Добавляем небольшое свечение только для сердец
        if (isHeart) {
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#ff3399';
        } else {
            ctx.shadowBlur = 0;
        }

        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

        // Сбрасываем каплю вниз с элементом случайности
        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            rainDrops[i] = 0;
        }
        rainDrops[i]++;
    }
};

// Запуск анимации (35мс - оптимальная скорость)
setInterval(draw, 35);

// Подстройка под размер экрана
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});


// --- 3D ЭФФЕКТ КАРТОЧКИ ---
const card = document.getElementById('card');

document.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    // Мягкий расчет наклона
    const xRotation = ((clientY - innerHeight / 2) / innerHeight) * 20;
    const yRotation = ((clientX - innerWidth / 2) / innerWidth) * -20;
    
    card.style.transform = `rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
});

document.addEventListener('mouseleave', () => {
    card.style.transition = "transform 1s ease";
    card.style.transform = `rotateX(0deg) rotateY(0deg)`;
});

document.addEventListener('mouseenter', () => {
    card.style.transition = "none";
});