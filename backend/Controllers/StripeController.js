import Stripe from "stripe";
const stripePayment = async (req, res) => {
  try {
    const stripe = Stripe('sk_test_51OrLbTSGDqBhrTFAoBWgTcOs3M5x6yGzaIr7Va2bamRrtc9D7axoyCylpyGXb65mRFGH31RlVbx5pbLj79CFSpPj007HMpXyHx'); // Add this line

    const { title, amount, Id, dates } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "INR",
            product_data: {
              name: title,
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],
      billing_address_collection: "required",
      mode: "payment",
      success_url: `http://localhost:3000/protected/paymentConf?hall_id=${Id}&checkout_id={CHECKOUT_SESSION_ID}&start=${dates.start}&end=${dates.end}`,
      cancel_url: 'http://localhost:3000/cancel',
    });

    return res.status(200).json({ sessionId: session.id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};
 
const confirmation=async(req,res)=>{
  try {
    const {id}=await req.body
    console.log(process.env.STRIPE_SECRET_KEY);
    const stripe=Stripe(process.env.STRIPE_SECRET_KEY)
    const session=await stripe.checkout.sessions.retrieve(id)
    return res.status(200).json(session);
  } catch (error) {
    res.status(500).json(error);
  }
}
export { stripePayment,confirmation };
