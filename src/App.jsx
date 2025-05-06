import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Mainpage } from './pages/Mainpage/Mainpage';
import { Notfound } from './pages/Errorpage/Notfound';

import { Adminusers } from './pages/admin/Users/Adminusers';
import { Adminhero } from './pages/admin/Hero/Adminhero';
import { AdminTAS } from './pages/admin/ToolsAndSkils/AdminTAS';
import { Adminprojects } from './pages/admin/Projects/Adminprojects';
import { Admincertificate } from './pages/admin/Certificate/Admincertificate';
import Admin from './pages/admin/Admin'
import { Admindashboard } from './components/sections/Admindashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Mainpage />} />
        <Route path="/Admin" element={<Admin />}>
          <Route index element={<Admindashboard />} />
          <Route path="Users" element={<Adminusers />} />
          <Route path="Hero" element={<Adminhero />} />
          <Route path="Tools and Skills" element={<AdminTAS />} />
          <Route path="Projects" element={<Adminprojects />} />
          <Route path="Certificate" element={<Admincertificate />} />
        </Route>
        <Route path="/*" element={<Notfound />} />
      </Routes>
    </Router>
  );
}

export default App;