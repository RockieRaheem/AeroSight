'use client';

import { useTheme } from 'next-themes';
import { Sun, Moon, Laptop, Bell, BellOff, Palette, Languages } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account and application preferences.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>
            Customize the look and feel of the application.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between space-x-2 p-4 rounded-lg border">
              <div className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-muted-foreground" />
                <Label htmlFor="theme" className="font-medium">
                  Theme
                </Label>
              </div>
            <div className="flex items-center gap-2">
              <Button
                variant={theme === 'light' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setTheme('light')}
                className="h-9 w-9"
              >
                <Sun className="h-5 w-5" />
              </Button>
              <Button
                variant={theme === 'dark' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setTheme('dark')}
                className="h-9 w-9"
              >
                <Moon className="h-5 w-5" />
              </Button>
              <Button
                variant={theme === 'system' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setTheme('system')}
                className="h-9 w-9"
              >
                <Laptop className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between space-x-2 p-4 rounded-lg border">
              <div className="flex items-center gap-2">
                <Languages className="h-5 w-5 text-muted-foreground" />
                <Label htmlFor="language" className="font-medium">
                  Language
                </Label>
              </div>
            <Select defaultValue="en">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es" disabled>Spanish (coming soon)</SelectItem>
                <SelectItem value="fr" disabled>French (coming soon)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>
            Manage how you receive notifications from AeroSight.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg border">
             <div className="space-y-0.5">
                <Label className="text-base">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive updates and alerts via email.</p>
             </div>
            <Switch defaultChecked />
          </div>
           <div className="flex items-center justify-between p-4 rounded-lg border">
             <div className="space-y-0.5">
                <Label className="text-base">Push Notifications</Label>
                <p className="text-sm text-muted-foreground">Get real-time alerts on your devices.</p>
             </div>
            <Switch defaultChecked />
          </div>
           <div className="flex items-center justify-between p-4 rounded-lg border">
             <div className="space-y-0.5">
                <Label className="text-base">Maintenance Alerts</Label>
                <p className="text-sm text-muted-foreground">Critical alerts for aircraft maintenance.</p>
             </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
