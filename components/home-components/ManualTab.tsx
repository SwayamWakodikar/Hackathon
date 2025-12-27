"use client";

import { useState, ChangeEvent } from "react";
import {
  User,
  GraduationCap,
  Phone,
  MapPin,
  Briefcase,
  Sparkles,
  Award,
  Target,
  FileText,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  education: string;
  skills: string;
  experience: string;
  summary: string;
  objective: string;
  certifications: string;
  projects: string;
}

interface ManualTabProps {
  isDark: boolean;
  onGenerate: (data: FormData) => void;
}

export default function ManualTab({ isDark, onGenerate }: ManualTabProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    education: "",
    skills: "",
    experience: "",
    summary: "",
    objective: "",
    certifications: "",
    projects: "",
  });

  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    // Basic validation
    if (!formData.name || !formData.email) {
      alert("Please fill in at least your name and email");
      return;
    }

    setIsGenerating(true);

    try {
      // Send to API
      const response = await fetch("/api/generate-resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formData: formData,
        }),
      });

      const data = await response.json();

      if (data.success) {
        console.log("Generated Resume:", data.resume);
        window.location.href = "/resume/dashboard";
        alert(
          "Resume generated successfully! Check console for markdown output."
        );
        onGenerate(formData);
      } else {
        alert("Failed to generate resume: " + data.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error generating resume");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card
      className={`max-w-4xl mx-auto ${
        isDark ? "bg-gray-800 border-gray-700" : "bg-white shadow-xl"
      }`}
    >
      <CardHeader>
        <CardTitle
          className={`text-2xl font-bold ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Enter Your Details
        </CardTitle>
        <CardDescription className={isDark ? "text-gray-400" : ""}>
          Fill in your information and let AI create your professional resume
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Personal Information */}
        <div className="space-y-6">
          <h3
            className={`text-xl font-semibold flex items-center gap-3 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            <User className="w-6 h-6" />
            Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label
                htmlFor="name"
                className={`mb-2 block ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Full Name *
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleInputChange}
                className={
                  isDark
                    ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                    : "text-black"
                }
                required
              />
            </div>
            <div>
              <Label
                htmlFor="email"
                className={`mb-2 block ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Email Address *
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleInputChange}
                className={
                  isDark
                    ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                    : "text-black"
                }
                required
              />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-6">
          <h3
            className={`text-xl font-semibold flex items-center gap-3 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            <Phone className="w-6 h-6" />
            Contact Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label
                htmlFor="phone"
                className={`mb-2 block ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Phone Number
              </Label>
              <Input
                id="phone"
                name="phone"
                placeholder="+1 (555) 000-0000"
                value={formData.phone}
                onChange={handleInputChange}
                className={
                  isDark
                    ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                    : "text-black"
                }
              />
            </div>
            <div>
              <Label
                htmlFor="address"
                className={`mb-2 block ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                <MapPin className="w-5 h-5 inline mr-2" />
                Address
              </Label>
              <Input
                id="address"
                name="address"
                placeholder="City, State, Country"
                value={formData.address}
                onChange={handleInputChange}
                className={
                  isDark
                    ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                    : "text-black"
                }
              />
            </div>
          </div>
        </div>

        {/* Professional Summary */}
        <div className="space-y-6">
          <h3
            className={`text-xl font-semibold flex items-center gap-3 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            <FileText className="w-6 h-6" />
            Professional Summary
          </h3>
          <div>
            <Textarea
              name="summary"
              placeholder="Experienced software engineer with 5+ years in web development. Passionate about creating scalable applications and leading development teams..."
              value={formData.summary}
              onChange={handleInputChange}
              rows={3}
              className={
                isDark
                  ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                  : "text-black"
              }
            />
            <p
              className={`text-sm mt-2 ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Briefly describe your professional background and key strengths
            </p>
          </div>
        </div>

        {/* Career Objective */}
        <div className="space-y-6">
          <h3
            className={`text-xl font-semibold flex items-center gap-3 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            <Target className="w-6 h-6" />
            Career Objective
          </h3>
          <div>
            <Textarea
              name="objective"
              placeholder="Seeking a challenging role as a Senior Developer where I can utilize my expertise in React and Node.js to build innovative solutions..."
              value={formData.objective}
              onChange={handleInputChange}
              rows={2}
              className={
                isDark
                  ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                  : "text-black"
              }
            />
            <p
              className={`text-sm mt-2 ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              State your career goals and what you're looking for
            </p>
          </div>
        </div>

        {/* Education */}
        <div className="space-y-6">
          <h3
            className={`text-xl font-semibold flex items-center gap-3 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            <GraduationCap className="w-6 h-6" />
            Education
          </h3>
          <div>
            <Textarea
              name="education"
              placeholder="Bachelor of Science in Computer Science, XYZ University (2020-2024)
- GPA: 3.8/4.0
- Relevant Coursework: Data Structures, Algorithms, Web Development

Diploma in Full Stack Development, ABC Institute (2024)"
              value={formData.education}
              onChange={handleInputChange}
              rows={4}
              className={
                isDark
                  ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                  : "text-black"
              }
            />
            <p
              className={`text-sm mt-2 ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Include degrees, institutions, dates, GPA, and relevant coursework
            </p>
          </div>
        </div>

        {/* Skills */}
        <div className="space-y-6">
          <h3
            className={`text-xl font-semibold flex items-center gap-3 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            <Sparkles className="w-6 h-6" />
            Skills
          </h3>
          <div>
            <Textarea
              name="skills"
              placeholder="Programming: JavaScript, TypeScript, Python, Java
Frameworks: React, Next.js, Node.js, Express
Databases: MongoDB, PostgreSQL, MySQL
Tools: Git, Docker, AWS, Jenkins
Soft Skills: Team Leadership, Problem Solving, Communication"
              value={formData.skills}
              onChange={handleInputChange}
              rows={4}
              className={
                isDark
                  ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                  : "text-black"
              }
            />
            <p
              className={`text-sm mt-2 ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              List technical skills, tools, frameworks, and soft skills
            </p>
          </div>
        </div>

        {/* Experience */}
        <div className="space-y-6">
          <h3
            className={`text-xl font-semibold flex items-center gap-3 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            <Briefcase className="w-6 h-6" />
            Work Experience
          </h3>
          <div>
            <Textarea
              name="experience"
              placeholder="Software Engineer at ABC Corp (2022-Present)
- Developed scalable web applications using React and Node.js
- Led a team of 5 developers in implementing new features
- Improved application performance by 40% through code optimization
- Implemented CI/CD pipelines reducing deployment time by 60%

Junior Developer at XYZ Tech (2020-2022)
- Built and maintained company website using Next.js
- Collaborated with UX team to improve user experience
- Wrote comprehensive unit tests achieving 90% code coverage"
              value={formData.experience}
              onChange={handleInputChange}
              rows={6}
              className={
                isDark
                  ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                  : "text-black"
              }
            />
            <p
              className={`text-sm mt-2 ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Include job titles, companies, dates, and key achievements with
              bullet points
            </p>
          </div>
        </div>

        {/* Projects */}
        <div className="space-y-6">
          <h3
            className={`text-xl font-semibold flex items-center gap-3 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            <FileText className="w-6 h-6" />
            Projects
          </h3>
          <div>
            <Textarea
              name="projects"
              placeholder="E-commerce Platform (Personal Project)
- Built full-stack e-commerce application using MERN stack
- Implemented payment integration with Stripe API
- Achieved 1000+ monthly active users

Task Management App (Open Source)
- Developed collaborative task management tool with real-time updates
- Implemented JWT authentication and role-based access control
- Open source project with 500+ GitHub stars"
              value={formData.projects}
              onChange={handleInputChange}
              rows={4}
              className={
                isDark
                  ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                  : "text-black"
              }
            />
            <p
              className={`text-sm mt-2 ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Include personal, academic, or open source projects with
              descriptions
            </p>
          </div>
        </div>

        {/* Certifications */}
        <div className="space-y-6">
          <h3
            className={`text-xl font-semibold flex items-center gap-3 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            <Award className="w-6 h-6" />
            Certifications
          </h3>
          <div>
            <Textarea
              name="certifications"
              placeholder="AWS Certified Solutions Architect - Associate (2023)
React Developer Certification - Meta (2022)
Google Cloud Professional Data Engineer (2021)"
              value={formData.certifications}
              onChange={handleInputChange}
              rows={3}
              className={
                isDark
                  ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                  : "text-black"
              }
            />
            <p
              className={`text-sm mt-2 ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              List relevant certifications, issuing organizations, and dates
            </p>
          </div>
        </div>

        {/* Generate Button */}
        <div className="pt-4">
          <Button
            className={`w-full py-6 text-lg font-semibold ${
              !isDark
                ? "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
                : "bg-purple-600 hover:bg-purple-700 text-white"
            }`}
            size="lg"
            onClick={handleSubmit}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Generating Resume...
              </>
            ) : (
              <>
                <Sparkles className="w-6 h-6 mr-2" />
                Generate AI Resume
              </>
            )}
          </Button>

          <div
            className={`text-center mt-4 text-sm ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            <p>Your AI-generated resume will appear in the browser console</p>
            <p className="mt-1">Fields marked with * are required</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
