import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WealthSpinner from "../components/Spinner";
import ProtectedSubscription from "./ProtectedSubscription";
import UserChat from "../pages/Chat";





const LandingPage = lazy(() => import("../pages/LandingPage"));
const Blog = lazy(() => import("../pages/Blog"));
const SingleBlog = lazy(() => import("../pages/SingleBlag"));
const Signup = lazy(() => import("../pages/Signup"));
const Login = lazy(() => import("../pages/Login"));
const Profile = lazy(() => import("../pages/Profile"));
const ContactUs = lazy(() => import("../pages/ContactUs"));
const Executors = lazy(() => import("../pages/Executors"));
const Pricing = lazy(() => import("../pages/Pricing"));
const Checkout = lazy(() => import("../pages/Checkout"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Debts = lazy(() => import("../pages/Debts"));
const Insurance = lazy(() => import("../pages/Insurance"));
const Utilities = lazy(() => import("../pages/Utilities"));
const FAQ = lazy(() => import("../pages/FAQ"));
const AssetsPage = lazy(() => import("../pages/Assets"));
const NotFound = lazy(() => import("../pages/NotFound"));
const Investments = lazy(() => import("../pages/Investments"));
const Banking = lazy(() => import("../pages/Banking"));
const Calendar = lazy(() => import("../pages/Calendar"));
const AboutUs = lazy(() => import("../pages/AboutUs"));
const PaymentSuccess = lazy(() => import("../pages/PaymentSuccess"));
const PaymentFailed = lazy(() => import("../pages/PaymentFailed"));
const InvitePage = lazy(() => import("../pages/InvitePage"));
const Services = lazy(() => import("../pages/Services"));
const SingleService = lazy(() => import("../pages/SingleService"));
const HowItWorks = lazy(() => import("../pages/HowItWorks"));
const PrivacyPolicy = lazy(() => import("../pages/PrivacyPolicy"));
const TermsAndConditions = lazy(() => import("../pages/TermAndConditions"));



const Routing = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<WealthSpinner />}>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/chat" element={<UserChat />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="/blogs" element={<Blog />} />
          <Route path="/blog/:slug" element={<SingleBlog />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<SingleService />} />
          <Route path="/checkout/:id" element={<Checkout />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-failed" element={<PaymentFailed />} />
          <Route path="/executor/invite/:token" element={<InvitePage />} />
          <Route path="/faq" element={<FAQ />} />
          <Route element={<ProtectedSubscription />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/profile" element={<Profile />} />
            <Route path="/dashboard/executors" element={<Executors />} />
            <Route path="/dashboard/debts" element={<Debts />} />
            <Route path="/dashboard/insurance" element={<Insurance />} />
            <Route path="/dashboard/utilities" element={<Utilities />} />
            <Route path="/dashboard/assets" element={<AssetsPage />} />
            <Route path="/dashboard/investments" element={<Investments />} />
            <Route path="/dashboard/banking" element={<Banking />} />
            <Route path="/dashboard/calendar" element={<Calendar />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Routing;
