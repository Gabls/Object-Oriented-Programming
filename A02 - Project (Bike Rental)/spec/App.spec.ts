//Bibliotecas
import { Location } from "../src/Class/Location";
import { Client } from "../src/Class/Client";
import * as Error from "../src/Class/Error"
import { Bike } from "../src/Class/Bike";
import { App } from "../src/Class/App";
import sinon from "sinon"

//Testes
describe('App.ts', () => {
    //Client
    it('Does an error occur when I try to register two clients with the same email?', async () => {
        const old_client = new Client("Taitai", "Tai@gmail.com", "123");
        const new_client = new Client("Tai", "Tai@gmail.com", "Omine");
        const app = new App();

        app.registerClient(old_client)
        expect(() => { app.registerClient(new_client) }).toThrow(Error.EmailUnavailableError);
    });

    it('Does an error occur when I try to log in with an incorrect email and/or password?', async () => {
        const new_client = new Client("Tai", "Tai@gmail.com", "Omine");
        const email = "Tai@gmail.com";
        const password = "123";
        const app = new App();

        app.registerClient(new_client)
        expect(() => { app.authenticateClient(email, password) }).toThrow(Error.LoginIncorrect);
    });

    it('Does an error occur when I try to remove a non-existent client?', async () => {
        const new_client = new Client("Tai", "Tai@gmail.com", "Omine");
        const email = "Holder@gmail.com";
        const app = new App();

        app.registerClient(new_client)
        expect(() => { app.removeClient(email) }).toThrow(Error.AccountNotExist);
    });

    //Bike
    it('Does an error occur when I try to register the same bike twice?', async () => {
        const new_bike = new Bike("Cannondale", "0M1N3", 5, 17.8, "Apple is versatile!!!", 300);
        const app = new App();

        app.registerBike(new_bike)
        expect(() => { app.registerBike(new_bike) }).toThrow(Error.BikeInvalidID);
    });

    it('Can I update the location of an existing bike?', async () => {
        const new_bike = new Bike("Cannondale", "0M1N3", 5, 17.8, "Apple is versatile!!!", 300);
        const bermuda_triangle = new Location(25.205547, -70.546166);
        const app = new App();

        app.registerBike(new_bike);
        app.updateLocationBike(new_bike.id, bermuda_triangle);
        expect(new_bike.current_location).toEqual(bermuda_triangle);
    });

    it('Does an error occur when I try to update the location of a non-existent bike?', () => {
        const new_bike = new Bike("Cannondale", "0M1N3", 5, 17.8, "Apple is versatile!!!", 300);
        const bermuda_triangle = new Location(25.205547, -70.546166);
        const app = new App();

        expect(() => { app.updateLocationBike(new_bike.id, bermuda_triangle) }).toThrow(Error.BikeInvalidID);
    });

    it('Is the rental amount correct?', async () => {
        const new_bike = new Bike("Cannondale", "0M1N3", 5, 17.8, "Apple is versatile!!!", 300);
        const new_client = new Client("Tai", "Tai@gmail.com", "Omine");
        const clock = sinon.useFakeTimers();
        const hour = 1000 * 60 * 60;
        const app = new App();

        app.registerClient(new_client);
        app.registerBike(new_bike);
        app.registerRent(new_bike.id, new_client.email);
        clock.tick(2 * hour);
        expect(app.returnBike(new_bike.id, new_client.email)).toEqual(2 * new_bike.price_per_hour);
    });

    //Rent
    it('Does an error occur when I try to register a rent with a non-existent bike?', async () => {
        const new_bike = new Bike("Cannondale", "0M1N3", 5, 17.8, "Apple is versatile!!!", 300);
        const new_client = new Client("Tai", "Tai@gmail.com", "Omine");
        const app = new App();

        app.registerClient(new_client);
        expect(() => { app.registerRent(new_bike.id, new_client.email) }).toThrow(Error.BikeInvalidID);
    });

    it('Does an error occur when I try to register a rent with a non-existent client?', async () => {
        const new_bike = new Bike("Cannondale", "0M1N3", 5, 17.8, "Apple is versatile!!!", 300);
        const new_client = new Client("Tai", "Tai@gmail.com", "Omine");
        const app = new App();

        app.registerBike(new_bike);
        expect(() => { app.registerRent(new_bike.id, new_client.email) }).toThrow(Error.AccountNotExist);
    });

    it('Does an error occur when I try to register the rent of a bike that is not currenty available?', async () => {
        const new_bike = new Bike("Cannondale", "0M1N3", 5, 17.8, "Apple is versatile!!!", 300);
        const new_client = new Client("Tai", "Tai@gmail.com", "Omine");
        const app = new App();

        app.registerBike(new_bike);
        app.registerClient(new_client);
        app.registerRent(new_bike.id, new_client.email);
        expect(() => { app.registerRent(new_bike.id, new_client.email) }).toThrow(Error.BikeNotCurrentyAvailable);
    });
});