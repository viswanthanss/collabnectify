import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Bell, Menu, X, User, Briefcase, Home, LogOut, MessageSquare, Users, Calendar, Building2, BookOpen, Coffee, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import AuthModal from '@/components/auth/AuthModal';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import NotificationDropdown from '@/components/notifications/NotificationDropdown';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [activeAuthTab, setActiveAuthTab] = useState<'login' | 'signup'>('login');
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Profile', path: '/profile', icon: User },
    { name: 'Projects', path: '/projects', icon: Briefcase },
    { name: 'Events', path: '/events', icon: Calendar },
    { name: 'Jobs', path: '/jobs', icon: Building2 },
    { name: 'Feed', path: '/feed', icon: BookOpen },
    { name: 'Messaging', path: '/messaging', icon: MessageSquare },
    { name: 'Community', path: '/community', icon: Coffee },
    { name: 'Settings', path: '/settings', icon: Settings }
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const openLoginModal = () => {
    setActiveAuthTab('login');
    setIsAuthModalOpen(true);
  };

  const openSignupModal = () => {
    setActiveAuthTab('signup');
    setIsAuthModalOpen(true);
  };

  const handleLogout = () => {
    setIsUserLoggedIn(false);
    console.log('User logged out');
  };

  const toggleLoginState = () => {
    setIsUserLoggedIn(!isUserLoggedIn);
  };

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-white/80 dark:bg-black/80 backdrop-blur-lg shadow-sm'
            : 'bg-background shadow-sm'
        )}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link to="/" className="flex items-center space-x-2">
              <span className="font-bold text-xl md:text-2xl text-gradient">ConnectAI</span>
            </Link>

            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={cn(
                    'p-2 rounded-full text-sm font-medium transition-colors flex flex-col items-center',
                    location.pathname === item.path
                      ? 'bg-primary/10 text-primary'
                      : 'text-foreground/80 hover:text-foreground hover:bg-muted'
                  )}
                  title={item.name}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="text-xs mt-1">{item.name}</span>
                </Link>
              ))}
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" size="icon" aria-label="Search">
                <Search className="h-5 w-5" />
              </Button>

              <DropdownMenu open={isNotificationOpen} onOpenChange={setIsNotificationOpen}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="Notifications" className="relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-destructive" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <NotificationDropdown />
                </DropdownMenuContent>
              </DropdownMenu>

              {isUserLoggedIn ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 p-0 overflow-hidden border border-primary/20">
                      <img 
                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60" 
                        alt="User avatar" 
                        className="h-full w-full object-cover"
                      />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/projects">My Projects</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/settings">Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button className="rounded-full glass-button" onClick={openLoginModal}>
                  Sign In
                </Button>
              )}

              <Button variant="outline" size="sm" onClick={toggleLoginState} className="text-xs">
                {isUserLoggedIn ? 'Demo: Set Logged Out' : 'Demo: Set Logged In'}
              </Button>
            </div>

            <div className="flex items-center space-x-4 md:hidden">
              {isUserLoggedIn && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 p-0 overflow-hidden border border-primary/20">
                      <img 
                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60" 
                        alt="User avatar" 
                        className="h-full w-full object-cover"
                      />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
              
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMobileMenu}
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="fixed inset-0 top-16 z-40 bg-background shadow-lg animate-fade-in md:hidden">
            <div className="container mx-auto px-4 py-8">
              <nav className="flex flex-col space-y-4">
                {navItems.map((item, index) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={cn(
                      'flex items-center space-x-3 p-3 rounded-lg animate-slide-up text-lg',
                      location.pathname === item.path
                        ? 'bg-primary/10 text-primary'
                        : 'text-foreground hover:text-foreground hover:bg-muted',
                      `animate-delay-${(index + 1) * 100}`
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                ))}
              </nav>
              <div className="mt-8 space-y-4 animate-slide-up animate-delay-500">
                <Button className="w-full" variant="outline">
                  <Search className="h-5 w-5 mr-2" />
                  <span>Search</span>
                </Button>
                {isUserLoggedIn ? (
                  <Button className="w-full" onClick={handleLogout}>
                    <LogOut className="h-5 w-5 mr-2" />
                    Sign Out
                  </Button>
                ) : (
                  <div className="space-y-2">
                    <Button className="w-full glass-button" onClick={openLoginModal}>
                      Sign In
                    </Button>
                    <Button variant="outline" size="sm" onClick={toggleLoginState} className="text-xs w-full">
                      {isUserLoggedIn ? 'Demo: Set Logged Out' : 'Demo: Set Logged In'}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        defaultTab={activeAuthTab}
      />
    </>
  );
};

export default Navbar;
