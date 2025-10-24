const mongoose = require('mongoose');

   const userSchema = new mongoose.Schema({
     name: {
       type: String,
       required: true,
       trim: true
     },
     email: {
       type: String,
       required: true,
       unique: true,
       lowercase: true,
       trim: true
     },
     password: {
       type: String,
       required: true,
       minlength: 6
     },
     connectedAccounts: [{
       platform: String,
       accountId: String,
       accessToken: String,
       refreshToken: String,
       connectedAt: Date
     }],
     createdAt: {
       type: Date,
       default: Date.now
     }
   });

   module.exports = mongoose.model('User', userSchema);