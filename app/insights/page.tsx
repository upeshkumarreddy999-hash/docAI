"use client";

import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";

type InsightDocument = {
  id: number;
  name: string;
  type: string;
  size: string;
  updated: string;
};

type AnalysisOption = {
  id: "summary" | "keyPoints" | "insights" | "actionItems";
  title: string;
  description: string;
  icon: string;
};

type InsightResult = {
  summary: string;
  keyPoints: string[];
  insights: string[];
  actionItems: string[];
};

const documents: InsightDocument[] = [
  {
    id: 1,
    name: "Product Documentation.pdf",
    type: "PDF",
    size: "2.4 MB",
    updated: "Today",
  },
  {
    id: 2,
    name: "Financial Report.xlsx",
    type: "Excel",
    size: "1.8 MB",
    updated: "Yesterday",
  },
  {
    id: 3,
    name: "Technical Manual.docx",
    type: "Word",
    size: "3.1 MB",
    updated: "2 days ago",
  },
  {
    id: 4,
    name: "Project Report.pptx",
    type: "PowerPoint",
    size: "5.2 MB",
    updated: "3 days ago",
  },
  {
    id: 5,
    name: "Research Paper.pdf",
    type: "PDF",
    size: "4.6 MB",
    updated: "5 days ago",
  },
];

const analysisOptions: AnalysisOption[] = [
  {
    id: "summary",
    title: "Summary",
    description:
      "Generate a clear summary of the main content of the document.",
    icon: "📝",
  },
  {
    id: "keyPoints",
    title: "Key Points",
    description:
      "Identify the most important points and information from the document.",
    icon: "📌",
  },
  {
    id: "insights",
    title: "Important Insights",
    description:
      "Extract useful insights, findings, trends, and meaningful information.",
    icon: "💡",
  },
  {
    id: "actionItems",
    title: "Action Items",
    description:
      "Identify tasks, recommendations, decisions, or actions mentioned in the document.",
    icon: "✅",
  },
];

const sampleResults: InsightResult = {
  summary:
    "The document provides an overview of a product, including its main capabilities, usage guidelines, important features, and operational considerations. It explains how the product can be used and highlights information that users should understand before working with it.",

  keyPoints: [
    "The document describes the main purpose and capabilities of the product.",
    "Important features and supported functionality are explained.",
    "The document provides guidance for using the product effectively.",
    "Operational considerations and important requirements are highlighted.",
    "The information is organized to help users understand the product quickly.",
  ],

  insights: [
    "The document focuses on practical information that can help users work with the product.",
    "Several sections emphasize correct usage and understanding of available functionality.",
    "The information can be used as a reference when making product-related decisions.",
  ],

  actionItems: [
    "Review the documented product capabilities.",
    "Follow the usage guidelines provided in the document.",
    "Verify important requirements before using the product.",
    "Refer back to the document when additional product information is required.",
  ],
};

