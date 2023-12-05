
describe('Test the Main Login Screen', () => {
  beforeEach( () => {
    //visit the URL
    cy.visit('https://pana-sls.antk.co/login')
  })
  it('Login screen', () => {    
    //check the Panasonic img logo
    cy.get('.nav-logo').should('have.attr', 'src', '/img/logo-KTC.9b1be33a.png')

    //check all texts inside the login panel
    cy.get('.app-title').find('.middle').should('have.text', 'Smart Lighting Solution')
    cy.get('.v-form').find('div.login-label.login-col-3.col.col-3').eq(0).should('have.text', 'Username:')
    cy.get('.v-form').find('div.login-label.login-col-3.col.col-3').eq(1).should('have.text', 'Password:')

    //check the button
    cy.get('div.row.center.submit-row').should('have.text',' Login ')
    cy.get('button.button-login.login-hover.button-text').should('be.visible').should('be.enabled').click();

    //check the warning shows up when missing username
    cy.get('div.error-message.error-message-pink.error-message-size').should('have.text',' Username is required   ')
    //try to evoke the warning when missing password
    cy.get('.v-text-field__slot').find('input#input-14').click().type('Welcome123!').clear()
    //check the warning shows up when missing username/password
    cy.get('div.row.no-gutters').find('div.error-message.error-message-pink.error-message-size').eq(1).should('have.text',' Password is required ')


    //Try to input invalid username/password
    cy.get('.v-text-field__slot').find('input#input-11').click().type('quangminhhhhhhhhhh')
    //also check whether the password is concealed.     
    cy.get('.v-text-field__slot').find('input#input-14').click().type('Welcome123!').and('have.attr','type','password')
    cy.get('button.button-login.login-hover.button-text').click();
    cy.get('div.row.no-gutters').find('#error-text').should('have.text',' The username and /or password you entered is incorrect. Please try again. ')

    //Try to input valid username/password
    cy.get('.v-text-field__slot').find('input#input-11').clear().click().type('quangminh')
    //also check whether the password is concealed.     
    cy.get('.v-text-field__slot').find('input#input-14').clear().click().type('Welcome123!').and('have.attr','type','password')
    cy.get('button.button-login.login-hover.button-text').click();

    cy.request('GET','https://pana-sls.antk.co/login').then((response) =>{
    //Expecting the response status code to be 200
    expect(response.status).to.eq(200)
    })
    

    //
  })
}) 