"use client";

interface UserSession {
  id: string;
  type: 'patient' | 'doctor' | 'agencyUser' | 'admin';
}

const USER_SESSION_KEY = 'currentUserSession';

export const loginUser = (id: string, type: UserSession['type']): void => {
  const session: UserSession = { id, type };
  localStorage.setItem(USER_SESSION_KEY, JSON.stringify(session));
};

export const getLoggedInUser = (): UserSession | undefined => {
  const sessionString = localStorage.getItem(USER_SESSION_KEY);
  if (sessionString) {
    try {
      return JSON.parse(sessionString);
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