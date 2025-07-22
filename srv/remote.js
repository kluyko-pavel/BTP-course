const cds = require('@sap/cds')

class RemoteService  extends cds.ApplicationService {
    /** Registering custom event handlers */
    async init() {
        this.northwind = await cds.connect.to('northwind');
        this.northwind_remote = await cds.connect.to('northwind_remote');
        this.on('getOrders', () => this.getOrders());
        this.on('getOrders2', () => this.getOrders2());

        return super.init();
    }

    async getOrders(){
        const orders = await this.northwind.get('/Orders');
        return orders;
    }

    async getOrders2(){
        const orders2 = await this.northwind_remote.get('/Orders');
        return orders2;
    }

}
module.exports = { RemoteService }
