const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// 💎 LIVE MILLIONAIRE DATA
let treasuryData = {
    millionaires: [
        { name: "CryptoWhale47", wallet: "0x7a2f...8b3c", current: 1247000, growth: "+247%", weeks: 8 },
        { name: "DiamondHands", wallet: "0x9d4e...2a1f", current: 892000, growth: "+1,684%", weeks: 12 },
        { name: "TreasuryKing", wallet: "0x3c8b...7e9d", current: 654000, growth: "+1,208%", weeks: 16 },
        { name: "CompoundGod", wallet: "0x1f5a...4c2b", current: 423000, growth: "+746%", weeks: 20 },
        { name: "YieldFarmer", wallet: "0x8e7c...9a4d", current: 287000, growth: "+474%", weeks: 24 }
    ],
    
    stats: {
        totalMillionaires: 847,
        totalDeposited: 156000000,
        biggestWin: 15600000,
        activeUsers: 23847
    }
};

// 🎯 API ENDPOINTS
app.get('/api/millionaires', (req, res) => {
    // Simulate real-time growth
    treasuryData.millionaires.forEach(user => {
        user.current += Math.random() * 5000 + 1000;
    });
    
    res.json(treasuryData);
});

app.post('/api/calculate', (req, res) => {
    const { amount } = req.body;
    const principal = parseFloat(amount);
    const weeklyRate = 0.1918; // 19.18% weekly
    
    let weeks = 0;
    let current = principal;
    
    while (current < 1000000 && weeks < 104) {
        current *= (1 + weeklyRate);
        weeks++;
    }
    
    const projections = {
        weeks: weeks,
        months: Math.round(weeks / 4.33),
        finalAmount: current,
        canReachMillion: current >= 1000000,
        timeline: {
            month1: principal * Math.pow(1.1918, 4),
            month3: principal * Math.pow(1.1918, 12),
            month6: principal * Math.pow(1.1918, 26),
            month12: principal * Math.pow(1.1918, 52)
        }
    };
    
    res.json(projections);
});

