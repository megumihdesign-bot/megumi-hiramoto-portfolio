import { useState, useEffect, ReactNode, FormEvent } from 'react';
import { motion } from 'motion/react';

interface PasswordGateProps {
  children: ReactNode;
  isProtected: boolean;
}

export const PasswordGate = ({ children, isProtected }: PasswordGateProps) => {
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const authorized = sessionStorage.getItem('project_access_granted');
    if (authorized === 'true') {
      setIsAuthorized(true);
    }
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (password === 'SeeWork') {
      sessionStorage.setItem('project_access_granted', 'true');
      setIsAuthorized(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  if (!isProtected || isAuthorized) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 md:px-12 max-w-7xl mx-auto pt-40">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <h2 className="text-2xl md:text-3xl font-serif text-cobalt mb-8 text-center">
          This project is password protected.
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError(false);
              }}
              placeholder="Enter Password"
              className="w-full bg-transparent border-b border-cobalt/30 py-4 px-2 text-cobalt placeholder:text-cobalt/40 focus:border-cobalt outline-none transition-colors font-sans text-lg"
              autoFocus
            />
            {error && (
              <p className="text-dot-red text-sm mt-2 font-sans">
                Incorrect password. Please try again.
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-4 bg-cobalt text-stone font-bold tracking-widest hover:bg-ink transition-colors duration-300"
          >
            SUBMIT
          </button>
        </form>
      </motion.div>
    </div>
  );
};
