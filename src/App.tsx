import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import HomePage from './pages/Home';
import AdhkarPage from './pages/Adhkar';
import DhikrPage from './pages/Dhikr';
import LearnPage from './pages/Learn';
import NamesPage from './pages/Names';
import PrayerPage from './pages/Prayer';
import PremiumPage from './pages/Premium';
import QiblaPage from './pages/Qibla';
import QuranPage from './pages/Quran';
import SettingsPage from './pages/Settings';
import TajweedPage from './pages/Tajweed';
import ProfilePage from './pages/Profile';
import ProgressionPage from './pages/Progression';
import LoadingScreen from './pages/LoadingScreen';
import ApiConfig from './pages/ApiConfig';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/adhkar" element={<AdhkarPage />} />
          <Route path="/dhikr" element={<DhikrPage />} />
          <Route path="/learn" element={<LearnPage />} />
          <Route path="/names" element={<NamesPage />} />
          <Route path="/prayer" element={<PrayerPage />} />
          <Route path="/premium" element={<PremiumPage />} />
          <Route path="/qibla" element={<QiblaPage />} />
          <Route path="/quran" element={<QuranPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/tajweed" element={<TajweedPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/progression" element={<ProgressionPage />} />
          <Route path="/loading" element={<LoadingScreen />} />
          <Route path="/api-config" element={<ApiConfig />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
