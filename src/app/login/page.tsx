"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { AeroSightLogo } from "@/components/aerosight-logo";
import { User, Lock, Plane, Eye, EyeOff, Mail } from "lucide-react";

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
        <title>Google</title>
        <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.02 1.02-2.62 1.62-4.55 1.62-3.86 0-7-3.14-7-7s3.14-7 7-7c2.18 0 3.54.88 4.38 1.68l2.54-2.54C18.46 1.18 15.68 0 12.48 0 5.88 0 .04 5.88.04 13s5.84 13 12.44 13c3.1 0 5.45-1.04 7.2-2.8 1.9-1.9 2.53-4.85 2.53-7.64 0-.85-.07-1.65-.2-2.4H12.48z" />
    </svg>
);


export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  const loginImage = PlaceHolderImages.find(p => p.id === 'login-background');

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4">
      {loginImage && (
        <Image
          src={loginImage.imageUrl}
          alt={loginImage.description}
          layout="fill"
          objectFit="cover"
          data-ai-hint={loginImage.imageHint}
          className="absolute inset-0 -z-10 w-full h-full object-cover brightness-[0.4]"
        />
      )}
      
      <Tabs defaultValue="sign-in" className="w-full max-w-md">
        <Card className="bg-card/80 backdrop-blur-sm border-white/20">
           <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                  <AeroSightLogo className="w-20 h-20 text-primary" />
              </div>
              <CardTitle className="text-3xl font-bold text-card-foreground">Welcome to AeroSight</CardTitle>
              <CardDescription className="text-card-foreground/80 pt-2">
                Sign in or create an account to access the flight deck.
              </CardDescription>
            </CardHeader>
          <CardContent>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="sign-in">Sign In</TabsTrigger>
              <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="sign-in">
              <form onSubmit={handleLogin}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email-signin">Email</Label>
                     <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email-signin"
                          type="email"
                          placeholder="manager@airline.com"
                          defaultValue="manager@airline.com"
                          required
                          className="pl-10 bg-background/50 border-white/20"
                        />
                    </div>
                  </div>
                  <div className="grid gap-2">
                     <div className="flex items-center">
                        <Label htmlFor="password-signin">Password</Label>
                        <a
                          href="#"
                          className="ml-auto inline-block text-sm text-primary/80 hover:text-primary underline"
                        >
                          Forgot your password?
                        </a>
                      </div>
                     <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input 
                            id="password-signin" 
                            type={showPassword ? "text" : "password"} 
                            defaultValue="password" 
                            required 
                            className="pl-10 pr-10 bg-background/50 border-white/20" 
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                    </div>
                  </div>
                   <Button type="submit" className="w-full text-lg py-6 mt-2">
                    Sign In
                    <Plane className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </form>
            </TabsContent>
            <TabsContent value="sign-up">
               <form onSubmit={handleLogin}>
                <div className="grid gap-4">
                   <div className="grid gap-2">
                    <Label htmlFor="fullname-signup">Full Name</Label>
                     <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input id="fullname-signup" placeholder="Jane Doe" required className="pl-10 bg-background/50 border-white/20" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email-signup">Email</Label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input id="email-signup" type="email" placeholder="manager@airline.com" required className="pl-10 bg-background/50 border-white/20" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password-signup">Password</Label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input 
                            id="password-signup" 
                            type={showPassword ? "text" : "password"} 
                            required 
                            className="pl-10 pr-10 bg-background/50 border-white/20" 
                        />
                         <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                    </div>
                  </div>
                   <div className="grid gap-2">
                    <Label htmlFor="confirm-password-signup">Confirm Password</Label>
                     <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input 
                            id="confirm-password-signup" 
                            type={showConfirmPassword ? "text" : "password"} 
                            required 
                            className="pl-10 pr-10 bg-background/50 border-white/20" 
                        />
                         <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                    </div>
                  </div>
                  <Button type="submit" className="w-full text-lg py-6 mt-2">
                    Create Account
                  </Button>
                </div>
              </form>
            </TabsContent>
             <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-white/20" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
             <Button variant="outline" className="w-full text-md py-6 bg-background/50 border-white/20 hover:bg-background/70">
                <GoogleIcon className="mr-2 h-5 w-5" />
                Sign in with Google
            </Button>
          </CardContent>
        </Card>
      </Tabs>
    </div>
  );
}
