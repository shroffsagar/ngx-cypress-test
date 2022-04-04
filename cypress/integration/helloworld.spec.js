/// <reference types="cypress" />

describe('Test Suite', () => {

    beforeEach('Open the forms page', () => {
       cy.visit('/')
    })

    it('My scratch pad', () => {      
       cy.contains('Forms').click()
       cy.contains('Form Layouts').click()  
        //1
        cy.contains('nb-card','Using the Grid')
          .contains('label','Email')
          .should('have.text','Email');
        //2
        cy.contains('nb-card','Using the Grid')
          .contains('label', 'Email')
          .then( emailField => {
            expect(emailField.text()).to.equal('Email')
        })
        //3
        cy.contains('nb-card','Using the Grid')
          .contains('label', 'Email')
          .invoke('text')
          .then(textVal =>{
            expect(textVal).to.equal('Email')
          })
        //4 
        cy.contains('nb-card','Basic form')
          .contains('nb-checkbox', 'Check me out')
          .click()
          .find('.custom-checkbox')
          .should('have.attr','class')
          .and('match',/checked/)
        //5
        cy.contains('nb-card','Basic form')
          .contains('nb-checkbox', 'Check me out')
          .click()
          .click()
          .find('.custom-checkbox')
          .invoke('attr', 'class')
          .then(classVal => {
            expect(classVal).to.contain('checked')
          })
        //6
        cy.contains('Datepicker').click()
        cy.get('[placeholder="Form Picker"]').then(input => {
          cy.wrap(input).click()
          cy.contains('nb-calendar-day-cell', '12').click()
          cy.wrap(input).should('have.value', 'Apr 12, 2022')
          cy.wrap(input).invoke('prop', 'value').then(actValue => {
            expect(actValue).to.equal('Apr 12, 2022')
          })
        })
        //7
        cy.contains('Form Layouts').click()  
        cy.contains('nb-card', 'Using the Grid').then(panel => {
          cy.wrap(panel)
            .contains('nb-radio', 'Option 1')
            .find('input').check({'force':true}).should('be.checked')
          cy.wrap(panel).contains('nb-radio', 'Option 2')
            .find('input').check({'force':true}).should('be.checked')
        })

    })
})