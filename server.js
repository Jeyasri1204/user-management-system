const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/studentDB")
.then(() => {
    console.log("MongoDB Connected");
})
.catch((err) => {
    console.log(err);
});


const userSchema = new mongoose.Schema({

    name: String,
    email: String

});
const productSchema = new mongoose.Schema({

    productName: String,
    price: Number

});
const Product = mongoose.model("Product", productSchema);
/* Model */

const User = mongoose.model("User", userSchema);

/* Home Route */


// app.get("/", (req, res) => {

//     res.send("API Running");

// });

/* GET USERS */

app.get("/users", async (req, res) => {

    const users = await User.find();

    res.json(users);

});

/* POST USERS */

app.post("/users", async (req, res) => {

    const { name, email } = req.body;

    if (!name || !email) {

        return res.status(400).json({
            message: "Name and Email required"
        });

    }

    const newUser = new User({

        name,
        email

    });

    await newUser.save();

    res.json({

        message: "User Added",
        user: newUser

    });

});

app.put("/users/:id", async (req, res) => {

    const { id } = req.params;

    const updatedUser = await User.findByIdAndUpdate(

        id,
        req.body,
        { new: true }

    );

    res.json({

        message: "User Updated",
        user: updatedUser

    });

});

app.delete("/users/:id", async (req, res) => {

    const { id } = req.params;

    await User.findByIdAndDelete(id);

    res.json({

        message: "User Deleted"

    });

});
app.post("/products", async (req, res) => {

    const newProduct = new Product({

        productName: req.body.productName,
        price: req.body.price

    });

    await newProduct.save();

    res.json({

        message: "Product Added"

    });

});
app.listen(3000, () => {

    console.log("Server running on port 3000");

});