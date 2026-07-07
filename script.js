// ===== FIREBASE КОНФИГУРАЦИЯ =====
const firebaseConfig = {
    apiKey: "AIzaSyB5PeNgXrAPyW8qnfEvPSnB4qa_GCE1Dfo",
    authDomain: "wiki-profcom.firebaseapp.com",
    projectId: "wiki-profcom",
    storageBucket: "wiki-profcom.firebasestorage.app",
    messagingSenderId: "789513290691",
    appId: "1:789513290691:web:40e2ebc7b3611ac9b83376",
    measurementId: "G-5R4SZ4B19R"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// ===== УТИЛИТЫ =====
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function formatTimestamp(ts) {
    if (!ts) return '';
    const date = ts.toDate ? ts.toDate() : new Date(ts);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'только что';
    if (minutes < 60) return `${minutes} мин. назад`;
    if (hours < 24) return `${hours} ч. назад`;
    if (days < 7) return `${days} дн. назад`;
    return date.toLocaleDateString('ru-RU');
}

// ===== ЗАГРУЗКА СООБЩЕНИЙ =====
function loadMessages(chatNum) {
    const list = document.getElementById('messagesList' + chatNum);
    if (!list) return;
    
    const collectionName = 'messages' + chatNum;
    list.innerHTML = '<div class="loading-spinner">Загрузка сообщений...</div>';

    db.collection(collectionName)
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) => {
            list.innerHTML = '';

            if (snapshot.empty) {
                list.innerHTML = '<div class="loading-spinner">Пока нет сообщений. Будьте первым!</div>';
                return;
            }

            snapshot.forEach(doc => {
                const data = doc.data();
                const item = document.createElement('div');
                item.className = 'message-item';

                const author = data.author || 'Аноним';
                const timeStr = data.timestamp ? formatTimestamp(data.timestamp) : '';
                const timeHtml = timeStr ? `<div class="message-time">${timeStr}</div>` : '';

                item.innerHTML = `
                    <div class="message-author">${escapeHtml(author)}</div>
                    <div class="message-text">${escapeHtml(data.text || '')}</div>
                    ${timeHtml}
                `;
                list.appendChild(item);
            });
        }, (error) => {
            console.error('Ошибка загрузки сообщений:', error);
            list.innerHTML = '<div class="loading-spinner">⚠️ Ошибка загрузки</div>';
        });
}

// ===== ОТПРАВКА СООБЩЕНИЯ =====
async function sendMessageToFirebase(chatNum, text, author) {
    const collectionName = 'messages' + chatNum;
    try {
        await db.collection(collectionName).add({
            text: text,
            author: author || 'Аноним',
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        return { success: true };
    } catch (error) {
        console.error('Ошибка отправки:', error);
        return { success: false, error: error.message };
    }
}

// Загружаем сообщения для текущего чата (если есть)
const currentChatNum = document.body.dataset.chat;
if (currentChatNum) {
    loadMessages(currentChatNum);
}

// ===== ТЕМА =====
const body = document.body;
const themeToggle = document.getElementById('themeToggle');

const savedTheme = localStorage.getItem('theme') || 'light';
setTheme(savedTheme);

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const newTheme = body.classList.contains('theme-light') ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

function setTheme(theme) {
    body.classList.remove('theme-light', 'theme-dark');
    body.classList.add('theme-' + theme);
}

// ===== БУРГЕР-МЕНЮ =====
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

if (burger && nav) {
    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        nav.classList.toggle('active');
    });

    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            burger.classList.remove('active');
            nav.classList.remove('active');
        });
    });
}

// ===== ПУЗЫРЬКИ =====
function createBubbles() {
    const container = document.getElementById('bubbles');
    if (!container) return;
    const count = 25;
    for (let i = 0; i < count; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        const size = Math.random() * 40 + 10;
        bubble.style.width = size + 'px';
        bubble.style.height = size + 'px';
        bubble.style.left = Math.random() * 100 + '%';
        bubble.style.animationDuration = (Math.random() * 10 + 8) + 's';
        bubble.style.animationDelay = Math.random() * 10 + 's';
        container.appendChild(bubble);
    }
}
createBubbles();

// ===== ЗВЁЗДЫ =====
const canvas = document.getElementById('starCanvas');
const ctx = canvas ? canvas.getContext('2d') : null;

function resize() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

