function processURL()
{
	var pageParam = '#';
	paramIndex = window.location.href.indexOf(pageParam);
	if(paramIndex != -1)
	{
		var pageToLoad = window.location.href.substring(paramIndex+pageParam.length);
		console.log(pageToLoad);
		document.getElementById('pageContentFrame').src = pageToLoad;
	}
	else
	{
		goPage('samples/index.html');
	}
}

function goPage(pageUrl)
{
	window.location.href = '#' + pageUrl;
	processURL();
}

window.onload = function()
{
	processURL();
}
