import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, History, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock data for user profile
const userData = {
  name: "John Smith",
  email: "john.smith@example.com",
  phone: "+91 9876543210",
  joined: "January 2023",
  avatar: "https://i.pravatar.cc/150?img=1"
};

// Mock data for liked properties
const likedProperties = [
  {
    id: 1,
    title: "Luxury Villa in South Delhi",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    price: "₹4.5 Cr",
    address: "Green Park, South Delhi",
    bedrooms: 4,
    bathrooms: 3,
    area: "3,500 sq ft",
  },
  {
    id: 2,
    title: "Elegant Apartment with Garden View",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    price: "₹1.8 Cr",
    address: "Vasant Kunj, Delhi",
    bedrooms: 3,
    bathrooms: 2,
    area: "1,800 sq ft",
  },
  {
    id: 3,
    title: "Modern Penthouse with Skyline View",
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    price: "₹6.2 Cr",
    address: "Golf Links, New Delhi",
    bedrooms: 4,
    bathrooms: 4,
    area: "4,200 sq ft",
  }
];

// Mock data for viewing history
const viewingHistory = [
  {
    id: 4,
    title: "Spacious Family Home",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    price: "₹3.7 Cr",
    address: "Chanakyapuri, Delhi",
    viewedOn: "2 days ago",
  },
  {
    id: 5,
    title: "Luxury Apartment with Pool Access",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    price: "₹2.5 Cr",
    address: "Gurgaon Sector 48",
    viewedOn: "Last week",
  },
  {
    id: 6,
    title: "Heritage Style Villa with Garden",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    price: "₹5.1 Cr",
    address: "New Friends Colony",
    viewedOn: "2 weeks ago",
  }
];

const UserProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8 gold-gradient">User Profile</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="flex flex-col items-center mb-6">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src={userData.avatar} alt={userData.name} />
                    <AvatarFallback className="text-xl">{userData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-semibold">{userData.name}</h2>
                  <p className="text-gray-500 text-sm">Member since {userData.joined}</p>
                </div>
                
                <div className="space-y-1">
                  <button 
                    onClick={() => setActiveTab("profile")}
                    className={`w-full text-left py-2 px-3 rounded-md flex items-center gap-3 transition-colors ${activeTab === "profile" ? "bg-luxury-gold/10 text-luxury-gold" : "hover:bg-gray-100"}`}
                  >
                    <User size={18} />
                    <span>Profile</span>
                  </button>
                  <button 
                    onClick={() => setActiveTab("liked")}
                    className={`w-full text-left py-2 px-3 rounded-md flex items-center gap-3 transition-colors ${activeTab === "liked" ? "bg-luxury-gold/10 text-luxury-gold" : "hover:bg-gray-100"}`}
                  >
                    <Heart size={18} />
                    <span>Liked Properties</span>
                  </button>
                  <button 
                    onClick={() => setActiveTab("history")}
                    className={`w-full text-left py-2 px-3 rounded-md flex items-center gap-3 transition-colors ${activeTab === "history" ? "bg-luxury-gold/10 text-luxury-gold" : "hover:bg-gray-100"}`}
                  >
                    <History size={18} />
                    <span>Viewing History</span>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-3">
              {activeTab === "profile" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Manage your personal details</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-500">Full Name</label>
                          <div className="mt-1 text-base">{userData.name}</div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Email Address</label>
                          <div className="mt-1 text-base">{userData.email}</div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Phone Number</label>
                          <div className="mt-1 text-base">{userData.phone}</div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Member Since</label>
                          <div className="mt-1 text-base">{userData.joined}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {activeTab === "liked" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Liked Properties</CardTitle>
                    <CardDescription>Properties you've saved for future reference</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                      {likedProperties.map((property) => (
                        <div key={property.id} className="bg-white rounded-md overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                          <div className="relative h-44">
                            <img 
                              src={property.image}
                              alt={property.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-2 right-2">
                              <button className="p-1.5 rounded-full bg-white/90 text-luxury-gold hover:bg-white">
                                <Heart size={18} fill="currentColor" />
                              </button>
                            </div>
                          </div>
                          <div className="p-4">
                            <h3 className="text-lg font-semibold line-clamp-1">{property.title}</h3>
                            <p className="text-luxury-gold font-medium mt-1">{property.price}</p>
                            <p className="text-gray-600 text-sm mt-1">{property.address}</p>
                            <div className="flex items-center gap-3 mt-3 text-sm text-gray-500">
                              <span>{property.bedrooms} Beds</span>
                              <span>•</span>
                              <span>{property.bathrooms} Baths</span>
                              <span>•</span>
                              <span>{property.area}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {activeTab === "history" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Viewing History</CardTitle>
                    <CardDescription>Properties you've recently viewed</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {viewingHistory.map((property) => (
                        <div key={property.id} className="flex flex-col md:flex-row gap-4 p-4 bg-white rounded-md border border-gray-200 hover:shadow-sm transition-shadow">
                          <div className="w-full md:w-32 h-24">
                            <img 
                              src={property.image}
                              alt={property.title}
                              className="w-full h-full object-cover rounded-md"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold">{property.title}</h3>
                            <p className="text-luxury-gold font-medium mt-1">{property.price}</p>
                            <p className="text-gray-600 text-sm">{property.address}</p>
                          </div>
                          <div className="flex flex-col items-end justify-between">
                            <span className="text-sm text-gray-500">Viewed {property.viewedOn}</span>
                            <button className="text-sm text-luxury-gold hover:underline">View Again</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default UserProfile;
