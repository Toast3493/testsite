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
                const author = data.author || 'Не указано';
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
    smileys: ['😀', '', '😄', '😁', '', '😅', '🤣', '😂', '🙂', '😊', '😇', '😍', '🤩', '', '😗', '😙', '', '😋', '😛', '', '🤪', '😝', '🤑', '🤗', '', '🤫', '🤔', '🤐', '🤨', '', '😑', '😶', '', '😒', '🙄', '😬', '😮‍💨', '🤥', '😌', '😔', '😪', '🤤', '😴', '😷', '🤒', '', '🤢', '🤮', '🥵', '🥶', '🥴', '😵', '🤯', '🤠', '🥳', '🥸', '😎', '🤓', '🧐'],
    gestures: ['', '🤚', '🖐️', '✋', '🖖', '👌', '🤌', '', '✌️', '🤞', '🤟', '🤘', '', '👈', '👉', '👆', '🖕', '👇', '☝️', '', '👎', '✊', '👊', '🤛', '', '👏', '🙌', '👐', '🤲', '', '🙏', '💅', '🤳', '💪'],
    hearts: ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '❤️🔥', '❤️‍', '💕', '💞', '', '💗', '💖', '', '💝', '💟'],
    objects: ['🎁', '🎀', '🥇', '🏆', '', '📋', '📁', '📂', '✉️', '📧', '📩', '', '🖥️', '⏰', '📅', '🗓️', '🔔', '📢', '', '🔊', '🔋', '🔧', '⚙️', '🛡️', '⚖️', '🔑', '🏠', '', '🏛️', '', '🚀', '✨', '', '🌟', '⭐', '', '🎉']
};

let currentEmojiTarget = null;
const emojiPopup = document.getElementById('emojiPopup');
const emojiSearch = document.getElementById('emojiSearch');

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

document.querySelectorAll('.emoji-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const chatNum = btn.dataset.chat;
        const textarea = document.getElementById('messageInput' + chatNum);
        if (!textarea || !emojiPopup) return;
        if (emojiPopup.classList.contains('active') && currentEmojiTarget === textarea) {
            emojiPopup.classList.remove('active');
            currentEmojiTarget = null;
            return;
        }
        currentEmojiTarget = textarea;
        const rect = btn.getBoundingClientRect();
        emojiPopup.style.position = 'fixed';
        emojiPopup.style.bottom = (window.innerHeight - rect.top + 10) + 'px';
        emojiPopup.style.left = Math.max(10, rect.left - 140) + 'px';
        emojiPopup.style.top = 'auto';
        emojiPopup.classList.add('active');
        emojiSearch.value = '';
    });
});

document.addEventListener('click', (e) => {
    if (!emojiPopup || !currentEmojiTarget) return;
    if (!emojiPopup.contains(e.target) && !e.target.classList.contains('emoji-btn')) {
        emojiPopup.classList.remove('active');
        currentEmojiTarget = null;
    }
});

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
        content.classList.remove('collapsed');
        btn.textContent = 'Скрыть ↑';
        setTimeout(() => {
            content.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    } else {
        content.classList.add('collapsed');
        btn.textContent = 'Показать ещё ↓';
    }
}

