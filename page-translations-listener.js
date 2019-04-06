(function() {
// Observe DOM mutations whether the <html> node was changed by Google Translate
var mutationObserver = new MutationObserver(function(mutations) {
	mutations.forEach(function (mutation) {
		var oldElementClass = mutation.oldValue;
		var currentElementClass = mutation.target.className;
		if (oldElementClass.indexOf('translated-') === -1 && currentElementClass.indexOf('translated-') > -1) {
			window.dataLayer.push({
				'event' : 'pageTranslated',
				'translationLanguage' : mutation.target.lang,
				'translationService' : 'google translate in chrome'
			});
		}
	})
}) 

var htmlNode = document.querySelector('html');
mutationObserver.observe(htmlNode, {
	attributes: true,
	attributeOldValue: true,
	attributeFilter: ['class']
})


// Let's also track pageviews when the page is translated directly from translate.google.com or bing.com/translator
// A function that can return individual query parameter
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

// Check if the page is being translated directly from translate.google.com (viewed within the iframe)
if (window.location.href.indexOf('translate.googleusercontent.com') > -1 ) {
	window.dataLayer.push({
		'event' : 'pageTranslated',
		'translationLanguage' : getUrlParameter('tl'),
		'translationService' : 'google translate website'
	});
}

// Check if the page is being translated directly from bing.com/translator (viewed within the iframe)
if (window.location.href.indexOf('translatoruser-int.com') > -1 ) {
	window.dataLayer.push({
		'event' : 'pageTranslated',
		'translationLanguage' : getUrlParameter('to'),
		'translationService' : 'bing translator website'
	});
}
})();
