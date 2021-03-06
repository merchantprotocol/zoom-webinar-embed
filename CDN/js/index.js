var zoom = function(opt){
    console.log('checkSystemRequirements');
    console.log(JSON.stringify(ZoomMtg.checkSystemRequirements()));

    // it's option if you want to change the WebSDK dependency link resources. setZoomJSLib must be run at first
    // if (!china) ZoomMtg.setZoomJSLib('https://source.zoom.us/1.7.7/lib', '/av'); // CDN version default
    // else ZoomMtg.setZoomJSLib('https://jssdk.zoomus.cn/1.7.7/lib', '/av'); // china cdn option 
    // ZoomMtg.setZoomJSLib('http://localhost:9999/node_modules/@zoomus/websdk/dist/lib', '/av'); // Local version default, Angular Project change to use cdn version
    ZoomMtg.preLoadWasm();
    ZoomMtg.prepareJssdk();
    
    const meetConfig = {
	apiKey: 'pdD99TW1RnKhDaWRWmEUjA',
	meetingNumber: '',
	leaveUrl: 'https://www.dailymarketingmix.com/get-the-worksheets',
	userName: 'Anonymous Guest',
	userEmail: 'guest@mailinator.com', // required for webinar
	passWord: '', // if required
	role: parseInt(0,10), // 1 for host; 0 for attendee or webinar
	signature: ''
    };
    meetConfig.apiKey = opt.apiKey || meetConfig.apiKey;
    meetConfig.meetingNumber = parseInt(opt.meetingNumber || meetConfig.meetingNumber);
    meetConfig.leaveUrl = opt.leaveUrl || meetConfig.leaveUrl;
    meetConfig.userName = opt.userName || meetConfig.userName;
    meetConfig.userEmail = opt.userEmail || meetConfig.userEmail;
    meetConfig.passWord = opt.passWord || meetConfig.passWord;

	var API_SIGNATURE = false;
	jQuery.ajax({
  		type: "POST",
		async: false,
  		dataType: 'json',
  		url: 'https://generate-zoom-token.herokuapp.com/',
  		data: {
		  "meetingNumber": meetConfig.meetingNumber,
		  "role": meetConfig.role
		},
		success: function(jsonData){
			meetConfig.signature = jsonData.signature;
		}
	});
	
        ZoomMtg.init({
            leaveUrl: meetConfig.leaveUrl,
            success: function () {
                console.log(meetConfig);
                ZoomMtg.join(
                    {
                        meetingNumber: meetConfig.meetingNumber,
                        userName: meetConfig.userName,
			userEmail: meetConfig.userEmail,
                        signature: meetConfig.signature,
                        apiKey: meetConfig.apiKey,
                        passWord: meetConfig.passWord,
                        success: function(res){
                            console.log('join meeting success');
                        },
                        error: function(res) {
                            console.log(res);
                        }
                    }
                );
            },
            error: function(res) {
                console.log(res);
            }
        });

};
