# Lacerna

## Summary
A demo e-commerce site mimicking real-life online stores, developed with ReactJs and NodeJs.

## Live Demo
Link: https://lacerna.yuncyang.com

## Current Feature List
- General
  - Use ReactJs as the main framework.
  - Use React Router for the navigation between different components.
  - Use Redux and React Redux to store the states that are shared between components.
  - Use Bcrypt to hash the password for sign in/ sign up.
- Home
  - A carousel on top showcasing the current most popular, a newly added, and a randomly picked product.
  - A "What's New" section showing 3 product that were most recently added to database.
  - User can find the specific product page using the link on the home page.
- Product
  - User can view all the products on the product page.
  - Through header and side menu, user can search for individual products, or view multiple products of the same category on this page.
  - User can choose a specific product and see its detail.
  - User can customize the quantity, size of a product, and add it to the cart.
- Cart
  - User can view the current products in their cart.
  - User can change the quantity of existing products, or remove the product entirely in the cart.
  - User can use the checkout page to fill out their personal information, mimicking real-life checkout process.
- Account
  - User can view the entire store, add product cart and checkout, either as a logged in user or as a visitor without an account.
  - User can sign up for a new account, or sign in if they already have an existing account.
  - If a user with a existing account browse the store as a visitor, and added products to a new cart, when the user sign in, the cart will be merged into their cart tied to their account.
- Header
  - User can search for specific product using the search icon. User can search for a product using only fragments of the entire product name as long as the fragment is correct.
  - User can navigate to the product and cart page using respective icons.
  - User can sign in/ sign out using the account icon.
- Side menu
  - User can browse different categories of products using the side menu.
  - User can sign in/ sign out using the link in the side menu.
- Footer
  - User can navigate the store using the site links in the footer.

## Technologies Used
- ReactJs
- NodeJs
- ExpressJs
- React Router
- Redux / React Redux
- PostgreSQL
- Webpack
- Babel
- Sass
- HTML5
- CSS3
- AWS EC2

## Development
### System Requirements
- NodeJs 10 or higher
- NPM 6 or higher
- PostgreSQL 10 or higher

### Getting Started
1. Clone the repository
  ```
  git clone https://github.com/YunCYang/lacerna
  cd lacerna
  ```
2. Install all dependencies with NPM
  ```
  npm install
  ```
3. Import the example database to PostrgeSQL
  ```
  npm run db:import
  ```
4. Start the project. You can view the running application by opening http://localhost:3000 in your browser.
  ```
  npm run dev
  ```
