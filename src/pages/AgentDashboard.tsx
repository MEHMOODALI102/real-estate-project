import React, { useState } from 'react';
import axios from 'axios';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Building, MapPin, IndianRupee, Bed, Bath, Square, Upload, Home } from 'lucide-react';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const formSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters" }),
  description: z.string().min(20, { message: "Description must be at least 20 characters" }),
  location: z.string().min(5, { message: "Location must be at least 5 characters" }),
  price: z.string().min(1, { message: "Price is required" }),
  bedrooms: z.string().min(1, { message: "Number of bedrooms is required" }),
  bathrooms: z.string().min(1, { message: "Number of bathrooms is required" }),
  sqft: z.string().min(1, { message: "Square footage is required" }),
  propertyType: z.string().min(1, { message: "Property type is required" }),
  transactionType: z.string().min(1, { message: "Transaction type is required" }),
});

const AgentDashboard: React.FC = () => {
  const [mainImagePreview, setMainImagePreview] = useState<string | null>(null);
  const [interiorImagePreviews, setInteriorImagePreviews] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      price: "",
      bedrooms: "",
      bathrooms: "",
      sqft: "",
      propertyType: "",
      transactionType: "",
    },
  });

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setMainImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInteriorImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newPreviews: string[] = [];
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          newPreviews.push(reader.result as string);
          if (newPreviews.length === files.length) {
            setInteriorImagePreviews([...interiorImagePreviews, ...newPreviews]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeInteriorImage = (index: number) => {
    const updatedPreviews = [...interiorImagePreviews];
    updatedPreviews.splice(index, 1);
    setInteriorImagePreviews(updatedPreviews);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Check if images are uploaded
      if (!mainImagePreview) {
        toast({
          title: "Main image required",
          description: "Please upload a main image for the property",
          variant: "destructive",
        });
        return;
      }
      if (interiorImagePreviews.length === 0) {
        toast({
          title: "Interior images required",
          description: "Please upload at least one interior image",
          variant: "destructive",
        });
        return;
      }

      // Build FormData
      const payload = new FormData();
      payload.append("title", values.title);
      payload.append("description", values.description);
      payload.append("location", values.location);
      payload.append("price", values.price);
      payload.append("bedrooms", values.bedrooms);
      payload.append("bathrooms", values.bathrooms);
      payload.append("sqft", values.sqft);
      payload.append("propertyType", values.propertyType);
      payload.append("transactionType", values.transactionType);

      // Convert data URL back to file blobs
      const toBlob = async (dataUrl: string) => {
        const res = await fetch(dataUrl);
        return await res.blob();
      };

      // Main image
      const mainBlob = await toBlob(mainImagePreview);
      payload.append("mainImage", mainBlob, "main.jpg");

      // Interior images
      for (let i = 0; i < interiorImagePreviews.length; i++) {
        const blob = await toBlob(interiorImagePreviews[i]);
        payload.append("interiorImages", blob, `interior-${i}.jpg`);
      }

      // POST to backend
      await axios.post("http://localhost:5000/api/properties/add", payload, {
        headers: { "Content-Type": "multipart/form-data" }, // Correct Content-Type for FormData
      });

      toast({
        title: "Property listed successfully",
        description: "Your property has been added to our listings.",
      });

      // Reset
      form.reset();
      setMainImagePreview(null);
      setInteriorImagePreviews([]);
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "An error occurred while listing the property. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-10">
              <div className="w-16 h-16 rounded-full bg-luxury-gold/10 flex items-center justify-center">
                <Building className="h-8 w-8 text-luxury-gold" />
              </div>
              <div className="ml-4">
                <h1 className="text-3xl font-bold">Agent Dashboard</h1>
                <p className="text-gray-600">List a new property for potential buyers or renters</p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField control={form.control} name="title" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Property Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Luxury Villa in South Delhi" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="location" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input placeholder="Greater Kailash, Delhi" className="pl-10" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="price" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <IndianRupee className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input placeholder="4,50,00,000" className="pl-10" {...field} />
                          </div>
                        </FormControl>
                        <FormDescription>For rent, enter monthly amount</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="transactionType" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Transaction Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select transaction type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Buy">Buy</SelectItem>
                            <SelectItem value="Rent">Rent</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="propertyType" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Property Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select property type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Apartment">Apartment</SelectItem>
                            <SelectItem value="Villa">Villa</SelectItem>
                            <SelectItem value="Penthouse">Penthouse</SelectItem>
                            <SelectItem value="Bungalow">Bungalow</SelectItem>
                            <SelectItem value="Farmhouse">Farmhouse</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <div className="grid grid-cols-3 gap-4">
                      <FormField control={form.control} name="bedrooms" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bedrooms</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Bed className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input type="number" min="0" className="pl-10" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="bathrooms" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bathrooms</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Bath className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input type="number" min="0" step="0.5" className="pl-10" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="sqft" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sq. ft.</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Square className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input type="number" min="0" className="pl-10" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>
                    <FormField control={form.control} name="description" render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <textarea
                            className="w-full h-32 p-3 border rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            placeholder="Describe the property in detail..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Property Images</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <p className="text-sm font-medium mb-2">Main Image</p>
                          <div className="border-2 border-dashed rounded-md p-4 text-center">
                            {mainImagePreview ? (
                              <div className="relative">
                                <img
                                  src={mainImagePreview}
                                  alt="Property main"
                                  className="mx-auto h-48 object-cover rounded-md"
                                />
                                <button
                                  type="button"
                                  className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700"
                                  onClick={() => setMainImagePreview(null)}
                                >
                                  &times;
                                </button>
                              </div>
                            ) : (
                              <label className="cursor-pointer block p-4">
                                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                <p className="mt-2 text-sm text-gray-600">Click to upload main property image</p>
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={handleMainImageChange}
                                />
                              </label>
                            )}
                          </div>
                        </div>

                        <div>
                          <p className="text-sm font-medium mb-2">Interior Images (up to 5)</p>
                          <div className="border-2 border-dashed rounded-md p-4">
                            {interiorImagePreviews.length > 0 ? (
                              <div className="grid grid-cols-2 gap-2">
                                {interiorImagePreviews.map((preview, index) => (
                                  <div key={index} className="relative">
                                    <img
                                      src={preview}
                                      alt={`Interior ${index + 1}`}
                                      className="h-20 w-full object-cover rounded-md"
                                    />
                                    <button
                                      type="button"
                                      className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full hover:bg-red-700 text-xs"
                                      onClick={() => removeInteriorImage(index)}
                                    >
                                      &times;
                                    </button>
                                  </div>
                                ))}
                                {interiorImagePreviews.length < 5 && (
                                  <label className="border-2 border-dashed rounded-md flex items-center justify-center h-20 cursor-pointer">
                                    <Upload className="h-6 w-6 text-gray-400" />
                                    <input
                                      type="file"
                                      accept="image/*"
                                      multiple
                                      className="hidden"
                                      onChange={handleInteriorImagesChange}
                                    />
                                  </label>
                                )}
                              </div>
                            ) : (
                              <label className="cursor-pointer block p-4 text-center">
                                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                <p className="mt-2 text-sm text-gray-600">Click to upload interior images</p>
                                <input
                                  type="file"
                                  accept="image/*"
                                  multiple
                                  className="hidden"
                                  onChange={handleInteriorImagesChange}
                                />
                              </label>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end space-x-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        form.reset();
                        setMainImagePreview(null);
                        setInteriorImagePreviews([]);
                      }}
                    >
                      Reset
                    </Button>
                    <Button type="submit" className="bg-luxury-gold hover:bg-luxury-lightGold text-luxury-black">
                      List Property
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AgentDashboard;