exports.selectAll = function(selector,table){
  var sql = "SELECT * FROM "+table;
  console.log(sql);
  return sql;
}
exports.selectWhere = function(selector,table,id){
  var sql = "SELECT"+selector+" FROM "+table+" WHERE id="+id;
  return sql;
}
exports.deleteWhere = function(table,id){
  var sql = "DELETE FROM "+table+" WHERE id="+id;
  return sql;
}
