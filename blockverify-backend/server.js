    const express = require("express");
const cors = require("cors");
const crypto = require("crypto");

const app = express();
app.use(cors());
app.use(express.json());

class Block {
    constructor(index, timestamp, data, previousHash = "") {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return crypto
            .createHash("sha256")
            .update(
                this.index +
                this.timestamp +
                JSON.stringify(this.data) +
                this.previousHash
            )
            .digest("hex");
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
        return new Block(0, Date.now(), "Genesis Block", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(data) {
        const newBlock = new Block(
            this.chain.length,
            Date.now(),
            data,
            this.getLatestBlock().hash
        );
        this.chain.push(newBlock);
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const current = this.chain[i];
            const previous = this.chain[i - 1];

            if (current.hash !== current.calculateHash()) {
                return false;
            }

            if (current.previousHash !== previous.hash) {
                return false;
            }
        }
        return true;
    }
}

const blockverify = new Blockchain();

app.post("/add-record", (req, res) => {
    const { id, data } = req.body;

    blockverify.addBlock({ id, data });

    res.json({
        message: "Record added to blockchain",
        chain: blockverify.chain
    });
});

app.post("/verify-record", (req, res) => {
    const { id } = req.body;

    const found = blockverify.chain.find(block => block.data.id === id);

    if (found && blockverify.isChainValid()) {
        res.json({ status: "VALID", block: found });
    } else {
        res.json({ status: "INVALID" });
    }
});

app.get("/chain", (req, res) => {
    res.json(blockverify.chain);
});

app.listen(5000, () => {
    console.log("Blockchain server running on port 5000");
});
