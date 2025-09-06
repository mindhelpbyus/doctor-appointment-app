"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Settings, LogOut, Stethoscope } from 'lucide-react';

interface AgencyDashboardHeaderProps {
  userName: string;
  onLogout: () => void;
}

const AgencyDashboardHeader: React.FC<AgencyDashboardHeaderProps> = ({ userName, onLogout }) => {
  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2">
              <Heart className="w-8 h-8 text-primary" />
              <span className="text-2xl font-bold text-primary">HealthConnect</span>
            </Link>
            <Badge className="bg-accent text-accent-foreground border-primary/20">
              <Settings className="w-4 h-4" />
              <span className="ml-1 capitalize">Agency Admin</span>
            </Badge>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-muted-foreground">Welcome, {userName}</span>
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

export default AgencyDashboardHeader;