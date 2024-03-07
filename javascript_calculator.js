class Display extends React.Component {
    constructor(props) {
      super(props);
      // Initialize the component's state
      this.state = {
        value: "0",              // Current value displayed on the calculator
        previousButton: ""       // Previous button pressed on the calculator
      };
      // Bind the methods to the component's instance
      this.displayValue = this.displayValue.bind(this);
      this.clear = this.clear.bind(this);
      this.calculate = this.calculate.bind(this);
    }
  
    // Handler for button clicks that update the displayed value
    displayValue(event) {
      const buttonText = event.target.value;
  
      // Check for special cases when adding a decimal point
      if (buttonText === "." && this.state.value.includes(".")) {
        const arr = this.state.value.split(" ");
        const lastNumber = arr[arr.length - 1];
        if (lastNumber.includes(".")) {
          return; // Do not add additional decimal points
        } else {
          this.setState({
            value: this.state.value + buttonText,
            previousButton: buttonText
          });
        }
      } 
      // Check for cases when the value is "0" and a non-numeric or non-decimal button is pressed
      else if (
        this.state.value === "0" &&
        buttonText !== " + " &&
        buttonText !== " * " &&
        buttonText !== " / " &&
        buttonText !== "."
      ) {
        this.setState({
          value: buttonText,
          previousButton: buttonText
        });
      } 
      // Check for cases when an operator follows another operator
      else if (
        (this.state.previousButton === " + " ||
          this.state.previousButton === " - " ||
          this.state.previousButton === "-" ||
          this.state.previousButton === " * " ||
          this.state.previousButton === " / ") &&
        (buttonText === " + " || buttonText === " * " || buttonText === " / ")
      ) {
        this.setState({
          value: this.state.value.replace(/\D+\s*[+*\/-]\s*$/, buttonText),
          previousButton: buttonText
        });
      } 
      // Check for cases when a negative sign follows an operator
      else if (
        (this.state.previousButton === " + " ||
          this.state.previousButton === " - " ||
          this.state.previousButton === " * " ||
          this.state.previousButton === " / ") &&
        buttonText === " - "
      ) {
        this.setState({
          value: this.state.value + "-",
          previousButton: "-"
        });
      } 
      // Check for cases when a negative sign is already present
      else if (this.state.previousButton === "-" && buttonText === " - ") {
        return; // Do not allow consecutive negative signs
      } 
      // Default case: append the button value to the displayed value
      else {
        this.setState({
          value: this.state.value + buttonText,
          previousButton: buttonText
        });
      }
  
      console.log(this.state.value); // Log the updated value to the console
    }
  
    // Handler for the clear button click
    clear() {
      this.setState({
        value: "0"  // Reset the displayed value to "0"
      });
    }
  
    // Handler for the equals button click to perform the calculation
    calculate() {
      const operators = {
        "+": (a, b) => a + b,
        "-": (a, b) => a - b,
        "*": (a, b) => a * b,
        "/": (a, b) => a / b
      };
  
      const tokens = this.state.value.split(" ");
      let result = parseFloat(tokens[0]);
  
      // Iterate through the tokens and perform the calculation
      for (let i = 1; i < tokens.length; i += 2) {
        const operator = tokens[i];
        const operand = parseFloat(tokens[i + 1]);
  
        if (operators.hasOwnProperty(operator)) {
          result = operators[operator](result, operand);
        } else {
          throw new Error("Invalid operator");
        }
      }
  
      // Update the state with the calculated result or display an error message
      if (isNaN(result)) {
        this.setState({
          value: "Invalid Expression"
        });
      } else {
        this.setState({
          value: result.toString()
        });
      }
    }
  
    render() {
      return (
        <div>
          <div id="display-container">
            <p id="display">{this.state.value}</p>
          </div>
          <div id="buttons">
            {/* Button elements for various operations and numbers */}
            <button id="clear" onClick={this.clear}>
              AC
            </button>
            <button id="divide" onClick={this.displayValue} value=" / ">
              /
            </button>
            <button id="multiply" onClick={this.displayValue} value=" * ">
              x
            </button>
            <button id="seven" onClick={this.displayValue} value="7">
              7
            </button>
            <button id="eight" onClick={this.displayValue} value="8">
              8
            </button>
            <button id="nine" onClick={this.displayValue} value="9">
              9
            </button>
            <button id="subtract" onClick={this.displayValue} value=" - ">
              -
            </button>
            <button id="four" onClick={this.displayValue} value="4">
              4
            </button>
            <button id="five" onClick={this.displayValue} value="5">
              5
            </button>
            <button id="six" onClick={this.displayValue} value="6">
              6
            </button>
            <button id="add" onClick={this.displayValue} value=" + ">
              +
            </button>
            <button id="one" onClick={this.displayValue} value="1">
              1
            </button>
            <button id="two" onClick={this.displayValue} value="2">
              2
            </button>
            <button id="three" onClick={this.displayValue} value="3">
              3
            </button>
            <button id="equals" onClick={this.calculate}>
              =
            </button>
            <button id="zero" onClick={this.displayValue} value="0">
              0
            </button>
            <button id="decimal" onClick={this.displayValue} value=".">
              .
            </button>
          </div>
        </div>
      );
    }
  }
  
  ReactDOM.render(<Display />, document.getElementById("calculator"));
  