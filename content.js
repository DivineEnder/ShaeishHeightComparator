function strHeightToNum(str)
{
	str = str.split(' ').join("");
	console.log("Parsing \'" + str + "\'");
	var feet = parseInt(str.match(/\d+/gi)[0], 10);
	console.log("Integer feet = " + feet);
	var inches = parseInt(str.match(/(\u2032|'|t|,)\d+/gi)[0].substring(1));
	console.log("Integer inches = " + inches);

	return [feet, inches];
}

function computeShaeishHeightDiff(height)
{
	var shaeHeight = [5, 2];

	var footDiff = height[0] - shaeHeight[0];
	var inchDiff = height[1] - shaeHeight[1];

	totalDiff = ((height[0] - shaeHeight[0]) * 12) + (height[1] - shaeHeight[1]);
	var footDiff = (totalDiff - (totalDiff % 12)) / 12;
	var inchDiff = totalDiff % 12;

	var strDiff = "";
	if (footDiff !== 0)
		strDiff += Math.abs(footDiff) + "\u2032 ";
	if (inchDiff !== 0)
		strDiff += Math.abs(inchDiff) + "\u2033";

	if (totalDiff < 0)
		return strDiff + " shorter than Shaeish";
	if (totalDiff > 0)
		return strDiff + " taller than Shaeish";
	if (totalDiff === 0)
		return "1 Saheish";
}

function replaceElementText(elements)
{
	var matcher = /(\d+(\u2032|')[ ]?\d+(\u2033|")?)|(\d+ (foot|feet)( |, )\d+ (inches|inch))/gi;

	for (var i = 0; i < elements.length; i++) {
	    var element = elements[i];

	    for (var j = 0; j < element.childNodes.length; j++) {
	        var node = element.childNodes[j];

	        if (node.nodeType === 3) {
	            var text = node.nodeValue;
				var matchedText = text.match(matcher);

				if (matchedText !== null)//text.match(/.*\d+(\u2032|')[ ]?\d+(\u2033|")?.*/))
				{
					var replacedText = text.replace(matcher, computeShaeishHeightDiff(strHeightToNum(matchedText[0])));

					if (replacedText !== text) {
		                element.replaceChild(document.createTextNode(replacedText), node);
		            }
				}
	        }
	    }
	}
}

replaceElementText(document.getElementsByTagName('div'));
replaceElementText(document.getElementsByTagName('span'));
replaceElementText(document.getElementsByTagName('em'));
replaceElementText(document.getElementsByTagName('p'));
replaceElementText(document.getElementsByTagName('h1'));
replaceElementText(document.getElementsByTagName('h2'));
