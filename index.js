const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// 💎 WEALTH CALCULATION API
app.post('/api/calculate', (req, res) => {
    const { amount, targetWealth, weeklyRate } = req.body;
    
    const principal = parseFloat(amount) || 1000;
    const target = parseFloat(targetWealth) || 1000000;
    const rate = parseFloat(weeklyRate) || 19.18;
    
    const weeklyMultiplier = 1 + (rate / 100);
    
    let weeks = 0;
    let current = principal;
    const timeline = {};
    
    // Calculate week by week until target
    while (current < target && weeks < 520) { // Max 10 years
        weeks++;
        current *= weeklyMultiplier;
        
        // Store key milestones
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
});

// 🎯 PRESET CALCULATIONS API
app.get('/api/presets', (req, res) => {
    const presets = [
        { amount: 1000, target: 100000, label: "First $100K" },
        { amount: 5000, target: 500000, label: "Half Million" },
        { amount: 10000, target: 1000000, label: "Millionaire" },
        { amount: 25000, target: 5000000, label: "Multi-Millionaire" },
        { amount: 50000, target: 10000000, label: "Eight Figures" }
    ];
    
    res.json(presets);
});

// 🚀 MAIN WEALTH CALCULATOR INTERFACE
app.get('/', (req, res) => {
    res.send(`
<!DOCTYPE html>
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
        
        .hero::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
            animation: shine 4s infinite;
        }
        
        @keyframes shine {
            0% { left: -100%; }
            100% { left: 100%; }
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
            transition: all 0.3s ease;
        }
        
        .wealth-input:focus {
            border-color: #ff8c00;
            box-shadow: 0 0 30px rgba(255,215,0,0.4);
            transform: scale(1.02);
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
            transition: all 0.3s ease;
            font-size: 14px;
        }
        
        .preset-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 25px rgba(255,0,128,0.4);
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
            transition: all 0.3s ease;
            margin: 40px auto;
            display: block;
        }
        
        .calculate-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 15px 40px rgba(255,215,0,0.4);
        }
        
        .results-section {
            background: rgba(255,215,0,0.1);
            border: 3px solid #ffd700;
            border-radius: 32px;
            padding: 50px;
            margin-top: 40px;
            display: none;
            animation: resultSlide 0.6s ease;
        }
        
        @keyframes resultSlide {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .wealth-timeline {
            font-size: 64px;
            font-weight: 900;
            color: #ffd700;
            text-align: center;
            margin-bottom: 20px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        
        .timeline-subtitle {
            font-size: 24px;
            color: #4CAF50;
            text-align: center;
            margin-bottom: 40px;
            font-weight: 600;
        }
        
        .milestone-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 25px;
            margin: 40px 0;
        }
        
        .milestone-card {
            background: rgba(255,255,255,0.1);
            padding: 25px;
            border-radius: 20px;
            text-align: center;
            border: 2px solid rgba(255,215,0,0.3);
            transition: all 0.3s ease;
        }
        
        .milestone-card:hover {
            transform: translateY(-5px);
            border-color: #ffd700;
        }
        
        .milestone-period {
            font-size: 14px;
            color: rgba(255,255,255,0.7);
            margin-bottom: 10px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .milestone-amount {
            font-size: 22px;
            font-weight: 800;
            color: #4CAF50;
        }
        
        .growth-stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 30px;
            margin: 40px 0;
        }
        
        .stat-card {
            background: rgba(0,0,0,0.3);
            padding: 30px;
            border-radius: 20px;
            text-align: center;
            border: 2px solid rgba(255,215,0,0.2);
        }
        
        .stat-value {
            font-size: 32px;
            font-weight: 900;
            color: #ffd700;
            margin-bottom: 10px;
        }
        
        .stat-label {
            font-size: 14px;
            color: rgba(255,255,255,0.7);
            text-transform: uppercase;
        }
        
        .share-section {
            text-align: center;
            margin-top: 50px;
            padding-top: 40px;
            border-top: 2px solid rgba(255,215,0,0.3);
        }
        
        .share-btn {
            padding: 20px 40px;
            background: linear-gradient(45deg, #1DA1F2, #1991DA);
            border: none;
            border-radius: 30px;
            color: white;
            font-size: 18px;
            font-weight: 700;
            cursor: pointer;
            margin: 0 10px;
            transition: all 0.3s ease;
        }
        
        .share-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(29,161,242,0.4);
        }
        
        @media (max-width: 768px) {
            .hero h1 { font-size: 42px; }
            .hero-subtitle { font-size: 22px; }
            .calculator-section { padding: 40px 30px; }
            .input-grid { grid-template-columns: 1fr; gap: 30px; }
            .wealth-input { height: 70px; font-size: 24px; }
            .wealth-timeline { font-size: 48px; }
            .milestone-grid { grid-template-columns: repeat(2, 1fr); }
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
                <button class="preset-btn" onclick="setPreset(50000, 10000000)">$50K → $10M</button>
            </div>
            
            <button class="calculate-btn" onclick="calculateWealth()">
                🚀 CALCULATE MY WEALTH TIMELINE
            </button>
            
            <div class="results-section" id="resultsSection">
                <div class="wealth-timeline" id="wealthTimeline">26 MONTHS</div>
                <div class="timeline-subtitle" id="timelineSubtitle">You'll reach your wealth goal in 26 months!</div>
                
                <div class="milestone-grid" id="milestoneGrid">
                    <!-- Populated by JavaScript -->
                </div>
                
                <div class="growth-stats">
                    <div class="stat-card">
                        <div class="stat-value" id="totalGrowth">2,400%</div>
                        <div class="stat-label">Total Growth</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value" id="compoundPower">25x</div>
                        <div class="stat-label">Compound Multiplier</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value" id="weeklyGrowth">19.18%</div>
                        <div class="stat-label">Weekly Growth</div>
                    </div>
                </div>
                
                <div class="share-section">
                    <button class="share-btn" onclick="shareResults()">📱 Share My Results</button>
                    <button class="share-btn" onclick="startJourney()" style="background: linear-gradient(45deg, #ff0080, #ffd700);">
                        🚀 Start My Journey
                    </button>
                </div>
            </div>
        </div>
    </div>
    
    <script>
        // Set preset values
        function setPreset(start, target) {
            document.getElementById('startAmount').value = start;
            document.getElementById('targetWealth').value = target;
            calculateWealth();
        }
        
        // Calculate wealth timeline
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
                displayResults(data, startAmount, targetWealth);
            } catch (error) {
                console.error('Calculation failed:', error);
                alert('Calculation failed. Please try again.');
            }
        }
        
        // Display calculation results
        function displayResults(data, startAmount, targetWealth) {
            const resultsSection = document.getElementById('resultsSection');
            const timelineElement = document.getElementById('wealthTimeline');
            const subtitleElement = document.getElementById('timelineSubtitle');
            const milestoneGrid = document.getElementById('milestoneGrid');
            
            if (data.canReachTarget) {
                // Display timeline
                if (data.years >= 1) {
                    timelineElement.textContent = data.years + ' YEARS';
                } else {
                    timelineElement.textContent = data.months + ' MONTHS';
                }
                
                subtitleElement.textContent = \`You'll reach $\${formatNumber(targetWealth)} in \${data.years >= 1 ? data.years + ' years' : data.months + ' months'}!\`;
                
                // Display milestones
                const milestones = [];
                if (data.timeline.month1) milestones.push({ period: '1 Month', amount: data.timeline.month1 });
                if (data.timeline.month3) milestones.push({ period: '3 Months', amount: data.timeline.month3 });
                if (data.timeline.month6) milestones.push({ period: '6 Months', amount: data.timeline.month6 });
                if (data.timeline.year1) milestones.push({ period: '1 Year', amount: data.timeline.year1 });
                if (data.timeline.year2) milestones.push({ period: '2 Years', amount: data.timeline.year2 });
                if (data.timeline.year3) milestones.push({ period: '3 Years', amount: data.timeline.year3 });
                
                milestoneGrid.innerHTML = milestones.map(milestone => \`
                    <div class="milestone-card">
                        <div class="milestone-period">\${milestone.period}</div>
                        <div class="milestone-amount">$\${formatNumber(milestone.amount)}</div>
                    </div>
                \`).join('');
                
                // Update stats
                document.getElementById('totalGrowth').textContent = formatNumber(data.totalGrowth) + '%';
                document.getElementById('compoundPower').textContent = data.compoundPower.toFixed(1) + 'x';
                document.getElementById('weeklyGrowth').textContent = data.weeklyRate + '%';
                
            } else {
                timelineElement.textContent = 'ADJUST INPUTS';
                subtitleElement.textContent = 'Try a higher growth rate or longer timeframe';
                milestoneGrid.innerHTML = '<div class="milestone-card"><div class="milestone-period">Tip</div><div class="milestone-amount">Increase growth rate</div></div>';
            }
            
            resultsSection.style.display = 'block';
            resultsSection.scrollIntoView({ behavior: 'smooth' });
        }
        
        // Share results
        function shareResults() {
            const timeline = document.getElementById('wealthTimeline').textContent;
            const text = \`🚀 I'll reach my wealth goal in \${timeline} with Limitless DeFi! Calculate yours: \${window.location.href}\`;
            
            if (navigator.share) {
                navigator.share({
                    title: 'My Wealth Timeline - Limitless DeFi',
                    text: text,
                    url: window.location.href
                });
            } else {
                navigator.clipboard.writeText(text);
                alert('Results copied to clipboard!');
            }
        }
        
        // Start journey
        function startJourney() {
            const startAmount = document.getElementById('startAmount').value;
            alert(\`🚀 Ready to start your wealth journey with $\${formatNumber(startAmount)}! Connect your wallet to begin!\`);
        }
        
        // Format numbers
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
        
        // Auto-calculate on input change
        document.addEventListener('DOMContentLoaded', function() {
            const inputs = ['startAmount', 'targetWealth', 'weeklyRate'];
            inputs.forEach(id => {
                document.getElementById(id).addEventListener('input', function() {
                    // Auto-calculate after 1 second of no typing
                    clearTimeout(this.timeout);
                    this.timeout = setTimeout(calculateWealth, 1000);
                });
            });
            
            // Initial calculation
            calculateWealth();
        });
    </script>
</body>
</html>
    `);
});

app.listen(port, () => {
    console.log(\`💎 Limitless DeFi Wealth Calculator running on port \${port}\`);
});
