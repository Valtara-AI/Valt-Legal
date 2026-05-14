import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import Dashboard from './dashboard/Dashboard';
import CasesList from './dashboard/CasesList';
import CaseView from './dashboard/CaseView';
import ClientManagement from './dashboard/ClientManagement';
import DocumentManagement from './dashboard/DocumentManagement';
import Reports from './dashboard/Reports';

const DashboardRoutes = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/cases/all" element={<CasesList />} />
        <Route path="/cases/view/:id" element={<CaseView />} />
        <Route path="/cases/:stage" element={<CasesList />} />
        <Route path="/clients/:type" element={<ClientManagement />} />
        <Route path="/documents/:folder" element={<DocumentManagement />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </DashboardLayout>
  );
};

export default DashboardRoutes;
