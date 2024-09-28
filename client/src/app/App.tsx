import AppProvider from './provider';
import AppRouter from './router';
import { ToastContainer } from '@/components/Toast';

function App() {
  return (
    <AppProvider>
      <AppRouter />
      <ToastContainer />
    </AppProvider>
  );
}

export default App;
