const cds = require('@sap/cds')

class RemoteService  extends cds.ApplicationService {
    /** Registering custom event handlers */
    async init() {
        this.northwind = await cds.connect.to('northwind');
        this.northwind_remote = await cds.connect.to('northwind_remote');
        this.localNode_DEST = await cds.connect.to('node_DEST');
        this.on('getOrders', () => this.getOrders());
        this.on('getOrders2', () => this.getOrders2());
        this.on('getSimpleMessage', () => this.getSimpleMessage());

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

    async getSimpleMessage(){
        const msg = await this.localNode_DEST.get('/api/message');
        return msg;
    }

}
module.exports = { RemoteService }
