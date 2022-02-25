it('sanity check',()=>{
    expect(3+5).to.equal(8)
})

describe('pizza form',()=>{
    beforeEach(()=>{
        cy.visit('localhost:3000')
    })

    it('button exists to go to order form',()=>{
        cy.get('a[id="order-pizza"]').click()
    })

    it('can add text to the box',()=>{
        cy.get('a[id="order-pizza"]').click()
        const nameInput = cy.get('input[id="name-input"]')
        nameInput.should('exist').type('Mr. Johnson')
    })
    it('can select multiple toppings',()=>{
        cy.get('a[id="order-pizza"]').click()
        cy.get('input[name=pepperoni]').click()
        cy.get('input[name=sausage]').click()
        cy.get('input[name=pineapple]').click()
        cy.get('input[name=cheese]').click()

    })
    it('can submit the order',()=>{
        cy.get('a[id="order-pizza"]').click()
        const nameInput = cy.get('input[id="name-input"]')
        nameInput.should('exist').type('Kanye')
        cy.get('input[name=pepperoni]').click()
        cy.get('input[name=sausage]').click()
        cy.get('select[id="size-dropdown"]').select('large')
        const submitBtn = cy.get('button[id="order-button"]')
        submitBtn.should('not.be.disabled')
        submitBtn.click()
    })
})