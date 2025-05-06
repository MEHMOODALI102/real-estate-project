// frontend/src/pages/AgentSignIn.tsx (or wherever it is)
import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios
import { Building, User, Key } from 'lucide-react'; // Use Mail icon for email?
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import Navbar from '@/components/Navbar'; // Adjust path if needed
import Footer from '@/components/Footer'; // Adjust path if needed

// Zod schema for validation (no changes needed here)
const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(1, { message: "Password is required" }), // Min 1, backend checks length/complexity
});

const AgentSignIn: React.FC = () => {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Updated onSubmit to call the correct backend endpoint
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { email, password } = values;

    try {
      console.log("Attempting agent login for:", email);

      // Send POST request to the *agent* login endpoint
      const response = await axios.post('http://localhost:5000/api/auth/agent/login', {
        email,
        password
      });

      console.log('Agent Login Response:', response.data);

      // Handle successful login
      if (response.data.token) {
        // Store the token (e.g., in localStorage) for future authenticated requests
        // Use a specific key for agent token if you also have user tokens
        localStorage.setItem('agentAuthToken', response.data.token);

        toast({
          title: "Login successful",
          description: response.data.message || "Welcome back!",
        });

        // Redirect to the agent dashboard
        // Consider passing agent details via state if needed immediately on dashboard
        navigate('/agent-dashboard');
      } else {
        // This case should ideally not be reached if backend sends token on success
        throw new Error("Login successful but no token received.");
      }

    } catch (error) {
      console.error("Agent Login failed:", error);
      let errorMessage = "Please check your credentials and try again.";
      // Extract specific error message from backend response if available
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      toast({
        title: "Login failed",
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
               <h1 className="text-3xl font-bold mb-2">Agent Sign In</h1>
               <p className="text-gray-600">Welcome back, sign in to access your account</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Email Field */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <div className="relative">
                            {/* Consider Mail icon instead of User */}
                            <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input type="email" placeholder="agent@example.com" className="pl-10" {...field} />
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

                  <Button
                    type="submit"
                    className="w-full bg-luxury-gold hover:bg-luxury-lightGold text-luxury-black"
                    disabled={form.formState.isSubmitting} // Disable button while submitting
                  >
                    {form.formState.isSubmitting ? 'Signing In...' : 'Sign In'}
                  </Button>
                </form>
              </Form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Don't have an agent account yet?{" "}
                  <a
                    href="/agent-signup" // Use React Router Link component if using it for navigation
                    className="text-luxury-gold hover:underline font-medium"
                  >
                    Register here
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

export default AgentSignIn;
