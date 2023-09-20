"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Bibliotecas
const Bike_1 = require("./Class/Bike");
const Client_1 = require("./Class/Client");
//Clients
let client;
client = new Client_1.Client("Tai", "Tai@gmail.com", "Omine");
client = new Client_1.Client("Arissa", "Holder@gmail.com", "Hand");
client = new Client_1.Client("Ju", "Harue@gmail.com", "Por_favor_né?");
client = new Client_1.Client("Robert", "Paulo@gmail.com", "A_moda_da_casa");
//Bikes
let bike;
bike = new Bike_1.Bike("Caloi", "DAR0C4", 5, 15.8, "It's small but it's sturdy!", 10);
bike = new Bike_1.Bike("Giant", "4UGUS70", 5, 17.8, "Silent!", 10);
bike = new Bike_1.Bike("Cannondale", "0M1N3", 5, 17.8, "Apple is versatile!!!", 300);
//# sourceMappingURL=index.js.map