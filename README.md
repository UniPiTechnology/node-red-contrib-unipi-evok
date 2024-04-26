# node-red-contrib-unipi-evok
This module provides two nodes in Node-RED to quickly access the Unipi device. For more information about Unipi devices see <a href="https://www.unipi.technology/">here</a>.

To connect the nodes with the Unipi device the EVOK utility in version 2.0 or higher is required to install. See <a href="https://github.com/UnipiTechnology/evok">Unipi GitHub</a> or <a href="https://www.unipi.technology/cs/content/evok-18">Unipi EVOK</a> for more information.

To connect - Node-RED and the Unipi device - use the websocket node which is set as `connect to` on the adress ws://[adress of the Unipi device]/ws.

## Pre-requisites

The node-red-contrib-unipi-evok requires <a href="https://nodered.org">Node-RED</a> to be installed.

## Install

 Use the `Menu - Manage palette` to install the Unipi nodes and search for `@unipitechnology/node-red-contrib-unipi-evok`or use the keywords `evok` or `unipi` or run the following command in your Node-RED user directory (typically `~/.node-red`):

    npm install @unipitechnology/node-red-contrib-unipi-evok

## Usage

#### Basic information
Once `@unipitechnology/node-red-contrib-unipi-evok` is installed into the Node-RED two nodes are added:

   - **Unipi input** node - primary a filter for the Unipi data (from the websocket). Helps to easily access the needed data and work with them through the flow/s.
   - **Unipi output** node - helps to see the ***all*** data by the request, ***filter*** the choosen data or to ***set*** the features *relay*, *digital output* and *led* -> to switch ON/OFF or set *analog output* to desired value. 
#### Preparation
To connect the Unipi device with the Node-RED the Unipi EVOK utility <a href="https://www.unipi.technology/cs/content/evok-18">EVOK</a> has to be installed on the device.

Once one has ***Unipi Control Panel*** (which is the enviroment of the EVOK utility in one's browser) active then the first needed step is done. Copy the adress from the console (the form is e.g. 78.230.110.45:8080) and paste it to the websocket node in form ws://[adress of the Unipi device]/ws (with the previous example of the adress it looks like: ws://78.230.110.45:8080/ws) and set the websocket node as ***connect to***.

#### Connection
Now only connect the *websocket input node* with the *Unipi input node* and/or the *Unipi output node* with the *websocket output node*. *Input* couple serves as a *data input (to Node-RED)* from the Unipi device and *output* couple serves as a *data output (from Node-RED)* to the Unipi device.

#### Example of the flow
```
[{"id":"1183c4dd.40bdcb","type":"tab","label":"Unipi","disabled":false,"info":""},{"id":"dbb4f694.5f6858","type":"inject","z":"1183c4dd.40bdcb","name":"","topic":"","payload":"true","payloadType":"bool","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":265,"y":180,"wires":[["bda1b09.49cad5"]]},{"id":"b012802f.7d721","type":"debug","z":"1183c4dd.40bdcb","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"true","x":595,"y":119,"wires":[]},{"id":"3fe20ea9.48b9c2","type":"unipi-input","z":"1183c4dd.40bdcb","name":"","alias":"","devices":"relay","circuits":"1.01","property":"","seedev":"0","seecirc":"0","orig":"0","x":425,"y":119,"wires":[["b012802f.7d721"]]},{"id":"bda1b09.49cad5","type":"unipi-output","z":"1183c4dd.40bdcb","name":"","cmd":"set","alias":"","devices":"relay","circuits":"1.01","enableFil":"1","inputFil":"","relayFil":"","digoutFil":"","analoutFil":"","analinFil":"","ledFil":"","x":425,"y":201,"wires":[["544c7cc1.949a74"]]},{"id":"544c7cc1.949a74","type":"websocket out","z":"1183c4dd.40bdcb","name":"","server":"7b985caa.4160b4","client":"","x":686,"y":201,"wires":[]},{"id":"cac3232a.e0135","type":"websocket in","z":"1183c4dd.40bdcb","name":"","server":"","client":"fa87ece.ccc5b1","x":184,"y":119,"wires":[["3fe20ea9.48b9c2"]]},{"id":"f855be37.5bcbd","type":"inject","z":"1183c4dd.40bdcb","name":"","topic":"","payload":"false","payloadType":"bool","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":262,"y":220,"wires":[["bda1b09.49cad5"]]},{"id":"7b985caa.4160b4","type":"websocket-listener","z":"","path":"ws://78.230.110.45:8080/ws","wholemsg":"false"},{"id":"fa87ece.ccc5b1","type":"websocket-client","z":"","path":"ws://78.230.110.45:8080/ws","tls":"","wholemsg":"false"}]
```
#### Image of the example
![emaple](https://raw.githubusercontent.com/UniPiTechnology/node-red-contrib-unipi-evok/master/images/flow_example.png)
