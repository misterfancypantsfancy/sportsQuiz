function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send();
    return xmlHttp.responseText;
}

var results = httpGet('https://opentdb.com/api.php?amount=5&category=15&difficulty=easy&type=multiple');

console.log(results);
