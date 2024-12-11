import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import Navbar from '@/Components/Navbar';
import MainContent from '@/Components/MainContent';
// import { ToastContainer } from 'react-toastify';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <>
          <Navbar />
          <MainContent>
              <div className="mt-12 py-4">
                {children}
              </div>
          </MainContent>
        </>
        // <ToastContainer />
    );
}
