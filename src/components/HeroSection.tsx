import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-asian-food.jpg";

const HeroSection = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 80;
      const elementPosition = element.offsetTop - navHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Delicious Asian cuisine"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto animate-fade-in">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Bagdat Asian Cuisine
        </h1>
        <p className="text-xl md:text-2xl mb-8 font-light max-w-2xl mx-auto">
          Authentic Asian Flavors in Winnipeg
        </p>
        <p className="text-lg md:text-xl mb-12 opacity-90 max-w-2xl mx-auto">
          Experience the perfect blend of traditional recipes and modern culinary artistry, 
          bringing you the finest Asian dishes in the heart of Manitoba.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            variant="hero" 
            size="lg" 
            onClick={() => scrollToSection("order")}
            className="px-8 py-4 text-lg"
          >
            Order Now
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            onClick={() => scrollToSection("menu")}
            className="px-8 py-4 text-lg bg-white/10 border-white/30 text-white hover:bg-white hover:text-primary"
          >
            View Menu
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;