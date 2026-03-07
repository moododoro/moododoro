import React from "react";

const Card = ({
    children,
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <div
            className={`absolute w-fit bg-secondary border shadow-md p-4 ${className ?? ""}`}
            {...props}
        >
            {children}
        </div>
    );
};

export default Card;
