document.addEventListener('DOMContentLoaded', () => {
    const resultDisplay = document.getElementById('result');
    let currentInput = '';
    let operator = '';
    let firstOperand = null;

    // Function to update the display
    function updateDisplay(value) {
        resultDisplay.textContent = value;
    }

    // Function to handle number and dot button clicks
    function handleNumberClick(value) {
        currentInput += value;
        updateDisplay(currentInput);
    }

    // Function to handle operator button clicks
    function handleOperatorClick(value) {
        if (currentInput === '' && value !== '-') return; // Prevent multiple operators
        if (firstOperand === null) {
            firstOperand = parseFloat(currentInput);
        } else if (operator) {
            firstOperand = performCalculation();
        }
        operator = value;
        currentInput = '';
    }

    // Function to perform the calculation
    function performCalculation() {
        const secondOperand = parseFloat(currentInput);
        switch (operator) {
            case '+':
                return firstOperand + secondOperand;
            case '-':
                return firstOperand - secondOperand;
            case '*':
                return firstOperand * secondOperand;
            case '/':
                return firstOperand / secondOperand;
            default:
                return secondOperand;
        }
    }

    // Function to handle equals button click
    function handleEqualsClick() {
        if (operator && currentInput !== '') {
            const result = performCalculation();
            updateDisplay(result);
            firstOperand = result;
            currentInput = '';
            operator = '';
        }
    }

    // Clear the display and reset variables
    function handleClearClick() {
        currentInput = '';
        operator = '';
        firstOperand = null;
        updateDisplay('0');
    }

    // Add event listeners to buttons
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', () => {
            const value = button.value;
            if (button.classList.contains('operator')) {
                handleOperatorClick(value);
            } else if (button.id === 'equals') {
                handleEqualsClick();
            } else if (button.id === 'clear') {
                handleClearClick();
            } else {
                handleNumberClick(value);
            }
        });
    });
});