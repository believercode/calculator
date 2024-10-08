document.addEventListener('DOMContentLoaded', function() {
    const display = document.querySelector('#calc-display');

    function appendToDisplay(value) {
        display.value += value;
    }

    function clearDisplay() {
        display.value = '';
    }

    function calculate() {
        try {
            // Insert multiplication signs where appropriate (e.g., 2(3+4) becomes 2*(3+4))
            let expression = display.value
                .replace('×', '*')    // Replace the "×" symbol with "*"
                .replace('÷', '/')    // Replace the "÷" symbol with "/"
                .replace(/(\d)(\()/g, '$1*(')  // Insert * between number and "(" (e.g., 2(3) becomes 2*(3))
                .replace(/(\))(\d)/g, ')*$2') // Insert * between ")" and number (e.g., (3)2 becomes (3)*2)
                .replace('sin', 'Math.sin')
                .replace('ln', 'Math.log')
                .replace('π', 'Math.PI')
                .replace('cos', 'Math.cos')
                .replace('log', 'Math.log10')
                .replace('e', 'Math.E')
                .replace('tan', 'Math.tan')
                .replace('√', 'Math.sqrt')
                ;

            display.value = eval(expression); // Evaluate the expression
        } catch (error) {
            display.value = 'Error';
        }
    }

    // Add event listeners to all buttons
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', function() {
            const value = this.innerText;

            if (value === 'AC') {
                clearDisplay();
            } else if (value === '=') {
                calculate();
            } else if (value === 'sin' || value === 'cos' || value === 'tan' || value === '√' || value === 'ln' || value === 'log') {
                appendToDisplay(value + '(');  // Automatically add "(" after sin, cos, tan, and √
            } else {
                appendToDisplay(value);
            }
        });
    });
});
