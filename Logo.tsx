import React from 'react';

interface LogoProps {
    className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = '' }) => {
    return (
        <img
            src="/tds-logo-transparent.png"
            alt="Tolworth Driving School Logo"
            className={`object-contain ${className}`}
        />
    );
};

export default Logo;