// 🎨 MAIN INTERFACE
app.get('/', (req, res) => {
    res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🚀 POL+TRS Treasury - Live Millionaire Tracker</title>
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
            padding: 60px 20px;
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
            animation: shine 3s infinite;
        }
        
        @keyframes shine {
            0% { left: -100%; }
            100% { left: 100%; }
        }
        
        .hero h1 {
            font-size: 48px;
            font-weight: 900;
            color: #000;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
            margin-bottom: 20px;
        }
        
        .hero-subtitle {
            font-size: 24px;
            color: #000;
            font-weight: 700;
            margin-bottom: 20px;
        }
        
        .live-badge {
            background: #ff0000;
            color: white;
            padding: 12px 24px;
            border-radius: 30px;
            font-weight: 800;
            display: inline-block;
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 40px 20px;
        }
        
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 30px;
            margin: 40px 0;
        }
        
        .stat-card {
            background: rgba(255,255,255,0.1);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 30px;
            text-align: center;
            border: 2px solid rgba(255,215,0,0.3);
        }
        
        .stat-number {
            font-size: 36px;
            font-weight: 900;
            color: #ffd700;
            margin-bottom: 10px;
        }
        
        .stat-label {
            font-size: 14px;
            opacity: 0.8;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .section-title {
            font-size: 36px;
            font-weight: 800;
            text-align: center;
            margin: 60px 0 40px 0;
            color: #ffd700;
        }
        
        .millionaire-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 30px;
            margin-bottom: 60px;
        }
        
        .millionaire-card {
            background: linear-gradient(135deg, rgba(255,215,0,0.1) 0%, rgba(255,107,53,0.1) 100%);
            border: 2px solid #ffd700;
            border-radius: 24px;
            padding: 30px;
            position: relative;
            overflow: hidden;
        }
        
        .millionaire-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, #ff0080, #ffd700);
            animation: progress 4s ease-in-out infinite;
        }
        
        @keyframes progress {
            0%, 100% { transform: translateX(-100%); }
            50% { transform: translateX(100%); }
        }
        
        .user-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }
        
        .username {
            font-size: 20px;
            font-weight: 700;
            color: #ffd700;
        }
        
        .growth-badge {
            background: #4CAF50;
            color: white;
            padding: 6px 12px;
            border-radius: 15px;
            font-size: 12px;
            font-weight: 700;
        }
        
        .balance {
            font-size: 40px;
            font-weight: 900;
            color: #4CAF50;
            margin-bottom: 15px;
        }
        
        .wallet-info {
            font-size: 14px;
            opacity: 0.7;
            font-family: monospace;
        }
        
        .calculator {
            background: rgba(255,255,255,0.1);
            backdrop-filter: blur(10px);
            border-radius: 24px;
            padding: 50px;
            margin: 60px 0;
            text-align: center;
            border: 2px solid #ffd700;
        }
        
        .calculator h2 {
            font-size: 36px;
            font-weight: 800;
            color: #ffd700;
            margin-bottom: 40px;
        }
        
        .amount-input {
            width: 100%;
            max-width: 500px;
            height: 70px;
            background: rgba(0,0,0,0.3);
            border: 3px solid #ffd700;
            border-radius: 20px;
            padding: 0 25px;
            font-size: 24px;
            color: white;
            text-align: center;
            outline: none;
            margin-bottom: 30px;
        }
        
        .amount-input::placeholder {
            color: rgba(255,255,255,0.5);
        }
        
        .quick-amounts {
            display: flex;
            justify-content: center;
            gap: 15px;
            flex-wrap: wrap;
            margin-bottom: 40px;
        }
        
        .quick-btn {
            padding: 15px 25px;
            background: linear-gradient(45deg, #ff0080, #ff8c00);
            border: none;
            border-radius: 30px;
            color: white;
            font-weight: 700;
            cursor: pointer;
            transition: transform 0.2s;
        }
        
        .quick-btn:hover {
            transform: scale(1.05);
        }
        
        .result-card {
            background: rgba(255,215,0,0.1);
            border: 2px solid #ffd700;
            border-radius: 20px;
            padding: 40px;
            margin-top: 30px;
            display: none;
        }
        
        .millionaire-time {
            font-size: 56px;
            font-weight: 900;
            color: #ffd700;
            margin-bottom: 20px;
        }
        
        .result-subtitle {
            font-size: 20px;
            color: #4CAF50;
            margin-bottom: 30px;
        }
        
        .timeline {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 20px;
            margin-bottom: 40px;
        }
        
        .timeline-item {
            text-align: center;
            padding: 20px;
            background: rgba(255,255,255,0.1);
            border-radius: 15px;
        }
        
        .timeline-period {
            font-size: 12px;
            opacity: 0.8;
            margin-bottom: 8px;
        }
        
        .timeline-amount {
            font-size: 18px;
            font-weight: 700;
            color: #4CAF50;
        }
        
        .deposit-btn {
            width: 100%;
            max-width: 500px;
            height: 70px;
            background: linear-gradient(45deg, #ff0080, #ffd700);
            border: none;
            border-radius: 20px;
            color: #000;
            font-size: 20px;
            font-weight: 800;
            cursor: pointer;
            text-transform: uppercase;
            letter-spacing: 1px;
            transition: transform 0.2s;
        }
        
        .deposit-btn:hover {
            transform: translateY(-2px);
        }
        
        @media (max-width: 768px) {
            .hero h1 { font-size: 36px; }
            .millionaire-grid { grid-template-columns: 1fr; }
            .calculator { padding: 30px 20px; }
            .timeline { grid-template-columns: repeat(2, 1fr); }
        }
    </style>
</head>
<body>
    <div class="hero">
        <h1>🚀 POL+TRS TREASURY</h1>
        <div class="hero-subtitle">Watch People Become Millionaires LIVE!</div>
        <div class="live-badge">🔴 LIVE - <span id="heroMillionaires">847</span> Millionaires Created</div>
    </div>
    
    <div class="container">
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-number" id="totalMillionaires">847</div>
                <div class="stat-label">Total Millionaires</div>
            </div>
            <div class="stat-card">
                <div class="stat-number" id="totalDeposited">$156M</div>
                <div class="stat-label">Total Deposited</div>
            </div>
            <div class="stat-card">
                <div class="stat-number" id="biggestWin">$15.6M</div>
                <div class="stat-label">Biggest Winner</div>
            </div>
            <div class="stat-card">
                <div class="stat-number" id="activeUsers">23,847</div>
                <div class="stat-label">Active Users</div>
            </div>
        </div>
        
        <div class="section-title">🏆 LIVE MILLIONAIRE TRACKER</div>
        <div class="millionaire-grid" id="millionaireGrid">
            <!-- Populated by JavaScript -->
        </div>
        
        <div class="calculator">
            <h2>⚡ WHEN WILL YOU BE A MILLIONAIRE?</h2>
            
            <input type="number" placeholder="Enter your deposit amount" id="depositAmount" class="amount-input" step="100" min="100">
            
            <div class="quick-amounts">
                <button class="quick-btn" onclick="setAmount(1000)">$1K</button>
                <button class="quick-btn" onclick="setAmount(5000)">$5K</button>
                <button class="quick-btn" onclick="setAmount(10000)">$10K</button>
                <button class="quick-btn" onclick="setAmount(25000)">$25K</button>
                <button class="quick-btn" onclick="setAmount(50000)">$50K</button>
            </div>
            
            <div class="result-card" id="resultCard">
                <div class="millionaire-time" id="millionaireTime">26 MONTHS</div>
                <div class="result-subtitle" id="resultSubtitle">You'll be a millionaire in 26 months!</div>
                
                <div class="timeline" id="timeline">
                    <!-- Populated by JavaScript -->
                </div>
                
                <button class="deposit-btn" onclick="startJourney()">🚀 START MILLIONAIRE JOURNEY</button>
            </div>
        </div>
    </div>
    
    <script>
        let millionaires = [];
        
        // Initialize
        document.addEventListener('DOMContentLoaded', function() {
            loadData();
            setInterval(loadData, 3000); // Update every 3 seconds
            
            document.getElementById('depositAmount').addEventListener('input', calculateMillionaire);
        });
        
        // Load millionaire data
        async function loadData() {
            try {
                const response = await fetch('/api/millionaires');
                const data = await response.json();
                
                millionaires = data.millionaires;
                updateMillionaireGrid();
                updateStats(data.stats);
            } catch (error) {
                console.error('Failed to load data:', error);
            }
        }
        
        // Update millionaire grid
        function updateMillionaireGrid() {
            const grid = document.getElementById('millionaireGrid');
            
            grid.innerHTML = millionaires.map(user => \`
                <div class="millionaire-card">
                    <div class="user-header">
                        <div class="username">\${user.name}</div>
                        <div class="growth-badge">\${user.growth}</div>
                    </div>
                    <div class="balance">$\${formatNumber(user.current)}</div>
                    <div class="wallet-info">\${user.wallet} • \${user.weeks} weeks ago</div>
                </div>
            \`).join('');
        }
        
        // Update stats
        function updateStats(stats) {
            document.getElementById('totalMillionaires').textContent = stats.totalMillionaires;
            document.getElementById('heroMillionaires').textContent = stats.totalMillionaires;
            document.getElementById('totalDeposited').textContent = '$' + formatNumber(stats.totalDeposited);
            document.getElementById('biggestWin').textContent = '$' + formatNumber(stats.biggestWin);
            document.getElementById('activeUsers').textContent = stats.activeUsers.toLocaleString();
        }
        
        // Set amount
        function setAmount(amount) {
            document.getElementById('depositAmount').value = amount;
            calculateMillionaire();
        }
        
        // Calculate millionaire timeline
        async function calculateMillionaire() {
            const amount = document.getElementById('depositAmount').value;
            if (!amount || amount < 100) {
                document.getElementById('resultCard').style.display = 'none';
                return;
            }
            
            try {
                const response = await fetch('/api/calculate', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ amount: amount })
                });
                
                const data = await response.json();
                displayResults(data, amount);
            } catch (error) {
                console.error('Calculation failed:', error);
            }
        }
        
        // Display results
        function displayResults(data, amount) {
            const resultCard = document.getElementById('resultCard');
            const timeElement = document.getElementById('millionaireTime');
            const subtitleElement = document.getElementById('resultSubtitle');
            const timelineElement = document.getElementById('timeline');
            
            if (data.canReachMillion) {
                timeElement.textContent = data.months + ' MONTHS';
                subtitleElement.textContent = \`You'll be a millionaire in \${data.months} months!\`;
                
                timelineElement.innerHTML = \`
                    <div class="timeline-item">
                        <div class="timeline-period">Month 1</div>
                        <div class="timeline-amount">$\${formatNumber(data.timeline.month1)}</div>
                    </div>
                    <div class="timeline-item">
                        <div class="timeline-period">Month 3</div>
                        <div class="timeline-amount">$\${formatNumber(data.timeline.month3)}</div>
                    </div>
                    <div class="timeline-item">
                        <div class="timeline-period">Month 6</div>
                        <div class="timeline-amount">$\${formatNumber(data.timeline.month6)}</div>
                    </div>
                    <div class="timeline-item">
                        <div class="timeline-period">Month 12</div>
                        <div class="timeline-amount">$\${formatNumber(data.timeline.month12)}</div>
                    </div>
                \`;
            } else {
                timeElement.textContent = 'INCREASE DEPOSIT';
                subtitleElement.textContent = 'Deposit more to reach millionaire status faster!';
                timelineElement.innerHTML = '<div class="timeline-item"><div class="timeline-period">Need larger deposit</div></div>';
            }
            
            resultCard.style.display = 'block';
        }
        
        // Start journey
        function startJourney() {
            const amount = document.getElementById('depositAmount').value;
            alert(\`🚀 Ready to start your millionaire journey with $\${amount}! Connect wallet to begin!\`);
        }
        
        // Format numbers
        function formatNumber(num) {
            if (num >= 1000000) {
                return (num / 1000000).toFixed(1) + 'M';
            } else if (num >= 1000) {
                return (num / 1000).toFixed(0) + 'K';
            }
            return Math.round(num).toLocaleString();
        }
    </script>
</body>
</html>
    `);
});

app.listen(port, () => {
    console.log(\`🚀 POL+TRS Treasury running on port \${port}\`);
});
