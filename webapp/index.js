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
            var list = arg.deviceList;
            var label = document.getElementById("label_cam_list");

            if(list!==""){
                label.innerText = "";
                list.forEach(element => {
                    label.innerText = label.innerText + element.id;
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
            var label = document.getElementById("label_cam_open");
            label.innerHTML = "handle: " + arg.handle;
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

    function getInfo_callback(msg){
        var arg = JSON.parse(msg);
        if (arg.returnValue) {
            var info = arg.info;
            var label = document.getElementById("label_get_info");
            if (info!=="") {
                label.innerText = "";
                for (var key in info){
                    label.innerText = label.innerText + key + " : " + info[key] + "\n";
                    console.log(key + " : " + info[key]);
                }
                console.log(info.details.video.maxWidth)
            }
            else{
                label.innerText = "None Info";
            }
            console.log("[getInfo] Success");
        }
        else{
            console.error("[getInfo] Failed, error <" + arg.errorCode + "> : " + arg.errorText);
        }
    }

    function getProperties_callback(msg){
        var arg = JSON.parse(msg);
        if (arg.returnValue) {
            var prop = arg.params;
            var label = document.getElementById("label_get_prop");
            if (prop!=="") {
                label.innerText = "";
                for (var key in prop){
                    label.innerText = label.innerText + key + " : " + prop[key] + "\n";
                    console.log(key + " : " + prop[key]);
                }
            }
            else{
                label.innerText = "None Properties";
            }
            console.log("[getProperties] Success");
        }
        else{
            console.error("[getProperties] Failed, error <" + arg.errorCode + "> : " + arg.errorText);
        }
    }

    function setProperties_callback(msg){
        var arg = JSON.parse(msg);
        if (arg.returnValue) {
            console.log("[setProperties] Success");
        }
        else{
            console.error("[setProperties] Failed, error <" + arg.errorCode + "> : " + arg.errorText);
        }
    }

    function setFormat_callback(msg){
        var arg = JSON.parse(msg);
        if (arg.returnValue) {
            console.log("[setFormat] Success");
        }
        else{
            console.error("[setFormat] Failed, error <" + arg.errorCode + "> : " + arg.errorText);
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

    // camera2/startPreview(handle)
    function startPreview(handle){
        var url = 'luna://com.webos.service.camera2/startPreview';
        var params = JSON.stringify({
            "handle": Number(handle),
            "params":{
                "type": "sharedmemory",
                "source": "0"
            }
        })
        bridge.onservicecallback = startPreview_callback;
        bridge.call(url,params);
    }

    // camera2/getInfo(id)
    function getInfo(id){
        var url = 'luna://com.webos.service.camera2/getInfo';
        var params = JSON.stringify({
            "id": String(id)
        })
        bridge.onservicecallback = getInfo_callback;
        bridge.call(url,params);
    }

    // camera2/getProperties(handle)
    function getProperties(handle){
        var url = 'luna://com.webos.service.camera2/getProperties';
        var params = JSON.stringify({
            "handle": Number(handle)
        })
        bridge.onservicecallback = getProperties_callback;
        bridge.call(url,params);
    }

    // camera2/setProperties(handle)
    function setProperties(handle){
        var url = 'luna://com.webos.service.camera2/setProperties';
        var params = JSON.stringify({
            "handle": Number(handle),
            "params": {

            }
        })
        bridge.onservicecallback = setProperties_callback;
        bridge.call(url,params);
    }

    // camera2/setFormat(handle)
    function setFormat(handle){
        var url = 'luna://com.webos.service.camera2/setFormat';
        var params = JSON.stringify({
            "handle": Number(handle),
            "params": {
                "width":640,
                "height":480,
                "format":"YUV",
                "fps":30
            }
        })
        bridge.onservicecallback = setFormat_callback;
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
        var id = document.getElementById("input_cam_open").value;
        openCamera(id);
    }

    document.getElementById("button_start_preview").onclick = function() {
        var handle = document.getElementById("input_start_preview").value;
        startPreview(handle);
    }

    document.getElementById("button_get_info").onclick = function() {
        var id = document.getElementById("input_get_info").value;
        getInfo(id);
    }

    document.getElementById("button_get_prop").onclick = function() {
        var handle = document.getElementById("input_get_prop").value;
        getProperties(handle);
    }

    document.getElementById("button_set_prop").onclick = function() {
        var handle = document.getElementById("input_set_prop").value;
        setProperties(handle);
    }

    document.getElementById("button_set_format").onclick = function() {
        var handle = document.getElementById("input_set_format").value;
        setFormat(handle);
    }

    /*
     * 테스트
     */ 

    getTime();

}