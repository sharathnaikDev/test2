const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../model/Users.model');


// @desc    create/Register user
// @route   POST /api/v1/auth/register
// @access  private

exports.register = asyncHandler( async (req, res, next) => {
    const {firstName,lastName, email, password,confirmPassword, role} = req.body;

    const user = await User.create({
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        role
    });

    // Create token
    // const token = user.getSignedJwtToken();

    // res.status(200).json({ success: true, token})

    sendTokenResonse(user, 200, res);
});


// @desc    login user
// @route   POST /api/v1/auth/login
// @access  Public

exports.login = asyncHandler( async (req, res, next) => {
    const {email, password} = req.body;

    // Validate email & password
    if(!email || !password) {
        return next(new ErrorResponse('Please provide an email and password', 400));
    }
    
    // Check for User
    const user = await User.findOne({email}).select('+password');

    if(!user) {
        return next(new ErrorResponse('Invalid Credentials', 401));
    }
    
    // Check if password matches

    const isMatch = await user.matchPassword(password);
    
    if(!isMatch){
        return next(new ErrorResponse('Invalid Credentials', 401));
    }
    // Create token
    // const token = user.getSignedJwtToken();

    // res.status(200).json({ success: true, token})
     
    sendTokenResonse(user, 200, res);
});

// @desc     LogOut  user
// @route   POST /api/v1/auth/profile
// @access  private

exports.logOut = asyncHandler(async (req, res, next) => {
    

    res.status(200).json({
        success: true,
        data: {}
    })
})


// @desc    Get Current logged in user
// @route   POST /api/v1/auth/profile
// @access  private

exports.getMyProfile = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        data: user
    })
})

// @desc    Forgot password
// @route   POST /api/v1/auth/profile
// @access  public

exports.forgotPassword = asyncHandler(async (req, res, next) => {
    const user = await User.findOne({email: req.body.email});

    if(!user){
        return next(new ErrorResponse('There is no user with that email', 404));
    }

    // Get reset token
    const resetToken = user.getResetPasswordToken();

    await user.save({validateBeforeSave: false}); 

    res.status(200).json({
        success: true,
        data: user
    })
})



// @desc    Update details
// @route   POST /api/v1/auth/updateDetails
// @access  private

exports.updateDetails = asyncHandler(async (req, res, next) => {
    const fieldsToupdate = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    }

    const user = await User.findByIdAndUpdate(req.user.id, fieldsToupdate, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        data: user
    })
});


//Get token from model, create cookie and send response

const sendTokenResonse = (user, statusCode, res) =>{
    // Create token
    const token = user.getSignedJwtToken();
    const role = user.role;
    const id = user.id
    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true
    };
    
    if(process.env.NODE_ENV === 'production'){
       options.secure = true;
    }

    res.status(statusCode).cookie('token', token,'role', role, options)
    .json({
        success: true,
        token,
        role,
        id
    })
}