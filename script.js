// 1. YOUR GOOGLE WEB APP URL
const scriptURL = 'https://script.google.com/macros/s/AKfycbxhN3L9KW3vFMsEzcAsuu7alI20FBNCAzH2OuR6jLsei1_3YgeT4batHo7qtGnUq2vA/exec';

// 2. FUNCTION TO ADD A PAYMENT
function addSaving() {
    const name = document.getElementById('userName').value;
    const amt = document.getElementById('amount').value;
    const month = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });

    if (amt > 0) {
        fetch(scriptURL, { 
            method: 'POST', 
            mode: 'no-cors', 
            body: new URLSearchParams({
                'NAME': name,
                'AMOUNT': amt,
                'MONTH': month
            })
        })
        .then(() => {
            alert("Success! Payment recorded for " + name);
            document.getElementById('amount').value = ''; 
            updateUI(); // Refresh the progress bars immediately
        })
        .catch(error => {
            console.error('Error!', error.message);
            alert("Error: Check your internet connection.");
        });
    } else {
        alert("Please enter a valid amount.");
    }
}

// 3. FUNCTION TO UPDATE PROGRESS BARS (FETCH TOTALS)
async function updateUI() {
    const container = document.getElementById('progress-container');
    container.innerHTML = '<p style="text-align:center;">Checking totals...</p>';
    
    try {
        const response = await fetch(scriptURL);
        const totals = await response.json();
        
        container.innerHTML = ''; // Clear loading text
        
        for (let name in totals) {
            let saved = totals[name];
            let target = 50000;
            let percent = (saved / target) * 100;
            if (percent > 100) percent = 100;

            container.innerHTML += `
                <div style="margin-bottom: 15px; background: #f9f9f9; padding: 10px; border-radius: 8px;">
                    <strong>${name}</strong>: ${saved.toLocaleString()} / 50,000 UGX
                    <div style="background: #eee; height: 20px; border-radius: 10px; overflow: hidden; margin-top: 5px;">
                        <div style="width: ${percent}%; height: 100%; background: #4caf50; transition: width 0.5s;"></div>
                    </div>
                </div>
            `;
        }
    } catch (error) {
        container.innerHTML = '<p>Could not load totals. Please refresh.</p>';
        console.error('Fetch error:', error);
    }
}

// 4. LOAD TOTALS ON STARTUP
updateUI();
