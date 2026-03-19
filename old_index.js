const GOAL = 50000;
let savings = JSON.parse(localStorage.getItem('groupSavings')) || { Nathan: 0, Brian: 0, Jackson: 0 };

function updateUI() {
    const container = document.getElementById('progress-container');
    container.innerHTML = '';
    
    for (let name in savings) {
        let percent = (savings[name] / GOAL) * 100;
        if (percent > 100) percent = 100;

        container.innerHTML += `
            <div class="progress-box">
                <strong>${name}</strong>: ${savings[name].toLocaleString()} / ${GOAL.toLocaleString()} UGX
                <div class="bar-bg"><div class="bar-fill" style="width: ${percent}%"></div></div>
            </div>
        `;
    }
    localStorage.setItem('groupSavings', JSON.stringify(savings));
}

function addSaving() {
    const name = document.getElementById('userName').value;
    const amt = parseInt(document.getElementById('amount').value);
    
    if (amt > 0) {
        savings[name] += amt;
        document.getElementById('amount').value = '';
        updateUI();
    }
}

function resetData() {
    if(confirm("Start a new month?")) {
        savings = { Nathan: 0, Brian: 0, Jackson: 0 };
        updateUI();
    }
}

updateUI();