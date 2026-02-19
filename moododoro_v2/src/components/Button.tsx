import React from "react";

interface ButtonProps {
    label: string;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ label, onClick }: ButtonProps) => {
    return (
        <button
            className="m-2 p-2 border hover:cursor-pointer hover:bg-[#cfcbc4] rounded"
            onClick={onClick}
        >
            {label}
        </button>
    );
};

export default Button;
