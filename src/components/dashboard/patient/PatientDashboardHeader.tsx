"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, LogOut } from 'lucide-react';

interface PatientDashboardHeaderProps {
  patientName: string;
  onLogout: () => void;
}

const PatientDashboardHeader: React.FC<PatientDashboardHeaderProps> = ({ patientName, onLogout }) => {
  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex flex-col items-start">
              <span className="text-2xl font-recoleta font-bold text-primary">Medixy</span>
              <span className="text-xs text-muted-foreground font-averta -mt-1">
                Connecting you to better health.
              </span>
            </Link>
            <Badge className="bg-accent text-accent-foreground border-primary/20">
              <Heart className="w-4 h-4" />
              <span className="ml-1 capitalize">Patient</span>
            </Badge>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-muted-foreground">Welcome, {patientName}</span>
            <Button variant="outline" size="sm" onClick={onLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default PatientDashboardHeader;