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
            var camList = arg.deviceList;
            var listLabel = document.getElementById("label_cam_list");

            if(camList!==""){
                listLabel.innerHTML = "";
                camList.forEach(element => {
                    listLabel.innerHTML = listLabel.innerHTML + element.id;
                    console.log(element.id);
                });
            }
            else{
                listLabel.innerHTML = "None Camera"
            }
            console.log("[getCameraList] Success");
        }
        else {
            console.error("[getCameraList] Failed, error <" + arg.errorCode + "> : " + arg.errorText);
        }
    }

    function openCamera_callback(msg){
        var arg = JSON.parse(msg);
        if (arg.returnValue) {
            console.log("[openCamera] Success [handle: " + arg.handle + "]");
        }
        else{
            console.error("[openCamera] Failed, error <" + arg.errorCode + "> : " + arg.errorText);
        }
    }

    function startPreview_callback(msg){
        var arg = JSON.parse(msg);
        if (arg.returnValue) {
            console.log("[openCamera] Success [key: " + arg.key + "]");
        }
        else{
            console.error("[openCamera] Failed, error <" + arg.errorCode + "> : " + arg.errorText);
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

    // camera2/getCameraList()
    function getCameraList(){
        var url = 'luna://com.webos.service.camera2/getCameraList';
        var params = '{}';
        bridge.onservicecallback = getCameraList_callback;
        bridge.call(url, params);
    }

    // camera2/open(id)
    function openCamera(id){
        var url = 'luna://com.webos.service.camera2/open';
        var params = '{"id":"' + id + '"}';
        bridge.onservicecallback = openCamera_callback;
        bridge.call(url,params);
    }

    // camera2/startPreview
    function startPreview(handle){
        var url = 'luna://com.webos.service.camera2/startPreview'
        var params = JSON.stringify({
            "handle": handle,
            "params":{
                "type": "sharedmemory",
                "source": "0"
            }
        })
        console.log(params);
        bridge.onservicecallback = startPreview_callback;
        bridge.call(url,params);
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

    document.getElementById("button_cam_open").onclick = function() {
        var id = document.getElementById("cam_id_input").value;
        openCamera(id);
    }

    document.getElementById("button_start_preview").onclick = function() {
        var id = document.getElementById("cam_handle_input").value;
        id = Number(id);
        startPreview(id);
    }

    /*
     * 테스트
     */ 

    getTime();

}