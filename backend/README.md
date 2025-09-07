# Backend Service

This directory contains the Python backend service for the Docsy application.

## Setup

1.  **Install Dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

2.  **Configure Environment Variables:**
    -   Create a `.env` file in this directory.
    -   Add your AWS credentials to the `.env` file:
        ```
        AWS_ACCESS_KEY_ID=YOUR_AWS_ACCESS_KEY_ID
        AWS_SECRET_ACCESS_KEY=YOUR_AWS_SECRET_ACCESS_KEY
        AWS_REGION=us-east-1
        ```

3.  **Run the Server:**
    ```bash
    uvicorn main:app --reload
    ```

    The server will be available at `http://127.0.0.1:8000`.
