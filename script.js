document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    const clearButton = document.querySelector('.clear');
    const equalButton = document.querySelector('.equal');

    let currentInput = '';
    let operator = '';
    let operand1 = null;

    // Update Display
    const updateDisplay = (value) => {
        display.value = value;
    };

    // Handle Button Click
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');
            
            if (value >= '0' && value <= '9' || value === '.') {
                // Handle Numbers and Decimal Point
                currentInput += value;
                updateDisplay(currentInput);
            } else if (['+', '-', '*', '/'].includes(value)) {
                // Handle Operators
                if (currentInput !== '') {
                    operand1 = parseFloat(currentInput);
                    operator = value;
                    currentInput = '';
                }
            }
        });
    });

    // Handle Equals Button
    equalButton.addEventListener('click', () => {
        if (operand1 !== null && currentInput !== '') {
            const operand2 = parseFloat(currentInput);

            let result;
            switch (operator) {
                case '+':
                    result = operand1 + operand2;
                    break;
                case '-':
                    result = operand1 - operand2;
                    break;
                case '*':
                    result = operand1 * operand2;
                    break;
                case '/':
                    result = operand2 !== 0 ? operand1 / operand2 : 'Error';
                    break;
                default:
                    result = 'Error';
            }

            updateDisplay(result);
            operand1 = null;
            currentInput = '';
        }
    });

    // Handle Clear Button
    clearButton.addEventListener('click', () => {
        operand1 = null;
        currentInput = '';
        operator = '';
        updateDisplay('');
    });
});
