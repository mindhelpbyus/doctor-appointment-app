"use client";

import { toast } from "sonner";
import { Appointment } from "@/data/appointments";
import { Doctor } from "@/data/doctors";
import { Patient } from "@/data/patients";

export const sendAppointmentReminder = (appointment: Appointment, doctor: Doctor, patient: Patient) => {
  const appointmentTime = new Date(appointment.datetime).toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' });
  const message = `Reminder: Your ${appointment.type} appointment with Dr. ${doctor.fullName} is scheduled for ${appointmentTime}.`;

  // In a real application, this would integrate with a backend service
  // to send actual WhatsApp, email, or SMS messages.
  // For now, we'll simulate it with a toast notification.
  toast.info(`Simulating reminder for ${patient.name}: ${message}`);
  console.log(`[NOTIFICATION SENT] To: ${patient.email}, Phone: ${patient.phone} - ${message}`);
};