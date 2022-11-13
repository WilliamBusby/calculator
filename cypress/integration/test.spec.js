describe('Visit test', () => {
  it('Visits my calculator page', () => {
    cy.visit('http://127.0.0.1:5500/index.html')
  })
})

describe('Addition test', () => {
  it('Adds two plus seven equals nine', () => {

    // Arrange
    cy.visit('http://127.0.0.1:5500/index.html')

    // Act
    cy.get('#two').click();
    cy.get('#plus').click();
    cy.get('#seven').click();
    cy.get('#equal').click();

    // Assert
    cy.get('#output__big').should("contain", "9");
  })
  it('Adds minus two plus seven equals nine', () => {

    // Arrange
    cy.visit('http://127.0.0.1:5500/index.html')

    // Act
    cy.get('#two').click();
    cy.get('#plusMinus').click();
    cy.get('#plus').click();
    cy.get('#seven').click();
    cy.get('#equal').click();

    // Assert
    cy.get('#output__big').should("contain", "5");
  })
})

describe('Multiplication test', () => {
  it('Multiplies three and five equals 15', () => {

    // Arrange
    cy.visit('http://127.0.0.1:5500/index.html')

    // Act
    cy.get('#three').click();
    cy.get('#multiply').click();
    cy.get('#five').click();
    cy.get('#equal').click();

    // Assert
    cy.get('#output__big').should("contain", "15");
  })
})

describe('Subtraction test', () => {
  it('Subtract eight - one equals seven', () => {

    // Arrange
    cy.visit('http://127.0.0.1:5500/index.html')

    // Act
    cy.get('#eight').click();
    cy.get('#minus').click();
    cy.get('#one').click();
    cy.get('#equal').click();

    // Assert
    cy.get('#output__big').should("contain", "7");
  })
})

describe('Divide test', () => {
  it('Divide six by four equal 1.5', () => {

    // Arrange
    cy.visit('http://127.0.0.1:5500/index.html')

    // Act
    cy.get('#six').click();
    cy.get('#divide').click();
    cy.get('#four').click();
    cy.get('#equal').click();

    // Assert
    cy.get('#output__big').should("contain", "1.5");
  })
})

describe('Divide 0 test', () => {
  it('Divide nine by zero should alert', () => {

    // Arrange
    cy.visit('http://127.0.0.1:5500/index.html')

    // Act
    cy.get('#nine').click();
    cy.get('#divide').click();
    cy.get('#zero').click();
    cy.get('#equal').click();

    // Assert
    cy.on('window:alert', (text) => {
      expect(text).to.contains("Can't divide by 0!");
    });
  })
})

describe('Clear test', () => {
  it('CE should clear everything', () => {

    // Arrange
    cy.visit('http://127.0.0.1:5500/index.html')

    // Act
    cy.get('#six').click();
    cy.get('#divide').click();
    cy.get('#four').click();
    cy.get('#remove').click();

    // Assert
    cy.get('#output__big').should("contain", "0");
    cy.get('#output__small').should("contain", "");
  })
})

describe('Plus/minus test', () => {
  it('Should add "-" to current number shown', () => {

    // Arrange
    cy.visit('http://127.0.0.1:5500/index.html')

    // Act
    cy.get('#nine').click();
    cy.get('#plusMinus').click();

    // Assert
    cy.get('#output__big').should("contain", "-9");
  })
})

describe('Multiple plus/minus test', () => {
  it('Repeatedly clicking plus/minus should only show one or zero "-"', () => {

    // Arrange
    cy.visit('http://127.0.0.1:5500/index.html')

    // Act
    cy.get('#nine').click();
    cy.get('#plusMinus').click();
    cy.get('#plusMinus').click();
    cy.get('#plusMinus').click();
    cy.get('#plusMinus').click();
    cy.get('#plusMinus').click();
    cy.get('#plusMinus').click();
    cy.get('#plusMinus').click();
    cy.get('#plus').click();

    // Assert
    cy.get('#output__small').should("contain", "-9+");
    cy.get('#output__big').should("contain", "-9");
  })
})

