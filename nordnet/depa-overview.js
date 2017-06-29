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
		/*
		if (tables.length == 0) {
			exit;
		}
		*/

		var funds = tables[1].
			getElementsByTagName("tbody")[0].
			getElementsByTagName("tr")

		for (var i=1; i<funds.length-1; i++) {
			var fund = funds[i];
			var tds = fund.getElementsByTagName("td");

			name = tds[0].getElementsByTagName("a")[0].innerHTML
			//console.log(name)

			var percentage = parseFloat(tds[1].innerHTML) / 100;
			map[name] = percentage

			var node = source.createElement("td");
			var textnode = source.createTextNode(
				Math.round(total_amount * percentage).toString() + " SEK");
			node.appendChild(textnode);
			
			//fund.insertBefore(node, tds[1])
		}

}})

console.log(map)
