import { BrowserRouter, Routes, Route } from 'react-router';
import Footer from './components/Footer';

export function App() {
    return (
        <BrowserRouter>
            <main className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
                <Routes>
                    <Route
                        path="/"
                        element={
                            <div className="bg-white p-8 rounded-xl shadow-md text-center">
                                <h1 className="text-2xl font-bold text-indigo-600">Webbshop Grupp 2</h1>
                                <p className="text-gray-500 mt-2">Exempeltext</p>
                            </div>
                        }
                    />
                </Routes>
            </main>
            <Footer/>
        </BrowserRouter>
    );
}

export default App;