var bridge = new WebOSServiceBridge();

/*
*  콜백함수 정의
*/

function default_callback(msg){
    var arg = JSON.parse(msg);
    if (arg.returnValue) {
        console.log("[Method] Success");
    }
    else{
        console.error("[Method] Failed, error <" + arg.errorCode + "> : " + arg.errorText);
    }
}

/*
 * LS2 API 메서드 함수화
 */


// hello(name)
function hello(name,callback){
    var url = 'luna://com.domain.tutorial.service/hello';
    var params = JSON.stringify({
        "name": String(name)
    })
    bridge.onservicecallback = callback;
    bridge.call(url, params);
}

// camera2/getCameraList()
function getCameraList(callback){
    var url = 'luna://com.webos.service.camera2/getCameraList';
    var params = '{}';
    bridge.onservicecallback = callback;
    bridge.call(url, params);
}

// camera2/open(id)
function openCamera(id,callback){
    var url = 'luna://com.webos.service.camera2/open';
    var params = JSON.stringify({
        "id": String(id)
    })
    bridge.onservicecallback = callback;
    bridge.call(url,params);
}

// camera2/close(handle)
function closeCamera(handle,callback){
    var url = 'luna://com.webos.service.camera2/close';
    var params = JSON.stringify({
        "handle": Number(handle)
    })
    bridge.onservicecallback = callback;
    bridge.call(url,params);
}

// camera2/startPreview(handle)
function startPreview(handle,callback){
    var url = 'luna://com.webos.service.camera2/startPreview';
    var params = JSON.stringify({
        "handle": Number(handle),
        "params":{
            "type": "sharedmemory",
            "source": "0"
        }
    })
    bridge.onservicecallback = callback;
    bridge.call(url,params);
}

//camera2/stopPreview(handle)
function stopPreview(handle,callback){
    var url = 'luna://com.webos.service.camera2/stopPreview';
    var params = JSON.stringify({
        "handle": Number(handle)
    })
    bridge.onservicecallback = callback;
    bridge.call(url,params);
}


// camera2/getInfo(id)
function getInfo(id,callback){
    var url = 'luna://com.webos.service.camera2/getInfo';
    var params = JSON.stringify({
        "id": String(id)
    })
    bridge.onservicecallback = callback;
    bridge.call(url,params);
}

// camera2/getProperties(handle)
function getProperties(handle,callback){
    var url = 'luna://com.webos.service.camera2/getProperties';
    var params = JSON.stringify({
        "handle": Number(handle)
    })
    bridge.onservicecallback = callback;
    bridge.call(url,params);
}

// camera2/setProperties(handle)
function setProperties(handle){
    var url = 'luna://com.webos.service.camera2/setProperties';
    var params = JSON.stringify({
        "handle": Number(handle),
        "params": {
            "contrast":100
        }
    })
    bridge.onservicecallback = default_callback;
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
            "format":"JPEG",
            "fps":30
        }
    })
    bridge.onservicecallback = default_callback;
    bridge.call(url,params);
}

// setToast()
function toast(msg){
    var url = 'luna://com.domain.tutorial.service/toast'
    var params = JSON.stringify({
        "msg": msg
    })
    bridge.onservicecallback = default_callback;
    bridge.call(url,params);
}

function testTTS(text){
    var url = 'luna://com.webos.service.tts/speak'
    var params = JSON.stringify({
        "text": text,
        "clear":true
    })
    bridge.onservicecallback = default_callback;
    bridge.call(url,params);
}