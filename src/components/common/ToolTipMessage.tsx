import { Tooltip } from "react-tooltip";
import { CircleAlert, CircleCheck } from "lucide-react";

interface ToolTipMessageProps {
    size: number;
    message: string;
    success?: boolean;
}

const ToolTipMessage = ({
    size,
    message,
    success = false
}: ToolTipMessageProps) => {
    return (
        <>
            {success ? (
                <CircleCheck
                    size={size}
                    data-tooltip-id="tooltip"
                    data-tooltip-content={message}
                    className="text-green-500 cursor-help"
                />
            ) : (
                <CircleAlert
                    size={size}
                    data-tooltip-id="tooltip"
                    data-tooltip-content={message}
                    className="text-red-500 cursor-help"
                />
            )}

            <Tooltip
                id="tooltip"
                className="z-10 absolute max-w-xs break-words bg-gray-800 text-white text-sm p-2 rounded"
            />
        </>
    );
};

export default ToolTipMessage;
