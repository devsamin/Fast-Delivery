import React, { useState } from 'react';

// Define data directly in the component
const reviewData = [
  {
    id: 1,
    title: "Excellent Service",
    description: "Fast delivery and great customer service. Highly recommended!",
    image: "https://picsum.photos/300/200?random=1",
    rating: 5
  },
  {
    id: 2,
    title: "Very Satisfied",
    description: "Products arrived on time and in perfect condition.",
    image: "https://picsum.photos/300/200?random=2",
    rating: 4
  },
  {
    id: 3,
    title: "Good Experience",
    description: "Reasonable prices and fast shipping. Will order again.",
    image: "https://picsum.photos/300/200?random=3",
    rating: 5
  },
  {
    id: 4,
    title: "Impressive Delivery",
    description: "Same day delivery exceeded my expectations.",
    image: "https://picsum.photos/300/200?random=4",
    rating: 5
  },
  {
    id: 5,
    title: "Professional Service",
    description: "Friendly staff and efficient delivery process.",
    image: "https://picsum.photos/300/200?random=5",
    rating: 4
  }
];

const CustomerReviewCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === reviewData.length - 3 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? reviewData.length - 3 : prevIndex - 1
    );
  };

  const visibleCards = reviewData.slice(currentIndex, currentIndex + 3);
  const shouldWrap = currentIndex > reviewData.length - 3;
  const wrappedCards = shouldWrap 
    ? [
        ...reviewData.slice(currentIndex),
        ...reviewData.slice(0, 3 - (reviewData.length - currentIndex))
      ]
    : [];
  const displayCards = shouldWrap ? wrappedCards : visibleCards;

  return (
    <div className="relative max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">Customer Reviews</h2>
      
      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-16 bg-[#CAEB66] rounded-full p-3 shadow-lg hover:bg-[#a4d70a] transition-colors z-10"
          aria-label="Previous reviews"
        >
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-16 bg-[#CAEB66] rounded-full p-3 shadow-lg hover:bg-[#a4d70a] transition-colors z-10"
          aria-label="Next reviews"
        >
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Cards Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 min-h-[300px]">
          {displayCards.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={review.image}
                alt={review.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <h3 className="text-xl font-semibold text-gray-800 mr-2">
                    {review.title}
                  </h3>
                  <div className="flex text-yellow-400">
                    {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  {review.description}
                </p>
                <div className="text-sm text-gray-500">
                  Customer Review
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: reviewData.length - 2 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'
              }`}
              aria-label={`Go to review ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerReviewCarousel;