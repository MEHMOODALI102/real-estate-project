import React, { useState } from 'react';
import axios from 'axios'; // Import axios
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react'; // Added Loader2
import { useToast } from '@/components/ui/use-toast'; // Ensure path is correct

const Contact: React.FC = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false); // State for loading indicator

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Updated handleSubmit function
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    setIsSubmitting(true); // Start loading indicator

    try {
      console.log('Submitting contact form:', formData);

      // Send POST request to the backend endpoint
      const response = await axios.post('http://localhost:5000/api/contact', formData);

      console.log('Contact form response:', response.data);

      // Show success toast from backend message or default
      toast({
        title: "Message Sent Successfully",
        description: response.data.message || "Thank you! We'll be in touch soon.",
        duration: 5000,
      });

      // Reset form fields after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
      });

    } catch (error) {
      console.error('Contact form submission error:', error);
      let errorMessage = "Failed to send message. Please try again later.";
      // Extract specific error message from backend response if available
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        errorMessage = error.response.data.message;
         if (error.response.data.errors) { // Handle validation errors array
             errorMessage += `: ${error.response.data.errors.join(', ')}`;
        }
      }
      // Show error toast
      toast({
        title: "Submission Failed",
        description: errorMessage,
        variant: "destructive", // Use destructive variant for errors
        duration: 7000,
      });
    } finally {
      setIsSubmitting(false); // Stop loading indicator regardless of success/error
    }
  };

  // --- JSX for the Contact section (no major changes needed) ---
  return (
    <section id="contact" className="py-20 md:py-28 bg-luxury-black text-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-start"> {/* Use items-start */}
          {/* Left Column: Info */}
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              <span className="text-white">Get in</span>
              <span className="gold-gradient block mt-1">Touch</span>
            </h2>
            <p className="text-white/80 mb-10 leading-relaxed">
              Interested in experiencing the epitome of luxury living? Contact us today to
              schedule a private tour or to learn more about our exclusive residences.
            </p>

            <div className="space-y-6">
              {/* Contact Details */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-luxury-gold/20 flex items-center justify-center flex-shrink-0">
                  <Phone className="text-luxury-gold" size={18} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Call Us</h3>
                  {/* Use actual contact details */}
                  <a href="tel:+911234567890" className="text-white/80 hover:text-luxury-gold transition-colors">+91 12345 67890</a>
                  <p className="text-white/60 text-sm">Mon-Fri: 9:00 AM - 6:00 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-luxury-gold/20 flex items-center justify-center flex-shrink-0">
                  <Mail className="text-luxury-gold" size={18} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Email</h3>
                   {/* Use actual contact details */}
                  <a href="mailto:info@estate.com" className="text-white/80 hover:text-luxury-gold transition-colors block">info@estate.com</a>
                  <a href="mailto:sales@estate.com" className="text-white/80 hover:text-luxury-gold transition-colors block">sales@estate.com</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-luxury-gold/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-luxury-gold" size={18} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Visit Us</h3>
                   {/* Use actual address */}
                  <p className="text-white/80">123 Real Estate Ave, Suite 100</p>
                  <p className="text-white/80">New Delhi, Delhi 110001, India</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div>
            {/* Use glassmorphism effect if desired (ensure CSS is defined) */}
            <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-md p-8 rounded-lg shadow-lg border border-white/10">
              <h3 className="text-2xl font-bold mb-6 gold-gradient">Send a Message</h3>

              <div className="space-y-5">
                {/* Form Fields */}
                <div>
                  <label htmlFor="name" className="text-sm text-white/80 block mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-sm placeholder-white/40 text-white focus:outline-none focus:border-luxury-gold transition-colors"
                    placeholder="John Doe"
                    disabled={isSubmitting} // Disable during submission
                  />
                </div>

                <div>
                  <label htmlFor="email" className="text-sm text-white/80 block mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-sm placeholder-white/40 text-white focus:outline-none focus:border-luxury-gold transition-colors"
                    placeholder="john@example.com"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="text-sm text-white/80 block mb-2">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel" // Use tel type for phone numbers
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-sm placeholder-white/40 text-white focus:outline-none focus:border-luxury-gold transition-colors"
                    placeholder="+91 12345 67890"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="text-sm text-white/80 block mb-2">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-sm placeholder-white/40 text-white focus:outline-none focus:border-luxury-gold resize-none transition-colors"
                    placeholder="I'm interested in learning more about..."
                    disabled={isSubmitting}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-luxury-gold text-luxury-black font-semibold rounded-sm hover:bg-luxury-lightGold flex items-center justify-center gap-2 transition-colors duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                  disabled={isSubmitting} // Disable button while submitting
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" /> Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} /> Send Message
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

