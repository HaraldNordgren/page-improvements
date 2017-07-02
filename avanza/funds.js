map = {}
currentOrders = {}
$.ajax({
    url: "https://www.avanza.se/mina-sidor/manadsspara.html",
    async: false,
    success: function(data1) {
        
        parsed_data = $(new DOMParser().parseFromString(data1, 'text/html'));
        source = parsed_data[0]
        //source = document

        rows = source.getElementsByClassName("fundRow")
        for (i=1; i<rows.length; i++) {
        	tds = rows[i].getElementsByTagName("td")
        	name = tds[0].getElementsByTagName("a")[0].innerHTML
        	map[name] = parseFloat(tds[2].innerHTML.trim())
        	currentOrders[name] = 0
        }
}})

currentTrs = document.
	getElementsByClassName("currentOrdersTable")[1].
	getElementsByTagName("tbody")[0].
	getElementsByTagName("tr")

for (i=0; i<currentTrs.length; i++) {
	row = currentTrs[i]
	if (row.getAttribute("data-ordertype") == "Köp") {
		title = row.getAttribute("data-orderbookname")
		amount = parseInt(row.getAttribute("data-price"))
		currentOrders[title] += amount
	}
}

function getPart(el) {
	return parseInt(
		el.getElementsByClassName("tRight")[5].
		innerHTML.replace(/&nbsp;/g,'')
	)}

function appendNode(s, prevNode, index, type="td", className=undefined) {
	var node = document.createElement(type);
	if (className) {
		node.className = className
	}

	node.appendChild(document.createTextNode(s));
	tr = prevNode.getElementsByClassName("tRight")[index]
	prevNode.insertBefore(node, tr)
}

function addMonthly() {
	table = document.getElementsByClassName("positions")[0].
		getElementsByTagName("table")[1]

	trs = table.
		getElementsByTagName("tbody")[0].
		getElementsByTagName("tr")

	total = 0
	for (i=0; i<trs.length; i++) {
		title = trs[i].getElementsByClassName("instrumentName")[0].
			getElementsByTagName("a")[0].title
		
		if (title in map) {
			total += getPart(trs[i]) + currentOrders[title]
		}
	}

	for (i=0; i<trs.length; i++) {
		title = trs[i].getElementsByClassName("instrumentName")[0].
			getElementsByTagName("a")[0].title
		
		className = "tRight"
		diffString = ""
		ammountDiff = ""

		if (title in map) {
			partSum = getPart(trs[i]) + currentOrders[title]
			percentage = parseFloat(partSum) / total * 100
			
			percentageDiff = percentage - map[title]
			sign = percentageDiff > 0 ? "+" : ""
	    	if (Math.abs(percentageDiff) >= 0.8) {
	    		className += " negative"
	    	}

	    	stringFormatted = percentageDiff.toFixed(1).replace(".", ",")
			diffString = sign + stringFormatted + "%"

			amount = (percentageDiff / 100 * total).toFixed(0)
            amount = amount.replace(/\B(?=(\d{3})+(?!\d))/g, " ")
			ammountDiff = sign + amount + " kr"
		}

		appendNode(ammountDiff, trs[i], 4, "td", className)
		appendNode(diffString, trs[i], 4, "td", className)
	}

	for (i=0; i<2; i++) {
		appendNode("M", table.
			getElementsByTagName("thead")[0].
			getElementsByTagName("tr")[0], 3, "th", "tRight")
		appendNode("", table.
			getElementsByTagName("tfoot")[0].
			getElementsByTagName("tr")[0], 1)
	}
}

old_vardepapper_open = false
MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
var observer = new MutationObserver(function(mutations, observer) {
	tableV2s = document.getElementsByClassName("solidRows tableV2 groupInstTypeTable")
	vardepapper_open = tableV2s.length > 0
	if (vardepapper_open && !old_vardepapper_open) {
		addMonthly()
	}
	old_vardepapper_open = vardepapper_open	
});

observer.observe(document, {
	subtree: true,
	attributes: true
});
