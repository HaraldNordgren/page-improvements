var box = document.getElementsByClassName("monthlysavings-sum")[0];
var amount_raw = box.getElementsByClassName("amount")[0].innerHTML;
var total_amount = Number(amount_raw.replace(/[^0-9\.]+/g,""));

var lis = box.getElementsByTagName("ul")[0].getElementsByTagName("li");
for (var i=0; i < lis.length; i++) {
	var li = lis[i];
	
	var allocation_node = li.getElementsByTagName("span")[0];
	var percentage = Number(
		allocation_node.innerHTML.replace(/[^0-9\.]+/g,"")
	) / 100;
	allocation_node.innerHTML = allocation_node.innerHTML.replace(/[ ]/,"");

	var new_node = document.createElement("span");
	new_node.className = "allocation";
	var textnode = document.createTextNode(
		(total_amount * percentage).toString() + " SEK"
	);
	new_node.appendChild(textnode);
	li.insertBefore(new_node, allocation_node);
}
