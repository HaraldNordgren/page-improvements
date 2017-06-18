function getPart(el, index) {
	return parseInt(el.
		getElementsByClassName("tRight")[index].
		innerHTML.
		replace(/&nbsp;/g,''))}

nonMontly = [
	"Evli Global B",
	"SPP Aktiefond Global"
]

table = document.getElementsByClassName("positions")[0].
	getElementsByTagName("table")[1]

/*
total = getPart(table.
	getElementsByTagName("tfoot")[0].
	getElementsByTagName("tr")[0], 1)
console.log("Total: " + total)
*/

trs = table.
	getElementsByTagName("tbody")[0].
	getElementsByTagName("tr")

total = 0
for (i=0; i<trs.length; i++) {
	title = trs[i].getElementsByClassName("instrumentName")[0].
		getElementsByTagName("a")[0].title
	if (nonMontly.indexOf(title) != -1) {
		continue
	}

	partSum = getPart(trs[i], 4)
	total += partSum
}

for (i=0; i<trs.length; i++) {
	title = trs[i].getElementsByClassName("instrumentName")[0].
		getElementsByTagName("a")[0].title
	if (nonMontly.indexOf(title) != -1) {
		continue
	}

	partSum = getPart(trs[i], 4)
	var percentage = parseFloat(partSum) / total * 100;
	s = percentage.toFixed(1).toString() + "%"

	var node = document.createElement("td");
	var textnode = document.createTextNode(s);
	node.appendChild(textnode);
	tr = trs[i].getElementsByClassName("tRight")[4]
	trs[i].insertBefore(node, tr)
}
