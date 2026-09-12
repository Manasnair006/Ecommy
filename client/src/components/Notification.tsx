import { NotificationProps } from "../context/NotificationContext";

export default function Notification({
    type,
    message
}: NotificationProps) {
    const isSuccess = type === "success";

    return (
        <div
            className={`
                fixed top-6 right-6 z-9999
                w-90
                bg-white/95 backdrop-blur-md
                border
                rounded-xl
                shadow-[0_12px_40px_rgba(0,0,0,0.10)]
                overflow-hidden
                animate-[slideIn_0.3s_ease-out]
                ${isSuccess
                    ? "border-green-200"
                    : "border-red-200"
                }
            `}
        >
            {/* Top accent line */}
            <div
                className={`h-0.5 w-full ${
                    isSuccess ? "bg-green-500" : "bg-red-500"
                }`}
            />

            <div className="flex items-center gap-4 px-5 py-4">

                {/* Status indicator */}
                <div
                    className={`
                        shrink-0
                        w-9 h-9
                        rounded-lg
                        flex items-center justify-center
                        border
                        ${isSuccess
                            ? "bg-green-50 border-green-200 text-green-600"
                            : "bg-red-50 border-red-200 text-red-600"
                        }
                    `}
                >
                    {isSuccess ? (
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                        >
                            <path d="M20 6L9 17l-5-5" />
                        </svg>
                    ) : (
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                        >
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    )}
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                    <p
                        className={`
                            text-[0.7rem]
                            font-semibold
                            uppercase
                            tracking-[0.15em]
                            mb-1
                            ${isSuccess
                                ? "text-green-600"
                                : "text-red-600"
                            }
                        `}
                    >
                        {isSuccess ? "Success" : "Error"}
                    </p>

                    <p className="text-[0.88rem] font-medium text-gray-700 leading-tight">
                        {message}
                    </p>
                </div>

            </div>

            {/* Bottom progress indicator */}
            <div
                className={`
                    h-0.5 w-full
                    animate-[shrink_3s_linear_forwards]
                    ${isSuccess
                        ? "bg-green-400"
                        : "bg-red-400"
                    }
                `}
            />
        </div>
    );
}
