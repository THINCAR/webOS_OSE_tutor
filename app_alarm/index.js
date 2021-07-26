window.onload = function() {
    var bridge = new WebOSServiceBridge();
    
    /*
     * Callback 함수
     */

    function setAlarm_callback(msg){
        var arg = JSON.parse(msg);
        if (arg.returnValue) {
            console.log("[setAlarm]: Success")
        }
        else {
            console.error("[setAlarm]: Failed, error <" + arg.errorCode + "> : " + arg.errorText);
        }
    }

    function clearAlarm_callback(msg){
        var arg = JSON.parse(msg);
        if (arg.returnValue) {
            console.log("[clearAlarm]: Success")
        }
        else{
            console.error("[clearAlarm]: Failed, error <" + arg.errorCode + "> : " + arg.errorText);
        }
    }

    /*
     * Method
     */

    // setAlarm(message)
    function setAlarm(message){
        var url = 'luna://com.webos.service.alarm/set';
        var params = JSON.stringify({
            "key": "test",
            "uri":"luna://com.webos.service.testsleepd/firealarm",
            "params":{},
            "at":"07/26/2021 17:08:10",
            "wakeup":true
        })
        bridge.onservicecallback = setAlarm_callback;
        bridge.call(url, params);
    }

    // clearAlarm(key)
    function clearAlarm(key){
        var url = 'luna://com.webos.notification/getAlertNotification';
        var params = JSON.stringify({
            "key":String(key)
        })
        bridge.onservicecallback = clearAlarm_callback;
        bridge.call(url, params);
    }

    /*
     * 테스트
     */ 
    
    document.getElementById("button_set_alarm").onclick = function(){
        setAlarm("이것은 테스트 알람입니다.");
    }


}