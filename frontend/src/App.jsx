import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Container } from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';
import userAtom from './Atoms/userAtom';
import HomePage from './pages/HomePage';
import Headers from './components/Headers';
import AuthPage from './pages/AuthPage';
import UserPage from './pages/UserPage';
import UpdateProfilePage from './pages/UpdateProfilePage';
import SeatBookingPage from './pages/SeatBookingPage';
import Contact from './pages/Contact';
import SlotBookingPage from './pages/SlotBookingPage';
import PaymentPage from './pages/PaymentPage';
import Success from './pages/Success';
import Cancel from './pages/Cancel';
import TicketPage from './pages/TicketPage';

// Load the Stripe key
const stripePromise = loadStripe('your-publishable-key');

function App() {
  const user = useRecoilValue(userAtom);
  console.log(user);

  return (
    <Container maxWidth="1300px">
      <Routes>
        <Route path="/" element={user ? <HomePage /> : <Navigate to="/auth" />} />
        <Route path="/auth" element={!user ? <AuthPage /> : <Navigate to="/" />} />
        <Route path='/protected/paymentConf' element={user? <Success/>:<Navigate to="/auth" /> } />
        <Route path='/cancel' element={user ? <Cancel/>:<Navigate to="/auth" />} />
        <Route path="/:username" element={user?<UserPage />:<Navigate to="/auth" />} />
        <Route path="/contact" element={user?<Contact />:<Navigate to="/auth" />} />
        <Route path="/update" element={user?<UpdateProfilePage />:<Navigate to="/auth" />} />
        <Route path="/seatBooking/:id" element={user?<SeatBookingPage />:<Navigate to="/auth" />} />
        <Route path="/slotBooking/:id" element={user?<SlotBookingPage />:<Navigate to="/auth" />} />
        <Route path="/payment/:id" element={<Elements stripe={stripePromise}><PaymentPage /></Elements>} />
        <Route path="/ticket/:id" element={user?<TicketPage/>:<Navigate to="/auth" />} />
      </Routes>
    </Container>
  );
}

export default App;
