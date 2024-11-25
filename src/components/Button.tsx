import { twMerge } from "tailwind-merge";
import { BasePropType } from "../utils/types";
import { motion } from "framer-motion";
import { configClasses } from "../utils/constants";
import { ReactNode } from "react";

type ButtonPropType = {
    size: "sm" | "md" | "lg";
    disable?: boolean;
    loading?: boolean;
    loadingIcon?: ReactNode;
} & BasePropType;

const Button = (props: ButtonPropType) => {
    const {
        size = "md",
        variant = "primary",
        loading,
        loadingIcon,
        disable,
        children,
    } = props;

    return (
        <motion.button
            className={twMerge(
                configClasses.variant[variant],
                configClasses.size[size],
                "px-3 flex gap-x-2 items-center py-1 w-fit rounded-lg transition-colors"
            )}
            disabled={disable || loading}
            whileTap={{ scale: 0.95 }}
        >
            {loading &&
                (loadingIcon ?? (
                    <motion.svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1.4em"
                        height="1.4em"
                        viewBox="0 0 24 24"
                    >
                        <path
                            fill="currentColor"
                            d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"
                        >
                            <animateTransform
                                attributeName="transform"
                                dur="0.75s"
                                repeatCount="indefinite"
                                type="rotate"
                                values="0 12 12;360 12 12"
                            />
                        </path>
                    </motion.svg>
                ))}
            {children}
        </motion.button>
    );
};

export default Button;
