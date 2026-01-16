import { type SVGProps } from "react";

type FilePlusCornerProps = SVGProps<SVGSVGElement>;

export default function Lock({
    className,
    ...props
}: FilePlusCornerProps) {
    return (
        <svg
            {...props}
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            width="200"
            height="200"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="0"
            viewBox="0 0 512 512"
        >
            <path
                stroke="none"
                d="M368 192h-16v-80a96 96 0 1 0-192 0v80h-16a64.07 64.07 0 0 0-64 64v176a64.07 64.07 0 0 0 64 64h224a64.07 64.07 0 0 0 64-64V256a64.07 64.07 0 0 0-64-64m-48 0H192v-80a64 64 0 1 1 128 0z"
            ></path>
        </svg>
    );
}
