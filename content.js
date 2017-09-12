function strHeightToNum(str)
{
	str = str.replace(" ", "");
	var feet = parseInt(str.split("\u2032")[0], 10);
	var inches = parseInt(str.split("\u2032")[1].replace("\u2033", ""), 10);

	return [feet, inches];
}

function computeShaeishHeightDiff(height)
{
	var shaeHeight = [5, 2];

	var footDiff = height[0] - shaeHeight[0];
	var inchDiff = height[1] - shaeHeight[1];

	console.log(footDiff + "\u2032 " + inchDiff + "\u2033");

	totalDiff = ((height[0] - shaeHeight[0]) * 12) + (height[1] - shaeHeight[1]);
	var footDiff = (totalDiff - (totalDiff % 12)) / 12;
	var inchDiff = totalDiff % 12;

	var strDiff = "";
	if (footDiff !== 0)
	{
		strDiff += footDiff + "\u2032 ";
	}
	if (inchDiff !== 0)
	{
		strDiff += inchDiff + "\u2033";
	}

	// strDiff = ((totalDiff - (totalDiff % 12)) / 12) + "\u2032 " + (totalDiff % 12) + "\u2033"
	if (totalDiff < 0)
		return strDiff + " shorter than Shaeish";
	if (totalDiff > 0)
		return strDiff + " taller than Shaeish";
	if (totalDiff === 0)
		return "1 Saheish";
}

var mainHeight = document.getElementsByClassName('_XWk');

for (var i = 0; i < mainHeight.length; i++) {
    var heightDiv = mainHeight[i];
	heightDiv.innerText
	text = heightDiv.innerText;
	console.log("Height is currently: " + text);
	// var replacedText = text.replace(/[0-9]+ \\'[0-9]+\\"/g, '5\' 2\"');

	var diff = computeShaeishHeightDiff(strHeightToNum(text));
	console.log(diff);
	// if (replacedText !== text) {
	heightDiv.innerText = diff;
	// element.replaceChild(document.createTextNode(replacedText), node);
	// }

    // for (var j = 0; j < element.childNodes.length; j++) {
    //     var node = element.childNodes[j];
	//
    //     if (node.nodeType === 3) {
    //         var text = node.nodeValue;
	// 		console.log("TESTING STUFF");
	// 		console.log(text);
    //         var replacedText = text.replace(/[0-9]+\\'[0-9]+\\"/g, '5\'2\"');
	//
    //         if (replacedText !== text) {
    //             element.replaceChild(document.createTextNode(replacedText), node);
    //         }
    //     }
    // }
}
