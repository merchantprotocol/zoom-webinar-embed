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
    var API_KEY = '6Z6M4H6ORECCYY6-us6Xzw';
    var MEETING = '886-2862-8580';

	var API_SIGNATURE = false;
	jQuery.ajax({
  		type: "POST",
		async: false,
  		dataType: 'json',
  		url: 'https://generate-zoom-token.herokuapp.com/',
  		data: {
		  "meetingNumber": MEETING,
		  "role": 0
		},
		success: function(jsonData){
			API_SIGNATURE = jsonData.signature;
		}
	});
	
        ZoomMtg.init({
            leaveUrl: 'https://www.dailymarketingmix.com/webinarh89v5ua', //https://www.dailymarketingmix.com/application29m6vsdv
            success: function () {
                ZoomMtg.join(
                    {
                        meetingNumber: MEETING,
                        userName: 'jack',
                        signature: API_SIGNATURE,
                        apiKey: API_KEY,
                        passWord: '948112',
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
