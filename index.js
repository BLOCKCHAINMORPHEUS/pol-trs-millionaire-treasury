const express = require('express');
const app = express();

app.use(express.json());

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Limitless DeFi is running!' });
});

// Wealth calculation API
app.post('/api/calculate', (req, res) => {
    try {
        const { amount, targetWealth, weeklyRate } = req.body;
        
        const principal = parseFloat(amount) || 10000;
        const target = parseFloat(targetWealth) || 1000000;
        const rate = parseFloat(weeklyRate) || 19.18;
        
        const weeklyMultiplier = 1 + (rate / 100);
        
        let weeks = 0;
        let current = principal;
        const timeline = {};
        
        while (current < target && weeks < 520) {
            weeks++;
            current *= weeklyMultiplier;
            
            if (weeks === 4) timeline.month1 = current;
            if (weeks === 12) timeline.month3 = current;
            if (weeks === 26) timeline.month6 = current;
            if (weeks === 52) timeline.year1 = current;
            if (weeks === 104) timeline.year2 = current;
            if (weeks === 156) timeline.year3 = current;
        }
        
        const result = {
            canReachTarget: current >= target,
            weeks: weeks,
            months: Math.round(weeks / 4.33),
            years: Math.round(weeks / 52 * 10) / 10,
            finalAmount: current,
            totalGrowth: ((current - principal) / principal * 100),
            timeline: timeline,
            weeklyRate: rate,
            compoundPower: Math.pow(weeklyMultiplier, weeks)
        };
        
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Calculation failed', message: error.message });
    }
});