// ===== ОТПРАВКА СООБЩЕНИЙ (для страниц чатов) =====
// ИЗМЕНЕНИЕ: Имя теперь ОБЯЗАТЕЛЬНОЕ
document.querySelectorAll('.btn-send').forEach(btn => {
    btn.addEventListener('click', async () => {
        const chatNum = btn.dataset.chat;
        const input = document.getElementById('messageInput' + chatNum);
        const authorInput = document.getElementById('authorInput' + chatNum);
        const text = input.value.trim();
        const author = authorInput ? authorInput.value.trim() : '';

        // СТРОГАЯ ПРОВЕРКА: имя обязательно
        if (!author) {
            showToast('⚠️ Пожалуйста, введите ваше имя');
            if (authorInput) authorInput.focus();
            return;
        }
        if (!text) {
            showToast('Пожалуйста, введите сообщение');
            return;
        }

        const originalText = btn.textContent;
        btn.disabled = true;
        btn.textContent = 'Отправка...';

        try {
            await db.collection('messages' + chatNum).add({
                text: text,
                author: author,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
            input.value = '';
            setTimeout(() => {
                showToast('✅ Сообщение отправлено!');
            }, 300);
        } catch (error) {
            console.error('Ошибка отправки:', error);
            showToast('❌ Ошибка отправки');
        } finally {
            btn.disabled = false;
            btn.textContent = originalText;
        }
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

// ==========================================
// ===== ПЛАВАЮЩИЙ ЧАТ ИСТОРИЙ (ОБНОВЛЁННЫЙ) =====
// ==========================================

const chatToggleBtn = document.getElementById('chatToggleBtn');
const chatWidget = document.getElementById('chatWidget');
const closeChatBtn = document.getElementById('closeChatBtn');
const sendWidgetBtn = document.getElementById('sendWidgetBtn');

// ИЗМЕНЕНИЕ: Убираем вывод сообщений, оставляем только форму отправки
// Добавляем select для выбора профсоюза

// 1. Открытие/закрытие виджета
if (chatToggleBtn && chatWidget) {
    chatToggleBtn.addEventListener('click', () => {
        chatWidget.classList.toggle('hidden');
    });
}

if (closeChatBtn && chatWidget) {
    closeChatBtn.addEventListener('click', () => {
        chatWidget.classList.add('hidden');
    });
}

// 2. Отправка истории из виджета в выбранный профсоюз
if (sendWidgetBtn) {
    sendWidgetBtn.addEventListener('click', async () => {
        const authorInput = document.getElementById('widgetAuthor');
        const unionSelect = document.getElementById('widgetUnion');
        const textInput = document.getElementById('widgetText');

        if (!authorInput || !unionSelect || !textInput) {
            showToast('❌ Ошибка формы');
            return;
        }

        const author = authorInput.value.trim();
        const unionId = unionSelect.value;
        const text = textInput.value.trim();

        // СТРОГАЯ ПРОВЕРКА: имя обязательно
        if (!author) {
            showToast('⚠️ Пожалуйста, введите ваше имя');
            authorInput.focus();
            return;
        }
        if (!unionId) {
            showToast('⚠️ Пожалуйста, выберите профсоюз');
            return;
        }
        if (!text) {
            showToast('️ Пожалуйста, напишите текст истории');
            textInput.focus();
            return;
        }

        sendWidgetBtn.disabled = true;
        sendWidgetBtn.textContent = 'Отправка...';

        try {
            // ОТПРАВЛЯЕМ В ПРАВИЛЬНУЮ КОЛЛЕКЦИЮ: messages1, messages2 или messages3
            await db.collection('messages' + unionId).add({
                author: author,
                text: text,
                unionId: unionId, // Сохраняем ID профсоюза для отображения
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });

            textInput.value = ''; // Очищаем только текст, имя оставляем
            showToast('✅ История успешно добавлена!');
            chatWidget.classList.add('hidden');
        } catch (error) {
            console.error('Ошибка:', error);
            showToast('❌ Ошибка отправки');
        } finally {
            sendWidgetBtn.disabled = false;
            sendWidgetBtn.textContent = 'Отправить';
        }
    });
}

// ==========================================
// ===== ЛЕТАЮЩИЕ СООБЩЕНИЯ (ПОСТОЯННЫЙ ПОКАЗ) =====
// ==========================================

const floatingContainer = document.getElementById('floating-messages-container');
const unionNames = { '1': 'ППО ДИТС', '2': 'ППО Управления', '3': 'ППО Движения' };

// Хранилище всех сообщений
let allMessages = [];
let messageIndex = 0;
let showInterval = null;

function spawnFloatingMessage(data) {
    if (!floatingContainer) return;

    const el = document.createElement('div');
    const isDark = body.classList.contains('theme-dark');
    const unionId = data.unionId || '1';
    const unionName = unionNames[unionId] || 'Профсоюз';
    const author = escapeHtml(data.author || 'Не указано');
    const text = escapeHtml(data.text || '');

    if (isDark) {
        // Тёмная тема: Пузырьки с текстом
        el.className = 'floating-bubble-msg';
        el.style.left = Math.random() * 80 + 10 + '%';
        el.style.animationDuration = (Math.random() * 10 + 12) + 's';
        el.innerHTML = `
            <div class="fb-author">👤 ${author}</div>
            <div class="fb-union">🚇 ${unionName}</div>
            <div class="fb-text">${text}</div>
        `;
    } else {
        // Светлая тема: Геометрические фигуры
        const shapes = ['fb-shape-circle', 'fb-shape-square', 'fb-shape-diamond', 'fb-shape-rect'];
        const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
        el.className = `floating-geo-msg ${randomShape}`;
        el.style.left = Math.random() * 80 + 10 + '%';
        el.style.animationDuration = (Math.random() * 8 + 10) + 's';
        el.innerHTML = `
            <div class="fb-content">
                <div class="fb-author">👤 ${author}</div>
                <div class="fb-union">🚇 ${unionName}</div>
                <div class="fb-text">${text}</div>
            </div>
        `;
    }

    floatingContainer.appendChild(el);

    // Удаляем элемент после завершения анимации
    setTimeout(() => {
        if (el.parentNode) el.parentNode.removeChild(el);
    }, 25000);
}

// Показывать следующее сообщение
function showNextMessage() {
    if (allMessages.length === 0) return;
    
    const data = allMessages[messageIndex];
    spawnFloatingMessage(data);
    
    messageIndex = (messageIndex + 1) % allMessages.length;
}

// Загружаем все сообщения из всех коллекций
function loadAllMessages() {
    ['1', '2', '3'].forEach(chatNum => {
        db.collection('messages' + chatNum)
          .orderBy('timestamp', 'asc')
          .onSnapshot((snapshot) => {
              if (!snapshot.empty) {
                  snapshot.forEach(doc => {
                      const data = doc.data();
                      data.unionId = chatNum;
                      
                      // Проверяем, есть ли уже это сообщение
                      const exists = allMessages.some(msg => 
                          msg.text === data.text && msg.author === data.author
                      );
                      
                      if (!exists) {
                          allMessages.push(data);
                      }
                  });
              }
          });
    });
}

// Запускаем показ сообщений каждые 8 секунд
function startMessageShow() {
    loadAllMessages();
    
    // Первое сообщение через 2 секунды
    setTimeout(() => {
        showNextMessage();
        
        // Дальше каждые 8 секунд
        showInterval = setInterval(showNextMessage, 8000);
    }, 2000);
}

// Запускаем
startMessageShow();
