
exports.module = function(res,err){
  console.log('Error occured');
  res.status(err.http_code).json({
    "status": err.http_code,
    "message": err.message
  });
}
