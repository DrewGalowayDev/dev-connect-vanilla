import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, MessageCircle, Share, Github, ExternalLink } from 'lucide-react';

const mockPosts = [
  {
    id: 1,
    author: { name: 'Sarah Chen', username: 'sarah_dev', avatar: '👩‍💻' },
    content: 'Just shipped a new React component library! 🎉 Check out the interactive docs.',
    code: `const Button = ({ variant = 'primary', children, ...props }) => {
  return (
    <button 
      className={\`btn btn-\${variant}\`} 
      {...props}
    >
      {children}
    </button>
  );
};`,
    tags: ['React', 'Components', 'TypeScript'],
    likes: 42,
    comments: 8,
    timestamp: '2h ago'
  },
  {
    id: 2,
    author: { name: 'Mike Rodriguez', username: 'mike_mobile', avatar: '👨‍💻' },
    content: 'Working on a new mobile app architecture. Clean, scalable, and performant! 📱',
    link: 'https://github.com/mike/react-native-architecture',
    tags: ['React Native', 'Architecture', 'Mobile'],
    likes: 28,
    comments: 5,
    timestamp: '4h ago'
  }
];

const Feed = () => {
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Developer Feed</h1>
        <p className="text-muted-foreground">Latest updates from the dev community</p>
      </div>

      {mockPosts.map((post) => (
        <Card key={post.id} className="dev-post">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{post.author.avatar}</span>
              <div>
                <p className="font-semibold">{post.author.name}</p>
                <p className="text-sm text-muted-foreground">@{post.author.username} • {post.timestamp}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>{post.content}</p>
            
            {post.code && (
              <pre className="text-sm"><code>{post.code}</code></pre>
            )}
            
            {post.link && (
              <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                <Github className="h-5 w-5" />
                <span className="flex-1 truncate">{post.link}</span>
                <ExternalLink className="h-4 w-4" />
              </div>
            )}
            
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>
            
            <div className="flex items-center gap-4 pt-2 border-t">
              <Button variant="ghost" size="sm" className="gap-2">
                <Heart className="h-4 w-4" />
                {post.likes}
              </Button>
              <Button variant="ghost" size="sm" className="gap-2">
                <MessageCircle className="h-4 w-4" />
                {post.comments}
              </Button>
              <Button variant="ghost" size="sm" className="gap-2">
                <Share className="h-4 w-4" />
                Share
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Feed;