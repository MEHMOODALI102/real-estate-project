import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Building, List, Trash2, Play, Pause, Plus } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// Mock data for agent profile
const agentData = {
  name: "Rahul Verma",
  title: "Senior Real Estate Agent",
  email: "rahul.verma@estate.com",
  phone: "+91 9876543210",
  joined: "March 2021",
  avatar: "https://i.pravatar.cc/150?img=3",
  bio: "With over 10 years of experience in luxury real estate, Rahul specializes in high-end properties across South Delhi. His client-focused approach and deep market knowledge make him one of the most sought-after agents in the region.",
  listings: {
    active: 8,
    sold: 24,
    total: 32
  }
};

// Mock data for property listings
const propertyListings = [
  {
    id: 1,
    title: "Luxury Villa in Green Park",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    price: "₹5.8 Cr",
    address: "Green Park, South Delhi",
    status: "active",
    listedOn: "Jan 15, 2025",
    views: 245,
    inquiries: 12
  },
  {
    id: 2,
    title: "Premium Apartment with Terrace",
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    price: "₹2.4 Cr",
    address: "Vasant Kunj, Delhi",
    status: "active",
    listedOn: "Feb 3, 2025",
    views: 178,
    inquiries: 8
  },
  {
    id: 3,
    title: "Modern Villa with Swimming Pool",
    image: "https://images.unsplash.com/photo-1600607687644-c7531e489ece?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    price: "₹7.2 Cr",
    address: "Golf Links, New Delhi",
    status: "paused",
    listedOn: "Dec 10, 2024",
    views: 320,
    inquiries: 14
  },
  {
    id: 4,
    title: "Heritage Style Bungalow",
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    price: "₹8.5 Cr",
    address: "Sundar Nagar, Delhi",
    status: "active",
    listedOn: "Jan 28, 2025",
    views: 156,
    inquiries: 7
  },
  {
    id: 5,
    title: "Elegant Apartment with City View",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    price: "₹3.2 Cr",
    address: "Hauz Khas, South Delhi",
    status: "active",
    listedOn: "Feb 10, 2025",
    views: 102,
    inquiries: 5
  }
];

type TabState = "overview" | "listings" | "status-active" | "status-paused";

