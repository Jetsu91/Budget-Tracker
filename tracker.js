document.addEventListener("DOMContentLoaded", () => {
    const dropdownBtn = document.querySelector(".dropdownBtn");
    const dropdownContent = document.querySelector(".dropdown-content");

    dropdownBtn.addEventListener("click", () => {
        dropdownContent.classList.toggle("show");
    });

    window.addEventListener("click", (event) => {
        if (!event.target.matches(".dropdownBtn")) {
            if (dropdownContent.classList.contains("show")) {
                dropdownContent.classList.remove("show");
            }
    }
});

    setTimeout(() => {
        document.getElementById('goalModal').style.display = "block";
    }, 5000);

    // Close modal functionality
    const modal = document.getElementById("goalModal");
    const span = document.getElementsByClassName("close")[0];
    span.onclick = function() {
        modal.style.display = "none";
    }
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});

function setCategory(category) {
    document.getElementById('categoryInput').value = category;
}

function setGoalAmount() {
    const goalAmount = parseFloat(document.getElementById('modalGoalAmount').value) || 0;
    document.getElementById('goalAmount').value = goalAmount;
    document.getElementById('goalModal').style.display = "none";
    updateTotal();
}

function addExpenseRow() {
    const category = document.getElementById('categoryInput').value;
    const amount = parseFloat(document.getElementById('amountInput').value) || 0;

    if (!category || !amount) {
        alert("Please fill in all fields.");
        return;
    }

    const table = document.getElementById('expenseTable').getElementsByTagName('tbody')[0];

    if (table.rows[0].cells.length === 1) {
        table.deleteRow(0);
    }

    const currentDate = new Date(); // Get the current date
    const formattedDate = currentDate.toISOString().split('T')[0]; // Format the date as YYYY-MM-DD

    const newRow = table.insertRow();
    newRow.insertCell(0).innerHTML = formattedDate;
    newRow.insertCell(1).innerHTML = category;
    newRow.insertCell(2).innerHTML = amount.toFixed(2);

    updateTotal();
}


function updateTotal() {
    const table = document.getElementById('expenseTable').getElementsByTagName('tbody')[0];
    let total = 0;

    for (let i = 0; i < table.rows.length; i++) {
        const amount = parseFloat(table.rows[i].cells[2].innerHTML);
        total += amount;
    }

    document.getElementById('totalAmount').innerHTML = total.toFixed(2);
    updateProgress(total);
}

function updateProgress(totalAmount) {
    const goalAmount = parseFloat(document.getElementById('goalAmount').value);
    const progressText = document.getElementById('progressText');
    const circle = document.querySelector('.circle');
    const progressDisplay = document.getElementById('progressDisplay');

    if (goalAmount > 0 && totalAmount >= 0) {
        const progress = Math.min((totalAmount / goalAmount) * 100, 100);
        progressText.innerText = progress.toFixed(2) + '%';
        circle.style.background = `conic-gradient(#ff0f0f ${progress}%, #e0e0e0 ${progress}% 100%)`; // Red color

        // Update the progress display text with two decimal places
        if (progress < 100) {
            progressDisplay.innerText = `You have ${(100 - progress).toFixed(2)}% left of your income.`;
        } else {
            progressDisplay.innerText = `You have reached the limit of your income of PHP${goalAmount.toFixed(2)}.`;
        }
    } else {
        alert('Please enter valid amounts.');
    }
}



