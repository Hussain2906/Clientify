const mongoose = require('mongoose');
require('dotenv').config();
const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME || 'Clientify_CRM';

const connectDB = async () => {
    console.log(` Mongo connecting → uri=${MONGO_URI?.split("@")[1] || MONGO_URI}, db=${DB_NAME}`);

    try {
        const connect = await mongoose.connect(MONGO_URI, {
            dbName: DB_NAME,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        await mongoose.connection.db.admin().command({ ping: 1 });
        console.log(`✅ Mongo OK | db="${connect.connection.name}" | state=${mongoose.connection.readyState}`);
        return connect;
    }
    catch (error) {
        console.error('❌ Mongo Error:', error);
        process.exit(1);
    }
}

module.exports = connectDB;