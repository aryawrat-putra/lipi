import "@repo/ui/styles/globals.css";

import NotFound from "./pages/not-found";
import Error from "./pages/error";
import Loading from "./pages/loading";
import { Route, Routes } from "react-router";
import LoginPage from "./pages/unprotected/login";
import SignupPage from "./pages/unprotected/signup";
import RecoverPage from "./pages/unprotected/recover";

const AUTHENTICATED = false;

function App() {
  if (AUTHENTICATED) {
    return (
      <section>
        <Routes>
          <Route errorElement={<Error />} path="*" element={<NotFound />} />
        </Routes>
      </section>
    )
  } else {
    return (
      <section>
        {/*  */}
        {/* */}
        <Routes>
          <Route errorElement={<Error />} path="/" element={<LoginPage />} />
          <Route errorElement={<Error />} path="/signup" element={<SignupPage />} />
          <Route errorElement={<Error />} path="/recover" element={<RecoverPage />} />
          <Route errorElement={<Error />} path="*" element={<NotFound />} />
        </Routes>
      </section>
    )
  }
}

export default App;
