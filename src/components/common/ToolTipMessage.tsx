import { Tooltip } from "react-tooltip";
import { CircleAlert } from "lucide-react";

interface ToolTipMessageProps {
    size: number;
    message: string;
}

const ToolTipMessage = ({ size, message }: ToolTipMessageProps) => {
    return (
        <>
            <CircleAlert
                size={size}
                data-tooltip-id="my-tooltip"
                data-tooltip-content={message}
                className="text-red-500"
            />

            <Tooltip
                id="my-tooltip"
                className="z-10 absolute max-w-xs break-words bg-gray-800 text-white text-sm p-2 rounded"
            />
        </>
    );
};

export default ToolTipMessage;
