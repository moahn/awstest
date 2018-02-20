exports.protocol="GT06N";
exports.model_name="GV04";
exports.compatible_hardware=["GV04/supplier"];
 
var adapter = function(device){
    console.log("device");
        function parse_data(data){
            console.log(data);
            // Example implementation
            //
            // Packet from device: 
            // #ID_DEVICE_XXX#TIME#LOG_ME_IN_PLEASE#MORE_DATA(GPS,LBS,ETC)#
            
            //Do some stuff...
            return {
    			"device_id" : '351608085651268',//mandatory
    			"cmd" 		: 'login_request', //mandatory
    			"data" 		: 'MORE_DATA(GPS,LBS,ETC)'//Mandatory
            }
        }
    }




exports.adapter = adapter;