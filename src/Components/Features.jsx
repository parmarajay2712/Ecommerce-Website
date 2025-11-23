import React from "react"; // Import React to use JSX
import { Clock, Lock, RotateCcw, Truck } from "lucide-react"; // Import icons from lucide-react

// Array of feature objects containing icon, main text, and subtext
const features = [
  { icon: Truck, text: "Free Shipping", subtext: "On orders over $100" },
  { icon: Lock, text: "Secure Payment", subtext: "100% protected payments" },
  { icon: RotateCcw, text: "Easy Returns", subtext: "30-day return policy" },
  { icon: Clock, text: "24/7 Support", subtext: "Dedicated customer service" },
];

const Features = () => {
  return (
    // Container div for features section with background and padding
    <div className="bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Grid layout for features: 1 column on small screens, 2 on medium, 4 on large */}
        <div className="grid grid-cols-1 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8">
          {features.map((feature, index) => {
            const Icon = feature.icon; // Assign icon to a variable to render as React component
            return (
              <div
                key={index} // Unique key for list rendering
                className="flex items-center justify-center text-center sm:text-left"
              >
                {/* Render the icon */}
                <Icon
                  className="shrink-0 h-10 w-10 text-gray-600" // Size and color styling
                  aria-hidden="true" // Accessibility: icon is decorative
                />
                {/* Text content next to icon */}
                <div className="ml-4">
                  {/* Main feature text */}
                  <p className="text-base font-medium text-gray-900">
                    {feature.text}
                  </p>
                  {/* Subtext / description */}
                  <p className="mt-1 text-sm text-gray-500">
                    {feature.subtext}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Export Features component
export default Features;
