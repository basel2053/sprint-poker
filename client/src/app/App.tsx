import { useEffect } from 'react';
import { Button, Card, GuessCard } from '@/components';

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
    <>
      <h1>Poker</h1>
      <Card />
      <GuessCard />
      <Button $primary>Paw pew</Button>
    </>
  );
}

export default App;
