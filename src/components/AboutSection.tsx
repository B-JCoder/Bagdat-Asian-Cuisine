import aboutImage from "@/assets/about-restaurant.jpg";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const AboutSection = () => {
  const { elementRef, isVisible } = useScrollAnimation();

  return (
    <section id="about" className="py-20 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={elementRef}
          className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Text Content */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Our Story
            </h2>
            <div className="w-24 h-1 bg-primary rounded"></div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Since opening our doors in Winnipeg, Bagdat Asian Cuisine has been 
              dedicated to bringing you the most authentic and delicious Asian 
              flavors. Our passionate chefs combine traditional cooking techniques 
              with the freshest local ingredients to create unforgettable dining 
              experiences.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              From our hand-pulled noodles to our signature stir-fries, every dish 
              tells a story of heritage, tradition, and love for exceptional cuisine. 
              We believe that great food brings people together, and we're honored 
              to be part of your culinary journey.
            </p>
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-primary">10+</h3>
                <p className="text-muted-foreground text-sm">Years Experience</p>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-primary">50+</h3>
                <p className="text-muted-foreground text-sm">Authentic Dishes</p>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-primary">1000+</h3>
                <p className="text-muted-foreground text-sm">Happy Customers</p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-card">
              <img
                src={aboutImage}
                alt="Bagdat Asian Cuisine restaurant interior"
                className="w-full h-96 object-cover transform hover:scale-105 transition-spring"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/10 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;