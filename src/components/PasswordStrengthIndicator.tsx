
import { cn } from "@/lib/utils";

interface PasswordStrengthIndicatorProps {
  strength: number;
}

const PasswordStrengthIndicator = ({ strength }: PasswordStrengthIndicatorProps) => {
  const getStrengthText = () => {
    if (strength === 0) return "Very Weak";
    if (strength <= 2) return "Weak";
    if (strength <= 3) return "Moderate";
    if (strength === 4) return "Strong";
    return "Very Strong";
  };

  const getStrengthColor = () => {
    if (strength === 0) return "bg-red-500";
    if (strength <= 2) return "bg-orange-500";
    if (strength <= 3) return "bg-yellow-500";
    if (strength === 4) return "bg-green-500";
    return "bg-emerald-500";
  };

  return (
    <div className="mt-4 mb-6">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">Password Strength</span>
        <span className="text-sm font-medium text-gray-700">{getStrengthText()}</span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={cn("h-full transition-all duration-500", getStrengthColor())}
          style={{ width: `${(strength / 5) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default PasswordStrengthIndicator;
