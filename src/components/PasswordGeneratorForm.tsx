
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface PasswordGeneratorFormProps {
  passwordLength: number;
  setPasswordLength: (value: number) => void;
  includeUppercase: boolean;
  setIncludeUppercase: (value: boolean) => void;
  includeLowercase: boolean;
  setIncludeLowercase: (value: boolean) => void;
  includeNumbers: boolean;
  setIncludeNumbers: (value: boolean) => void;
  includeSymbols: boolean;
  setIncludeSymbols: (value: boolean) => void;
}

const PasswordGeneratorForm = ({
  passwordLength,
  setPasswordLength,
  includeUppercase,
  setIncludeUppercase,
  includeLowercase,
  setIncludeLowercase,
  includeNumbers,
  setIncludeNumbers,
  includeSymbols,
  setIncludeSymbols,
}: PasswordGeneratorFormProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between">
          <Label htmlFor="password-length" className="text-sm font-medium text-gray-700">Password Length</Label>
          <span className="text-sm font-medium text-blue-600">{passwordLength} characters</span>
        </div>
        <Slider
          id="password-length"
          min={4}
          max={32}
          step={1}
          value={[passwordLength]}
          onValueChange={(value) => setPasswordLength(value[0])}
          className="py-4"
        />
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-700">Include Characters</h3>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="uppercase" 
            checked={includeUppercase} 
            onCheckedChange={(checked) => setIncludeUppercase(checked as boolean)} 
          />
          <Label htmlFor="uppercase" className="text-sm text-gray-600 cursor-pointer">
            Uppercase Letters (A-Z)
          </Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="lowercase" 
            checked={includeLowercase} 
            onCheckedChange={(checked) => setIncludeLowercase(checked as boolean)} 
          />
          <Label htmlFor="lowercase" className="text-sm text-gray-600 cursor-pointer">
            Lowercase Letters (a-z)
          </Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="numbers" 
            checked={includeNumbers} 
            onCheckedChange={(checked) => setIncludeNumbers(checked as boolean)} 
          />
          <Label htmlFor="numbers" className="text-sm text-gray-600 cursor-pointer">
            Numbers (0-9)
          </Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="symbols" 
            checked={includeSymbols} 
            onCheckedChange={(checked) => setIncludeSymbols(checked as boolean)} 
          />
          <Label htmlFor="symbols" className="text-sm text-gray-600 cursor-pointer">
            Special Characters (!@#$%^&*)
          </Label>
        </div>
      </div>
    </div>
  );
};

export default PasswordGeneratorForm;
