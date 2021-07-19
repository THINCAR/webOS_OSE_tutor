window.onload = function() {
    var bridge = new WebOSServiceBridge();
    
    /*
     *  콜백함수 정의
     */

    function getTime_callback(msg){
        var arg = JSON.parse(msg);
        if (arg.returnValue) {
            console.log("[APP_NAME: example web app] GETTIME_SUCCESS UTC : " + arg.utc);
            //webOSSystem.PmLogString(6, "GETTIME_SUCCESS", '{"APP_NAME": "example web app"}', "UTC : " + arg.utc);
        }
        else {
            console.error("[APP_NAME: example web app] GETTIME_FAILED errorText : " + arg.errorText);
            //webOSSystem.PmLogString(3, "GETTIME_FAILED", '{"APP_NAME": "example web app"}', "errorText : " + arg.errorText);
        }
    }

    function hello_callback(msg){
        var arg = JSON.parse(msg);
        if (arg.returnValue) {
            document.getElementById("txt_msg").innerHTML = arg.Response;
            console.log("[APP_NAME: example web app] CALLHELLO_SUCCESS response : " + arg.Response);
            //webOSSystem.PmLogString(6, "CALLHELLO_SUCCESS", '{"APP_NAME": "example web app"}', "response : " + arg.Response);
        }
        else {
            console.error("[APP_NAME: example web app] CALLHELLO_FAILED errorText : " + arg.errorText);
            //webOSSystem.PmLogString(3, "CALLHELLO_FAILED", '{"APP_NAME": "example web app"}', "errorText : " + arg.errorText);
        }
    }

    function getCameraList_callback(msg){
        var arg = JSON.parse(msg);
        if (arg.returnValue) {
            document.getElementById("label_cam_list").innerHTML = arg.deviceList;
            console.log("[getCameraList] Success");
        }
        else {
            console.error("[getCameraList] Failed, error <" + arg.errorCode + "> : " + arg.errorText);
        }
    }

    /*
     * LS2 API 메서드 함수화
     */

    // clock/getTime()
    function getTime(){
        var url = 'luna://com.webos.service.systemservice/clock/getTime';
        var params = '{}';
        bridge.onservicecallback = getTime_callback;
        bridge.call(url, params);
    }

    // hello(name)
    function hello(name){
        var url = 'luna://com.domain.tutorial.service/hello';
        var params = '{"name":"' + name + '"}';
        bridge.onservicecallback = hello_callback;
        bridge.call(url, params);
    }

    // getCameraList()
    // 현재 에러 발생중 : Emulator 말고 실제 기기에서 테스트 필요!!
    function getCameraList(){
        var url = 'luna://com.webos.service.camera2/getCameraList';
        var params = '{}';
        bridge.onservicecallback = getCameraList_callback;
        bridge.call(url, params);
    }

    /*
     * 이벤트 리스너 설정
     */
    
    document.getElementById("txt_msg").onclick = function() {
        hello("THINCAR");
    };

    document.getElementById("button_cam_list").onclick = function() {
        getCameraList();
    }

    /*
     * 테스트
     */ 

    getTime();

}