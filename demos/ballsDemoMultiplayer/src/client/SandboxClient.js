goog.provide('sand.client');

goog.require('sand.Config');
goog.require('sand.Game');
goog.require('ss2d.ClientView');

sand.client = new ss2d.ClientView('mainScene', 
								  sand.Config.CANVAS_WIDTH, 
								  sand.Config.CANVAS_HEIGHT, 
								  sand.Config.CLIENT_FRAME_RATE, 
								  20.0, 
								  100.0);

sand.client.onConnect = function(connection)
{
	var uname = '';
	while(uname != null && uname.length < 3)
	{
		uname = window.prompt('Your name? (3 characters min)');
	}
	if(uname)
	{
		sand.client.mComunication.packAndSendUserName(uname);
	}
};

sand.client.onServerMessage = function(commandName, commandParam, connection)
{
	switch(commandName)
	{
		case 'REJECTED':
			alert(commandParam);
			sand.client.noAlertOnDisconnect = true;
		break;
	}
}

sand.client.onDisconnect = function(connection)
{
	if(typeof sand.client.noAlertOnDisconnect == 'undefined' || !sand.client.noAlertOnDisconnect)
	{
		alert('Disconnected');
	}
};

sand.client.startConnection(sand.Config.SERVER_HOST, sand.Config.SERVER_PORT);
sand.client.startLoop();
