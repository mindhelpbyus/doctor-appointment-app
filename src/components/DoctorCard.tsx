import React from 'react';
import Image from 'next/image';
import { Doctor } from '@/data/doctors';
import { Star, MapPin, Video, Languages } from 'lucide-react';

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-sm mx-auto border border-gray-200">
      <div className="relative h-48 w-full">
        <Image
          src={doctor.photoUrl}
          alt={`Dr. ${doctor.fullName}`}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">{doctor.fullName}</h3>
        
        <div className="flex items-center text-yellow-500 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`h-5 w-5 ${i < Math.round(doctor.rating) ? 'fill-current' : 'stroke-current'}`} />
          ))}
          <span className="text-gray-600 ml-2 text-sm">({doctor.rating.toFixed(1)})</span>
        </div>

        <p className="text-gray-600 text-sm mb-4 leading-relaxed">{doctor.biography}</p>

        <div className="flex flex-col space-y-3 text-sm text-gray-700">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2 text-blue-500" />
            <span>{doctor.clinicAddress}</span>
          </div>
          <div className="flex items-center">
            <Languages className="h-4 w-4 mr-2 text-green-500" />
            <span>{doctor.languages.join(', ')}</span>
          </div>
          {doctor.videoConsultation && (
            <div className="flex items-center text-purple-600 font-semibold">
              <Video className="h-4 w-4 mr-2" />
              <span>Video Consultation Available</span>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-between items-center">
          <span className="text-lg font-semibold text-gray-800">{`${doctor.yearsExperience} yrs exp.`}</span>
          <button className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
