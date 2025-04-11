const express = require('express');
const router = express.Router();

// Mock data for grooming service details
const groomingDetails = {
  title: 'Grooming Services',
  howItWorks: 'Our grooming services are designed to provide your pet with the best care possible. From bathing to styling, our professional groomers ensure your pet is comfortable and well-cared for throughout the process.',
  includes: [
    'Bathing and shampooing with pet-safe products',
    'Brushing and de-shedding to remove loose fur',
    'Nail trimming and paw care',
    'Ear cleaning to prevent infections',
    'Hair trimming and styling based on breed standards',
  ],
  benefits: [
    'Improves your pet\'s hygiene and overall health',
    'Reduces shedding and keeps your home cleaner',
    'Prevents skin issues and infections',
    'Enhances your pet\'s appearance and comfort',
  ],
  price: 'Starting at ₹500, with additional charges for larger breeds or special styling requests.',
  offers: 'Get 10% off on your first grooming session!',
};

// Route to fetch grooming details
router.get('/grooming', (req, res) => {
  res.send(groomingDetails); // Ensure this sends the correct grooming details
});

// Mock data for training service details
const trainingDetails = {
  title: 'Training Services',
  howItWorks: 'Our training services are designed to help your pet learn obedience, tricks, and good behavior. Our professional trainers ensure a positive and engaging experience for your pet.',
  includes: [
    'Basic obedience training',
    'Advanced tricks and commands',
    'Behavioral correction',
    'Socialization with other pets',
    'Leash training',
  ],
  benefits: [
    'Improves your pet\'s behavior and obedience',
    'Strengthens the bond between you and your pet',
    'Reduces anxiety and stress in pets',
    'Enhances social skills with other pets and people',
    'Provides mental stimulation and physical activity',
  ],
  price: 'Starting at ₹1000, with additional charges for advanced training programs.',
  offers: 'Get 15% off on your first training session!',
};

// Route to fetch training details
router.get('/training', (req, res) => {
  res.send(trainingDetails); // Ensure this sends the correct training details
});

// Mock data for vet care service details
const vetCareDetails = {
  title: 'Vet Care Services',
  howItWorks: 'Our vet care services ensure your pet receives the best medical attention. From routine checkups to emergency care, our experienced veterinarians are here to help.',
  includes: [
    'Routine health checkups',
    'Vaccinations',
    'Emergency care',
    'Surgery and post-operative care',
    'Nutritional counseling',
  ],
  benefits: [
    'Ensures your pet stays healthy and happy',
    'Prevents potential health issues',
    'Provides expert medical advice',
    'Offers immediate care during emergencies',
    'Improves your pet’s quality of life',
  ],
  price: 'Starting at ₹800, with additional charges for specialized treatments.',
  offers: 'Get 20% off on your first vet care visit!',
};

// Route to fetch vet care details
router.get('/vet-care', (req, res) => {
  res.send(vetCareDetails); // Ensure this sends the correct vet care details
});

module.exports = router;
