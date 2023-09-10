const express = require('express');
const cors = require("cors")
require('./db/config');
const User = require("./db/User");
// const Product = require("./db/product")
const app = express();

const Jwt = require('jsonwebtoken')
const jwtKey = 'e-comm';

app.use(express.json());
app.use(cors());

app.post("/register", async (req, resp) => {
    // resp.send(req.body);
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password
    // resp.send(result)
    Jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
            resp.send({ result: "Something went wrong,Please try after sometime" })
        }
        resp.send({ result, auth: token });
    })
})

app.post("/login", async (req, resp) => {
    console.log(req.body);
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password");
        if (user) {
            Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
                if (err) {
                    resp.send({ result: "Something went wrong,Please try after sometime" })
                }
                resp.send({ user, auth: token });
            })


        } else {
            resp.send({ result: 'No user Found' })
        }
    } else {
        resp.send({ result: 'No user Found' })
    }
})

// app.get("/products", async (req, resp) => {
//     let products = await Product.find();
//     if (products.length > 0) {
//         resp.send(products);
//     } else {
//         resp.send({ result: "No products found" })
//     }
// })

app.listen(5000, () => {
    console.log("Server Started");
}
);   