export default function InsightsPage() {
  const [selectedDocument, setSelectedDocument] =
    useState<InsightDocument | null>(null);

  const [selectedOptions, setSelectedOptions] = useState<
    AnalysisOption["id"][]
  >([]);

  const [isGenerating, setIsGenerating] = useState(false);

  const [generationComplete, setGenerationComplete] = useState(false);

  const [generationError, setGenerationError] = useState("");

  const [results, setResults] = useState<InsightResult | null>(null);

  const [actionMessage, setActionMessage] = useState("");

  const toggleAnalysisOption = (optionId: AnalysisOption["id"]) => {
    if (isGenerating) {
      return;
    }

    setGenerationComplete(false);
    setGenerationError("");
    setResults(null);
    setActionMessage("");

    setSelectedOptions((currentOptions) => {
      if (currentOptions.includes(optionId)) {
        return currentOptions.filter((id) => id !== optionId);
      }

      return [...currentOptions, optionId];
    });
  };

  const handleDocumentSelect = (document: InsightDocument) => {
    if (isGenerating) {
      return;
    }

    setSelectedDocument(document);
    setGenerationComplete(false);
    setGenerationError("");
    setResults(null);
    setActionMessage("");
  };

  const handleGenerateInsights = () => {
    if (!selectedDocument || selectedOptions.length === 0 || isGenerating) {
      return;
    }

    setIsGenerating(true);
    setGenerationComplete(false);
    setGenerationError("");
    setResults(null);
    setActionMessage("");

    setTimeout(() => {
      setIsGenerating(false);
      setGenerationComplete(true);
      setGenerationError("");
      setResults(sampleResults);
    }, 2000);
  };

  const handleRetryGeneration = () => {
    if (!selectedDocument || selectedOptions.length === 0 || isGenerating) {
      return;
    }

    setGenerationError("");
    setGenerationComplete(false);
    setResults(null);
    setActionMessage("");

    handleGenerateInsights();
  };

  const handleGenerateAgain = () => {
    setGenerationComplete(false);
    setGenerationError("");
    setResults(null);
    setActionMessage("");

    if (!selectedDocument || selectedOptions.length === 0) {
      return;
    }

    setIsGenerating(true);

    setTimeout(() => {
      setIsGenerating(false);
      setGenerationComplete(true);
      setGenerationError("");
      setResults(sampleResults);
    }, 2000);
  };

  const getSelectedResultText = () => {
    if (!results || !selectedDocument) {
      return "";
    }

    const sections: string[] = [];

    if (selectedOptions.includes("summary")) {
      sections.push(`SUMMARY\n${results.summary}`);
    }

    if (selectedOptions.includes("keyPoints")) {
      sections.push(
        `KEY POINTS\n${results.keyPoints
          .map((point, index) => `${index + 1}. ${point}`)
          .join("\n")}`,
      );
    }

    if (selectedOptions.includes("insights")) {
      sections.push(
        `IMPORTANT INSIGHTS\n${results.insights
          .map((insight, index) => `${index + 1}. ${insight}`)
          .join("\n")}`,
      );
    }

    if (selectedOptions.includes("actionItems")) {
      sections.push(
        `ACTION ITEMS\n${results.actionItems
          .map((action, index) => `${index + 1}. ${action}`)
          .join("\n")}`,
      );
    }

    return `DocAI - Document Insights

Document: ${selectedDocument.name}
Generated: ${new Date().toLocaleString()}

${sections.join("\n\n")}`;
  };

  const handleCopyResults = async () => {
    const text = getSelectedResultText();

    if (!text) {
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      setActionMessage("Insights copied to clipboard.");
    } catch {
      setActionMessage("Unable to copy insights.");
    }
  };

  const handleDownloadResults = () => {
    const text = getSelectedResultText();

    if (!text) {
      return;
    }

    const blob = new Blob([text], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "docai-insights.txt";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    setActionMessage("Insights downloaded successfully.");
  };

  const handleClearResults = () => {
    setResults(null);
    setGenerationComplete(false);
    setGenerationError("");
    setActionMessage("Generated insights cleared.");
  };

  const handleViewSource = () => {
    if (!selectedDocument) {
      return;
    }

    setActionMessage(
      `Source document selected: ${selectedDocument.name}. Document viewer will be connected later.`,
    );
  };

  const getDocumentIcon = (type: string) => {
    if (type === "PDF") return "PDF";
    if (type === "Excel") return "XLS";
    if (type === "Word") return "DOC";
    if (type === "PowerPoint") return "PPT";

    return "DOC";
  };

  return (
    <MainLayout>
      <div className="page-container insights-page">
        {/* Page Header */}
        <div className="page-header">
          <div>
            <h1>Summarization & Insights</h1>

            <p>
              Analyze your documents and generate summaries, key points, and
              important insights.
            </p>
          </div>
        </div>

        {/* Document Selection */}
        <section className="insights-section">
          <div className="section-header">
            <div>
              <h2>Select Document</h2>

              <p>
                Choose a document to analyze and generate AI-powered insights.
              </p>
            </div>
          </div>

          <div className="insights-document-grid">
            {documents.map((document) => {
              const isSelected = selectedDocument?.id === document.id;

              return (
                <button
                  key={document.id}
                  type="button"
                  className={`insights-document-card ${
                    isSelected ? "selected" : ""
                  }`}
                  onClick={() => handleDocumentSelect(document)}
                  disabled={isGenerating}
                >
                  <div className="insights-document-icon">
                    {getDocumentIcon(document.type)}
                  </div>

                  <div className="insights-document-info">
                    <strong>{document.name}</strong>

                    <span>
                      {document.type} • {document.size}
                    </span>

                    <small>Updated {document.updated}</small>
                  </div>

                  <div className="insights-selection-indicator">
                    {isSelected ? "✓" : ""}
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Selected Document */}
        {selectedDocument && (
          <section className="insights-section">
            <div className="insights-selected-document">
              <div className="insights-selected-icon">
                {getDocumentIcon(selectedDocument.type)}
              </div>

              <div className="insights-selected-info">
                <span>Selected Document</span>

                <strong>{selectedDocument.name}</strong>

                <small>
                  {selectedDocument.type} • {selectedDocument.size} • Updated{" "}
                  {selectedDocument.updated}
                </small>
              </div>
            </div>
          </section>
        )}

        {/* Analysis Options */}
        <section className="insights-section">
          <div className="section-header">
            <div>
              <h2>Analysis Options</h2>

              <p>
                Select the information you want AI to generate from the
                document.
              </p>
            </div>

            <span className="insights-selected-count">
              {selectedOptions.length} selected
            </span>
          </div>

          <div className="insights-options-grid">
            {analysisOptions.map((option) => {
              const isSelected = selectedOptions.includes(option.id);

              return (
                <button
                  key={option.id}
                  type="button"
                  className={`insights-option-card ${
                    isSelected ? "selected" : ""
                  }`}
                  onClick={() => toggleAnalysisOption(option.id)}
                  disabled={isGenerating}
                >
                  <div className="insights-option-top">
                    <div className="insights-option-icon">
                      {option.icon}
                    </div>

                    <div
                      className={`insights-option-checkbox ${
                        isSelected ? "checked" : ""
                      }`}
                      aria-hidden="true"
                    >
                      {isSelected ? "✓" : ""}
                    </div>
                  </div>

                  <div className="insights-option-content">
                    <h3>{option.title}</h3>

                    <p>{option.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Generate Section */}
        <section className="insights-generate-section">
          <button
            type="button"
            className="primary-button insights-generate-button"
            disabled={
              !selectedDocument ||
              selectedOptions.length === 0 ||
              isGenerating
            }
            onClick={handleGenerateInsights}
          >
            {isGenerating ? (
              <>
                <span className="insights-loading-spinner" />
                Generating Insights...
              </>
            ) : (
              "Generate Insights"
            )}
          </button>

          {!selectedDocument && (
            <p className="insights-helper-text">
              Select a document first.
            </p>
          )}

          {selectedDocument && selectedOptions.length === 0 && (
            <p className="insights-helper-text">
              Select at least one analysis option.
            </p>
          )}

          {selectedDocument &&
            selectedOptions.length > 0 &&
            !isGenerating &&
            !generationComplete &&
            !generationError && (
              <p className="insights-helper-text">
                {selectedOptions.length} analysis option
                {selectedOptions.length !== 1 ? "s" : ""} selected.
              </p>
            )}

          {isGenerating && (
            <p className="insights-helper-text">
              AI is analyzing your document. Please wait...
            </p>
          )}

          {actionMessage && (
            <div className="insights-action-message">
              <span>✓</span>

              <p>{actionMessage}</p>
            </div>
          )}
        </section>

        {/* Empty State */}
        {!selectedDocument && !isGenerating && !generationError && (
          <section className="insights-empty-state">
            <div className="insights-empty-icon">✨</div>

            <h2>Ready to Analyze Your Document</h2>

            <p>
              Select a document above to generate an AI-powered summary, key
              points, important insights, and action items.
            </p>
          </section>
        )}

        {/* Processing State */}
        {isGenerating && (
          <section className="insights-processing-state">
            <div className="insights-processing-icon">✨</div>

            <h2>Analyzing Your Document</h2>

            <p>
              DocAI is processing the selected document and preparing your
              requested insights.
            </p>

            <div className="insights-processing-bar">
              <div className="insights-processing-progress" />
            </div>
          </section>
        )}

        {/* Error State */}
        {generationError && !isGenerating && (
          <section className="insights-error-state">
            <div className="insights-error-icon">!</div>

            <div className="insights-error-content">
              <h2>Unable to Generate Insights</h2>

              <p>{generationError}</p>

              <button
                type="button"
                className="secondary-button insights-retry-button"
                onClick={handleRetryGeneration}
                disabled={
                  !selectedDocument ||
                  selectedOptions.length === 0 ||
                  isGenerating
                }
              >
                ↻ Retry
              </button>
            </div>
          </section>
        )}

        {/* Generated Results */}
        {generationComplete && results && selectedDocument && (
          <section className="insights-results-section">
            {/* Results Header */}
            <div className="insights-results-header">
              <div>
                <span className="insights-results-label">
                  AI Analysis Complete
                </span>

                <h2>Document Insights</h2>

                <p>
                  Generated from <strong>{selectedDocument.name}</strong>
                </p>
              </div>
            </div>

            {/* Result Actions */}
            <div className="insights-results-actions">
              <button
                type="button"
                className="secondary-button insights-result-action"
                onClick={handleCopyResults}
              >
                <span>📋</span>
                Copy Results
              </button>

              <button
                type="button"
                className="secondary-button insights-result-action"
                onClick={handleDownloadResults}
              >
                <span>⬇</span>
                Download Results
              </button>

              <button
                type="button"
                className="secondary-button insights-result-action"
                onClick={handleViewSource}
              >
                <span>📄</span>
                View Source
              </button>

              <button
                type="button"
                className="secondary-button insights-result-action"
                onClick={handleGenerateAgain}
              >
                <span>↻</span>
                Regenerate
              </button>

              <button
                type="button"
                className="secondary-button insights-result-action insights-danger-action"
                onClick={handleClearResults}
              >
                <span>×</span>
                Clear Results
              </button>
            </div>

            {/* Summary */}
            {selectedOptions.includes("summary") && (
              <div className="insights-result-card">
                <div className="insights-result-heading">
                  <div className="insights-result-icon">📝</div>

                  <div>
                    <h3>Summary</h3>

                    <span>AI-generated document summary</span>
                  </div>
                </div>

                <p className="insights-summary-text">
                  {results.summary}
                </p>
              </div>
            )}

            {/* Key Points */}
            {selectedOptions.includes("keyPoints") && (
              <div className="insights-result-card">
                <div className="insights-result-heading">
                  <div className="insights-result-icon">📌</div>

                  <div>
                    <h3>Key Points</h3>

                    <span>Important information identified</span>
                  </div>
                </div>

                <ul className="insights-result-list">
                  {results.keyPoints.map((point, index) => (
                    <li key={index}>
                      <span className="insights-list-number">
                        {index + 1}
                      </span>

                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Important Insights */}
            {selectedOptions.includes("insights") && (
              <div className="insights-result-card">
                <div className="insights-result-heading">
                  <div className="insights-result-icon">💡</div>

                  <div>
                    <h3>Important Insights</h3>

                    <span>Meaningful findings from the document</span>
                  </div>
                </div>

                <ul className="insights-result-list">
                  {results.insights.map((insight, index) => (
                    <li key={index}>
                      <span className="insights-list-bullet">•</span>

                      <span>{insight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action Items */}
            {selectedOptions.includes("actionItems") && (
              <div className="insights-result-card">
                <div className="insights-result-heading">
                  <div className="insights-result-icon">✅</div>

                  <div>
                    <h3>Action Items</h3>

                    <span>Recommended actions identified</span>
                  </div>
                </div>

                <ul className="insights-result-list">
                  {results.actionItems.map((action, index) => (
                    <li key={index}>
                      <span className="insights-list-number">
                        {index + 1}
                      </span>

                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Source */}
            <div className="insights-source-card">
              <div>
                <span>Source Document</span>

                <strong>{selectedDocument.name}</strong>
              </div>

              <span className="insights-source-type">
                {selectedDocument.type}
              </span>
            </div>
          </section>
        )}
      </div>
    </MainLayout>
  );
}