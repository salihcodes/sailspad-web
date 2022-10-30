import * as React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { AuthProvider } from "Context/AuthContext";
import { PrivateRoute } from "PrivateRoute";
import { LoginPage } from "Pages/Login";
import { ListTable } from "Pages/CardsList";
import { CardCreationPage } from "Pages/CardCreation";
import { SignUpPage } from "Pages/SignUp";
import { StepperProvider } from "Context/StepperContext";
import { SubscriptionDetailPage } from "Pages/Subscription";
import { AdminPage } from "Pages/Admin";
import MobileMarkerUpload from "Pages/CardCreation/MobileMarkerUpload";

const queryClient = new QueryClient();

// TODO: provide a better fallback UI for suspense, like a skeleton UI

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <StepperProvider>
          <Router>
            <Switch>
              {/* will add fallback={<Fallback />} later */}
              {/* <React.Suspense fallback={}> */}
              <Route exact path="/login">
                <LoginPage />
              </Route>
              <Route exact path="/signup">
                <SignUpPage />
              </Route>
              <Route exact path="/mobile-marker-upload/:accessToken">
                <MobileMarkerUpload />
              </Route>

              <Route exact path="/admin">
                <AdminPage />
              </Route>
              <PrivateRoute exact path="/">
                <ListTable />
              </PrivateRoute>
              <PrivateRoute exact path="/card">
                <CardCreationPage />
              </PrivateRoute>
              <PrivateRoute exact path="/subscription">
                <SubscriptionDetailPage />
              </PrivateRoute>
              <PrivateRoute exact path="/admin/dashboard">
                <AdminPage />
              </PrivateRoute>
              <PrivateRoute exact path="/card/:cardId/edit">
                <CardCreationPage />
              </PrivateRoute>
              <Redirect to="/" />
              {/* </React.Suspense> */}
            </Switch>
            <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
          </Router>
        </StepperProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
