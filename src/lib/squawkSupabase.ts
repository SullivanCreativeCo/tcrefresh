import { createClient } from '@supabase/supabase-js';

const SQUAWK_URL = 'https://nidlkjvzmwvxawwhfkvv.supabase.co';
const SQUAWK_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5pZGxranZ6bXd2eGF3d2hma3Z2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE3MDYwOTksImV4cCI6MjA4NzI4MjA5OX0.lqRyyd44XfreABBaitxFo_-8vFiWXvr_IlU72ohMRio';

export const squawkSupabase = createClient(SQUAWK_URL, SQUAWK_ANON_KEY);
