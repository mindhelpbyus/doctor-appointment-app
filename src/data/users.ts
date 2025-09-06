// src/data/users.ts
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  type: 'patient' | 'doctor' | 'agencyUser' | 'admin';
  agencyId?: string; // Optional for doctors/agency users
  // Add other relevant user properties as needed
}

// Note: The actual user data array (e.g., `patients`, `doctors`, `agencyUsers`)
// is typically managed by `localApi.ts` or similar service,
// but the User interface needs to be exported for type checking.