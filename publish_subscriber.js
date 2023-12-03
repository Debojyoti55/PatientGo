const redis = require('redis');

const CHANNELS = {
    TEST : "TEST",
    BLOCKCHAIN : "BLOCKCHAIN"
}

class PubSub {
    constructor({blockchain}){ 
        this.blockchain = blockchain;
        this.publisher = redis.createClient();
        this.subscreber = redis.createClient();

        this.subscreber.subscribe(CHANNELS.TEST);
        this.subscreber.subscribe(CHANNELS.BLOCKCHAIN);

        this.subscreber.on('message',(channel,message,port) => {
            this.handleMessage(channel,message,port);
        })
    }

    handleMessage(channel,message){
        console.log(`${this.port}, Message recieved Channel : ${channel}, Message : ${message}`);
        const parseMessage = JSON.parse(message);

        if(channel === CHANNELS.BLOCKCHAIN)
        this.blockchain.replaceChain(parseMessage,this.port);
    }

    publish({channel,message}){
        this.publisher.publish(channel,message);
    }

    broadcastChain(port){ console.log(port);
        this.port = port;
        this.publish({
            channel : CHANNELS.BLOCKCHAIN,
            message : JSON.stringify(this.blockchain.chain),
        })
    }
}

// const checkPubSub = new PubSub();

// setTimeout(
//     () => checkPubSub.publisher.publish(CHANNELS.TEST,"Hellloooo"),
//     1000
// )

module.exports = PubSub;