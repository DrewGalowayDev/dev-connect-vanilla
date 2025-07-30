import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  username: string;
  email: string;
  displayName: string;
  avatar: string;
  bio: string;
  skills: string[];
  joinedAt: string;
  isOnline: boolean;
  lastSeen: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (userData: Omit<User, 'id' | 'joinedAt' | 'isOnline' | 'lastSeen'> & { password: string }) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for simulation
const mockUsers: User[] = [
  {
    id: '1',
    username: 'sarah_dev',
    email: 'sarah@example.com',
    displayName: 'Sarah Chen',
    avatar: '👩‍💻',
    bio: 'Full-stack developer passionate about React and Node.js. Building the future one component at a time.',
    skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    joinedAt: '2023-01-15',
    isOnline: true,
    lastSeen: new Date().toISOString()
  },
  {
    id: '2',
    username: 'mike_mobile',
    email: 'mike@example.com',
    displayName: 'Mike Rodriguez',
    avatar: '👨‍💻',
    bio: 'Mobile app developer with 5+ years experience. iOS & Android specialist.',
    skills: ['Swift', 'Kotlin', 'React Native', 'Flutter'],
    joinedAt: '2022-08-20',
    isOnline: false,
    lastSeen: '2024-01-29T14:30:00Z'
  },
  {
    id: '3',
    username: 'alex_data',
    email: 'alex@example.com',
    displayName: 'Alex Kim',
    avatar: '🧑‍💻',
    bio: 'Data scientist and ML engineer. Love turning data into insights.',
    skills: ['Python', 'TensorFlow', 'SQL', 'AWS'],
    joinedAt: '2023-03-10',
    isOnline: true,
    lastSeen: new Date().toISOString()
  },
  {
    id: '4',
    username: 'emma_ui',
    email: 'emma@example.com',
    displayName: 'Emma Thompson',
    avatar: '👩‍🎨',
    bio: 'UI/UX Designer who codes. Creating beautiful, accessible experiences.',
    skills: ['Figma', 'React', 'CSS', 'Design Systems'],
    joinedAt: '2023-06-05',
    isOnline: false,
    lastSeen: '2024-01-29T10:15:00Z'
  }
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for stored auth on mount
    const storedUser = localStorage.getItem('devconnect_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate login - in real app, this would be an API call
    const foundUser = mockUsers.find(u => u.email === email);
    
    if (foundUser && password === 'password123') {
      const updatedUser = { ...foundUser, isOnline: true, lastSeen: new Date().toISOString() };
      setUser(updatedUser);
      localStorage.setItem('devconnect_user', JSON.stringify(updatedUser));
      return true;
    }
    
    return false;
  };

  const signup = async (userData: Omit<User, 'id' | 'joinedAt' | 'isOnline' | 'lastSeen'> & { password: string }): Promise<boolean> => {
    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === userData.email || u.username === userData.username);
    if (existingUser) {
      return false;
    }

    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      username: userData.username,
      email: userData.email,
      displayName: userData.displayName,
      avatar: userData.avatar,
      bio: userData.bio,
      skills: userData.skills,
      joinedAt: new Date().toISOString(),
      isOnline: true,
      lastSeen: new Date().toISOString()
    };

    // Add to mock users (in real app, this would be stored on server)
    mockUsers.push(newUser);
    setUser(newUser);
    localStorage.setItem('devconnect_user', JSON.stringify(newUser));
    
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('devconnect_user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      signup,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Export mock users for use in other components
export { mockUsers };