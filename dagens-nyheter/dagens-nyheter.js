MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

var observer = new MutationObserver(function(mutations, observer) {
    mutations.forEach(function(value) {
    	if (value.target.className == "article__body article__body--mask") {
    		document.
    			getElementsByClassName("article__body article__body--mask")[0].
    			className = "article__body";
    	}
    })
});

observer.observe(document, {
	subtree: true,
	attributes: true
});
