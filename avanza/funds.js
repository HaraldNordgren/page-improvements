map = {}
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
        }
}})

function getPart(el, index) {
	return parseInt(
		el.getElementsByClassName("tRight")[index].
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
			total += getPart(trs[i], 4)
		}
	}

	for (i=0; i<trs.length; i++) {
		title = trs[i].getElementsByClassName("instrumentName")[0].
			getElementsByTagName("a")[0].title
		
		className = "tRight"
		diffString = ""
		ammountDiff = ""

		if (title in map) {
			partSum = getPart(trs[i], 4)
			percentage = parseFloat(partSum) / total * 100
			
			percentageDiff = percentage - map[title]
			sign = percentageDiff > 0 ? "+" : ""
	    	if (Math.abs(percentageDiff) >= 1.5) {
	    		//className += percentageDiff > 0 ? " positive" : " negative"
	    		className += " negative"
	    	}

	    	stringFormatted = percentageDiff.toFixed(1).replace(".", ",")
			diffString = sign + stringFormatted + "%"

			amount = (percentageDiff / 100 * total).toFixed(0)
			ammountDiff = amount + " kr"
		}

		appendNode(ammountDiff, trs[i], 4, "td", className)
		appendNode(diffString, trs[i], 4, "td", className)
	}

	appendNode("Månadsspar", table.
		getElementsByTagName("thead")[0].
		getElementsByTagName("tr")[0], 4, "th", "tRight")
	appendNode("Månadsspar", table.
		getElementsByTagName("thead")[0].
		getElementsByTagName("tr")[0], 4, "th", "tRight")

	appendNode("", table.
		getElementsByTagName("tfoot")[0].
		getElementsByTagName("tr")[0], 1)
	appendNode("", table.
		getElementsByTagName("tfoot")[0].
		getElementsByTagName("tr")[0], 1)
}

old_vardepapper_open = false
MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
var observer = new MutationObserver(function(mutations, observer) {    
	tableV2s = document.getElementsByClassName("solidRows tableV2 groupInstTypeTable marginTop30px")
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
