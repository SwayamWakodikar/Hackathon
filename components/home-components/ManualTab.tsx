'use client';

import { useState, ChangeEvent } from 'react';
import { 
  User, 
  GraduationCap, 
  Phone, 
  MapPin, 
  Briefcase, 
  Sparkles 
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  education: string;
  skills: string;
  experience: string;
}

interface ManualTabProps {
  isDark: boolean;
  onGenerate: (data: FormData) => void;
}

export default function ManualTab({ isDark, onGenerate }: ManualTabProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    education: '',
    skills: '',
    experience: ''
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email) {
      alert('Please fill in at least your name and email');
      return;
    }
    onGenerate(formData);
  };

  const inputClass = isDark 
    ? 'bg-slate-800 border-slate-700 text-white placeholder:text-slate-500' 
    : 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-400';

  const labelClass = isDark ? 'text-slate-300' : 'text-gray-700';
  const headingClass = isDark ? 'text-white' : 'text-gray-900';

  return (
    <Card className={isDark ? 'max-w-3xl mx-auto bg-slate-900 border-slate-800' : 'max-w-3xl mx-auto bg-white border-gray-200'}>
      <CardHeader>
        <CardTitle className={headingClass}>
          Enter Your Details
        </CardTitle>
        <CardDescription className={isDark ? 'text-slate-400' : 'text-gray-600'}>
          Fill in your information and let AI create your resume
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className={`text-lg font-medium flex items-center gap-2 ${headingClass}`}>
            <User className="w-5 h-5" />
            Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className={labelClass}>
                Full Name *
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleInputChange}
                className={inputClass}
                required
              />
            </div>
            <div>
              <Label htmlFor="email" className={labelClass}>
                Email *
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleInputChange}
                className={inputClass}
                required
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className={`text-lg font-medium flex items-center gap-2 ${headingClass}`}>
            <Phone className="w-5 h-5" />
            Contact Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone" className={labelClass}>
                Phone Number
              </Label>
              <Input
                id="phone"
                name="phone"
                placeholder="+1 (555) 000-0000"
                value={formData.phone}
                onChange={handleInputChange}
                className={inputClass}
              />
            </div>
            <div>
              <Label htmlFor="address" className={labelClass}>
                <MapPin className="w-4 h-4 inline mr-1" />
                Address
              </Label>
              <Input
                id="address"
                name="address"
                placeholder="City, State"
                value={formData.address}
                onChange={handleInputChange}
                className={inputClass}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className={`text-lg font-medium flex items-center gap-2 ${headingClass}`}>
            <GraduationCap className="w-5 h-5" />
            Education
          </h3>
          <Textarea
            name="education"
            placeholder="Bachelor's in Computer Science, XYZ University (2020-2024)"
            value={formData.education}
            onChange={handleInputChange}
            rows={3}
            className={inputClass}
          />
        </div>

        <div className="space-y-4">
          <h3 className={`text-lg font-medium flex items-center gap-2 ${headingClass}`}>
            <Sparkles className="w-5 h-5" />
            Skills
          </h3>
          <Textarea
            name="skills"
            placeholder="JavaScript, React, Node.js, Python, SQL..."
            value={formData.skills}
            onChange={handleInputChange}
            rows={3}
            className={inputClass}
          />
        </div>

        <div className="space-y-4">
          <h3 className={`text-lg font-medium flex items-center gap-2 ${headingClass}`}>
            <Briefcase className="w-5 h-5" />
            Experience
          </h3>
          <Textarea
            name="experience"
            placeholder="Software Engineer at ABC Corp (2022-Present)&#10;- Developed web applications..."
            value={formData.experience}
            onChange={handleInputChange}
            rows={5}
            className={inputClass}
          />
        </div>

        <Button 
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
          size="lg"
          onClick={handleSubmit}
        >
          <Sparkles className="w-5 h-5 mr-2" />
          Generate AI Resume
        </Button>
      </CardContent>
    </Card>
  );
}