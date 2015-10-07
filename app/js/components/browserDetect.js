/*
	 @Author: Nathan Thomas
	 @Desc: To Detect browser versions and mobile devices adds styles to HTML tag and
	 		provides global variable
*/
var BrowserDetect = {
	init: function () {
		this.browser = this.searchString(this.dataBrowser) || "Other";
		this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "Unknown";
		this.mobileDevice = this.checkMobileBrowser();
		$('html').addClass(this.browser + ' ' + this.version);
		if (this.isMobileBrowser) {
			$('html').addClass('mobile-device ' + this.mobileDevice);
		} else {
			$('html').addClass('not-mobile-device');
		}
	},
	searchString: function (data) {
		for (var i = 0; i < data.length; i++) {
			var dataString = data[i].string;
			this.versionSearchString = data[i].subString;

			if (dataString.indexOf(data[i].subString) !== -1) {
				return data[i].identity;
			}
		}
	},
	searchVersion: function (dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index === -1) {
			return;
		}
		var rv = dataString.indexOf("rv:");
		if (this.versionSearchString === "Trident" && rv !== -1) {
			return parseFloat(dataString.substring(rv + 3));
		} else {
			return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
		}
	},
	checkMobileBrowser: function () {
		this.isMobileBrowser = true;
		var userAgent = navigator.userAgent || navigator.vendor || window.opera;
		if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i) || userAgent.match(/iPod/i)) {
			return 'iOS';
		} else if (userAgent.match(/Android/i)) {
			return 'Android';
		} else if (userAgent.match(/Windows Phone/i)) {
			return 'Windows Phone'
		} else {
			this.isMobileBrowser = false;
			return 'Unknown';
		}
	},
	dataBrowser: [
		{
			string: navigator.userAgent,
			subString: "Chrome",
			identity: "Chrome"
        },
		{
			string: navigator.userAgent,
			subString: "MSIE",
			identity: "Explorer"
        },
		{
			string: navigator.userAgent,
			subString: "Trident",
			identity: "Explorer"
        },
		{
			string: navigator.userAgent,
			subString: "Firefox",
			identity: "Firefox"
        },
		{
			string: navigator.userAgent,
			subString: "Safari",
			identity: "Safari"
        },
		{
			string: navigator.userAgent,
			subString: "Opera",
			identity: "Opera"
        }
    ]

};
BrowserDetect.init();