exports.selectAll = function(selector,table){
  var sql = "SELECT "+selector+" FROM "+table;
  return sql;
}
exports.selectWhere = function(selector,table,pk,id){
  var sql = 'SELECT '+'"'+selector+'"'+' FROM '+table+' WHERE '+'"'+pk+'"'+'='+"'"+id+"'";
  return sql;
}
exports.deleteWhere = function(table,pk,id){
  var sql = "DELETE FROM "+table+" WHERE "+'"'+pk+'"'+"="+id;
  return sql;
}
exports.create = function(table,data){
  var sql = "INSERT INTO "+table;
  var keys = " (";
  var values ="";
  for(var key in data) {
    keys += '"'+key+'"'+",";
    values +="'"+data[key]+"',";
  }
  keys = keys.substring(0, keys.length - 1);//On enlève le ',' en trop
  values = values.substring(0, values.length - 1);//On enlève le ',' en trop
  keys +=") VALUES (";
  values +=")";
  sql += keys + values;
  console.log(sql);
  return sql;
}
exports.update= function(table,updateData,pk,id){
  var sql = "UPDATE "+table+" SET ";
  for(var key in updateData) {
   sql += '"'+key+'"'+"="+"'"+updateData[key]+"'"+" ,";
  }
  sql =  sql.substring(0, sql.length - 1);//On enlève le ',' en trop
  sql += "WHERE "+'"'+pk+'"'+"="+id;
  console.log(sql);
  return sql;
}