if (ctx) {
    class Star {
        constructor() { this.reset(); }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height - canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speed = Math.random() * 1.5 + 0.3;
            this.opacity = Math.random() * 0.8 + 0.2;
            this.twinkleSpeed = Math.random() * 0.02 + 0.005;
            this.twinklePhase = Math.random() * Math.PI * 2;
            const colors = [[120,100,255],[100,200,255],[255,130,200],[255,255,255]];
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }
        update() {
            this.y += this.speed;
            this.twinklePhase += this.twinkleSpeed;
            this.currentOpacity = this.opacity * (0.5 + 0.5 * Math.sin(this.twinklePhase));
            if (this.y > canvas.height + 10) { this.reset(); this.y = -10; }
        }
        draw() {
            const [r, g, b] = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${this.currentOpacity})`;
            ctx.fill();
            if (this.size > 1) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${this.currentOpacity * 0.15})`;
                ctx.fill();
            }
        }
    }

    class ShootingStar {
        constructor() { this.reset(); }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height * 0.5;
            this.length = Math.random() * 80 + 40;
            this.speed = Math.random() * 8 + 6;
            this.angle = Math.PI / 4 + (Math.random() - 0.5) * 0.3;
            this.opacity = 1;
            this.life = 0;
            this.maxLife = Math.random() * 40 + 20;
            this.active = false;
        }
        activate() { this.reset(); this.active = true; }
        update() {
            if (!this.active) return;
            this.x += Math.cos(this.angle) * this.speed;
            this.y += Math.sin(this.angle) * this.speed;
            this.life++;
            this.opacity = 1 - this.life / this.maxLife;
            if (this.life >= this.maxLife) this.active = false;
        }
        draw() {
            if (!this.active) return;
            const tailX = this.x - Math.cos(this.angle) * this.length;
            const tailY = this.y - Math.sin(this.angle) * this.length;
            const gradient = ctx.createLinearGradient(tailX, tailY, this.x, this.y);
            gradient.addColorStop(0, `rgba(255, 255, 255, 0)`);
            gradient.addColorStop(1, `rgba(255, 255, 255, ${this.opacity})`);
            ctx.beginPath();
            ctx.moveTo(tailX, tailY);
            ctx.lineTo(this.x, this.y);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1.5;
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.fill();
        }
    }

    const stars = Array.from({ length: 150 }, () => new Star());
    const shootingStars = Array.from({ length: 3 }, () => new ShootingStar());
    let shootingTimer = 0;

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stars.forEach(s => { s.update(); s.draw(); });
        shootingTimer++;
        if (shootingTimer > 120 + Math.random() * 200) {
            const inactive = shootingStars.find(s => !s.active);
            if (inactive) inactive.activate();
            shootingTimer = 0;
        }
        shootingStars.forEach(s => { s.update(); s.draw(); });
        requestAnimationFrame(animate);
    }
    animate();
}

// ===== TOAST =====
const toast = document.getElementById('toast');
let toastTimeout = null;

function showToast(message) {
    if (!toast) return;
    
    if (toastTimeout) {
        clearTimeout(toastTimeout);
        toastTimeout = null;
    }
    
    toast.textContent = message;
    toast.classList.remove('hide');
    toast.classList.add('show');
    
    const duration = window.innerWidth <= 768 ? 2000 : 3000;
    
    toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
        toast.classList.add('hide');
        
        setTimeout(() => {
            if (!toast.classList.contains('show')) {
                toast.classList.remove('hide');
            }
        }, 500);
    }, duration);
}

// Toast для "ОАО РЖД" (fake-tab)
document.querySelectorAll('.fake-tab').forEach(tab => {
    tab.addEventListener('click', (e) => {
        e.preventDefault();
        showToast(tab.dataset.msg);
    });
});

// ===== EMOJI PICKER =====
const emojiData = {
    frequent: ['😊', '😂', '❤️', '👍', '🙏', '✨', '🎉', '🔥', '💪', '👏', '✅', '⭐'],
    smileys: ['😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '😊', '😇', '😍', '🤩', '😘', '😗', '😙', '😚', '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭', '🤫', '🤔', '🤐', '🤨', '😐', '😑', '😶', '😏', '😒', '🙄', '😬', '😮‍💨', '🤥', '😌', '😔', '😪', '🤤', '😴', '😷', '🤒', '🤕', '🤢', '🤮', '🥵', '🥶', '🥴', '😵', '🤯', '🤠', '🥳', '🥸', '😎', '🤓', '🧐'],
    gestures: ['👋', '🤚', '🖐️', '✋', '🖖', '👌', '🤌', '🤏', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆', '🖕', '👇', '☝️', '👍', '👎', '✊', '👊', '🤛', '🤜', '👏', '🙌', '👐', '🤲', '🤝', '🙏', '💅', '🤳', '💪'],
    hearts: ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '❤️‍🔥', '❤️‍🩹', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '💟'],
    objects: ['🎁', '🎀', '🥇', '🏆', '📝', '📋', '📁', '📂', '✉️', '📧', '📩', '📤', '🖥️', '⏰', '📅', '🗓️', '🔔', '📢', '📣', '🔊', '🔋', '🔧', '⚙️', '🛡️', '⚖️', '🔑', '🏠', '🏢', '🏛️', '🎯', '🚀', '✨', '💫', '🌟', '⭐', '🎊', '🎉']
};

let currentEmojiTarget = null;
const emojiPopup = document.getElementById('emojiPopup');
const emojiSearch = document.getElementById('emojiSearch');

// Заполняем эмодзи
function fillEmojiGrid(containerId, emojis) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';
    emojis.forEach(emoji => {
        const item = document.createElement('span');
        item.className = 'emoji-item';
        item.textContent = emoji;
        item.addEventListener('click', () => {
            insertEmoji(emoji);
        });
        container.appendChild(item);
    });
}