const AgentProfile: React.FC = () => {
  const navigate = useNavigate();
  const [listings, setListings] = useState(propertyListings);
  const [activeTab, setActiveTab] = useState<TabState>("overview");

  // Handler for toggling property status (active/paused)
  const handleToggleStatus = (id: number) => {
    setListings(listings.map(listing => {
      if (listing.id === id) {
        const newStatus = listing.status === 'active' ? 'paused' : 'active';
        toast.success(`Listing ${newStatus === 'active' ? 'activated' : 'paused'} successfully`);
        return { ...listing, status: newStatus };
      }
      return listing;
    }));
  };

  // Handler for deleting a property
  const handleDeleteProperty = (id: number) => {
    setListings(listings.filter(listing => listing.id !== id));
    toast.success("Listing deleted successfully");
  };

  // Handler for navigating to add property page
  const handleAddProperty = () => {
    navigate('/agent-dashboard');
  };

  // Count active and paused listings
  const activeListings = listings.filter(l => l.status === 'active').length;
  const pausedListings = listings.filter(l => l.status === 'paused').length;

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8 gold-gradient">Agent Profile</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="flex flex-col items-center mb-6">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src={agentData.avatar} alt={agentData.name} />
                    <AvatarFallback className="text-xl">{agentData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-semibold">{agentData.name}</h2>
                  <p className="text-gray-500 text-sm">{agentData.title}</p>
                  <p className="text-gray-500 text-xs mt-1">Member since {agentData.joined}</p>
                </div>
                
                <div className="space-y-1">
                  <button 
                    onClick={() => setActiveTab("overview")}
                    className={`w-full text-left py-2 px-3 rounded-md flex items-center gap-3 transition-colors ${activeTab === "overview" ? "bg-luxury-gold/10 text-luxury-gold" : "hover:bg-gray-100"}`}
                  >
                    <Building size={18} />
                    <span>Overview</span>
                  </button>
                  <button 
                    onClick={() => setActiveTab("listings")}
                    className={`w-full text-left py-2 px-3 rounded-md flex items-center gap-3 transition-colors ${activeTab === "listings" ? "bg-luxury-gold/10 text-luxury-gold" : "hover:bg-gray-100"}`}
                  >
                    <List size={18} />
                    <span>Property Listings</span>
                  </button>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-medium mb-4">Contact Information</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-gray-500">Email</p>
                    <p>{agentData.email}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Phone</p>
                    <p>{agentData.phone}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-3">
              {activeTab === "overview" && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Agent Profile</CardTitle>
                      <CardDescription>Professional information and background</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-medium text-gray-700 mb-2">About</h3>
                          <p className="text-gray-600">{agentData.bio}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-2xl font-bold text-luxury-gold">{agentData.listings.active}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">Active Listings</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-2xl font-bold text-luxury-gold">{agentData.listings.sold}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">Properties Sold</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-2xl font-bold text-luxury-gold">{agentData.listings.total}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">Total Listings</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}
              
              {(activeTab === "listings" || activeTab === "status-active" || activeTab === "status-paused") && (
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div>
                      <CardTitle>Property Listings</CardTitle>
                      <CardDescription>Manage your property listings</CardDescription>
                    </div>
                    <Button 
                      className="bg-luxury-gold hover:bg-luxury-lightGold text-black"
                      onClick={handleAddProperty}
                    >
                      <Plus size={16} className="mr-2" />
                      Add Property
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6 flex flex-wrap gap-3">
                      <Button 
                        variant="outline" 
                        className={`${activeTab === "listings" ? "bg-luxury-gold/10 text-luxury-gold border-luxury-gold" : ""}`}
                        onClick={() => setActiveTab("listings")}
                      >
                        All ({listings.length})
                      </Button>
                      <Button 
                        variant="outline" 
                        className={activeTab === "status-active" ? "bg-luxury-gold/10 text-luxury-gold border-luxury-gold" : ""}
                        onClick={() => setActiveTab("status-active")}
                      >
                        Active ({activeListings})
                      </Button>
                      <Button 
                        variant="outline" 
                        className={activeTab === "status-paused" ? "bg-luxury-gold/10 text-luxury-gold border-luxury-gold" : ""}
                        onClick={() => setActiveTab("status-paused")}
                      >
                        Paused ({pausedListings})
                      </Button>
                    </div>
                    
                    <div className="overflow-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Property</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Listed On</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Stats</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {listings
                            .filter(listing => {
                              if (activeTab === "status-active") return listing.status === "active";
                              if (activeTab === "status-paused") return listing.status === "paused";
                              return true;
                            })
                            .map((listing) => (
                              <TableRow key={listing.id}>
                                <TableCell>
                                  <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded overflow-hidden">
                                      <img src={listing.image} alt={listing.title} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                      <div className="font-medium">{listing.title}</div>
                                      <div className="text-xs text-gray-500">{listing.address}</div>
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="font-medium text-luxury-gold">{listing.price}</div>
                                </TableCell>
                                <TableCell>
                                  <div className="text-sm">{listing.listedOn}</div>
                                </TableCell>
                                <TableCell>
                                  <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    listing.status === 'active' 
                                      ? 'bg-green-100 text-green-800' 
                                      : 'bg-amber-100 text-amber-800'
                                  }`}>
                                    {listing.status === 'active' ? 'Active' : 'Paused'}
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="text-sm">
                                    <div>{listing.views} views</div>
                                    <div>{listing.inquiries} inquiries</div>
                                  </div>
                                </TableCell>
                                <TableCell className="text-right">
                                  <div className="flex justify-end gap-2">
                                    <Button 
                                      variant="outline" 
                                      size="sm"
                                      onClick={() => handleToggleStatus(listing.id)}
                                      title={listing.status === 'active' ? 'Pause Listing' : 'Activate Listing'}
                                    >
                                      {listing.status === 'active' ? <Pause size={16} /> : <Play size={16} />}
                                    </Button>
                                    <Button 
                                      variant="outline" 
                                      size="sm"
                                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                      onClick={() => handleDeleteProperty(listing.id)}
                                      title="Delete Listing"
                                    >
                                      <Trash2 size={16} />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
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

export default AgentProfile;
