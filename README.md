# DOCSY - Comprehensive Health & Wellness Platform

Welcome to the DOCSY project! This document is the central starting point for developers. Its purpose is to provide a high-level overview of the project, its sophisticated architecture, and how to get it up and running.

---

## 1. Project Vision

DOCSY is a comprehensive, multi-tenant, and scalable platform designed to serve as the core operating system for healthcare providers, from individual practitioners to large agencies. Our mission is to provide a seamless, all-in-one solution for patient management, scheduling, billing, and communication, enabling providers to deliver superior care.

---

## 2. Core Features

This platform is feature-rich, and the codebase reflects a wide range of capabilities:

- **Multi-Tenancy & Agency Management:** The platform is built to support multiple provider agencies, each with its own doctors, patients, and branding.
- **Provider Onboarding:** Streamlined workflows for new providers and agencies to join the platform (`ProviderOnboardingPage.tsx`).
- **Advanced Scheduling:** A complete calendar and booking system that manages real-time availability for staff, appointments, and classes (`SchedulingFeaturePage.tsx`, `DoctorAvailabilityCalendar.tsx`).
- **Integrated Payments & Billing:** A robust billing system that supports multiple payment gateways (**Stripe** and **Razorpay**), invoicing, and secure checkouts (`PaymentsFeaturePage.tsx`, `razorpay_processor.py`, `stripe_processor.py`).
- **Role-Based Dashboards:** Tailored dashboard experiences for Patients, Doctors, and Agency administrators, with relevant widgets and data visualizations (`PatientDashboardPage.tsx`, `DoctorDashboardPage.tsx`, `AgencyDashboardPage.tsx`).
- **Secure Real-Time Messaging:** HIPAA-compliant chat functionality between patients, doctors, and staff (`ChatLayout.tsx`, `doctor_messaging_inbox.tsx`).
- **Patient Wellness Tools:** Features for patients to track their well-being, including a **Mood Tracker** and **Private Journal** (`PatientJournalTab.tsx`, `PatientMoodTrackerTab.tsx`).
- **Marketing & Promotions:** Tools for agencies to create and manage marketing campaigns and promotions (`MarketingFeaturePage.tsx`, `CreatePromotionForm.tsx`).
- **Staff Management:** Functionality for agencies to manage their staff and resources (`StaffManagementFeaturePage.tsx`).
- **Reporting & Analytics:** In-depth analytics for tracking user growth, revenue, appointments, and more (`ReportingFeaturePage.tsx`, `new_user_growth.tsx`).

---

## 3. System Architecture

The DOCSY platform is built on a modern, decoupled, and multi-cloud architecture:

- **Backend:** A RESTful API built with **Python** and **FastAPI**. It handles all business logic, data processing, and integration with third-party services.
- **Frontend:** A rich single-page application built with **React**, **TypeScript**, and **Vite**, utilizing **Tailwind CSS** for styling.
- **Database:** **Amazon DynamoDB** serves as the primary NoSQL data store.
- **Authentication:** **Firebase Authentication** handles secure user management, including plans for multi-factor authentication.
- **Payment Processors:** The backend is architected to support multiple payment gateways, with current integrations for **Stripe** and **Razorpay**.
- **Multi-Cloud Infrastructure (IaC):** The cloud infrastructure is defined using the **AWS CDK** and **Terraform**. The project is structured to be portable across **AWS**, **Azure**, **GCP**, and **OCI**, a key strategic feature (`infra/providers/{aws,azure,gcp,oci}`).

---

## 4. Tech Stack

| Category           | Technology                                                    |
| ------------------ | ------------------------------------------------------------- |
| **Backend**        | Python, FastAPI, Boto3                                        |
| **Frontend**       | React, TypeScript, Vite, Tailwind CSS, pnpm                   |
| **Database**       | Amazon DynamoDB                                               |
| **Authentication** | Firebase Authentication, Firebase Admin SDK                   |
| **Infrastructure** | AWS CDK, Terraform, Multi-Cloud (AWS, Azure, GCP, OCI)        |
| **Payments**       | Stripe, Razorpay                                              |

---

## 5. Getting Started: A Guide for New Developers

(This guide assumes you have the necessary prerequisites like Node.js, Python, AWS CLI, and a Firebase account.)

### Step 1: Clone & Install Dependencies

```bash
# Clone the repository
# git clone <repository-url>

# Install backend (Python) dependencies
cd backend
pip install -r requirements.txt
cd ..

# Install all monorepo (frontend, infra) dependencies from the root
pnpm install
```

### Step 2: Configure Environment

- **Backend:** Place your `serviceAccountKey.json` from Firebase in the `backend/` directory.
- **Frontend:** Update the `firebaseConfig` object in the main application's Firebase initialization file.
- **Infrastructure:** Ensure your AWS/GCP/Azure/OCI credentials are correctly configured in your environment.

### Step 3: Run the Development Servers

```bash
# In one terminal, run the backend API server
cd backend
uvicorn main:app --reload

# In a second terminal, run the frontend dev server
# This will start the main React application
pnpm run dev
```

---

## 6. Project Structure Overview

```
/
├── backend/         # FastAPI API (Python)
│   ├── payment_processors/ # Stripe, Razorpay integrations
├── src/             # Main React application source code
│   ├── pages/         # Top-level page components for features and dashboards
│   ├── components/    # Reusable UI components, widgets, and forms
│   └── data/          # Mock data and schemas
├── infra/           # IaC for Multi-Cloud deployment (CDK, Terraform)
│   └── providers/     # Cloud-specific configurations (aws, azure, gcp, oci)
├── frontend/        # Standalone API Tester tool (HTML, JS, CSS)
├── API_DOCUMENTATION.md # Detailed API endpoint reference.
└── README.md          # This file.
```
