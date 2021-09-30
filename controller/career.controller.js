
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Careers = require('../model/Careers.model') 

//@desc     get All Career
//@route    POST /api/v1/Award
//@access   public
exports.getCareers =  asyncHandler(async (req, res, next) => {
     // try{
       const career = await Careers.find();
      
       res.status(200).json({
            success: true,
            data: career       
          })
     // }catch(err){
  
     // // next(err)
     // res.status(400).json({
     //      sucess:false,
     //      err:err
     // })
  
     // }
  });


//@desc       single Career
//@route      GET /api/v1/Award/:id
//@access     

  exports.getCareer =  asyncHandler(async (req, res, next) => {
     // try{
          const career = await Careers.findById(req.params.id);
          if(!career){
               return next(
                    new ErrorResponse(`Career not found with id of ${req.params.id}`)
               );
          }

     res.status(200).json({
          success: true,
            data: career       
        })

     // }catch(err){
  
     // // next(err)
     // res.status(400).json({
     //      sucess:false,
     //      err:err
     // })
     // }
  });





//@desc    Create new Career
//@route   POST /api/v1/Award
//@access  private
exports.createCareer =  async (req, res, next) => {
//    try{
        console.log(req.body)
     const career = await Careers.create(req.body);

     if(!career){
          return res.status(400).json({status: false})
     }
    
     res.status(200).json({
          success: true,
          data: career
     })
//    }catch(err){

// //    next(err)
//      res.status(400).json({
//           success:false
//      })
//    }
};

//@desc    Udate Award
//@route   put /api/v1/Award/:id
//@access  private

exports.UpdateCareer =  asyncHandler(async (req, res, next) => {
     // try{
       const career = await Careers.findByIdAndUpdate(req.params.id, req.body,{
            new: true,
            runValidators: true
       });
       if(!career){
            return res.status(400).json({status: false})
       }
      
       res.status(200).json({
            success: true,
            data: career
       })
     // }catch(err){
  
     // // next(err)
     // res.status(400).json({
     //      success:false
     // })
  
     // }
  });


//@desc    delete Award
//@route   POST /api/v1/Award
//@access  private

exports.deleteCareer =  asyncHandler(async (req, res, next) => {
     // try{
     //   const career = await Careers.findByIdAndDelete(req.params.id);
      
     //   if(!award){
     //        return res.status(400).json({status: false})
     //   }
      
       res.status(200).json({
            success: true,
            data: 'Career Deleted'
       })
     // }catch(err){
  
     // // next(err)
     // res.status(400).json({
     //      success:false
     // })
  
     // }
  });
