
import React, { useState } from 'react';
import { User } from '../types';
import { JPTLogo } from './Logos';
import { Lock, User as UserIcon, X } from 'lucide-react';

interface LoginModalProps {
  onLogin: (user: User) => void;
  onClose: () => void;
  isMandatory?: boolean;
}

export const LoginModal: React.FC<LoginModalProps> = ({ onLogin, onClose, isMandatory = false }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const cleanUsername = username.trim().toLowerCase();
    const cleanPassword = password.trim();

    // Updated Authentication Logic with Hardcoded Users
    // Usernames are now case-insensitive (admin, Admin, ADMIN all work)
    if (cleanUsername === 'admin' && cleanPassword === 'QP@2026') {
      onLogin({
        username: 'admin',
        name: 'Document Controller',
        role: 'CONTROLLER'
      });
    } else if (cleanUsername === 'lab_staff' && cleanPassword === 'user123') {
      onLogin({
        username: 'lab_staff',
        name: 'Lab Staff',
        role: 'VIEWER'
      });
    } else if (cleanUsername === 'jtmp' && cleanPassword === 'user123') {
      onLogin({
        username: 'JTMP',
        name: 'JTMP Staff',
        role: 'VIEWER'
      });
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative">
        
        {/* Only show Close button if login is NOT mandatory */}
        {!isMandatory && (
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        )}

        <div className="bg-slate-900 p-8 text-center text-white">
          <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-full p-2">
            <JPTLogo className="w-full h-full" />
          </div>
          <h2 className="text-xl font-bold">JPT Document System</h2>
          <p className="text-slate-400 text-sm">Secure Access Portal</p>
        </div>

        <div className="p-8">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1 uppercase">Username</label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="Enter username"
                  autoFocus
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1 uppercase">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="Enter password"
                />
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-xs font-medium text-center bg-red-50 p-2 rounded">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 mt-2"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
