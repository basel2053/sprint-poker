import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      lazy: async () => {
        const { Layout } = await import('./pages/layout');
        return { Component: Layout };
      },
      children: [
        {
          path: '/',
          lazy: async () => {
            const { Home } = await import('./pages/home');
            return { Component: Home };
          },
        },
        {
          path: 'room',
          lazy: async () => {
            return { Component: () => <h1>Room</h1> };
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
