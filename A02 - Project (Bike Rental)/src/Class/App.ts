import { token as client_token } from "./Client";
import { Location } from "./Location";
import { Client } from "./Client";
import * as Error from "./Error"
import { Bike } from "./Bike";
import { Rent } from "./Rent";
import bcrypt from 'bcrypt';

export class App {
    private list_clients: Client[] = [];
    private list_bikes: Bike[] = [];
    private list_rents: Rent[] = [];

    //Client
    public registerClient(new_client: Client): void {
        if (this.list_clients.some(client => { return client.email === new_client.email })) {
            throw new Error.EmailUnavailableError();
        }

        this.list_clients.push(new_client);
    }

    public authenticateClient(email: string, password: string): void {
        if (!this.list_clients.some(client => { return client.email === email && client.password === bcrypt.hashSync(password, client_token) })) {
            throw new Error.LoginIncorrect();
        }
    }

    public removeClient(email: string): void {
        const index_client_removed = this.list_clients.findIndex(client => { return client.email === email });

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

    public listClients(): Client[] {
        return this.list_clients;
    }

    //Bike
    public registerBike(new_bike: Bike): void {
        if (this.list_bikes.some(bike => { return bike.id === new_bike.id })) {
            throw new Error.BikeInvalidID();
        }

        this.list_bikes.push(new_bike);
    }

    public updateLocationBike(bike_id: string, new_location: Location): void {
        const selected_bike = this.list_bikes.find(bike => { return bike.id === bike_id });
        if (selected_bike == undefined) {
            throw new Error.BikeInvalidID();
        }
        selected_bike.current_location = new_location;
    }

    public returnBike(bike_id: string, email: string): number {
        const selected_rent = this.list_rents.find(rent => { return rent.rented_bike.id === bike_id && rent.buyer.email === email && rent.end_date == undefined })
        if (selected_rent == undefined) {
            throw new Error.RentNonExist();
        }
        selected_rent.rented_bike.availability = true;
        selected_rent.end_date = new Date();
        return selected_rent.rented_bike.price_per_hour * ((selected_rent.end_date.getTime() - selected_rent.start_date.getTime()) / (1000 * 60 * 60));
    }

    public listBikes(): Bike[] {
        return this.list_bikes;
    }

    //Rent
    public generateRentProtocol(): number {
        return this.list_rents.length == 0 ? 100000 : this.list_rents[this.list_rents.length - 1].protocol + 1;
    }

    public registerRent(bike_id: string, email: string): void {
        const selected_bike = this.list_bikes.find(bike => { return bike.id === bike_id });
        const selected_client = this.list_clients.find(client => { return client.email === email })

        if (selected_bike == undefined) {
            throw new Error.BikeInvalidID();
        }
        if (selected_client == undefined) {
            throw new Error.AccountNotExist();
        }
        if (!selected_bike.availability) {
            throw new Error.BikeNotCurrentyAvailable();
        }

        const new_rent = new Rent(this.generateRentProtocol(), selected_client, selected_bike, new Date());
        selected_bike.availability = false;
        this.list_rents.push(new_rent);
    }

    public listRents(): Rent[] {
        return this.list_rents;
    }
}