const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Create a subscription
router.post('/create-subscription', async (req, res) => {
  try {
    const { paymentMethodId, customerId, priceId } = req.body;
    
    // If no customer ID is provided, create a new customer
    let customer;
    if (!customerId) {
      customer = await stripe.customers.create({
        payment_method: paymentMethodId,
        email: req.body.email,
        name: req.body.name,
        invoice_settings: {
          default_payment_method: paymentMethodId,
        },
      });
    } else {
      customer = await stripe.customers.retrieve(customerId);
      
      // Attach the payment method to the existing customer
      await stripe.paymentMethods.attach(paymentMethodId, {
        customer: customerId,
      });
      
      // Set it as the default payment method
      await stripe.customers.update(customerId, {
        invoice_settings: {
          default_payment_method: paymentMethodId,
        },
      });
    }
    
    // Create the subscription
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: priceId }],
      expand: ['latest_invoice.payment_intent'],
    });
    
    res.json({
      subscriptionId: subscription.id,
      clientSecret: subscription.latest_invoice.payment_intent.client_secret,
      customerId: customer.id,
      status: subscription.status,
    });
  } catch (error) {
    console.error('Error creating subscription:', error);
    res.status(500).json({ error: error.message });
  }
});

// Cancel a subscription
router.post('/cancel-subscription', async (req, res) => {
  try {
    const { subscriptionId } = req.body;
    
    const subscription = await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true,
    });
    
    res.json({
      subscriptionId: subscription.id,
      status: subscription.status,
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
    });
  } catch (error) {
    console.error('Error canceling subscription:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update a subscription
router.post('/update-subscription', async (req, res) => {
  try {
    const { subscriptionId, newPriceId } = req.body;
    
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    
    // Update the subscription with the new price
    const updatedSubscription = await stripe.subscriptions.update(subscriptionId, {
      items: [
        {
          id: subscription.items.data[0].id,
          price: newPriceId,
        },
      ],
    });
    
    res.json({
      subscriptionId: updatedSubscription.id,
      status: updatedSubscription.status,
    });
  } catch (error) {
    console.error('Error updating subscription:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get subscription details
router.get('/subscription/:id', async (req, res) => {
  try {
    const subscription = await stripe.subscriptions.retrieve(req.params.id);
    
    res.json({
      subscriptionId: subscription.id,
      status: subscription.status,
      currentPeriodEnd: subscription.current_period_end,
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
    });
  } catch (error) {
    console.error('Error retrieving subscription:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get all subscriptions for a customer
router.get('/customer-subscriptions/:customerId', async (req, res) => {
  try {
    const subscriptions = await stripe.subscriptions.list({
      customer: req.params.customerId,
      status: 'all',
    });
    
    res.json(subscriptions);
  } catch (error) {
    console.error('Error retrieving customer subscriptions:', error);
    res.status(500).json({ error: error.message });
  }
});

// Webhook to handle Stripe events
router.post('/webhook', async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;
  
  try {
    event = stripe.webhooks.constructEvent(
      req.rawBody, 
      sig, 
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  
  // Handle the event
  switch (event.type) {
    case 'invoice.payment_succeeded':
      const invoice = event.data.object;
      // Handle successful payment
      console.log('Payment succeeded for invoice:', invoice.id);
      break;
    case 'invoice.payment_failed':
      const failedInvoice = event.data.object;
      // Handle failed payment
      console.log('Payment failed for invoice:', failedInvoice.id);
      break;
    case 'customer.subscription.updated':
      const subscription = event.data.object;
      // Handle subscription update
      console.log('Subscription updated:', subscription.id);
      break;
    case 'customer.subscription.deleted':
      const canceledSubscription = event.data.object;
      // Handle subscription cancellation
      console.log('Subscription canceled:', canceledSubscription.id);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  
  res.json({ received: true });
});

module.exports = router;
