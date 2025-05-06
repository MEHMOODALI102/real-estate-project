import { useState, useEffect } from 'react';

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

// Define Property interface (optional but good practice)
interface Property {
  _id: string; // Assuming ObjectId can be represented as string
  title: string;
  description: string;
  location: string;
  price: string; // Keep as string as in original data
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  propertyType: string;
  transactionType: string; // "Buy" or "Rent"
  mainImage: string;
  interiorImages: any[]; // Define more strictly if needed
  createdAt: Date;
  updatedAt: Date;
}

// --- Your Property Data Integrated Here ---
const properties: Property[] = [
  {
    _id: '680e54fa6722c093f8ea6454',
    title: "the dragon",
    description: "A majestic bungalow offering unparalleled views and luxury.", // Example description
    location: "ladakh",
    price: "1000000", // Assuming price is base, adjust formatting if needed
    bedrooms: 10,
    bathrooms: 7,
    sqft: 10000,
    propertyType: "Bungalow",
    transactionType: "Buy",
    mainImage: "/uploads/mainImage-1745769722426-972507242.jpg",
    interiorImages: [],
    createdAt: new Date("2025-04-27T16:02:02.483Z"),
    updatedAt: new Date("2025-04-27T16:02:02.483Z"),
  },
  {
    _id: '680e55676722c093f8ea6457',
    title: "holiday in ",
    description: "A compact penthouse perfect for getaways.", // Example description
    location: "kargil",
    price: "1000000",
    bedrooms: 5,
    bathrooms: 2,
    sqft: 300,
    propertyType: "Penthouse",
    transactionType: "Buy",
    mainImage: "/uploads/mainImage-1745769831401-213858959.jpg",
    interiorImages: [],
    createdAt: new Date("2025-04-27T16:03:51.438Z"),
    updatedAt: new Date("2025-04-27T16:03:51.438Z"),
  },
  {
    _id: '680e570e07a631c845562144',
    title: "goat villa ",
    description: "Charming villa available for rent in Hyderabad.", // Example description
    location: "hyderabad",
    price: "10000", // Assuming price is per month for rent
    bedrooms: 6,
    bathrooms: 6,
    sqft: 200,
    propertyType: "Villa",
    transactionType: "Rent",
    mainImage: "/uploads/mainImage-1745770254102-906973636.jpg",
    interiorImages: [],
    createdAt: new Date("2025-04-27T16:10:54.180Z"),
    updatedAt: new Date("2025-04-27T16:10:54.180Z"),
  },
  {
    _id: '680e5b53b7bda332f6f57182',
    title: "the kargil villa",
    description: "Spacious villa for rent with ample bathrooms in Kargil.", // Example description
    location: "kargil",
    price: "10000", // Assuming price is per month for rent
    bedrooms: 5,
    bathrooms: 10,
    sqft: 1000,
    propertyType: "Villa",
    transactionType: "Rent",
    mainImage: "/uploads/mainImage-1745771347205-598494654.jpg",
    interiorImages: [],
    createdAt: new Date("2025-04-27T16:29:07.288Z"),
    updatedAt: new Date("2025-04-27T16:29:07.288Z"),
  }
];
// --- End of Property Data ---


