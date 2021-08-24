var ls2 = undefined;

function init(service){
    ls2 = service;
}

function toast(msg){
    var url = "luna://com.webos.notification/createToast";
    var param = {
        "message":msg
    }
    var callback = (m) =>{
        console.log("[Toast] called : "+ msg);
    }
    ls2.call(url,param,callback)
}

function tts(text){
    var url = "luna://com.webos.service.tts/speak";
    var param = {
        "text":text,
        "clear":true,
        "language":"ko-KR"
    }
    var callback = (m) => {
        console.log("[tts] called : " + text);
    }
}
exports.init = init;
exports.toast = toast;
exports.tts = tts;