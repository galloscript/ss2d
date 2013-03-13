goog.provide('phys.client');

goog.require('phys.Config');
goog.require('phys.World');
goog.require('ss2d.ClientView');

phys.client = new ss2d.ClientView('mainScene', 
								  phys.Config.CANVAS_WIDTH, 
								  phys.Config.CANVAS_HEIGHT, 
								  phys.Config.CLIENT_FRAME_RATE, 
								  20.0, 
								  100.0);

phys.client.onConnect = function(connection)
{
	var uname = '';
	while(uname != null && uname.length < 3)
	{
		uname = window.prompt('Your name? (3 characters min)');
	}
	if(uname)
	{
		phys.client.mComunication.packAndSendUserName(uname.substring(0,8));
	}
};

phys.client.onServerMessage = function(commandName, commandParam, connection)
{
	switch(commandName)
	{
		case 'REJECTED':
			alert(commandParam);
			phys.client.noAlertOnDisconnect = true;
		break;
	}
}

phys.client.onDisconnect = function(connection)
{
	if(typeof phys.client.noAlertOnDisconnect == 'undefined' || !phys.client.noAlertOnDisconnect)
	{
		alert('Disconnected');
	}
};

phys.client.startConnection(phys.Config.SERVER_HOST, phys.Config.SERVER_PORT);
phys.client.startLoop();
