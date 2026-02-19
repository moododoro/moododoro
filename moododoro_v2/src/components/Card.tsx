import React from "react";

const Card = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="absolute w-fit bg-secondary border shadow-md p-4 ">
            {children}
        </div>
    );
};

export default Card;
