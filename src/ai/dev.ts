import { config } from 'dotenv';
config();

import '@/ai/flows/calculate-fuel-cost.ts';
import '@/ai/flows/optimize-flight-routes.ts';
import '@/ai/flows/provide-maintenance-schedules.ts';
import '@/ai/flows/predict-flight-delays.ts';
import '@/ai/flows/search-aero-sight.ts';
import '@/ai/flows/generate-flight-debrief.ts';
import '@/ai/flows/text-to-speech.ts';
