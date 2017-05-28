var info = document.getElementsByClassName("info")[1];

var currency = info.
	getElementsByTagName("table")[0].
	getElementsByTagName("tr")[1].
	getElementsByTagName("td")[1].
	innerHTML;
var total_amount = Number(currency.replace(/[^0-9\.]+/g,"")) / 100;

var funds = info.
	getElementsByTagName("table")[1].
	getElementsByTagName("tbody")[0].
	getElementsByTagName("tr")

for (var i=1; i<funds.length; i++) {
	var fund = funds[i];
	var tds = fund.getElementsByTagName("td");
	var percentage = parseFloat(tds[1].innerHTML) / 100;

	var node = document.createElement("td");
	var textnode = document.createTextNode(
		(total_amount * percentage).toString() + " SEK");
	node.appendChild(textnode);
	
	fund.insertBefore(node, tds[1])
}
