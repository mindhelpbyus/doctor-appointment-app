
from fastapi import FastAPI, HTTPException, Depends
from typing import List
import boto3
from botocore.exceptions import ClientError

from models import Patient, Doctor, Appointment, Review, Message, MedicalRecord, LabResult, User, Dashboard
from auth import verify_token

app = FastAPI()

# Configure boto3 to use the local DynamoDB instance
dynamodb = boto3.resource('dynamodb', endpoint_url="http://localhost:8000")

# Helper function to get a table resource
def get_table(table_name: str):
    return dynamodb.Table(table_name)

# --- Secured Generic Endpoints ---

@app.get("/{entity_name}/")
def get_all_items(entity_name: str, user: dict = Depends(verify_token)):
    table = get_table(entity_name)
    try:
        response = table.scan()
        return response.get('Items', [])
    except ClientError as e:
        raise HTTPException(status_code=500, detail=e.response['Error']['Message'])

@app.get("/{entity_name}/{item_id}")
def get_item_by_id(entity_name: str, item_id: str, user: dict = Depends(verify_token)):
    table = get_table(entity_name)
    try:
        response = table.get_item(Key={'id': item_id})
        item = response.get('Item')
        if not item:
            raise HTTPException(status_code=404, detail=f"{entity_name[:-1].capitalize()} not found")
        return item
    except ClientError as e:
        raise HTTPException(status_code=500, detail=e.response['Error']['Message'])

# Generic CREATE item in a table
def create_item(entity_name: str, item_data: dict):
    table = get_table(entity_name)
    try:
        table.put_item(Item=item_data)
        return item_data
    except ClientError as e:
        raise HTTPException(status_code=500, detail=e.response['Error']['Message'])


# --- Entity-Specific CREATE Endpoints (Now Secured) ---

@app.post("/patients/", response_model=Patient)
def create_patient_endpoint(patient: Patient, user: dict = Depends(verify_token)):
    return create_item('patients', patient.dict())

@app.post("/doctors/", response_model=Doctor)
def create_doctor_endpoint(doctor: Doctor, user: dict = Depends(verify_token)):
    return create_item('doctors', doctor.dict())

@app.post("/appointments/", response_model=Appointment)
def create_appointment_endpoint(appointment: Appointment, user: dict = Depends(verify_token)):
    return create_item('appointments', appointment.dict())

@app.post("/reviews/", response_model=Review)
def create_review_endpoint(review: Review, user: dict = Depends(verify_token)):
    return create_item('reviews', review.dict())

@app.post("/messages/", response_model=Message)
def create_message_endpoint(message: Message, user: dict = Depends(verify_token)):
    return create_item('messages', message.dict())

@app.post("/medical_records/", response_model=MedicalRecord)
def create_medical_record_endpoint(medical_record: MedicalRecord, user: dict = Depends(verify_token)):
    return create_item('medical_records', medical_record.dict())

@app.post("/lab_results/", response_model=LabResult)
def create_lab_result_endpoint(lab_result: LabResult, user: dict = Depends(verify_token)):
    return create_item('lab_results', lab_result.dict())

@app.post("/users/", response_model=User)
def create_user_endpoint(user_model: User, user: dict = Depends(verify_token)):
    # Note: Renamed 'user' to 'user_model' to avoid conflict with the dependency
    return create_item('users', user_model.dict())

@app.post("/dashboards/", response_model=Dashboard)
def create_dashboard_endpoint(dashboard: Dashboard, user: dict = Depends(verify_token)):
    return create_item('dashboards', dashboard.dict())
