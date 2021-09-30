const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Users = require('../model/Users.model'); 

//@desc    Get All Users
//@route   GET /api/v1/auth/users
//@access  Private/Admin

exports.getUsers =  asyncHandler(async (req, res, next) => {
     const user = await Users.find();
      
     // sorting to get latest added on top   
     function sortFunction(a,b){  
          var dateA = new Date(a.date).getTime();
          var dateB = new Date(b.date).getTime();
          return dateA > dateB ? 1 : -1;  
      }; 

      user.sort(sortFunction);
     
     res.status(200).json({
          success: true,
          data: user       
        })
  });

//@desc       Get Single User
//@route      GET /api/v1/auth/users/:id
//@access     Private/Admin

  exports.getUser =  asyncHandler(async (req, res, next) => {
     
       const user = await Users.findById(req.params.id);

       if(!user){
          return next(
               new ErrorResponse(`User not found with id of ${req.params.id}`)
          );
     }
      
       res.status(200).json({
            success: true,
            data: user
       })
     
  });


//@desc    Create new Award
//@route   POST /api/v1/auth/users
//@access  Private/Admin
exports.createUser =  asyncHandler(async (req, res, next) => {

     const user = await Users.create(req.body);
    
     res.status(201).json({
          success: true,
          data: user
     })

});


//@desc    Update User
//@route   PUT /api/v1/auth/users/:id
//@access  Private/Admin

exports.UpdateUser =  asyncHandler(async (req, res, next) => {
   
       const user = await Users.findByIdAndUpdate(req.params.id, req.body,{
            new: true,
            runValidators: true
       }); 
      
       res.status(200).json({
            success: true,
            data: user
       })
    
  });


//@desc    Delete User
//@route   DELETE /api/v1/auth/users/:id
//@access  Private/Admin


exports.deleteUser =  asyncHandler(async (req, res, next) => {
     
    await Users.findByIdAndDelete(req.params.id);
      
       res.status(200).json({
            success: true,
            data: {}
       })
     
  });
