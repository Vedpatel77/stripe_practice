const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

const PUBLISHABLE_key = "pk_test_51N4L26SGiGP9GAYU7KpvwuFphjJjUArgurldiTLYv9okxomFuhjSRGJngpLHfDZhNw0ZcHM1yySZRn7ZE4pHOZrx00CWdmamwZ";
const SECRET_key = "sk_test_51N4L26SGiGP9GAYUYkcjHx0oze1nKW6JHDHdQbLhsh9vpJ6woXxci9doWvDTNrj7IOqVfDVAI3RrGFan1KdvxPrn006wjeEVZD";

const cors = require('cors');
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const stripe = require('stripe')(SECRET_key);
// app.set('views', path.join(__dirname, 'views'))
// app.set("view engine","ejs")

app.post('/checkout', async (req, res) => {
    try {
        var token = req.body.token;
        console.log(token,"token");
        console.log(token.email,"email");
        const customer = stripe.customers.create({
            email: token.email,
            source: token.id
        }).then((customer) => {
            console.log(customer,"customer");
            return stripe.charges.create({
                amount: 1000,     // Charging Rs 25
                description: 'Royal services',
                currency: 'USD',
                customer: customer.id
            });
        }).then((charge) => {
            console.log(charge,"charge");
            res.json({
                data:"success"
            });  // If no error occurs
        }).catch((err) => {
                    res.json({
                        data:"failure"
                    });       // If some error occurs
                });
        return true;
    } catch (error) {
        return false;
    }

})

app.listen(port, () => {
    console.log("Server is live on " + port);
})


