function strHeightToNum(str)
{
	str = str.split(' ').join("");
	str = str.split(',').join("");
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
		return "1 Shaeish";
}

function replaceElementText(elements)
{
	var footMatcher = /\d+[,?\d+]*[ |-]?(\u2032|'|ft|ft\.|foot|feet)/gi;
	var inchMatcher = /\d+[,?\d+]*[ |-]?(\u2033|"|in|in\.|inch|inches)/gi;
	var totalMatcher = /\d+[,?\d+]*[ |-]?(\u2032|'|ft|ft\.|foot|feet)[ |,|, ]?\d+[,?\d+]*[ |-]?(\u2033|"|in|in\.|inch|inches)/gi;
	// var matcher = /(\d+(\u2032|')[ ]?)|(\d+ (foot|feet|ft)( |, )\d+ (inches|inch|in))|(\d+ (foot|feet|ft|ft.))/gi;

	for (var i = 0; i < elements.length; i++) {
	    var element = elements[i];

	    for (var j = 0; j < element.childNodes.length; j++) {
	        var node = element.childNodes[j];

	        if (node.nodeType === 3 && cNodes.indexOf(node) === -1) {
	            var text = node.nodeValue;
				var replacementText = text;
				var matchedText = text.match(totalMatcher)

				if (matchedText !== null)
				{
					console.log("Matched: " + matchedText);
					for (var i = 0; i < matchedText.length; i++)
						replacementText = replacementText.replace(matchedText[i], computeShaeishHeightDiff(strHeightToNum(matchedText[i])));
				}
				else
				{
					var matchedFootText = text.match(footMatcher);
					var matchedInchText = text.match(inchMatcher);

					if (matchedFootText !== null)
					{
						console.log("Matched foot: " + matchedFootText);
						for (var i = 0; i < matchedFootText.length; i++)
						{
							var feet = parseInt(matchedFootText[i].match(/\d+[,?\d+]*/gi)[0].split(",").join(""), 10);
							replacementText = replacementText.replace(matchedFootText[i], computeShaeishHeightDiff([feet, 0]));
						}
					}
					if (matchedInchText !== null)
					{
						console.log("Matched inch: " + matchedInchText);
						for (var i = 0; i < matchedInchText.length; i++)
						{
							var inches = parseInt(matchedInchText[i].match(/\d+[,?\d+]*/gi)[0].split(",").join(""), 10);
							replacementText = replacementText.replace(matchedInchText[i], computeShaeishHeightDiff([0, inches]));
						}
					}
				}

				if (replacementText !== text) {
					console.log("Replaced child");
					var createdNode = document.createTextNode(replacementText);
					cNodes.push(createdNode);

					element.replaceChild(createdNode, node);
				}
	        }
	    }
	}
}

cNodes = [];
replaceElementText(document.getElementsByTagName('div'));
replaceElementText(document.getElementsByTagName('span'));
replaceElementText(document.getElementsByTagName('em'));
replaceElementText(document.getElementsByTagName('p'));
replaceElementText(document.getElementsByTagName('h1'));
replaceElementText(document.getElementsByTagName('h2'));
