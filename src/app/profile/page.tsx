'use client';
import { useState } from 'react';
import Image from 'next/image';
import {
  Mail,
  Github,
  Twitter,
  Instagram,
  Facebook,
  Linkedin,
  Pencil,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { SiTiktok, SiYoutube, SiSpotify } from 'react-icons/si';
import { Textarea } from '@/components/ui/textarea';

const profileLinks = [
    { name: 'YouTube', icon: <SiYoutube className="h-6 w-6 text-[#FF0000]" />, url: 'https://youtube.com/user' },
    { name: 'Spotify', icon: <SiSpotify className="h-6 w-6 text-[#1DB954]" />, url: 'https://spotify.com/user' },
    { name: 'TikTok', icon: <SiTiktok className="h-6 w-6" />, url: 'https://tiktok.com/@user' },
];

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px" {...props}>
        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.19,4.197-4.092,5.571l6.19,5.238C42.012,36.494,44,30.638,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
    </svg>
)

export default function ProfilePage() {
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bio, setBio] = useState('This is your bio section. You can share a little bit about yourself, your interests, or what you do.');
  const [tempBio, setTempBio] = useState(bio);

  const handleSaveBio = () => {
    setBio(tempBio);
    setIsEditingBio(false);
  };

  const handleCancelEdit = () => {
    setTempBio(bio);
    setIsEditingBio(false);
  }

  return (
    <>
      <div className="relative h-48 w-full">
        <Image
          src="https://placehold.co/1200x400.png"
          alt="Cover photo"
          layout="fill"
          objectFit="cover"
          className="bg-muted"
          data-ai-hint="abstract background"
        />
      </div>
      <div className="container mx-auto max-w-4xl -mt-16 px-4">
        <div className="relative">
          <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-background bg-background mx-auto">
            <Image
              src="https://placehold.co/200x200.png"
              alt="User avatar"
              width={128}
              height={128}
              className="object-cover"
              data-ai-hint="user avatar"
            />
          </div>
        </div>

        <div className="text-center mt-4">
          <h1 className="text-3xl font-bold">Your Name</h1>
          <p className="text-md text-muted-foreground">@username</p>
          <div className="mt-2 max-w-md mx-auto">
            {isEditingBio ? (
              <div className="flex flex-col items-center gap-2">
                <Textarea 
                  value={tempBio}
                  onChange={(e) => setTempBio(e.target.value)}
                  className="w-full"
                />
                <div className="flex gap-2">
                  <Button onClick={handleSaveBio} size="sm">Save</Button>
                  <Button onClick={handleCancelEdit} variant="outline" size="sm">Cancel</Button>
                </div>
              </div>
            ) : (
              <div className="group relative">
                <p>
                  {bio}
                </p>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute -top-2 -right-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => setIsEditingBio(true)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {profileLinks.map((link, index) => (
                    <Card key={index} className="hover:bg-secondary/50 transition-colors">
                        <a href={link.url} target="_blank" rel="noopener noreferrer" className="block">
                            <CardContent className="p-4 flex items-center space-x-4">
                                {link.icon}
                                <span className="flex-1 text-center font-semibold">{link.name}</span>
                            </CardContent>
                        </a>
                    </Card>
                ))}
            </div>
        </div>

        <div className="text-center mt-8 pb-8">
             <Button>
                <GoogleIcon className="mr-2 h-4 w-4" /> Sign in with Google
            </Button>
        </div>
      </div>
    </>
  );
}
