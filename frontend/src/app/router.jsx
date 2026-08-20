import React from 'react';
import { createBrowserRouter } from 'react-router';
import MainLayout from '../layouts/MainLayout';
import LandingRoute from './routes/landing';
import EnrollmentPage from '../features/admissions/pages/EnrollmentPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <LandingRoute />,
      },
      {
        path: 'enrollment',
        element: <EnrollmentPage />,
      },
    ],
  },
]);
