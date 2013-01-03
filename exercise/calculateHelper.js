var calculatorView = {

    init:function () {
        var container = document.createDocumentFragment();
        container.appendChild(this._createCalcElement("input", "text"));
        for (var i = 0; i < 10; i++) {
            container.appendChild(this._createCalcElement("button", "button", i));
        }

        container.appendChild(this._createCalcElement("button", "button", '+'));
        container.appendChild(this._createCalcElement("button", "button", '-'));
        container.appendChild(this._createCalcElement("button", "button", '*'));
        container.appendChild(this._createCalcElement("button", "button", '/'));
        container.appendChild(this._createCalcElement("button", "button", '%'));
        container.appendChild(this._createCalcElement("button", "button", 'clr'));
        container.appendChild(this._createCalcElement("button", "button", '='));

        var form = document.createElement('form');
        form.setAttribute("id", "parent");
        form.appendChild(container);
        document.body.appendChild(form);
    },

    _createCalcElement:function (element, type, elementText) {
        var newElement = document.createElement(element);
        newElement.setAttribute("type", type);
        if (type === "button") {
            newElement.innerHTML = elementText;
            newElement.value = elementText;
        } else {
            newElement.id = "inputbox";
        }

        return newElement;
    },

    initEvents:function () {
        var input = document.getElementById("parent");

        if (window.attachEvent) {
            input.attachEvent("click", this._clickHandler);
        } else {
            input.addEventListener("click", this._clickHandler, true);
        }

    },

    _clickHandler:function (evt) {
        var targetElement = event.srcElement || evt.target;
        if (targetElement && targetElement.type == "button") {
            if (targetElement.value != 'clr' && targetElement.value != '=') {
                document.getElementById('inputbox').value += targetElement.value;
            }
            else {
                if (targetElement.value == 'clr') {
                    calculator.reset();
                }
                if (targetElement.value == '=') {
                    calculator.compute();
                }
            }
        }
    }
};

var calculator = {

    '+':function (a, b) {
        return a + b;
    },

    '-':function (a, b) {
        return a - b;
    },

    '*':function (a, b) {
        return a * b;
    },

    '/':function (a, b) {
        return a / b;
    },

    '%':function (a, b) {
        return a % b;
    },

    reset:function () {
        document.getElementById('inputbox').value = '';
    },

    getOperator:function (input) {
        var inputOperators = '', operatorsString = "+-*/%";
        var array = input.split('');

        for (var i in array) {
            if (operatorsString.search("\\" + array[i]) != -1) {
                inputOperators += array[i];
            }
        }
        return  inputOperators;

    },

    validateExpression:function (expression) {

        if ((this.getOperator(expression)).length > 1) {
            return false;
        }
        return true;

    },

    evaluate:function (expression) {
        var inputOperator = this.getOperator(expression),
            inputs = expression.split(inputOperator);
        return this[inputOperator](parseInt(inputs[0], 10), parseInt(inputs[1], 10));
    },

    compute:function () {
        var inputElement = document.getElementById('inputbox'),
            expression = inputElement.value;
        if (!calculator.validateExpression(expression)) {
            inputElement.value = "Malformed expression";
            return;
        }
        inputElement.value = this.evaluate(expression);
    },


    create:function () {
        calculatorView.init();
        calculatorView.initEvents();
    }


};


