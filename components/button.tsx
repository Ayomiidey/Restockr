import { Loader } from "lucide-react";

interface SubmitButtonProps {
  isPending: boolean;
  text: string;
  processingText?: string;
  className?: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  isPending,
  text,
  processingText = "Processing...",
  className = "",
}) => {
  return (
    <button
      type="submit"
      className={`flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded w-full sm:w-auto ${
        isPending ? "bg-blue-400 cursor-not-allowed" : "hover:bg-blue-700"
      } ${className}`}
      disabled={isPending}
    >
      {isPending ? (
        <>
          <Loader className="animate-spin h-4 w-4" />
          <span>{processingText}</span>
        </>
      ) : (
        text
      )}
    </button>
  );
};

export default SubmitButton;
