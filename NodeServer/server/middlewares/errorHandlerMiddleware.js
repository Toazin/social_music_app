
module.exports = function(){
    return function(err, req, res, next) {
      console.error("Error Detected: ", err.message);
      res.status(500).json({err: err, message: err.message});
    };
}
