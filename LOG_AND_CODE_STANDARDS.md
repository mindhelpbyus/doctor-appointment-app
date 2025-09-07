# Application Logging & Coding Standards

This document outlines the essential standards for logging, coding, and handling data within the MindHelp platform. Adherence to these standards is mandatory to ensure the application is secure, compliant (HIPAA, PCI), maintainable, and scalable.

---

## 1. Logging Standards (HIPAA & Security)

Our logging system is a critical component for maintaining a HIPAA-compliant audit trail and for security monitoring. It is configured in `backend/main.py`.

### 1.1. The Golden Rule of Logging

**NEVER log raw Personally Identifiable Information (PII) or Protected Health Information (PHI) under any circumstances.**

- **Allowed:** User IDs, entity IDs, timestamps, error codes, stack traces, action descriptions (e.g., "User X accessed resource Y").
- **Forbidden:** Patient names, user emails, passwords, credit card details (even partial), Social Security Numbers, addresses, medical record contents, message contents.

### 1.2. Audit Logging

Every API endpoint that performs a read, create, update, or delete operation **MUST** have an audit log entry.

- **Format:** `logger.info(f"Audit - User: {user_id} is {action} on {resource}")`
- **Example (GET):** `logger.info(f"Audit - User: {user.get('uid')} is accessing item {item_id} from entity: {entity_name}")`
- **Example (POST):** `logger.info(f"Audit - User: {user_id} is creating an item in entity: {entity_name}")`

### 1.3. Error Logging

All `try...except` blocks, especially those involving database or external API calls, **MUST** log errors.

- **Format:** `logger.error(f"Error for user {user_id} on {action}: {error_object}")`
- **Example:** `logger.error(f"AWS ClientError for user {user.get('uid')} on {entity_name}: {e}")`

### 1.4. Proactive Filtering

The system has a `NoSensitiveDataFilter`. While developers should never write sensitive data to logs, this provides a backup. If you are handling a particularly sensitive operation and want to be explicit, you can mark a log message to be filtered, although this should be rare.

- **Example:** `logger.info("sensitive: this message will be filtered and not appear in logs")`

---

## 2. Backend Coding Standards (Python/FastAPI)

### 2.1. Formatting and Linting

- **Formatting:** All Python code **MUST** be formatted using **Black**. This is non-negotiable and ensures consistency.
- **Linting:** We will use **Flake8** to identify potential bugs, style errors, and complexity issues. All code should pass Flake8 checks before being committed.

### 2.2. Data Models & Validation

- All data entering or leaving the API **MUST** be defined by a Pydantic model in `models.py`.
- Use Pydantic's built-in validators to enforce data constraints (e.g., `min_length`, `max_length`, `EmailStr`). This is our first line of defense against invalid data.

### 2.3. Security Best Practices

- **Dependencies:** Use `Depends(verify_token)` for **all** API endpoints. No endpoint should be public unless explicitly designed to be.
- **Error Handling:** Do not expose detailed internal error messages to the client. Use generic `HTTPException` messages. Log the detailed error internally (see Section 1.3).
- **Configuration:** Use environment variables for all secrets (API keys, database URLs, etc.). Do not hardcode them. We will create a `.env` file for this.

### 2.4. PCI Compliance (Payment Data)

- The backend application **MUST NOT** see, handle, or store raw credit card numbers, expiration dates, or CVV codes.
- All payment processing logic **MUST** be delegated to the certified payment provider SDKs (Stripe, Razorpay). Our role is to manage payment tokens and process the results, not the cardholder data itself. The code in `backend/payment_processors/` must strictly adhere to this principle.
