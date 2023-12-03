const BlockChain = require('./blockchain');

const blockchain = new BlockChain();
blockchain.addBlock({data:"random block"});

let prevTimeStamp,nextTimeStamp,nextBlock,timeDiff,averageTime;

const times = [];

for(let i=0;i<1000;i++){
    prevTimeStamp = blockchain.chain[blockchain.chain.length-1].timeStamp;
    blockchain.addBlock({data:`Block ${i}`});
    nextBlock = blockchain.chain[blockchain.chain.length-1];
    nextTimeStamp =nextBlock.timeStamp

    timeDiff = nextTimeStamp - prevTimeStamp;
    times.push(timeDiff);

    averageTime = times.reduce((total,num) => (total+num))/times.length;

    console.log(`Time to mine block : ${timeDiff}ms, Difficulty: ${nextBlock.difficulty}, Average Time : ${averageTime}`);
}