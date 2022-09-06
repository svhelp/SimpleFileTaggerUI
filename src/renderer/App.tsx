import { LocationsPage } from 'components/Locations/LocationsPage';
import { MainLayout } from 'components/MainLayout';
import { TagsPage } from 'components/Tags/TagsPage';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import "antd/dist/antd.css";
import { SettingsPage } from 'components/Settings/SettingsPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="locations/*" element={<LocationsPage />} />
          <Route path="tags/" element={<TagsPage />} />
          <Route path="settings/" element={<SettingsPage />} />
          <Route index element={<SettingsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}
