from pydantic import BaseModel
from typing import List, Optional

class Patient(BaseModel):
    id: str
    name: str
    email: str
    phone: Optional[str] = None
    address: Optional[str] = None
    age: Optional[int] = None
    gender: Optional[str] = None

class Doctor(BaseModel):
    id: str
    name: str
    specialty: str
    email: str
    phone: Optional[str] = None
    address: Optional[str] = None

class Appointment(BaseModel):
    id: str
    patient_id: str
    doctor_id: str
    appointment_date: str
    reason: str
    status: str

class Review(BaseModel):
    id: str
    patient_id: str
    doctor_id: str
    rating: int
    comment: Optional[str] = None

class Message(BaseModel):
    id: str
    sender_id: str
    receiver_id: str
    message: str
    timestamp: str

class MedicalRecord(BaseModel):
    id: str
    patient_id: str
    record_date: str
    notes: str

class LabResult(BaseModel):
    id: str
    patient_id: str
    result_date: str
    test_name: str
    result: str

class User(BaseModel):
    id: str
    username: str
    email: str
    role: str # e.g., 'patient', 'doctor', 'admin'

class Dashboard(BaseModel):
    id: str
    user_id: str
    layout: dict

# --- NEW MODELS ---

# Clinical & Patient Experience Entities
class Mood(BaseModel):
    id: str
    patient_id: str
    mood_level: int # e.g., 1-5 scale
    entry_date: str
    notes: Optional[str] = None

class Journal(BaseModel):
    id: str
    patient_id: str
    entry_date: str
    title: str
    content: str

class CalendarEvent(BaseModel):
    id: str
    user_id: str
    title: str
    start_time: str
    end_time: str
    description: Optional[str] = None

class VisitSummary(BaseModel):
    id: str
    appointment_id: str
    summary_notes: str
    doctor_recommendations: Optional[str] = None

# Financial & Administrative Entities
class Promo(BaseModel):
    id: str
    promo_code: str
    discount_percentage: int
    expiration_date: str
    description: str

class Payment(BaseModel):
    id: str
    patient_id: str
    invoice_id: str
    amount: int # Store amount in cents to avoid floating point issues
    currency: str
    payment_date: str
    status: str # e.g., 'succeeded', 'pending', 'failed'
    transaction_id: str # The ID from the payment processor (e.g., Stripe's txn_...)

class Billing(BaseModel):
    id: str
    patient_id: str
    billing_address: str
    payment_method_id: Optional[str] = None # A token from the payment processor

class Invoice(BaseModel):
    id: str
    patient_id: str
    issue_date: str
    due_date: str
    amount: int
    status: str # e.g., 'paid', 'unpaid', 'overdue'
    line_items: List[dict]


# --- Payment Gateway Models ---

class PaymentIntentRequest(BaseModel):
    amount: int  # Amount in cents
    currency: str  # e.g., 'usd', 'inr'
    processor: str # e.g., 'stripe', 'razorpay'

class PaymentIntentResponse(BaseModel):
    client_secret: str

class StripeWebhookEventData(BaseModel):
    object: dict

class StripeWebhookEvent(BaseModel):
    id: str
    object: str
    api_version: str
    data: StripeWebhookEventData
    type: str
