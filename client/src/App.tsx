import { useEffect, useState } from "react";
import "./App.css";

function App() {
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:5000/ws");
    ws.onopen = () => {
      console.log("Connected to WS server");
    };
    return () => {
      ws.close();
    };
  }, []);

  return (
    <>
      <h1>Poker</h1>
    </>
  );
}

export default App;
