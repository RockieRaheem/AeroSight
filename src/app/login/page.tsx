"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { AeroSightLogo } from "@/components/aerosight-logo";
import { User, Lock, Plane } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

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
      
      <div className="w-full max-w-md">
        <form onSubmit={handleLogin}>
          <Card className="bg-card/80 backdrop-blur-sm border-white/20">
             <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                    <AeroSightLogo className="w-20 h-20 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold text-card-foreground">Welcome to AeroSight</CardTitle>
                <CardDescription className="text-card-foreground/80">
                  Enter your credentials to access the flight deck.
                </CardDescription>
              </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
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
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm text-primary/80 hover:text-primary underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                 <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="password" type="password" defaultValue="password" required className="pl-10 bg-background/50 border-white/20" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full text-lg py-6">
                Sign In
                <Plane className="ml-2 h-5 w-5" />
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  );
}
