
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { HomeIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background/50 to-background p-4">
      <div className="glass-card max-w-md w-full p-8 text-center space-y-6 animate-fade-in">
        <div className="relative">
          <div className="absolute -top-16 left-1/2 -translate-x-1/2">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center animate-pulse-soft">
              <span className="text-4xl">🔍</span>
            </div>
          </div>
        </div>
        
        <div className="mt-8 space-y-4">
          <h1 className="text-4xl font-bold text-gradient">404</h1>
          <p className="text-xl text-muted-foreground">
            Oops! This page seems to be missing
          </p>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <Button
          onClick={() => navigate('/')}
          className="rounded-full"
          size="lg"
        >
          <HomeIcon className="mr-2 h-4 w-4" />
          Return to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
