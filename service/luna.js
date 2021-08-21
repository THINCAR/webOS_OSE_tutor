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
exports.init = init;
exports.toast = toast;