import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
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
  StarIcon, // Added StarIcon import
} from 'lucide-react';
import { getLoggedInUser, logoutUser } from '@/utils/auth';
import {
  getAgencyById,
  getDoctorsByAgencyId,
  getAppointmentsForDoctors,
  getPromotionsByAgencyId,
  getSpecialties,
  addPromotion,
  getAgencyUserById,
  getAgencyPerformanceReport,
  getDoctorPerformanceReports,
  getPromotionReports,
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { showSuccess, showError } from '@/utils/toast';
import {
  AgencyPerformanceReport,
  DoctorPerformanceReport,
  PromotionReport,
} from '@/data/reports';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AgencyDashboardPage: React.FC = () => {
  const { agencyId } = useParams<{ agencyId: string }>();
  const navigate = useNavigate();
  const [agency, setAgency] = useState<Agency | undefined>(undefined);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [specialties, setSpecialties] = useState<any[]>([]);

  // State for new promotion form
  const [newPromotionTitle, setNewPromotionTitle] = useState('');
  const [newPromotionDescription, setNewPromotionDescription] = useState('');
  const [newPromotionDiscountType, setNewPromotionDiscountType] = useState<'percent' | 'flat'>('percent');
  const [newPromotionDiscountValue, setNewPromotionDiscountValue] = useState<number>(0);
  const [newPromotionValidFrom, setNewPromotionValidFrom] = useState<Date | undefined>(undefined);
  const [newPromotionValidTo, setNewPromotionValidTo] = useState<Date | undefined>(undefined);

  // State for reports data
  const [agencyPerformance, setAgencyPerformance] = useState<AgencyPerformanceReport | undefined>(undefined);
  const [doctorPerformance, setDoctorPerformance] = useState<DoctorPerformanceReport[]>([]);
  const [promotionReportsData, setPromotionReportsData] = useState<PromotionReport[]>([]);

  const currentUserId = getLoggedInUser()?.id;
  const currentUserType = getLoggedInUser()?.type;

  useEffect(() => {
    if (!currentUserId || currentUserType !== 'agencyUser' || !agencyId) {
      navigate('/provider-login');
      return;
    }

    const loggedInAgencyUser = getAgencyUserById(currentUserId);
    if (!loggedInAgencyUser || loggedInAgencyUser.agencyId !== agencyId) {
      showError('Access Denied: You do not have permission to view this agency dashboard.');
      navigate('/provider-login');
      return;
    }

    const fetchedAgency = getAgencyById(agencyId);
    if (!fetchedAgency) {
      showError('Agency not found.');
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

    // Fetch report data
    setAgencyPerformance(getAgencyPerformanceReport());
    setDoctorPerformance(getDoctorPerformanceReports(agencyId));
    setPromotionReportsData(getPromotionReports(agencyId));

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
    if (!newPromotionTitle || !newPromotionDescription || newPromotionDiscountValue <= 0 || !newPromotionValidFrom || !newPromotionValidTo) {
      showError('Please fill in all promotion fields correctly.');
      return;
    }
    if (newPromotionValidFrom > newPromotionValidTo) {
      showError('Start date cannot be after end date.');
      return;
    }

    const newPromo: Omit<Promotion, 'id' | 'status'> = {
      title: newPromotionTitle,
      description: newPromotionDescription,
      discountType: newPromotionDiscountType,
      discountValue: newPromotionDiscountValue,
      validFrom: newPromotionValidFrom.toISOString(),
      validTo: newPromotionValidTo.toISOString(),
      targetAgencyId: agencyId!,
    };

    addPromotion(newPromo);
    showSuccess('Promotion added successfully! Awaiting admin approval.');
    // Clear form
    setNewPromotionTitle('');
    setNewPromotionDescription('');
    setNewPromotionDiscountType('percent');
    setNewPromotionDiscountValue(0);
    setNewPromotionValidFrom(undefined);
    setNewPromotionValidTo(undefined);
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
                    <Label htmlFor="promo-description">Description</Label>
                    <Textarea id="promo-description" value={newPromotionDescription} onChange={(e) => setNewPromotionDescription(e.target.value)} placeholder="Brief description of the promotion" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="promo-discount-type">Discount Type</Label>
                    <Select value={newPromotionDiscountType} onValueChange={(value: 'percent' | 'flat') => setNewPromotionDiscountType(value)}>
                      <SelectTrigger id="promo-discount-type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="percent">Percentage (%)</SelectItem>
                        <SelectItem value="flat">Flat Rate ($)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="promo-discount-value">Discount Value</Label>
                    <Input
                      id="promo-discount-value"
                      type="number"
                      value={newPromotionDiscountValue}
                      onChange={(e) => setNewPromotionDiscountValue(parseFloat(e.target.value) || 0)}
                      placeholder="e.g., 10 or 50"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="promo-valid-from">Valid From</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !newPromotionValidFrom && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {newPromotionValidFrom ? format(newPromotionValidFrom, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <UiCalendar
                          mode="single"
                          selected={newPromotionValidFrom}
                          onSelect={setNewPromotionValidFrom}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="promo-valid-to">Valid To</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !newPromotionValidTo && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {newPromotionValidTo ? format(newPromotionValidTo, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <UiCalendar
                          mode="single"
                          selected={newPromotionValidTo}
                          onSelect={setNewPromotionValidTo}
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
                          <TableCell>
                            {promo.discountType === 'percent' ? `${promo.discountValue}% off` : `$${promo.discountValue} off`}
                          </TableCell>
                          <TableCell>{format(new Date(promo.validFrom), 'MMM d')} - {format(new Date(promo.validTo), 'MMM d, yyyy')}</TableCell>
                          <TableCell>
                            <Badge variant={promo.status === 'approved' ? 'default' : promo.status === 'pending' ? 'secondary' : 'destructive'}>
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
            <h2 className="text-2xl font-bold mb-4">Agency Performance Overview</h2>
            {agencyPerformance && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${agencyPerformance.totalRevenue.toLocaleString()}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">Total Appointments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{agencyPerformance.totalAppointments}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">Avg. Appt. Value</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${agencyPerformance.averageAppointmentValue.toFixed(2)}</div>
                  </CardContent>
                </Card>
              </div>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Monthly Revenue Trend</CardTitle>
              </CardHeader>
              <CardContent>
                {agencyPerformance?.monthlyRevenue && (
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={agencyPerformance.monthlyRevenue} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>

            <h2 className="text-2xl font-bold mb-4 mt-8">Doctor Performance Reports</h2>
            <Card>
              <CardHeader>
                <CardTitle>Individual Doctor Performance</CardTitle>
              </CardHeader>
              <CardContent>
                {doctorPerformance.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Doctor</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Appointments</TableHead>
                        <TableHead>Satisfaction</TableHead>
                        <TableHead>Revenue</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {doctorPerformance.map((docReport) => (
                        <TableRow key={docReport.doctorId}>
                          <TableCell className="font-medium">{docReport.doctorName}</TableCell>
                          <TableCell>{docReport.averageRating.toFixed(1)} <StarIcon className="inline-block h-4 w-4 fill-yellow-500 text-yellow-500 ml-1" /></TableCell>
                          <TableCell>{docReport.totalAppointments}</TableCell>
                          <TableCell>{docReport.patientSatisfactionScore.toFixed(1)}/5</TableCell>
                          <TableCell>${docReport.revenueGenerated.toLocaleString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <p className="text-muted-foreground">No doctor performance data available for this agency.</p>
                )}
              </CardContent>
            </Card>

            <h2 className="text-2xl font-bold mb-4 mt-8">Promotion Performance Reports</h2>
            <Card>
              <CardHeader>
                <CardTitle>Promotion Effectiveness</CardTitle>
              </CardHeader>
              <CardContent>
                {promotionReportsData.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Promotion</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Redemptions</TableHead>
                        <TableHead>Revenue Generated</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {promotionReportsData.map((promoReport) => (
                        <TableRow key={promoReport.promotionId}>
                          <TableCell className="font-medium">{promoReport.promotionTitle}</TableCell>
                          <TableCell>
                            <Badge variant={promoReport.status === 'approved' ? 'default' : promoReport.status === 'pending' ? 'secondary' : 'destructive'}>
                              {promoReport.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{promoReport.redemptions}</TableCell>
                          <TableCell>${promoReport.revenueGenerated.toLocaleString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <p className="text-muted-foreground">No promotion reports available for this agency.</p>
                )}
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