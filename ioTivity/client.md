# com.example.service.iotivity.client

## API Summary  
...

## Overview of the API  
NA

## Method

### discoverResources
ACG: com.example.service.iotivity.client.group

#### Description  
Discovering available resources from all devices.

#### Parameters  
|Parameter   |Requirement    |Type   | Description|
|------------|---------------|-------|------------|
|none|

#### Call Return  
|Parameter         |Requirement    |Type   | Description|
|------------------|---------------|-------|------------|
|returnValue       |Required       |boolean| true means success, false means faild|
|discoveryResponse |Required       |object | list of all resources from all devices|

#### Examples 
```
luna-send -n 5 -f luna://com.example.service.iotivity.client/discoverResources '{}'
```
```javascript
{
    "discoveryResponse": {
        ...
    },
    "returnValue": true
}
```
<br/>

### getResource  
ACG: com.example.service.iotivity.client.group

#### Description  
Fetch the value of resource from specified URI

#### Parameters  
|Parameter   |Requirement    |Type   | Description|
|------------|---------------|-------|------------|
|uri         |Required       |string |
|destination |Required       |object | target device address include adapter, |flags, ifindex, port and addr|
|question    |Required       |string | payload with specifiied question|

#### Call Return  
|Parameter         |Requirement    |Type   | Description|
|------------------|---------------|-------|------------|
|returnValue       |Required       |boolean| true means success, false means |faild
|response          |Optional       |object | value of requested resource
|errorText         |Optional       |object | value of error text

#### Examples  

```
luna-send -n 1 -f luna://com.example.service.iotivity.client/getResource '{
    "uri":"/a/fan",
    "question":"abc",
    "destination": {
        "adapter": 1,
        "flags": 32,
        "ifindex": 2,
        "port": 54406,
        "addr": "fe80::ba27:ebff:fe04:f661%eth0"
    }
}'
```
```javascript
{
    "returnValue": true,
    "response": {
        "devAddr": {
            "adapter": 1,
            "flags": 82,
            "ifindex": 0,
            "port": 34711,
            "addr": "10.177.242.177"
        },
        "connType": 65618,
        "addr": {
            "adapter": 1,
            "flags": 82,
            "ifindex": 0,
            "port": 34711,
            "addr": "10.177.242.177"
        },
        "sequenceNumber": 16777216,
        "result": 0,
        "identity": [
            49,
            49,
            49,
            49,
            49,
            49,
            49,
            49,
            49,
            49,
            49,
            49,
            49,
            49,
            49,
            49
        ],
        "payload": {
            "type": 4,
            "values": {
                "answer": "123"
            }
        },
        "resourceUri": "/a/fan"
    }
}
```
<br/>

### putResource  
ACG: com.example.service.iotivity.client.group

#### Description  
Put the value of resource from specified URI

#### Parameters  
|Parameter   |Requirement    |Type   | Description|
|------------|---------------|-------|------------|
|uri         |Required       |string | uri which is put the value
|eps         |Optional       |object | target resource endpoints include pri, family, tps, port and addr
|destination |Required       |object | target device address include adapter, flags, ifindex, port and addr
|key         |Required       |string | payload with specifiied key
|value       |Required       |object | payload with specifiied value

#### Call Return
|Parameter         |Requirement    |Type   | Description|
|------------------|---------------|-------|------------|
|returnValue       |Required       |boolean| true means success, false means faild
|response          |Optional       |object | value of requested resource
|errorText         |Optional       |string | value of error text

#### Examples
```
luna-send -n 1 -f luna://com.example.service.iotivity.client/putResource '{
    "uri": "/a/light",
    "destination": {
        "adapter": 1,
        "flags": 32,
        "ifindex": 2,
        "port": 54436,
        "addr": "fe80::ba27:ebff:fecc:3add%eth0"
    },
    "key":"someOtherValue",
    "value":"aaaa"
}'
```
```javascript
{
    "returnValue": true,
    "response": {
        "devAddr": {
            "adapter": 1,
            "flags": 32,
            "ifindex": 2,
            "port": 54436,
            "addr": "fe80::ba27:ebff:fecc:3add%eth0"
        },
        "connType": 65568,
        "addr": {
            "adapter": 1,
            "flags": 32,
            "ifindex": 2,
            "port": 54436,
            "addr": "fe80::ba27:ebff:fecc:3add%eth0"
        },
        "sequenceNumber": 16777216,
        "result": 4,
        "identity": [
        ],
        "payload": {
            "type": 4,
            "values": {
                "someOtherValue": "aaaa",
                "someValue": 17
            }
        },
        "resourceUri": "/a/light"
    }
}
```
<br/>

### postResource  
ACG: com.example.service.iotivity.client.group

#### Description  
Update the value of resource from specified URI

#### Parameters  
|Parameter   |Requirement    |Type   | Description|
|------------|---------------|-------|------------|
|uri         |Required       |string | uri which is put the value
|eps         |Optional       |object | target resource endpoints include pri, family, tps, port and addr
|destination |Required       |object | target device address include adapter, flags, ifindex, port and addr
|key         |Required       |string | payload with specifiied key
|value       |Required       |object | payload with specifiied value
    
