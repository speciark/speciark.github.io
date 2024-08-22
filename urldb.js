const urn = document.currentScript.src;

const seps = "\n\t<p> [URL DB : 뭉탱이로 왔다가 유링게슝] </p><br>\n\t"
var firstihint = '<div id="jsondb">'.length;
var lastihint = "</div><br>".length;
const firsti = firstihint--;
const lasti = -lastihint;
const url = "https://" + urn + '?';

function Loads(txt){
	var text = txt;
	var text = text.split(seps)
	text.pop();
	text.shift();
	var text = text.join(seps);
	var text = text.slice(firsti, lasti);
	return JSON.parse(text); 
}

async function urldbload(url) {
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error('ConnectionFailed');
		}
		const data = await response.text();
		var ret = Loads(data);
		return ret;
	} catch (error) {
		console.error('Fetch Error:', error);
		return null;
	}
}

function urldbdump(jsondb){
	var keys = Object.keys(jsondb);
	var ret = [];
	for(var key of keys)  {
  		var v = jsondb[key];
  		var arrs = [key, v];
  		var line = arrs.join("=");
  		ret.push(line);
 	}
	return url + ret.join("&");
}
