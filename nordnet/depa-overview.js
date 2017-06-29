map = {}
$.ajax({
    url: "https://www.nordnet.se/mux/web/handla/fonder/sparande/sparande.html",
    async: false,
    success: function(data1) {
        parsed_data = $(new DOMParser().parseFromString(data1, 'text/html'));
        source = parsed_data[0]
        
		var info_boxes = source.getElementsByClassName("info");
		var info = info_boxes[1];
		var currency = info.
			getElementsByTagName("table")[0].
			getElementsByTagName("tr")[1].
			getElementsByTagName("td")[1].
			innerHTML;
		var total_amount = Number(currency.replace(/[^0-9\.]+/g,"")) / 100;
		var tables = info_boxes[2].getElementsByTagName("table")

		var funds = tables[1].
			getElementsByTagName("tbody")[0].
			getElementsByTagName("tr")
		for (var i=1; i<funds.length-1; i++) {
			var fund = funds[i];
			var tds = fund.getElementsByTagName("td");

			title = tds[0].getElementsByTagName("a")[0].innerHTML
			var percentage = parseFloat(tds[1].innerHTML) / 100;
			map[title] = percentage
		}
}})

fondinnehav = document.getElementById("fondinnehav")
trs = fondinnehav.getElementsByTagName("tbody")[0].
	getElementsByTagName("tr")

total = 0
for (var i=0; i<trs.length-1; i++) {
	title = trs[i].getElementsByClassName("kolumn0")[0].
		getElementsByTagName("a")[0].innerHTML

	if (title in map) {
		boughtFor = parseFloat(trs[i].getElementsByClassName("kolumn4")[0].
			innerHTML.replace(" ", ""))
		total += boughtFor
	}
}

function appendNode(s, orig, prevNode, type="td", className=undefined) {
	var node = document.createElement(type);
	node.appendChild(document.createTextNode(s));
	//prevNode = trs[i].getElementsByClassName("kolumn6")[0]
	if (className) {
		node.className = className
	}
	orig.insertBefore(node, prevNode)
}

for (var i=0; i<trs.length-1; i++) {
	title = trs[i].getElementsByClassName("kolumn0")[0].
		getElementsByTagName("a")[0].innerHTML

	stringFormatted = ""
	ammountDiff = ""
	className = ""
	if (title in map) {
		boughtFor = trs[i].getElementsByClassName("kolumn4")[0].
			innerHTML.replace(" ", "")
		
		percentage = parseFloat(boughtFor) / total * 100
		percentageDiff = percentage - parseFloat(100 * map[title])
		sign = percentageDiff > 0 ? "+" : ""
		
    	if (Math.abs(percentageDiff) >= 2.0) {
    		className += "kursMinus"
    	}

    	stringFormatted = percentageDiff.toFixed(1).replace(".", ",")
		diffString = sign + stringFormatted + "%"

		amount = (percentageDiff / 100 * total).toFixed(0)
        amount = amount.replace(/\B(?=(\d{3})+(?!\d))/g, " ")
		ammountDiff = sign + amount + " kr"
	}

	appendNode(diffString, trs[i],
		trs[i].getElementsByClassName("kolumn6")[0], "td", className)
	appendNode(ammountDiff, trs[i],
		trs[i].getElementsByClassName("kolumn6")[0], "td", undefined)
}

thead = fondinnehav.getElementsByTagName("thead")[0]
topRow = thead.getElementsByClassName("topRow")[0]
var node = document.createElement("th");
node.appendChild(document.createTextNode("Månadsspar"));
prevNode = topRow.getElementsByTagName("th")[2]
node.className = "groupHeader groupStart text"
node.setAttribute("colSpan", "2")
topRow.insertBefore(node, prevNode)

bottomRow = thead.getElementsByClassName("bottomRow")[0]
prevNode = bottomRow.getElementsByTagName("th")[6]
var node = document.createElement("th");
node.appendChild(document.createTextNode("%"));
node.className = "groupStart"
bottomRow.insertBefore(node, prevNode)

var node = document.createElement("th");
node.appendChild(document.createTextNode("Diff"));
node.className = "groupEnd"
bottomRow.insertBefore(node, prevNode)

sortRow = thead.getElementsByClassName("sort")[0]
prevNode = sortRow.getElementsByTagName("td")[6]
for (i=0; i<2; i++) {
	var node = document.createElement("td");
	node.appendChild(document.createTextNode(""));
	sortRow.insertBefore(node, prevNode)
}

for (i=0; i<2; i++) {
	tbody = fondinnehav.getElementsByTagName("tbody")[0]
	bottomRow = tbody.getElementsByClassName("resultLine")[0]
	prevNode = bottomRow.getElementsByTagName("td")[3]
	var node = document.createElement("td");
	node.appendChild(document.createTextNode(""));
	bottomRow.insertBefore(node, prevNode)
}

