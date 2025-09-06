import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Users,
  Calendar,
  DollarSign,
  Settings,
  LogOut,
  Heart,
  Stethoscope,
  Megaphone,
  FileText,
  PlusCircle,
} from 'lucide-react';
import { getLoggedInUser, logoutUser } from '@/utils/auth';
import {
  getAgencyById,
  getDoctorsByAgencyId,
  getAppointmentsForDoctors,
  getPromotionsByAgencyId,
  getSpecialtyById,
  getSpecialties,
  addPromotion,
} from '@/services/localApi';
import { Agency } from '@/data/agencies';
import { Doctor } from '@/data/doctors';
import { Promotion } from '@/data/promotions';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Calendar as UiCalendar } from '@/components/ui/calendar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { showSuccess, showError } from '@/utils/toast';

const AgencyDashboardPage: React.FC = () => {
  const { agencyId } = useParams<{ agencyId: string }>();
  const navigate = useNavigate();
  const [agency, setAgency] = useState<Agency | undefined>(undefined);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [specialties, setSpecialties] = useState<any[]>([]); // To get specialty names

  // State for new promotion form
  const [newPromotionTitle, setNewPromotionTitle] = useState('');
  const [newPromotionDescription, setNewPromotionDescription] = useState('');
  const [newPromotionDiscount, setNewPromotionDiscount] = useState('');
  const [newPromotionStartDate, setNewPromotionStartDate] = useState<Date | undefined>(undefined);
  const [newPromotionEndDate, setNewPromotionEndDate] = useState<Date | undefined>(undefined);

  const currentUserId = getLoggedInUser()?.id;
  const currentUserType = getLoggedInUser()?.type;

  useEffect(() => {
    if (!currentUserId || currentUserType !== 'agencyUser' || !agencyId) {
      navigate('/provider-login'); // Redirect if not logged in as an agency user or agencyId is missing
      return;
    }

    const fetchedAgency = getAgencyById(agencyId);
    if (!fetchedAgency || fetchedAgency.id !== getLoggedInUser()?.agencyId) {
      showError('Access Denied: You do not have permission to view this agency dashboard.');
      navigate('/provider-login');
      return;
    }
    setAgency(fetchedAgency);

    const fetchedDoctors = getDoctorsByAgencyId(agencyId);
    setDoctors(fetchedDoctors);

    const fetchedPromotions = getPromotionsByAgencyId(agencyId);
    setPromotions(fetchedPromotions);

    const fetchedSpecialties = getSpecialties();
    setSpecialties(fetchedSpecialties);

  }, [agencyId, currentUserId, currentUserType, navigate]);

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  const getSpecialtyName = (specialtyId: string) => specialties.find(s => s.id === specialtyId)?.name || 'N/A';

  // Calculate agency-wide metrics
  const totalDoctors = doctors.length;
  const totalActiveAppointments = getAppointmentsForDoctors(doctors.map(d => d.id)).length;
  const totalPromotions = promotions.length;

  const handleAddPromotion = () => {
    if (!newPromotionTitle || !newPromotionDescription || !newPromotionDiscount || !newPromotionStartDate || !newPromotionEndDate) {
      showError('Please fill in all promotion fields.');
      return;
    }
    if (new Date(newPromotionStartDate) > new Date(newPromotionEndDate)) {
      showError('Start date cannot be after end date.');
      return;
    }

    const newPromo = {
      title: newPromotionTitle,
      description: newPromotionDescription,
      discount: newPromotionDiscount,
      startDate: newPromotionStartDate.toISOString(),
      endDate: newPromotionEndDate.toISOString(),
      targetAgencyId: agencyId!,
    };

    addPromotion(newPromo);
    showSuccess('Promotion added successfully! Awaiting admin approval.');
    // Clear form
    setNewPromotionTitle('');
    setNewPromotionDescription('');
    setNewPromotionDiscount('');
    setNewPromotionStartDate(undefined);
    setNewPromotionEndDate(undefined);
    // Refresh promotions list
    setPromotions(getPromotionsByAgencyId(agencyId!));
  };

  if (!agency) {
    return <div className="text-center py-10">Loading agency dashboard...</div>;
  }

  const tabs = [
    { value: 'overview', label: 'Overview' },
    { value: 'doctors', label: 'Doctors' },
    { value: 'promotions', label: 'Promotions' },
    { value: 'reports', label: 'Reports' },
    { value: 'settings', label: 'Settings' },
  ];

  const getGridColsClass = (count: number) => {
    switch (count) {
      case 1: return 'grid-cols-1';
      case 2: return 'grid-cols-2';
      case 3: return 'grid-cols-3';
      case 4: return 'grid-cols-4';
      case 5: return 'grid-cols-5';
      case 6: return 'grid-cols-6';
      default: return 'grid-cols-1'; // Fallback
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Heart className="w-8 h-8 text-primary" />
                <span className="text-2xl font-bold text-primary">HealthConnect</span>
              </div>
              <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                <Settings className="w-4 h-4" />
                <span className="ml-1 capitalize">Agency Admin</span>
              </Badge>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-muted-foreground">Welcome, {getLoggedInUser()?.name || 'Agency Admin'}</span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">{agency.name} Dashboard</h1>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className={`grid w-full ${getGridColsClass(tabs.length)} mb-8`}>
            {tabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Doctors</CardTitle>
                  <Stethoscope className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalDoctors}</div>
                  <p className="text-xs text-muted-foreground">Affiliated with your agency</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Appointments</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalActiveAppointments}</div>
                  <p className="text-xs text-muted-foreground">Across all agency doctors</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Promotions</CardTitle>
                  <Megaphone className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalPromotions}</div>
                  <p className="text-xs text-muted-foreground">Currently running</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue (Est.)</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$12,345</div>
                  <p className="text-xs text-muted-foreground">Last 30 days</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Agency Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p><strong>Name:</strong> {agency.name}</p>
                <p><strong>Address:</strong> {agency.address}</p>
                <p><strong>Contact Email:</strong> {agency.contactEmail}</p>
                <p><strong>Status:</strong> <Badge variant={agency.isActive ? 'default' : 'destructive'}>{agency.isActive ? 'Active' : 'Inactive'}</Badge></p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="doctors" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Your Doctors ({doctors.length})</CardTitle>
                <Button variant="outline" size="sm">
                  <PlusCircle className="h-4 w-4 mr-2" /> Add New Doctor
                </Button>
              </CardHeader>
              <CardContent>
                {doctors.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Specialty</TableHead>
                        <TableHead>Experience</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {doctors.map((doc) => (
                        <TableRow key={doc.id}>
                          <TableCell className="font-medium">{doc.fullName}</TableCell>
                          <TableCell>{getSpecialtyName(doc.specialtyId)}</TableCell>
                          <TableCell>{doc.yearsExperience} years</TableCell>
                          <TableCell>{doc.rating.toFixed(1)}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm" asChild>
                              <Link to={`/doctor/${doc.id}`}>View Profile</Link>
                            </Button>
                            <Button variant="ghost" size="sm">Edit</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <p className="text-muted-foreground">No doctors affiliated with your agency yet.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="promotions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Add New Promotion</CardTitle>
                <CardDescription>Create a new promotional offer for your agency's doctors.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="promo-title">Title</Label>
                    <Input id="promo-title" value={newPromotionTitle} onChange={(e) => setNewPromotionTitle(e.target.value)} placeholder="e.g., 10% Off First Session" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="promo-discount">Discount/Offer</Label>
                    <Input id="promo-discount" value={newPromotionDiscount} onChange={(e) => setNewPromotionDiscount(e.target.value)} placeholder="e.g., 10% off, Free Consultation" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="promo-description">Description</Label>
                  <Textarea id="promo-description" value={newPromotionDescription} onChange={(e) => setNewPromotionDescription(e.target.value)} placeholder="Brief description of the promotion" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="promo-start-date">Start Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !newPromotionStartDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {newPromotionStartDate ? format(newPromotionStartDate, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <UiCalendar
                          mode="single"
                          selected={newPromotionStartDate}
                          onSelect={setNewPromotionStartDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="promo-end-date">End Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !newPromotionEndDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {newPromotionEndDate ? format(newPromotionEndDate, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <UiCalendar
                          mode="single"
                          selected={newPromotionEndDate}
                          onSelect={setNewPromotionEndDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <Button onClick={handleAddPromotion} className="w-full">
                  <PlusCircle className="h-4 w-4 mr-2" /> Submit Promotion for Approval
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Current Promotions ({promotions.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {promotions.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Offer</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {promotions.map((promo) => (
                        <TableRow key={promo.id}>
                          <TableCell className="font-medium">{promo.title}</TableCell>
                          <TableCell>{promo.discount}</TableCell>
                          <TableCell>{format(new Date(promo.startDate), 'MMM d')} - {format(new Date(promo.endDate), 'MMM d, yyyy')}</TableCell>
                          <TableCell>
                            <Badge variant={promo.status === 'active' ? 'default' : promo.status === 'pending' ? 'secondary' : 'destructive'}>
                              {promo.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">Edit</Button>
                            <Button variant="ghost" size="sm" className="text-red-500">Delete</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <p className="text-muted-foreground">No promotions created for your agency yet.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Billing & Payment Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Detailed financial reports and payment history coming soon...</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Performance Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Insights into doctor performance, client acquisition, and engagement coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Agency Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Manage your agency's profile, branding, and user access here. Coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AgencyDashboardPage;