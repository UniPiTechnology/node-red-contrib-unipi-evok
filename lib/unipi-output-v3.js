module.exports = function (RED) {
    function UnipiOutputNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        node.name = config.name;
        node.cmd = config.cmd;
        node.alias = config.alias;
        node.devices = config.devices;
        node.circuits = config.circuits;
        node.enableFil = config.enableFil;
        node.inputFil = config.inputFil || false;
        node.relayFil = config.relayFil || false;
        node.digoutFil = config.digoutFil || false;
        node.analoutFil = config.analoutFil || false;
        node.analinFil = config.analinFil || false;
        node.ledFil = config.ledFil || false;

        var _name = "al " + node.alias;
        for (let index = 0; index < (_name.length); index++) 
        {
            _name = _name.replace(" ", "_");
        }


        var _circuit = node.circuits;
        for (let index = 0; index < (_circuit.length); index++) {
            _circuit = _circuit.replace(" ", "_");
            _circuit = _circuit.replace(".", "_");
        }


        node.on('input', function (msg) {

            var sendMsg = false;

            if (node.cmd == "all")
            {
                var _json = {
                    "cmd": "all"
                    };
                msg.payload = _json;
                sendMsg = true;
            }


            if (node.cmd == "filter")
            {
                var listFiltr = [];

                if (node.enableFil == 1){

                    if (node.inputFil)
                    {
                        listFiltr.push("di");
                    }
                    if (node.relayFil)
                    {
                        listFiltr.push("ro");
                    }
                    if(node.digoutFil)
                    {
                        listFiltr.push("do")
                    }
                    if (node.analoutFil)
                    {
                        listFiltr.push("ao");
                    }
                    if (node.analinFil)
                    {
                        listFiltr.push("ai");
                    }
                    if (node.ledFil)
                    {
                        listFiltr.push("led");
                    }

                }
                else if (node.enableFil == 0)
                {
                    listFiltr.push("default");
                }


                var _json = {"cmd":"filter", "devices": listFiltr};
                msg.payload = _json;
                sendMsg = true;
            }

            if (node.cmd == "set") {
                if(node.alias !== "")
                    {
                        var __float = parseFloat(msg.payload);
                        if (__float >= 0)
                        {
                            msg.payload = __float;
                        } 
                        else if (__float < 0)
                        {
                            msg.payload = 0;
                        }
                        else if ( msg.payload == true)
                        {
                            msg.payload = 1;
                        } 
                        else if ( msg.payload == false)
                        {
                            msg.payload = 0;
                        } 
                        else if ( msg.payload == "true")
                        {
                            msg.payload = 1;
                        } 
                        else if ( msg.payload == "false")
                        {
                            msg.payload = 0;
                        } 
                        else if ( msg.payload == "ON")
                        {
                            msg.payload = 1;
                        } 
                        else if ( msg.payload == "OFF")
                        {
                            msg.payload = 0;
                        }
                    
                        if (msg.payload >= 0)
                        {
                            sendMsg = true;
                        }
                        
                                               
                        var _json = {
                            "cmd": node.cmd,
                            "dev": node.devices,
                            "circuit": _name,
                            "value": msg.payload
                        };
                        msg.payload = _json;
                        
                    }else{

                    if (node.devices == "ro" || node.devices == "do" || node.devices == "led") {
                        var _int = parseInt(msg.payload);
                        if (_int == 0) {
                            msg.payload = 0;
                        } else if (_int > 0 ) {
                            msg.payload = 1;
                        } else if ( msg.payload == true){
                            msg.payload = 1;
                        } else if ( msg.payload == false){
                            msg.payload = 0;
                        } else if ( msg.payload == "true"){
                            msg.payload = 1;
                        } else if ( msg.payload == "false"){
                            msg.payload = 0;
                        } else if ( msg.payload == "ON"){
                            msg.payload = 1;
                        } else if ( msg.payload == "OFF"){
                            msg.payload = 0;
                        }                    
                        else if(_int <= 0 ){
                            msg.payload = 0;
                        }

                        if (msg.payload == 1 || msg.payload == 0)
                        {
                            sendMsg = true;
                        }
                    }

                    if (node.devices == "ao") {
                        var _float = parseFloat(msg.payload);
                        if (_float >= 0) 
                        {
                            msg.payload = _float;
                        } 
                        else if (_float < 0)
                        {
                            msg.payload = 0;
                        }

                        if (msg.payload >= 0 )
                        {
                            sendMsg = true;
                        }

                    }

                    var _json = {
                        "cmd": node.cmd,
                        "dev": node.devices,
                        "circuit": _circuit,
                        "value": msg.payload
                    };
                    msg.payload = _json;
                    
                }
            }

            msg._session = undefined;

            if (sendMsg == true) {
                node.send(msg);
            } else {
                node.send(null);
            };

        });

    }
    RED.nodes.registerType("unipi-output-v3", UnipiOutputNode);
}