(function(){
    console.log('checkSystemRequirements');
    console.log(JSON.stringify(ZoomMtg.checkSystemRequirements()));

    // it's option if you want to change the WebSDK dependency link resources. setZoomJSLib must be run at first
    // if (!china) ZoomMtg.setZoomJSLib('https://source.zoom.us/1.7.7/lib', '/av'); // CDN version default
    // else ZoomMtg.setZoomJSLib('https://jssdk.zoomus.cn/1.7.7/lib', '/av'); // china cdn option 
    // ZoomMtg.setZoomJSLib('http://localhost:9999/node_modules/@zoomus/websdk/dist/lib', '/av'); // Local version default, Angular Project change to use cdn version
    ZoomMtg.preLoadWasm();
    ZoomMtg.prepareJssdk();
    
    /**
     * NEVER PUT YOUR ACTUAL API SECRET IN CLIENT SIDE CODE, THIS IS JUST FOR QUICK PROTOTYPING
     * The below generateSignature should be done server side as not to expose your api secret in public
     * You can find an eaxmple in here: https://marketplace.zoom.us/docs/sdk/native-sdks/web/essential/signature
     */
    const meetConfig = {
	apiKey: 'pdD99TW1RnKhDaWRWmEUjA',
	meetingNumber: '2252817652',
	leaveUrl: 'https://www.dailymarketingmix.com/webinarh89v5ua',
	userName: 'Firstname Lastname',
	userEmail: 'firstname.lastname@yoursite.com', // required for webinar
	passWord: 'TDB3VDd1T3JqelFZcldheTNlQmt5Zz09', // if required
	role: 0, // 1 for host; 0 for attendee or webinar
	signature: ''
    };

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
	console.log(meetConfig);
        ZoomMtg.init({
            leaveUrl: 'https://www.dailymarketingmix.com/webinarh89v5ua', //https://www.dailymarketingmix.com/application29m6vsdv
            success: function () {
                ZoomMtg.join(
                    {
                        meetingNumber: meetConfig.meetingNumber,
                        userName: meetConfig.userName,
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

})();
