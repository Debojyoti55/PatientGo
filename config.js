const MINE_RATE = 1000;
const init_difficulty = 2;

const genesis_data = {
    hash:"0x123",
    timeStamp:"1",
    prev_hash:"0x000",
    data:[],
    nonce:0,
    difficulty:init_difficulty
}

module.exports = {genesis_data,MINE_RATE}