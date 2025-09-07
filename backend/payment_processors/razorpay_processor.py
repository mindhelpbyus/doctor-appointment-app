
import razorpay
import os
from fastapi import HTTPException

# --- SECURITY WARNING ---
# Your Razorpay keys must be kept secret.
# DO NOT hard-code them here. Load them from secure environment variables.

# Get the keys from environment variables
RAZORPAY_KEY_ID = os.getenv('RAZORPAY_KEY_ID')
RAZORPAY_KEY_SECRET = os.getenv('RAZORPAY_KEY_SECRET')

if not RAZORPAY_KEY_ID or not RAZORPAY_KEY_SECRET:
    print("WARNING: RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET environment variables not set.")
    print("Razorpay processing will fail until valid keys are provided.")
    # Use placeholder keys to avoid crashing the app on startup
    client = None
else:
    client = razorpay.Client(auth=(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET))

def create_order(amount: int, currency: str):
    """
    Creates a payment order with Razorpay.

    Args:
        amount: The amount in the smallest currency unit (e.g., paise for INR).
        currency: The 3-letter ISO currency code (e.g., 'inr').

    Returns:
        A dictionary containing the order_id for the frontend to use.
    """
    if not client:
        raise HTTPException(
            status_code=500, 
            detail="Razorpay client not initialized. Check server configuration."
        )

    order_data = {
        "amount": amount,
        "currency": currency,
        "receipt": f"receipt_order_{os.urandom(4).hex()}",
        "payment_capture": 1 # Auto-capture the payment
    }

    try:
        order = client.order.create(data=order_data)
        # The frontend will use this order_id to open the Razorpay checkout
        return {"order_id": order['id'], "provider": "razorpay"}
    except Exception as e:
        # Handle Razorpay API errors or other exceptions
        raise HTTPException(status_code=500, detail=f"An error occurred with Razorpay: {str(e)}")
