import React from 'react';
import alexAvatarImg from '../../assets/images/avatar_male_alex_1790105030896.jpg';

export interface MaleAvatarProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showBadge?: boolean;
}

export const MaleAvatar: React.FC<MaleAvatarProps> = ({
  className = '',
  size = 'md',
  showBadge = true,
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8 rounded-lg',
    md: 'w-12 h-12 rounded-xl',
    lg: 'w-24 h-24 rounded-2xl',
    hero: 'w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-3xl',
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <div
        className={`${sizeClasses[size]} overflow-hidden border border-blue-500/30 bg-slate-900 shadow-xl shadow-blue-500/10`}
      >
        <img
          src={alexAvatarImg}
          alt="Alex - Architectural AI Specialist"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover select-none"
        />
      </div>

      {showBadge && (
        <span
          className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-blue-500 border-2 border-slate-950 rounded-full shadow-sm"
          title="Alex - Online"
        />
      )}
    </div>
  );
};
