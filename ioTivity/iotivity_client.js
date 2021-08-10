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

// discoverResources()
function discoverResources(){
    const methodName = "discoverResources"
    const url = 'luna://com.example.service.iotivity.client/discoverResources'
    const params = '{}';
    exec(url, params, methodName);
}

// getResource()>
function getResource(){
    const methodName = "getResource"
    const url = 'luna://com.example.service.iotivity.client/getResource'
    const params = JSON.stringfy({
        "uri":"/a",
        "question":"abc",
        "destination":{
            "adapter":1,
            "flags":32,
            "ifindex":2,
            "port":54406,
            "addr":"fe80::ba27::ebff::fe04:f661%eth0"
        }
    });
    exec(url, params, methodName);
}

// deleteResource()
function deleteResource(){
    const methodName = "deleteResource"
    const url = 'luna://com.example.service.iotivity.client/deleteResource'
    const params = JSON.stringfy({
        "uri":"/a",
        "destination":{
            "adapter":1,
            "flags":32,
            "ifindex":2,
            "port":54406,
            "addr":"fe80::ba27::ebff::fe04:f661%eth0"
        }
    });
    exec(url, params, methodName);
}

// observeResource()
function observeResource(){
    const methodName = "observeResource"
    const url = 'luna://com.example.service.iotivity.client/observeResource'
    const params = JSON.stringfy({
        "uri":"/a",
        "destination":{
            "adapter":1,
            "flags":32,
            "ifindex":2,
            "port":54406,
            "addr":"fe80::ba27::ebff::fe04:f661%eth0"
        },
        "subscribe":true
    });
    exec(url, params, methodName);
}