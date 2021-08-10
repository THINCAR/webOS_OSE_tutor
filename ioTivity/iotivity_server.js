const bridge = new WebOSServiceBridge();

function exec(url, params, methodName){
    bridge.onservicecallback = (msg)=>{
        var arg = JSON.parse(msg);
        if (arg.returnValue) {
            console.log(`[${methodName}] Success`);
        }
        else{
            console.error(`[${methodName}] Failed,
            Error <${arg.errorCode}> :${arg.errorText}`);
        }
    }
    bridge.call(url,params);
}

// startServer()
function startServer(){
    const methodName = "startServer"
    const url = 'luna://com.example.service.iotivity.server/startServer'
    const params = JSON.stringfy({
        "subscribe":true
    });
    exec(url, params, methodName);
}

// createResource()
function createResource(){
    const methodName = "createResource"
    const url = 'luna://com.example.service.iotivity.server/createResource'
    const params = JSON.stringfy({
        "uri":"/a",
        "types":"abc",
        "question":"123",
        "answer":"true"
    });
    exec(url, params, methodName);
}

// deleteResource()
function deleteResource(){
    const methodName = "deleteResource"
    const url = 'luna://com.example.service.iotivity.server/deleteResource'
    const params = JSON.stringfy({
        "uri":"/a"
    });
    exec(url, params, methodName);
}
