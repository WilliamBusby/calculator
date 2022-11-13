"use strict";

describe('Visit test', function () {
  it('Visits my calculator page', function () {
    cy.visit('http://127.0.0.1:5500/index.html');
  });
});
describe('Addition test', function () {
  it('Adds two plus seven equals nine', function () {
    // Arrange
    cy.visit('http://127.0.0.1:5500/index.html'); // Act

    cy.get('#two').click();
    cy.get('#plus').click();
    cy.get('#seven').click();
    cy.get('#equal').click(); // Assert

    cy.get('#output__big').should("contain", "9");
  });
  it('Adds minus two plus seven equals nine', function () {
    // Arrange
    cy.visit('http://127.0.0.1:5500/index.html'); // Act

    cy.get('#two').click();
    cy.get('#plusMinus').click();
    cy.get('#plus').click();
    cy.get('#seven').click();
    cy.get('#equal').click(); // Assert

    cy.get('#output__big').should("contain", "5");
  });
});
describe('Multiplication test', function () {
  it('Multiplies three and five equals 15', function () {
    // Arrange
    cy.visit('http://127.0.0.1:5500/index.html'); // Act

    cy.get('#three').click();
    cy.get('#multiply').click();
    cy.get('#five').click();
    cy.get('#equal').click(); // Assert

    cy.get('#output__big').should("contain", "15");
  });
});
describe('Subtraction test', function () {
  it('Subtract eight - one equals seven', function () {
    // Arrange
    cy.visit('http://127.0.0.1:5500/index.html'); // Act

    cy.get('#eight').click();
    cy.get('#minus').click();
    cy.get('#one').click();
    cy.get('#equal').click(); // Assert

    cy.get('#output__big').should("contain", "7");
  });
});
describe('Divide test', function () {
  it('Divide six by four equal 1.5', function () {
    // Arrange
    cy.visit('http://127.0.0.1:5500/index.html'); // Act

    cy.get('#six').click();
    cy.get('#divide').click();
    cy.get('#four').click();
    cy.get('#equal').click(); // Assert

    cy.get('#output__big').should("contain", "1.5");
  });
});
describe('Divide 0 test', function () {
  it('Divide nine by zero should alert', function () {
    // Arrange
    cy.visit('http://127.0.0.1:5500/index.html'); // Act

    cy.get('#nine').click();
    cy.get('#divide').click();
    cy.get('#zero').click();
    cy.get('#equal').click(); // Assert

    cy.on('window:alert', function (text) {
      expect(text).to.contains("Can't divide by 0!");
    });
  });
});
describe('Clear test', function () {
  it('CE should clear everything', function () {
    // Arrange
    cy.visit('http://127.0.0.1:5500/index.html'); // Act

    cy.get('#six').click();
    cy.get('#divide').click();
    cy.get('#four').click();
    cy.get('#remove').click(); // Assert

    cy.get('#output__big').should("contain", "0");
    cy.get('#output__small').should("contain", "");
  });
});
describe('Plus/minus test', function () {
  it('Should add "-" to current number shown', function () {
    // Arrange
    cy.visit('http://127.0.0.1:5500/index.html'); // Act

    cy.get('#nine').click();
    cy.get('#plusMinus').click(); // Assert

    cy.get('#output__big').should("contain", "-9");
  });
});
describe('Multiple plus/minus test', function () {
  it('Repeatedly clicking plus/minus should only show one or zero "-"', function () {
    // Arrange
    cy.visit('http://127.0.0.1:5500/index.html'); // Act

    cy.get('#nine').click();
    cy.get('#plusMinus').click();
    cy.get('#plusMinus').click();
    cy.get('#plusMinus').click();
    cy.get('#plusMinus').click();
    cy.get('#plusMinus').click();
    cy.get('#plusMinus').click();
    cy.get('#plusMinus').click();
    cy.get('#plus').click(); // Assert

    cy.get('#output__small').should("contain", "-9+");
    cy.get('#output__big').should("contain", "-9");
  });
});
describe('Percentage test', function () {
  it('Should divide current number by 100', function () {
    // Arrange
    cy.visit('http://127.0.0.1:5500/index.html'); // Act

    cy.get('#nine').click();
    cy.get('#percent').click(); // Assert

    cy.get('#output__big').should("contain", "0.09");
  });
});
describe('Squared test', function () {
  it('Should output number squared', function () {
    // Arrange
    cy.visit('http://127.0.0.1:5500/index.html'); // Act

    cy.get('#five').click();
    cy.get('#squared').click();
    cy.get('#equal').click(); // Assert

    cy.get('#output__big').should("contain", "25");
  });
});
describe('Squared number after test', function () {
  it('Should not allow number to be used after squared', function () {
    // Arrange
    cy.visit('http://127.0.0.1:5500/index.html'); // Act

    cy.get('#nine').click();
    cy.get('#squared').click();
    cy.get('#nine').click(); // Assert

    cy.on('window:alert', function (text) {
      expect(text).to.contains("You cannot put a number after a special operator.");
    });
  });
});
describe('Two decimal points', function () {
  it('Should not allow two decimal points in a number', function () {
    // Arrange
    cy.visit('http://127.0.0.1:5500/index.html'); // Act

    cy.get('#nine').click();
    cy.get('#decimal').click();
    cy.get('#decimal').click(); // Assert

    cy.on('window:alert', function (text) {
      expect(text).to.contains("You can't have two decimal points in one number.");
    });
  });
});
describe('Cubed test', function () {
  it('Should output number cubed', function () {
    // Arrange
    cy.visit('http://127.0.0.1:5500/index.html'); // Act

    cy.get('#five').click();
    cy.get('#cubed').click();
    cy.get('#equal').click(); // Assert

    cy.get('#output__big').should("contain", "125");
  });
});
describe('Square root test', function () {
  it('Should output number square rooted', function () {
    // Arrange
    cy.visit('http://127.0.0.1:5500/index.html'); // Act

    cy.get('#one').click();
    cy.get('#zero').click();
    cy.get('#zero').click();
    cy.get('#squareRoot').click();
    cy.get('#equal').click(); // Assert

    cy.get('#output__big').should("contain", "10");
  });
});
describe('Two special operators', function () {
  it('Should not allow two special operators on a number', function () {
    // Arrange
    cy.visit('http://127.0.0.1:5500/index.html'); // Act

    cy.get('#nine').click();
    cy.get('#squared').click();
    cy.get('#squared').click(); // Assert

    cy.on('window:alert', function (text) {
      expect(text).to.contains("You currently can't have 2 special operators on a number.");
    });
  });
});
describe('Clicking LTR/BODMAS button', function () {
  it('Should alert to use above button instead', function () {
    // Arrange
    cy.visit('http://127.0.0.1:5500/index.html'); // Act

    cy.get('#bodmasOrLtr').click(); // Assert

    cy.on('window:alert', function (text) {
      expect(text).to.contains("Please use the button above to change type.");
    });
  });
});
describe('Special operator order', function () {
  it('Should alert to click numbers before special operator', function () {
    // Arrange
    cy.visit('http://127.0.0.1:5500/index.html'); // Act

    cy.get('#squared').click(); // Assert

    cy.on('window:alert', function (text) {
      expect(text).to.contains("You have to input the number before the special operator.");
    });
  });
});
describe('Check closing bracket', function () {
  it('Should alert to click opening bracket before closing bracket', function () {
    // Arrange
    cy.visit('http://127.0.0.1:5500/index.html'); // Act

    cy.get('#zero').click();
    cy.get('#bracketRight').click(); // Assert

    cy.on('window:alert', function (text) {
      expect(text).to.contains("You need to put an opening bracket before a closing one.");
    });
  });
});
describe('Check opening bracket', function () {
  it('Should alert that only one set of brackets can be open at a time', function () {
    // Arrange
    cy.visit('http://127.0.0.1:5500/index.html'); // Act

    cy.get('#zero').click();
    cy.get('#bracketLeft').click();
    cy.get('#plus').click();
    cy.get('#zero').click();
    cy.get('#bracketLeft').click(); // Assert

    cy.on('window:alert', function (text) {
      expect(text).to.contains("You cannot have brackets within each other currently.");
    });
  });
});
describe('Check did not end on an operator', function () {
  it('Should alert the numbers and operators dont match', function () {
    // Arrange
    cy.visit('http://127.0.0.1:5500/index.html'); // Act

    cy.get('#five').click();
    cy.get('#plus').click();
    cy.get('#equal').click(); // Assert

    cy.on('window:alert', function (text) {
      expect(text).to.contains("Please ensure the amount of operations and numbers match up!");
    });
  });
});
describe('BODMAS test', function () {
  it('Should change calculator to BODMAS rather than LTR', function () {
    // Arrange
    cy.visit('http://127.0.0.1:5500/index.html'); // Act

    cy.get('#changeToBodmas').click();
    cy.get('#five').click();
    cy.get('#plus').click();
    cy.get('#six').click();
    cy.get('#multiply').click();
    cy.get('#seven').click();
    cy.get('#equal').click(); // Assert

    cy.get('#output__big').should("contain", "47");
  });
});
describe('LTR from BODMAS test', function () {
  it('Should change calculator to LTR from BODMAS', function () {
    // Arrange
    cy.visit('http://127.0.0.1:5500/index.html'); // Act

    cy.get('#changeToBodmas').click();
    cy.get('#changeToBodmas').click();
    cy.get('#five').click();
    cy.get('#plus').click();
    cy.get('#six').click();
    cy.get('#multiply').click();
    cy.get('#seven').click();
    cy.get('#equal').click(); // Assert

    cy.get('#output__big').should("contain", "77");
  });
});
describe('Reciprocal test', function () {
  it('Should calculate the reciprocal of a number', function () {
    // Arrange
    cy.visit('http://127.0.0.1:5500/index.html'); // Act

    cy.get('#two').click();
    cy.get('#reciprocal').click();
    cy.get('#equal').click(); // Assert

    cy.get('#output__big').should("contain", "0.5");
  });
});
describe('Factorial test', function () {
  it('Should calculate the factorial of a number', function () {
    // Arrange
    cy.visit('http://127.0.0.1:5500/index.html'); // Act

    cy.get('#five').click();
    cy.get('#factorial').click();
    cy.get('#equal').click(); // Assert

    cy.get('#output__big').should("contain", "120");
  });
});
describe('Memory test', function () {
  it('Should store and return memory value', function () {
    // Arrange
    cy.visit('http://127.0.0.1:5500/index.html'); // Act

    cy.get('#five').click();
    cy.get('#memoryPlus').click();
    cy.get('#remove').click();
    cy.get('#seven').click();
    cy.get('#plus').click();
    cy.get('#memoryRecall').click();
    cy.get('#equal').click(); // Assert

    cy.get('#output__big').should("contain", "12");
  });
});
describe('Memory clear test', function () {
  it('Should clear memory value', function () {
    // Arrange
    cy.visit('http://127.0.0.1:5500/index.html'); // Act

    cy.get('#five').click();
    cy.get('#memoryPlus').click();
    cy.get('#remove').click();
    cy.get('#memoryMinus').click();
    cy.get('#seven').click();
    cy.get('#plus').click();
    cy.get('#memoryRecall').click();
    cy.get('#equal').click(); // Assert

    cy.get('#output__big').should("contain", "7");
  });
});
describe('Exponent test', function () {
  it('Should calculate e^number', function () {
    // Arrange
    cy.visit('http://127.0.0.1:5500/index.html'); // Act

    cy.get('#two').click();
    cy.get('#exponent').click();
    cy.get('#equal').click(); // Assert

    cy.get('#output__big').should("contain", "7.389");
  });
});
describe('10th Order test', function () {
  it('Should calculate 10^number', function () {
    // Arrange
    cy.visit('http://127.0.0.1:5500/index.html'); // Act

    cy.get('#two').click();
    cy.get('#tenOrder').click();
    cy.get('#equal').click(); // Assert

    cy.get('#output__big').should("contain", "100");
  });
});