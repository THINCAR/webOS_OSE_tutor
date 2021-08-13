# com.example.service.iotivity.server

## API Summary
...

## Overview of the API
NA

## Method

### startServer
ACG: com.example.service.iotivity.server.group

#### Description  
to start iotivity server with iotivity-node

#### Parameters  
|Parameter   |Requirement |Type       | Description|
|------------|------------|-----------|------------|
|subscribe   |Required    |boolean    |

#### Call Return  
|Parameter         |Requirement    |Type   | Description|
|------------------|---------------|-------|------------|
|returnValue       |Required       |boolean| true means success, false means faild|
|subscribed        |Required       |boolean| value of requested resource|


#### Examples    
```
luna-send -i -f luna://com.example.service.iotivity.server/startServer '{
    "subscribe":true
}'
```
```javascript
{
    "resources": [],
    "subscribed": true,
    "returnValue": true
}
{
    "resources": [
        {
            "interfaces": [
                "oic.if.baseline"
            ],
            "types": [
                "core.fan"
            ],
            "uri": "a/fan"
        }
    ],
    "subscribed": true,
    "returnValue": true
}
```
<br/>

### createResource  
ACG: com.example.service.iotivity.server.group

#### Description    
To create resource

#### Parameters  
|Parameter   |Requirement    |Type   | Description|
|------------|---------------|-------|------------|
|uri         |Required       |string |
|types       |Required       |string |
|question    |Required       |string |
|answer      |Required       |string |
|observable  |Optional       |boolean|

#### Call Return  
|Parameter         |Requirement    |Type   | Description|
|------------------|---------------|-------|------------|
|returnValue       |Required       |boolean| true means success, false means faild


#### Examples
```
luna-send -1 -f luna://com.example.service.iotivity.server/createResource '{
    "uri":"a/fan",
    "question":"abc",
    "answer":"123",
    "observable":true,
    "types":"core.fan"
}'
```
```
{
    "returnValue": true
}
```
<br/>

### deleteResource  
ACG: com.example.service.iotivity.server.group

#### Description  
To delete resource with specific URI

#### Parameters  
|Parameter   |Requirement    |Type   | Description|
|------------|---------------|-------|------------|
|uri         |Required       |string |

#### Call Return 
|Parameter         |Requirement    |Type   | Description|
|------------------|---------------|-------|------------|
|returnValue       |Required       |boolean| true means success, false means faild|

#### Examples  
```
luna-send -1 -f luna://com.example.service.iotivity.server/deleteResource '{
    "uri":"/a/fan"
}'
```

```javascript
{
    "returnValue": true
}
```