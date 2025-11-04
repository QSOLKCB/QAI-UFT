import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ExternalLink, Download, FileText } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function QSOLUploadDashboard() {
  const visualPreviews = [
    {
      src: 'https://images.unsplash.com/photo-1728406970522-1d42256abec8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWNyZWQlMjBnZW9tZXRyeSUyMHJpbmclMjBwYXR0ZXJufGVufDF8fHx8MTc2MjI0NDIzM3ww&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Sexagesimal Ring',
      alt: 'Sexagesimal Ring Visualization'
    },
    {
      src: 'https://images.unsplash.com/photo-1651649507836-8f84ca48a35c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxETkElMjBoZWxpeCUyMHJpYmJvbiUyMHNjaWVuY2V8ZW58MXx8fHwxNzYyMjQ0MjMzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Trinary DNA Ribbon',
      alt: 'Trinary DNA Ribbon Visualization'
    },
    {
      src: 'https://images.unsplash.com/photo-1653110685395-69bf7f9fc1ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXJjdWxhciUyMHdoZWVsJTIwZGlhZ3JhbXxlbnwxfHx8fDE3NjIyNDQyMzR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Codon Wheel',
      alt: 'Codon Wheel Visualization'
    }
  ];

  const handleDownload = () => {
    window.open('https://doi.org/10.5281/zenodo.17520187', '_blank');
  };

  const handleViewReadme = () => {
    window.open('https://doi.org/10.5281/zenodo.17520187', '_blank');
  };

  return (
    <section className="w-full max-w-[1440px] mx-auto bg-white rounded-lg shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-50 to-blue-50 border-b border-slate-200 px-12 py-10">
        <div className="max-w-5xl">
          <h1 className="text-[#203040] mb-3" style={{ fontSize: '48px', lineHeight: '1.2' }}>
            QSOL Unified Field Framework
          </h1>
          <h2 className="text-[#405060]" style={{ fontSize: '24px', lineHeight: '1.4' }}>
            Resonance as Embodied Physics
          </h2>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-12 py-8 space-y-8">
        {/* Links Section */}
        <div className="space-y-3">
          <a
            href="https://qainn.space/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors group"
          >
            <span className="text-[#203040]">Web portal:</span>
            <span className="underline decoration-blue-400 group-hover:decoration-blue-600">qainn.space</span>
            <ExternalLink className="w-4 h-4" />
          </a>
          <br />
          <a
            href="https://doi.org/10.5281/zenodo.17520187"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors group"
          >
            <span className="text-[#203040]">Archive:</span>
            <span className="underline decoration-blue-400 group-hover:decoration-blue-600">
              Zenodo DOI 10.5281/zenodo.17520187
            </span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-2">
          <Button
            onClick={handleDownload}
            className="bg-[#1E88E5] hover:bg-[#1976D2] text-white px-6 py-5 gap-2"
          >
            <Download className="w-4 h-4" />
            Download Package
          </Button>
          <Button
            onClick={handleViewReadme}
            variant="outline"
            className="border-2 border-[#1E88E5] text-[#1E88E5] hover:bg-blue-50 px-6 py-5 gap-2"
          >
            <FileText className="w-4 h-4" />
            View README
          </Button>
        </div>

        {/* Visual Previews */}
        <div className="pt-4">
          <h3 className="text-[#203040] mb-4">Visual Previews</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {visualPreviews.map((preview) => (
              <Card key={preview.title} className="overflow-hidden border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="aspect-square bg-slate-100 overflow-hidden">
                  <ImageWithFallback
                    src={preview.src}
                    alt={preview.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 bg-white">
                  <p className="text-center text-[#405060]">{preview.title}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Metadata Card */}
        <div className="pt-4">
          <h3 className="text-[#203040] mb-4">Publication Metadata</h3>
          <Card className="bg-[#F7F9FA] border-slate-200 p-6 shadow-sm">
            <div className="space-y-4">
              <div>
                <dt className="text-sm text-[#405060] mb-1">Title</dt>
                <dd className="text-[#203040]">
                  QSOL Unified Field Framework: Resonance as Embodied Physics
                </dd>
              </div>
              
              <div>
                <dt className="text-sm text-[#405060] mb-1">Author</dt>
                <dd className="text-[#203040]">
                  Trent Slade (QSOL Research Initiative)
                </dd>
              </div>
              
              <div>
                <dt className="text-sm text-[#405060] mb-1">License</dt>
                <dd className="text-[#203040]">
                  Creative Commons Attribution 4.0 International (CC BY 4.0)
                </dd>
              </div>
              
              <div>
                <dt className="text-sm text-[#405060] mb-1">Publication Date</dt>
                <dd className="text-[#203040]">November 4, 2025</dd>
              </div>
              
              <div>
                <dt className="text-sm text-[#405060] mb-1">DOI</dt>
                <dd>
                  <a
                    href="https://doi.org/10.5281/zenodo.17520187"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1E88E5] hover:text-[#1976D2] underline"
                  >
                    10.5281/zenodo.17520187
                  </a>
                </dd>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-200 bg-slate-50 px-12 py-6">
        <p className="text-sm text-[#405060] text-center">
          © 2025 Trent Slade / QSOL-IMC. All rights reserved. Licensed under{' '}
          <a
            href="https://creativecommons.org/licenses/by/4.0/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#1E88E5] hover:text-[#1976D2] underline"
          >
            CC BY 4.0
          </a>
          .
        </p>
      </div>
    </section>
  );
}
