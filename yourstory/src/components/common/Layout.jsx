import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      {/* <Navigation /> 나중에 추가 */}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;