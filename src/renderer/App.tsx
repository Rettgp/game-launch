import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import IpcService from '../ipc/IpcService';
import { useEffect, useState } from 'react';
import GameButton from './components/GameButton';

export default function App() {
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        const ipc = new IpcService();
        const fetchData = async () => {
            try {
                const response = await ipc.send<{ reply: any[] }>(
                    'game-library',
                    { params: ['getGames'] },
                );
                setData(response);
            } catch (error) {
            }
        };

        fetchData();
    }, []);

    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={data.map((runnable, index) => (
                        <GameButton key={index} runnable={runnable} />
                    ))}
                />
            </Routes>
        </Router>
    );
}
