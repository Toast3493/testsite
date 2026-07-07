<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Главная страница</title>
    
    <!-- Firebase SDK -->
    <script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore-compat.js"></script>

    <style>

    
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        html {
            scroll-behavior: smooth;
        }

        body.locked {
            overflow: hidden;
            height: 100vh;
        }

        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            line-height: 1.6;
            overflow-x: hidden;
            min-height: 100vh;
            position: relative;
            transition: background 0.6s ease, color 0.6s ease;
        }

        body.theme-light {
            color: #2d2d4a;
            background: #fefefe;
        }

        body.theme-dark {
            color: #e0e0e0;
            background: #0a0a1a;
        }

        /* ===== СВЕТЛАЯ ТЕМА: КОЛЕСО С СЕКТОРАМИ ===== */
        .bg-light {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -3;
            background: #fefefe;
            overflow: hidden;
            transition: opacity 0.6s ease;
        }

        body.theme-dark .bg-light {
            opacity: 0;
            pointer-events: none;
        }

        .geo-wheel {
            position: absolute;
            width: 1200px;
            height: 1200px;
            border-radius: 50%;
            animation: wheelRotate 60s linear infinite;
            opacity: 0.15;
        }

        .geo-wheel.wheel1 {
            background: conic-gradient(
                from 0deg,
                #f7941d 0deg 60deg,
                #ed1c24 60deg 120deg,
                #be1e2d 120deg 180deg,
                #7a0c1f 180deg 240deg,
                #fbb03b 240deg 300deg,
                #f7941d 300deg 360deg
            );
            top: -400px;
            left: -400px;
        }

        .geo-wheel.wheel2 {
            background: conic-gradient(
                from 120deg,
                #ed1c24 0deg 90deg,
                #f7941d 90deg 180deg,
                #be1e2d 180deg 270deg,
                #fbb03b 270deg 360deg
            );
            bottom: -300px;
            right: -300px;
            width: 800px;
            height: 800px;
            animation-duration: 45s;
            animation-direction: reverse;
            opacity: 0.12;
        }

        .geo-wheel.wheel3 {
            background: conic-gradient(
                from 240deg,
                #be1e2d 0deg 72deg,
                #7a0c1f 72deg 144deg,
                #ed1c24 144deg 216deg,
                #f7941d 216deg 288deg,
                #fbb03b 288deg 360deg
            );
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 600px;
            height: 600px;
            animation-duration: 80s;
            opacity: 0.08;
        }

        @keyframes wheelRotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }

        .geo-shape {
            position: absolute;
            opacity: 0.1;
        }

        .geo-shape.triangle1 {
            width: 0;
            height: 0;
            border-left: 100px solid transparent;
            border-right: 100px solid transparent;
            border-bottom: 173px solid #f7941d;
            top: 20%;
            right: 15%;
            animation: geoFloat1 20s ease-in-out infinite;
        }

        .geo-shape.triangle2 {
            width: 0;
            height: 0;
            border-left: 80px solid transparent;
            border-right: 80px solid transparent;
            border-bottom: 139px solid #ed1c24;
            bottom: 30%;
            left: 10%;
            animation: geoFloat2 25s ease-in-out infinite;
        }

        @keyframes geoFloat1 {
            0%, 100% { transform: translate(0, 0) rotate(0deg); }
            50% { transform: translate(30px, -40px) rotate(15deg); }
        }

        @keyframes geoFloat2 {
            0%, 100% { transform: translate(0, 0) rotate(0deg); }
            50% { transform: translate(-40px, 30px) rotate(-20deg); }
        }

        /* ===== ТЁМНАЯ ТЕМА ===== */
        .blob {
            position: fixed;
            border-radius: 50%;
            filter: blur(60px);
            opacity: 0.5;
            z-index: -2;
            pointer-events: none;
            transition: opacity 0.6s ease;
        }

        body.theme-light .blob {
            opacity: 0;
        }

        .blob.blob1 {
            width: 400px;
            height: 400px;
            background: #ff9a9e;
            top: -100px;
            left: -100px;
            animation: blobFloat1 15s ease-in-out infinite;
        }

        .blob.blob2 {
            width: 500px;
            height: 500px;
            background: #a1c4fd;
            top: 30%;
            right: -150px;
            animation: blobFloat2 18s ease-in-out infinite;
        }

        .blob.blob3 {
            width: 350px;
            height: 350px;
            background: #ffb6c1;
            bottom: 10%;
            left: 20%;
            animation: blobFloat3 20s ease-in-out infinite;
        }

        .blob.blob4 {
            width: 300px;
            height: 300px;
            background: #b5d8ff;
            top: 60%;
            left: -100px;
            animation: blobFloat1 22s ease-in-out infinite reverse;
        }

        @keyframes blobFloat1 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(50px, 80px) scale(1.1); }
            66% { transform: translate(-30px, 40px) scale(0.95); }
        }

        @keyframes blobFloat2 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(-60px, 50px) scale(1.05); }
            66% { transform: translate(40px, -30px) scale(0.9); }
        }

        @keyframes blobFloat3 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(70px, -60px) scale(1.15); }
        }

        .bubbles {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            overflow: hidden;
            transition: opacity 0.6s ease;
        }

        body.theme-light .bubbles {
            opacity: 0;
            pointer-events: none;
        }

        .bubble {
            position: absolute;
            bottom: -100px;
            border-radius: 50%;
            background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), rgba(255,255,255,0.2));
            border: 1px solid rgba(255, 255, 255, 0.5);
            animation: rise linear infinite;
            box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.5);
        }

        @keyframes rise {
            0% { transform: translateY(0) translateX(0); opacity: 0; }
            10% { opacity: 0.8; }
            90% { opacity: 0.8; }
            100% { transform: translateY(-110vh) translateX(100px); opacity: 0; }
        }

        #starCanvas {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 0;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.6s ease;
        }

        body.theme-dark #starCanvas {
            opacity: 1;
        }

        .glow-orb {
            position: fixed;
            border-radius: 50%;
            filter: blur(80px);
            pointer-events: none;
            z-index: 0;
            opacity: 0;
            transition: opacity 0.6s ease;
        }

        body.theme-dark .glow-orb {
            opacity: 1;
        }

        .glow-orb.orb1 {
            width: 500px;
            height: 500px;
            background: rgba(120, 100, 255, 0.12);
            top: -100px;
            right: -100px;
            animation: float 8s ease-in-out infinite;
        }

        .glow-orb.orb2 {
            width: 400px;
            height: 400px;
            background: rgba(100, 200, 255, 0.1);
            bottom: 10%;
            left: -150px;
            animation: float 10s ease-in-out infinite reverse;
        }

        .glow-orb.orb3 {
            width: 350px;
            height: 350px;
            background: rgba(255, 130, 200, 0.08);
            top: 50%;
            right: -100px;
            animation: float 12s ease-in-out infinite 2s;
        }

        @keyframes float {
            0%, 100% { transform: translate(0, 0); }
            33% { transform: translate(30px, -30px); }
            66% { transform: translate(-20px, 20px); }
        }

        /* ===== ШАПКА ===== */
        header {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 100;
            transition: all 0.6s ease;
        }

        body.theme-light header {
            background: rgba(254, 254, 254, 0.9);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border-bottom: 2px solid #ed1c24;
            box-shadow: 0 4px 20px rgba(237, 28, 36, 0.1);
        }

        body.theme-dark header {
            background: rgba(10, 10, 26, 0.8);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .header-inner {
            max-width: 1200px;
            margin: 0 auto;
            padding: 18px 40px;
            display: flex;
            gap: 20px;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            background: transparent !important;
        }

        /* ===== ЛЕВАЯ ЧАСТЬ (ЛОГОТИП) ===== */
        .header-left {
            display: flex;
            align-items: center;
            gap: 15px;
        }

        /* ===== ЛОГОТИП ===== */
        .logo-container {
            display: flex;
            align-items: center;
            flex-shrink: 0;
            background: transparent !important;
        }

        .logo {
            height: 50px;
            width: auto;
            transition: opacity 0.6s ease;
            background: transparent !important;
            border: none !important;
        }

        .logo img {
            background: transparent !important;
        }

        body.theme-light .logo-light {
            display: block;
            opacity: 1;
        }

        body.theme-light .logo-dark {
            display: none;
        }

        body.theme-dark .logo-light {
            display: none;
        }

        body.theme-dark .logo-dark {
            display: block;
            opacity: 1;
        }

        /* ===== ПЕРЕКЛЮЧАТЕЛЬ ТЕМЫ ===== */
        .theme-toggle {
            width: 64px;
            height: 34px;
            border-radius: 50px;
            position: relative;
            cursor: pointer;
            transition: all 0.4s ease;
            flex-shrink: 0;
        }

        body.theme-light .theme-toggle {
            background: linear-gradient(135deg, #f7941d, #ed1c24);
            box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.2), 0 0 15px rgba(237, 28, 36, 0.3);
        }

        body.theme-dark .theme-toggle {
            background: linear-gradient(135deg, #1a1a3e, #2d1b4e);
            box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.4), 0 0 15px rgba(120, 100, 255, 0.3);
        }

        .theme-toggle .toggle-knob {
            position: absolute;
            top: 3px;
            width: 28px;
            height: 28px;
            border-radius: 50%;
            transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            overflow: hidden;
        }

        body.theme-light .toggle-knob {
            left: 3px;
            background: #fff;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }

        body.theme-dark .toggle-knob {
            left: 33px;
            background: #1a1a2e;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
        }

        /* ===== ИКОНКИ СОЛНЦА И ЛУНЫ ===== */
        .icon-sun, .icon-moon {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: opacity 0.4s ease, transform 0.4s ease;
            font-size: 16px;
            line-height: 1;
            pointer-events: none;
        }

        .icon-sun {
            opacity: 1 !important;
            transform: rotate(0deg) scale(1);
        }

        .icon-moon {
            opacity: 0 !important;
            transform: rotate(-90deg) scale(0.5);
            filter: brightness(2.5) drop-shadow(0 0 3px rgba(255, 255, 255, 0.8));
        }

        body.theme-light .icon-sun {
            opacity: 1 !important;
            transform: rotate(0deg) scale(1) !important;
        }

        body.theme-light .icon-moon {
            opacity: 0 !important;
            transform: rotate(90deg) scale(0.5) !important;
        }

        body.theme-dark .icon-sun {
            opacity: 0 !important;
            transform: rotate(-90deg) scale(0.5) !important;
        }

        body.theme-dark .icon-moon {
            opacity: 1 !important;
            transform: rotate(0deg) scale(1) !important;
            filter: brightness(2.5) drop-shadow(0 0 5px rgba(255, 255, 255, 0.9)) !important;
        }

        /* ===== ПРАВАЯ ЧАСТЬ (НАВИГАЦИЯ + ССЫЛКА) ===== */
        .header-right {
            display: flex;
            align-items: center;
            gap: 16px;
            flex-wrap: wrap;
        }

        /* ===== НАВИГАЦИЯ ===== */
        nav {
            display: flex;
            gap: 16px;
            align-items: center;
            flex-wrap: wrap;
        }

        nav a {
            text-decoration: none;
            font-size: 15px;
            font-weight: 700;
            padding: 12px 26px;
            border-radius: 50px;
            transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            position: relative;
            overflow: hidden;
            letter-spacing: 0.3px;
            cursor: pointer;
        }

        nav a::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
            transition: left 0.6s ease;
        }

        nav a:hover::before {
            left: 100%;
        }

        nav a:hover {
            transform: translateY(-3px) scale(1.05);
        }

        body.theme-light nav a {
            color: #fff;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        }

        body.theme-light nav a.tab1 {
            background: linear-gradient(135deg, #ed1c24 0%, #f7941d 100%);
            box-shadow: 0 6px 20px rgba(237, 28, 36, 0.4);
        }

        body.theme-light nav a.tab2 {
            background: linear-gradient(135deg, #f7941d 0%, #fbb03b 100%);
            box-shadow: 0 6px 20px rgba(247, 148, 29, 0.4);
        }

        body.theme-light nav a.tab3 {
            background: linear-gradient(135deg, #be1e2d 0%, #ed1c24 100%);
            box-shadow: 0 6px 20px rgba(190, 30, 45, 0.4);
        }

        body.theme-dark nav a {
            color: #fff;
            border: 1px solid rgba(255, 255, 255, 0.15);
            background: linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02));
        }

        body.theme-dark nav a:nth-child(1) {
            border-color: rgba(120, 100, 255, 0.4);
            box-shadow: 0 0 15px rgba(120, 100, 255, 0.2);
        }

        body.theme-dark nav a:nth-child(2) {
            border-color: rgba(100, 200, 255, 0.4);
            box-shadow: 0 0 15px rgba(100, 200, 255, 0.2);
        }

        body.theme-dark nav a:nth-child(3) {
            border-color: rgba(255, 130, 200, 0.4);
            box-shadow: 0 0 15px rgba(255, 130, 200, 0.2);
        }

        /* ===== ССЫЛКА НА РОСПРОФЖЕЛ ===== */
        .rospofzhel-link {
            text-decoration: none;
            font-size: 15px;
            font-weight: 700;
            padding: 12px 26px;
            border-radius: 50px;
            transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            position: relative;
            overflow: hidden;
            letter-spacing: 0.3px;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: linear-gradient(135deg, #c41e3a 0%, #8b0000 100%);
            color: #fff !important;
            box-shadow: 0 6px 20px rgba(196, 30, 58, 0.4);
            border: 2px solid rgba(255, 255, 255, 0.2);
        }

        .rospofzhel-link::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
            transition: left 0.6s ease;
        }

        .rospofzhel-link:hover::before {
            left: 100%;
        }

        .rospofzhel-link:hover {
            transform: translateY(-3px) scale(1.05);
            box-shadow: 0 10px 30px rgba(196, 30, 58, 0.6);
        }

        .rospofzhel-link::after {
            content: '🔗';
            font-size: 14px;
        }

        /* ===== БУРГЕР-МЕНЮ ===== */
        .burger {
            display: none;
            flex-direction: column;
            gap: 5px;
            cursor: pointer;
            padding: 10px;
            z-index: 101;
        }

        .burger span {
            width: 25px;
            height: 3px;
            border-radius: 3px;
            transition: all 0.3s ease;
        }

        body.theme-light .burger span {
            background: #2d2d4a;
        }

        body.theme-dark .burger span {
            background: #fff;
        }

        .burger.active span:nth-child(1) {
            transform: rotate(45deg) translate(6px, 6px);
        }

        .burger.active span:nth-child(2) {
            opacity: 0;
        }

        .burger.active span:nth-child(3) {
            transform: rotate(-45deg) translate(6px, -6px);
        }

        /* ===== ОПИСАНИЕ ===== */
        .description {
            min-height: 100vh;
            padding: 140px 40px 120px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            z-index: 2;
        }

        .description-inner {
            max-width: 800px;
            text-align: center;
            transition: all 0.6s ease;
        }

        body.theme-light .description-inner {
            background: rgba(255, 255, 255, 0.85);
            backdrop-filter: blur(15px);
            -webkit-backdrop-filter: blur(15px);
            padding: 60px 50px;
            border-radius: 30px;
            border: 3px solid #ed1c24;
            box-shadow: 0 20px 60px rgba(237, 28, 36, 0.15);
        }

        body.theme-dark .description-inner {
            background: transparent;
            padding: 60px 50px;
        }

        .description h2 {
            font-size: 56px;
            font-weight: 900;
            margin-bottom: 8px;
            letter-spacing: -2px;
            transition: all 0.6s ease;
        }

        body.theme-light .description h2 {
            background: linear-gradient(135deg, #ed1c24 0%, #f7941d 50%, #be1e2d 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        body.theme-dark .description h2 {
            background: linear-gradient(135deg, #7864ff, #64c8ff, #ff82c8);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

.description p {
    font-size: 20px;
    line-height: 1.4;
    font-weight: 500;
    transition: all 0.6s ease;
    margin-top: 0;
    margin-bottom: 16px;
}

.description p:first-of-type {
    font-size: 24px;
    margin-top: -4px;
    margin-bottom: 20px;
}

.description .welcome-text {
    margin-top: -8px !important;
    margin-bottom: 16px !important;
    line-height: 1.4 !important;
}

        body.theme-light .description p {
            color: #2d2d4a;
        }

        body.theme-dark .description p {
            color: rgba(255, 255, 255, 0.6);
        }

        .btn-start {
            display: inline-block;
            margin-top: 40px;
            padding: 18px 50px;
            font-size: 17px;
            font-weight: 700;
            font-family: inherit;
            color: #fff;
            border: none;
            border-radius: 50px;
            cursor: pointer;
            transition: all 0.4s ease;
            position: relative;
            overflow: hidden;
            letter-spacing: 0.5px;
        }

        body.theme-light .btn-start {
            background: linear-gradient(135deg, #ed1c24 0%, #f7941d 100%);
            box-shadow: 0 8px 25px rgba(237, 28, 36, 0.4);
        }

        body.theme-dark .btn-start {
            background: linear-gradient(135deg, #7864ff, #64c8ff);
            box-shadow: 0 8px 25px rgba(120, 100, 255, 0.35);
        }

        .btn-start::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
            transition: left 0.6s ease;
        }

        .btn-start:hover::before {
            left: 100%;
        }

        .btn-start:hover {
            transform: translateY(-3px);
        }

        body.theme-light .btn-start:hover {
            box-shadow: 0 12px 35px rgba(237, 28, 36, 0.55);
        }

        body.theme-dark .btn-start:hover {
            box-shadow: 0 15px 40px rgba(120, 100, 255, 0.5);
        }

        .scroll-hint {
            margin-top: 40px;
            opacity: 0;
            transition: opacity 0.6s ease;
        }

        body.locked .scroll-hint {
            display: none;
        }

        body.theme-dark .scroll-hint {
            opacity: 1;
        }

        body.theme-light .scroll-hint {
            opacity: 0.7;
        }

        .scroll-hint span {
            display: inline-block;
            font-size: 13px;
            letter-spacing: 2px;
            text-transform: uppercase;
            font-weight: 600;
        }

        body.theme-light .scroll-hint span {
            color: rgba(237, 28, 36, 0.6);
        }

        body.theme-dark .scroll-hint span {
            color: rgba(255, 255, 255, 0.3);
        }

        .scroll-arrow {
            display: block;
            margin: 12px auto 0;
            width: 20px;
            height: 20px;
            transform: rotate(45deg);
            animation: bounce 2s ease infinite;
        }

        body.theme-light .scroll-arrow {
            border-right: 2px solid rgba(237, 28, 36, 0.5);
            border-bottom: 2px solid rgba(237, 28, 36, 0.5);
        }

        body.theme-dark .scroll-arrow {
            border-right: 2px solid rgba(255, 255, 255, 0.3);
            border-bottom: 2px solid rgba(255, 255, 255, 0.3);
        }

        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: rotate(45deg) translateY(0); }
            40% { transform: rotate(45deg) translateY(8px); }
            60% { transform: rotate(45deg) translateY(4px); }
        }

        .wave-divider {
            position: relative;
            width: 100%;
            height: 120px;
            z-index: 2;
            margin-top: -1px;
        }

        .wave-divider svg {
            width: 100%;
            height: 100%;
            display: block;
        }

        /* ===== ВЫБОР ПОДРАЗДЕЛЕНИЯ ===== */
        .department-selector {
            min-height: 100vh;
            padding: 80px 40px 120px;
            max-width: 700px;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            justify-content: center;
            position: relative;
            z-index: 2;
        }

        .selector-card {
            padding: 60px 50px;
            border-radius: 30px;
            animation: fadeInUp 1s ease;
            transition: all 0.6s ease;
        }

        body.theme-light .selector-card {
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 3px solid #f7941d;
            box-shadow: 0 20px 60px rgba(247, 148, 29, 0.2);
        }

        body.theme-dark .selector-card {
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.08);
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }

        .department-selector h2 {
            font-size: 42px;
            margin-bottom: 12px;
            text-align: center;
            font-weight: 900;
            letter-spacing: -1px;
            transition: all 0.6s ease;
        }

        body.theme-light .department-selector h2 {
            background: linear-gradient(135deg, #f7941d 0%, #ed1c24 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        body.theme-dark .department-selector h2 {
            background: linear-gradient(135deg, #64c8ff, #7864ff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .department-selector .subtitle {
            text-align: center;
            margin-bottom: 40px;
            font-size: 17px;
            font-weight: 500;
            transition: all 0.6s ease;
        }

        body.theme-light .department-selector .subtitle {
            color: #5a5a7a;
        }

        body.theme-dark .department-selector .subtitle {
            color: rgba(255, 255, 255, 0.45);
        }

        .select-wrapper {
            position: relative;
            margin-bottom: 24px;
        }

        select {
            width: 100%;
            padding: 20px 24px;
            font-size: 17px;
            font-family: inherit;
            border-radius: 16px;
            appearance: none;
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: 600;
        }

        body.theme-light select {
            border: 2px solid #f7941d;
            background: rgba(255, 255, 255, 0.9);
            color: #2d2d4a;
        }

        body.theme-light select option {
            background: #fff;
            color: #2d2d4a;
        }

        body.theme-light select:focus {
            outline: none;
            border-color: #ed1c24;
            background: rgba(255, 255, 255, 1);
            box-shadow: 0 0 0 4px rgba(237, 28, 36, 0.2);
        }

        body.theme-dark select {
            border: 1px solid rgba(255, 255, 255, 0.12);
            background: rgba(255, 255, 255, 0.05);
            color: #fff;
            backdrop-filter: blur(10px);
        }

        body.theme-dark select option {
            background: #1a1a2e;
            color: #fff;
        }

        body.theme-dark select:focus {
            outline: none;
            border-color: rgba(120, 100, 255, 0.5);
            box-shadow: 0 0 30px rgba(120, 100, 255, 0.15);
        }

        .select-wrapper::after {
            content: '▼';
            position: absolute;
            right: 24px;
            top: 50%;
            transform: translateY(-50%);
            pointer-events: none;
            font-size: 12px;
            transition: color 0.6s ease;
        }

        body.theme-light .select-wrapper::after {
            color: #ed1c24;
        }

        body.theme-dark .select-wrapper::after {
            color: rgba(255, 255, 255, 0.4);
        }

        .btn-continue {
            width: 100%;
            padding: 20px;
            font-size: 17px;
            font-weight: 700;
            font-family: inherit;
            color: #fff;
            border: none;
            border-radius: 16px;
            cursor: pointer;
            transition: all 0.4s ease;
            position: relative;
            overflow: hidden;
            letter-spacing: 0.5px;
            margin-bottom: 16px;
        }

        body.theme-light .btn-continue {
            background: linear-gradient(135deg, #ed1c24 0%, #f7941d 50%, #be1e2d 100%);
            background-size: 200% 200%;
            box-shadow: 0 8px 25px rgba(237, 28, 36, 0.4);
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
            animation: btnGradient 5s ease infinite;
        }

        body.theme-dark .btn-continue {
            background: linear-gradient(135deg, #7864ff, #64c8ff);
            box-shadow: 0 8px 25px rgba(120, 100, 255, 0.35);
        }

        @keyframes btnGradient {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
        }

        .btn-continue::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
            transition: left 0.6s ease;
        }

        .btn-continue:hover:not(:disabled)::before {
            left: 100%;
        }

        .btn-continue:hover:not(:disabled) {
            transform: translateY(-3px);
        }

        body.theme-light .btn-continue:hover:not(:disabled) {
            box-shadow: 0 12px 35px rgba(237, 28, 36, 0.55);
        }

        body.theme-dark .btn-continue:hover:not(:disabled) {
            box-shadow: 0 15px 40px rgba(120, 100, 255, 0.5);
        }

        body.theme-light .btn-continue:disabled {
            background: rgba(200, 200, 200, 0.5);
            color: rgba(45, 45, 74, 0.4);
            cursor: not-allowed;
            box-shadow: none;
            animation: none;
        }

        body.theme-dark .btn-continue:disabled {
            background: rgba(255, 255, 255, 0.08);
            color: rgba(255, 255, 255, 0.25);
            cursor: not-allowed;
            box-shadow: none;
        }

        .btn-back {
            width: 100%;
            padding: 16px;
            font-size: 15px;
            font-weight: 600;
            font-family: inherit;
            border: 2px solid;
            border-radius: 16px;
            cursor: pointer;
            transition: all 0.3s ease;
            background: transparent;
        }

        body.theme-light .btn-back {
            border-color: rgba(237, 28, 36, 0.4);
            color: #ed1c24;
        }

        body.theme-light .btn-back:hover {
            background: rgba(237, 28, 36, 0.1);
            border-color: #ed1c24;
        }

        body.theme-dark .btn-back {
            border-color: rgba(120, 100, 255, 0.4);
            color: #7864ff;
        }

        body.theme-dark .btn-back:hover {
            background: rgba(120, 100, 255, 0.1);
            border-color: #7864ff;
        }

        /* ===== БЛОК ЧАТА ===== */
        .chat-section {
            min-height: 100vh;
            padding: 120px 40px 80px;
            max-width: 1200px;
            margin: 0 auto;
            position: relative;
            z-index: 2;
            display: none;
        }

        .chat-section.visible {
            display: block;
            animation: fadeInUp 0.8s ease;
        }

        .chat-container {
            display: grid;
            grid-template-columns: 350px 1fr;
            gap: 30px;
            padding: 40px;
            border-radius: 30px;
            transition: all 0.6s ease;
        }

        body.theme-light .chat-container {
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 3px solid #be1e2d;
            box-shadow: 0 20px 60px rgba(190, 30, 45, 0.15);
        }

        body.theme-dark .chat-container {
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.08);
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }

        .person-card {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 30px;
            border-radius: 20px;
            transition: all 0.6s ease;
        }

        body.theme-light .person-card {
            background: rgba(255, 255, 255, 0.95);
            border: 2px solid #f7941d;
        }

        body.theme-dark .person-card {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .person-photo {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            margin-bottom: 20px;
            object-fit: cover;
            border: 4px solid;
            transition: all 0.6s ease;
        }

        body.theme-light .person-photo {
            border-color: #ed1c24;
            box-shadow: 0 8px 20px rgba(237, 28, 36, 0.3);
        }

        body.theme-dark .person-photo {
            border-color: #7864ff;
            box-shadow: 0 8px 20px rgba(120, 100, 255, 0.3);
        }

        .person-name {
            font-size: 22px;
            font-weight: 700;
            margin-bottom: 8px;
            text-align: center;
            transition: all 0.6s ease;
        }

        body.theme-light .person-name {
            color: #2d2d4a;
        }

        body.theme-dark .person-name {
            color: #fff;
        }

        .person-description {
            font-size: 14px;
            line-height: 1.6;
            text-align: center;
            transition: all 0.6s ease;
        }

        body.theme-light .person-description {
            color: #5a5a7a;
        }

        body.theme-dark .person-description {
            color: rgba(255, 255, 255, 0.6);
        }

        .chat-right {
            display: flex;
            flex-direction: column;
        }

        .chat-header {
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 20px;
            transition: all 0.6s ease;
        }

        body.theme-light .chat-header {
            background: linear-gradient(135deg, #ed1c24 0%, #f7941d 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        body.theme-dark .chat-header {
            background: linear-gradient(135deg, #64c8ff, #7864ff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        /* ===== ПОЛЕ ВВОДА ИМЕНИ ===== */
        .author-input-wrapper {
            margin-bottom: 12px;
        }

        .author-input {
            width: 100%;
            padding: 12px 16px;
            font-size: 14px;
            font-family: inherit;
            border-radius: 10px;
            transition: all 0.3s ease;
        }

        body.theme-light .author-input {
            border: 2px solid rgba(247, 148, 29, 0.4);
            background: rgba(255, 255, 255, 0.9);
            color: #2d2d4a;
        }

        body.theme-light .author-input::placeholder {
            color: rgba(45, 45, 74, 0.5);
        }

        body.theme-light .author-input:focus {
            outline: none;
            border-color: #ed1c24;
            background: rgba(255, 255, 255, 1);
            box-shadow: 0 0 0 3px rgba(237, 28, 36, 0.15);
        }

        body.theme-dark .author-input {
            border: 1px solid rgba(255, 255, 255, 0.15);
            background: rgba(255, 255, 255, 0.05);
            color: #fff;
        }

        body.theme-dark .author-input::placeholder {
            color: rgba(255, 255, 255, 0.4);
        }

        body.theme-dark .author-input:focus {
            outline: none;
            border-color: rgba(120, 100, 255, 0.5);
            box-shadow: 0 0 15px rgba(120, 100, 255, 0.15);
        }

        .message-input-wrapper {
            margin-bottom: 20px;
        }

        .message-input {
            width: 100%;
            padding: 16px 20px;
            font-size: 15px;
            font-family: inherit;
            border-radius: 12px;
            resize: vertical;
            min-height: 80px;
            transition: all 0.3s ease;
        }

        body.theme-light .message-input {
            border: 2px solid #f7941d;
            background: rgba(255, 255, 255, 0.9);
            color: #2d2d4a;
        }

        body.theme-light .message-input:focus {
            outline: none;
            border-color: #ed1c24;
            background: rgba(255, 255, 255, 1);
            box-shadow: 0 0 0 4px rgba(237, 28, 36, 0.2);
        }

        body.theme-dark .message-input {
            border: 1px solid rgba(255, 255, 255, 0.12);
            background: rgba(255, 255, 255, 0.05);
            color: #fff;
        }

        body.theme-dark .message-input:focus {
            outline: none;
            border-color: rgba(120, 100, 255, 0.5);
            box-shadow: 0 0 20px rgba(120, 100, 255, 0.15);
        }

        .btn-send {
            width: 100%;
            padding: 16px;
            font-size: 16px;
            font-weight: 700;
            font-family: inherit;
            color: #fff;
            border: none;
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-bottom: 20px;
        }

        body.theme-light .btn-send {
            background: linear-gradient(135deg, #ed1c24 0%, #f7941d 100%);
            box-shadow: 0 6px 20px rgba(237, 28, 36, 0.4);
        }

        body.theme-dark .btn-send {
            background: linear-gradient(135deg, #7864ff, #64c8ff);
            box-shadow: 0 6px 20px rgba(120, 100, 255, 0.35);
        }

        .btn-send:hover {
            transform: translateY(-2px);
        }

        body.theme-light .btn-send:hover {
            box-shadow: 0 10px 30px rgba(237, 28, 36, 0.55);
        }

        body.theme-dark .btn-send:hover {
            box-shadow: 0 10px 30px rgba(120, 100, 255, 0.5);
        }

        .messages-divider {
            height: 1px;
            margin: 20px 0;
            transition: all 0.6s ease;
        }

        body.theme-light .messages-divider {
            background: linear-gradient(90deg, transparent, rgba(237, 28, 36, 0.3), transparent);
        }

        body.theme-dark .messages-divider {
            background: linear-gradient(90deg, transparent, rgba(120, 100, 255, 0.3), transparent);
        }

        .messages-list {
            flex: 1;
            overflow-y: auto;
            padding-right: 10px;
            margin-bottom: 20px;
        }

        .messages-list::-webkit-scrollbar {
            width: 6px;
        }

        body.theme-light .messages-list::-webkit-scrollbar-track {
            background: rgba(247, 148, 29, 0.2);
            border-radius: 10px;
        }

        body.theme-light .messages-list::-webkit-scrollbar-thumb {
            background: rgba(237, 28, 36, 0.5);
            border-radius: 10px;
        }

        body.theme-dark .messages-list::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 10px;
        }

        body.theme-dark .messages-list::-webkit-scrollbar-thumb {
            background: rgba(120, 100, 255, 0.5);
            border-radius: 10px;
        }

        .message-item {
            padding: 16px 20px;
            margin-bottom: 12px;
            border-radius: 12px;
            transition: all 0.6s ease;
            animation: fadeInUp 0.5s ease;
        }

        body.theme-light .message-item {
            background: rgba(255, 255, 255, 0.95);
            border: 1px solid rgba(247, 148, 29, 0.3);
        }

        body.theme-dark .message-item {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }

        /* ===== ИМЯ АВТОРА В СООБЩЕНИИ ===== */
        .message-author {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 13px;
            font-weight: 700;
            margin-bottom: 6px;
            transition: all 0.6s ease;
        }

        body.theme-light .message-author {
            color: #ed1c24;
        }

        body.theme-dark .message-author {
            color: #64c8ff;
        }

        .message-author::before {
            content: '👤';
            font-size: 12px;
        }

        .message-text {
            font-size: 15px;
            line-height: 1.6;
            transition: all 0.6s ease;
        }

        body.theme-light .message-text {
            color: #2d2d4a;
        }

        body.theme-dark .message-text {
            color: rgba(255, 255, 255, 0.85);
        }

        .message-time {
            font-size: 11px;
            margin-top: 6px;
            opacity: 0.5;
            font-style: italic;
        }

        .toggle-btn {
            width: 100%;
            padding: 12px;
            font-size: 14px;
            font-weight: 600;
            font-family: inherit;
            border: 2px solid;
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.3s ease;
            background: transparent;
            margin-bottom: 12px;
        }

        body.theme-light .toggle-btn {
            border-color: rgba(237, 28, 36, 0.4);
            color: #ed1c24;
        }

        body.theme-light .toggle-btn:hover {
            background: rgba(237, 28, 36, 0.1);
            border-color: #ed1c24;
        }

        body.theme-dark .toggle-btn {
            border-color: rgba(120, 100, 255, 0.4);
            color: #7864ff;
        }

        body.theme-dark .toggle-btn:hover {
            background: rgba(120, 100, 255, 0.1);
            border-color: #7864ff;
        }

        .toggle-btn.active {
            background: rgba(237, 28, 36, 0.15) !important;
            border-color: #ed1c24 !important;
        }

        body.theme-dark .toggle-btn.active {
            background: rgba(120, 100, 255, 0.2) !important;
            border-color: #7864ff !important;
        }

        .hidden-section {
            display: none;
        }

        .info-content {
            max-height: 350px;
            overflow-y: auto;
            padding-right: 10px;
            margin-bottom: 12px;
            -webkit-overflow-scrolling: touch;
        }

        .info-content::-webkit-scrollbar {
            width: 6px;
        }

        body.theme-light .info-content::-webkit-scrollbar-track {
            background: rgba(247, 148, 29, 0.2);
            border-radius: 10px;
        }

        body.theme-light .info-content::-webkit-scrollbar-thumb {
            background: rgba(237, 28, 36, 0.5);
            border-radius: 10px;
        }

        body.theme-dark .info-content::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 10px;
        }

        body.theme-dark .info-content::-webkit-scrollbar-thumb {
            background: rgba(120, 100, 255, 0.5);
            border-radius: 10px;
        }

        .loading-spinner {
            text-align: center;
            padding: 20px;
            font-size: 14px;
            opacity: 0.6;
        }

        .toast {
            position: fixed;
            bottom: 40px;
            left: 50%;
            transform: translateX(-50%) translateY(100px);
            padding: 16px 32px;
            border-radius: 50px;
            font-size: 14px;
            font-weight: 500;
            z-index: 200;
            transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease;
            pointer-events: none;
            max-width: 90%;
            text-align: center;
            opacity: 0;
        }

        body.theme-light .toast {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            border: 2px solid #ed1c24;
            color: #2d2d4a;
            box-shadow: 0 10px 30px rgba(237, 28, 36, 0.2);
        }

        body.theme-dark .toast {
            background: rgba(30, 30, 50, 0.95);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.15);
            color: #fff;
        }

        .toast.show {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }

        .toast.hide {
            transform: translateX(-50%) translateY(100px);
            opacity: 0;
        }

        @media (max-width: 1024px) {
            .chat-container {
                grid-template-columns: 280px 1fr;
                gap: 20px;
                padding: 30px;
            }

            .person-photo {
                width: 120px;
                height: 120px;
            }

            .person-name {
                font-size: 20px;
            }
        }

        @media (max-width: 768px) {
            .header-inner {
                padding: 12px 16px;
                gap: 10px;
            }

            /* Левая часть - логотип + переключатель темы */
            .header-left {
                flex-direction: row;
                align-items: center;
                gap: 12px;
            }

            .logo {
                height: 35px !important;
            }

            .theme-toggle {
                width: 50px;
                height: 28px;
            }

            .theme-toggle .toggle-knob {
                width: 22px;
                height: 22px;
                font-size: 12px;
            }

            body.theme-dark .toggle-knob {
                left: 25px;
            }

            /* Правая часть - только бургер */
            .header-right {
                margin-left: auto;
            }

            .burger {
                display: flex;
                padding: 8px;
            }

            .burger span {
                width: 28px;
                height: 3px;
            }

            /* Навигация на весь экран */
            nav {
                position: fixed;
                top: 0;
                right: -100%;
                width: 85%;
                max-width: 320px;
                height: 100vh;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                gap: 16px;
                transition: right 0.3s ease;
                z-index: 99;
                padding: 20px;
            }

            body.theme-light nav {
                background: rgba(255, 255, 255, 0.98);
                backdrop-filter: blur(20px);
                box-shadow: -5px 0 30px rgba(0, 0, 0, 0.15);
            }

            body.theme-dark nav {
                background: rgba(10, 10, 26, 0.98);
                backdrop-filter: blur(20px);
                box-shadow: -5px 0 30px rgba(0, 0, 0, 0.5);
            }

            nav.active {
                right: 0;
            }

            nav a {
                font-size: 16px;
                padding: 14px 28px;
                width: 90%;
                text-align: center;
                white-space: normal;
                word-wrap: break-word;
            }

            /* Ссылка на Роспрофжел в мобильном меню - только одна! */
            nav .rospofzhel-link-mobile {
                display: block;
                width: 90%;
                margin-top: 20px;
                padding: 16px 28px;
                font-size: 16px;
                text-align: center;
                background: linear-gradient(135deg, #c41e3a 0%, #8b0000 100%);
                color: #fff !important;
                border-radius: 50px;
                font-weight: 700;
                text-decoration: none;
                box-shadow: 0 6px 20px rgba(196, 30, 58, 0.4);
                border: 2px solid rgba(255, 255, 255, 0.2);
                animation: pulseHighlight 2s ease-in-out infinite;
            }

            @keyframes pulseHighlight {
                0%, 100% {
                    box-shadow: 0 6px 20px rgba(196, 30, 58, 0.4);
                    transform: scale(1);
                }
                50% {
                    box-shadow: 0 8px 30px rgba(196, 30, 58, 0.6);
                    transform: scale(1.02);
                }
            }

            /* Скрываем десктопную ссылку на мобильных */
            .rospofzhel-link {
                display: none !important;
            }

            /* Описание */
            .description {
                min-height: auto;
                padding: 100px 16px 60px;
            }

            .description-inner {
                max-width: 100% !important;
                width: 100% !important;
                padding: 30px 20px !important;
            }

            .description h2 {
                font-size: 28px;
                margin-bottom: 12px;
            }

            .description p {
                font-size: 15px;
                line-height: 1.6;
            }

            /* Выбор подразделения */
            .department-selector {
                padding: 40px 16px 60px;
            }

            .selector-card {
                padding: 30px 20px !important;
            }

            .department-selector h2 {
                font-size: 26px;
            }

            .department-selector .subtitle {
                font-size: 14px;
                margin-bottom: 24px;
            }

            select {
                padding: 16px;
                font-size: 15px;
            }

            .btn-continue,
            .btn-back {
                padding: 16px;
                font-size: 15px;
            }

            /* Чаты */
            .chat-section {
                padding: 80px 12px 40px;
            }

            .chat-container {
                grid-template-columns: 1fr;
                padding: 16px;
                gap: 16px;
            }

            .person-card {
                padding: 20px;
            }

            .person-photo {
                width: 100px;
                height: 100px;
            }

            .person-name {
                font-size: 16px;
            }

            .chat-header {
                font-size: 18px;
            }

            .message-input {
                padding: 12px;
                font-size: 14px;
                min-height: 70px;
            }

            .btn-send {
                padding: 14px;
                font-size: 14px;
            }

            .toggle-btn {
                padding: 12px;
                font-size: 13px;
            }

            /* Toast на мобильных */
            .toast {
                bottom: auto;
                top: 80px;
                padding: 12px 16px;
                font-size: 13px;
                max-width: 90%;
            }
        }

        @media (max-width: 480px) {
            .header-inner {
                padding: 10px 12px;
            }

            .logo {
                height: 30px !important;
            }

            nav a {
                font-size: 15px;
                padding: 12px 20px;
            }

            .description h2 {
                font-size: 24px;
            }

            .description p {
                font-size: 14px;
            }

            .department-selector h2 {
                font-size: 22px;
            }
        }

        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }

        /* ===== УБИРАЕМ ССЫЛКИ С ЗАГОЛОВКОВ ===== */
.description h2,
.department-selector h2 {
    cursor: default !important;
    pointer-events: none !important;
    text-decoration: none !important;
    color: inherit !important;
}

.description h2::after,
.description h2::before,
.department-selector h2::after,
.department-selector h2::before {
    display: none !important;
    content: none !important;
    visibility: hidden !important;
}

.description h2 a,
.department-selector h2 a {
    pointer-events: none !important;
    text-decoration: none !important;
    color: inherit !important;
}

/* ===== EMOJI PICKER ===== */
.emoji-btn {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    padding: 8px;
    border-radius: 8px;
    transition: all 0.2s ease;
    position: relative;
    flex-shrink: 0;
}

.emoji-btn:hover {
    background: rgba(237, 28, 36, 0.1);
    transform: scale(1.15);
}

body.theme-dark .emoji-btn:hover {
    background: rgba(120, 100, 255, 0.2);
}

.emoji-input-row {
    display: flex;
    gap: 10px;
    align-items: flex-end;
    margin-bottom: 20px;
}

.emoji-input-row .message-input-wrapper {
    flex: 1;
    margin-bottom: 0;
}

.emoji-popup {
    position: absolute;
    bottom: 100%;
    left: 0;
    width: 320px;
    max-height: 280px;
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 8px 40px rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(0, 0, 0, 0.1);
    padding: 12px;
    z-index: 300;
    display: none;
    overflow-y: auto;
    animation: emojiSlideUp 0.2s ease;
}

body.theme-dark .emoji-popup {
    background: #1a1a2e;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 8px 40px rgba(0, 0, 0, 0.5);
}

.emoji-popup.active {
    display: block;
}

@keyframes emojiSlideUp {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.emoji-popup-header {
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 8px;
    padding-bottom: 6px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

body.theme-dark .emoji-popup-header {
    color: rgba(255, 255, 255, 0.5);
    border-bottom-color: rgba(255, 255, 255, 0.1);
}

body.theme-light .emoji-popup-header {
    color: rgba(0, 0, 0, 0.4);
}

.emoji-category {
    margin-bottom: 10px;
}

.emoji-category-title {
    font-size: 11px;
    font-weight: 600;
    margin-bottom: 4px;
    opacity: 0.5;
}

.emoji-grid {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    gap: 2px;
}

.emoji-item {
    font-size: 22px;
    padding: 4px;
    text-align: center;
    cursor: pointer;
    border-radius: 8px;
    transition: all 0.15s ease;
    user-select: none;
    line-height: 1.3;
}

.emoji-item:hover {
    background: rgba(237, 28, 36, 0.1);
    transform: scale(1.3);
}

body.theme-dark .emoji-item:hover {
    background: rgba(120, 100, 255, 0.2);
}

.emoji-search {
    width: 100%;
    padding: 8px 12px;
    border-radius: 10px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    font-size: 13px;
    font-family: inherit;
    margin-bottom: 10px;
    outline: none;
    transition: all 0.3s ease;
}

body.theme-light .emoji-search {
    background: rgba(0, 0, 0, 0.04);
    color: #2d2d4a;
    border-color: rgba(0, 0, 0, 0.1);
}

body.theme-dark .emoji-search {
    background: rgba(255, 255, 255, 0.05);
    color: #fff;
    border-color: rgba(255, 255, 255, 0.1);
}

.emoji-search:focus {
    border-color: #ed1c24;
}

body.theme-dark .emoji-search:focus {
    border-color: #7864ff;
}

@media (max-width: 480px) {
    .emoji-popup {
        width: 280px;
        left: -40px;
    }
    
    .emoji-grid {
        grid-template-columns: repeat(7, 1fr);
    }
}

/* Скрываем мобильную ссылку на десктопе по умолчанию */
.rospofzhel-link-mobile {
    display: none !important;
}

/* В мобильной версии показываем только мобильную ссылку */
@media (max-width: 768px) {
    .rospofzhel-link-mobile {
        display: block !important;
    }
    
    .rospofzhel-link {
        display: none !important;
    }
}

/* ===== СВЁРАЧИВАЕМЫЙ ТЕКСТ (только мобильные) ===== */
.info-content {
    position: relative;
    max-height: none;
    overflow: visible;
    transition: max-height 0.5s ease;
}

/* На мобильных ограничиваем высоту */
@media (max-width: 768px) {
    .info-content.collapsed {
        max-height: 250px;  /* Показываем примерно 1-2 абзаца */
        overflow: hidden;
    }
    
    /* Градиентная тень снизу для индикации */
    .info-content.collapsed::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 80px;
        background: linear-gradient(to bottom, transparent, rgba(10, 10, 26, 0.9));
        pointer-events: none;
    }
    
    body.theme-light .info-content.collapsed::after {
        background: linear-gradient(to bottom, transparent, rgba(254, 254, 254, 0.95));
    }
}

/* Кнопка "Показать ещё" */
.show-more-btn {
    width: 100%;
    padding: 12px;
    font-size: 14px;
    font-weight: 600;
    font-family: inherit;
    border: 2px solid;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    background: transparent;
    margin-top: 12px;
    display: none;  /* Скрываем по умолчанию */
}

/* Показываем кнопку только на мобильных */
@media (max-width: 768px) {
    .show-more-btn {
        display: block;
    }
}

body.theme-light .show-more-btn {
    border-color: rgba(237, 28, 36, 0.4);
    color: #ed1c24;
}

body.theme-light .show-more-btn:hover {
    background: rgba(237, 28, 36, 0.1);
    border-color: #ed1c24;
}

body.theme-dark .show-more-btn {
    border-color: rgba(120, 100, 255, 0.4);
    color: #7864ff;
}

body.theme-dark .show-more-btn:hover {
    background: rgba(120, 100, 255, 0.1);
    border-color: #7864ff;
}

    </style>
</head>
<body class="theme-light locked">

    <!-- СВЕТЛАЯ ТЕМА: КОЛЕСА С СЕКТОРАМИ -->
    <div class="bg-light">
        <div class="geo-wheel wheel1"></div>
        <div class="geo-wheel wheel2"></div>
        <div class="geo-wheel wheel3"></div>
        <div class="geo-shape triangle1"></div>
        <div class="geo-shape triangle2"></div>
    </div>

    <!-- ТЁМНАЯ ТЕМА: СТАРЫЕ ЭЛЕМЕНТЫ -->
    <div class="blob blob1"></div>
    <div class="blob blob2"></div>
    <div class="blob blob3"></div>
    <div class="blob blob4"></div>
    <div class="bubbles" id="bubbles"></div>

    <div class="glow-orb orb1"></div>
    <div class="glow-orb orb2"></div>
    <div class="glow-orb orb3"></div>
    <canvas id="starCanvas"></canvas>

    <header>
        <div class="header-inner">
            <!-- ЛЕВАЯ ЧАСТЬ: ЛОГОТИП + ПЕРЕКЛЮЧАТЕЛЬ ТЕМЫ -->
            <div class="header-left">
                <div class="logo-container">
                    <img src="https://raw.githubusercontent.com/Toast3493/Toast3493.github.io/main/logo-dark.png" alt="Логотип" class="logo logo-light">
                    <img src="https://raw.githubusercontent.com/Toast3493/Toast3493.github.io/main/logo-light.png" alt="Логотип" class="logo logo-dark">
                </div>
                <div class="theme-toggle" id="themeToggle" title="Переключить тему">
                    <div class="toggle-knob" id="toggleKnob">
                        <span class="icon-sun">☀️</span>
                        <span class="icon-moon">🌙</span>
                    </div>
                </div>
            </div>

            <!-- ПРАВАЯ ЧАСТЬ: НАВИГАЦИЯ + ССЫЛКА НА РОСПРОФЖЕЛ -->
            <div class="header-right">
                <nav id="nav">
                    <a id="navStart" class="tab1">ГУП "Московский метрополитен"</a>
                    <a class="tab2 fake-tab" data-msg="Скоро будет доступно ✨">ОАО "РЖД"</a>
                    <!-- Ссылка на Роспрофжел для мобильных (в меню) -->
                    <a href="https://rosprofzhel.ru/" target="_blank" class="rospofzhel-link-mobile">🔗 Роспрофжел</a>
                </nav>
                <!-- Ссылка на Роспрофжел для десктопа (справа от меню) -->
                <a href="https://rosprofzhel.ru/" target="_blank" class="rospofzhel-link">Роспрофжел</a>
                <div class="burger" id="burger">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
    </header>

    <div class="description">
        <div class="description-inner">
            <h2>У каждой истории есть значение...</h2>
            <p class="welcome-text">Добро пожаловать!</p>
<p>За каждым профсоюзом стоят не только документы, собрания и отчеты. Прежде всего — это люди, их поддержка, взаимопомощь и истории, которые остаются в памяти на всю жизнь.</p>
        </div>
    </div>

    <div class="wave-divider">
        <svg viewBox="0 0 1440 150" preserveAspectRatio="none">
            <path class="wave-path-1" d="M0,80 C360,150 720,0 1080,80 C1260,120 1380,100 1440,80 L1440,150 L0,150 Z"/>
            <path class="wave-path-2" d="M0,100 C360,40 720,140 1080,80 C1260,50 1380,90 1440,100 L1440,150 L0,150 Z"/>
        </svg>
    </div>

    <div class="department-selector" id="department-selector">
        <div class="selector-card">
            <h2>Выберите подразделение</h2>
            <p class="subtitle">После выбора вы перейдёте на соответствующую страницу</p>

            <div class="select-wrapper">
                <select id="departmentSelect">
                    <option value="">— Выберите подразделение —</option>
                    <option value="dept1">ППО Дирекции информационно-технологических систем</option>
                    <option value="dept2">ППО Управления метрополитена</option>
                    <option value="dept3">ППО Службы движения</option>
                </select>
            </div>

            <button class="btn-continue" id="continueBtn" disabled>Продолжить</button>
            <button class="btn-back" id="backBtn">← Вернуться назад</button>
        </div>
    </div>

    <!-- ЧАТ 1 -->
    <div class="chat-section" id="chatSection1">
        <div class="chat-container">
            <div class="person-card">
                <img src="https://raw.githubusercontent.com/Toast3493/Toast3493.github.io/main/PPODITS.png" alt="Фото" class="person-photo">
                <div class="person-name">Левтер Татьяна Владимировна</div>
            </div>

            <div class="chat-right">
                <button class="toggle-btn" id="toggleInfo1">👤 Показать информацию о председателе</button>
                <div class="hidden-section" id="infoSection1">
    <div class="person-card" style="margin-bottom: 16px;">
        <div class="info-content collapsed" id="infoContent1">
            <div class="person-description">
                <p>На метрополитене работает с 1992 года, вся рабочая деятельность посвящена работе с людьми – техник, инспектор по кадрам, специалист по подготовке кадров, председатель первичной профсоюзной организации. </p>
<p>Имеет высшее юридическое образование. </p>
<p>В 2015 году была избрана председателем ППО ДИТС. </p>
<p>Основные задачи - решение социально-трудовых вопросов, контроль за соблюдением положений Коллективного договора, трудового законодательства, охраны труда. </p>
<p>Оказывает помощь в решении не только рабочих, а иногда и семейных, и бытовых проблем. </p> 
<p>Татьяна Владимировна рассказывает: </p>
<p> «Работник, проживающий в г. Чехове, во время Covid-19 вечером не смог вызвать скорую помощь или хотя бы записаться на прием на утро. Ему просто отказывали. Он позвонил мне и спросил как быть. На протяжении всего вечера находилась с работником на телефоне, параллельно дозвонилась до администрации города с просьбой оказать содействие. Утром работника пригласили на прием и провели рентгенологические исследования легких.»</p>
<p> Так же Татьяна Владимировна подметила:</p>
<p> «Помимо работы с членами профсоюза - штатными работниками Дирекции, большое внимание уделяется развитию Совета молодежи и Совета ветеранов Дирекции. В организуемых культурно-массовых и спортивных мероприятиях обязательно есть такие мероприятия, где работники могут принять участие со своими членами семьи – детьми, супругами. Это очень хорошо отражается на психологическом комфорте наших членов профсоюза, и соответственно на их работе.»</p>
                
            </div>
        </div>
        <button class="show-more-btn" onclick="toggleInfo('1')">Показать ещё ↓</button>
    </div>
</div>


                <div class="chat-header">Пожелания и благодарности</div>

                <button class="toggle-btn" id="toggleChat1">💬 Добавить сообщение</button>
                <div class="hidden-section" id="chatInputSection1">
                    <div class="author-input-wrapper">
                        <input type="text" class="author-input" id="authorInput1" placeholder="Ваше имя (необязательно — будет 'Аноним')">
                    </div>
                    <div class="emoji-input-row">
    <div class="message-input-wrapper">
        <textarea class="message-input" id="messageInput1" placeholder="Напишите ваше пожелание или благодарность..."></textarea>
    </div>
    <button class="emoji-btn" data-chat="1" title="Эмодзи">😊</button>
</div>
<button class="btn-send" data-chat="1">Отправить сообщение</button>
                </div>

                <div class="messages-divider"></div>

                <div class="messages-list" id="messagesList1">
                    <div class="loading-spinner">Загрузка сообщений...</div>
                </div>

                <button class="btn-back back-from-chat" data-target="dept-selector">← Вернуться к выбору подразделения</button>
            </div>
        </div>
    </div>

    <!-- ЧАТ 2 -->
    <div class="chat-section" id="chatSection2">
        <div class="chat-container">
            <div class="person-card">
                <img src="https://raw.githubusercontent.com/Toast3493/Toast3493.github.io/main/PPOUprav.png" alt="Фото" class="person-photo">
                <div class="person-name">Стаднийчук Татьяна Николаевна</div>
            </div>

            <div class="chat-right">
                <button class="toggle-btn" id="toggleInfo2"> Показать информацию о председателе</button>
               <div class="hidden-section" id="infoSection2">
    <div class="person-card" style="margin-bottom: 16px;">
        <div class="info-content collapsed" id="infoContent2">
            <div class="person-description">
                <p>Председатель Профсоюза Управления Московского метрополитена.</p>
                <p style="margin-top: 16px;">Ведёт правозащитную работу, решает трудовые споры. Имеет высшее юридическое образование.</p>
                <p style="margin-top: 16px;">Опыт работы в сфере трудового права - выше 20 лет.</p>
                <p style="margin-top: 16px;">Стаж работы в профсоюзе - выше 30 лет.</p>
            </div>
        </div>
        <button class="show-more-btn" onclick="toggleInfo('2')">Показать ещё ↓</button>
    </div>
    </div>

                <div class="chat-header">Пожелания и благодарности</div>

                <button class="toggle-btn" id="toggleChat2">💬 Добавить сообщение</button>
                <div class="hidden-section" id="chatInputSection2">
                    <div class="author-input-wrapper">
                        <input type="text" class="author-input" id="authorInput2" placeholder="Ваше имя (необязательно — будет 'Аноним')">
                    </div>
                   <div class="emoji-input-row">
    <div class="message-input-wrapper">
        <textarea class="message-input" id="messageInput1" placeholder="Напишите ваше пожелание или благодарность..."></textarea>
    </div>
    <button class="emoji-btn" data-chat="2" title="Эмодзи">😊</button>
</div>
<button class="btn-send" data-chat="2">Отправить сообщение</button>
                </div>

                <div class="messages-divider"></div>

                <div class="messages-list" id="messagesList2">
                    <div class="loading-spinner">Загрузка сообщений...</div>
                </div>

                <button class="btn-back back-from-chat" data-target="dept-selector">← Вернуться к выбору подразделения</button>
            </div>
        </div>
    </div>

    <!-- ЧАТ 3 -->
    <div class="chat-section" id="chatSection3">
        <div class="chat-container">
            <div class="person-card">
                <img src="https://raw.githubusercontent.com/Toast3493/Toast3493.github.io/main/PPODvij.png" alt="Фото" class="person-photo">
                <div class="person-name">Никитина Ольга Николаевна</div>
            </div>

            <div class="chat-right">
                <button class="toggle-btn" id="toggleInfo3">👤 Показать информацию</button>
                <div class="hidden-section" id="infoSection3">
    <div class="person-card" style="margin-bottom: 16px;">
        <div class="info-content collapsed" id="infoContent3">
            <div class="person-description">
                <p>С 1995 года посвятила свою жизнь метрополитену. Начинала с профессии, которую хорошо знала и любила, — организация перевозок. И даже став председателем ППО в 2020 году, не перестала смотреть на свою работу глазами человека, который ежедневно понимает, насколько важен труд каждого сотрудника.</p>
                
                <p style="margin-top: 16px;">Признаюсь: когда раздается звонок и в трубке звучат слова: «Мы хотим вас поблагодарить», первая мысль невольно тревожная — значит, что-то случилось. Но когда оказывается, что человек звонит лишь для того, чтобы сказать простое человеческое «спасибо», это всегда становится неожиданностью.</p>
                
                <p style="margin-top: 16px;">Профсоюз живет ожиданиями людей. Их надеждами, просьбами, переживаниями. И именно такие слова благодарности напоминают, ради чего мы работаем. Они вселяют веру в то, что наш труд действительно нужен, что мы не зря вкладываем в него силы, время и сердце.</p>
                
                <p style="margin-top: 16px;">Именно в такие моменты приходит самое ценное чувство — понимание, что за каждой решенной проблемой, за каждой поддержкой и каждым добрым делом стоят люди, которым стало немного легче. А значит, работа продолжается не напрасно.</p>
            </div>
        </div>
        <button class="show-more-btn" onclick="toggleInfo('3')">Показать ещё ↓</button>
    </div>
</div>

                <div class="chat-header">Пожелания и благодарности</div>

                <button class="toggle-btn" id="toggleChat3">💬 Добавить сообщение</button>
                <div class="hidden-section" id="chatInputSection3">
                    <div class="author-input-wrapper">
                        <input type="text" class="author-input" id="authorInput3" placeholder="Ваше имя (необязательно — будет 'Аноним')">
                    </div>
                    <div class="emoji-input-row">
    <div class="message-input-wrapper">
        <textarea class="message-input" id="messageInput1" placeholder="Напишите ваше пожелание или благодарность..."></textarea>
    </div>
    <button class="emoji-btn" data-chat="3" title="Эмодзи">😊</button>
</div>
<button class="btn-send" data-chat="3">Отправить сообщение</button>
                </div>

                <div class="messages-divider"></div>

                <div class="messages-list" id="messagesList3">
                    <div class="loading-spinner">Загрузка сообщений...</div>
                </div>

                <button class="btn-back back-from-chat" data-target="dept-selector">← Вернуться к выбору подразделения</button>
            </div>
        </div>
    </div>
<!-- EMOJI POPUP -->
<div class="emoji-popup" id="emojiPopup">
    <input type="text" class="emoji-search" id="emojiSearch" placeholder="🔍 Поиск эмодзи...">
    
    <div class="emoji-category">
        <div class="emoji-category-title">Часто используемые</div>
        <div class="emoji-grid" id="emojiFrequent"></div>
    </div>
    
    <div class="emoji-category">
        <div class="emoji-category-title">Смайлики</div>
        <div class="emoji-grid" id="emojiSmileys"></div>
    </div>
    
    <div class="emoji-category">
        <div class="emoji-category-title">Жесты</div>
        <div class="emoji-grid" id="emojiGestures"></div>
    </div>
    
    <div class="emoji-category">
        <div class="emoji-category-title">Сердца</div>
        <div class="emoji-grid" id="emojiHearts"></div>
    </div>
    
    <div class="emoji-category">
        <div class="emoji-category-title">Предметы</div>
        <div class="emoji-grid" id="emojiObjects"></div>
    </div>
</div>
    <div class="toast" id="toast"></div>

<script>
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

    loadMessages(1);
    loadMessages(2);
    loadMessages(3);

    // ===== ГРАНИЦА СКРОЛЛА =====
    let scrollBoundaryTop = 0;
    let isChatPage = false;

    window.addEventListener('scroll', () => {
        if (!isChatPage) return;
        if (window.scrollY < scrollBoundaryTop) {
            window.scrollTo(0, scrollBoundaryTop);
        }
    }, { passive: true });

    // Теперь функция принимает элемент чата и устанавливает границу выше
    function setScrollBoundary(chatElement) {
        // Устанавливаем границу на 120px выше верха чата
        // Это позволит видеть шапку чата (фото, имя, заголовок)
        scrollBoundaryTop = chatElement.offsetTop - 120;
        isChatPage = true;
    }

    function clearScrollBoundary() {
        isChatPage = false;
    }

    // ===== НАВИГАЦИЯ =====
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

    // ===== ТЕМА =====
    const body = document.body;
    const themeToggle = document.getElementById('themeToggle');
    const toggleKnob = document.getElementById('toggleKnob');

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
        updateWaveColors(theme);
    }

    function updateWaveColors(theme) {
        const path1 = document.querySelector('.wave-path-1');
        const path2 = document.querySelector('.wave-path-2');
        if (theme === 'light') {
            if (path1) path1.setAttribute('fill', 'rgba(237, 28, 36, 0.2)');
            if (path2) path2.setAttribute('fill', 'rgba(247, 148, 29, 0.3)');
        } else {
            if (path1) path1.setAttribute('fill', 'rgba(120, 100, 255, 0.1)');
            if (path2) path2.setAttribute('fill', 'rgba(100, 200, 255, 0.15)');
        }
    }
    updateWaveColors(savedTheme);

    // ===== ПЕРЕХОДЫ МЕЖДУ БЛОКАМИ =====
    const backBtn = document.getElementById('backBtn');
    const continueBtn = document.getElementById('continueBtn');
    const departmentSelect = document.getElementById('departmentSelect');
    const chatSection1 = document.getElementById('chatSection1');
    const chatSection2 = document.getElementById('chatSection2');
    const chatSection3 = document.getElementById('chatSection3');
    const navStart = document.getElementById('navStart');

    function lockScroll() {
        body.classList.add('locked');
    }

    function unlockScroll() {
        body.classList.remove('locked');
    }

    function hideAllChats() {
        if (chatSection1) chatSection1.classList.remove('visible');
        if (chatSection2) chatSection2.classList.remove('visible');
        if (chatSection3) chatSection3.classList.remove('visible');
    }

    // Кнопка "ГУП Московский метрополитен" в навигации
    if (navStart) {
        navStart.addEventListener('click', (e) => {
            e.preventDefault();
            clearScrollBoundary();
            unlockScroll();
            setTimeout(() => {
                document.getElementById('department-selector').scrollIntoView({ behavior: 'smooth' });
                setTimeout(() => { lockScroll(); }, 800);
            }, 100);
        });
    }

    // Кнопка "Вернуться назад" (из выбора подразделения на главную)
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            clearScrollBoundary();
            unlockScroll();
            hideAllChats();
            setTimeout(() => {
                document.querySelector('.description').scrollIntoView({ behavior: 'smooth' });
                setTimeout(() => { lockScroll(); }, 800);
            }, 100);
        });
    }

    // Кнопки "Вернуться к выбору подразделения" (из чатов)
    document.querySelectorAll('.back-from-chat').forEach(btn => {
        btn.addEventListener('click', () => {
            clearScrollBoundary();
            unlockScroll();
            hideAllChats();
            setTimeout(() => {
                document.getElementById('department-selector').scrollIntoView({ behavior: 'smooth' });
                setTimeout(() => { lockScroll(); }, 800);
            }, 100);
        });
    });

    // Активация кнопки "Продолжить" при выборе подразделения
    if (departmentSelect && continueBtn) {
        departmentSelect.addEventListener('change', () => {
            continueBtn.disabled = !departmentSelect.value;
        });

        // Переход к чату
        continueBtn.addEventListener('click', () => {
            if (!departmentSelect.value) return;

            clearScrollBoundary();
            unlockScroll();
            hideAllChats();

            let activeChat = null;
            if (departmentSelect.value === 'dept1') {
                activeChat = chatSection1;
            } else if (departmentSelect.value === 'dept2') {
                activeChat = chatSection2;
            } else if (departmentSelect.value === 'dept3') {
                activeChat = chatSection3;
            } else {
                alert('Этот раздел в разработке');
                lockScroll();
                return;
            }

            if (activeChat) {
                activeChat.classList.add('visible');
                setTimeout(() => {
                    activeChat.scrollIntoView({ behavior: 'smooth' });
                    setTimeout(() => { 
                        // Передаём элемент чата в функцию
                        setScrollBoundary(activeChat); 
                    }, 900);
                }, 100);
            }
        });
    }

    // ===== ОТПРАВКА СООБЩЕНИЙ =====
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

    // ===== TOGGLE КНОПКИ =====
    const toggleInfo1 = document.getElementById('toggleInfo1');
    const toggleChat1 = document.getElementById('toggleChat1');
    const toggleInfo2 = document.getElementById('toggleInfo2');
    const toggleChat2 = document.getElementById('toggleChat2');
    const toggleInfo3 = document.getElementById('toggleInfo3');
    const toggleChat3 = document.getElementById('toggleChat3');

    if (toggleInfo1) {
        toggleInfo1.addEventListener('click', function() {
            document.getElementById('infoSection1').classList.toggle('hidden-section');
            this.classList.toggle('active');
            this.textContent = this.classList.contains('active') ? '👤 Скрыть информацию' : '👤 Показать информацию о председателе';
        });
    }

    if (toggleChat1) {
        toggleChat1.addEventListener('click', function() {
            document.getElementById('chatInputSection1').classList.toggle('hidden-section');
            this.classList.toggle('active');
            this.textContent = this.classList.contains('active') ? '💬 Скрыть' : '💬 Добавить сообщение';
        });
    }

    if (toggleInfo2) {
        toggleInfo2.addEventListener('click', function() {
            document.getElementById('infoSection2').classList.toggle('hidden-section');
            this.classList.toggle('active');
            this.textContent = this.classList.contains('active') ? '👤 Скрыть информацию' : '👤 Показать информацию о председателе';
        });
    }

    if (toggleChat2) {
        toggleChat2.addEventListener('click', function() {
            document.getElementById('chatInputSection2').classList.toggle('hidden-section');
            this.classList.toggle('active');
            this.textContent = this.classList.contains('active') ? '💬 Скрыть' : '💬 Добавить сообщение';
        });
    }

    if (toggleInfo3) {
        toggleInfo3.addEventListener('click', function() {
            document.getElementById('infoSection3').classList.toggle('hidden-section');
            this.classList.toggle('active');
            this.textContent = this.classList.contains('active') ? '👤 Скрыть информацию' : '👤 Показать информацию';
        });
    }

    if (toggleChat3) {
        toggleChat3.addEventListener('click', function() {
            document.getElementById('chatInputSection3').classList.toggle('hidden-section');
            this.classList.toggle('active');
            this.textContent = this.classList.contains('active') ? '💬 Скрыть' : '💬 Добавить сообщение';
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
        frequent: ['😊', '😂', '❤️', '👍', '🙏', '', '🎉', '🔥', '💪', '👏', '✅', '⭐'],
        smileys: ['😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '😊', '😇', '', '😍', '🤩', '', '😗', '', '😙', '', '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '', '🤫', '🤔', '', '', '🤨', '😐', '😑', '😶', '🫥', '😏', '😒', '🙄', '😬', '😮‍💨', '🤥', '😌', '😔', '😪', '🤤', '😴', '😷', '🤒', '🤕', '🤢', '', '', '🥶', '🥴', '', '🤯', '🤠', '', '🥸', '', '🤓', '🧐'],
        gestures: ['👋', '', '️', '', '🖖', '', '🫲', '🫳', '', '👌', '🤌', '', '️', '', '🫰', '🤟', '', '🤙', '👈', '', '', '', '👇', '☝️', '🫵', '👍', '👎', '✊', '👊', '🤛', '🤜', '👏', '', '🫶', '👐', '🤲', '', '🙏', '💅', '🤳', '💪'],
        hearts: ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '', '', '❤️', '❤️‍🩹', '️', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '💟'],
        objects: ['🎁', '', '🥇', '️', '📝', '📋', '', '', '✉️', '📧', '', '', '🖥️', '⏰', '📅', '🗓️', '🔔', '', '📣', '🔊', '', '🔋', '🔧', '⚙️', '🛡️', '⚖️', '🔑', '🏠', '🏢', '🏛️', '🎯', '🚀', '✨', '💫', '🌟', '⭐', '🎊', '🎉', '', '🎀']
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

    fillEmojiGrid('emojiFrequent', emojiData.frequent);
    fillEmojiGrid('emojiSmileys', emojiData.smileys);
    fillEmojiGrid('emojiGestures', emojiData.gestures);
    fillEmojiGrid('emojiHearts', emojiData.hearts);
    fillEmojiGrid('emojiObjects', emojiData.objects);

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
            
            if (!textarea) return;
            
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
            filterEmojis('');
        });
    });

    // Поиск эмодзи
    if (emojiSearch) {
        emojiSearch.addEventListener('input', (e) => {
            filterEmojis(e.target.value);
        });
    }

    function filterEmojis(query) {
        const allItems = emojiPopup.querySelectorAll('.emoji-item');
        allItems.forEach(item => {
            item.style.display = 'block';
        });
    }

    // Закрытие popup при клике вне его
    document.addEventListener('click', (e) => {
        if (!emojiPopup.contains(e.target) && !e.target.classList.contains('emoji-btn')) {
            emojiPopup.classList.remove('active');
            currentEmojiTarget = null;
        }
    });

    // Закрытие по Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
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
</script>
</body>
</html>
