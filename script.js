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

// ===== ЗАГРУЗКА СООБЩЕНИЙ В ЧАТАХ =====
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

const currentChatNum = document.body.dataset.chat;
if (currentChatNum) loadMessages(currentChatNum);

// ===== ОТПРАВКА СООБЩЕНИЯ В ЧАТАХ (СТРОГАЯ ПРОВЕРКА ИМЕНИ) =====
document.querySelectorAll('.btn-send').forEach(btn => {
    btn.addEventListener('click', async () => {
        const chatNum = btn.dataset.chat;
        const input = document.getElementById('messageInput' + chatNum);
        const authorInput = document.getElementById('authorInput' + chatNum);
        const text = input.value.trim();
        const author = authorInput ? authorInput.value.trim() : '';

        // СТРОГАЯ ПРОВЕРКА: имя обязательно
        if (!author) {
            showToast('⚠️ Пожалуйста, введите ваше имя (анонимность отключена)');
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
                author: author, // Больше никакого "Анонима" по умолчанию
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
            input.value = '';
            showToast('✅ Сообщение отправлено!');
        } catch (error) {
            console.error('Ошибка отправки:', error);
            showToast('❌ Ошибка отправки');
        } finally {
            btn.disabled = false;
            btn.textContent = originalText;
        }
    });
});

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

// ===== TOAST =====
const toast = document.getElementById('toast');
let toastTimeout = null;
function showToast(message) {
    if (!toast) return;
    if (toastTimeout) { clearTimeout(toastTimeout); toastTimeout = null; }
    toast.textContent = message;
    toast.classList.remove('hide');
    toast.classList.add('show');
    const duration = window.innerWidth <= 768 ? 2000 : 3000;
    toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
        toast.classList.add('hide');
        setTimeout(() => { if (!toast.classList.contains('show')) toast.classList.remove('hide'); }, 500);
    }, duration);
}

document.querySelectorAll('.fake-tab').forEach(tab => {
    tab.addEventListener('click', (e) => {
        e.preventDefault();
        showToast(tab.dataset.msg);
    });
});

// ===== TOGGLE КНОПКИ =====
document.querySelectorAll('.toggle-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const targetSection = this.id.includes('Info') 
            ? document.getElementById('infoSection' + this.id.replace('toggleInfo', ''))
            : document.getElementById('chatInputSection' + this.id.replace('toggleChat', ''));
        
        if (targetSection) {
            targetSection.classList.toggle('hidden-section');
            this.classList.toggle('active');
            if (this.id.includes('Info')) {
                this.textContent = this.classList.contains('active') ? '👤 Скрыть информацию' : '👤 Показать информацию о председателе';
            } else {
                this.textContent = this.classList.contains('active') ? '💬 Скрыть' : '💬 Добавить сообщение';
            }
        }
    });
});

// ===== СВЁРАЧИВАЕМЫЙ ТЕКСТ =====
function toggleInfo(chatNum) {
    const content = document.getElementById('infoContent' + chatNum);
    const btn = content.nextElementSibling;
    if (!content || !btn) return;
    
    if (content.classList.contains('collapsed')) {
        content.classList.remove('collapsed');
        btn.textContent = 'Скрыть ↑';
        setTimeout(() => content.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100);
    } else {
        content.classList.add('collapsed');
        btn.textContent = 'Показать ещё ↓';
    }
}

// ==========================================
// ===== НОВОЕ: ЛЕТАЮЩИЕ ИСТОРИИ И ВИДЖЕТ ===
// ==========================================

const chatToggleBtn = document.getElementById('chatToggleBtn');
const chatWidget = document.getElementById('chatWidget');
const closeChatBtn = document.getElementById('closeChatBtn');
const sendWidgetBtn = document.getElementById('sendWidgetBtn');

// 1. Открытие/закрытие виджета
if (chatToggleBtn && chatWidget) {
    chatToggleBtn.addEventListener('click', () => chatWidget.classList.toggle('hidden'));
    closeChatBtn.addEventListener('click', () => chatWidget.classList.add('hidden'));
}

// 2. Отправка истории из виджета в выбранный профсоюз
if (sendWidgetBtn) {
    sendWidgetBtn.addEventListener('click', async () => {
        const author = document.getElementById('widgetAuthor').value.trim();
        const unionId = document.getElementById('widgetUnion').value;
        const text = document.getElementById('widgetText').value.trim();

        if (!author) { showToast('⚠️ Пожалуйста, введите ваше имя'); return; }
        if (!unionId) { showToast('⚠️ Пожалуйста, выберите профсоюз'); return; }
        if (!text) { showToast('⚠️ Пожалуйста, напишите текст истории'); return; }

        sendWidgetBtn.disabled = true;
        sendWidgetBtn.textContent = 'Отправка...';

        try {
            await db.collection('messages' + unionId).add({
                author: author,
                text: text,
                unionId: unionId, // Сохраняем ID для отображения
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
            
            document.getElementById('widgetText').value = '';
            showToast('✅ История успешно добавлена!');
            chatWidget.classList.add('hidden');
        } catch (error) {
            console.error('Ошибка:', error);
            showToast('❌ Ошибка отправки');
        } finally {
            sendWidgetBtn.disabled = false;
            sendWidgetBtn.textContent = 'Отправить историю';
        }
    });
}

// 3. Система летающих сообщений в реальном времени
const floatingContainer = document.getElementById('floating-messages-container');
const unionNames = { '1': 'ППО ДИТС', '2': 'ППО Управления', '3': 'ППО Движения' };

function spawnFloatingMessage(data) {
    if (!floatingContainer) return;
    
    // Проверяем, что сообщение свежее (не старше 15 секунд), чтобы не спамить при загрузке страницы
    if (data.timestamp) {
        const msgTime = data.timestamp.toDate ? data.timestamp.toDate() : new Date(data.timestamp);
        if ((Date.now() - msgTime.getTime()) > 15000) return;
    }

    const el = document.createElement('div');
    const isDark = body.classList.contains('theme-dark');
    const unionName = unionNames[data.unionId] || 'Профсоюз';
    const author = escapeHtml(data.author || 'Не указано');
    const text = escapeHtml(data.text || '');

    if (isDark) {
        // Тёмная тема: Пузырьки
        el.className = 'floating-bubble-msg';
        el.style.left = Math.random() * 80 + 10 + '%'; // Случайная позиция по горизонтали
        el.style.animationDuration = (Math.random() * 10 + 12) + 's'; // Случайная скорость
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

    // Удаляем элемент после завершения анимации, чтобы не засорять DOM
    setTimeout(() => {
        if (el.parentNode) el.parentNode.removeChild(el);
    }, 25000);
}

// Слушаем все 3 коллекции на наличие новых сообщений
['1', '2', '3'].forEach(chatNum => {
    db.collection('messages' + chatNum)
      .orderBy('timestamp', 'desc')
      .limit(1) // Берем только последнее сообщение
      .onSnapshot((snapshot) => {
          if (!snapshot.empty) {
              const doc = snapshot.docs[0];
              const data = doc.data();
              data.unionId = chatNum; // Добавляем ID профсоюза для отображения
              spawnFloatingMessage(data);
          }
      });
});

// ===== EMOJI PICKER (без изменений, работает как раньше) =====
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

function fillEmojiGrid(containerId, emojis) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';
    emojis.forEach(emoji => {
        const item = document.createElement('span');
        item.className = 'emoji-item';
        item.textContent = emoji;
        item.addEventListener('click', () => insertEmoji(emoji));
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
        if (emojiSearch) emojiSearch.value = '';
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
