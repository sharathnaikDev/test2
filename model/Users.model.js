const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  firstName: {
        type : String,
        required: [true, 'Please add a firstName']    
    },
    lastName: String,
    email: {
      type: String,
      required: [true, 'Please add email'],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email'
      ]  
    },
    photo: String,
    role: {
        type: String,
        enum: ['user', "admin"],
        default: 'user'
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
        select: false
    },
    confirmPassword: {
      type: String,
      required: [true, 'Please add a password'],
      select: false,
      validator: function (el) {
        return el === this.password
      },
      massage: 'Passwords are not the same!'
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    createdAt: {
        type:Date,
        default: Date.now
    }
})


UserSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
      delete ret._id;
      delete ret.hash;
  }
});

// encrypt password using bcrypt
UserSchema.pre('save', async function(next){
  //only run if password was actually modified
  if(!this.isModified('password')) return next();
  // hash the password
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);

  // delete password confirm
  this.confirmPassword = undefined;
  next();
})

// sign JWT and Return
UserSchema.methods.getSignedJwtToken = function(){
    return jwt.sign({id:this._id}, process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE
    });
}

// Match user entered password to hashed password in database

UserSchema.methods.matchPassword = async function (enteredPassword){
  return await bcrypt.compare(enteredPassword, this.password);
};

//Generate and hash password token
UserSchema.methods.getResetPasswordToken =function (){
  // Generate token
  const resetToken = crypto.randomBytes(20).toString('hex');
  
  //Hash token and set to resetPasswordToken field

  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  // Set expire
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model('User', UserSchema)