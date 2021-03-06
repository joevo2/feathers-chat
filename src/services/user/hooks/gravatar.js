'use strict';

// src/services/user/hooks/gravatar.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

// MD5
const crypto = require('crypto');

// Gravatar image services
const gravatarURL = 'https:/s.gravatar.com/avatar';
// The size query. Our chat needs 60px images
const query = `s=60`;

// Returns a full URL to a Gravatar image for a given email address
const gravatarImage = email => {
  // Gravatar uses MD5 hashes from an email address to get the image
  const hash = crypto.createHash('md5').update(email).digest('hex');
  
  return `${gravatarUrl}/${hash}?${query}`;
}

module.exports = function(options) {
  return function(hook) {
    // Assign the new data with the Gravatar image
    hook.data = Object.assign({}, hook.data, {
      avatar: gravatarImage(hook.data.email)
    });
  };
};
