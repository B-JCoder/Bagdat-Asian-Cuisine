import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const CartSection = () => {
  const { state, updateQuantity, removeItem } = useCart();
  const { elementRef, isVisible } = useScrollAnimation();

  const scrollToOrder = () => {
    const element = document.getElementById("order");
    if (element) {
      const navHeight = 80;
      const elementPosition = element.offsetTop - navHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth"
      });
    }
  };

  if (state.items.length === 0) {
    return (
      <section id="cart" className="py-20 bg-gradient-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            ref={elementRef}
            className={`text-center transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Your Cart
            </h2>
            <div className="w-24 h-1 bg-primary rounded mx-auto mb-12"></div>
            
            <Card className="max-w-md mx-auto shadow-card">
              <CardContent className="p-12 text-center">
                <ShoppingCart className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">Your cart is empty</h3>
                <p className="text-muted-foreground mb-6">
                  Add some delicious items from our menu to get started!
                </p>
                <Button 
                  onClick={() => {
                    const element = document.getElementById("menu");
                    if (element) {
                      const navHeight = 80;
                      const elementPosition = element.offsetTop - navHeight;
                      window.scrollTo({
                        top: elementPosition,
                        behavior: "smooth"
                      });
                    }
                  }}
                  variant="default"
                >
                  Browse Menu
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="cart" className="py-20 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div 
          ref={elementRef}
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Your Cart
          </h2>
          <div className="w-24 h-1 bg-primary rounded mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground">
            Review your order and proceed to checkout when ready.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {state.items.map((item) => (
              <Card key={item.id} className="shadow-card hover:shadow-glow transition-smooth">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                      <p className="text-lg font-bold text-primary">${item.price.toFixed(2)}</p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      
                      <span className="w-12 text-center font-semibold">
                        {item.quantity}
                      </span>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>

                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="shadow-card sticky top-24">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-foreground">
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-foreground">
                  <span>Subtotal</span>
                  <span>${state.total.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-foreground">
                  <span>Tax (12%)</span>
                  <span>${state.tax.toFixed(2)}</span>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold text-foreground">
                    <span>Total</span>
                    <span>${state.grandTotal.toFixed(2)}</span>
                  </div>
                </div>

                <Button 
                  onClick={scrollToOrder}
                  size="lg" 
                  className="w-full mt-6"
                >
                  Proceed to Checkout
                </Button>

                <div className="text-center text-sm text-muted-foreground mt-4">
                  <p>Free delivery on orders over $30</p>
                  <p>Estimated delivery: 30-45 minutes</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartSection;