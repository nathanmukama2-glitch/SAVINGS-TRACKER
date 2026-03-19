const GOAL = 5000000;

// Load data on start
document.addEventListener('DOMContentLoaded', updateDisplay);

function addPayment() {
    const name = document.getElementById('userName').value;
    const amount = parseInt(document.getElementById('userAmount').value);
    const date = new Date();

    if (!name || !amount) {
        alert("Please enter a name and amount.");
        return;
    }

    const newEntry = {
        name: name,
        amount: amount,
        date: date.toISOString(), // Full timestamp
        monthYear: `${date.getMonth() + 1}-${date.getFullYear()}` // For filtering
    };

    let history = JSON.parse(localStorage.getItem('savingsHistory')) || [];
    history.push(newEntry);
    localStorage.setItem('savingsHistory', JSON.stringify(history));

    // Clear inputs and refresh
    document.getElementById('userName').value = '';
    document.getElementById('userAmount').value = '';
    updateDisplay();
}

function updateDisplay() {
    const history = JSON.parse(localStorage.getItem('savingsHistory')) || [];
    const tableBody = document.getElementById('tableBody');
    const now = new Date();
    const currentMonthYear = `${now.getMonth() + 1}-${now.getFullYear()}`;

    tableBody.innerHTML = '';
    let monthlyTotal = 0;

    // Filter and Display
    history.forEach(entry => {
        if (entry.monthYear === currentMonthYear) {
            monthlyTotal += entry.amount;

            let row = `<tr>
                <td>${new Date(entry.date).toLocaleDateString()}</td>
                <td>${entry.name}</td>
                <td>${entry.amount.toLocaleString()}</td>
            </tr>`;
            tableBody.innerHTML = row + tableBody.innerHTML;
        }
    });

    // Update Progress Bar
    const percent = Math.min((monthlyTotal / GOAL) * 100, 100);
    document.getElementById('progressBar').style.width = percent + '%';
    document.getElementById('totalDisplay').innerText = 
        `${monthlyTotal.toLocaleString()} UGX / ${GOAL.toLocaleString()} UGX`;
}
