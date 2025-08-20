import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {
  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" }
  ];

  const quickLinks = [
    { name: "About Us", href: "about" },
    { name: "Menu", href: "menu" },
    { name: "Order Online", href: "order" },
    { name: "Contact", href: "contact" }
  ];

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href);
    if (element) {
      const navHeight = 80;
      const elementPosition = element.offsetTop - navHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth"
      });
    }
  };

  const handleSocialClick = (url: string) => {
    // In a real application, these would link to actual social media pages
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <footer className="bg-gradient-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Restaurant Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-primary">
              Bagdat Asian Cuisine
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Authentic Asian flavors in the heart of Winnipeg. Experience the 
              perfect blend of traditional recipes and modern culinary artistry.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <button
                  key={index}
                  onClick={() => handleSocialClick(social.href)}
                  className="bg-primary/20 hover:bg-primary p-3 rounded-full transition-smooth group"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5 text-primary group-hover:text-white" />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-300 hover:text-primary transition-smooth"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-gray-300">
                  123 Portage Avenue<br />Winnipeg, MB R3G 0T1
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-gray-300">(204) 555-0123</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-gray-300">info@bagdatasian.ca</span>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white">Opening Hours</h4>
            <div className="space-y-2 text-gray-300">
              <div className="flex justify-between">
                <span>Monday - Thursday</span>
                <span>11AM - 10PM</span>
              </div>
              <div className="flex justify-between">
                <span>Friday - Saturday</span>
                <span>11AM - 11PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday</span>
                <span>12PM - 9PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">
              © 2025 Bagdat Asian Cuisine. All rights reserved.
            </p>
            <p className="text-gray-400 text-xs mt-2 md:mt-0">
              Professional demo website created by The Linkage Digital
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
