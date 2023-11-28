import { useEffect } from 'react';
import Layout from './components/layout/Layout';
import socketIoService from './Services/SocketIoService';

function App() {
  useEffect(() => {
    //the connection of the socket
    socketIoService.connect();
  }, []);

  return <Layout />;
}

export default App;
