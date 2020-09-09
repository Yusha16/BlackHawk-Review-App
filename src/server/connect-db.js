import { MongoClient } from 'mongodb';
const url = process.env.MONGODB_URI || `mongodb://localhost:27017/blackhawk`;
let db = null;

export async function connectDB() {
    if (db) return db;
    try{
        let client = await MongoClient.connect(url, { useNewUrlParser: true }); 
        db = client.db();
    }
    catch (e) {
        console.error("Error",e);
    }
    console.info("Got DB, ", db);
    return db;
}

//connectDB();
