import React, { useState } from 'react';
import styled from 'styled-components';
import { loadStripe } from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { FiCreditCard, FiLock, FiCheck } from 'react-icons/fi';

// Load Stripe outside of component render to avoid recreating Stripe object on every render
const stripePromise = loadStripe('pk_test_your_stripe_publishable_key');

const SubscriptionContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const PageHeader = styled.div`
  margin-bottom: 2rem;
  text-align: center;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  color: ${props => props.theme.text.primary};
  margin-bottom: 1rem;
`;

const PageDescription = styled.p`
  color: ${props => props.theme.text.secondary};
  max-width: 600px;
  margin: 0 auto;
`;

const PlanSelector = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const PlanOption = styled.div`
  flex: 1;
  max-width: 250px;
  padding: 2rem;
  border-radius: 8px;
  background-color: ${props => props.theme.surface};
  box-shadow: 0 4px 6px ${props => props.theme.shadow};
  margin: 0 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid ${props => props.selected ? props.theme.primary : 'transparent'};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px ${props => props.theme.shadow};
  }
  
  @media (max-width: 768px) {
    margin: 1rem 0;
    width: 100%;
  }
`;

const PlanTitle = styled.h3`
  font-size: 1.5rem;
  color: ${props => props.theme.text.primary};
  margin-bottom: 0.5rem;
  text-align: center;
`;

const PlanPrice = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${props => props.theme.primary};
  margin-bottom: 1rem;
  text-align: center;
  
  span {
    font-size: 1rem;
    font-weight: 400;
    color: ${props => props.theme.text.secondary};
  }
`;

const PlanFeatures = styled.ul`
  list-style: none;
  margin-bottom: 1.5rem;
`;

const PlanFeature = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 0.8rem;
  color: ${props => props.theme.text.primary};
  
  svg {
    color: ${props => props.theme.success};
    margin-right: 0.5rem;
    flex-shrink: 0;
  }
`;

const PaymentForm = styled.div`
  background-color: ${props => props.theme.surface};
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 6px ${props => props.theme.shadow};
`;

const FormTitle = styled.h2`
  font-size: 1.5rem;
  color: ${props => props.theme.text.primary};
  margin-bottom: 1.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.text.primary};
  font-weight: 500;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1px solid ${props => props.theme.divider};
  border-radius: 4px;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text.primary};
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.primary};
    box-shadow: 0 0 0 2px ${props => props.theme.primary}30;
  }
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const CardElementContainer = styled.div`
  padding: 0.8rem 1rem;
  border: 1px solid ${props => props.theme.divider};
  border-radius: 4px;
  background-color: ${props => props.theme.background};
  transition: all 0.3s ease;
  
  &:focus-within {
    border-color: ${props => props.theme.primary};
    box-shadow: 0 0 0 2px ${props => props.theme.primary}30;
  }
`;

const SubmitButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1rem;
  background-color: ${props => props.theme.primary};
  color: white;
  border-radius: 4px;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  svg {
    margin-right: 0.5rem;
  }
  
  &:hover {
    background-color: ${props => props.theme.secondary};
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const SecureNote = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  color: ${props => props.theme.text.secondary};
  font-size: 0.9rem;
  
  svg {
    margin-right: 0.5rem;
  }
`;

const ErrorMessage = styled.div`
  color: ${props => props.theme.error};
  margin-top: 0.5rem;
  font-size: 0.9rem;
`;

const SuccessMessage = styled.div`
  color: ${props => props.theme.success};
  margin-top: 0.5rem;
  font-size: 0.9rem;
  text-align: center;
  padding: 1rem;
  background-color: ${props => props.theme.success}10;
  border-radius: 4px;
  margin-bottom: 1rem;
`;

// Card element styles
const cardElementOptions = {
  style: {
    base: {
      fontSize: '16px',
      color: '#424770',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#9e2146',
    },
  },
};

