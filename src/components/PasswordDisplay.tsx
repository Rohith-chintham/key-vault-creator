
import { Button } from "@/components/ui/button";
import { ClipboardCopy, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface PasswordDisplayProps {
  password: string;
  copyToClipboard: () => void;
}

const PasswordDisplay = ({ password, copyToClipboard }: PasswordDisplayProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative mb-6">
      <div className="flex p-4 bg-gray-50 border border-gray-200 rounded-md items-center">
        <div className="flex-1 font-mono text-lg overflow-x-auto whitespace-nowrap pr-2">
          {showPassword ? password : password.replace(/./g, "•")}
        </div>
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={togglePasswordVisibility}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={copyToClipboard}
            aria-label="Copy password to clipboard"
          >
            <ClipboardCopy size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PasswordDisplay;