export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  // Initial greeting message (Your logic unchanged)
  useEffect(() => {
    setTimeout(() => {
      setMessages([{
        text: "Hello! I'm your Estate assistant. How can I help you with your luxury residence inquiries in South Delhi today?", // Note: Greeting mentions South Delhi, properties are elsewhere. Adjust if needed.
        isUser: false,
        timestamp: new Date()
      }]);
    }, 1000);
  }, []);

  const sendMessage = (text: string) => {
    // Add user message (Your logic unchanged)
    const userMessage: Message = {
      text,
      isUser: true,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);

    // Generate bot response (Your logic unchanged)
    setTimeout(() => {
      // Now uses the 'properties' array defined above
      const botMessage = generateResponse(text);
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  // Uses the 'properties' array defined above for filtering
  const generateResponse = (userMessage: string): Message => {
    const lowerCaseMessage = userMessage.toLowerCase();
    let responseText = "";

    // Filter properties based on location (Your logic unchanged)
    // Example: "show me location kargil"
    const locationRegex = /(?:in|at|location)\s+([a-zA-Z]+)/; // Slightly improved regex
    const locationMatch = lowerCaseMessage.match(locationRegex);
    let locationHandled = false;

    if (locationMatch && locationMatch[1]) {
      const location = locationMatch[1].toLowerCase();
      const filteredProperties = properties.filter(prop =>
        prop.location.toLowerCase().includes(location)
      );
      if (filteredProperties.length > 0) {
        responseText = "Here are the properties I found in " + location.charAt(0).toUpperCase() + location.slice(1) + ":\n";
        filteredProperties.forEach((property) => {
          responseText += `
- ${property.title}, located in ${property.location}
  ${property.transactionType === 'Rent' ? 'Rent' : 'Price'}: ₹${property.price} ${property.transactionType === 'Rent' ? 'per month' : ''}
  Specs: ${property.bedrooms} Bed(s), ${property.bathrooms} Bath(s)
  Description: ${property.description}\n`; // Using example description
        });
      } else {
        responseText = `Sorry, I couldn't find any properties listed in ${location.charAt(0).toUpperCase() + location.slice(1)}. Would you like to try another location?`;
      }
      locationHandled = true; // Mark that location was handled
    }

    // If location wasn't the primary query, check other types
    if (!locationHandled) {
        // Filter properties based on property type (Your logic unchanged)
        if (lowerCaseMessage.includes("villa") || lowerCaseMessage.includes("house") || lowerCaseMessage.includes("bungalow") || lowerCaseMessage.includes("penthouse")) {
            const type = lowerCaseMessage.includes("villa") ? "villa" :
                         lowerCaseMessage.includes("house") ? "house" : // Note: 'house' isn't a distinct type in your data
                         lowerCaseMessage.includes("bungalow") ? "bungalow" : "penthouse";

            const filteredProperties = properties.filter(prop =>
              prop.propertyType.toLowerCase().includes(type)
            );
            if (filteredProperties.length > 0) {
              responseText = `Here are some ${type}s available:\n`;
              filteredProperties.forEach((property) => {
                responseText += `
- ${property.title}, located in ${property.location}
  ${property.transactionType === 'Rent' ? 'Rent' : 'Price'}: ₹${property.price} ${property.transactionType === 'Rent' ? 'per month' : ''}
  Specs: ${property.bedrooms} Bed(s), ${property.bathrooms} Bath(s)
  Description: ${property.description}\n`;
              });
            } else {
              responseText = `Sorry, I couldn't find any ${type}s. Would you like to look at other types?`;
            }
        }
        // Filter properties based on transaction type (Your logic unchanged)
        else if (lowerCaseMessage.includes("buy") || lowerCaseMessage.includes("for sale")) {
            const filteredProperties = properties.filter(prop => prop.transactionType.toLowerCase() === "buy");
            if (filteredProperties.length > 0) {
              responseText = "Here are some properties available for purchase:\n";
              filteredProperties.forEach((property) => {
                  responseText += `
- ${property.title}, located in ${property.location}
  Price: ₹${property.price}
  Specs: ${property.bedrooms} Bed(s), ${property.bathrooms} Bath(s)
  Description: ${property.description}\n`;
                });
            } else {
              responseText = "Sorry, no properties currently listed for sale. Would you like to explore rental options?";
            }
        }
        else if (lowerCaseMessage.includes("rent") || lowerCaseMessage.includes("rental")) { // Added 'rental'
            const filteredProperties = properties.filter(prop => prop.transactionType.toLowerCase() === "rent");
            if (filteredProperties.length > 0) {
              responseText = "Here are some properties available for rent:\n";
              filteredProperties.forEach((property) => {
                  responseText += `
- ${property.title}, located in ${property.location}
  Rent: ₹${property.price} per month
  Specs: ${property.bedrooms} Bed(s), ${property.bathrooms} Bath(s)
  Description: ${property.description}\n`;
                });
            } else {
              responseText = "Sorry, no properties currently listed for rent. Would you like to explore properties for sale?";
            }
        } else {
          // Fallback to generic responses if no property filters match
          responseText = handleResponse(lowerCaseMessage);
        }
    }


    return {
      text: responseText,
      isUser: false,
      timestamp: new Date()
    };
  };

  // Your handleResponse function (Unchanged)
  const handleResponse = (lowerCaseMessage: string): string => {
    let responseText = "";
    // --- Your existing generic response logic ---
    if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi')) {
     responseText = "Namaste! How can I assist you with Estate properties today?";
    } else if (lowerCaseMessage.includes('price') || lowerCaseMessage.includes('cost')) {
     responseText = "Our residences start from ₹1.2 crore. Would you like a sales representative to contact you with more pricing details?";
    } else if (lowerCaseMessage.includes('amenities')) {
     responseText = "Our properties offer amenities like a gym, swimming pool, clubhouse, 24/7 security, and dedicated parking. Would you like a brochure?";
    } else if (lowerCaseMessage.includes('floor plan') || lowerCaseMessage.includes('layout')) {
     responseText = "We offer 2BHK, 3BHK, and penthouse floor plans. Do you have a specific configuration in mind?";
    } else if (lowerCaseMessage.includes('viewing') || lowerCaseMessage.includes('visit')) {
     responseText = "Great! I can help schedule a private viewing. Please share your preferred date and time.";
    } else if (lowerCaseMessage.includes('contact') || lowerCaseMessage.includes('sales representative')) {
     responseText = "Sure! Please share your phone number or email, and our sales executive will reach out shortly.";
    } // ... other generic responses ...
    else {
     responseText = "Thank you for your interest in Estate luxury residences. Would you like to know more about our amenities, floor plans, or schedule a private viewing?";
    }
    // --- End of generic response logic ---
    return responseText;
  };

  return {
    messages,
    sendMessage
  };
};