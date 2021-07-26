window.onload = function() {
    var bridge = new WebOSServiceBridge();
    
    /*
     * Callback 함수
     */

    function createAlert_callback(msg){
        var arg = JSON.parse(msg);
        if (arg.returnValue) {
            console.log("[createAlert]: Success")
        }
        else{
            console.error("[createAlert]: Failed, error <" + arg.errorCode + "> : " + arg.errorText);
        }
    }

    function getAlertNotification_callback(msg){
        var arg = JSON.parse(msg);
        if (arg.returnValue) {
            console.log("[getAlertNotification]: Success")
        }
        else{
            console.error("[getAlertNotification]: Failed, error <" + arg.errorCode + "> : " + arg.errorText);
        }
    }

    /*
     * Method
     */

    // createAlert(message)
    function createAlert(message){
        var url = 'com.webos.surfacemanager luna://com.webos.notification/createAlert';
        var params = JSON.stringify({
            "message": String(message),
            "buttons":[
                {
                    "label": "확인",
                    "params": {
                        "id":"yotube.leanback.v4"
                    }
                }
            ]
        })
        bridge.onservicecallback = createAlert_callback;
        bridge.call(url, params);
    }

    function getAlertNotification(){
        var url = 'luna://com.webos.notification/getAlertNotification';
        var params = JSON.stringify({
            "subscribe":true
        })
        bridge.onservicecallback = getAlertNotification_callback;
        bridge.call(url, params);
    }

    /*
     * 테스트
     */ 
    
    document.getElementById("button_noti").onclick = function(){
        createAlert("이것은 테스트 알람입니다.");
    }


}