
import logging
import logging.handlers
import os
import sys
from fastapi import FastAPI, HTTPException, Depends, Request
from typing import List
import boto3
from botocore.exceptions import ClientError

from models import Patient, Doctor, Appointment, Review, Message, MedicalRecord, LabResult, User, Dashboard
from auth import verify_token

# --- Multi-Cloud Compliant Logging Setup ---

# 1. Get logging configuration from environment variables
LOGGING_HOST = os.environ.get("LOGGING_HOST", "localhost")
LOGGING_PORT = int(os.environ.get("LOGGING_PORT", 514))

# 2. Filter to exclude sensitive data from logs
class NoSensitiveDataFilter(logging.Filter):
    def filter(self, record):
        return 'sensitive' not in record.getMessage()

# 3. Configure the logger to use Syslog
logger = logging.getLogger("api_logger")
logger.setLevel(logging.INFO)

# 4. Create a Syslog handler
# This will send logs to the service specified by the env vars.
handler = logging.handlers.SysLogHandler(address=(LOGGING_HOST, LOGGING_PORT))
formatter = logging.Formatter('MindHelpAPI: %(asctime)s - %(name)s - %(levelname)s - %(message)s')
handler.setFormatter(formatter)

# 5. Add the filter and handler
logger.addFilter(NoSensitiveDataFilter())
logger.addHandler(handler)


app = FastAPI()

# --- Service Monitoring Endpoint ---
@app.get("/health", status_code=200)
def health_check():
    """A simple endpoint for service monitoring tools to check API health."""
    logger.info("Health check endpoint was called.")
    return {"status": "ok"}

# Configure boto3 to use the local DynamoDB instance
dynamodb = boto3.resource('dynamodb', endpoint_url="http://localhost:8000")

# Helper function to get a table resource
def get_table(table_name: str):
    return dynamodb.Table(table_name)

# --- Audited Generic Endpoints ---

@app.get("/{entity_name}/")
def get_all_items(entity_name: str, request: Request, user: dict = Depends(verify_token)):
    logger.info(f"Audit - User: {user.get('uid')} is accessing all items from entity: {entity_name}")
    table = get_table(entity_name)
    try:
        response = table.scan()
        return response.get('Items', [])
    except ClientError as e:
        logger.error(f"AWS ClientError for user {user.get('uid')} on {entity_name}: {e}")
        raise HTTPException(status_code=500, detail=e.response['Error']['Message'])

@app.get("/{entity_name}/{item_id}")
def get_item_by_id(entity_name: str, item_id: str, request: Request, user: dict = Depends(verify_token)):
    logger.info(f"Audit - User: {user.get('uid')} is accessing item {item_id} from entity: {entity_name}")
    table = get_table(entity_name)
    try:
        response = table.get_item(Key={'id': item_id})
        item = response.get('Item')
        if not item:
            raise HTTPException(status_code=404, detail=f"{entity_name[:-1].capitalize()} not found")
        return item
    except ClientError as e:
        logger.error(f"AWS ClientError for user {user.get('uid')} on {entity_name}/{item_id}: {e}")
        raise HTTPException(status_code=500, detail=e.response['Error']['Message'])

# Generic CREATE item in a table
def create_item(entity_name: str, item_data: dict, user_id: str):
    logger.info(f"Audit - User: {user_id} is creating an item in entity: {entity_name}")
    table = get_table(entity_name)
    try:
        table.put_item(Item=item_data)
        return item_data
    except ClientError as e:
        logger.error(f"AWS ClientError on create for user {user_id} on {entity_name}: {e}")
        raise HTTPException(status_code=500, detail=e.response['Error']['Message'])

# --- Entity-Specific CREATE Endpoints (Now Audited) ---

@app.post("/patients/", response_model=Patient)
def create_patient_endpoint(patient: Patient, user: dict = Depends(verify_token)):
    return create_item('patients', patient.dict(), user.get('uid'))

@app.post("/doctors/", response_model=Doctor)
def create_doctor_endpoint(doctor: Doctor, user: dict = Depends(verify_token)):
    return create_item('doctors', doctor.dict(), user.get('uid'))

@app.post("/appointments/", response_model=Appointment)
def create_appointment_endpoint(appointment: Appointment, user: dict = Depends(verify_token)):
    return create_item('appointments', appointment.dict(), user.get('uid'))

@app.post("/reviews/", response_model=Review)
def create_review_endpoint(review: Review, user: dict = Depends(verify_token)):
    return create_item('reviews', review.dict(), user.get('uid'))

@app.post("/messages/", response_model=Message)
def create_message_endpoint(message: Message, user: dict = Depends(verify_token)):
    return create_item('messages', message.dict(), user.get('uid'))

@app.post("/medical_records/", response_model=MedicalRecord)
def create_medical_record_endpoint(medical_record: MedicalRecord, user: dict = Depends(verify_token)):
    return create_item('medical_records', medical_record.dict(), user.get('uid'))

@app.post("/lab_results/", response_model=LabResult)
def create_lab_result_endpoint(lab_result: LabResult, user: dict = Depends(verify_token)):
    return create_item('lab_results', lab_result.dict(), user.get('uid'))

@app.post("/users/", response_model=User)
def create_user_endpoint(user_model: User, user: dict = Depends(verify_token)):
    return create_item('users', user_model.dict(), user.get('uid'))

@app.post("/dashboards/", response_model=Dashboard)
def create_dashboard_endpoint(dashboard: Dashboard, user: dict = Depends(verify_token)):
    return create_item('dashboards', dashboard.dict(), user.get('uid'))
