import { PropsWithChildren } from "react";

export type BasePropType = PropsWithChildren<{
    size?: "sm" | "md" | "lg";
    variant?: "primary" | "ghost";
}>;