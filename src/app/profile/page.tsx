import Image from 'next/image';
import {
  Mail,
  Link as LinkIcon,
  Github,
  Twitter,
  Instagram,
  Facebook,
  Linkedin,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { SiTiktok, SiYoutube, SiSpotify } from 'react-icons/si';

const socialLinks = [
  { icon: <Twitter className="h-5 w-5" />, href: '#' },
  { icon: <Github className="h-5 w-5" />, href: '#' },
  { icon: <Linkedin className="h-5 w-5" />, href: '#' },
  { icon: <Instagram className="h-5 w-5" />, href: '#' },
  { icon: <Facebook className="h-5 w-5" />, href: '#' },
];

const profileLinks = [
    { name: 'YouTube', icon: <SiYoutube className="h-6 w-6 text-[#FF0000]" />, url: 'https://youtube.com/user' },
    { name: 'Spotify', icon: <SiSpotify className="h-6 w-6 text-[#1DB954]" />, url: 'https://spotify.com/user' },
    { name: 'TikTok', icon: <SiTiktok className="h-6 w-6" />, url: 'https://tiktok.com/@user' },
    { name: 'My Website', icon: <LinkIcon className="h-6 w-6" />, url: 'https://user.com' },
];

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background">
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
          <p className="mt-2 max-w-md mx-auto">
            This is your bio section. You can share a little bit about yourself, your interests, or what you do.
          </p>
        </div>

        <div className="flex justify-center items-center space-x-2 mt-4">
          {socialLinks.map((link, index) => (
            <Button key={index} variant="outline" size="icon" asChild>
              <a href={link.href} target="_blank" rel="noopener noreferrer">
                {link.icon}
              </a>
            </Button>
          ))}
        </div>

        <div className="mt-8">
            <div className="grid grid-cols-1 gap-4">
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
                <Mail className="mr-2 h-4 w-4" /> Contact Me
            </Button>
        </div>
      </div>
    </div>
  );
}
