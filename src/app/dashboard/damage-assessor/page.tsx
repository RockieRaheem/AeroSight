'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Camera, Bot, Image as ImageIcon, AlertTriangle, Lightbulb } from 'lucide-react';
import Image from 'next/image';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { assessDamage } from '@/ai/flows/assess-damage';
import type { AssessDamageOutput } from '@/ai/flows/assess-damage';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

const FormSchema = z.object({
  description: z.string().min(10, 'Please provide a detailed description.'),
  image: z
    .any()
    .refine((files) => files?.length == 1, 'Image is required.')
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 4MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      '.jpg, .jpeg, .png and .webp files are accepted.'
    ),
});

function fileToDataUri(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}


export default function DamageAssessorPage() {
  const { toast } = useToast();
  const [assessment, setAssessment] = useState<AssessDamageOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const damagePlaceholder = PlaceHolderImages.find(p => p.id === 'damage-assessment-placeholder');

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      description: 'Small dent found on the leading edge of the starboard wing during pre-flight inspection. Approximately 2 inches in diameter.',
      image: undefined,
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    } else {
        setPreview(null);
    }
  };

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    setAssessment(null);
    try {
      const imageFile = data.image[0] as File;
      const photoDataUri = await fileToDataUri(imageFile);

      const result = await assessDamage({
        description: data.description,
        photoDataUri,
      });
      setAssessment(result);

    } catch (error) {
      console.error('Error assessing damage:', error);
      toast({
        title: 'Assessment Failed',
        description: 'Could not perform the damage assessment. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid gap-8 md:grid-cols-3">
      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle>AI Damage Assessor</CardTitle>
          <CardDescription>
            Upload an image of aircraft damage for an AI-powered assessment.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Damage Image</FormLabel>
                    <FormControl>
                        <div className="flex flex-col items-center space-y-2">
                             <div className="w-full h-48 border-2 border-dashed rounded-lg flex items-center justify-center bg-muted/50">
                                {preview ? (
                                    <Image src={preview} alt="Image preview" width={200} height={192} className="max-h-full w-auto rounded-md" />
                                ) : (
                                    <div className="text-center text-muted-foreground">
                                        <ImageIcon className="mx-auto h-12 w-12" />
                                        <p>Image Preview</p>
                                    </div>
                                )}
                            </div>
                            <Input 
                                type="file" 
                                accept="image/*" 
                                onChange={(e) => {
                                    field.onChange(e.target.files);
                                    handleImageChange(e);
                                }}
                                className="file:text-primary file:font-semibold"
                            />
                        </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description of Damage</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Describe the damage, location, and size..." {...field} className="min-h-32" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? 'Assessing...' : 'Assess Damage'}
                <Camera className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
      <div className="md:col-span-2">
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Bot className="h-6 w-6 text-primary" /> AI Assessment Report</CardTitle>
            <CardDescription>
              The AI's analysis of the damage and recommended actions.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col h-full">
             {isLoading && (
              <div className="space-y-4 flex flex-col items-center justify-center text-center h-full">
                 <div className="animate-pulse">
                  <Bot className="h-16 w-16 text-primary" />
                </div>
                <p className="font-semibold">Analyzing image and generating report...</p>
                <p className="text-sm text-muted-foreground">This may take a moment.</p>
              </div>
            )}
            {!isLoading && !assessment && (
                <div className="flex flex-col h-full items-center justify-center rounded-lg border border-dashed text-center p-8">
                {damagePlaceholder && (
                     <Image 
                        src={damagePlaceholder.imageUrl} 
                        alt={damagePlaceholder.description} 
                        data-ai-hint={damagePlaceholder.imageHint}
                        width={200}
                        height={150}
                        className="rounded-lg mb-4 opacity-30"
                     />
                )}
                <p className="mt-4 text-muted-foreground max-w-sm">
                  Your damage assessment report will appear here. Upload an image and description to begin.
                </p>
              </div>
            )}
            {assessment && (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardDescription>Damage Type</CardDescription>
                                <CardTitle className="text-xl">{assessment.damageType}</CardTitle>
                            </CardHeader>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                 <CardDescription>Severity Level</CardDescription>
                                <CardTitle className={`text-xl ${assessment.severity === 'High' ? 'text-destructive' : assessment.severity === 'Medium' ? 'text-yellow-500' : 'text-green-500'}`}>
                                    {assessment.severity}
                                </CardTitle>
                            </CardHeader>
                        </Card>
                    </div>
                     <div>
                        <h3 className="font-semibold flex items-center gap-2"><AlertTriangle className="h-5 w-5 text-primary" /> Analysis</h3>
                        <p className="text-sm text-muted-foreground mt-1">{assessment.analysis}</p>
                    </div>
                     <div>
                        <h3 className="font-semibold flex items-center gap-2"><Lightbulb className="h-5 w-5 text-primary" /> Recommendations</h3>
                        <p className="text-sm text-muted-foreground mt-1">{assessment.recommendations}</p>
                    </div>
                </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
