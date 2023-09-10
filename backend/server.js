const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

// Mock user database
const db = require('./database');

// Initialize TRONWeb with your private key and TRON full node URL
const TronWeb = require('tronweb');
const privateKey = '45dd08d7-a9d2-479d-a2e4-0a4652a570d4'; // Replace with your actual private key
const fullNode = 'https://trx.getblock.io/45dd08d7-a9d2-479d-a2e4-0a4652a570d4/mainnet/fullnode/jsonrpc'; // TRON full node
const tronWeb = new TronWeb({
    fullNode,
    privateKey
});

// Payment endpoint
app.post('/makePayment', async (req, res) => {
    const recipientAddress = 'TRUH6La5vXGc2uUM4QDhcJE5z7rzJfG9d7'; // Replace with your actual wallet address
    const amount = 10; // 10 TRX

    // Create a transaction
    const transaction = await tronWeb.transactionBuilder.sendTrx(
        recipientAddress,
        amount * 1e6 // Convert TRX to SUN (TRON's smallest unit)
    );

    try {
        // Sign the transaction
        const signedTransaction = await tronWeb.trx.sign(transaction);

        // Broadcast the transaction to the TRON network
        const result = await tronWeb.trx.sendRawTransaction(signedTransaction);

        // Check if the transaction was successful
        if (result.result) {
            // Transaction successful, provide the user with a random positive prediction
            const predictions = ["You'll have a fantastic day!", "Success is on your horizon.", "Expect good news today."];
            const randomPrediction = predictions[Math.floor(Math.random() * predictions.length)];
            res.json({ success: true, prediction: randomPrediction });
        } else {
            res.json({ success: false, message: 'Transaction failed.' });
        }
    } catch (error) {
        res.json({ success: false, message: 'Error processing transaction.' });
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
          
