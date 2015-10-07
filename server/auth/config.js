
module.exports.settings = {
	live: {
		authUrl: "https://login.windows.net/ridgian.onmicrosoft.com/oauth2/authorize",
		tokenUrl: "https://login.windows.net/ridgian.onmicrosoft.com/oauth2/token",
		clientId: 'e6553aea-982c-4a79-8377-67cee92f69e2',
		clientSecret: 'hP+BUP1rTswocmCWO6QWHNOE1Xxr4lUT98uFtu/wBxc=',
		callbackUrl: 'https://im-matthewclark.ridgian.co.uk/auth/callback',
		resource: 'https://graph.windows.net'
	},
	dev: {
		authUrl: "https://login.windows.net/ridgian.onmicrosoft.com/oauth2/authorize",
		tokenUrl: "https://login.windows.net/ridgian.onmicrosoft.com/oauth2/token",
		clientId: '1392fb19-0c27-48be-8e2d-cc05ed6283e4',
		clientSecret: '+jMYudTPav7e0Ned8LR5mmR8nji9yFNt2tGwknf5rbw=',
		callbackUrl: 'http://localhost:8080/auth/callback',
		resource: 'https://graph.windows.net'
	}

};
