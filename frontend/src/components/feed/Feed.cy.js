import Feed from './Feed'
const navigate = () => {}

describe("Feed", () => {
  it("Calls the /posts endpoint and lists all the posts", () => {
    window.localStorage.setItem("token", "fakeToken")
    
    cy.intercept('GET', '/posts', (req) => {
        req.reply({
          statusCode: 200,
          body: { posts: [
            {_id: 1, message: "Hello, world", likedByUsers: []},
            {_id: 2, message: "Hello again, world", likedByUsers: []}
          ] }
        })
      }
    ).as("getPosts")

    cy.mount(<Feed navigate={navigate}/>)
    
    cy.wait("@getPosts").then(() =>{
      cy.get('[data-cy="post"]')
      .should('contain.text', "Hello, world")
      .and('contain.text', "Hello again, world")
    })
  })

  it("Calls post /posts endpoint when submitting the new post form", () => {
    window.localStorage.setItem("token", "fakeToken")
    cy.mount(<Feed navigate={navigate}/>)

    cy.intercept('POST', 'posts', {message: "OK"}).as("postPosts")

    cy.get("#message").type("Making a post");
    cy.get("#submit").click();
    cy.wait('@postPosts').then( interception => {
      expect(interception.response.body.message).to.eq("OK")
    })
  })
})
