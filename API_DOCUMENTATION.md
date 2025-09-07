# API Documentation

This document provides detailed information about the MindHelp API. It is intended for developers who will be interacting with the backend services, including frontend developers and system integrators.

## Table of Contents
1. [Environment Configuration](#1-environment-configuration)
2. [Authentication](#2-authentication)
3. [API Gateway Endpoints](#3-api-gateway-endpoints)
4. [Data Models](#4-data-models)
5. [Patient APIs](#5-patient-apis)
6. [Doctor APIs](#6-doctor-apis)
7. [Appointment APIs](#7-appointment-apis)
8. [User APIs](#8-user-apis)
9. [Dashboard API](#9-dashboard-api)
10. [Other API Resources](#10-other-api-resources)
11. [Error Responses](#11-error-responses)
12. [UI Integration Guide](#12-ui-integration-guide)

---

## 1. Environment Configuration

The API is available under different base URLs depending on the environment:

- **Development:** `http://localhost:8000`
- **Staging:** `https://api.staging.your-app.com` (Example)
- **Production:** `https://api.your-app.com` (Example)

All endpoint paths in this document are relative to these base URLs.

## 2. Authentication

In a production environment, all requests to the API must be authenticated. The API uses a token-based authentication system (JWT).

To authenticate, include an `Authorization` header with the `Bearer` scheme:

`Authorization: Bearer <your-jwt-token>`

*The development environment (`localhost:8000`) currently does not enforce authentication for ease of testing.*

## 3. API Gateway Endpoints

In a cloud environment (AWS, GCP, Azure), all API traffic is routed through an API Gateway. The gateway is responsible for authentication, rate limiting, and routing requests to the appropriate backend service.

The endpoints listed in this document represent the final, publicly accessible URLs exposed by the gateway.

## 4. Data Models

This section provides a complete reference for all data structures used in API requests and responses.

- **Patient**: `{ "id": string, "name": string, "email": string, "phone": string?, "address": string?, "age": int?, "gender": string? }`
- **Doctor**: `{ "id": string, "name": string, "specialty": string, "email": string, "phone": string?, "address": string? }`
- **Appointment**: `{ "id": string, "patient_id": string, "doctor_id": string, "appointment_date": string, "reason": string, "status": string }`
- **Review**: `{ "id": string, "patient_id": string, "doctor_id": string, "rating": int, "comment": string? }`
- **Message**: `{ "id": string, "sender_id": string, "receiver_id": string, "message": string, "timestamp": string }`
- **MedicalRecord**: `{ "id": string, "patient_id": string, "record_date": string, "notes": string }`
- **LabResult**: `{ "id": string, "patient_id": string, "result_date": string, "test_name": string, "result": string }`
- **User**: `{ "id": string, "username": string, "email": string, "role": string }`
- **Dashboard**: `{ "id": string, "user_id": string, "layout": object }`

*Fields marked with `?` or `Optional` are not required.*

---

## 5. Patient APIs

- `GET /patients/`: Retrieves a list of all patients.
- `POST /patients/`: Creates a new patient. (Request Body: `Patient` model)
- `GET /patients/{id}`: Retrieves a single patient by their ID.

## 6. Doctor APIs

- `GET /doctors/`: Retrieves a list of all doctors.
- `POST /doctors/`: Creates a new doctor. (Request Body: `Doctor` model)
- `GET /doctors/{id}`: Retrieves a single doctor by their ID.

## 7. Appointment APIs

- `GET /appointments/`: Retrieves a list of all appointments.
- `POST /appointments/`: Creates a new appointment. (Request Body: `Appointment` model)
- `GET /appointments/{id}`: Retrieves a single appointment by its ID.

## 8. User APIs

- `GET /users/`: Retrieves a list of all users.
- `POST /users/`: Creates a new user. (Request Body: `User` model)
- `GET /users/{id}`: Retrieves a single user by their ID.

## 9. Dashboard API

This endpoint manages user-specific dashboard configurations.

- `GET /dashboards/`: Retrieves all dashboard configurations.
- `POST /dashboards/`: Creates a new dashboard configuration. (Request Body: `Dashboard` model)
- `GET /dashboards/{id}`: Retrieves a dashboard configuration by its ID.

## 10. Other API Resources

The following resources follow the same RESTful pattern as the APIs above (`GET /<resource>/`, `POST /<resource>/`, `GET /<resource>/{id}`).

- `/reviews/` (Manages patient reviews for doctors)
- `/messages/` (Handles direct messages between users)
- `/medical_records/` (Stores patient medical records)
- `/lab_results/` (Stores patient lab results)

---

## 11. Error Responses

The API uses standard HTTP status codes for error handling.

- **`404 Not Found`**: The requested resource could not be found. Example: `{ "detail": "Patient not found" }`
- **`422 Unprocessable Entity`**: The request payload is invalid. The response will contain details about the validation errors.
- **`500 Internal Server Error`**: An unexpected server error occurred.

## 12. UI Integration Guide

This section provides guidance for frontend developers consuming the API.

- **Setting Headers**: Ensure all requests have the `Content-Type: application/json` header. Authenticated requests must also include the `Authorization` header as described in section 2.
- **Handling Responses**: Always check the HTTP status code of the response before attempting to parse the body. A successful `POST` request will typically return a `200 OK` with the created resource.
- **CORS**: The API server is configured to allow cross-origin requests from authorized domains. During development on `localhost`, this is generally permissive. For staging and production, the frontend's domain must be added to the allowlist.
- **Data Formatting**: All dates and times are returned in ISO 8601 format (e.g., `2024-08-15T10:00:00Z`). It is the frontend's responsibility to format these dates appropriately for the user.