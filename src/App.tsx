import { Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { AdminAuthProvider } from './contexts/AdminAuthContext';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import MagotherapyPage from './pages/MagotherapyPage';
import FAQPage from './pages/FAQPage';
import PhotoGalleryPage from './pages/PhotoGalleryPage';
import VideoGalleryPage from './pages/VideoGalleryPage';
import ZogadiPage from './pages/ZogadiPage';
import SielmePage from './pages/SielmePage';
import PigmenturetinitePage from './pages/PigmenturetinitePage';
import AmblyopiaPage from './pages/AmblyopiaPage';
import GlaukomaPage from './pages/GlaukomaPage';
import AstigmatizmPage from './pages/AstigmatizmPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import BookingPage from './pages/BookingPage';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminPage from './pages/admin/AdminPage';

function App() {
  return (
    <AdminAuthProvider>
      <LanguageProvider>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/magotherapy" element={<MagotherapyPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/photo-gallery" element={<PhotoGalleryPage />} />
          <Route path="/video-gallery" element={<VideoGalleryPage />} />
          <Route path="/results/general" element={<ZogadiPage />} />
          <Route path="/results/sielme" element={<SielmePage />} />
          <Route path="/results/pigmentary-retinitis" element={<PigmenturetinitePage />} />
          <Route path="/results/amblyopia" element={<AmblyopiaPage />} />
          <Route path="/results/glaukoma" element={<GlaukomaPage />} />
          <Route path="/results/astigmatizm" element={<AstigmatizmPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/admin-login" element={<AdminLoginPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </LanguageProvider>
    </AdminAuthProvider>
  );
}

export default App;
