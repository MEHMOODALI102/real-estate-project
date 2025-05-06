import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Mail, Lock, User, Phone } from 'lucide-react';
import axios from 'axios'; // 📢 Axios import (already present)

const SignUp: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!fullName || !email || !phone || !password || !confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }
    
    if (!agreeTerms) {
      toast({
        title: "Error",
        description: "Please agree to the terms and conditions",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const userData = {
        username: fullName, // 📢 Map fullName to username for backend
        email,
        phone,
        password,
      };

      // 📢 Updated to correct backend port
      await axios.post('http://localhost:5000/api/auth/register', userData);

      toast({
        title: "Success",
        description: "Your account has been created successfully",
      });
      
      // Clear form fields after successful registration
      setFullName('');
      setEmail('');
      setPhone('');
      setPassword('');
      setConfirmPassword('');
      setAgreeTerms(false);

      setTimeout(() => navigate('/signin'), 1500);
    } catch (error: any) {
      toast({
        title: "Registration Failed",
        description: error.response?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-luxury-black flex flex-col">
      {/* Header with logo */}
      <header className="w-full py-6">
        <div className="container mx-auto">
          <Link to="/" className="flex items-center">
            <h1 className="text-3xl font-bold gold-gradient">Estate</h1>
          </Link>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-luxury-dark p-8 rounded-lg border border-luxury-gold/20 backdrop-blur-sm">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold gold-gradient mb-2">Create Account</h2>
              <p className="text-luxury-beige/70">Join Estate for exclusive property access</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1">
                <label htmlFor="fullName" className="text-sm text-luxury-beige/90 font-medium">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-luxury-gold/70" />
                  </div>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="pl-10 bg-luxury-black border-luxury-gold/30 text-luxury-beige focus-visible:ring-luxury-gold/50 placeholder:text-luxury-beige/50"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="email" className="text-sm text-luxury-beige/90 font-medium">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-luxury-gold/70" />
                  </div>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-luxury-black border-luxury-gold/30 text-luxury-beige focus-visible:ring-luxury-gold/50 placeholder:text-luxury-beige/50"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="phone" className="text-sm text-luxury-beige/90 font-medium">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-luxury-gold/70" />
                  </div>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="pl-10 bg-luxury-black border-luxury-gold/30 text-luxury-beige focus-visible:ring-luxury-gold/50 placeholder:text-luxury-beige/50"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="password" className="text-sm text-luxury-beige/90 font-medium">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-luxury-gold/70" />
                  </div>
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 bg-luxury-black border-luxury-gold/30 text-luxury-beige focus-visible:ring-luxury-gold/50 placeholder:text-luxury-beige/50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-luxury-gold/70" />
                    ) : (
                      <Eye className="h-5 w-5 text-luxury-gold/70" />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="confirmPassword" className="text-sm text-luxury-beige/90 font-medium">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-luxury-gold/70" />
                  </div>
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10 pr-10 bg-luxury-black border-luxury-gold/30 text-luxury-beige focus-visible:ring-luxury-gold/50 placeholder:text-luxury-beige/50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-luxury-gold/70" />
                    ) : (
                      <Eye className="h-5 w-5 text-luxury-gold/70" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={agreeTerms}
                  onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                  className="data-[state=checked]:bg-luxury-gold data-[state=checked]:border-luxury-gold"
                />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium text-luxury-beige/80 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I agree to the{' '}
                  <a href="#" className="text-luxury-gold hover:text-luxury-lightGold">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-luxury-gold hover:text-luxury-lightGold">
                    Privacy Policy
                  </a>
                </label>
              </div>

              <Button
                type="submit"
                className="w-full bg-luxury-gold hover:bg-luxury-lightGold text-luxury-black font-medium mt-4"
              >
                Create Account
              </Button>

              <div className="text-center mt-6">
                <p className="text-luxury-beige/70 text-sm">
                  Already have an account?{' '}
                  <Link to="/signin" className="text-luxury-gold hover:text-luxury-lightGold">
                    Sign In
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-6">
        <div className="container mx-auto text-center">
          <p className="text-luxury-beige/50 text-sm">
            © 2025 Estate. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default SignUp;