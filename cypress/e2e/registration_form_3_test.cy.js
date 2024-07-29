beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_3.html')
})

/*
BONUS TASK: add visual tests for registration form 3
Task list:
* Create test suite for visual tests for registration form 3 (describe block)
* Create tests to verify visual parts of the page:
    * radio buttons and its content
    * dropdown and dependencies between 2 dropdowns:
        * list of cities changes depending on the choice of country
        * if city is already chosen and country is updated, then city choice should be removed
    * checkboxes, their content and links
    * email format
 */
describe('Section 1: Visual tests', () => {

    it('Check radio buttons', () => {

        // Array of found elements with given selector has 4 elements in total
        cy.get('input[type="radio"]').should('have.length', 4)

        // Verify labels of the radio buttons
        cy.get('input[type="radio"]').next().eq(0).should('have.text', 'Daily')
        cy.get('input[type="radio"]').next().eq(1).should('have.text', 'Weekly')
        cy.get('input[type="radio"]').next().eq(2).should('have.text', 'Monthly')
        cy.get('input[type="radio"]').next().eq(3).should('have.text', 'Never')

        //Verify default state of radio buttons
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
        cy.get('input[type="radio"]').eq(1).should('not.be.checked')
        cy.get('input[type="radio"]').eq(2).should('not.be.checked')
        cy.get('input[type="radio"]').eq(3).should('not.be.checked')

        // Selecting one will remove selection from the other radio button
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')

    })

    it('Check Country dropdown', () => {

        cy.get('#country').find('option').should('have.length', 4)

        cy.get('#country').find('option').eq(0).should('have.text', '')
        cy.get('#country').find('option').eq(1).should('have.text', 'Spain')
        cy.get('#country').find('option').eq(2).should('have.text', 'Estonia')
        cy.get('#country').find('option').eq(3).should('have.text', 'Austria')

        // City dropdown content, list of cities changes depending on the choice of country

        cy.get('#country').select('')
        cy.get('#city').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq([''])
        })

        cy.get('#country').select('Spain')
        cy.get('#city').children('option').each($option => {
            if ($option.val() === '' || $option.val() === 'Corralejo') {
                expect($option).to.be.visible
            }
        })

        cy.get('#country').select('Estonia')
        cy.get('#city').children('option').each($option => {
            if ($option.val() === '' || $option.val() === 'Tartu') {
                expect($option).to.be.visible
            }
        })

        cy.get('#country').select('Austria')
        cy.get('#city').children('option').each($option => {
            if ($option.val() === '' || $option.val() === 'Innsbruk') {
                expect($option).to.be.visible
            }
        })
    })

    it('should update the city dropdown based on the selected country and clear the city choice when the country is updated', () => {
        // Select Spain in the country dropdown
        cy.get('#country').select('Spain')

        // Select a city
        cy.get('#city').select('Valencia')

        // Change the country to Austria
        cy.get('#country').select('Austria')

        // Verify that the city dropdown only shows Austria cities
        cy.get('#city').children('option').each($option => {
            const country = $option.data('country')
            if (country === 'Austria') {
                expect($option).to.be.visible
            }
        })
    })

})

/*
BONUS TASK: add functional tests for registration form 3
Task list:
* Create second test suite for functional tests
* Create tests to verify logic of the page:
    * all fields are filled in + corresponding assertions
    * only mandatory fields are filled in + corresponding assertions
    * mandatory fields are absent + corresponding assertions (try using function)
    * add file functionlity(google yourself for solution!)
 */

/* 
describe('Section 2: Functional tests', () => {

    it('All fields are filled in + corresponding assertions', () => {
        inputValidData()
        

    })

})

 function inputValidData(
    name = 'Lux Valkranso',
    email = 'bernardhose@gmail.com'
) {
    cy.get('input#name').type(name)
    cy.get('input[name="email"]').type(email)
} 
*/