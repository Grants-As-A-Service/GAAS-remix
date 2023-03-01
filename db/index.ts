import mongoose from "mongoose";
import grantRoutes from "./routes/routes";
import tagNamesRoute from "./routes/tagNamesRoute";
import tagRoute from "./routes/tagRoute";
import accountRoute from "./routes/accountRoute";
import projectRoute from "./routes/projectRoute";

//needs to be converted to functions 

// const mongoString = process.env.DATABASE_URL;

// if (!mongoString) {
//     throw Error("check dot env");
// }

// mongoose.connect(mongoString);
// const database = mongoose.connection;

// database.on("error", (error) => {
//     console.log(error);
// });

// database.once("connected", () => {
//     console.log("Database Connected");
// });

// app.all("/grants", grantRoutes);
// app.all("/tagname", tagNamesRoute);
// app.all("/tag", tagRoute);
// app.all("/account", accountRoute);
// app.all("/project", projectRoute);