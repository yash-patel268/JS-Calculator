class Calculator {
    constructor(previousTextOperand, currentTextOperand){
        this.previousTextOperand = previousTextOperand
        this.currentTextOperand = currentTextOperand
        this.clearText();
    }

    clearText(){
        this.currentText=""
        this.previousText=""
        this.operation = undefined
    }
    
    deleteText(){
        this.currentText = this.currentText.toString().slice(0, -1)
    }
    
    numberSelect(number){
        if(number==="." && this.currentText.includes(".")) return
        this.currentText = this.currentText.toString() + number.toString()
    }
    
    operationSelect(operation){
        if(this.currentText=== "") return
        if(this.previousText !== ""){
            this.compute()
        }
        this.operation = operation
        this.previousText = this.currentText
        this.currentText = ""
    }
    
    compute(){
        let computation
        const prev = parseFloat(this.previousText)
        const current = parseFloat(this.currentText)
        if(isNaN(prev) || isNaN(current)) return
        switch(this.operation){
            case "+":
                computation = prev + current
                break
            case "-":
                computation = prev + current
                break
            case "*":
                computation = prev + current
                break
            case "÷":
                computation = prev + current
                break
            default:
                return
        }
        this.currentText = computation
        this.operation = undefined
        this.previousText = ""
    }

    getDisplay(number){
        const stringNum = number.toString()
        const intDigit = parseFloat(stringNum.split(".")[0])
        const decDigit = stringNum.split(".")[1]
        let intDisplay
        if (isNaN(intDigit)){
            intDisplay=""
        } else{
            intDisplay = intDigit.toLocaleString('en', {
                maximumFractionDigits: 0})
        }
        if(decDigit != null){
            return `${intDisplay}.${decDigit}`
        } else{
            return intDisplay
        }
    }
    
    update(){
        this.currentTextOperand.innerText = this.getDisplay(this.currentText)
        if(this.operation != null) {
            this.previousTextOperand.innerText = `${this.getDisplay(this.previousText)} ${this.operation}`
        }else{
            this.previousTextOperand.innerText="";
        }
        
    }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-clear]')
const previousTextOperand = document.querySelector('[data-previous]')
const currentTextOperand = document.querySelector('[data-current]')


const calculator = new Calculator(previousTextOperand, currentTextOperand)

numberButtons.forEach(button =>{
    button.addEventListener('click', () => {
        calculator.numberSelect(button.innerText)
        calculator.update()
    })
})

operationButtons.forEach(button =>{
    button.addEventListener('click', () => {
        calculator.operationSelect(button.innerText)
        calculator.update()
    })
})

equalsButton.addEventListener("click", button => {
    calculator.compute()
    calculator.update()
})

allClearButton.addEventListener("click", button => {
    calculator.clearText()
    calculator.update()
})

deleteButton.addEventListener("click", button => {
    calculator.deleteText()
    calculator.update()
})