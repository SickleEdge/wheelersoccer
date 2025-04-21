'use client';

import { useState, useEffect, FormEvent } from 'react';
import { createClient } from '@supabase/supabase-js';
import type { Database } from '../../types/supabase';
import Link from 'next/link';
import Image from 'next/image';

type User = Database['auth']['User'];
type Session = Database['auth']['Session'];

interface PhotographerLink {
  id: string;
  user_id: string;
  photographer_name: string;
  drive_link: string;
  drive_name: string;
  tip_link: string;
  description: string;
  created_at: string;
}

// Initialize Supabase client with proper configuration
const supabase = createClient(
  'https://fvqacfldicptrcmiqonm.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ2cWFjZmxkaWNwdHJjbWlxb25tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUxODY2ODUsImV4cCI6MjA2MDc2MjY4NX0.TmsK6gaY6bUE4RVOpe4EPhz4YYFjwWRc_tCZCQp0WG0',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
    db: {
      schema: 'public',
    },
  }
);

export default function PhotographersPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [driveLink, setDriveLink] = useState('');
  const [driveName, setDriveName] = useState('');
  const [tipLink, setTipLink] = useState('');
  const [description, setDescription] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [links, setLinks] = useState<PhotographerLink[]>([]);
  const [submissionCount, setSubmissionCount] = useState(0);
  const [lastSubmissionTime, setLastSubmissionTime] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Function to create the table if it doesn't exist
  const createTableIfNotExists = async () => {
    try {
      // Check if table exists
      const { data: tableExists, error: checkError } = await supabase
        .from('photographer_links')
        .select('id')
        .limit(1);

      if (checkError) {
        console.error('Error checking table:', checkError);
        // The table doesn't exist, but we can't create it from the client
        // The table needs to be created manually in the Supabase dashboard
        setError('The photographer_links table does not exist. Please create it in the Supabase dashboard.');
      }
    } catch (err) {
      console.error('Error checking table:', err);
      setError('Failed to check if table exists. Please try again later.');
    }
  };

  useEffect(() => {
    // Create table if it doesn't exist
    createTableIfNotExists();

    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }: { data: { session: Session | null } }) => {
      if (session?.user) {
        setUser(session.user);
        // Load the user's name from their user metadata
        const userData = session.user.user_metadata;
        if (userData) {
          setFirstName(userData.first_name || '');
          setLastName(userData.last_name || '');
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    // Listen for changes on auth state
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: string, session: Session | null) => {
      if (session?.user) {
        setUser(session.user);
        // Load the user's name from their user metadata
        const userData = session.user.user_metadata;
        if (userData) {
          setFirstName(userData.first_name || '');
          setLastName(userData.last_name || '');
        }
      } else {
        setUser(null);
        setFirstName('');
        setLastName('');
      }
    });

    // Fetch existing links
    fetchLinks();

    // Load submission count and last submission time from localStorage
    const savedCount = localStorage.getItem('submissionCount');
    const savedTime = localStorage.getItem('lastSubmissionTime');
    if (savedCount) setSubmissionCount(parseInt(savedCount));
    if (savedTime) setLastSubmissionTime(parseInt(savedTime));

    return () => subscription.unsubscribe();
  }, []);

  const fetchLinks = async () => {
    try {
      const { data, error } = await supabase
        .from('photographer_links')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching links:', error);
        setError('Failed to load links');
        return;
      }
      
      if (data) {
        setLinks(data as PhotographerLink[]);
      }
    } catch (err) {
      console.error('Unexpected error fetching links:', err);
      setError('Failed to load links');
    }
  };

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    
    // Validate name fields
    if (!firstName.trim() || !lastName.trim()) {
      setError('Please enter your first and last name');
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email: form.email.value,
      password: form.password.value,
      options: {
        data: {
          first_name: firstName.trim(),
          last_name: lastName.trim(),
        }
      }
    });

    if (error) {
      setError(error.message);
    } else if (data?.user) {
      setSuccess('Account created successfully! Please check your email to verify your account.');
      // Clear the form
      setFirstName('');
      setLastName('');
      form.email.value = '';
      form.password.value = '';
    }
  };

  const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const { data, error } = await supabase.auth.signInWithPassword({
      email: form.email.value,
      password: form.password.value,
    });

    if (error) {
      setError(error.message);
    } else if (data?.user) {
      // Load the user's name from their user metadata
      const userData = data.user.user_metadata;
      if (userData) {
        setFirstName(userData.first_name || '');
        setLastName(userData.last_name || '');
      }
      setSuccess('Signed in successfully!');
      // Clear the form
      form.email.value = '';
      form.password.value = '';
    }
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) setError(error.message);
  };

  const canSubmitLink = () => {
    if (submissionCount >= 3) {
      if (lastSubmissionTime) {
        const timeSinceLastSubmission = Date.now() - lastSubmissionTime;
        if (timeSinceLastSubmission < 10 * 60 * 1000) {
          const minutesLeft = Math.ceil((10 * 60 * 1000 - timeSinceLastSubmission) / (60 * 1000));
          setError(`Please wait ${minutesLeft} more minutes before submitting another link`);
          return false;
        } else {
          setSubmissionCount(0);
          localStorage.setItem('submissionCount', '0');
        }
      }
    }
    return true;
  };

  const handleSubmitLink = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!driveLink || !user || !driveName) return;
    
    if (!canSubmitLink()) return;

    // Validate Google Drive link format
    if (!driveLink.includes('drive.google.com')) {
      setError('Please enter a valid Google Drive link');
      return;
    }

    // Validate drive name
    if (!driveName.trim()) {
      setError('Please enter a name for your photo gallery');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      console.log('Submitting link:', { 
        driveLink, 
        driveName: driveName.trim(),
        tipLink: tipLink.trim(),
        userId: user.id, 
        photographerName: `${firstName} ${lastName}` 
      });
      
      const { data, error } = await supabase
        .from('photographer_links')
        .insert([
          {
            user_id: user.id,
            drive_link: driveLink,
            drive_name: driveName.trim(),
            tip_link: tipLink.trim(),
            description: description.trim(),
            photographer_name: `${firstName} ${lastName}`,
          }
        ])
        .select();

      if (error) {
        console.error('Error submitting link:', error);
        setError(error.message);
        return;
      }

      console.log('Submission response:', data);

      if (data && data.length > 0) {
        setDriveLink('');
        setDriveName('');
        setTipLink('');
        setDescription('');
        setSuccess('Link submitted successfully!');
        setSubmissionCount(prev => {
          const newCount = prev + 1;
          localStorage.setItem('submissionCount', newCount.toString());
          return newCount;
        });
        setLastSubmissionTime(Date.now());
        localStorage.setItem('lastSubmissionTime', Date.now().toString());
        await fetchLinks();
      } else {
        setError('Failed to submit link. Please try again.');
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteLink = async (linkId: string) => {
    const { error } = await supabase
      .from('photographer_links')
      .delete()
      .eq('id', linkId);

    if (error) {
      setError(error.message);
    } else {
      setSuccess('Link deleted successfully!');
      fetchLinks();
      setTimeout(() => setSuccess(null), 3000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Image 
            src="drops.png" 
            alt="Photographer Drops" 
            width={500}
            height={120}
            priority
            className="h-[120px] w-auto object-contain"
          />
        </div>
        
        {error && (
          <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded relative mb-4 animate-fade-in" role="alert">
            <span className="block sm:inline">{error}</span>
            <button onClick={() => setError(null)} className="absolute top-0 bottom-0 right-0 px-4 py-3">
              <span className="sr-only">Dismiss</span>
              <svg className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        {success && (
          <div className="bg-green-900/50 border border-green-500 text-green-200 px-4 py-3 rounded relative mb-4 animate-fade-in" role="alert">
            <span className="block sm:inline">{success}</span>
          </div>
        )}
        
        {!user ? (
          <div className="bg-black/50 backdrop-blur-lg rounded-lg p-8 shadow-xl animate-fade-in border border-red-500/20">
            <h2 className="text-2xl font-semibold text-white mb-6">Sign In / Sign Up</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-black/30 p-6 rounded-lg border border-red-500/20">
                <h3 className="text-xl font-medium text-white mb-4">Sign Up</h3>
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full px-4 py-2 bg-black/50 border border-red-500/20 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full px-4 py-2 bg-black/50 border border-red-500/20 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      className="w-full px-4 py-2 bg-black/50 border border-red-500/20 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      className="w-full px-4 py-2 bg-black/50 border border-red-500/20 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors duration-200"
                  >
                    Sign Up
                  </button>
                </form>
              </div>
              
              <div className="bg-black/30 p-6 rounded-lg border border-red-500/20">
                <h3 className="text-xl font-medium text-white mb-4">Sign In</h3>
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      className="w-full px-4 py-2 bg-black/50 border border-red-500/20 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      className="w-full px-4 py-2 bg-black/50 border border-red-500/20 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors duration-200"
                  >
                    Sign In
                  </button>
                </form>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-black/50 backdrop-blur-lg rounded-lg p-8 shadow-xl animate-fade-in border border-red-500/20">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-white">Welcome, {firstName} {lastName}</h2>
                <button
                  onClick={handleSignOut}
                  className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors duration-200"
                >
                  Sign Out
                </button>
              </div>
              
              <form onSubmit={handleSubmitLink} className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Drop Name"
                    value={driveName}
                    onChange={(e) => setDriveName(e.target.value)}
                    className="w-full px-4 py-2 bg-black/50 border border-red-500/20 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <input
                    type="url"
                    placeholder="Google Drive Link"
                    value={driveLink}
                    onChange={(e) => setDriveLink(e.target.value)}
                    className="w-full px-4 py-2 bg-black/50 border border-red-500/20 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <input
                    type="url"
                    placeholder="Tip Link (optional)"
                    value={tipLink}
                    onChange={(e) => setTipLink(e.target.value)}
                    className="w-full px-4 py-2 bg-black/50 border border-red-500/20 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                    disabled={isSubmitting}
                  />
                  <p className="text-gray-400 text-sm mt-1">
                    Add a link where people can tip you (e.g., Venmo, PayPal, etc.)
                  </p>
                </div>
                <div>
                  <textarea
                    placeholder="Description (optional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-2 bg-black/50 border border-red-500/20 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 min-h-[100px]"
                    disabled={isSubmitting}
                  />
                  <p className="text-gray-400 text-sm mt-1">
                    Add a description for your photo drop
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <button
                    type="submit"
                    className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Drop'}
                  </button>
                  <span className="text-gray-400">
                    Submissions: {submissionCount}/3 (resets every 10 minutes)
                  </span>
                </div>
              </form>
            </div>

            <div className="bg-black/50 backdrop-blur-lg rounded-lg p-8 shadow-xl animate-fade-in border border-red-500/20">
              <h2 className="text-2xl font-semibold text-white mb-6">Your Drops</h2>
              <div className="space-y-4">
                {links.map((link) => (
                  <div key={link.id} className="bg-black/30 p-4 rounded-lg hover:bg-black/40 transition-colors duration-200 border border-red-500/20">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-white">{link.drive_name || 'Untitled Drop'}</p>
                        <Link
                          href={`/drops/${link.id}`}
                          className="text-red-400 hover:text-red-300 transition-colors duration-200"
                        >
                          View Drop
                        </Link>
                        <p className="text-sm text-gray-400">
                          {new Date(link.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeleteLink(link.id)}
                        className="text-red-400 hover:text-red-300 transition-colors duration-200"
                      >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 