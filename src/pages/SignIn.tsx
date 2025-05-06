import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (email && password) {
      try {
        // Make API call to backend for login
        const response = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          toast({
            title: "Success",
            description: "You have been signed in successfully",
          });
          // Store the token in localStorage (if you want to persist the login state)
          localStorage.setItem('token', data.token);
          // Redirect to home page after successful login
          setTimeout(() => navigate('/'), 1500);
        } else {
          toast({
            title: "Error",
            description: data.message || "Invalid credentials",
            variant: "destructive",
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Something went wrong. Please try again later.",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Error",
        description: "Please enter your email and password",
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
              <h2 className="text-3xl font-bold gold-gradient mb-2">Welcome Back</h2>
              <p className="text-luxury-beige/70">Sign in to access your Estate account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
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

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    className="data-[state=checked]:bg-luxury-gold data-[state=checked]:border-luxury-gold"
                  />
                  <label
                    htmlFor="remember"
                    className="text-sm font-medium text-luxury-beige/80 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Remember me
                  </label>
                </div>
                <a href="#" className="text-sm text-luxury-gold hover:text-luxury-lightGold">
                  Forgot password?
                </a>
              </div>

              <Button
                type="submit"
                className="w-full bg-luxury-gold hover:bg-luxury-lightGold text-luxury-black font-medium"
              >
                Sign In
              </Button>

              <div className="text-center mt-6">
                <p className="text-luxury-beige/70 text-sm">
                  Don't have an account?{' '}
                  <Link to="/signup" className="text-luxury-gold hover:text-luxury-lightGold">
                    Sign Up
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

export default SignIn;
