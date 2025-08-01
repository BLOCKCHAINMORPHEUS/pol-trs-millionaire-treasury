🚀 ABSOLUTELY! LET'S BUILD THE FULL DAPP!
const express = require('express');
const app = express();

app.use(express.json());

// API endpoints
app.post('/api/calculate', (req, res) => {
    try {
        const { amount, days } = req.body;
        const principal = parseFloat(amount) || 10;
        const daysToCalculate = parseInt(days) || 365;
        
        // 1000% APY = 2.74% daily rate
        const dailyRate = 0.0274;
        const finalAmount = principal * Math.pow((1 + dailyRate), daysToCalculate);
        
        res.json({
            principal: principal,
            days: daysToCalculate,
            finalAmount: finalAmount,
            multiplier: finalAmount / principal
        });
    } catch (error) {
        res.status(500).json({ error: 'Calculation failed', message: error.message });
    }
});

// Main DApp page
app.get('/', (req, res) => {
    res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Limitless Protocol | Emerald & Gold</title>
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Poppins:wght@400;500;600&display=swap" rel="stylesheet">
    
    <!-- Phosphor Icons -->
    <script src="https://unpkg.com/@phosphor-icons/web"></script>
    
    <!-- Tone.js for Audio -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/tone/14.7.77/Tone.js"></script>
    
    <!-- Embedded Stylesheet -->
    <style>
        /* "Emerald & Gold" Color Palette */
        :root {
            --bg-start: #101418; /* Very dark blue/charcoal */
            --bg-end: #0B0C0E;   /* Almost black */
            --card-bg: rgba(22, 27, 34, 0.7);
            --text-primary: #E0E0E0; /* Soft white */
            --text-secondary: #888F99; /* Cool gray */
            --accent-gold: #C0A062; /* Desaturated, elegant gold */
            --accent-emerald: #00C2A8; /* Vibrant, glowing emerald/teal */
            --gold-glow: rgba(192, 160, 98, 0.2);
            --emerald-glow: rgba(0, 194, 168, 0.25);
            --font-heading: 'Cormorant Garamond', serif;
            --font-body: 'Poppins', sans-serif;
        }

        *, *::before, *::after { box-sizing: border-box; }

        body {
            font-family: var(--font-body);
            background: linear-gradient(-45deg, var(--bg-start), var(--bg-end));
            background-size: 200% 200%;
            animation: gradient-flow 30s ease infinite;
            color: var(--text-primary);
            margin: 0;
            overflow: hidden;
            position: relative;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }

        @keyframes gradient-flow {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }

        .affirmation-background { position: fixed; inset: 0; overflow: hidden; pointer-events: none; z-index: 0; }
        
        .affirmation {
            position: absolute;
            font-family: var(--font-heading);
            font-size: 3.5vw;
            font-weight: 700;
            color: rgba(255, 255, 255, 0.8);
            text-shadow:
                0 0 10px var(--gold-glow),
                0 0 25px var(--gold-glow);
            animation: fadeInOut 18s linear infinite;
        }
        @keyframes fadeInOut {
            0%, 100% { opacity: 0; transform: scale(0.95) translateY(10px); }
            50% { opacity: 0.9; transform: scale(1) translateY(0px); }
        }

        #app-container {
            display: flex;
            flex-direction: column;
            height: 100vh;
        }

        .app-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 2rem;
            background: rgba(11, 12, 14, 0.5);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border-bottom: 1px solid rgba(192, 160, 98, 0.2);
            position: relative;
            z-index: 100;
        }

        .header-logo {
            display: flex;
            align-items: center;
            gap: 1rem;
        }
        .header-logo img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }
        .header-logo h1 {
            font-family: var(--font-heading);
            font-size: 1.8rem;
            margin: 0;
            font-weight: 700;
            color: var(--accent-gold);
            text-shadow: 0 0 10px var(--gold-glow);
        }

        .app-nav ul {
            list-style: none;
            padding: 0;
            margin: 0;
            display: flex;
            gap: 1rem;
        }
        .app-nav li a {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.5rem 1rem;
            color: var(--text-secondary);
            text-decoration: none;
            font-weight: 600;
            border-radius: 8px;
            transition: all 0.3s ease;
            cursor: pointer;
            position: relative;
        }
        .app-nav li.active a, .app-nav li a:hover {
            color: var(--text-primary);
        }
        .app-nav li.active a::after {
            content: '';
            position: absolute;
            bottom: -5px;
            left: 50%;
            transform: translateX(-50%);
            width: 20px;
            height: 2px;
            background: var(--accent-gold);
            border-radius: 2px;
            box-shadow: 0 0 5px var(--gold-glow);
        }
        .app-nav li a i {
            font-size: 1.3rem;
            transition: color 0.3s ease;
        }
        .app-nav li.active a i, .app-nav li a:hover i {
             color: var(--accent-gold);
        }

        .header-controls {
            display: flex;
            align-items: center;
            gap: 1rem;
        }
        .sound-btn { background: none; border: none; color: var(--text-secondary); font-size: 1.5rem; cursor: pointer; padding: 0; transition: color 0.3s ease;}
        .sound-btn:hover { color: var(--accent-gold); }
        
        .connect-wallet-btn {
            background: var(--accent-gold);
            color: #1c1c1c; border: none; padding: 0.8rem 1.5rem; border-radius: 8px; font-weight: 600; font-size: 1rem; cursor: pointer; transition: all 0.3s ease;
            box-shadow: 0 4px 15px var(--gold-glow);
        }
        .connect-wallet-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 20px var(--gold-glow); }
        .connect-wallet-btn.connected { background: transparent; color: var(--accent-gold); border: 1px solid var(--accent-gold); }

        .main-content {
            flex-grow: 1;
            padding: 2rem;
            display: flex;
            justify-content: center;
            align-items: flex-start;
            overflow-y: auto;
            position: relative;
            z-index: 5;
        }
        
        .content-card {
            width: 100%;
            max-width: 900px;
            background: var(--card-bg);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border-radius: 16px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(192, 160, 98, 0.15);
            overflow: hidden;
        }
        
        .card-metrics { display: grid; grid-template-columns: 1fr 1fr 1fr; text-align: center; padding: 1.5rem; border-bottom: 1px solid rgba(192, 160, 98, 0.2); }
        .metric p { margin: 0; font-size: 0.9rem; color: var(--text-secondary); }
        .metric .value { font-size: 1.5rem; font-weight: 600; color: var(--text-primary); margin-top: 0.25rem; }
        .metric .value.apy { color: var(--accent-gold); }
        
        .card-body { padding: 2rem; }
        .tab-navigation { display: flex; border-radius: 8px; background-color: rgba(0,0,0,0.2); padding: 0.25rem; margin-bottom: 1.5rem; }
        .tab-btn { flex: 1; padding: 0.75rem; border: none; background: transparent; color: var(--text-secondary); font-size: 1rem; font-weight: 600; cursor: pointer; border-radius: 6px; transition: all 0.3s ease; }
        .tab-btn.active { color: #1c1c1c; background: var(--accent-gold); }
        
        .input-group { margin-bottom: 1rem; }
        .input-field { width: 100%; padding: 1rem; border-radius: 8px; border: 1px solid rgba(192, 160, 98, 0.3); background-color: rgba(0, 0, 0, 0.2); font-size: 1.5rem; color: var(--text-primary); font-weight: 600;}
        .input-field:focus { border-color: var(--accent-gold); outline: none; box-shadow: 0 0 10px var(--gold-glow); }

        .info-grid { display: grid; grid-template-columns: 1fr auto; gap: 0.5rem; margin-bottom: 1rem; color: var(--text-secondary);}
        .info-grid .value { color: var(--text-primary); font-weight: 500; text-align: right; }
        .submit-btn {
            width: 100%; padding: 1rem; margin-top: 1.5rem; background: var(--accent-gold);
            color: #1c1c1c; border: none; border-radius: 8px; font-size: 1.1rem;
            font-weight: 600; cursor: pointer; transition: all 0.3s ease;
            box-shadow: 0 4px 15px var(--gold-glow);
        }
        .submit-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 6px 20px var(--gold-glow); }
        .submit-btn:disabled { background: #555; color: #999; cursor: not-allowed; box-shadow: none; }
        
        .dashboard-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; padding: 1.5rem; }
        .dashboard-card { padding: 1.5rem; background: rgba(0,0,0,0.2); border-radius: 12px; box-shadow: 0 5px 20px rgba(0,0,0,0.3); }
        .dashboard-card h3, .docs-content h3 {
            font-family: var(--font-heading); font-size: 1.5rem; margin: 0 0 1rem 0;
            color: var(--accent-gold);
        }
        
        .docs-content { padding: 2rem; }
        .docs-content h2 { font-family: var(--font-heading); font-size: 2rem; border-bottom: 1px solid rgba(192, 160, 98, 0.2); padding-bottom: 0.5rem; margin-bottom: 1rem; color: var(--accent-gold);}
        .docs-content p, .docs-content li { line-height: 1.6; color: var(--text-primary); }
        
        .vault-list { max-height: 200px; overflow-y: auto; padding-right: 0.5rem; }
        .vault-item { display: flex; justify-content: space-between; align-items: center; background-color: rgba(0,0,0,0.2); padding: 0.75rem 1rem; border-radius: 8px; margin-bottom: 0.5rem; }
        .claim-btn { background: var(--accent-emerald); color: white; border: none; padding: 0.5rem 1rem; border-radius: 6px; cursor: pointer; transition: background-color 0.3s ease; }
        .claim-btn:hover { background: #00e0c0; }
        
        .calculator-slider { -webkit-appearance: none; width: 100%; height: 8px; background: rgba(0,0,0,0.2); border-radius: 5px; outline: none; transition: opacity .2s; }
        .calculator-slider::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 20px; height: 20px; background: var(--accent-gold); border-radius: 50%; cursor: pointer; }
        .calculator-result { margin-top: 1rem; display: flex; justify-content: space-between; font-size: 1.2rem; font-weight: 600; align-items: center;}
        .calculator-result .value {font-size: 1.5rem; color: var(--accent-gold);}

        .hidden { display: none !important; }
        .notification-container { position:fixed; top: 2rem; right: 2rem; z-index:1000; }
        .notification { background: #222; color: var(--text-primary); border-left: 4px solid var(--accent-gold); padding: 1rem; margin-bottom: 1rem; border-radius: 8px; box-shadow: 0 5px 15px rgba(0,0,0,0.2); opacity: 0; transform: translateX(100%); transition: all 0.5s ease; }
        .notification.show { opacity: 1; transform: translateX(0); }
        .notification.success { border-left-color: var(--accent-emerald); }
        .tab-content {display: none;}
        .tab-content.active {display: block;}

        .bond-selection-btns { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1rem; }
        .bond-select-btn { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 1.5rem 1rem; border-radius: 8px; border: 1px solid rgba(192, 160, 98, 0.2); background: rgba(0, 0, 0, 0.2); cursor: pointer; transition: all 0.3s ease; font-size: 1.1rem; font-weight: 600; color: var(--text-primary); }
        .bond-select-btn:hover { background: rgba(192, 160, 98, 0.1); border-color: var(--accent-gold); }
        .bond-select-btn img { width: 40px; height: 40px; margin-bottom: 0.75rem; }
        .bond-back-btn { background: none; border: none; color: var(--text-secondary); font-weight: 600; cursor: pointer; padding: 0; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.25rem; }
        .bond-back-btn:hover { color: var(--accent-gold); }
        .bond-back-btn i { font-size: 1rem; }

        /* MOBILE OPTIMIZATION */
        @media (max-width: 768px) {
            body { overflow: auto; }
            .app-header { flex-direction: column; gap: 1rem; padding: 1rem; }
            .app-nav ul { gap: 0.5rem; width: 100%; justify-content: center; }
            .app-nav li a { flex-direction: column; padding: 0.5rem; gap: 0.25rem; }
            .app-nav li a span { font-size: 0.7rem; }
            .header-controls { width: 100%; justify-content: space-between; }
            .main-content { padding: 1rem; }
            .card-metrics { grid-template-columns: 1fr; gap: 1rem; text-align: left; }
            .metric { padding: 0.5rem; background: rgba(0,0,0,0.2); border-radius: 8px; }
            .dashboard-grid { grid-template-columns: 1fr; }
            .affirmation { font-size: 6vw; }
            .notification-container { top: 1rem; right: 1rem; left: 1rem; width: auto; }
        }
    </style>
</head>
<body>
    <div class="affirmation-background" id="affirmation-container"></div>
    <div id="notification-container" class="notification-container"></div>

    <div id="app-container">
        <header class="app-header">
            <div class="header-logo">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAF8WlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDggNzkuMTY0MDM2LCAyMDE5LzA4LzEzLTAxOjA2OjU3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjMtMDgtMDFUMTI6MDA6MDAtMDc6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIzLTA4LTAxVDEyOjAyOjE1LTA3OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIzLTA4LTAxVDEyOjAyOjE1LTA3OjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjA1ZDc4NmJlLTBi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

**I'LL TRANSFORM IT INTO THE COMPLETE LIMITLESS DEFI PLATFORM!** 💎⚡


⸻


🔥 **COMPLETE LIMITLESS DEFI DAPP WITH DASHBOARD, STAKING & BONDING:**

**Replace your entire `index.js` with this comprehensive DApp:**


const express = require('express');
const app = express();

app.use(express.json());

// API endpoints
app.post('/api/calculate', (req, res) => {
    try {
        const { amount, days } = req.body;
        const principal = parseFloat(amount) || 10;
        const daysToCalculate = parseInt(days) || 365;
        
        // 1000% APY = 2.74% daily rate
        const dailyRate = 0.0274;
        const finalAmount = principal * Math.pow((1 + dailyRate), daysToCalculate);
        
        res.json({
            principal: principal,
            days: daysToCalculate,
            finalAmount: finalAmount,
            multiplier: finalAmount / principal
        });
    } catch (error) {
        res.status(500).json({ error: 'Calculation failed', message: error.message });
    }
});

// Main DApp page
app.get('/', (req, res) => {
    res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Limitless Protocol | Emerald & Gold</title>
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Poppins:wght@400;500;600&display=swap" rel="stylesheet">
    
    <!-- Phosphor Icons -->
    <script src="https://unpkg.com/@phosphor-icons/web"></script>
    
    <!-- Tone.js for Audio -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/tone/14.7.77/Tone.js"></script>
    
    <!-- Embedded Stylesheet -->
    <style>
        /* "Emerald & Gold" Color Palette */
        :root {
            --bg-start: #101418; /* Very dark blue/charcoal */
            --bg-end: #0B0C0E;   /* Almost black */
            --card-bg: rgba(22, 27, 34, 0.7);
            --text-primary: #E0E0E0; /* Soft white */
            --text-secondary: #888F99; /* Cool gray */
            --accent-gold: #C0A062; /* Desaturated, elegant gold */
            --accent-emerald: #00C2A8; /* Vibrant, glowing emerald/teal */
            --gold-glow: rgba(192, 160, 98, 0.2);
            --emerald-glow: rgba(0, 194, 168, 0.25);
            --font-heading: 'Cormorant Garamond', serif;
            --font-body: 'Poppins', sans-serif;
        }

        *, *::before, *::after { box-sizing: border-box; }

        body {
            font-family: var(--font-body);
            background: linear-gradient(-45deg, var(--bg-start), var(--bg-end));
            background-size: 200% 200%;
            animation: gradient-flow 30s ease infinite;
            color: var(--text-primary);
            margin: 0;
            overflow: hidden;
            position: relative;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }

        @keyframes gradient-flow {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }

        .affirmation-background { position: fixed; inset: 0; overflow: hidden; pointer-events: none; z-index: 0; }
        
        .affirmation {
            position: absolute;
            font-family: var(--font-heading);
            font-size: 3.5vw;
            font-weight: 700;
            color: rgba(255, 255, 255, 0.8);
            text-shadow:
                0 0 10px var(--gold-glow),
                0 0 25px var(--gold-glow);
            animation: fadeInOut 18s linear infinite;
        }
        @keyframes fadeInOut {
            0%, 100% { opacity: 0; transform: scale(0.95) translateY(10px); }
            50% { opacity: 0.9; transform: scale(1) translateY(0px); }
        }

        #app-container {
            display: flex;
            flex-direction: column;
            height: 100vh;
        }

        .app-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 2rem;
            background: rgba(11, 12, 14, 0.5);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border-bottom: 1px solid rgba(192, 160, 98, 0.2);
            position: relative;
            z-index: 100;
        }

        .header-logo {
            display: flex;
            align-items: center;
            gap: 1rem;
        }
        .header-logo img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }
        .header-logo h1 {
            font-family: var(--font-heading);
            font-size: 1.8rem;
            margin: 0;
            font-weight: 700;
            color: var(--accent-gold);
            text-shadow: 0 0 10px var(--gold-glow);
        }

        .app-nav ul {
            list-style: none;
            padding: 0;
            margin: 0;
            display: flex;
            gap: 1rem;
        }
        .app-nav li a {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.5rem 1rem;
            color: var(--text-secondary);
            text-decoration: none;
            font-weight: 600;
            border-radius: 8px;
            transition: all 0.3s ease;
            cursor: pointer;
            position: relative;
        }
        .app-nav li.active a, .app-nav li a:hover {
            color: var(--text-primary);
        }
        .app-nav li.active a::after {
            content: '';
            position: absolute;
            bottom: -5px;
            left: 50%;
            transform: translateX(-50%);
            width: 20px;
            height: 2px;
            background: var(--accent-gold);
            border-radius: 2px;
            box-shadow: 0 0 5px var(--gold-glow);
        }
        .app-nav li a i {
            font-size: 1.3rem;
            transition: color 0.3s ease;
        }
        .app-nav li.active a i, .app-nav li a:hover i {
             color: var(--accent-gold);
        }

        .header-controls {
            display: flex;
            align-items: center;
            gap: 1rem;
        }
        .sound-btn { background: none; border: none; color: var(--text-secondary); font-size: 1.5rem; cursor: pointer; padding: 0; transition: color 0.3s ease;}
        .sound-btn:hover { color: var(--accent-gold); }
        
        .connect-wallet-btn {
            background: var(--accent-gold);
            color: #1c1c1c; border: none; padding: 0.8rem 1.5rem; border-radius: 8px; font-weight: 600; font-size: 1rem; cursor: pointer; transition: all 0.3s ease;
            box-shadow: 0 4px 15px var(--gold-glow);
        }
        .connect-wallet-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 20px var(--gold-glow); }
        .connect-wallet-btn.connected { background: transparent; color: var(--accent-gold); border: 1px solid var(--accent-gold); }

        .main-content {
            flex-grow: 1;
            padding: 2rem;
            display: flex;
            justify-content: center;
            align-items: flex-start;
            overflow-y: auto;
            position: relative;
            z-index: 5;
        }
        
        .content-card {
            width: 100%;
            max-width: 900px;
            background: var(--card-bg);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border-radius: 16px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(192, 160, 98, 0.15);
            overflow: hidden;
        }
        
        .card-metrics { display: grid; grid-template-columns: 1fr 1fr 1fr; text-align: center; padding: 1.5rem; border-bottom: 1px solid rgba(192, 160, 98, 0.2); }
        .metric p { margin: 0; font-size: 0.9rem; color: var(--text-secondary); }
        .metric .value { font-size: 1.5rem; font-weight: 600; color: var(--text-primary); margin-top: 0.25rem; }
        .metric .value.apy { color: var(--accent-gold); }
        
        .card-body { padding: 2rem; }
        .tab-navigation { display: flex; border-radius: 8px; background-color: rgba(0,0,0,0.2); padding: 0.25rem; margin-bottom: 1.5rem; }
        .tab-btn { flex: 1; padding: 0.75rem; border: none; background: transparent; color: var(--text-secondary); font-size: 1rem; font-weight: 600; cursor: pointer; border-radius: 6px; transition: all 0.3s ease; }
        .tab-btn.active { color: #1c1c1c; background: var(--accent-gold); }
        
        .input-group { margin-bottom: 1rem; }
        .input-field { width: 100%; padding: 1rem; border-radius: 8px; border: 1px solid rgba(192, 160, 98, 0.3); background-color: rgba(0, 0, 0, 0.2); font-size: 1.5rem; color: var(--text-primary); font-weight: 600;}
        .input-field:focus { border-color: var(--accent-gold); outline: none; box-shadow: 0 0 10px var(--gold-glow); }

        .info-grid { display: grid; grid-template-columns: 1fr auto; gap: 0.5rem; margin-bottom: 1rem; color: var(--text-secondary);}
        .info-grid .value { color: var(--text-primary); font-weight: 500; text-align: right; }
        .submit-btn {
            width: 100%; padding: 1rem; margin-top: 1.5rem; background: var(--accent-gold);
            color: #1c1c1c; border: none; border-radius: 8px; font-size: 1.1rem;
            font-weight: 600; cursor: pointer; transition: all 0.3s ease;
            box-shadow: 0 4px 15px var(--gold-glow);
        }
        .submit-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 6px 20px var(--gold-glow); }
        .submit-btn:disabled { background: #555; color: #999; cursor: not-allowed; box-shadow: none; }
        
        .dashboard-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; padding: 1.5rem; }
        .dashboard-card { padding: 1.5rem; background: rgba(0,0,0,0.2); border-radius: 12px; box-shadow: 0 5px 20px rgba(0,0,0,0.3); }
        .dashboard-card h3, .docs-content h3 {
            font-family: var(--font-heading); font-size: 1.5rem; margin: 0 0 1rem 0;
            color: var(--accent-gold);
        }
        
        .docs-content { padding: 2rem; }
        .docs-content h2 { font-family: var(--font-heading); font-size: 2rem; border-bottom: 1px solid rgba(192, 160, 98, 0.2); padding-bottom: 0.5rem; margin-bottom: 1rem; color: var(--accent-gold);}
        .docs-content p, .docs-content li { line-height: 1.6; color: var(--text-primary); }
        
        .vault-list { max-height: 200px; overflow-y: auto; padding-right: 0.5rem; }
        .vault-item { display: flex; justify-content: space-between; align-items: center; background-color: rgba(0,0,0,0.2); padding: 0.75rem 1rem; border-radius: 8px; margin-bottom: 0.5rem; }
        .claim-btn { background: var(--accent-emerald); color: white; border: none; padding: 0.5rem 1rem; border-radius: 6px; cursor: pointer; transition: background-color 0.3s ease; }
        .claim-btn:hover { background: #00e0c0; }
        
        .calculator-slider { -webkit-appearance: none; width: 100%; height: 8px; background: rgba(0,0,0,0.2); border-radius: 5px; outline: none; transition: opacity .2s; }
        .calculator-slider::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 20px; height: 20px; background: var(--accent-gold); border-radius: 50%; cursor: pointer; }
        .calculator-result { margin-top: 1rem; display: flex; justify-content: space-between; font-size: 1.2rem; font-weight: 600; align-items: center;}
        .calculator-result .value {font-size: 1.5rem; color: var(--accent-gold);}

        .hidden { display: none !important; }
        .notification-container { position:fixed; top: 2rem; right: 2rem; z-index:1000; }
        .notification { background: #222; color: var(--text-primary); border-left: 4px solid var(--accent-gold); padding: 1rem; margin-bottom: 1rem; border-radius: 8px; box-shadow: 0 5px 15px rgba(0,0,0,0.2); opacity: 0; transform: translateX(100%); transition: all 0.5s ease; }
        .notification.show { opacity: 1; transform: translateX(0); }
        .notification.success { border-left-color: var(--accent-emerald); }
        .tab-content {display: none;}
        .tab-content.active {display: block;}

        .bond-selection-btns { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1rem; }
        .bond-select-btn { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 1.5rem 1rem; border-radius: 8px; border: 1px solid rgba(192, 160, 98, 0.2); background: rgba(0, 0, 0, 0.2); cursor: pointer; transition: all 0.3s ease; font-size: 1.1rem; font-weight: 600; color: var(--text-primary); }
        .bond-select-btn:hover { background: rgba(192, 160, 98, 0.1); border-color: var(--accent-gold); }
        .bond-select-btn img { width: 40px; height: 40px; margin-bottom: 0.75rem; }
        .bond-back-btn { background: none; border: none; color: var(--text-secondary); font-weight: 600; cursor: pointer; padding: 0; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.25rem; }
        .bond-back-btn:hover { color: var(--accent-gold); }
        .bond-back-btn i { font-size: 1rem; }

        /* MOBILE OPTIMIZATION */
        @media (max-width: 768px) {
            body { overflow: auto; }
            .app-header { flex-direction: column; gap: 1rem; padding: 1rem; }
            .app-nav ul { gap: 0.5rem; width: 100%; justify-content: center; }
            .app-nav li a { flex-direction: column; padding: 0.5rem; gap: 0.25rem; }
            .app-nav li a span { font-size: 0.7rem; }
            .header-controls { width: 100%; justify-content: space-between; }
            .main-content { padding: 1rem; }
            .card-metrics { grid-template-columns: 1fr; gap: 1rem; text-align: left; }
            .metric { padding: 0.5rem; background: rgba(0,0,0,0.2); border-radius: 8px; }
            .dashboard-grid { grid-template-columns: 1fr; }
            .affirmation { font-size: 6vw; }
            .notification-container { top: 1rem; right: 1rem; left: 1rem; width: auto; }
        }
    </style>
</head>
<body>
    <div class="affirmation-background" id="affirmation-container"></div>
    <div id="notification-container" class="notification-container"></div>

    <div id="app-container">
        <header class="app-header">
            <div class="header-logo">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAF8WlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDggNzkuMTY0MDM2LCAyMDE5LzA4LzEzLTAxOjA2OjU3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjMtMDgtMDFUMTI6MDA6MDAtMDc6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIzLTA4LTAxVDEyOjAyOjE1LTA3OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIzLTA4LTAxVDEyOjAyOjE1LTA3OjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjA1ZDc4NmJlLTBi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
