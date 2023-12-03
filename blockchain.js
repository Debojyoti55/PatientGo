 const Block = require('./block');
const { timeStamp } = require('./config');
const cryptoHash = require('./crypto_hash');

class BlockChain{
    constructor(){
        this.chain = [Block.genesis()];
    }

    addBlock({data}){
        const newBlock = Block.mineBlock({
            prevBlock:this.chain[this.chain.length-1],
            data:data
        })
        this.chain.push(newBlock);
    }

    replaceChain(chain,port){
        if(chain.length <= this.chain.length){
            console.log("this incoming chain is not longer ",port);
            return;
        }
        if(!BlockChain.isValid(chain)){
            console.log("this incoming chain is not Valid");
            return;
        }

        this.chain = chain;
    }

    static isValid(chain){
        if(JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis()))
        return false;
          
        for(let i=1; i<chain.length; i++){
            const {timeStamp,hash,prev_hash,data,nonce,difficulty} = chain[i];
            const lastDifficulty = chain[i-1].difficulty;
            const lastHash = chain[i-1].hash;

            if(prev_hash !== lastHash)
            return false;

            const validateHash = cryptoHash(timeStamp,prev_hash,data,nonce,difficulty);
            if(hash !== validateHash) return false;

            if(Math.abs(lastDifficulty - difficulty)>1)return false;
        }

        return true;
    }

}

// const blockchain = new BlockChain();

// blockchain.addBlock({data:"block2"});
// blockchain.addBlock({data:"block3"});
// blockchain.addBlock({data:"block4"});

// console.log(blockchain.isValid(blockchain.chain));

// console.log(blockchain.chain);

module.exports = BlockChain;