describe('Percentage test', () => {
  it('Should divide current number by 100', () => {

    // Arrange
    cy.visit('http://127.0.0.1:5500/index.html')

    // Act
    cy.get('#nine').click();
    cy.get('#percent').click();

    // Assert
    cy.get('#output__big').should("contain", "0.09");
  })
})

describe('Squared test', () => {
  it('Should output number squared', () => {

    // Arrange
    cy.visit('http://127.0.0.1:5500/index.html')

    // Act
    cy.get('#five').click();
    cy.get('#squared').click();
    cy.get('#equal').click();

    // Assert
    cy.get('#output__big').should("contain", "25");
  })
})

describe('Squared number after test', () => {
  it('Should not allow number to be used after squared', () => {

    // Arrange
    cy.visit('http://127.0.0.1:5500/index.html')

    // Act
    cy.get('#nine').click();
    cy.get('#squared').click();
    cy.get('#nine').click();

    // Assert
    cy.on('window:alert', (text) => {
      expect(text).to.contains("You cannot put a number after a special operator.");
    });
  })
})

describe('Two decimal points', () => {
  it('Should not allow two decimal points in a number', () => {

    // Arrange
    cy.visit('http://127.0.0.1:5500/index.html')

    // Act
    cy.get('#nine').click();
    cy.get('#decimal').click();
    cy.get('#decimal').click();

    // Assert
    cy.on('window:alert', (text) => {
      expect(text).to.contains("You can't have two decimal points in one number.");
    });
  })
})

describe('Cubed test', () => {
  it('Should output number cubed', () => {

    // Arrange
    cy.visit('http://127.0.0.1:5500/index.html')

    // Act
    cy.get('#five').click();
    cy.get('#cubed').click();
    cy.get('#equal').click();

    // Assert
    cy.get('#output__big').should("contain", "125");
  })
})

describe('Square root test', () => {
  it('Should output number square rooted', () => {

    // Arrange
    cy.visit('http://127.0.0.1:5500/index.html')

    // Act
    cy.get('#one').click();
    cy.get('#zero').click();
    cy.get('#zero').click();
    cy.get('#squareRoot').click();
    cy.get('#equal').click();

    // Assert
    cy.get('#output__big').should("contain", "10");
  })
})

describe('Two special operators', () => {
  it('Should not allow two special operators on a number', () => {

    // Arrange
    cy.visit('http://127.0.0.1:5500/index.html')

    // Act
    cy.get('#nine').click();
    cy.get('#squared').click();
    cy.get('#squared').click();

    // Assert
    cy.on('window:alert', (text) => {
      expect(text).to.contains("You currently can't have 2 special operators on a number.");
    });
  })
})

describe('Clicking LTR/BODMAS button', () => {
  it('Should alert to use above button instead', () => {

    // Arrange
    cy.visit('http://127.0.0.1:5500/index.html')

    // Act
    cy.get('#bodmasOrLtr').click();

    // Assert
    cy.on('window:alert', (text) => {
      expect(text).to.contains("Please use the button above to change type.");
    });
  })
})

describe('Special operator order', () => {
  it('Should alert to click numbers before special operator', () => {

    // Arrange
    cy.visit('http://127.0.0.1:5500/index.html')

    // Act
    cy.get('#squared').click();

    // Assert
    cy.on('window:alert', (text) => {
      expect(text).to.contains("You have to input the number before the special operator.");
    });
  })
})

describe('Check closing bracket', () => {
  it('Should alert to click opening bracket before closing bracket', () => {

    // Arrange
    cy.visit('http://127.0.0.1:5500/index.html')

    // Act
    cy.get('#zero').click();
    cy.get('#bracketRight').click();

    // Assert
    cy.on('window:alert', (text) => {
      expect(text).to.contains("You need to put an opening bracket before a closing one.");
    });
  })
})

describe('Check opening bracket', () => {
  it('Should alert that only one set of brackets can be open at a time', () => {

    // Arrange
    cy.visit('http://127.0.0.1:5500/index.html')

    // Act
    cy.get('#zero').click();
    cy.get('#bracketLeft').click();
    cy.get('#plus').click();
    cy.get('#zero').click();
    cy.get('#bracketLeft').click();

    // Assert
    cy.on('window:alert', (text) => {
      expect(text).to.contains("You cannot have brackets within each other currently.");
    });
  })
})