if (emojiPopup) {
    fillEmojiGrid('emojiFrequent', emojiData.frequent);
    fillEmojiGrid('emojiSmileys', emojiData.smileys);
    fillEmojiGrid('emojiGestures', emojiData.gestures);
    fillEmojiGrid('emojiHearts', emojiData.hearts);
    fillEmojiGrid('emojiObjects', emojiData.objects);
}

// Вставка эмодзи в textarea
function insertEmoji(emoji) {
    if (!currentEmojiTarget) return;
    const textarea = currentEmojiTarget;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    textarea.value = text.substring(0, start) + emoji + text.substring(end);
    textarea.selectionStart = textarea.selectionEnd = start + emoji.length;
    textarea.focus();
}

// Кнопки открытия emoji popup
document.querySelectorAll('.emoji-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const chatNum = btn.dataset.chat;
        const textarea = document.getElementById('messageInput' + chatNum);
        
        if (!textarea || !emojiPopup) return;
        
        // Если popup уже открыт для этого чата — закрываем
        if (emojiPopup.classList.contains('active') && currentEmojiTarget === textarea) {
            emojiPopup.classList.remove('active');
            currentEmojiTarget = null;
            return;
        }
        
        currentEmojiTarget = textarea;
        
        // Позиционируем popup рядом с кнопкой
        const rect = btn.getBoundingClientRect();
        emojiPopup.style.position = 'fixed';
        emojiPopup.style.bottom = (window.innerHeight - rect.top + 10) + 'px';
        emojiPopup.style.left = Math.max(10, rect.left - 140) + 'px';
        emojiPopup.style.top = 'auto';
        
        emojiPopup.classList.add('active');
        emojiSearch.value = '';
    });
});

// Закрытие popup при клике вне его
document.addEventListener('click', (e) => {
    if (!emojiPopup || !currentEmojiTarget) return;
    if (!emojiPopup.contains(e.target) && !e.target.classList.contains('emoji-btn')) {
        emojiPopup.classList.remove('active');
        currentEmojiTarget = null;
    }
});

// Закрытие по Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && emojiPopup) {
        emojiPopup.classList.remove('active');
        currentEmojiTarget = null;
    }
});

// ===== СВЁРАЧИВАЕМЫЙ ТЕКСТ =====
function toggleInfo(chatNum) {
    const content = document.getElementById('infoContent' + chatNum);
    const btn = content.nextElementSibling;
    
    if (content.classList.contains('collapsed')) {
        // Раскрываем
        content.classList.remove('collapsed');
        btn.textContent = 'Скрыть ↑';
        
        // Плавная прокрутка к раскрытому тексту
        setTimeout(() => {
            content.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    } else {
        // Сворачиваем
        content.classList.add('collapsed');
        btn.textContent = 'Показать ещё ↓';
    }
}

// ===== ОТПРАВКА СООБЩЕНИЙ (для страниц чатов) =====
document.querySelectorAll('.btn-send').forEach(btn => {
    btn.addEventListener('click', async () => {
        const chatNum = btn.dataset.chat;
        const input = document.getElementById('messageInput' + chatNum);
        const authorInput = document.getElementById('authorInput' + chatNum);
        const text = input.value.trim();

        if (!text) {
            showToast('Пожалуйста, введите сообщение');
            return;
        }

        const author = authorInput ? authorInput.value.trim() : '';

        const originalText = btn.textContent;
        btn.disabled = true;
        btn.textContent = 'Отправка...';

        const result = await sendMessageToFirebase(chatNum, text, author);

        if (result.success) {
            input.value = '';
            setTimeout(() => {
                showToast('✅ Сообщение отправлено!');
            }, 300);
        } else {
            showToast('❌ Ошибка отправки');
        }

        btn.disabled = false;
        btn.textContent = originalText;
    });
});

// ===== TOGGLE КНОПКИ (для страниц чатов) =====
document.querySelectorAll('.toggle-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const targetId = this.id.replace('toggle', 'infoSection').replace('toggle', 'chatInputSection');
        let targetSection;
        
        if (this.id.includes('Info')) {
            targetSection = document.getElementById('infoSection' + this.id.replace('toggleInfo', ''));
        } else if (this.id.includes('Chat')) {
            targetSection = document.getElementById('chatInputSection' + this.id.replace('toggleChat', ''));
        }
        
        if (targetSection) {
            targetSection.classList.toggle('hidden-section');
            this.classList.toggle('active');
            
            if (this.id.includes('Info')) {
                this.textContent = this.classList.contains('active') ? '👤 Скрыть информацию' : '👤 Показать информацию о председателе';
            } else if (this.id.includes('Chat')) {
                this.textContent = this.classList.contains('active') ? '💬 Скрыть' : '💬 Добавить сообщение';
            }
        }
    });
});
