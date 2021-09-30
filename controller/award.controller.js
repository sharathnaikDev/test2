const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Awards = require('../model/Awards.model');

//@desc     get All Awards
//@route    GET /api/v1/Award
//@access    public

exports.getAwards =  asyncHandler(async (req, res, next) => {
     // try{
       const award = await Awards.find();
    // sorting to get latest added on top   
     function sortFunction(a,b){  
          var dateA = new Date(a.date).getTime();
          var dateB = new Date(b.date).getTime();
          return dateA > dateB ? 1 : -1;  
      }; 
       award.sort(sortFunction)
       console.log(award)
       res.status(200).json({
            success: true,
            data: award       
          })
     // }catch(err){
  
     // next(err)
     // res.status(400).json({
     //      sucess:false,
     //      err:err
     // })
     // }
  });

//@desc       single Award
//@route      GET /api/v1/Award/:id
//@access

exports.getAward =  asyncHandler(async (req, res, next) => {
     // try{
       const award = await Awards.findById(req.params.id);
       if(!award){
            return next(
                 new ErrorResponse(`Award not found with id of ${req.params.id}`)
            );
       }
      
       res.status(200).json({
            success: true,
            data: award
       })
     // }catch(err){
  
     //  next(err)
     // res.status(400).json({
     //      sucess:false,
     //      err:err
     // })
     // }
  });


//@desc    Create new Award
//@route   POST /api/v1/Award
//@access  private
exports.createAward =  asyncHandler(async (req, res, next) => {
//    try{
     const award = await Awards.create(req.body);
    
     res.status(201).json({
          success: true,
          data: award
     })
//    }catch(err){

//    next(err)
     // res.status(400).json({
     //      success:false
     // })
//    }
});


//@desc    Udate Award
//@route   PUT /api/v1/Award/:id
//@access  private

exports.UpdateAward =  asyncHandler(async (req, res, next) => {
     // try{
       const award = await Awards.findByIdAndUpdate(req.params.id, req.body,{
            new: true,
            runValidators: true
       });
       if(!award){
          return next(
               new ErrorResponse(`Award not found with id of ${req.params.id}`)
          );
       }
      
       res.status(200).json({
            success: true,
            data: award
       })
     // }catch(err){
  
     // next(err)
     // res.status(400).json({
     //      success:false
     // });
     // }
  });


//@desc    delete Award
//@route   POST /api/v1/Award/:id
//@access  private

exports.deleteAward =  asyncHandler(async (req, res, next) => {
     // try{
       const award = await Awards.findByIdAndDelete(req.params.id);
      
       if(!award){
          return next(
               new ErrorResponse(`Award not found with id of ${req.params.id}`)
          );
       }
      
       res.status(200).json({
            success: true,
            data: {}
       })
     // }catch(err){
  
     // next(err)
     // res.status(400).json({
     //      success:false
     // });
  
     // }
  });