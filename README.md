# Ticket Booking with Integrated Parking Slot Booking

# Description:
  This project streamlines the event-going experience by offering a user-friendly platform for booking tickets and securing corresponding parking slots.
  It seamlessly integrates both processes, saving users time and ensuring a convenient experience.

 # Technologies:
  Frontend: React.js, Chakra ui, Recoil, React-router-dom, Toast
  Backend: Node.js, Express.js
  Database: MongoDB
  Payment Processing: Stripe
  Emailing: emailjs-com
  Storing-Images: cloudinary
# Features:
   # Ticket Booking:
     Users can see the current events and the upcoming event.
     Clear display of available ticket types and quantities.
     Secure payment processing via Stripe for ticket purchases.
   # Parking Slot Booking:
     Integration with the ticket booking flow for seamless parking selection.
     Real-time availability of parking slots based on event dates and times.
     User-friendly interface for reserving a designated parking space.
   # Customer feedback:
     EmailJS integration for sending emails to give feedbacks.
   # booked Tickets:
     You can see the booked tickets and also download it 
   # Update Profile
     Can update the Name, PhoneNumber, Email, Password ,ProfilePic etc


# Installation
   # setup .env file in backend
     PORT=
     MONGO_URL=
     JWT_SECRET=
     CLOUDINARY_CLOUD_NAME=
     CLOUDINARY_API_KEY=
     CLOUDINARY_API_SECRET=
     STRIPE_SECRET_KEY=

     after setting up the env
       1. cd/backend
       2. npm start

  # For Frontend
     1. cd/frontend
     2. npm run dev
       
