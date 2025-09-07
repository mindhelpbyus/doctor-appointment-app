'''
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { Table, Entity } from "dynamodb-onetable";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const table = new Table({
    client: docClient,
    name: "docsy-table",
    partitionKey: "pk",
    sortKey: "sk",
    indexes: {
        gsi1: {
            partitionKey: "gsi1_pk",
            sortKey: "gsi1_sk",
        },
    },
});

const AdminSchema = {
    pk: { type: String, value: "ADMIN#${id}" },
    sk: { type: String, value: "ADMIN#${id}" },
    gsi1_pk: { type: String, value: "ADMIN" },
    gsi1_sk: { type: String, value: "ADMIN#${id}" },
    id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, required: true },
};

const AgencySchema = {
    pk: { type: String, value: "AGENCY#${id}" },
    sk: { type: String, value: "AGENCY#${id}" },
    gsi1_pk: { type: String, value: "AGENCY" },
    gsi1_sk: { type: String, value: "AGENCY#${id}" },
    id: { type: String, required: true },
    name: { type: String, required: true },
    slug: { type: String, required: true },
    logo: { type: String, required: true },
    headerImage: { type: String, required: true },
    websiteUrl: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    contactEmail: { type: String, required: true },
    type: { type: String, required: true },
    theme: { type: Object, required: true },
    isActive: { type: Boolean, required: true },
};

const AgencyUserSchema = {
    pk: { type: String, value: "AGENCYUSER#${id}" },
    sk: { type: String, value: "AGENCYUSER#${id}" },
    gsi1_pk: { type: String, value: "AGENCY#${agencyId}" },
    gsi1_sk: { type: String, value: "AGENCYUSER#${id}" },
    id: { type: String, required: true },
    email: { type: String, required: true },
    agencyId: { type: String, required: true },
};

const AppointmentSchema = {
    pk: { type: String, value: "PATIENT#${patientId}" },
    sk: { type: String, value: "APPOINTMENT#${id}" },
    gsi1_pk: { type: String, value: "DOCTOR#${doctorId}" },
    gsi1_sk: { type: String, value: "APPOINTMENT#${id}" },
    id: { type: String, required: true },
    patientId: { type: String, required: true },
    doctorId: { type: String, required: true },
    type: { type: String, required: true },
    datetime: { type: String, required: true },
    status: { type: String, required: true },
};

const ConversationSchema = {
    pk: { type: String, value: "PATIENT#${participantIds[0]}" },
    sk: { type: String, value: "CONVERSATION#${id}" },
    gsi1_pk: { type: String, value: "DOCTOR#${participantIds[1]}" },
    gsi1_sk: { type: String, value: "CONVERSATION#${id}" },
    id: { type: String, required: true },
    participantIds: { type: Array, required: true },
    lastMessageContent: { type: String, required: true },
    lastMessageTimestamp: { type: String, required: true },
    unreadCount: { type: Number, required: true },
    topic: { type: String },
};

const MessageSchema = {
    pk: { type: String, value: "CONVERSATION#${conversationId}" },
    sk: { type: String, value: "MESSAGE#${id}" },
    gsi1_pk: { type: String, value: "CONVERSATION#${conversationId}" },
    gsi1_sk: { type: String, value: "MESSAGE#${id}" },
    id: { type: String, required: true },
    conversationId: { type: String, required: true },
    senderId: { type: String, required: true },
    receiverId: { type: String, required: true },
    content: { type: String, required: true },
    timestamp: { type: String, required: true },
    read: { type: Boolean, required: true },
};

const DoctorSchema = {
    pk: { type: String, value: "DOCTOR#${id}" },
    sk: { type: String, value: "DOCTOR#${id}" },
    gsi1_pk: { type: String, value: "SPECIALTY#${specialtyId}" },
    gsi1_sk: { type: String, value: "DOCTOR#${id}" },
    id: { type: String, required: true },
    fullName: { type: String, required: true },
    photoUrl: { type: String, required: true },
    gender: { type: String, required: true },
    npi: { type: String, required: true },
    type: { type: String, required: true },
    specialtyId: { type: String, required: true },
    agencyId: { type: String },
    biography: { type: String, required: true },
    rating: { type: Number, required: true },
    yearsExperience: { type: Number, required: true },
    availability: { type: Array, required: true },
    weeklyAvailability: { type: Array, required: true },
    videoConsultation: { type: Boolean, required: true },
    languages: { type: Array, required: true },
    clinicAddress: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
};

const InsuranceProviderSchema = {
    pk: { type: String, value: "INSURANCEPROVIDER#${id}" },
    sk: { type: String, value: "INSURANCEPROVIDER#${id}" },
    gsi1_pk: { type: String, value: "INSURANCEPROVIDER" },
    gsi1_sk: { type: String, value: "INSURANCEPROVIDER#${id}" },
    id: { type: String, required: true },
    name: { type: String, required: true },
    logo: { type: String, required: true },
};

const JournalEntrySchema = {
    pk: { type: String, value: "PATIENT#${patientId}" },
    sk: { type: String, value: "JOURNALENTRY#${id}" },
    gsi1_pk: { type: String, value: "PATIENT#${patientId}" },
    gsi1_sk: { type: String, value: "JOURNALENTRY#${id}" },
    id: { type: String, required: true },
    patientId: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    mood: { type: Number, required: true },
    createdAt: { type: String, required: true },
    tags: { type: Array, required: true },
};

const PatientSchema = {
    pk: { type: String, value: "PATIENT#${id}" },
    sk: { type: String, value: "PATIENT#${id}" },
    gsi1_pk: { type: String, value: "PATIENT" },
    gsi1_sk: { type: String, value: "PATIENT#${id}" },
    id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    location: { type: String, required: true },
    savedAppointments: { type: Array, required: true },
    recentlyViewedDoctors: { type: Array, required: true },
};

const PaymentMethodSchema = {
    pk: { type: String, value: "PAYMENTMETHOD#${name}" },
    sk: { type: String, value: "PAYMENTMETHOD#${name}" },
    gsi1_pk: { type: String, value: "PAYMENTMETHOD" },
    gsi1_sk: { type: String, value: "PAYMENTMETHOD#${name}" },
    name: { type: String, required: true },
    icon: { type: String, required: true },
};

const PromotionSchema = {
    pk: { type: String, value: "PROMOTION#${id}" },
    sk: { type: String, value: "PROMOTION#${id}" },
    gsi1_pk: { type: String, value: "${targetAgencyId ? `AGENCY#${targetAgencyId}` : `DOCTOR#${targetDoctorId}`}" },
    gsi1_sk: { type: String, value: "PROMOTION#${id}" },
    id: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    validFrom: { type: String, required: true },
    validTo: { type: String, required: true },
    discountType: { type: String, required: true },
    discountValue: { type: Number, required: true },
    targetAgencyId: { type: String },
    targetDoctorId: { type: String },
    status: { type: String, required: true },
};

const ReportSchema = {
    pk: { type: String, value: "REPORT#${id}" },
    sk: { type: String, value: "REPORT#${id}" },
    gsi1_pk: { type: String, value: "REPORT" },
    gsi1_sk: { type: String, value: "REPORT#${id}" },
    id: { type: String, required: true },
    type: { type: String, required: true }, // e.g., 'agency-performance', 'doctor-performance', 'promotion'
    data: { type: Object, required: true },
};

const ReviewSchema = {
    pk: { type: String, value: "DOCTOR#${doctorId}" },
    sk: { type: String, value: "REVIEW#${id}" },
    gsi1_pk: { type: String, value: "DOCTOR#${doctorId}" },
    gsi1_sk: { type: String, value: "REVIEW#${id}" },
    id: { type: String, required: true },
    doctorId: { type: String, required: true },
    patientName: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    date: { type: String, required: true },
};

const SpecialtySchema = {
    pk: { type: String, value: "SPECIALTY#${id}" },
    sk: { type: String, value: "SPECIALTY#${id}" },
    gsi1_pk: { type: String, value: "SPECIALTY" },
    gsi1_sk: { type: String, value: "SPECIALTY#${id}" },
    id: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
};

const TestimonialSchema = {
    pk: { type: String, value: "TESTIMONIAL#${id}" },
    sk: { type: String, value: "TESTIMONIAL#${id}" },
    gsi1_pk: { type: String, value: "TESTIMONIAL" },
    gsi1_sk: { type: String, value: "TESTIMONIAL#${id}" },
    id: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, required: true },
    avatar: { type: String, required: true },
    comment: { type: String, required: true },
};

export const Admin = new Entity(AdminSchema, { table });
export const Agency = new Entity(AgencySchema, { table });
export const AgencyUser = new Entity(AgencyUserSchema, { table });
export const Appointment = new Entity(AppointmentSchema, { table });
export const Conversation = new Entity(ConversationSchema, { table });
export const Message = new Entity(MessageSchema, { table });
export const Doctor = new Entity(DoctorSchema, { table });
export const InsuranceProvider = new Entity(InsuranceProviderSchema, { table });
export const JournalEntry = new Entity(JournalEntrySchema, { table });
export const Patient = new Entity(PatientSchema, { table });
export const PaymentMethod = new Entity(PaymentMethodSchema, { table });
export const Promotion = new Entity(PromotionSchema, { table });
export const Report = new Entity(ReportSchema, { table });
export const Review = new Entity(ReviewSchema, { table });
export const Specialty = new Entity(SpecialtySchema, { table });
export const Testimonial = new Entity(TestimonialSchema, { table });
'''