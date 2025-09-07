# MindHelp API Frontend Tester & UI Integration Guide

This directory contains a self-contained frontend application designed to be a comprehensive, interactive testing tool for the MindHelp API. It serves as a live demonstration of how a UI can authenticate and interact with every endpoint in the backend.

## 1. Purpose

- **Live API Documentation:** Provides a working example of how to make authenticated requests to all API endpoints.
- **Integration Testing:** Allows for quick, hands-on testing of the backend API without needing a tool like Postman.
- **Authentication Demo:** Shows a complete authentication flow using Firebase Authentication, from login to token-based API requests.

---

## 2. Setup and Configuration

Before you can use this tester, you need to configure both the backend and this frontend with your Firebase project details.

### Step 2.1: Create a Firebase Project

1.  Go to the [Firebase Console](https://console.firebase.google.com/).
2.  Click "Add project" and follow the on-screen instructions.

### Step 2.2: Get Backend `serviceAccountKey.json`

The backend needs administrator credentials to verify tokens.

1.  In your Firebase project, go to **Project Settings > Service accounts**.
2.  Select "Python" for the Admin SDK configuration snippet.
3.  Click **"Generate new private key"**.
4.  A file named `serviceAccountKey.json` will be downloaded. **Move this file into the `backend/` directory** of your project.

### Step 2.3: Get Frontend `firebaseConfig`

The frontend needs API keys to interact with Firebase Authentication.

1.  In your Firebase project, go to **Project Settings > General**.
2.  Scroll down to "Your apps".
3.  Click the Web icon (`</>`) to create a new web app.
4.  Give it a nickname (e.g., "MindHelp UI Tester") and register the app.
5.  Firebase will display a `firebaseConfig` object. You need to copy this.
6.  Open `frontend/script.js` and **paste your configuration** into the `firebaseConfig` constant at the top of the file, replacing the placeholder values.

### Step 2.4: Create a Test User

1.  In the Firebase Console, go to the **Authentication** section (under "Build").
2.  Click the "Sign-in method" tab and enable **Email/Password** as a provider.
3.  Go back to the "Users" tab and click **"Add user"**.
4.  Enter an email and password for your test user. This is what you will use to log in to the API tester.

---

## 3. How to Run the Tester

1.  **Install Dependencies:** Make sure you have installed all required Python packages for the backend:
    ```bash
    pip install -r backend/requirements.txt
    ```

2.  **Start the Backend Server:** Open a terminal in the project's root directory and run the FastAPI app:
    ```bash
    uvicorn backend.main:app --reload
    ```

3.  **Start the Frontend Server:** Open a **second terminal** in the project's root directory. The simplest way to serve the frontend is with Python's built-in web server:
    ```bash
    python -m http.server
    ```
    *This will serve the project files on port 8000.*

4.  **Access the Tester:** Open your web browser and navigate to:
    [http://localhost:8000/frontend/](http://localhost:8000/frontend/)

---

## 4. How to Use the Interactive Tester

1.  **Login:** Use the email and password for the test user you created in Firebase.
2.  **Select a Resource:** Once logged in, use the dropdown menu to choose an API resource (e.g., `patients`, `doctors`).
3.  **View `GET` Data:** Upon selection, the application automatically makes a `GET` request to `/{resource}/` and displays the JSON response in the "GET Response Data" box.
4.  **Create New Items (`POST`):** A form will appear on the right, dynamically generated based on the selected resource. 
    - Fill in the required fields.
    - Click "Create".
    - The application will make a `POST` request to `/{resource}/`.
    - The response from the `POST` request will be shown in the data display area.
    - The `GET` list is then refreshed automatically.
5.  **Check Status:** The status bar will show success or error messages for each API call, providing immediate feedback.
6.  **Logout:** Click the logout button to sign out and return to the login screen.
