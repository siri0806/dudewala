const mongoose = require('mongoose');
mongoose.set("strictQuery", true);
const MongoDB = () => {
    mongoose.connect(process.env.DB, { useNewUrlParser: true }, async (err, res) => {
        if (err) console.log("---", err);
        else {
            console.log("connected")
            const fetched_data = await mongoose.connection.db.collection("products");
            fetched_data.find({}).toArray(async function (err, data) {
                if (err) console.log(err);
                else {
                    global.products = data;
                }
            })
            const brand = await mongoose.connection.db.collection("brands");
            brand.find({}).toArray(async function (err, brandData) {
                if (err) console.log(err);
                else {
                    global.brand=brandData;
                }})
            const category = await mongoose.connection.db.collection("category");
            category.find({}).toArray(async function (err, catData) {
                if (err) console.log(err);
                else {
                    global.category=catData;
                }})
        }
    });

};


module.exports = MongoDB;

