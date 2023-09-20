//Bibliotecas
import sinon from "sinon"
import { App } from "../src/Class/App";
import { Bike } from "../src/Class/Bike";
import { Client } from "../src/Class/Client";
import { Location } from "../src/Class/Location";

//Testes
describe('App.ts', () => {
    it('Is the rental amount correct?', async () => {
        const clock = sinon.useFakeTimers();
        const hour = 1000 * 60 * 60;
        const app = new App();
        const client = new Client("Tai", "Tai@gmail.com", "Omine");
        const bike = new Bike("Cannondale", "0M1N3", 5, 17.8, "Apple is versatile!!!", 300);

        app.registerClient(client);
        app.registerBike(bike);
        app.registerRent(bike.id, client.email)
        clock.tick(2 * hour);
        expect(app.returnBike(bike.id, client.email)).toEqual(2 * bike.price_per_hour);
    });

    it('Can I update the location of an existing bike?', async () => {
        const app = new App();
        const bermuda_triangle = new Location(25.205547, -70.546166);
        const bike = new Bike("Giant", "4UGUS70", 5, 17.8, "Silent!", 10);

        app.registerBike(bike);
        app.updateLocationBike(bike.id, bermuda_triangle);
        expect(bike.current_location).toEqual(bermuda_triangle);
    });

    it('Does an error occur when I try to update the location of a non-existent bike?', () => {
        const app = new App();
        const yamalsky = new Location(69.927804, 70.784502);
        const bike = new Bike("Caloi", "DAR0C4", 5, 15.8, "It's small but it's sturdy!", 10);

        expect(app.updateLocationBike(bike.id, yamalsky)).toThrowError("Invalid ID. Try again!");
    })
});