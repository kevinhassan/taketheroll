exports.selectAll = function(selector,table){
  var sql = "SELECT "+selector+" FROM "+table;
  return sql;
}
exports.selectWhere = function(selector,table,elements){
  var sql = 'SELECT '+selector+' FROM '+table+' WHERE';
  for(var column in elements) {
    sql += ' "'+column+'"='+"'"+elements[column]+"' AND";
  }
  sql = sql.substring(0, sql.length - 3);//On enlève le "AND" en trop
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
  return sql;
}
exports.update = function(table,updateData,conditions){
  var sql = "UPDATE "+table+" SET ";
  for(var key in updateData) {
   sql += '"'+key+'"'+"="+"'"+updateData[key]+"'"+" ,";
  }
  sql =  sql.substring(0, sql.length - 1);//On enlève le ',' en trop
  sql += "WHERE ";
  for(var column in conditions) {
    sql += ' "'+column+'"='+"'"+conditions[column]+"' AND";
  }
  sql = sql.substring(0, sql.length - 3);//On enlève le "AND" en trop
  return sql;
}
