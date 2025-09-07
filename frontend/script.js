document.addEventListener('DOMContentLoaded', () => {
    // --- Firebase and API Configuration ---
    // IMPORTANT: Replace with your Firebase project's configuration.
    const firebaseConfig = {
        apiKey: "YOUR_API_KEY",
        authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
        projectId: "YOUR_PROJECT_ID",
        storageBucket: "YOUR_PROJECT_ID.appspot.com",
        messagingSenderId: "YOUR_SENDER_ID",
        appId: "YOUR_APP_ID"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();

    const apiBaseUrl = 'http://localhost:8000';
    let idToken = null; // To store the Firebase ID token

    // --- DOM Element References ---
    const authContainer = document.getElementById('auth-container');
    const loginForm = document.getElementById('login-form');
    const logoutButton = document.getElementById('logout-button');
    const apiTesterContainer = document.getElementById('api-tester');
    const resourceSelector = document.getElementById('resource-selector');
    const dataDisplay = document.getElementById('data-display');
    const createFormContainer = document.getElementById('create-form-container');
    const statusDisplay = document.getElementById('status-display');

    // --- Authentication State ---
    auth.onAuthStateChanged(user => {
        if (user) {
            user.getIdToken().then(token => {
                idToken = token;
                authContainer.style.display = 'none';
                apiTesterContainer.style.display = 'block';
                fetchAndDisplayData(); // Fetch initial data on login
            });
        } else {
            idToken = null;
            authContainer.style.display = 'block';
            apiTesterContainer.style.display = 'none';
        }
    });

    // --- Event Listeners ---
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        auth.signInWithEmailAndPassword(email, password)
            .catch(error => updateStatus(`Login Failed: ${error.message}`, true));
    });

    logoutButton.addEventListener('click', () => auth.signOut());

    resourceSelector.addEventListener('change', () => {
        fetchAndDisplayData();
        generateCreateForm();
    });

    // --- Core API Functions ---
    const makeApiRequest = async (endpoint, method = 'GET', body = null) => {
        if (!idToken) {
            updateStatus('Authentication token not available. Please log in.', true);
            return;
        }

        const headers = {
            'Authorization': `Bearer ${idToken}`,
            'Content-Type': 'application/json'
        };

        try {
            const response = await fetch(`${apiBaseUrl}/${endpoint}`, { method, headers, body: body ? JSON.stringify(body) : null });
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ detail: `HTTP ${response.status}`}) );
                throw new Error(errorData.detail);
            }
            return await response.json();
        } catch (error) {
            updateStatus(`API Error: ${error.message}`, true);
            throw error;
        }
    };

    const fetchAndDisplayData = async () => {
        const resource = resourceSelector.value;
        if (!resource) return;

        try {
            const data = await makeApiRequest(`${resource}/`);
            dataDisplay.textContent = JSON.stringify(data, null, 2);
            updateStatus(`Successfully fetched all ${resource}.`, false);
        } catch (error) {
            dataDisplay.textContent = 'Failed to fetch data.';
        }
    };

    const createResource = async (resource, data) => {
        try {
            const newData = await makeApiRequest(`${resource}/`, 'POST', data);
            updateStatus(`Successfully created new ${resource.slice(0, -1)}.`, false);
            dataDisplay.textContent = JSON.stringify(newData, null, 2);
            fetchAndDisplayData(); // Refresh list after creation
        } catch (error) {
            // Error is already displayed by makeApiRequest
        }
    };

    // --- Dynamic Form Generation ---
    const modelSchemas = {
        patients: { id: 'string', name: 'string', email: 'string' },
        doctors: { id: 'string', name: 'string', specialty: 'string', email: 'string' },
        appointments: { id: 'string', patient_id: 'string', doctor_id: 'string', appointment_date: 'date', reason: 'string', status: 'string' },
        // Add other schemas here for a complete tool
    };

    const generateCreateForm = () => {
        const resource = resourceSelector.value;
        const schema = modelSchemas[resource];
        createFormContainer.innerHTML = '';

        if (!schema) return;

        const form = document.createElement('form');
        form.id = `create-${resource}-form`;

        let formHtml = `<h3>Create New ${resource.slice(0, -1)}</h3>`;
        for (const [field, type] of Object.entries(schema)) {
            formHtml += `<input type="${type === 'date' ? 'datetime-local' : 'text'}" id="new-${field}" placeholder="${field}" required><br>`;
        }
        formHtml += `<button type="submit">Create</button>`;
        form.innerHTML = formHtml;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const newData = {};
            for (const field of Object.keys(schema)) {
                newData[field] = document.getElementById(`new-${field}`).value;
            }
            createResource(resource, newData);
        });

        createFormContainer.appendChild(form);
    };
    
    // --- UI Helper ---
    const updateStatus = (message, isError) => {
        statusDisplay.textContent = message;
        statusDisplay.style.color = isError ? 'red' : 'green';
    };
    
    // --- Initial Setup ---
    generateCreateForm();
});
