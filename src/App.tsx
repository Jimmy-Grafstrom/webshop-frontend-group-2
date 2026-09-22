import { BrowserRouter, Routes, Route } from 'react-router';
import Footer from './components/Footer';
import Header from './components/Header';
import { LoginPage } from './pages/LoginPage';
import {ProductsPage} from "./pages/ProductsPage.tsx";

export function App() {
    return (
        <BrowserRouter>
        <Header/>
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
                    <Route path="/products" element={<ProductsPage/>}/>
                    <Route path="/login" element={<LoginPage />} />
                </Routes>
            </main>
            <Footer/>
        </BrowserRouter>
    );
}

export default App;