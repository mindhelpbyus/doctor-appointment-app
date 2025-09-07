
import stripe
import os
from fastapi import HTTPException

# --- SECURITY WARNING ---
# Your Stripe secret key must be kept secret.
# DO NOT hard-code it here. Load it from a secure environment variable.
# Example: stripe.api_key = os.getenv('STRIPE_SECRET_KEY')
# You will need to set this STRIPE_SECRET_KEY in your terminal or hosting environment.

# Get the key from an environment variable
STRIPE_API_KEY = os.getenv('STRIPE_SECRET_KEY')
if not STRIPE_API_KEY:
    # This is a fallback for demonstration purposes. 
    # In a real production environment, the app should fail to start if the key is missing.
    print("WARNING: STRIPE_SECRET_KEY environment variable not set. Using a placeholder.")
    print("Payment processing will fail until a valid key is provided.")
    stripe.api_key = "sk_test_YOUR_KEY_HERE" # This is a placeholder and will not work
else:
    stripe.api_key = STRIPE_API_KEY

def create_payment_intent(amount: int, currency: str):
    """
    Creates a payment intent with Stripe.

    Args:
        amount: The amount in the smallest currency unit (e.g., cents for USD).
        currency: The 3-letter ISO currency code (e.g., 'usd', 'inr').

    Returns:
        A dictionary containing the client_secret for the frontend to use.
    """
    try:
        intent = stripe.PaymentIntent.create(
            amount=amount,
            currency=currency,
            # This tells Stripe to automatically handle the capture of the payment
            # upon confirmation by the user on the frontend.
            automatic_payment_methods={"enabled": True},
        )
        return {"client_secret": intent.client_secret}
    except stripe.error.StripeError as e:
        # Handle specific Stripe errors
        raise HTTPException(status_code=e.http_status, detail=str(e.user_message))
    except Exception as e:
        # Handle other unexpected errors (e.g., network issues)
        raise HTTPException(status_code=500, detail=f"An internal error occurred: {str(e)}")
