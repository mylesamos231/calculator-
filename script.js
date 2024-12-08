/*
*   Your task is to create a calculator. You can create
*   your calculator using any of the DOM manipulation
*   techniques we learned throughout the semester. Use
*   javascript's eval function to perform the calculation.
*   If an error occurs, show ERROR on the calculator
*   'screen'.
*
*   Example of using eval: var result = eval('10+4*2');
*
*   Requirements:
*     - Buttons for every digit 0-9
*     - Buttons for +, -, /, *
*     - Button to backspace or clear <-
*     - Button to execute calculation =
*     - Calculator 'screen' should update as buttons
*       are pressed including numbers, operations, etc
*     - Result should show on calculator 'screen'
*     - Upon submitting and showing result, calculator
*       should reset on next button click, starting new
*       calculation
*     - If an error occurs, for example inputting ---6,
*       calculator 'screen' should output 'ERROR'
*     - Calculator 'screen' should fit at least 10
*       characters
*     - At least 12 CSS styles
*
*   Submit your JS file, HTML file, and optional CSS/jquery
*   file. Refer to images in Sakai for guidance.
*/

const screen = document.getElementById('screen');
const buttons = document.querySelectorAll('.btn');
const clearButton = document.getElementById('clear');
const equalsButton = document.getElementById('equals');

let currentInput = '0';
let isResultDisplayed = false;

// Update the screen with the current input
function updateScreen(value) {
    if (value === 'ERROR') {
        screen.textContent = 'ERROR';
    } else {
        screen.textContent = value.length > 10 ? value.slice(0, 10) : value;
    }
}

// Handle button clicks
buttons.forEach(button => {
    button.addEventListener('click', function () {
        const value = button.dataset.value;

        // If the result was previously displayed, start a new calculation with the clicked value
        if (isResultDisplayed) {
            if (['+', '-', '*', '/'].includes(value)) {
                currentInput = currentInput + value;
            } else {
                currentInput = value;
            }
            isResultDisplayed = false;
        } else {
            if (currentInput === '0' && value !== '.') {
                currentInput = value; // Replace the initial '0' with the clicked value
            } else {
                currentInput += value; // Append the value to the current input
            }
        }
        
        updateScreen(currentInput);
    });
});

// Handle clear button click
clearButton.addEventListener('click', function () {
    currentInput = '0';
    updateScreen(currentInput);
    isResultDisplayed = false;
});

// Sanitize the input to ensure it's safe for eval
function sanitizeInput(input) {
    // Allow only numbers, operators, and parentheses (basic mathematical expressions)
    return input.replace(/[^0-9+\-*/(). ]/g, '');
}

// Handle equals button click
equalsButton.addEventListener('click', function () {
    try {
        // Sanitize the input before passing to eval
        const sanitizedInput = sanitizeInput(currentInput);

        // Use eval() to calculate the result
        const result = eval(sanitizedInput);
        
        // If result is NaN or Infinity, handle it as an error
        if (isNaN(result) || !isFinite(result)) {
            throw new Error('ERROR');
        }

        // Update screen with the result
        currentInput = result.toString();
        updateScreen(currentInput);
        isResultDisplayed = true;
    } catch (e) {
        // If an error occurs, show 'ERROR'
        currentInput = 'ERROR';
        updateScreen(currentInput);
        isResultDisplayed = true;
    }
});
