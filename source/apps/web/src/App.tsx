import "@repo/ui/styles/globals.css";

import { Route, Routes } from "react-router";

import LoginPage from "./pages/unprotected/login";
import SignupPage from "./pages/unprotected/signup";
import RecoverPage from "./pages/unprotected/recover";
import ChangelogPage from "./pages/unprotected/changelog";
import CommunityPage from "./pages/unprotected/community";
import FeedbackPage from "./pages/unprotected/feedback";
import HelpPage from "./pages/unprotected/help";

import DashboardLayout from "./pages/protected/dashboard/layout";
import DashboardPage from "./pages/protected/dashboard";
import ActivityPage from "./pages/protected/dashboard/activity";
import FavoritesPage from "./pages/protected/dashboard/favorites";
import NotificationPage from "./pages/protected/dashboard/notifications";
import SettingsPage from "./pages/protected/dashboard/settings";
import TrashPage from "./pages/protected/dashboard/trash";
import DocumentPage from "./pages/protected/document";
import DocumentSettingsPage from "./pages/protected/document/settings";
import DocumentsVersionsPage from "./pages/protected/document/versions";

import NotFound from "./pages/not-found";
import LogoutPage from "./pages/protected/dashboard/logout";
// import Error from "./pages/error";
// import Loading from "./pages/loading";

const AUTHENTICATED = true;

function App() {
  if (AUTHENTICATED) {
    return (
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="activity" element={<ActivityPage />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="notifications" element={<NotificationPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="trash" element={<TrashPage />} />
          <Route path="logout" element={<LogoutPage />} />
        </Route>
        <Route path="document/:docId" element={<DocumentPage />} />
        <Route path="document/:docId/settings" element={<DocumentSettingsPage />} />
        <Route path="document/:docId/versions" element={<DocumentsVersionsPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    )
  } else {
    return (
      <section>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/recover" element={<RecoverPage />} />
          <Route path="/changelog" element={<ChangelogPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </section>
    )
  }
}

export default App;
