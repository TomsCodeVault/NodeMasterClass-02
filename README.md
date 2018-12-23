# NodeMasterClass-02
Node.js Master Class Homework Assignment #2

# Pizza Delivery API #

This api serves as the backend for a pizza delivery company. I allows users to be created, edited and deleted. Those users can add, remove and edit items from their shopping cart and then place an order by checking out. The api integrates with the stripe.com api and the mailgun api to accept payments and email receipts.

## Testing the API ##

### Create a user ###

**Pate:** /users
**Method:** POST
**Body:**
```json
{
  'firstName' : 'Abe',
  'lastName' : 'Lincoln',
  'phone' : 8881231234,
  'email' : 'abe@lincoln.com',
  'address' : '100 Main Street, Gettysburg, PA 11111',
  'tosAgreement' : true
}

## API Documentation ##
