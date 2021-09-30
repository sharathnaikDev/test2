const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const News = require('../model/News.model'); 

//@desc    Get All News
//@route   GET /api/v1/news
//@access  Public

exports.getNews =  asyncHandler(async (req, res, next) => {
     const news = await News.find();

      // sorting to get latest added on top   
      function sortFunction(a,b){  
          var dateA = new Date(a.date).getTime();
          var dateB = new Date(b.date).getTime();
          return dateA > dateB ? 1 : -1;  
      }; 

      news.sort(sortFunction);

     res.status(200).json({
          success: true,
          data: news       
        })
  });

//@desc       Get Single news
//@route      GET /api/v1/news/:id
//@access     Public

  exports.getSingleNews =  asyncHandler(async (req, res, next) => {
     
       const singleNews = await News.findById(req.params.id);

       if(!singleNews){
          return next(
               new ErrorResponse(`News not found with id of ${req.params.id}`)
          );
     }
      
       res.status(200).json({
            success: true,
            data: singleNews
       })
     
  });


//@desc    Create new News
//@route   POST /api/v1/news
//@access  Public
exports.createNews =  asyncHandler(async (req, res, next) => {

     const news = await News.create(req.body);
    
     res.status(201).json({
          success: true,
          data: news
     })

});


//@desc    Update News
//@route   PUT /api/v1/news/:id
//@access  Public

exports.UpdateNews =  asyncHandler(async (req, res, next) => {
   
       const news = await News.findByIdAndUpdate(req.params.id, req.body,{
            new: true,
            runValidators: true
       }); 
      
       res.status(200).json({
            success: true,
            data: news
       })
    
  });


//@desc    Delete User
//@route   DELETE /api/v1/auth/users/:id
//@access  Private/Admin


exports.deleteNews =  asyncHandler(async (req, res, next) => {
     
    await News.findByIdAndDelete(req.params.id);
      
       res.status(200).json({
            success: true,
            data: {}
       })
     
  });