// Checkout form component
const CheckoutForm = ({ selectedPlan, plans }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [billingDetails, setBillingDetails] = useState({
    name: '',
    email: '',
    address: {
      line1: '',
      city: '',
      state: '',
      postal_code: '',
      country: '',
    },
  });

  // Get the price ID for the selected plan
  const getPriceId = (planId) => {
    switch (planId) {
      case 'starter':
        return 'price_starter_id';
      case 'professional':
        return 'price_professional_id';
      case 'enterprise':
        return 'price_enterprise_id';
      default:
        return 'price_professional_id';
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    if (error) {
      elements.getElement('card').focus();
      return;
    }

    if (!cardComplete) {
      setError('Please complete your card details.');
      return;
    }

    setProcessing(true);

    // Create payment method
    const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
      billing_details: billingDetails,
    });

    if (paymentMethodError) {
      setError(paymentMethodError.message);
      setProcessing(false);
      return;
    }

    // Create subscription on the server
    try {
      const response = await fetch('/api/subscription/create-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentMethodId: paymentMethod.id,
          email: billingDetails.email,
          name: billingDetails.name,
          priceId: getPriceId(selectedPlan),
        }),
      });

      const subscription = await response.json();

      if (subscription.error) {
        setError(subscription.error);
        setProcessing(false);
        return;
      }

      // Handle subscription status
      if (subscription.status === 'active' || subscription.status === 'trialing') {
        setSuccess(true);
        setError(null);
      } else {
        // Confirm the payment with the client secret
        const { error: confirmError } = await stripe.confirmCardPayment(
          subscription.clientSecret
        );

        if (confirmError) {
          setError(confirmError.message);
        } else {
          setSuccess(true);
          setError(null);
        }
      }
    } catch (err) {
      setError('An error occurred while processing your subscription. Please try again.');
    }

    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      {success && (
        <SuccessMessage>
          Your subscription has been successfully created! You now have access to all features of the {plans.find(p => p.id === selectedPlan).title} plan.
        </SuccessMessage>
      )}
      
      <FormGroup>
        <FormLabel>Name</FormLabel>
        <FormInput
          type="text"
          placeholder="John Doe"
          required
          value={billingDetails.name}
          onChange={(e) => {
            setBillingDetails({ ...billingDetails, name: e.target.value });
          }}
        />
      </FormGroup>
      
      <FormGroup>
        <FormLabel>Email</FormLabel>
        <FormInput
          type="email"
          placeholder="john@example.com"
          required
          value={billingDetails.email}
          onChange={(e) => {
            setBillingDetails({ ...billingDetails, email: e.target.value });
          }}
        />
      </FormGroup>
      
      <FormGroup>
        <FormLabel>Card Details</FormLabel>
        <CardElementContainer>
          <CardElement 
            options={cardElementOptions} 
            onChange={(e) => {
              setError(e.error ? e.error.message : '');
              setCardComplete(e.complete);
            }}
          />
        </CardElementContainer>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </FormGroup>
      
      <FormGroup>
        <FormLabel>Address</FormLabel>
        <FormInput
          type="text"
          placeholder="123 Main St"
          required
          value={billingDetails.address.line1}
          onChange={(e) => {
            setBillingDetails({
              ...billingDetails,
              address: { ...billingDetails.address, line1: e.target.value },
            });
          }}
        />
      </FormGroup>
      
      <FormRow>
        <FormGroup>
          <FormLabel>City</FormLabel>
          <FormInput
            type="text"
            placeholder="San Francisco"
            required
            value={billingDetails.address.city}
            onChange={(e) => {
              setBillingDetails({
                ...billingDetails,
                address: { ...billingDetails.address, city: e.target.value },
              });
            }}
          />
        </FormGroup>
        
        <FormGroup>
          <FormLabel>State/Province</FormLabel>
          <FormInput
            type="text"
            placeholder="CA"
            required
            value={billingDetails.address.state}
            onChange={(e) => {
              setBillingDetails({
                ...billingDetails,
                address: { ...billingDetails.address, state: e.target.value },
              });
            }}
          />
        </FormGroup>
      </FormRow>
      
      <FormRow>
        <FormGroup>
          <FormLabel>Zip/Postal Code</FormLabel>
          <FormInput
            type="text"
            placeholder="94103"
            required
            value={billingDetails.address.postal_code}
            onChange={(e) => {
              setBillingDetails({
                ...billingDetails,
                address: { ...billingDetails.address, postal_code: e.target.value },
              });
            }}
          />
        </FormGroup>
        
        <FormGroup>
          <FormLabel>Country</FormLabel>
          <FormInput
            type="text"
            placeholder="United States"
            required
            value={billingDetails.address.country}
            onChange={(e) => {
              setBillingDetails({
                ...billingDetails,
                address: { ...billingDetails.address, country: e.target.value },
              });
            }}
          />
        </FormGroup>
      </FormRow>
      
      <SubmitButton type="submit" disabled={!stripe || processing || success}>
        <FiCreditCard /> {processing ? 'Processing...' : 'Subscribe Now'}
      </SubmitButton>
      
      <SecureNote>
        <FiLock /> Your payment information is secure and encrypted
      </SecureNote>
    </form>
  );
};

const SubscriptionPage = () => {
  const [selectedPlan, setSelectedPlan] = useState('professional');
  
  const plans = [
    {
      id: 'starter',
      title: 'Starter',
      price: '$49',
      period: '/month',
      features: [
        'Case Management',
        'Client Communication',
        'Document Storage',
        'Basic Reporting',
        'Email Support',
        'Up to 3 Users'
      ]
    },
    {
      id: 'professional',
      title: 'Professional',
      price: '$99',
      period: '/month',
      features: [
        'Everything in Starter',
        'Lead Tracking',
        'Task Automation',
        'Advanced Reporting',
        'Priority Support',
        'Up to 10 Users',
        'API Access'
      ]
    },
    {
      id: 'enterprise',
      title: 'Enterprise',
      price: '$199',
      period: '/month',
      features: [
        'Everything in Professional',
        'Custom Workflows',
        'White Labeling',
        'Dedicated Account Manager',
        'Unlimited Users',
        'Advanced Security Features',
        'Custom Integrations'
      ]
    }
  ];
  
  return (
    <Elements stripe={stripePromise}>
      <SubscriptionContainer>
        <PageHeader>
          <PageTitle>Choose Your Subscription Plan</PageTitle>
          <PageDescription>
            Select the plan that best fits your firm's needs. All plans include a 14-day free trial.
          </PageDescription>
        </PageHeader>
        
        <PlanSelector>
          {plans.map(plan => (
            <PlanOption 
              key={plan.id}
              selected={selectedPlan === plan.id}
              onClick={() => setSelectedPlan(plan.id)}
            >
              <PlanTitle>{plan.title}</PlanTitle>
              <PlanPrice>
                {plan.price} <span>{plan.period}</span>
              </PlanPrice>
              <PlanFeatures>
                {plan.features.map((feature, index) => (
                  <PlanFeature key={index}>
                    <FiCheck /> {feature}
                  </PlanFeature>
                ))}
              </PlanFeatures>
            </PlanOption>
          ))}
        </PlanSelector>
        
        <PaymentForm>
          <FormTitle>Payment Information</FormTitle>
          <CheckoutForm selectedPlan={selectedPlan} plans={plans} />
        </PaymentForm>
      </SubscriptionContainer>
    </Elements>
  );
};

export default SubscriptionPage;
