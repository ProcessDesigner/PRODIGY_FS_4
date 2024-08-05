import app from "./app.js";
import dbconnection from "./config/db.connection.js";
import cloudinary from 'cloudinary'
const PORT = 5003;

app.listen(PORT,async ()=>{
    await dbconnection()
    console.log(`server listening at http://localhost:${PORT}`);
})

cloudinary.v2.config({
    cloud_name:'deafm48ba',
    api_key:'916367985651227',
    api_secret:'kWEPTClb0C0UOAsICG1sGTrg7qE'
})