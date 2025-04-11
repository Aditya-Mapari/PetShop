import React, { useState } from 'react';

const heroImages = [
  {
    image:'https://petsy.online/cdn/shop/files/1912x531_bd16f423-e380-4f6e-b615-9a8b14160e07.jpg?v=1742985271&width=1912',
    alt: 'New Banner 1',
    title: 'Welcome to PetShop',
    subtitle: 'Find everything your pet needs in one place.',
  },
  {

    image:'https://petsy.online/cdn/shop/files/1912X531_3_934fdc0d-67c8-45c3-a908-e5679be43346.jpg?v=1742896743&width=1912',
    alt: 'New Banner 2',
    title: 'Quality Pet Products',
    subtitle: 'Shop the best products for your furry friends.',
  },
  {
    image: 'https://petsy.online/cdn/shop/files/1912x531_9e19887c-ca62-47ac-887c-8ddcb029ef12.jpg?v=1742889524&width=1912', // Updated image path
    alt: 'New Banner 3',
    title: 'Care for Your Pets',
    subtitle: 'Discover tips and tricks for pet care.',
  },
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + heroImages.length) % heroImages.length);
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full h-[400px] overflow-hidden">
      {/* Carousel Images */}
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {heroImages.map((slide, index) => (
          <div key={index} className="w-full flex-shrink-0 relative">
            <img
              src={slide.image}
              alt={slide.alt}
              className="w-full h-full rounded-lg shadow-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex flex-col justify-center items-start p-8">
              <h1 className="text-4xl font-bold text-white mb-2">{slide.title}</h1>
              <p className="text-lg text-gray-200">{slide.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? 'bg-blue-500' : 'bg-gray-300'
            }`}
          ></button>
        ))}
      </div>

      {/* Arrow Buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white text-blue-500 p-3 rounded-full shadow-lg hover:bg-gray-100 transition duration-300"
      >
        &#8592;
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white text-blue-500 p-3 rounded-full shadow-lg hover:bg-gray-100 transition duration-300"
      >
        &#8594;
      </button>


    </div>
  );
};

export default Hero;
