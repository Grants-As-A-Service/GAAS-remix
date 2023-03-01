import mongoose from "mongoose";

const uri = process.env.DATABASE_URL;

if (!uri) {
    throw new Error('Invalid/Missing environment variable: "DATABASE_URL"');
}
console.log('running')
mongoose
    .connect(uri)
    .catch((error) => console.log(error))
    .then(() => console.log("connected"));

const database = mongoose.connection;

database.on("error", (error) => {
    console.log(error);
});

database.once("connected", () => {
    console.log("Database Connected");
});

