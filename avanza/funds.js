map = {}

$.ajax({
    url: "https://www.avanza.se/mina-sidor/manadsspara.html",
    async: false,
    success: function(data1) {
        
        parsed_data = $(new DOMParser().parseFromString(data1, 'text/html'));
        //extratorrent_domain = "https://www.avanza.se";
        //$('head', parsed_data).append('<base href="' + extratorrent_domain + '">');

        //source = document
        source = parsed_data[0]

        rows = source.getElementsByClassName("fundRow")
        for (i=1; i<rows.length; i++) {
        	tds = rows[i].
        		getElementsByTagName("td")

        	name = tds[0].
        		getElementsByTagName("a")[0].
        		innerHTML
        	percentage = parseFloat(tds[2].innerHTML.trim())
        	map[name] = percentage
        }
}})
//console.log(map)

function getPart(el, index) {
	return parseInt(el.
		getElementsByClassName("tRight")[index].
		innerHTML.
		replace(/&nbsp;/g,''))}

function appendTd(s, prevNode, index) {
	var node = document.createElement("td");
	node.appendChild(document.createTextNode(s));
	tr = prevNode.getElementsByClassName("tRight")[index]
	prevNode.insertBefore(node, tr)
}

table = document.getElementsByClassName("positions")[0].
	getElementsByTagName("table")[1]

trs = table.
	getElementsByTagName("tbody")[0].
	getElementsByTagName("tr")

total = 0
for (i=0; i<trs.length; i++) {
	title = trs[i].getElementsByClassName("instrumentName")[0].
		getElementsByTagName("a")[0].title
	//console.log(title)
	//console.log(title in map)
	if (!(title in map)) {
		continue
	}

	partSum = getPart(trs[i], 4)
	total += partSum
}

for (i=0; i<trs.length; i++) {
	title = trs[i].getElementsByClassName("instrumentName")[0].
		getElementsByTagName("a")[0].title
	
	if (title in map) {
		partSum = getPart(trs[i], 4)
		percentage = parseFloat(partSum) / total * 100
		
		percentageDiff = percentage - map[title]
		//s = percentage.toFixed(1) + "% (" + percentageDiff.toFixed(1) + "%)"
		if(percentageDiff > 0){
        	sign = "+"
    	} else {
    		sign = ""
    	}
		s = sign + percentageDiff.toFixed(1) + "%"

	
	} else {
		s = ""
	}

	appendTd(s, trs[i], 4)


	/*
	var node = document.createElement("td");
	node.appendChild(document.createTextNode(s));
	tr = trs[i].getElementsByClassName("tRight")[4]
	trs[i].insertBefore(node, tr)
	*/
}

appendTd("Månadsspar", table.
	getElementsByTagName("thead")[0].
	getElementsByTagName("tr")[0], 4)

appendTd("", table.
	getElementsByTagName("tfoot")[0].
	getElementsByTagName("tr")[0], 1)