let currentCategory = '';
let currentAudio = null;
let questionAnswered = false;

function navigateTo(section) {
    document.querySelectorAll('section').forEach(sec => sec.classList.add('hidden'));
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }
    if (section === 'heart' || section === 'lungs') {
        currentCategory = section;
        document.getElementById('sub-menu').classList.remove('hidden');
    } else {
        document.getElementById(section).classList.remove('hidden');
        switch (section) {
            case 'sounds':
                loadSounds();
                break;
            case 'test':
                loadTestOptions();
                break;
        }
    }
}



function navigateBack() {
    document.querySelectorAll('section').forEach(sec => sec.classList.add('hidden'));
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }
    document.getElementById('menu').classList.remove('hidden');
    clearResults();
}

function loadSounds() {
    const soundsList = document.getElementById('sounds-list');
    soundsList.innerHTML = '';

    const sounds = currentCategory === 'heart' ? heartSounds : lungSounds;
    sounds.forEach(sound => {
        const button = document.createElement('button');
        button.textContent = sound.name;
        button.onclick = () => playSound(sound.file);
        soundsList.appendChild(button);
    });
}

function playSound(file) {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }
    currentAudio = new Audio(file);
    currentAudio.play();
}

function playRandomSound() {
    const sounds = currentCategory === 'heart' ? heartSounds : lungSounds;
    const randomSound = sounds[Math.floor(Math.random() * sounds.length)];
    currentAudio = new Audio(randomSound.file);
    currentAudio.play();
}

function loadTestOptions() {
    questionAnswered = false; // Reset the flag for new question
    const options = document.getElementById('options');
    options.innerHTML = '';

    const sounds = currentCategory === 'heart' ? heartSounds : lungSounds;
    shuffleArray(sounds);
    
    const correctSound = sounds[Math.floor(Math.random() * sounds.length)];
    const otherSounds = sounds.filter(sound => sound.name !== correctSound.name);
    shuffleArray(otherSounds);
    const optionsSet = [correctSound, ...otherSounds.slice(0, 4)];
    shuffleArray(optionsSet);

    optionsSet.forEach(sound => {
        const button = document.createElement('button');
        button.textContent = sound.name;
        button.onclick = () => {
            if (!questionAnswered) {
                checkAnswer(sound.name, correctSound.name);
                questionAnswered = true;
                setTimeout(() => {
                    loadTestOptions(); // Yeni random soruyu çağırıyoruz.
                }, 3000); // 3 saniye sonra yeni random soru getirilecek.
            }
        };
        options.appendChild(button);
    });
    playSound(correctSound.file);
}

function checkAnswer(selectedName, correctName) {
    const result = document.getElementById('result');
    result.innerHTML = '';

    if (correctName === selectedName) {
        result.innerHTML = 'პასუხი <span class="correct-answer">სწორია!</span>';
        result.classList.remove('incorrect');
        result.classList.add('correct');
        setTimeout(() => {
            result.textContent = ''; // 4 saniye sonra metni temizle
        }, 3000); // 4 saniye bekle
    } else {
        result.innerHTML = `პასუხი არასწორია!    სწორი პასუხი: <span class="correct-answer">${correctName}</span>`;
        result.classList.remove('correct');
        result.classList.add('incorrect');
        setTimeout(() => {
            result.textContent = ''; // 4 saniye sonra metni temizle
        }, 3000); // 4 saniye bekle
    }
    
}


function nextQuestion() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }
    loadTestOptions();
}

function clearResults() {
    const result = document.getElementById('result');
    if (result) result.innerHTML = '';
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const themeToggle = document.getElementById('theme-toggle');
    if (document.body.classList.contains('dark-mode')) {
        themeToggle.textContent = '☀️';
    } else {
        themeToggle.textContent = '🌙';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', toggleTheme);
    themeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

const heartSounds = [
    { name: 'Heart Sound 1', file: 'sounds/heart1.mp3' },
    { name: 'Heart Sound 2', file: 'sounds/heart2.mp3' }
];

const lungSounds = [
    { name: 'ვეზიკუური სუნთქვა', file: 'ses/ვეზიკუური სუნთქვა.mp3' },
    { name: 'ამფორული სუნთქვა', file: 'ses/ამფორული სუნთქვა.mp3' },
    { name: 'ბრონქოვეზოკულური ', file: 'ses/ბრონქოვეზიკულური სუნთქვა.mp3' },
    { name: 'ბრონქული სუნთქვა', file: 'ses/ბრონქული სუნთქვა.mp3' },
    { name: 'ექსპირაციული ქოშინის ფონზე მსტვინავი ხიხინი ', file: 'ses/ექსპირაციული ქოშინის ფონზე მსტვინავი ხიხინი.mp3' },
   
    { name: 'კრაპტაცია ბრონქოექტაზიის დროს', file: 'ses/კრაპტაცია ბრონქოექტაზიის დროს.mp3' },
    { name: 'კრეპიტაცია ფილტვის შეშუპების დროს', file: 'ses/კრეპიტაცია ფილტვის შეშუპების დროს.mp3' },
    { name: 'ლარინგომალაცია ჩვილში', file: 'ses/ლარინგომალაცია ჩვილში.mp3' },
    { name: 'მსტვინავი სუნთქვა და კრეპიტაცია', file: 'ses/მსტვინავი სუნთქვა და კრეპიტაცია.mp3' },
    { name: 'მსტვინავი ხიხინი  ასთმა', file: 'ses/მსტვინავი ხიხინი  ასთმა.mp3' },
    { name: 'მსტვინავი ხიხინი ბრონქიოლიტი', file: 'ses/მსტვინავი ხიხინი ბრონქიოლიტი.mp3' },
    { name: 'მსტვინავი ხიხინი', file: 'ses/მსტვინავი ხიხინი.mp3' },
    { name: 'მშრალი ხიხინი', file: 'ses/მშრალი ხიხინი.mp3' },
    { name: 'პლევრის ხახუნის ხმიანობა ', file: 'ses/პლევრის ხახუნის ხმიანობა .mp3' },
];
