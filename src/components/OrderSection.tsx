import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction } from "@/components/ui/alert-dialog";
import { ShoppingCart, CheckCircle } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useToast } from "@/hooks/use-toast";
import DeliveryTracker from "./DeliveryTracker";

const OrderSection = () => {
  const [orderForm, setOrderForm] = useState({
    name: "",
    phone: "",
    address: "",
    paymentMethod: "",
    specialInstructions: ""
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { state, clearCart } = useCart();
  const { toast } = useToast();
  const { elementRef, isVisible } = useScrollAnimation();

  const paymentMethods = [
    "Credit Card",
    "Debit Card", 
    "Cash on Delivery",
    "E-Transfer"
  ];

  const handleInputChange = (field: string, value: string) => {
    setOrderForm(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const { name, phone, address, paymentMethod } = orderForm;
    return name.trim() && phone.trim() && address.trim() && paymentMethod;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Please fill in all required fields",
        description: "Name, phone, address, and payment method are required.",
        variant: "destructive"
      });
      return;
    }

    if (state.items.length === 0) {
      toast({
        title: "Your cart is empty",
        description: "Please add items to your cart before placing an order.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setShowConfirmation(true);
    
    // Reset form and clear cart after confirmation
    setTimeout(() => {
      setOrderForm({
        name: "",
        phone: "",
        address: "",
        paymentMethod: "",
        specialInstructions: ""
      });
      clearCart();
    }, 1000);
  };

  return (
    <section id="order" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div 
          ref={elementRef}
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Place Your Order
          </h2>
          <div className="w-24 h-1 bg-primary rounded mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Complete your order details below. We'll prepare your delicious meal 
            and deliver it fresh to your door!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Order Form */}
          <div>
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-2">
                  <ShoppingCart className="text-primary" />
                  Order Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Customer Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={orderForm.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Enter your name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={orderForm.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="(204) 123-4567"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Delivery Address *</Label>
                    <Textarea
                      id="address"
                      value={orderForm.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      placeholder="Street address, apartment/unit, city, postal code"
                      required
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="payment">Payment Method *</Label>
                    <Select value={orderForm.paymentMethod} onValueChange={(value) => handleInputChange("paymentMethod", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        {paymentMethods.map((method, index) => (
                          <SelectItem key={index} value={method}>
                            {method}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="instructions">Special Instructions</Label>
                    <Textarea
                      id="instructions"
                      value={orderForm.specialInstructions}
                      onChange={(e) => handleInputChange("specialInstructions", e.target.value)}
                      placeholder="Any special requests, dietary restrictions, or delivery notes..."
                      rows={3}
                    />
                  </div>

                  {/* Order Summary */}
                  {state.items.length > 0 && (
                    <div className="border-t pt-6">
                      <h3 className="font-semibold text-foreground mb-4">Order Summary</h3>
                      <div className="space-y-2 mb-4">
                        {state.items.map((item) => (
                          <div key={item.id} className="flex justify-between text-sm">
                            <span>{item.name} × {item.quantity}</span>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                      <div className="border-t pt-2 space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Subtotal</span>
                          <span>${state.total.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Tax</span>
                          <span>${state.tax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg">
                          <span>Total</span>
                          <span>${state.grandTotal.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <Button 
                    type="submit" 
                    className="w-full" 
                    size="lg"
                    disabled={isSubmitting || state.items.length === 0}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                        Processing Order...
                      </div>
                    ) : (
                      `Place Order - $${state.grandTotal.toFixed(2)}`
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Delivery Tracker */}
          <div>
            <DeliveryTracker />
          </div>
        </div>

        {/* Order Confirmation Dialog */}
        <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
          <AlertDialogContent className="max-w-md">
            <AlertDialogHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <AlertDialogTitle className="text-2xl font-bold">
                Order Placed Successfully!
              </AlertDialogTitle>
              <AlertDialogDescription className="text-center space-y-2">
                <p>Thank you for your order! We've received your request and our chefs are already getting started.</p>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="font-semibold">Order Total: ${state.grandTotal.toFixed(2)}</p>
                  <p className="text-sm">Estimated delivery: 30-45 minutes</p>
                </div>
                <p className="text-sm">You'll receive a confirmation call shortly at {orderForm.phone}</p>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction 
                onClick={() => setShowConfirmation(false)}
                className="w-full"
              >
                Continue Browsing
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </section>
  );
};

export default OrderSection;