describe('Check did not end on an operator', () => {
  it('Should alert the numbers and operators dont match', () => {

    // Arrange
    cy.visit('http://127.0.0.1:5500/index.html')

    // Act
    cy.get('#five').click();
    cy.get('#plus').click();
    cy.get('#equal').click();

    // Assert
    cy.on('window:alert', (text) => {
      expect(text).to.contains("Please ensure the amount of operations and numbers match up!");
    });
  })
})

describe('BODMAS test', () => {
  it('Should change calculator to BODMAS rather than LTR', () => {

    // Arrange
    cy.visit('http://127.0.0.1:5500/index.html')

    // Act
    cy.get('#changeToBodmas').click();
    cy.get('#five').click();
    cy.get('#plus').click();
    cy.get('#six').click();
    cy.get('#multiply').click();
    cy.get('#seven').click();
    cy.get('#equal').click();

    // Assert
    cy.get('#output__big').should("contain", "47");
  })
})

describe('LTR from BODMAS test', () => {
  it('Should change calculator to LTR from BODMAS', () => {

    // Arrange
    cy.visit('http://127.0.0.1:5500/index.html')

    // Act
    cy.get('#changeToBodmas').click();
    cy.get('#changeToBodmas').click();
    cy.get('#five').click();
    cy.get('#plus').click();
    cy.get('#six').click();
    cy.get('#multiply').click();
    cy.get('#seven').click();
    cy.get('#equal').click();

    // Assert
    cy.get('#output__big').should("contain", "77");
  })
})

describe('Reciprocal test', () => {
  it('Should calculate the reciprocal of a number', () => {

    // Arrange
    cy.visit('http://127.0.0.1:5500/index.html')

    // Act
    cy.get('#two').click();
    cy.get('#reciprocal').click();
    cy.get('#equal').click();

    // Assert
    cy.get('#output__big').should("contain", "0.5");
  })
})

describe('Factorial test', () => {
  it('Should calculate the factorial of a number', () => {

    // Arrange
    cy.visit('http://127.0.0.1:5500/index.html')

    // Act
    cy.get('#five').click();
    cy.get('#factorial').click();
    cy.get('#equal').click();

    // Assert
    cy.get('#output__big').should("contain", "120");
  })
})

describe('Memory test', () => {
  it('Should store and return memory value', () => {

    // Arrange
    cy.visit('http://127.0.0.1:5500/index.html')

    // Act
    cy.get('#five').click();
    cy.get('#memoryPlus').click();
    cy.get('#remove').click();
    cy.get('#seven').click();
    cy.get('#plus').click();
    cy.get('#memoryRecall').click();
    cy.get('#equal').click();

    // Assert
    cy.get('#output__big').should("contain", "12");
  })
})

describe('Memory clear test', () => {
  it('Should clear memory value', () => {

    // Arrange
    cy.visit('http://127.0.0.1:5500/index.html')

    // Act
    cy.get('#five').click();
    cy.get('#memoryPlus').click();
    cy.get('#remove').click();
    cy.get('#memoryMinus').click();
    cy.get('#seven').click();
    cy.get('#plus').click();
    cy.get('#memoryRecall').click();
    cy.get('#equal').click();

    // Assert
    cy.get('#output__big').should("contain", "7");
  })
})

describe('Exponent test', () => {
  it('Should calculate e^number', () => {

    // Arrange
    cy.visit('http://127.0.0.1:5500/index.html')

    // Act
    cy.get('#two').click();
    cy.get('#exponent').click();
    cy.get('#equal').click();

    // Assert
    cy.get('#output__big').should("contain", "7.389");
  })
})

describe('10th Order test', () => {
  it('Should calculate 10^number', () => {

    // Arrange
    cy.visit('http://127.0.0.1:5500/index.html')

    // Act
    cy.get('#two').click();
    cy.get('#tenOrder').click();
    cy.get('#equal').click();

    // Assert
    cy.get('#output__big').should("contain", "100");
  })
})