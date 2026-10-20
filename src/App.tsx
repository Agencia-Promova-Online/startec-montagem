import Header from './components/Header';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ArticleDetail from './pages/ArticleDetail';
import ThankYou from './pages/ThankYou';

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <FloatingWhatsApp />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/artigos/:slug" element={<ArticleDetail />} />
        <Route path="/obrigado" element={<ThankYou />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
