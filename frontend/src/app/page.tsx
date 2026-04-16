"use client";

import { useState, useRef } from "react";
import NdaForm from "./components/NdaForm";
import NdaPreview from "./components/NdaPreview";
import { NdaFormData, defaultFormData } from "./types";

type View = "form" | "preview";

export default function Home() {
  const [formData, setFormData] = useState<NdaFormData>(defaultFormData);
  const [view, setView] = useState<View>("form");
  const [isGenerating, setIsGenerating] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleDownloadPdf = async () => {
    const element = previewRef.current;
    if (!element) return;

    setIsGenerating(true);
    try {
      const html2pdf = (await import("html2pdf.js")).default;
      const opt = {
        margin: [0.5, 0.5, 0.5, 0.5],
        filename: "Mutual-NDA.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
        pagebreak: {
          mode: ["css", "legacy"],
          before: ["[style*='page-break-before']"],
        },
      };
      await html2pdf().set(opt).from(element).save();
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-slate-900">
            Prelegal
            <span className="text-sm font-normal text-slate-500 ml-2">
              Mutual NDA Creator Ashwin
            </span>
          </h1>
          {view === "preview" && (
            <div className="flex gap-3">
              <button
                onClick={() => setView("form")}
                className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors cursor-pointer"
              >
                Back to Form
              </button>
              <button
                onClick={handleDownloadPdf}
                disabled={isGenerating}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 cursor-pointer"
              >
                {isGenerating ? "Generating PDF..." : "Download PDF"}
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {view === "form" ? (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8">
            <h2 className="text-lg font-semibold text-slate-900 mb-6">
              Fill in the NDA Details
            </h2>
            <NdaForm
              formData={formData}
              onChange={setFormData}
              onSubmit={() => setView("preview")}
            />
          </div>
        ) : (
          <div className="space-y-4">
            <div
              ref={previewRef}
              className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden"
            >
              <NdaPreview formData={formData} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
