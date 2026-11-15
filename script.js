const sky = document.querySelector('.canvas');
const form = document.getElementById('star-form');
const titleInput = document.getElementById('title');
const thoughtInput = document.getElementById('thought');

const mod = document.getElementById('thought-mod');
const closeBtn = document.getElementById('close');
const delBtn = document.getElementById('del');

let stars = JSON.parse(localStorage.getItem('midnightStars')) || [];
let currId = null;

function save() {
    localStorage.setItem('midnightStars', JSON.stringify(stars));
}

function render() {
    sky.innerHTML = '';

    stars.forEach(s => {
        const dot = document.createElement('div');
        dot.className = 'star';
        dot.style.top = s.y + '%';
        dot.style.left = s.x + '%';
        dot.dataset.title = s.title;
        dot.style.animationDelay = Math.random() * 3 + 's';

        dot.addEventListener('click', () => {
            currId = s.id;
            document.getElementById('date').textContent = s.date;
            document.getElementById('mod-title').textContent = s.title;
            document.getElementById('mod-desc').textContent = s.thought;
            mod.classList.remove('hidden');
        });
        sky.appendChild(dot);
    });
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const newStar = {
        id: Date.now(),
        title: titleInput.value,
        thought: thoughtInput.value,
        date: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) + ' • ' + new Date(). toLocaleDateString(),
        x: Math.floor(Math.random() * 75) + 12,
        y: Math.floor(Math.random() * 60) + 20
    };

    stars.push(newStar);
    save();
    render();
    form.reset();
});

closeBtn.addEventListener('click', () => mod.classList.add('hidden'));

window.addEventListener('click', (e) => {
    if(e.target === mod) mod.classList.add('hidden');
});

delBtn.addEventListener('click', () => {
    stars = stars.filter(s => s.id !== currId);
    save();
    render();
    mod.classList.add('hidden');
});

render();