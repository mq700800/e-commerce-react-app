const errorHandler = (err , req,res,next) =>{
  
   
    
    res.json({
        message:err.message,
        stack:process.env.NODE_ENV === 'Production' ? null : err.stack,
    });
    const statusCode = res.statusCode === 200 ? 500 : statusCode
    res.status(statusCode);
    
};

module.exports = {errorHandler};