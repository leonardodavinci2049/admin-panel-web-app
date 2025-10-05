import { ModeSwitcher } from '@/components/mode-switcher'
import React from 'react'
import OrganizationSwitcher from './organization-switcher';
import { getOrganizations } from '@/app/actions/organizations';
import Logout from './logout';

const Header = async () => {
    const organizations = await getOrganizations();
  return (
    <header className="absolute top-0 right-0 flex justify-between items-center p-4 w-full">
      <OrganizationSwitcher organizations={organizations} />
      <div className="flex items-center gap-2">
        <Logout />
        <ModeSwitcher />
      </div>    
    </header>
  );  
};  

export default Header