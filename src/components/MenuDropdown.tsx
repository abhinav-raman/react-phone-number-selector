import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { BasePropType } from "../utils/types";
import { configClasses } from "../utils/constants";

const MenuDropdown = ({
    size = "md",
    variant = "primary",
    children,
}: BasePropType) => {
    const [open, setOpen] = useState<boolean>(false);
    return (
        <div className="relative">
            <button
                className={twMerge(
                    configClasses.size[size],
                    configClasses.variant[variant],
                    open && "bg-zinc-600/20",
                    "p-1 border-zinc-800 rounded-lg hover:bg-zinc-400/20 transition-colors duration-200 outline-zinc-800 focus:outline-2 active:bg-zinc-600/20"
                )}
                onClick={() => setOpen((prev) => !prev)}
            >
                <svg
                    width={20}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                        <path
                            d="M4 18L20 18"
                            stroke="#000000"
                            stroke-width="2"
                            stroke-linecap="round"
                        ></path>{" "}
                        <path
                            d="M4 12L20 12"
                            stroke="#000000"
                            stroke-width="2"
                            stroke-linecap="round"
                        ></path>{" "}
                        <path
                            d="M4 6L20 6"
                            stroke="#000000"
                            stroke-width="2"
                            stroke-linecap="round"
                        ></path>{" "}
                    </g>
                </svg>
            </button>
            {open && children}
        </div>
    );
};

export default MenuDropdown;
