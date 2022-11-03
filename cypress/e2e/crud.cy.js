/// <reference types="cypress" />
context('CRUD e2e test', function () {
    beforeEach(function () {
        this.data = {
            books: [],
            authors:[]
        }
        cy.request('GET', `${Cypress.env('api_url')}/books`).then(
            function(response) {
                console.log(response.body)
                this.data.books = response.body
            }
        )

        cy.request('GET', `${Cypress.env('api_url')}/authors`).then(
            function(response) {
                this.data.authors = response.body
            }
        )
        cy.visit("/")
    })

    // list
    it("Should show all the books in list page",function () {
        // click list menu link
        cy.get('#menu a').contains("List").click()
        // check table exist
        cy.get('#table').should('be.visible')

        cy.get('#table tbody tr').each((row, index) => {
            const title = row.find("td:eq(0)").text()
            const titleLink = row.find("td:eq(0) a").attr("href")
            // check title
            expect(title).to.eq(this.data.books[index].title)
            // check link href
            expect(titleLink).to.eq("/detail/" + this.data.books[index].id)
            const author = row.find("td:eq(1)").text()
            // check author
            expect(author).to.eq(this.data.books[index].author.name)
            const year = row.find("td:eq(2)").text()
            // check year
            expect(year).to.eq(this.data.books[index].year.toString())
            // check update link
            const updateLink = row.find("td:eq(3) a").attr("href")
            expect(updateLink).to.eq("/update/" + this.data.books[index].id)
            // check delete button
            const deleteButton = row.find("td:eq(4) button")
            expect(deleteButton.text()).to.eq("Delete")
        })
    })

    // detail
    it("Should show a book detail",function () {
        // arrange
        const singleBook = this.data.books[9]
        const detailUrl = "/detail/" + singleBook.id

        // act
        cy.visit(detailUrl);

        //assert
        cy.get("#detail-page ul li:eq(0)").should("have.text","Id: " +  singleBook.id)
        cy.get("#detail-page ul li:eq(1)").should("have.text","Title: " +  singleBook.title)
        cy.get("#detail-page ul li:eq(2)").should("have.text","Year: " +  singleBook.year)
        cy.get("#detail-page ul li:eq(3)").should("have.text","Author: " +  singleBook.author.name)
    });


    // add
    it("Should add a new book",function () {

        const newBook = {
            title: "New book title",
            year: 2005,
            author: this.data.authors[3]
        }
        cy.visit("/create");

        cy.intercept("POST",`${Cypress.env('api_url')}/books`).as('create')

        cy.get("#title").type(newBook.title)
        cy.get("#author").select(newBook.author.name)
        cy.get("#year").select(newBook.year.toString())
        cy.get("button").click();
        cy.wait(5000)

        cy.get("@create").then((result) => {
            expect(result.response.statusCode).to.eq(201);
        })

        cy.get("#table tr:last-child td:eq(0)").should("have.text", newBook.title)
        cy.get("#table tr:last-child td:eq(1)").should("have.text", newBook.author.name)
        cy.get("#table tr:last-child td:eq(2)").should("have.text", newBook.year.toString())
    })

    // update
    it("Should update a book",function () {
        cy.intercept("PUT",`${Cypress.env('api_url')}/books/*`).as('update')
        const bookIndex = 21
        const book = this.data.books[bookIndex]
        const updatedBook = {
            title: "Updated book title",
            year: 2000,
            author: this.data.authors[20]
        }

        cy.visit("/update/" + book.id);

        cy.get("#title").clear().type(updatedBook.title)
        cy.get("#author").select(updatedBook.author.name)
        cy.get("#year").select(updatedBook.year.toString())
        cy.get("button").click();
        cy.wait(5000)

        cy.get("@update").then((result) => {
            expect(result.response.statusCode).to.eq(200);
        })

        cy.visit("/detail/" + book.id);

        cy.get("#detail-page ul li:eq(0)").should("have.text","Id: " +  book.id)
        cy.get("#detail-page ul li:eq(1)").should("have.text","Title: " +  updatedBook.title)
        cy.get("#detail-page ul li:eq(2)").should("have.text","Year: " +  updatedBook.year.toString())
        cy.get("#detail-page ul li:eq(3)").should("have.text","Author: " +  updatedBook.author.name)

    })

    // delete

    it("Should delete a book",function () {
        cy.intercept("DELETE",`${Cypress.env('api_url')}/books/*`).as('delete')
        // click list menu link
        cy.get('#menu a').contains("List").click()
        // click delete button
        cy.get('#table tbody tr:last-child td:eq(4) button').click();
        // click modal delete button
        cy.get("button[data-testid='delete-button']").click()

        cy.wait(5000)
        cy.get("@delete").then((result) => {
            expect(result.response.statusCode).to.eq(200);
        })
        // check book list length
        cy.get('#table tbody tr').should('have.length', this.data.books.length -1)
    })
})