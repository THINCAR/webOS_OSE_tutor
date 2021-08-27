window.onload = function() {
    
function hello_callback(msg){
    var arg = JSON.parse(msg);
    if (arg.returnValue) {
        document.getElementById("txt_msg").innerHTML = arg.Response;
        console.log("[hello] Success : ");
    }
    else {
        console.error("[hello] Failed, error <" + arg.errorCode + "> : " + arg.errorText);
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

function closeCamera_callback(msg){
    var arg = JSON.parse(msg);
    if (arg.returnValue) {
        console.log("[closeCamera] Success");
    }
    else{
        console.error("[closeCamera] Failed, error <" + arg.errorCode + "> : " + arg.errorText);
    }
}

function startPreview_callback(msg){
    var arg = JSON.parse(msg);
    if (arg.returnValue) {
        console.log("[StartPreview] Success [key: " + arg.key + "]");
    }
    else{
        console.error("[StartPreview] Failed, error <" + arg.errorCode + "> : " + arg.errorText);
    }
}

function stopPreview_callback(msg){
    var arg = JSON.parse(msg);
    if (arg.returnValue) {
        console.log("[StopPreview] Success");
    }
    else{
        console.error("[StopPreview] Failed, error <" + arg.errorCode + "> : " + arg.errorText);
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

    /*
     * 이벤트 리스너 설정
     */
    
    document.getElementById("txt_msg").onclick = function() {
        hello("THINCAR",hello_callback);
    };

    document.getElementById("button_cam_list").onclick = function() {
        getCameraList(getCameraList_callback);
    }

    document.getElementById("button_cam_open").onclick = function() {
        var id = document.getElementById("input_cam_open").value;
        openCamera(id,openCamera_callback);
    }

    document.getElementById("button_cam_close").onclick = function() {
        var handle = document.getElementById("label_cam_open").value;
        closeCamera(handle,closeCamera_callback); 
    }

    document.getElementById("button_start_preview").onclick = function() {
        var handle = document.getElementById("input_start_preview").value;
        startPreview(handle,startPreview_callback);
    }

    document.getElementById("button_stop_preview").onclick = function() {
        var handle = document.getElementById("input_start_preview").value;
        stopPreview(handle,stopPreview_callback);
    }

    document.getElementById("button_get_info").onclick = function() {
        var id = document.getElementById("input_get_info").value;
        getInfo(id,getInfo_callback);
    }

    document.getElementById("button_get_prop").onclick = function() {
        var handle = document.getElementById("input_get_prop").value;
        getProperties(handle,getProperties_callback);
    }

    document.getElementById("button_set_prop").onclick = function() {
        var handle = document.getElementById("input_set_prop").value;
        setProperties(handle);
    }

    document.getElementById("button_set_format").onclick = function() {
        var handle = document.getElementById("input_set_format").value;
        setFormat(handle);
    }

    document.getElementById("button_set_alert").onclick = function(){
        toast("hello~!");
    }

    const btn_tts = document.querySelector("#button_tts")
    btn_tts.addEventListener("click",()=>{
        testTTS("hello");
    })
}