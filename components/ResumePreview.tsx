// components/ResumePreview.tsx
'use client';

interface ResumePreviewProps {
  markdown: string;
  filename: string;
}

export default function ResumePreview({ markdown, filename }: ResumePreviewProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mt-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">Resume Preview</h3>
        <button
          onClick={() => {
            const blob = new Blob([markdown], { type: 'text/markdown' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            a.click();
          }}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Download .md
        </button>
      </div>
      <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded border overflow-auto max-h-96">
        <pre className="whitespace-pre-wrap font-mono text-sm">
          {markdown}
        </pre>
      </div>
      <div className="mt-4 text-sm text-gray-500">
        This Markdown file can be:
        <ul className="list-disc pl-5 mt-2">
          <li>Opened in any text editor</li>
          <li>Converted to PDF using tools like Pandoc</li>
          <li>Pasted into job portals</li>
          <li>Used with resume builders</li>
        </ul>
      </div>
    </div>
  );
}