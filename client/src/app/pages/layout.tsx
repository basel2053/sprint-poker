import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <>
      <h4>Header</h4>
      <main>
        <Outlet />
      </main>
      <h4>footer</h4>
    </>
  );
};
