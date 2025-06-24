
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';
import AdminLoginForm from '@/components/auth/AdminLoginForm';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const [authTab, setAuthTab] = useState('login');

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-600">
              Helping Circles
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors">
              How It Works
            </a>
            <a href="#packages" className="text-gray-600 hover:text-blue-600 transition-colors">
              Packages
            </a>
            <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors">
              Contact
            </a>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Dialog open={isAuthDialogOpen} onOpenChange={setIsAuthDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" onClick={() => setAuthTab('login')}>
                  Sign In
                </Button>
              </DialogTrigger>
              <DialogTrigger asChild>
                <Button onClick={() => setAuthTab('register')}>
                  Sign Up
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>
                    {authTab === 'admin' ? 'Admin Login' : 'Welcome'}
                  </DialogTitle>
                </DialogHeader>
                <Tabs value={authTab} onValueChange={setAuthTab}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="login">Sign In</TabsTrigger>
                    <TabsTrigger value="register">Sign Up</TabsTrigger>
                    <TabsTrigger value="admin">Admin</TabsTrigger>
                  </TabsList>
                  <TabsContent value="login" className="mt-4">
                    <LoginForm onSuccess={() => setIsAuthDialogOpen(false)} />
                  </TabsContent>
                  <TabsContent value="register" className="mt-4">
                    <RegisterForm onSuccess={() => setIsAuthDialogOpen(false)} />
                  </TabsContent>
                  <TabsContent value="admin" className="mt-4">
                    <AdminLoginForm onSuccess={() => setIsAuthDialogOpen(false)} />
                  </TabsContent>
                </Tabs>
              </DialogContent>
            </Dialog>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-white">
            <nav className="py-4 space-y-4">
              <a href="#features" className="block text-gray-600 hover:text-blue-600">
                Features
              </a>
              <a href="#how-it-works" className="block text-gray-600 hover:text-blue-600">
                How It Works
              </a>
              <a href="#packages" className="block text-gray-600 hover:text-blue-600">
                Packages
              </a>
              <a href="#contact" className="block text-gray-600 hover:text-blue-600">
                Contact
              </a>
              <div className="pt-4 border-t space-y-2">
                <Dialog open={isAuthDialogOpen} onOpenChange={setIsAuthDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full" onClick={() => setAuthTab('login')}>
                      Sign In
                    </Button>
                  </DialogTrigger>
                  <DialogTrigger asChild>
                    <Button className="w-full" onClick={() => setAuthTab('register')}>
                      Sign Up
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>
                        {authTab === 'admin' ? 'Admin Login' : 'Welcome'}
                      </DialogTitle>
                    </DialogHeader>
                    <Tabs value={authTab} onValueChange={setAuthTab}>
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="login">Sign In</TabsTrigger>
                        <TabsTrigger value="register">Sign Up</TabsTrigger>
                        <TabsTrigger value="admin">Admin</TabsTrigger>
                      </TabsList>
                      <TabsContent value="login" className="mt-4">
                        <LoginForm onSuccess={() => setIsAuthDialogOpen(false)} />
                      </TabsContent>
                      <TabsContent value="register" className="mt-4">
                        <RegisterForm onSuccess={() => setIsAuthDialogOpen(false)} />
                      </TabsContent>
                      <TabsContent value="admin" className="mt-4">
                        <AdminLoginForm onSuccess={() => setIsAuthDialogOpen(false)} />
                      </TabsContent>
                    </Tabs>
                  </DialogContent>
                </Dialog>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
