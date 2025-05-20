

import React, {ButtonHTMLAttributes } from 'react'

interface SimpleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    hasShadow?: boolean;
    background?: string;
    hidden?: boolean;
    className?: string;
}

const SimpleButton: React.FC<SimpleButtonProps> = ({
    children,
    hasShadow = false,
    background,
    hidden = false,
    className = '',
    ...props
}) => {

    if (hidden) return null;

    let buttonClasses = 'px-4 py-2 rounde-md transition-all focus:outline-none';

    if (hasShadow) {
        buttonClasses += 'shadow-md hover:shadow-lg';
    }

    buttonClasses += className ? `${className}` : '';

    return (
        <button
        className={buttonClasses}
        style= {background ? { backgroundColor: background } : undefined}
        {...props}
        >
            {children}
        </button>
    );
    
};

export default SimpleButton