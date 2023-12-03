const {genesis_data,MINE_RATE}  = require('./config');
const cryptoHash = require('./crypto_hash');
const hexToBin = require('hex-to-binary');

class Block{
    constructor({timeStamp,hash,prev_hash,data,nonce,difficulty}){
        this.timeStamp = timeStamp;
        this.hash = hash;
        this.prev_hash = prev_hash;
        this.data = data;
        this.nonce = nonce,
        this.difficulty = difficulty
    }

    static genesis(){
        return new this(genesis_data);
    }

    static mineBlock({prevBlock,data}){
        let hash, timeStamp;
        const prev_hash = prevBlock.hash;
        let {difficulty} = prevBlock;

        let nonce = 0;
        do{
            nonce++;
            timeStamp = Date.now();
            difficulty = Block.adjustDifficulty({originalBlock:prevBlock,timeStamp});
            hash = cryptoHash(timeStamp,prev_hash,data,nonce,difficulty);
        }while(hexToBin(hash).substring(0,difficulty) !== "0".repeat(difficulty))           

        return new this({
            timeStamp,
            hash,
            prev_hash,
            data,
            nonce,
            difficulty
        })
    }

    static adjustDifficulty({originalBlock,timeStamp}){
        const { difficulty } = originalBlock;
        const difference = timeStamp - originalBlock.timeStamp;

        if(difficulty<1)return 1;

        if(difference > MINE_RATE)return difficulty-1;
        return difficulty+1;
    }
}

// const block = new Block({
//     hash:"0xabc",
//     timeStamp:"9/19/2023",
//     prev_hash:"0x1c2",
//     data:"hello"
// })

// console.log(block);

// const genesis_block = Block.genesis();
// console.log(genesis_block);

// const result = Block.mineBlock({prevBlock:block,data:"block2"});
// console.log(result);

module.exports = Block;

