# NodeMasterClass-02
Node.js Master Class Homework Assignment #2

# Pizza Delivery API #

This api serves as the backend for a pizza delivery company. It allows users to be created, edited and deleted. Those users can add, remove and edit items from their shopping cart and then place an order by checking out. The api integrates with the stripe.com api and the mailgun api to accept payments and email receipts.

## Testing the API ##

Before you can place an order you will need to add some information to the config.js file. Open the config.js file for editing and fill in the areas between the `<>` symbols with your stripe.com and mailgun credentials.

### Create a user ###

**Path:** /users  
**Method:** POST  
**Body Example:**

```json
{
  "firstName" : "Abe",
  "lastName" : "Lincoln",
  "phone" : 9991234567,
  "email" : "<use an email that your mailgun account will send to>",
  "address" : "1860 Blue St, Gettysburg, PA 12345",
  "password" : "4Score7Years",
  "tosAgreement" : true
}
```

### Get a Token ###

**Path:** /tokens  
**Method:** POST  
**Body Example:**

```json
{
  "phone" : 9991234567,
  "password" : "4Score7Years"
}
```

### Get menu items ###

**Path:** /menu  
**Method:** GET  
*no parameters required*

### Add items to cart ###

**Path:** /carts/items/add  
**Method:** PUT  
**Required:** token key in header with valid token value returned by the earlier post to /tokens

**Body Example:**

```json
{
  "phone" : 9991234567,
  "menuItemId" : "22q43gbfxiccf86t94xb",
  "quantity" : 2
}
```

### Place Order ###

**Path:** /orders  
**Method:** POST  
**Required:** token key in header with valid token value returned by the earlier post to /tokens

**Body Example:**

```json
{
  "phone" : 9991234567
}
```


# API Documentation #

## Routes ##

### /users ###

**Allowable methods:** POST, GET, PUT, DELETE  

**[POST]**:
  Parameters:  
  - firstName *string* (required)
  - lastName *string* (required)  
  - phone *number* (required 10 digits)  
  - email *string* (required)  
  - address *string* (required)
  - password *string* (required)  

**[GET]**:
  Parameters:   
  - phone *number* (required 10 digits)  
  Required header keys:
  - token

**[PUT]**:
  Parameters:  
  - firstName *string* (optional)
  - lastName *string* (required)  
  - phone *number* (optional)  
  - email *string* (optional)  
  - address *string* (optional)
  - password *string* (optional)  
  *at least one optional parameter must be supplied  
  Required header keys:
  - token
