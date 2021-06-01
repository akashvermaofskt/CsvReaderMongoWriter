const csv = require('csv-parser');
const fs = require('fs');

let matchesList = []

fs.createReadStream('matches2d4c40a.csv')
  .pipe(csv())
  .on('data', (row) => {
    console.log(row);
    matchesList.push(row)
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });


const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://Vishal:vishal06@cluster0.k3hjp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const client = new MongoClient(uri);
async function run() {
  try {
    await client.connect();
    console.log("Connected!")
    const database = client.db("xseed");
    const matches = database.collection("matches");
    // this option prevents additional documents from being inserted if one fails
    const options = { ordered: true };
    const result = await matches.insertMany(matchesList, options);
    console.log(`${result.insertedCount} documents were inserted`);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);