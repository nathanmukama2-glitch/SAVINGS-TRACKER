const scriptURL = 'https://script.google.com/macros/s/AKfycbxhN3L9KW3vFMsEzcAsuu7alI20FBNCAzH2OuR6jLsei1_3YgeT4batHo7qtGnUq2vA/exec';

// 1. Send data to Google Sheets
function addSaving() {
    const name = document.getElementById('userName').value;
    const amt = document.getElementById('amount').value;
    const month = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });

    if (amt > 0) {
        fetch(scriptURL, { 
            method: 'POST', 
            mode: 'no-cors', 
            body: new URLSearchParams({ 'NAME': name, 'AMOUNT': amt, 'MONTH': month })
        })
        .then(() => {
            alert("Success! Payment recorded for " + name);
            document.getElementById('amount').value = ''; 
            updateUI(); // Refresh the screen immediately
        })
        .catch(error => alert("Connection error. Try again."));
    } else {
        alert("Please enter an amount.");
    }
}

// 2. Pull totals and history from Google Sheets
async function updateUI() {
    const container = document.getElementById('progress-container');
    const historyTable = document.getElementById('payment-history');
    
    container.innerHTML = '<p style="text-align:center;">Updating totals...</p>';
    
    try {
        const response = await fetch(scriptURL);
        const data = await response.json();
        
        // Update Progress Bars
        container.innerHTML = '';
        const totals = data.totals;
        for (let name in totals) {
            let saved = totals[name];
            let percent = Math.min((saved / 50000) * 100, 100);
            container.innerHTML += `
                <div style="margin-bottom: 15px; background: #f9f9f9; padding: 10px; border-radius: 8px;">
                    <strong>${name}</strong>: ${saved.toLocaleString()} / 50,000 UGX
                    <div style="background: #eee; height: 20px; border-radius: 10px; overflow: hidden; margin-top: 5px;">
                        <div style="width: ${percent}%; height: 100%; background: #4caf50; transition: width 0.5s;"></div>
                    </div>
                </div>`;
        }

        // Update History Table
        if (historyTable) {
            historyTable.innerHTML = '';
            data.history.reverse().slice(0, 5).forEach(row => {
                historyTable.innerHTML += `
                    <tr>
                        <td style="padding: 8px; border-bottom: 1px solid #eee;">${row.name}</td>
                        <td style="padding: 8px; border-bottom: 1px solid #eee;">${row.amount.toLocaleString()}</td>
                        <td style="padding: 8px; border-bottom: 1px solid #eee;">${new Date(row.date).toLocaleDateString()}</td>
                    </tr>`;
            });
        }

    } catch (error) {
        container.innerHTML = '<p>Error loading data. Refresh the page.</p>';
    }
}

// Start the app
updateUI();async function updateUI() {
    // ... (previous code for progress bars)

    let grandTotalSum = 0;
    
    // Calculate total from all history records
    data.history.forEach(row => {
        grandTotalSum += row.amount;
    });

    // Display the grand total at the top
    document.getElementById('grand-total').innerText = grandTotalSum.toLocaleString() + " UGX";

    // ... (rest of your history table code)
}
