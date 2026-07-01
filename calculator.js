// DOM Elements
const currentDisplay = document.getElementById('current-operation')
const previousDisplay = document.getElementById('previous-operation')

// Calculator state
let currentNumber = '0'

// Numeric buttons
const numberButtons = document.querySelectorAll('.btn-number')

numberButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const number = btn.dataset.number

        // Prevent multiple decimal points
        if (number === '.' && currentNumber.includes('.')) return


        // Replace '0' with the new number or append the number
        if (currentNumber === '0' && number !== '.') {
            currentNumber = number
        } else {
            currentNumber += number
        }

        currentDisplay.textContent = currentNumber
    })
})

// Clear button
document.getElementById('clear').addEventListener('click', () => {
    currentNumber = '0'
    currentDisplay.textContent = currentNumber
    previousDisplay.textContent = '0'
})

// Delete button
document.getElementById('delete').addEventListener('click', () => {
    if (currentNumber.length > 1) {
        currentNumber = currentNumber.slice(0, -1)
    } else {
        currentNumber = '0'
    }

    currentDisplay.textContent = currentNumber
})