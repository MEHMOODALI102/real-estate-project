import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, User, Building } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-300',
        isScrolled 
          ? 'glass-dark py-3 shadow-lg' 
          : 'bg-transparent py-5'
      )}
    >
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <h1 className={cn(
            'text-2xl md:text-3xl font-bold transition-all duration-300',
            isScrolled ? 'gold-gradient' : 'text-white'
          )}>
            Estate
          </h1>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <Link
            to="/"
            className={cn(
              'text-sm uppercase tracking-wider transition-colors duration-300 hover:text-luxury-gold',
              isScrolled ? 'text-white' : 'text-white/90'
            )}
          >
            Home
          </Link>
          <Link
            to="/properties"
            className={cn(
              'text-sm uppercase tracking-wider transition-colors duration-300 hover:text-luxury-gold',
              isScrolled ? 'text-white' : 'text-white/90'
            )}
          >
            Properties
          </Link>
          {['Overview', 'Amenities', 'Floor Plans', 'Gallery', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              className={cn(
                'text-sm uppercase tracking-wider transition-colors duration-300 hover:text-luxury-gold',
                isScrolled ? 'text-white' : 'text-white/90'
              )}
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-sm transition-all duration-300 border',
                isScrolled 
                  ? 'border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-luxury-black' 
                  : 'border-white text-white hover:bg-white hover:text-luxury-black'
              )}>
                <User size={16} />
                <span>Account</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>User</DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <Link to="/user-profile">User Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/signin">Sign In</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/signup">Sign Up</Link>
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Agents</DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <Link to="/agent-profile">Agent Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/agent-signin">Agent Sign In</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/agent-signup">Agent Registration</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/agent-dashboard">Agent Dashboard</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <a 
            href="tel:+919876543210" 
            className={cn(
              'flex items-center gap-2 px-5 py-2 rounded-sm bg-luxury-gold text-luxury-black hover:bg-luxury-lightGold transition-all duration-300',
              isScrolled 
                ? 'shadow-md' 
                : ''
            )}
          >
            <Phone size={16} />
            <span>Call Us</span>
          </a>
        </div>

        <button 
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden glass-dark animate-slide-down">
          <nav className="flex flex-col py-4">
            <Link
              to="/"
              className="text-white hover:text-luxury-gold py-3 px-6 text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/properties"
              className="text-white hover:text-luxury-gold py-3 px-6 text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Properties
            </Link>
            {['Overview', 'Amenities', 'Floor Plans', 'Gallery', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="text-white hover:text-luxury-gold py-3 px-6 text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <div className="border-t border-white/20 my-2"></div>
            <Link
              to="/user-profile"
              className="text-white hover:text-luxury-gold py-3 px-6 text-center flex items-center justify-center gap-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <User size={16} />
              <span>User Profile</span>
            </Link>
            <Link
              to="/signin"
              className="text-white hover:text-luxury-gold py-3 px-6 text-center flex items-center justify-center gap-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <User size={16} />
              <span>Sign In</span>
            </Link>
            <Link
              to="/agent-profile"
              className="text-white hover:text-luxury-gold py-3 px-6 text-center flex items-center justify-center gap-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Building size={16} />
              <span>Agent Profile</span>
            </Link>
            <Link
              to="/agent-signin"
              className="text-white hover:text-luxury-gold py-3 px-6 text-center flex items-center justify-center gap-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Building size={16} />
              <span>Agent Portal</span>
            </Link>
            <a 
              href="tel:+919876543210" 
              className="mx-6 mt-4 flex items-center justify-center gap-2 px-5 py-2 rounded-sm bg-luxury-gold text-luxury-black hover:bg-luxury-lightGold transition-all duration-300"
            >
              <Phone size={16} />
              <span>Call Us</span>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;