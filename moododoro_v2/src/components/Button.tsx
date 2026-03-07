import React from "react";

interface ButtonProps {
    label: string;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ label, onClick }: ButtonProps) => {
    return (
        <button
            className="m-2 p-2 border-2 rounded hover:cursor-pointer hover:bg-[#e5e0d8]"
            onClick={onClick}
        >
            {label}
        </button>
    );
};

export default Button;
