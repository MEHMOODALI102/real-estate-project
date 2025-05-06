// frontend/src/pages/AgentSignUp.tsx (or wherever it is)
import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios
import { Building, User, Key, Phone, MapPin } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import Navbar from '@/components/Navbar'; // Adjust path if needed
import Footer from '@/components/Footer'; // Adjust path if needed

// Zod schema for validation (no changes needed here)
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }), // Basic length check
  location: z.string().min(1, { message: "Location is required" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string().min(6, { message: "Confirm password is required" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

const AgentSignUp: React.FC = () => {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      location: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Updated onSubmit to call the correct backend endpoint
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Destructure needed values (excluding confirmPassword)
    const { name, email, password, phone, location } = values;

    try {
      console.log("Submitting agent registration:", { name, email, phone, location, password: '***' });

      // Send POST request to the *agent* registration endpoint
      const response = await axios.post('http://localhost:5000/api/auth/agent/register', {
        name,
        email,
        password,
        phone,
        location
      });

      console.log('Agent Registration Response:', response.data);

      // Handle success
      toast({
        title: "Registration successful",
        description: response.data.message || "Your agent account has been created.",
      });

      // Redirect to the agent login page after successful registration
      navigate('/agent-signin');

    } catch (error) {
      console.error("Agent Registration failed:", error);
      let errorMessage = "An error occurred during registration. Please try again.";
      // Extract specific error message from backend response if available
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        errorMessage = error.response.data.message;
        // Handle validation errors array if backend sends it
        if (error.response.data.errors) {
             errorMessage += `: ${error.response.data.errors.join(', ')}`;
        }
      }
      toast({
        title: "Registration failed",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  // --- JSX for the form (no changes needed here) ---
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-10">
              {/* Header */}
               <div className="flex justify-center items-center mb-4">
                 <div className="w-16 h-16 rounded-full bg-luxury-gold/10 flex items-center justify-center">
                   <Building className="h-8 w-8 text-luxury-gold" />
                 </div>
               </div>
               <h1 className="text-3xl font-bold mb-2">Agent Registration</h1>
               <p className="text-gray-600">Create an account to list properties and connect with clients</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  {/* Name Field */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input placeholder="John Smith" className="pl-10" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Email Field */}
                   <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                           {/* Added email type */}
                           <Input type="email" placeholder="agent@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Phone Field */}
                   <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            {/* Added tel type */}
                            <Input type="tel" placeholder="+91 98765 43210" className="pl-10" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Location Field */}
                   <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Primary Location</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input placeholder="e.g., South Delhi" className="pl-10" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Password Field */}
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Key className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input type="password" placeholder="••••••••" className="pl-10" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Confirm Password Field */}
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••••" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full bg-luxury-gold hover:bg-luxury-lightGold text-luxury-black mt-4"
                    disabled={form.formState.isSubmitting} // Disable button while submitting
                  >
                     {form.formState.isSubmitting ? 'Creating Account...' : 'Create Account'}
                  </Button>
                </form>
              </Form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Already have an agent account?{" "}
                  <a
                    href="/agent-signin" // Use React Router Link component if using it for navigation
                    className="text-luxury-gold hover:underline font-medium"
                  >
                    Sign in
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AgentSignUp;
