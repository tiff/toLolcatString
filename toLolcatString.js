/**
 * toLolcatString()
 * Converts a string from plain english to lolcat speak using YQL and jQuery
 * 
 * @author Christopher Blum <christopher.blum@spellboy.com>
 * @example
 *    "hello, how are you?".toLolcatString(function(lolcatStr) { alert(lolcatStr); }); // => "OH HAI. HOWZ U?"
 */
String.prototype.toLolcatString = (function() {
  var YQL_QUERY = "SELECT content FROM html WHERE url=\"http://speaklolcat.com/?from={str}\" AND xpath='//textarea[@id=\"to\"]'";
  
  return function(callback) {
    var str         = this + "",
        encodedStr  = encodeURIComponent(str),
        query       = YQL_QUERY.replace("{str}", encodedStr);
    
    $.getJSON("http://query.yahooapis.com/v1/public/yql?format=json&callback=?", {
      q: query
    }, function(response) {
      var lolcatStr = response && response.query && response.query.results && response.query.results.textarea;
      if (typeof(lolcatStr) != "undefined") {
        callback(lolcatStr);
      } 
    });
  };
})();