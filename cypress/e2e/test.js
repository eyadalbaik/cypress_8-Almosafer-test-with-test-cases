describe('Almosafer test', () => {
    it.skip('test1', () => {
        cy.visit("https://www.almosafer.com/en")

        cy.get('[data-testid="Header__LanguageSwitch"]').should('contain', 'العربية')

        cy.get('[data-testid="Header__CurrencySelector"]').should('contain', 'SAR')

        cy.get('.sc-dRFtgE').should('contain', '+966554400000')

        cy.get('.sc-ghsgMZ').should('be.visible')

        cy.get('#uncontrolled-tab-example-tab-hotels').should('have.attr', 'aria-selected').and('eql', 'false')

    });

    it.skip('flights test', () => {
        cy.visit("https://www.almosafer.com/en")

        const currenDate = new Date()
        const day = currenDate.getDate()

        const Depature = day + 1
        const Return = day + 2

        cy.get('[data-testid="FlightSearchBox__FromDateButton"]').should('contain', Depature)
        cy.get('[data-testid="FlightSearchBox__ToDateButton"]').should('contain', Return)

    });


    it('randomly change language', () => {
        cy.visit("https://www.almosafer.com/en")

        const website = ['https://www.almosafer.com/en', 'https://www.almosafer.com/ar']
        const language = Math.floor(Math.random() * website.length)

        cy.visit(website[language])


        cy.url().then(url => {

            const EnglishCities = ['Dubai', 'Jeddah', 'Riyadh']
            const ArabicCities = ['دبي', 'جدة']

            const en = Math.floor(Math.random() * EnglishCities.length)
            const ar = Math.floor(Math.random() * ArabicCities.length)

            const rooms = ['A', 'B']
            const randomRoom = Math.floor(Math.random() * rooms.length)

            if (url.includes('en')) {

                cy.get('[data-testid="Header__LanguageSwitch"]').should('contain', 'العربية')

                cy.get('#uncontrolled-tab-example-tab-hotels').click()

                cy.get('[data-testid="AutoCompleteInput"]').type(EnglishCities[en])
                cy.get('[data-testid="AutoCompleteResultItem0"]').click()
                cy.get('[data-testid="HotelSearchBox__ReservationSelect_Select"]').select(rooms[randomRoom])
                cy.get('[data-testid="HotelSearchBox__SearchButton"]').click()






                cy.get('[data-testid="HotelSearchResult__resultsFoundCount"]', { timeout: 20000 }).should('exist').should('be.visible').should('contain', "found");

               
                let prices = [];
                let lowestPrice, highestPrice;
                
                cy.get('.Price__Value').each((ele) => {
                  prices.push(parseInt(ele.text()));
                }).then(() => {
                  lowestPrice = prices[0];
                  highestPrice = prices[prices.length - 1];
                  
                  expect(highestPrice).to.be.greaterThan(lowestPrice);
                  console.log("lowestprice is"+lowestPrice)
                  console.log("highestPrice is"+highestPrice)

});




            } else if (url.includes('ar')) {

                cy.get('[data-testid="Header__LanguageSwitch"]').should('contain', 'English')

                cy.get('#uncontrolled-tab-example-tab-hotels').click()

                cy.get('[data-testid="AutoCompleteInput"]').type(ArabicCities[ar])
                cy.get('[data-testid="AutoCompleteResultItem0"]').click()
                cy.get('[data-testid="HotelSearchBox__ReservationSelect_Select"]').select(rooms[randomRoom])
                cy.get('[data-testid="HotelSearchBox__SearchButton"]').click()





               cy.get('[data-testid="HotelSearchResult__resultsFoundCount"]', { timeout: 20000 }).should('exist').should('be.visible').should('contain', "وجدنا");


                let prices = [];
                let lowestPrice, highestPrice;
                
                cy.get('.Price__Value').each((ele) => {
                  prices.push(parseInt(ele.text()));
                }).then(() => {
                  lowestPrice = prices[0];
                  highestPrice = prices[prices.length - 1];
                  
                  expect(highestPrice).to.be.greaterThan(lowestPrice);
                  console.log("lowestprice is"+lowestPrice)
                  console.log("highestPrice is"+highestPrice)

});



            }

        })

    });


});