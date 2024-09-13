import { useEffect } from 'react';
import AppProvider from './provider';
import AppRouter from './router';

function App() {
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:5000/ws');
    ws.onopen = () => {
      console.log('Connected to WS server');
      ws.onmessage = (message) => {
        console.log('Received message: ', message);
      };
      ws.send(JSON.stringify({ type: 'message', message: 'Hello There!' }));
    };
    return () => {
      ws.close();
    };
  }, []);

  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}

export default App;
