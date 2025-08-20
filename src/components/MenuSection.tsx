import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useToast } from "@/hooks/use-toast";
import springRolls from "@/assets/spring-rolls.jpg";
import chickenSatay from "@/assets/chicken-satay.jpg";
import summerRolls from "@/assets/summer-rolls.jpg";
import beefNoodleSoup from "@/assets/beef-noodle-soup.jpg";
import vegetableStirFry from "@/assets/vegetable-stir-fry.jpg";
import teriyakiSalmon from "@/assets/teriyaki-salmon.jpg";
import mangoStickyRice from "@/assets/mango-sticky-rice.jpg";
import greenTeaIceCream from "@/assets/green-tea-ice-cream.jpg";
import redBeanPancakes from "@/assets/red-bean-pancakes.jpg";

const MenuSection = () => {
  const [activeCategory, setActiveCategory] = useState("starters");
  const { addItem } = useCart();
  const { toast } = useToast();
  const { elementRef, isVisible } = useScrollAnimation();

  const menuData = {
    starters: [
      {
        id: "starter-1",
        name: "Spring Rolls",
        price: 8.99,
        image: springRolls,
        description: "Crispy golden rolls with fresh vegetables and sweet & sour sauce"
      },
      {
        id: "starter-2",
        name: "Chicken Satay",
        price: 12.99,
        image: chickenSatay,
        description: "Grilled chicken skewers with aromatic peanut sauce"
      },
      {
        id: "starter-3",
        name: "Summer Rolls",
        price: 9.99,
        image: summerRolls,
        description: "Fresh rolls with shrimp, vegetables, and hoisin dipping sauce"
      }
    ],
    mains: [
      {
        id: "main-1",
        name: "Beef Noodle Soup",
        price: 16.99,
        image: beefNoodleSoup,
        description: "Traditional soup with tender beef, fresh noodles, and herbs"
      },
      {
        id: "main-2",
        name: "Vegetable Stir-Fry",
        price: 14.99,
        image: vegetableStirFry,
        description: "Colorful vegetables and tofu in savory garlic sauce"
      },
      {
        id: "main-3",
        name: "Teriyaki Salmon",
        price: 22.99,
        image: teriyakiSalmon,
        description: "Grilled salmon with teriyaki glaze, rice, and vegetables"
      }
    ],
    desserts: [
      {
        id: "dessert-1",
        name: "Mango Sticky Rice",
        price: 7.99,
        image: mangoStickyRice,
        description: "Traditional Thai dessert with sweet coconut rice"
      },
      {
        id: "dessert-2",
        name: "Green Tea Ice Cream",
        price: 6.99,
        image: greenTeaIceCream,
        description: "Creamy ice cream with authentic matcha flavor"
      },
      {
        id: "dessert-3",
        name: "Red Bean Pancakes",
        price: 8.99,
        image: redBeanPancakes,
        description: "Soft pancakes filled with sweet red bean paste"
      }
    ],
    drinks: [
      {
        id: "drink-1",
        name: "Thai Iced Tea",
        price: 4.99,
        image: springRolls, // Using placeholder
        description: "Traditional Thai tea with condensed milk"
      },
      {
        id: "drink-2",
        name: "Fresh Coconut Water",
        price: 5.99,
        image: summerRolls, // Using placeholder
        description: "Pure coconut water served in coconut shell"
      },
      {
        id: "drink-3",
        name: "Green Tea",
        price: 3.99,
        image: greenTeaIceCream, // Using placeholder
        description: "Premium jasmine green tea"
      }
    ]
  };

  const categories = [
    { id: "starters", name: "Starters", icon: "🥢" },
    { id: "mains", name: "Main Dishes", icon: "🍜" },
    { id: "desserts", name: "Desserts", icon: "🍮" },
    { id: "drinks", name: "Drinks", icon: "🧋" }
  ];

  const handleAddToCart = (item: any) => {
    addItem(item);
    toast({
      title: "Added to Cart!",
      description: `${item.name} has been added to your cart.`,
    });
  };

  return (
    <section id="menu" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div 
          ref={elementRef}
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Menu
          </h2>
          <div className="w-24 h-1 bg-primary rounded mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our carefully crafted dishes, each prepared with authentic 
            ingredients and traditional cooking methods passed down through generations.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              onClick={() => setActiveCategory(category.id)}
              className="px-6 py-3"
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </Button>
          ))}
        </div>

        {/* Menu Items */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-500 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}>
          {menuData[activeCategory as keyof typeof menuData].map((item, index) => (
            <Card key={item.id} className="group hover:shadow-card transition-smooth overflow-hidden animate-fade-in" style={{animationDelay: `${index * 100}ms`}}>
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-spring"
                />
                <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground font-semibold">
                  ${item.price}
                </Badge>
              </div>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-xl font-bold text-foreground">
                    {item.name}
                  </h4>
                </div>
                <p className="text-muted-foreground mb-4">
                  {item.description}
                </p>
                <Button 
                  onClick={() => handleAddToCart(item)}
                  className="w-full"
                  size="sm"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuSection;