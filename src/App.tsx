import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Footer from './components/shared/Footer';
import AIChat from './components/shared/AIChat';
import ErrorBoundary from './components/shared/ErrorBoundary';
import LoadingScreen from './components/shared/LoadingScreen';
import OfflineNotice from './components/shared/OfflineNotice';

// Lazy load components
const Wallet = React.lazy(() => import('./components/Wallet'));
const Marketplace = React.lazy(() => import('./components/Marketplace'));
const Social = React.lazy(() => import('./components/Social'));
const Learn = React.lazy(() => import('./components/Learn'));
const Impact = React.lazy(() => import('./components/Impact'));
const Documentation = React.lazy(() => import('./components/subsites/Documentation'));
const Guides = React.lazy(() => import('./components/subsites/Guides'));
const Blog = React.lazy(() => import('./components/subsites/Blog'));
const Support = React.lazy(() => import('./components/subsites/Support'));
const Privacy = React.lazy(() => import('./components/subsites/Privacy'));
const Terms = React.lazy(() => import('./components/subsites/Terms'));
const Cookies = React.lazy(() => import('./components/subsites/Cookies'));
const CreatorDashboard = React.lazy(() => import('./components/creator/CreatorDashboard'));
const MessagingCenter = React.lazy(() => import('./components/social/messaging/MessagingCenter'));
const AchievementCenter = React.lazy(() => import('./components/social/achievements/AchievementCenter'));
const MemberDirectory = React.lazy(() => import('./components/social/MemberDirectory'));
const EventManager = React.lazy(() => import('./components/social/EventManager'));
const DAODashboard = React.lazy(() => import('./components/dao/DAODashboard'));
const ProposalDetails = React.lazy(() => import('./components/dao/ProposalDetails'));
const Collaborate = React.lazy(() => import('./components/participate/Collaborate'));
const ReferralProgram = React.lazy(() => import('./components/participate/ReferralProgram'));

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <OfflineNotice />
          <Navbar />
          <main className="flex-grow">
            <Suspense fallback={<LoadingScreen />}>
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/wallet" element={<Wallet />} />
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/social" element={<Social />} />
                <Route path="/learn" element={<Learn />} />
                <Route path="/impact" element={<Impact />} />
                <Route path="/docs" element={<Documentation />} />
                <Route path="/guides" element={<Guides />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/support" element={<Support />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/cookies" element={<Cookies />} />
                <Route path="/creator/dashboard" element={<CreatorDashboard />} />
                <Route path="/messages" element={<MessagingCenter />} />
                <Route path="/achievements" element={<AchievementCenter />} />
                <Route path="/members" element={<MemberDirectory />} />
                <Route path="/events" element={<EventManager />} />
                <Route path="/dao" element={<DAODashboard />} />
                <Route path="/dao/proposals/:proposalId" element={<ProposalDetails />} />
                <Route path="/collaborate" element={<Collaborate />} />
                <Route path="/referral" element={<ReferralProgram />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
          <AIChat />
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;