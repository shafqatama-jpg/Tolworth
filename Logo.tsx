import React from 'react';
import logoImg from './tds-logo-transparent.png';

interface LogoProps {
    className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = '' }) => {
    return (
        <img
            src={logoImg}
            alt="Tolworth Driving School Logo"
            className={`object-contain ${className}`}
        />
    );
};

export default Logo;
