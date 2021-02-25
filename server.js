const dotenv = require('dotenv');
const mongoose = require("mongoose");
dotenv.config({ path: './config.env' });
const app = require("./app");

mongoose.connect(process.env.DATABASE_LOCAL,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:true,
}).then(()=>console.log("DB connected successfully."));


const port = process.env.PORT||2000;

const server = app.listen(port,()=>{
    console.log(`Server running at port: ${port}`);
});

// UNHANDLED REJECTION
process.on('unhandledRejection',err=>{
    console.log("UNHANDLER REJECTION. Shutting down...");
    console.log(err.name,err.message);
    server.close(()=>{
        process.exit(1);
    });
});