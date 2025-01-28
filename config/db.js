import mongoose from "mongoose";

export const connectDb = (uri) => {
    mongoose
    .connect(uri, {dbName: process.env.DB,  useNewUrlParser: true,
        useUnifiedTopology: true,})
    .then((c) => {
        console.log(`Connected with ${c.connection.name}`);
    })
    .catch((e) => console.log(e));
}