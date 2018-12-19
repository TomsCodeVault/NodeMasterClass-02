/*
 * Helpers for various tasks
 *
 */

// Dependencies
var crypto = require('crypto');
var config = require('./config');
var https = require('https');
var querystring = require('querystring');
var StringDecoder = require('string_decoder').StringDecoder;

// Container for all the Helpers
var helpers = {};

// Create a SHA256 hash
helpers.hash = function(str){
  if(typeof(str) == 'string' && str.length > 0){
    var hash = crypto.createHmac('sha256',config.hashingSecret).update(str).digest('hex');
    return hash;
  } else {
    return false;
  }
};

// Parse a json string to an object in all cases without throwing
helpers.parseJsonToObject = function(str){
  try{
    var obj = JSON.parse(str);
    return obj;
  } catch(e){
    return {};
  }
};

// Create a string of random alphanumeric characters of a given length
helpers.createRandomString = function(strLength){
  strLength = typeof(strLength) == 'number' && strLength > 0 ? strLength : false;
  if(strLength){
    // Define all the possible characters that could be used to construct the string
    var possibleCharacters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    // Start the final string
    var str = '';
    for(i = 1; i <= strLength; i++){
      // Get a random character from the possibleCharacters string
      var randomCharacter = possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
      // Append this character to the final string
      str+=randomCharacter;
    }

    // Return the final string
    return str;
  } else {
    return false;
  }
};

// Test for empty object
helpers.isEmpty = function isEmpty(obj) {
    for(var key in obj) {
        return Object.keys(obj).indexOf(key) === -1;
    }
    return true;
}

// Process credit card payments using the Stripe.com api
// Require data: amount, orderId, token, source
// Optional data: currency, description
helpers.processPayment = function(data,callback){
  var amount = typeof(data.amount) == 'number' && data.amount > 0 ? data.amount : false;
  var currency = typeof(data.currency) == 'string' && data.currency.trim().length === 3 ? data.currency.trim() : false;
  if(!currency) currency = 'USD'; // use usd as default currency
  var token = typeof(data.token) == 'string' && data.token.trim().length > 0 ? data.token : false;
  var orderId = typeof(data.orderId) == 'number' && data.orderId > 0 ? data.orderId : false;
  var description = typeof(data.description) == 'string' && data.description.trim().length > 0 ? data.description.trim() : '';
  var source = typeof(data.source) == 'string' && data.source.trim().length > 0 ? data.source.trim() : false;
  console.log(amount+' - '+token+' - '+source);
  // Check for all required data
  if(amount && currency && token && orderId && source) {
    // Create the request payload
    var payload = {
      'amount' : amount,
      'currency' : currency,
      'source' : source,
      'description' : description,
      'metadata[order_id]' : orderId
    };
    var stringPayload = querystring.stringify(payload);

    // Create the request details
    var requestDetails = {
      'protocol' : 'https:',
      'hostname' : 'api.stripe.com',
      'path' : '/v1/charges',
      'method' : 'POST',
      'auth' : token,
      'headers' : {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Content-Length' : Buffer.byteLength(stringPayload)
      }
    };

    // Instantiate the request
    var req = https.request(requestDetails,function(res){
      // Get the status of the sent request
      var status = res.statusCode;
      var buffer = '';
      var decoder = new StringDecoder('utf-8');

      res.on('data',function(chunk){
        buffer += decoder.write(chunk);
      });

      res.on('end',function(){
        buffer += decoder.end();
        // Callback false (no error) if successful or send message with status code if not
        if(status == 200 || status == 201){
          callback(buffer);
        } else {
          callback('Status code returned was: '+status);
        }
      });
    });


    // Bind to error code so error doesn't get thrown
    req.on('error',function(e){
      callback(e);
    });

    // Add the payload to the request
    req.write(stringPayload);

    // End/send the request
    req.end();

  } else {
    callback('Missing or invalid parameters');
  }
};


// Export this module
module.exports = helpers;