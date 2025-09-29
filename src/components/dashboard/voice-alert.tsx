
'use client';

import { useState, useEffect, useRef } from 'react';
import { textToSpeech } from '@/ai/flows/text-to-speech';
import { AlertCircle, Volume2, X } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const simulatedAlerts = [
  'Alert: Flight UA 2-5-4, unexpected altitude drop detected. Monitoring.',
  'Critical Alert: Flight BA 7-8-9, engine pressure anomaly. Re-routing recommended.',
  'Weather Alert: Severe turbulence detected on the transatlantic corridor. All flights advised to adjust route.',
];

export function VoiceAlert() {
  const { toast } = useToast();
  const [currentAlert, setCurrentAlert] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Trigger the first alert shortly after the component mounts
    const initialTimeout = setTimeout(() => {
      const firstAlert = simulatedAlerts[0];
      setCurrentAlert(firstAlert);
    }, 5000); // 5 seconds after mount

    // Cycle through alerts for demonstration purposes
    let alertIndex = 1;
    const interval = setInterval(() => {
        if (isDismissed) return;
        setCurrentAlert(simulatedAlerts[alertIndex % simulatedAlerts.length]);
        alertIndex++;
    }, 30000); // New alert every 30 seconds

    return () => {
        clearTimeout(initialTimeout);
        clearInterval(interval);
    };
  }, [isDismissed]);

  useEffect(() => {
    if (currentAlert && !isDismissed) {
      async function getAudio() {
        setIsPlaying(true);
        try {
          const result = await textToSpeech(currentAlert!);
          setAudioUrl(result.audioUrl);
        } catch (error) {
          console.error('Error generating speech:', error);
          toast({
            title: 'Voice Alert Failed',
            description: 'Could not generate alert audio.',
            variant: 'destructive',
          });
          setIsPlaying(false);
        }
      }
      getAudio();
    }
  }, [currentAlert, isDismissed, toast]);

  useEffect(() => {
    if (audioUrl && audioRef.current) {
      audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
    }
  }, [audioUrl]);

  const handleDismiss = () => {
    setIsDismissed(true);
    if(audioRef.current){
        audioRef.current.pause();
    }
    setCurrentAlert(null);
    setAudioUrl(null);
    setIsPlaying(false);
  };
  
  if (isDismissed || !currentAlert) {
    return null;
  }

  return (
    <>
      <Alert variant="destructive" className="flex items-center justify-between">
        <div className="flex items-center">
            <AlertCircle className="h-5 w-5" />
            <div className="ml-4">
                <AlertTitle className="font-semibold">
                    {isPlaying ? 'Live Alert - Announcing...' : 'Live Alert'}
                </AlertTitle>
                <AlertDescription>
                   {currentAlert}
                </AlertDescription>
            </div>
        </div>
        <Button variant="ghost" size="icon" onClick={handleDismiss}>
            <X className="h-4 w-4" />
            <span className="sr-only">Dismiss alert</span>
        </Button>
      </Alert>
      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          onEnded={() => setIsPlaying(false)}
          onPlay={() => setIsPlaying(true)}
          hidden
        />
      )}
    </>
  );
}
