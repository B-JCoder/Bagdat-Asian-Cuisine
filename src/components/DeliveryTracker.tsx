import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Clock, Truck, MapPin } from "lucide-react";

interface DeliveryStatus {
  id: number;
  status: string;
  description: string;
  completed: boolean;
  icon: React.ReactNode;
  timestamp?: string;
}

const DeliveryTracker = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isTracking, setIsTracking] = useState(false);
  const [progress, setProgress] = useState(0);

  const deliverySteps: DeliveryStatus[] = [
    {
      id: 1,
      status: "Order Placed",
      description: "Your order has been confirmed",
      completed: false,
      icon: <CheckCircle className="w-5 h-5" />,
      timestamp: "2:30 PM"
    },
    {
      id: 2,
      status: "Preparing",
      description: "Our chefs are preparing your food",
      completed: false,
      icon: <Clock className="w-5 h-5" />,
      timestamp: "2:35 PM"
    },
    {
      id: 3,
      status: "Out for Delivery",
      description: "Your order is on the way",
      completed: false,
      icon: <Truck className="w-5 h-5" />,
      timestamp: "3:05 PM"
    },
    {
      id: 4,
      status: "Delivered",
      description: "Your order has been delivered",
      completed: false,
      icon: <MapPin className="w-5 h-5" />,
      timestamp: "3:25 PM"
    }
  ];

  const [steps, setSteps] = useState(deliverySteps);

  const startTracking = () => {
    setIsTracking(true);
    setCurrentStep(0);
    setProgress(0);
    
    // Reset all steps
    setSteps(deliverySteps.map(step => ({ ...step, completed: false })));
    
    // Simulate delivery progress
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        const nextStep = prev + 1;
        
        // Update progress
        const progressValue = ((nextStep) / deliverySteps.length) * 100;
        setProgress(progressValue);
        
        // Mark current step as completed
        setSteps(prevSteps => 
          prevSteps.map((step, index) => ({
            ...step,
            completed: index < nextStep
          }))
        );
        
        // Stop when all steps are completed
        if (nextStep >= deliverySteps.length) {
          clearInterval(interval);
          setTimeout(() => setIsTracking(false), 2000);
          return prev;
        }
        
        return nextStep;
      });
    }, 3000); // 3 seconds between each step

    return () => clearInterval(interval);
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
          <Truck className="text-primary" />
          Delivery Tracker
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progress Bar */}
        <div>
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Order Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Delivery Steps */}
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center space-x-4">
              <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-smooth ${
                step.completed 
                  ? 'bg-primary text-primary-foreground' 
                  : index === currentStep && isTracking
                  ? 'bg-primary/20 text-primary animate-pulse'
                  : 'bg-muted text-muted-foreground'
              }`}>
                {step.icon}
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h4 className={`font-semibold ${
                    step.completed ? 'text-primary' : 'text-foreground'
                  }`}>
                    {step.status}
                  </h4>
                  {step.timestamp && step.completed && (
                    <span className="text-sm text-muted-foreground">
                      {step.timestamp}
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="pt-4">
          {!isTracking ? (
            <Button 
              onClick={startTracking}
              variant="menu" 
              className="w-full"
            >
              Start Demo Tracking
            </Button>
          ) : (
            <div className="text-center">
              <div className="inline-flex items-center gap-2 text-primary">
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm font-medium">Tracking in progress...</span>
              </div>
            </div>
          )}
        </div>

        {/* Demo Notice */}
        <div className="bg-muted/50 p-4 rounded-lg">
          <p className="text-xs text-muted-foreground text-center">
            This is a demo delivery tracker. In a real application, 
            this would connect to live tracking systems.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DeliveryTracker;