
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import PasswordStrengthIndicator from "@/components/PasswordStrengthIndicator";
import PasswordGeneratorForm from "@/components/PasswordGeneratorForm";
import PasswordDisplay from "@/components/PasswordDisplay";
import { generatePassword } from "@/lib/passwordUtils";

const Index = () => {
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleGeneratePassword = () => {
    if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols) {
      toast.error("Please select at least one character type");
      return;
    }

    const newPassword = generatePassword(
      passwordLength,
      includeUppercase,
      includeLowercase,
      includeNumbers,
      includeSymbols
    );
    setPassword(newPassword);
    calculatePasswordStrength(newPassword);
  };

  const calculatePasswordStrength = (pwd: string) => {
    let strength = 0;
    
    // Add points for length
    if (pwd.length >= 8) strength += 1;
    if (pwd.length >= 12) strength += 1;
    if (pwd.length >= 16) strength += 1;
    
    // Add points for character variety
    if (/[A-Z]/.test(pwd)) strength += 1;
    if (/[a-z]/.test(pwd)) strength += 1;
    if (/[0-9]/.test(pwd)) strength += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) strength += 1;
    
    setPasswordStrength(Math.min(strength, 5));
  };

  const copyToClipboard = async () => {
    if (!password) {
      toast.error("Generate a password first");
      return;
    }
    
    try {
      await navigator.clipboard.writeText(password);
      toast.success("Password copied to clipboard");
    } catch (err) {
      toast.error("Failed to copy password");
      console.error("Failed to copy: ", err);
    }
  };

  // Generate a password on initial load
  useEffect(() => {
    handleGeneratePassword();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-800 mb-2">Secure Password Generator</h1>
          <p className="text-gray-600">Create strong, unique passwords instantly</p>
        </div>

        <Card className="p-6 shadow-lg bg-white">
          <PasswordDisplay 
            password={password} 
            copyToClipboard={copyToClipboard} 
          />
          
          <PasswordStrengthIndicator strength={passwordStrength} />
          
          <PasswordGeneratorForm
            passwordLength={passwordLength}
            setPasswordLength={setPasswordLength}
            includeUppercase={includeUppercase}
            setIncludeUppercase={setIncludeUppercase}
            includeLowercase={includeLowercase}
            setIncludeLowercase={setIncludeLowercase}
            includeNumbers={includeNumbers}
            setIncludeNumbers={setIncludeNumbers}
            includeSymbols={includeSymbols}
            setIncludeSymbols={setIncludeSymbols}
          />
          
          <Button 
            onClick={handleGeneratePassword} 
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 transition-all"
          >
            Generate Password
          </Button>
        </Card>
        
        <div className="text-center mt-6 text-sm text-gray-500">
          <p>Your passwords are generated locally and never stored or transmitted</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
