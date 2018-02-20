var gps = require("gps-tracking");
 
var options = {
    'debug'                 : false,
     "port": 8080,
 
    // If false, the server will throw an error. 
    // At the moment, the modules comes with only one adater: TK103.
//    "device_adapter": "TK103",
    // You can create your own adapter. 
    
    //FOR USING A CUSTOM DEVICE ADAPTER
     "device_adapter": require("./my_custom_adapter")
}
console.log("options");
 
var server = gps.server(options,function(device,connection){    
 console.log("connection");
    device.on("login_request",function(device_id,msg_parts){
 console.log("device_id"+device_id);
        // Some devices sends a login request before transmitting their position
        // Do some stuff before authenticate the device... 
        
        // Accept the login request. You can set false to reject the device.
        this.login_authorized(true); 
 
    });
 
 
    //PING -> When the gps sends their position  
    device.on("ping",function(data){
 
        //After the ping is received, but before the data is saved
        console.log(data);
        return data;
 
    });
 
});

//server.setDebug(true);