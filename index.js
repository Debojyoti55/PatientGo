const bodyParser = require('body-parser');
const BlockChain = require('./blockchain');
const PubSub = require('./publish_subscriber');
const request = require('request');
const express = require('express');
const app = express();
n
const default_port = 3000;

const ROOT_NODE_ADDRESS = `http://localhost:${default_port}`;

let peer_port;
if(process.env.GENERATE_PEER_PORT === "true"){
    peer_port = default_port + Math.ceil(Math.random()*1000);
}

const port = peer_port || default_port;

const blockchain = new BlockChain();
const pubsub = new PubSub({blockchain});

setTimeout(() => pubsub.broadcastChain(port),1000);


app.use(bodyParser.json());

app.get('/api/blocks',(req,res) => {
    res.json(blockchain.chain);
    
setTimeout(() => pubsub.broadcastChain(port),1000);
})

app.post('/api/blocks',(req,res) => {
    const {data} = req.body;
    blockchain.addBlock({data:data});
    res.redirect('/api/blocks');
})

const syncChain = () => {
    request(
        {url : `${ROOT_NODE_ADDRESS}/api/blocks`},
        (error,response,body) => {
            if(!error && response.statusCode === 200){
                const rootChain = JSON.parse(body);
                console.log("Replace chain on sync with ",rootChain);
                blockchain.replaceChain(rootChain);
            }
        }
    )
}

app.listen(port,() => {
    console.log(`server is listening at port ${port}`);
    syncChain();
})