#### Call Return
|Parameter         |Requirement    |Type   | Description|
|------------------|---------------|-------|------------|
|returnValue       |Required       |boolean| true means success, false means faild
|response          |Optional       |object | value of requested resource
|errorText         |Optional       |string | value of error text
  
#### Examples  
```
luna-send -n 1 -f luna://com.example.service.iotivity.client/postResource '{
    "uri": "/a/light",
    "destination": {
        "adapter": 1,
        "flags": 32,
        "ifindex": 2,
        "port": 54436,
        "addr": "fe80::ba27:ebff:fecc:3add%eth0"
    },
    "key":"someOtherValue",
    "value":"aaaa"
}'
```
```javascript
{
    "returnValue": true,
    "response": {
        "devAddr": {
            "adapter": 1,
            "flags": 32,
            "ifindex": 2,
            "port": 54436,
            "addr": "fe80::ba27:ebff:fecc:3add%eth0"
        },
        "connType": 65568,
        "addr": {
            "adapter": 1,
            "flags": 32,
            "ifindex": 2,
            "port": 54436,
            "addr": "fe80::ba27:ebff:fecc:3add%eth0"
        },
        "sequenceNumber": 16777216,
        "result": 4,
        "identity": [
        ],
        "payload": {
            "type": 4,
            "values": {
                "someOtherValue": "aaaa",
                "someValue": 17
            }
        },
        "resourceUri": "/a/light"
    }
}
```
<br/>

### deleteResource  
ACG: com.example.service.iotivity.client.group

#### Description  
Delete resource from specified URI

#### Parameters  
|Parameter   |Requirement    |Type   | Description|
|------------|---------------|-------|------------|
|uri         |Required       |string | uri which is removed
|destination |Required       |object | target device address include adapter, |flags, ifindex, port and addr
   
#### Call Return  
|Parameter         |Requirement    |Type   | Description|
|------------------|---------------|-------|------------|
|returnValue       |Required       |boolean| true means success, false means faild
|response          |Optional       |object | value of requested resource
|errorText         |Optional       |string | value of error text
   
#### Examples  
```
luna-send -n 1 -f luna://com.example.service.iotivity.client/deleteResource '{
    "uri":"/a/fan",
    "destination":{
        "adapter":1,
        "flags":32,
        "ifindex":0,
        "port":35128,
        "addr":"fe80::ba27:ebff:fe04:f661%eth0"
    }
}'
```

```javascript    
{
    "returnValue": true,
    "response": {
        "sequenceNumber": 16777216,
        "identity": [
        ],
        "devAddr": {
            "adapter": 1,
            "flags": 32,
            "ifindex": 2,
            "port": 35128,
            "addr": "fe80::ba27:ebff:fe04:f661%eth0"
        },
        "connType": 65568,
        "result": 2,
        "addr": {
            "adapter": 1,
            "flags": 32,
            "ifindex": 2,
            "port": 35128,
            "addr": "fe80::ba27:ebff:fe04:f661%eth0"
        },
        "resourceUri": "/a/fan"
    }
}
```
<br/>

### observeResource  
ACG: com.example.service.iotivity.client.group

#### Description  
Observe the value of resource from specified URI

#### Parameters  
|Parameter   |Requirement    |Type   | Description|
|------------|---------------|-------|------------|
|subscribe   |Required       |boolean |
|uri         |Required       |string |
|destination |Required       |object | target device address include adapter, flags, ifindex, port and addr
  
#### Call Return  
|Parameter         |Requirement    |Type   | Description|
|------------------|---------------|-------|------------|
|returnValue       |Required       |boolean| true means success, false means faild
|response          |Required       |object | value of requested resource
|errorText         |Optional       |string | value of error text
   
#### Examples  
```
luna-send -n 1 -f luna://com.example.service.iotivity.client/observeResource 
'{"
    uri":"/a/fan",
    "destination":{
        "adapter":1,
        "flags":32,
        "ifindex":0,
        "port":58941,
        "addr":"fe80::ba27:ebff:fe04:f661%eth0"
    },
    "subscribe":true
}'
```
```javascript
{
    "subscribed": true,
    "returnValue": true,
    "response": {
        "devAddr": {
            "adapter": 1,
            "flags": 32,
            "ifindex": 2,
            "port": 58941,
            "addr": "fe80::ba27:ebff:fe04:f661%eth0"
        },
        "connType": 65568,
        "addr": {
            "adapter": 1,
            "flags": 32,
            "ifindex": 2,
            "port": 58941,
            "addr": "fe80::ba27:ebff:fe04:f661%eth0"
        },
        "sequenceNumber": 23,
        "result": 0,
        "identity": [
        ],
        "payload": {
            "type": 4,
            "values": {
                "someOtherValue": "Espoo",
                "someValue": 18
            }
        },
        "resourceUri": "/a/fan"
    }
}
```