// Main page
app.get('/', (req, res) => {
    res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>💎 Limitless DeFi - Wealth Calculator</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: linear-gradient(135deg, #000428 0%, #004e92 100%);
            color: white;
            min-height: 100vh;
        }
        .hero {
            background: linear-gradient(135deg, #ff0080 0%, #ff8c00 50%, #ffd700 100%);
            padding: 80px 20px;
            text-align: center;
            position: relative;
            overflow: hidden;
        }
        .hero h1 {
            font-size: 56px;
            font-weight: 900;
            color: #000;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
            margin-bottom: 20px;
        }
        .hero-subtitle {
            font-size: 28px;
            color: #000;
            font-weight: 700;
            margin-bottom: 30px;
        }
        .hero-description {
            font-size: 18px;
            color: rgba(0,0,0,0.8);
            max-width: 600px;
            margin: 0 auto;
        }
        .container {
            max-width: 1000px;
            margin: 0 auto;
            padding: 60px 20px;
        }
        .calculator-section {
            background: rgba(255,255,255,0.1);
            backdrop-filter: blur(20px);
            border-radius: 32px;
            padding: 60px;
            margin: 40px 0;
            border: 2px solid rgba(255,215,0,0.3);
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }
        .section-title {
            font-size: 42px;
            font-weight: 800;
            text-align: center;
            color: #ffd700;
            margin-bottom: 50px;
        }
        .input-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 40px;
            margin-bottom: 50px;
        }
        .input-group {
            text-align: center;
        }
        .input-label {
            font-size: 18px;
            font-weight: 700;
            color: #ffd700;
            margin-bottom: 15px;
            display: block;
        }
        .wealth-input {
            width: 100%;
            height: 80px;
            background: rgba(0,0,0,0.4);
            border: 3px solid #ffd700;
            border-radius: 20px;
            padding: 0 25px;
            font-size: 28px;
            color: white;
            text-align: center;
            outline: none;
            font-weight: 700;
        }
        .wealth-input::placeholder {
            color: rgba(255,255,255,0.5);
        }
        .preset-buttons {
            display: flex;
            justify-content: center;
            gap: 15px;
            flex-wrap: wrap;
            margin: 30px 0;
        }
        .preset-btn {
            padding: 15px 25px;
            background: linear-gradient(45deg, #ff0080, #ff8c00);
            border: none;
            border-radius: 25px;
            color: white;
            font-weight: 700;
            cursor: pointer;
            font-size: 14px;
        }
        .calculate-btn {
            width: 100%;
            max-width: 500px;
            height: 80px;
            background: linear-gradient(45deg, #ff0080, #ffd700);
            border: none;
            border-radius: 25px;
            color: #000;
            font-size: 24px;
            font-weight: 800;
            cursor: pointer;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin: 40px auto;
            display: block;
        }
        .results-section {
            background: rgba(255,215,0,0.1);
            border: 3px solid #ffd700;
            border-radius: 32px;
            padding: 50px;
            margin-top: 40px;
            display: none;
        }
        .wealth-timeline {
            font-size: 64px;
            font-weight: 900;
            color: #ffd700;
            text-align: center;
            margin-bottom: 20px;
        }
        .timeline-subtitle {
            font-size: 24px;
            color: #4CAF50;
            text-align: center;
            margin-bottom: 40px;
            font-weight: 600;
        }
        @media (max-width: 768px) {
            .hero h1 { font-size: 42px; }
            .calculator-section { padding: 40px 30px; }
            .input-grid { grid-template-columns: 1fr; }
            .wealth-input { height: 70px; font-size: 24px; }
        }
    </style>
</head>
<body>
    <div class="hero">
        <h1>💎 LIMITLESS DEFI</h1>
        <div class="hero-subtitle">Wealth Calculator</div>
        <div class="hero-description">
            Calculate exactly when you'll reach your wealth goals with compound growth
        </div>
    </div>
    
    <div class="container">
        <div class="calculator-section">
            <div class="section-title">⚡ WHEN WILL YOU BE WEALTHY?</div>
            
            <div class="input-grid">
                <div class="input-group">
                    <label class="input-label">Starting Amount ($)</label>
                    <input type="number" id="startAmount" class="wealth-input" placeholder="10,000" value="10000" min="1">
                </div>
                
                <div class="input-group">
                    <label class="input-label">Target Wealth ($)</label>
                    <input type="number" id="targetWealth" class="wealth-input" placeholder="1,000,000" value="1000000" min="1">
                </div>
                
                <div class="input-group">
                    <label class="input-label">Weekly Growth Rate (%)</label>
                    <input type="number" id="weeklyRate" class="wealth-input" placeholder="19.18" value="19.18" min="0.1" max="100" step="0.01">
                </div>
            </div>
            
            <div class="preset-buttons">
                <button class="preset-btn" onclick="setPreset(1000, 100000)">$1K → $100K</button>
                <button class="preset-btn" onclick="setPreset(5000, 500000)">$5K → $500K</button>
                <button class="preset-btn" onclick="setPreset(10000, 1000000)">$10K → $1M</button>
                <button class="preset-btn" onclick="setPreset(25000, 5000000)">$25K → $5M</button>
            </div>
            
            <button class="calculate-btn" onclick="calculateWealth()">
                🚀 CALCULATE MY WEALTH TIMELINE
            </button>
            
            <div class="results-section" id="resultsSection">
                <div class="wealth-timeline" id="wealthTimeline">26 MONTHS</div>
                <div class="timeline-subtitle" id="timelineSubtitle">You'll reach your wealth goal!</div>
            </div>
        </div>
    </div>
    
    <script>
        function setPreset(start, target) {
            document.getElementById('startAmount').value = start;
            document.getElementById('targetWealth').value = target;
            calculateWealth();
        }
        
        async function calculateWealth() {
            const startAmount = document.getElementById('startAmount').value;
            const targetWealth = document.getElementById('targetWealth').value;
            const weeklyRate = document.getElementById('weeklyRate').value;
            
            if (!startAmount || !targetWealth || !weeklyRate) {
                alert('Please fill in all fields');
                return;
            }
            
            try {
                const response = await fetch('/api/calculate', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        amount: startAmount,
                        targetWealth: targetWealth,
                        weeklyRate: weeklyRate
                    })
                });
                
                const data = await response.json();
                displayResults(data, targetWealth);
            } catch (error) {
                console.error('Calculation failed:', error);
                alert('Calculation failed. Please try again.');
            }
        }
        
        function displayResults(data, targetWealth) {
            const resultsSection = document.getElementById('resultsSection');
            const timelineElement = document.getElementById('wealthTimeline');
            const subtitleElement = document.getElementById('timelineSubtitle');
            
            if (data.canReachTarget) {
                if (data.years >= 1) {
                    timelineElement.textContent = data.years + ' YEARS';
                } else {
                    timelineElement.textContent = data.months + ' MONTHS';
                }
                
                subtitleElement.textContent = \`You'll reach $\${formatNumber(targetWealth)} in \${data.years >= 1 ? data.years + ' years' : data.months + ' months'}!\`;
            } else {
                timelineElement.textContent = 'ADJUST INPUTS';
                subtitleElement.textContent = 'Try a higher growth rate or longer timeframe';
            }
            
            resultsSection.style.display = 'block';
            resultsSection.scrollIntoView({ behavior: 'smooth' });
        }
        
        function formatNumber(num) {
            if (num >= 1000000000) {
                return (num / 1000000000).toFixed(1) + 'B';
            } else if (num >= 1000000) {
                return (num / 1000000).toFixed(1) + 'M';
            } else if (num >= 1000) {
                return (num / 1000).toFixed(0) + 'K';
            }
            return Math.round(num).toLocaleString();
        }
        
        // Auto-calculate on page load
        document.addEventListener('DOMContentLoaded', function() {
            calculateWealth();
        });
    </script>
</body>
</html>`);
});

// Export for Vercel
module.exports = app;
