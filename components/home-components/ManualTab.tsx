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

  // In your ManualTab.tsx or wherever you handle the form submission

const handleSubmit = async () => {
  if (!formData.name || !formData.email) {
    alert('Please fill in at least your name and email');
    return;
  }
  
  try {
    const response = await fetch('/api/generate-resume', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    
    if (response.ok) {
      const result = await response.json();
      
      // Display in console
      console.log("Generated Markdown Resume:");
      console.log(result.resume);
      
      // Download as .md file
      const blob = new Blob([result.resume], { type: 'text/markdown' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = result.filename || 'resume.md';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      // Also show preview
      alert(`Resume generated successfully! Downloading ${result.filename}`);
      
    } else {
      const error = await response.json();
      alert(`Failed to generate resume: ${error.error || 'Unknown error'}`);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred while generating your resume');
  }
};
  return (
    <Card 
      className={`max-w-3xl mx-auto ${
        isDark ? 'bg-gray-800 border-gray-700' : 'bg-white shadow-xl'
      }`}
    >
      <CardHeader>
        <CardTitle className={isDark ? 'text-white' : ''}>
          Enter Your Details
        </CardTitle>
        <CardDescription className={isDark ? 'text-gray-400' : ''}>
          Fill in your information and let AI create your resume
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Personal Information */}
        <div className="space-y-4">
          <h3 
            className={`text-lg font-semibold flex items-center gap-2 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            <User className="w-5 h-5" />
            Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label 
                htmlFor="name" 
                className={isDark ? 'text-gray-300' : ''}
              >
                Full Name *
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleInputChange}
                className={isDark ? 'bg-gray-700 border-gray-600 text-white' : ''}
                required
              />
            </div>
            <div>
              <Label 
                htmlFor="email" 
                className={isDark ? 'text-gray-300' : ''}
              >
                Email *
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleInputChange}
                className={isDark ? 'bg-gray-700 border-gray-600 text-white' : ''}
                required
              />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-4">
          <h3 
            className={`text-lg font-semibold flex items-center gap-2 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            <Phone className="w-5 h-5" />
            Contact Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label 
                htmlFor="phone" 
                className={isDark ? 'text-gray-300' : ''}
              >
                Phone Number
              </Label>
              <Input
                id="phone"
                name="phone"
                placeholder="+1 (555) 000-0000"
                value={formData.phone}
                onChange={handleInputChange}
                className={isDark ? 'bg-gray-700 border-gray-600 text-white' : ''}
              />
            </div>
            <div>
              <Label 
                htmlFor="address" 
                className={isDark ? 'text-gray-300' : ''}
              >
                <MapPin className="w-4 h-4 inline mr-1" />
                Address
              </Label>
              <Input
                id="address"
                name="address"
                placeholder="City, State"
                value={formData.address}
                onChange={handleInputChange}
                className={isDark ? 'bg-gray-700 border-gray-600 text-white' : ''}
              />
            </div>
          </div>
        </div>

        {/* Education */}
        <div className="space-y-4">
          <h3 
            className={`text-lg font-semibold flex items-center gap-2 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            <GraduationCap className="w-5 h-5" />
            Education
          </h3>
          <Textarea
            name="education"
            placeholder="Bachelor's in Computer Science, XYZ University (2020-2024)"
            value={formData.education}
            onChange={handleInputChange}
            rows={3}
            className={isDark ? 'bg-gray-700 border-gray-600 text-white' : ''}
          />
        </div>

        {/* Skills */}
        <div className="space-y-4">
          <h3 
            className={`text-lg font-semibold flex items-center gap-2 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            <Sparkles className="w-5 h-5" />
            Skills
          </h3>
          <Textarea
            name="skills"
            placeholder="JavaScript, React, Node.js, Python, SQL..."
            value={formData.skills}
            onChange={handleInputChange}
            rows={3}
            className={isDark ? 'bg-gray-700 border-gray-600 text-white' : ''}
          />
        </div>

        {/* Experience */}
        <div className="space-y-4">
          <h3 
            className={`text-lg font-semibold flex items-center gap-2 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            <Briefcase className="w-5 h-5" />
            Experience
          </h3>
          <Textarea
            name="experience"
            placeholder="Software Engineer at ABC Corp (2022-Present)&#10;- Developed web applications..."
            value={formData.experience}
            onChange={handleInputChange}
            rows={5}
            className={isDark ? 'bg-gray-700 border-gray-600 text-white' : ''}
          />
        </div>

        <Button 
          className={`w-full ${
            !isDark ? 'bg-purple-600 hover:bg-purple-700' : ''
          }`}
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