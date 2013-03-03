function processURL()
{
	var pageParam = '#';
	paramIndex = window.location.href.indexOf(pageParam);
	if(paramIndex != -1)
	{
		var pageToLoad = window.location.href.substring(paramIndex+pageParam.length);
		console.log(pageToLoad);
		if(pageToLoad.indexOf(':blank') == -1)
		{
			document.getElementById('pageContentFrame').src = pageToLoad;
			document.getElementById('pageContent').style.height = '100%';
			document.getElementById('pageContentFrame').style.height = '100%';
			document.getElementById('pageContent').style.width = '100%';
			document.getElementById('pageContentFrame').style.width = '100%';
			document.getElementById('pageContent').style.height = document.getElementById('pageContentFrame').contentDocument.body.scrollHeight;
			document.getElementById('pageContentFrame').style.height = document.getElementById('pageContentFrame').contentDocument.body.scrollHeight;
			document.getElementById('pageContent').style.height = document.getElementById('pageContentFrame').contentDocument.body.scrollWidth;
			document.getElementById('pageContentFrame').style.width = document.getElementById('pageContentFrame').contentDocument.body.scrollWidth;
		}
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

function frameLoad()
{
	var iframe = document.getElementById('pageContentFrame');
	if(history && history.replaceState)
	{
		var newUrl = '#' + iframe.contentWindow.location.href.substring(iframe.contentWindow.location.href.indexOf('/ss2d/')+6);
		if(newUrl.indexOf(':blank') == -1)
		{
			history.replaceState(iframe.contentDocument.title, 
								 iframe.contentDocument.title ,
								 newUrl);
		}
	}
}

window.onload = function()
{
	processURL();
}
