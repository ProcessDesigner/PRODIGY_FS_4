import stripe from 'stripe';
import AppError from '../utils/AppError.js';

// Initialize Stripe with your secret key
const stripeInstance = stripe('sk_test_51PhFh7HzDVhTTKdB0roqmRCgknZ0fcVDfJyJazNis2M5O1Hjm0N578FyPpizkDB4N4dQn5pINAh5avCFo8ltnUgk00CORnRmfa');

const processpayments = async (req, res, next) => {
    try {
        const myPayment = await stripeInstance.paymentIntents.create({
            amount: req.body.amount,
            currency: 'inr',  // Corrected from 'currence' to 'currency'
            metadata: {
                company: "Ecommerce"
            }
        });

        return res.status(200).json({
            success: true,
            message: 'Payment processed',
            client_secret: myPayment.client_secret
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const sendStripeApiKey = (req, res, next) => {
    try {
        return res.status(200).json({
            success: true,
            message: 'Request success',
            stripe_api_key: 'pk_live_51PhFh7HzDVhTTKdBfGwh96txjyJ6oX7sSsm9xacqyXhRqQBDden3RfDjJsklBF7qWHSJfTm4tWaHKQ0RVPHcSv7U000V5VTgEm'
        })        
    } catch (error) {
        console.log(error)
        return next(new AppError(error.message,503))
    }
    
};

export {
    processpayments,
    sendStripeApiKey
};
