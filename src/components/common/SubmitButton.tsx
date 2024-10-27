import { Button } from "@/components/ui/button";
import { Ellipsis } from "lucide-react";

interface SubmitButtonProps {
    isValid: boolean;
    isSubmitting: boolean;
    text: string;
}

const SubmitButton = ({ isValid, isSubmitting, text }: SubmitButtonProps) => {
    return (
        <Button
            type="submit"
            className="w-full bg-gradient-to-r from-color-2 to-color-3 hover:from-color-5 hover:to-color-6 text-white h-12 text-base"
            disabled={!isValid || isSubmitting}
        >
            {isSubmitting ? (
                <>
                    <Ellipsis className="mr-2" />
                    Submitting...
                </>
            ) : (
                <>{text}</>
            )}
        </Button>
    );
};

export default SubmitButton;
