exports.selectAll = function(selector,table){
  var sql = "SELECT * FROM "+table;
  return sql;
}
exports.selectWhere = function(selector,table,pk,id){
  var sql = "SELECT "+selector+" FROM "+table+" WHERE "+pk+"="+id;
  return sql;
}
exports.deleteWhere = function(table,pk,id){
  var sql = "DELETE FROM "+table+" WHERE "+ pk+"="+id;
  return sql;
}
exports.update= function(table,updateData,pk,id){
  var sql = "UPDATE "+table+" SET ";
  for(var key in updateData) {
   sql += key+"="+"'"+updateData[key]+"'"+" ,";
  }
  sql =  sql.substring(0, sql.length - 1);//On enlève le ',' en trop
  sql += "WHERE "+pk+"="+id;
  return sql
  //return sql;
}
