export function readCookie(name){
  var cookieValue = "";
  var search = name + "=";
  if(document.cookie.length > 0){
    var offset = document.cookie.indexOf(search);
    if (offset != -1){
      offset += search.length;
      var end = document.cookie.indexOf(";", offset);
      if (end == -1) end = document.cookie.length;
      cookieValue = unescape(document.cookie.substring(offset, end))
    }
  }
  return cookieValue;
}
