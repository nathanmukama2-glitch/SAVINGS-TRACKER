// 1. Paste your Google Web App URL here
const scriptURL = 'https://script.google.com/macros/s/AKfycbxhN3L9KW3vFMsEzcAsuu7alI20FBNCAzH2OuR6jLsei1_3YgeT4batHo7qtGnUq2vA/exec';

function addSaving() {
    const name = document.getElementById('userName').value;
    const amt = document.getElementById('amount').value;
    
    // This automatically gets the current month name (e.g., "March 2026")
    const month = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });

    if (amt > 0) {
        // This sends the data to your Google Sheet
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
            document.getElementById('amount').value = ''; // Clear the input box
        })
        .catch(error => {
            console.error('Error!', error.message);
            alert("Something went wrong. Check your connection.");
        });
    } else {
        alert("Please enter a valid amount.");
    }
}
