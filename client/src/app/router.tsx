import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Root } from './pages/root';

const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      children: [
        {
          path: '/',
          lazy: async () => {
            const { Home } = await import('./pages/home');
            return { Component: Home };
          },
        },
        {
          path: 'room/:roomId',
          lazy: async () => {
            const { Room } = await import('./pages/room');
            return { Component: Room };
          },
        },
        {
          path: '*',
          lazy: async () => {
            const { NotFound } = await import('./pages/not-found');
            return { Component: NotFound };
          },
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
