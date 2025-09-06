"use client";

import { User } from '@/data/users'; // Import User interface
import { getPatientById, getDoctorById, getAgencyUserById, getAdmins } from '@/services/localApi'; // Import necessary getters

interface UserSessionData {
  id: string;
  type: 'patient' | 'doctor' | 'agencyUser' | 'admin';
}

const USER_SESSION_KEY = 'currentUserSession';

export const loginUser = (id: string, type: UserSessionData['type']): void => {
  const session: UserSessionData = { id, type };
  localStorage.setItem(USER_SESSION_KEY, JSON.stringify(session));
};

// Helper to derive name parts from email
const deriveNameFromEmail = (email: string) => {
  const localPart = email.split('@')[0];
  const parts = localPart.split('.');
  const firstName = parts[0] || '';
  const lastName = parts.length > 1 ? parts.slice(1).join(' ') : '';
  return { firstName, lastName };
};

export const getLoggedInUser = (): User | undefined => {
  const sessionString = localStorage.getItem(USER_SESSION_KEY);
  if (sessionString) {
    try {
      const session: UserSessionData = JSON.parse(sessionString);
      // Fetch full user details based on type
      switch (session.type) {
        case 'patient':
          const patient = getPatientById(session.id);
          if (patient) {
            const nameParts = patient.name.split(' ');
            const firstName = nameParts[0];
            const lastName = nameParts.slice(1).join(' ');
            return { ...patient, type: 'patient', firstName, lastName, email: patient.email };
          }
          break;
        case 'doctor':
          const doctor = getDoctorById(session.id);
          if (doctor) {
            const nameParts = doctor.fullName.split(' ');
            const firstName = nameParts[0];
            const lastName = nameParts.slice(1).join(' ');
            return { ...doctor, type: 'doctor', firstName, lastName, email: doctor.email };
          }
          break;
        case 'agencyUser':
          const agencyUser = getAgencyUserById(session.id);
          if (agencyUser) {
            const { firstName, lastName } = deriveNameFromEmail(agencyUser.email);
            return { ...agencyUser, type: 'agencyUser', firstName, lastName, email: agencyUser.email, agencyId: agencyUser.agencyId };
          }
          break;
        case 'admin':
          const admin = getAdmins().find(a => a.id === session.id);
          if (admin) {
            const { firstName, lastName } = deriveNameFromEmail(admin.email);
            return { ...admin, type: 'admin', firstName, lastName, email: admin.email };
          }
          break;
      }
    } catch (e) {
      console.error("Failed to parse user session from localStorage", e);
      return undefined;
    }
  }
  return undefined;
};

export const logoutUser = (): void => {
  localStorage.removeItem(USER_SESSION_KEY);
};