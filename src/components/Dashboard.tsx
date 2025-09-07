import React, { useState, useEffect } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import * as widgets from './widgets';
import dashboardLayouts from '../data/dashboards.json';

const ResponsiveGridLayout = WidthProvider(Responsive);

const widgetMap = {
  upcoming_appointments: widgets.UpcomingAppointments,
  recent_mood_entries: widgets.RecentMoodEntries,
  my_doctor_messages: widgets.MyDoctorMessages,
  appointments_today: widgets.AppointmentsToday,
  patient_list: widgets.PatientList,
  doctor_messaging_inbox: widgets.DoctorMessagingInbox,
  agency_doctor_list: widgets.AgencyDoctorList,
  agency_patient_list: widgets.AgencyPatientList,
  agency_billing_overview: widgets.AgencyBillingOverview,
  platform_user_stats: widgets.PlatformUserStats,
  platform_revenue: widgets.PlatformRevenue,
  api_health_status: widgets.ApiHealthStatus,
  new_user_growth: widgets.NewUserGrowth,
};

const Dashboard = ({ userRole }) => {
  const [layout, setLayout] = useState([]);
  const [widgetComponents, setWidgetComponents] = useState([]);

  useEffect(() => {
    const loadDashboard = () => {
      const userDashboard = dashboardLayouts.find(d => d.id === `ROLE#${userRole}`);
      if (userDashboard) {
        const gridLayout = userDashboard.layout_config.widgets.map(widget => ({
          i: widget.id,
          x: widget.x,
          y: widget.y,
          w: widget.w,
          h: widget.h,
        }));
        setLayout(gridLayout);
        setWidgetComponents(userDashboard.layout_config.widgets);
      } else {
        // Handle case where user role has no dashboard configured
        setLayout([]);
        setWidgetComponents([]);
      }
    };

    loadDashboard();
  }, [userRole]);

  const onLayoutChange = (newLayout) => {
    console.log('Layout changed:', newLayout);
  };

  return (
    <div className="dashboard-container">
      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: layout }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={100}
        onLayoutChange={onLayoutChange}
      >
        {widgetComponents.map(widget => {
          const WidgetComponent = widgetMap[widget.id];
          return (
            <div key={widget.id} className="widget-grid-item">
              {WidgetComponent ? <WidgetComponent /> : <div>Widget not found</div>}
            </div>
          );
        })}
      </ResponsiveGridLayout>
    </div>
  );
};

export default Dashboard;
