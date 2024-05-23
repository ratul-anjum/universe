require("dotenv").config();
const app = require("./app");
const dbConnect = require("./config/db");
const port = process.env.PORT;

app.listen(port, async () => {
    console.log(`Server is running at : http://localhost:${port}`);
    await dbConnect();
})