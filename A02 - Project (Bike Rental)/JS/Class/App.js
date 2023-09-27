"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const Client_1 = require("./Client");
const Error = __importStar(require("./Error"));
const Rent_1 = require("./Rent");
const bcrypt_1 = __importDefault(require("bcrypt"));
class App {
    constructor() {
        this.list_clients = [];
        this.list_bikes = [];
        this.list_rents = [];
    }
    //Client
    registerClient(new_client) {
        if (this.list_clients.some(client => { return client.email === new_client.email; })) {
            throw new Error.EmailUnavailableError();
        }
        this.list_clients.push(new_client);
    }
    authenticateClient(email, password) {
        if (!this.list_clients.some(client => { return client.email === email && client.password === bcrypt_1.default.hashSync(password, Client_1.token); })) {
            throw new Error.LoginIncorrect();
        }
    }
    removeClient(email) {
        const index_client_removed = this.list_clients.findIndex(client => { return client.email === email; });
        if (index_client_removed == -1) {
            throw new Error.AccountNotExist();
        }
        else if (index_client_removed == 0) {
            this.list_clients.splice(index_client_removed, index_client_removed + 1);
        }
        else {
            this.list_clients.splice(index_client_removed, index_client_removed);
        }
    }
    listClients() {
        return this.list_clients;
    }
    //Bike
    registerBike(new_bike) {
        if (this.list_bikes.some(bike => { return bike.id === new_bike.id; })) {
            throw new Error.BikeInvalidID();
        }
        this.list_bikes.push(new_bike);
    }
    updateLocationBike(bike_id, new_location) {
        const selected_bike = this.list_bikes.find(bike => { return bike.id === bike_id; });
        if (selected_bike == undefined) {
            throw new Error.BikeInvalidID();
        }
        selected_bike.current_location = new_location;
    }
    returnBike(bike_id, email) {
        const selected_rent = this.list_rents.find(rent => { return rent.rented_bike.id === bike_id && rent.buyer.email === email && rent.end_date == undefined; });
        if (selected_rent == undefined) {
            throw new Error.RentNonExist();
        }
        selected_rent.rented_bike.availability = true;
        selected_rent.end_date = new Date();
        return selected_rent.rented_bike.price_per_hour * ((selected_rent.end_date.getTime() - selected_rent.start_date.getTime()) / (1000 * 60 * 60));
    }
    listBikes() {
        return this.list_bikes;
    }
    //Rent
    generateRentProtocol() {
        return this.list_rents.length == 0 ? 100000 : this.list_rents[this.list_rents.length - 1].protocol + 1;
    }
    registerRent(bike_id, email) {
        const selected_bike = this.list_bikes.find(bike => { return bike.id === bike_id; });
        const selected_client = this.list_clients.find(client => { return client.email === email; });
        if (selected_bike == undefined) {
            throw new Error.BikeInvalidID();
        }
        if (selected_client == undefined) {
            throw new Error.AccountNotExist();
        }
        if (!selected_bike.availability) {
            throw new Error.BikeNotCurrentyAvailable();
        }
        const new_rent = new Rent_1.Rent(this.generateRentProtocol(), selected_client, selected_bike, new Date());
        selected_bike.availability = false;
        this.list_rents.push(new_rent);
    }
    listRents() {
        return this.list_rents;
    }
}
exports.App = App;
//# sourceMappingURL=App.js.map