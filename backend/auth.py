
import os
import firebase_admin
from firebase_admin import credentials, auth
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

# --- Firebase Admin SDK Initialization ---

# IMPORTANT: You must download your own serviceAccountKey.json from your
# Firebase project settings and place it in the root of the backend directory.
# For security, it's recommended to load this from an environment variable in production.
try:
    cred_path = os.path.join(os.path.dirname(__file__), 'serviceAccountKey.json')
    cred = credentials.Certificate(cred_path)
    firebase_admin.initialize_app(cred)
except Exception as e:
    print(f"Warning: Firebase Admin SDK could not be initialized. Authentication will not work. Error: {e}")
    # This allows the app to run without the key for initial setup, but auth will fail.

# --- FastAPI Dependency for Token Verification ---

# Create an instance of HTTPBearer for extracting the token from the header
bearer_scheme = HTTPBearer()

async def verify_token(creds: HTTPAuthorizationCredentials = Depends(bearer_scheme)) -> dict:
    """
    FastAPI dependency that verifies the Firebase ID token from the Authorization header.

    Args:
        creds: The HTTPAuthorizationCredentials containing the bearer token.

    Returns:
        The decoded token payload if verification is successful.

    Raises:
        HTTPException: If the token is invalid, expired, or not provided.
    """
    if not creds:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Bearer token not provided.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    try:
        # The verify_id_token function checks if the token is valid and not expired.
        decoded_token = auth.verify_id_token(creds.credentials)
        return decoded_token
    except auth.InvalidIdTokenError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid Firebase ID token.",
            headers={"WWW-Authenticate": "Bearer"},
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred during token verification: {e}",
            headers={"WWW-Authenticate": "Bearer"},
        )

# You can also define a dependency that just returns the user ID (uid)
async def get_current_user_uid(decoded_token: dict = Depends(verify_token)) -> str:
    """
    A dependency that provides the UID of the authenticated user.
    """
    uid = decoded_token.get("uid")
    if not uid:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="UID not found in token payload.",
        )
    return uid
