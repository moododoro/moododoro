import React from "react";

interface ButtonProps {
    label: string;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    className?: string;
}

const Button = ({ label, onClick, className }: ButtonProps) => {
    return (
        <button
            className={`m-2 p-2 border-2 rounded hover:cursor-pointer hover:bg-[#e5e0d8] ${className}`}
            onClick={onClick}
        >
            {label}
        </button>
    );
};

export default Button;
