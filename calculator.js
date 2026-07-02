// DOM Elements
const currentDisplay = document.getElementById('current-operation')
const previousDisplay = document.getElementById('previous-operation')

// Calculator state
let currentNumber = '0'
let previousNumber = ''
let operator = null
let hasToReset = false

function updateDisplay() {
    currentDisplay.textContent = currentNumber
    previousDisplay.textContent = previousNumber
}

function addNumber(number) {
    if (hasToReset) {
        currentNumber = '0'
        hasToReset = false
    }

    // Prevent multiple decimal points
    if (number === '.' && currentNumber.includes('.')) return

    // Replace '0' with the new number or append the number
    if (currentNumber === '0' && number !== '.') {
        currentNumber = number
    } else {
        currentNumber += number
    }

    updateDisplay()
}

function selectOperator(op) {
    if (operator && !hasToReset) {
        calculate()
    }

    operator = op
    previousNumber = currentNumber + ' ' + op
    hasToReset = true
    updateDisplay()
}

function calculate() {
    if (!operator || hasToReset) return

    const previous = parseFloat(previousNumber)
    const current = parseFloat(currentNumber)

    if (isNaN(previous) || isNaN(current)) return

    let result

    try {
        switch (operator) {
            case '+':
                result = previous + current
                break
            case '-':
                result = previous - current
                break
            case '×':
                result = previous * current
                break
            case '÷':
                if (current === 0) {
                    throw new Error('No se puede dividir por cero')
                }
                result = previous / current
                break
            default:
                return
        }

        // Round to prevent float point errors
        result = Math.round((result + Number.EPSILON) * 100000000) / 100000000

        currentNumber = result.toString()
        previousNumber = ''
        operator = null
        hasToReset = true

    } catch (error) {
        showError(error.message)
        return
    }

    updateDisplay()
}

function showError(message) {
    currentDisplay.textContent = 'Error'
    previousDisplay.textContent = message

    setTimeout(() => {
        clear()
    }, 2000)
}

function clear() {
    currentNumber = '0'
    previousNumber = ''
    operator = null
    hasToReset = false
    updateDisplay()
}

// Event listeners
document.querySelectorAll('.btn-number').forEach(btn => {
    btn.addEventListener('click', () => addNumber(btn.dataset.number))
})

document.querySelectorAll('.btn-operator').forEach(btn => {
    btn.addEventListener('click', () => selectOperator(btn.dataset.operator))
})

document.getElementById('equal').addEventListener('click', calculate)
document.getElementById('clear').addEventListener('click', clear)
document.getElementById('delete').addEventListener('click', () => {
    if (currentNumber.length > 1) {
        currentNumber = currentNumber.slice(0, -1)
    } else {
        currentNumber = '0'
    }

    updateDisplay()
})

document.addEventListener('keydown', (e) => {
    const key = e.key

    // Numbers and decimal point
    if ('0123456789.'.includes(key)) {
        e.preventDefault()
        addNumber(key)
    }

    // Operators
    else if (key === '+' || key === '-' || key === '*' || key === '/') {
        e.preventDefault()
        const op = key === '*' ? '×' : key === '/' ? '÷' : key
        selectOperator(op)
    }

    // Enter or '=' for calculation
    else if (key === 'Enter' || key === '=') {
        e.preventDefault()
        calculate()
    }

    // Clear (Escape key)
    else if (key === 'Escape') {
        e.preventDefault()
        clear()
    }

    // Backspace for delete
    else if (key === 'Backspace') {
        e.preventDefault()

        if (currentNumber.length > 1) {
            currentNumber = currentNumber.slice(0, -1)
        } else {
            currentNumber = '0'
        }

        updateDisplay()
    }
})