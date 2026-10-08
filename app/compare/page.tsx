"use client";

import { useMemo, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";

type CompareDocument = {
  id: number;
  name: string;
  type: string;
  size: string;
  updated: string;
};

type DifferenceType = "changed" | "important" | "matching";

type ComparisonDifference = {
  id: number;
  type: DifferenceType;
  title: string;
  documentOne: string;
  documentTwo: string;
  description: string;
  location: string;
};

const availableDocuments: CompareDocument[] = [
  {
    id: 1,
    name: "Employee Handbook.pdf",
    type: "PDF",
    size: "2.4 MB",
    updated: "Oct 5, 2026",
  },
  {
    id: 2,
    name: "Company Policies.pdf",
    type: "PDF",
    size: "1.8 MB",
    updated: "Oct 4, 2026",
  },
  {
    id: 3,
    name: "HR Guidelines.docx",
    type: "Word",
    size: "856 KB",
    updated: "Oct 3, 2026",
  },
  {
    id: 4,
    name: "Working Hours Policy.pdf",
    type: "PDF",
    size: "1.2 MB",
    updated: "Oct 2, 2026",
  },
  {
    id: 5,
    name: "Employee Benefits.xlsx",
    type: "Excel",
    size: "645 KB",
    updated: "Oct 1, 2026",
  },
  {
    id: 6,
    name: "Company Overview.pptx",
    type: "PowerPoint",
    size: "4.1 MB",
    updated: "Sep 30, 2026",
  },
];

const comparisonDifferences: ComparisonDifference[] = [
  {
    id: 1,
    type: "changed",
    title: "Annual Leave Entitlement",
    documentOne: "20 days",
    documentTwo: "25 days",
    description:
      "The annual leave entitlement has increased by 5 days in Document 2.",
    location: "Annual Leave Policy • Page 12",
  },
  {
    id: 2,
    type: "important",
    title: "Approval Authority",
    documentOne: "Reporting manager",
    documentTwo: "Department manager",
    description:
      "The approval authority is different between the two documents.",
    location: "Annual Leave Policy • Page 12",
  },
  {
    id: 3,
    type: "changed",
    title: "Leave Request Timing",
    documentOne: "No advance notice specified",
    documentTwo: "At least five working days in advance",
    description:
      "Document 2 introduces a five-working-day advance submission requirement.",
    location: "Leave Request Process • Page 8",
  },
  {
    id: 4,
    type: "matching",
    title: "Policy Topic",
    documentOne: "Annual Leave Policy",
    documentTwo: "Annual Leave Policy",
    description:
      "Both documents contain information about the annual leave policy.",
    location: "Annual Leave Policy",
  },
];

const documentContent = {
  documentOne: {
    section: "Annual Leave Policy",
  },
  documentTwo: {
    section: "Annual Leave Policy",
  },
};

export default function ComparePage() {
  const [documentOne, setDocumentOne] =
    useState<CompareDocument | null>(null);

  const [documentTwo, setDocumentTwo] =
    useState<CompareDocument | null>(null);

  const [activeSelector, setActiveSelector] = useState<
    "one" | "two" | null
  >(null);

  const [searchQuery, setSearchQuery] = useState("");

  const [isComparing, setIsComparing] = useState(false);

  const [comparisonStarted, setComparisonStarted] =
    useState(false);

  const [comparisonError, setComparisonError] =
    useState("");

  const [showDifferences, setShowDifferences] =
    useState(true);

  const [resultFilter, setResultFilter] =
    useState<"all" | "changed" | "important" | "matching">(
      "all"
    );

  const [actionMessage, setActionMessage] =
    useState("");

  const [isActionRunning, setIsActionRunning] =
    useState(false);

  const filteredDocuments = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    if (!query) {
      return availableDocuments;
    }

    return availableDocuments.filter((document) =>
      `${document.name} ${document.type}`
        .toLowerCase()
        .includes(query)
    );
  }, [searchQuery]);

  const filteredDifferences = useMemo(() => {
    if (resultFilter === "all") {
      return comparisonDifferences;
    }

    return comparisonDifferences.filter(
      (difference) => difference.type === resultFilter
    );
  }, [resultFilter]);

  const isSelected = (document: CompareDocument) => {
    return (
      documentOne?.id === document.id ||
      documentTwo?.id === document.id
    );
  };

  const selectDocument = (document: CompareDocument) => {
    if (isSelected(document) || isComparing) {
      return;
    }

    if (activeSelector === "one") {
      setDocumentOne(document);
    }

    if (activeSelector === "two") {
      setDocumentTwo(document);
    }

    setActiveSelector(null);
    setSearchQuery("");
    setComparisonStarted(false);
    setComparisonError("");
    setActionMessage("");
  };

  const handleOpenSelector = (target: "one" | "two") => {
    if (isComparing || isActionRunning) {
      return;
    }

    setActiveSelector(target);
    setSearchQuery("");
    setComparisonError("");
  };

  const handleRemoveDocument = (target: "one" | "two") => {
    if (isComparing || isActionRunning) {
      return;
    }

    if (target === "one") {
      setDocumentOne(null);
    }

    if (target === "two") {
      setDocumentTwo(null);
    }

    setComparisonStarted(false);
    setComparisonError("");
    setActionMessage("");
  };

  const handleCompare = () => {
    if (!documentOne || !documentTwo || isComparing) {
      return;
    }

    setIsComparing(true);
    setComparisonStarted(false);
    setComparisonError("");
    setActionMessage("");

    /*
     * Frontend simulation.
     *
     * Later this will be replaced with the real
     * backend/API comparison request.
     */
    setTimeout(() => {
      /*
       * Current frontend simulation succeeds.
       *
       * Real backend errors will be handled here later.
       */
      setIsComparing(false);
      setComparisonStarted(true);
      setResultFilter("all");
    }, 1800);
  };

  const handleRetryComparison = () => {
    if (
      !documentOne ||
      !documentTwo ||
      isComparing ||
      isActionRunning
    ) {
      return;
    }

    handleCompare();
  };

  const handleCopyResults = async () => {
    if (!documentOne || !documentTwo || isActionRunning) {
      return;
    }

    const resultText = `
DocAI Comparison Report

Document 1: ${documentOne.name}
Document 2: ${documentTwo.name}

Similarity: 78%

Differences Found: 2
Important Differences: 1
Matching Sections: 1

1. Annual Leave Entitlement
Document 1: 20 days
Document 2: 25 days

2. Approval Authority
Document 1: Reporting manager
Document 2: Department manager

3. Leave Request Timing
Document 1: No advance notice specified
Document 2: At least five working days in advance

4. Policy Topic
Document 1: Annual Leave Policy
Document 2: Annual Leave Policy
`;

    try {
      await navigator.clipboard.writeText(resultText);

      setActionMessage(
        "Comparison results copied to clipboard."
      );
    } catch {
      setActionMessage(
        "Unable to copy results. Please try again."
      );
    }
  };

  const handleDownloadReport = () => {
    if (!documentOne || !documentTwo || isActionRunning) {
      return;
    }

    setIsActionRunning(true);
    setActionMessage("");

    setTimeout(() => {
      setIsActionRunning(false);

      setActionMessage(
        "Comparison report is ready. Report download will be connected to the backend later."
      );
    }, 1200);
  };

  const handleCompareAgain = () => {
    if (isActionRunning || isComparing) {
      return;
    }

    setComparisonStarted(false);
    setComparisonError("");
    setActionMessage("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleViewDocument = (
    document: CompareDocument
  ) => {
    if (isActionRunning || isComparing) {
      return;
    }

    setIsActionRunning(true);
    setActionMessage("");

    setTimeout(() => {
      setIsActionRunning(false);

      setActionMessage(
        `${document.name} selected. Document viewer will be connected later.`
      );
    }, 1000);
  };

  const handleAskAI = (document: CompareDocument) => {
    if (isActionRunning || isComparing) {
      return;
    }

    setIsActionRunning(true);
    setActionMessage("");

    setTimeout(() => {
      setIsActionRunning(false);

      setActionMessage(
        `AI Q&A selected for ${document.name}. Backend connection will be added later.`
      );
    }, 1000);
  };

  const handleClearComparison = () => {
    if (isActionRunning || isComparing) {
      return;
    }

    setDocumentOne(null);
    setDocumentTwo(null);
    setComparisonStarted(false);
    setComparisonError("");
    setResultFilter("all");
    setShowDifferences(true);
    setActionMessage("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const getFileIcon = (type: string) => {
    if (type === "PDF") {
      return "PDF";
    }

    if (type === "Word") {
      return "DOC";
    }

    if (type === "Excel") {
      return "XLS";
    }

    return "PPT";
  };

  const getDifferenceClass = (type: DifferenceType) => {
    if (type === "changed") {
      return "compare-difference-changed";
    }

    if (type === "important") {
      return "compare-difference-important";
    }

    return "compare-difference-matching";
  };

  const getDifferenceLabel = (type: DifferenceType) => {
    if (type === "changed") {
      return "Changed";
    }

    if (type === "important") {
      return "Important";
    }

    return "Matching";
  };

  const bothDocumentsSelected =
    documentOne !== null && documentTwo !== null;

  const changedCount = comparisonDifferences.filter(
    (difference) => difference.type === "changed"
  ).length;

  const importantCount = comparisonDifferences.filter(
    (difference) => difference.type === "important"
  ).length;

  const matchingCount = comparisonDifferences.filter(
    (difference) => difference.type === "matching"
  ).length;

  return (
    <MainLayout>
      <div className="page-container compare-page">

        {/* Page Header */}
        <div className="page-header">
          <div>
            <h1>Compare Documents</h1>

            <p>
              Compare two documents and identify differences,
              changes, and matching information.
            </p>
          </div>
        </div>

        <div className="compare-workspace">

          {/* Document Selection */}
          <section className="compare-selection-card">

            <div className="compare-card-header">
              <div>
                <h2>Select Documents to Compare</h2>

                <p>
                  Choose two documents from your uploaded
                  documents.
                </p>
              </div>

              <span className="compare-selection-count">
                {Number(Boolean(documentOne)) +
                  Number(Boolean(documentTwo))}
                /2 selected
              </span>
            </div>

            <div className="compare-document-grid">

              {/* Document 1 */}
              <div className="compare-document-panel">

                <div className="compare-document-panel-header">
                  <h3>Document 1</h3>

                  <span className="compare-document-number">
                    1
                  </span>
                </div>

                {documentOne ? (
                  <div className="compare-selected-document">

                    <div className="compare-selected-document-top">

                      <div className="compare-file-icon">
                        {getFileIcon(documentOne.type)}
                      </div>

                      <div className="compare-selected-document-info">

                        <h4>{documentOne.name}</h4>

                        <div className="compare-selected-document-meta">
                          <span>{documentOne.type}</span>
                          <span>•</span>
                          <span>{documentOne.size}</span>
                        </div>

                        <p>
                          Updated {documentOne.updated}
                        </p>

                      </div>

                    </div>

                    <div className="compare-selected-document-actions">

                      <button
                        type="button"
                        className="compare-change-button"
                        onClick={() =>
                          handleOpenSelector("one")
                        }
                        disabled={isComparing}
                      >
                        Change
                      </button>

                      <button
                        type="button"
                        className="compare-remove-button"
                        onClick={() =>
                          handleRemoveDocument("one")
                        }
                        disabled={isComparing}
                      >
                        Remove
                      </button>

                    </div>

                  </div>
                ) : (
                  <div className="compare-document-placeholder">

                    <div className="compare-document-placeholder-icon">
                      📄
                    </div>

                    <h4>No document selected</h4>

                    <p>
                      Select the first document that you
                      want to compare.
                    </p>

                    <button
                      type="button"
                      className="compare-select-button"
                      onClick={() =>
                        handleOpenSelector("one")
                      }
                      disabled={isComparing}
                    >
                      Select Document
                    </button>

                  </div>
                )}

              </div>

              {/* Document 2 */}
              <div className="compare-document-panel">

                <div className="compare-document-panel-header">
                  <h3>Document 2</h3>

                  <span className="compare-document-number">
                    2
                  </span>
                </div>

                {documentTwo ? (
                  <div className="compare-selected-document">

                    <div className="compare-selected-document-top">

                      <div className="compare-file-icon">
                        {getFileIcon(documentTwo.type)}
                      </div>

                      <div className="compare-selected-document-info">

                        <h4>{documentTwo.name}</h4>

                        <div className="compare-selected-document-meta">
                          <span>{documentTwo.type}</span>
                          <span>•</span>
                          <span>{documentTwo.size}</span>
                        </div>

                        <p>
                          Updated {documentTwo.updated}
                        </p>

                      </div>

                    </div>

                    <div className="compare-selected-document-actions">

                      <button
                        type="button"
                        className="compare-change-button"
                        onClick={() =>
                          handleOpenSelector("two")
                        }
                        disabled={isComparing}
                      >
                        Change
                      </button>

                      <button
                        type="button"
                        className="compare-remove-button"
                        onClick={() =>
                          handleRemoveDocument("two")
                        }
                        disabled={isComparing}
                      >
                        Remove
                      </button>

                    </div>

                  </div>
                ) : (
                  <div className="compare-document-placeholder">

                    <div className="compare-document-placeholder-icon">
                      📄
                    </div>

                    <h4>No document selected</h4>

                    <p>
                      Select the second document that you
                      want to compare.
                    </p>

                    <button
                      type="button"
                      className="compare-select-button"
                      onClick={() =>
                        handleOpenSelector("two")
                      }
                      disabled={isComparing}
                    >
                      Select Document
                    </button>

                  </div>
                )}

              </div>

            </div>

            <div className="compare-actions">

              <button
                type="button"
                className="compare-primary-button"
                disabled={
                  !bothDocumentsSelected || isComparing
                }
                onClick={handleCompare}
              >
                {isComparing
                  ? "Comparing Documents..."
                  : "Compare Documents"}
              </button>

              {!bothDocumentsSelected && (
                <p className="compare-action-hint">
                  Select two documents to enable comparison.
                </p>
              )}

            </div>

          </section>

          {/* Document Selector */}
          {activeSelector && (
            <section className="compare-document-selector">

              <div className="compare-selector-header">

                <div>
                  <h2>
                    Select Document{" "}
                    {activeSelector === "one" ? "1" : "2"}
                  </h2>

                  <p>
                    Choose a document from your uploaded
                    documents.
                  </p>
                </div>

                <button
                  type="button"
                  className="compare-selector-close"
                  onClick={() => {
                    setActiveSelector(null);
                    setSearchQuery("");
                  }}
                  aria-label="Close document selector"
                >
                  ×
                </button>

              </div>

              <div className="compare-selector-search">

                <span
                  className="compare-selector-search-icon"
                  aria-hidden="true"
                >
                  🔎
                </span>

                <input
                  type="text"
                  value={searchQuery}
                  onChange={(event) =>
                    setSearchQuery(event.target.value)
                  }
                  placeholder="Search documents..."
                  aria-label="Search documents"
                  disabled={isComparing}
                />

              </div>

              <div className="compare-document-list">

                {filteredDocuments.length > 0 ? (
                  filteredDocuments.map((document) => {
                    const alreadySelected =
                      isSelected(document);

                    return (
                      <button
                        key={document.id}
                        type="button"
                        className={`compare-document-option ${
                          alreadySelected
                            ? "compare-document-option-selected"
                            : ""
                        }`}
                        onClick={() =>
                          selectDocument(document)
                        }
                        disabled={
                          alreadySelected || isComparing
                        }
                      >

                        <div className="compare-option-file-icon">
                          {getFileIcon(document.type)}
                        </div>

                        <div className="compare-option-content">

                          <strong>{document.name}</strong>

                          <span>
                            {document.type} •{" "}
                            {document.size} • Updated{" "}
                            {document.updated}
                          </span>

                        </div>

                        <div className="compare-option-status">
                          {alreadySelected
                            ? "Selected"
                            : "Select"}
                        </div>

                      </button>
                    );
                  })
                ) : (
                  <div className="compare-no-documents">

                    <div>📄</div>

                    <h3>No documents found</h3>

                    <p>
                      Try searching with a different
                      document name.
                    </p>

                  </div>
                )}

              </div>

            </section>
          )}

          {/* Action Message */}
          {actionMessage && (
            <div className="compare-action-message">
              <span>✓</span>

              <p>{actionMessage}</p>
            </div>
          )}

          {/* 12.7 Loading State */}
          {isComparing && (
            <section className="compare-loading-state">

              <div className="compare-loading-spinner" />

              <div>
                <h3>Comparing documents...</h3>

                <p>
                  DocAI is analyzing the selected documents
                  and identifying relevant differences.
                </p>

                <span className="compare-loading-note">
                  Please wait while the comparison is being
                  processed.
                </span>
              </div>

            </section>
          )}

          {/* 12.7 Error State */}
          {comparisonError && !isComparing && (
            <section className="compare-error-state">

              <div className="compare-error-icon">
                !
              </div>

              <div className="compare-error-content">

                <h3>
                  Unable to compare documents
                </h3>

                <p>{comparisonError}</p>

                <button
                  type="button"
                  className="compare-retry-button"
                  onClick={handleRetryComparison}
                  disabled={isActionRunning}
                >
                  Try Again
                </button>

              </div>

            </section>
          )}

          {/* Comparison Results */}
          {comparisonStarted &&
            documentOne &&
            documentTwo &&
            !isComparing &&
            !comparisonError && (
              <section className="compare-results-workspace">

                {/* Results Header */}
                <div className="compare-results-header">

                  <div>
                    <h2>Comparison Results</h2>

                    <p>
                      Comparison between{" "}
                      <strong>{documentOne.name}</strong> and{" "}
                      <strong>{documentTwo.name}</strong>
                    </p>
                  </div>

                  <span className="compare-completed-badge">
                    Comparison Complete
                  </span>

                </div>

                {/* Comparison Actions */}
                <div className="compare-results-actions">

                  <button
                    type="button"
                    className="compare-action-button"
                    onClick={handleCopyResults}
                    disabled={isActionRunning}
                  >
                    📋 Copy Results
                  </button>

                  <button
                    type="button"
                    className="compare-action-button"
                    onClick={handleDownloadReport}
                    disabled={isActionRunning}
                  >
                    📥{" "}
                    {isActionRunning
                      ? "Preparing..."
                      : "Download Report"}
                  </button>

                  <button
                    type="button"
                    className="compare-action-button"
                    onClick={handleCompareAgain}
                    disabled={isActionRunning}
                  >
                    🔄 Compare Again
                  </button>

                  <button
                    type="button"
                    className="compare-action-button compare-danger-action"
                    onClick={handleClearComparison}
                    disabled={isActionRunning}
                  >
                    Clear Comparison
                  </button>

                </div>

                {/* Summary */}
                <div className="compare-summary-grid">

                  <div className="compare-summary-card">
                    <span>Documents Compared</span>
                    <strong>2</strong>
                    <small>Selected documents</small>
                  </div>

                  <div className="compare-summary-card">
                    <span>Similarity</span>
                    <strong>78%</strong>
                    <small>Overall similarity</small>
                  </div>

                  <div className="compare-summary-card">
                    <span>Differences</span>
                    <strong>{changedCount}</strong>
                    <small>Content changes</small>
                  </div>

                  <div className="compare-summary-card">
                    <span>Important</span>
                    <strong>{importantCount}</strong>
                    <small>Important changes</small>
                  </div>

                </div>

                {/* Result Navigation */}
                <div className="compare-results-navigation">

                  <button
                    type="button"
                    className={
                      resultFilter === "all"
                        ? "compare-result-tab compare-result-tab-active"
                        : "compare-result-tab"
                    }
                    onClick={() => setResultFilter("all")}
                  >
                    All Results
                    <span>
                      {comparisonDifferences.length}
                    </span>
                  </button>

                  <button
                    type="button"
                    className={
                      resultFilter === "changed"
                        ? "compare-result-tab compare-result-tab-active"
                        : "compare-result-tab"
                    }
                    onClick={() =>
                      setResultFilter("changed")
                    }
                  >
                    Changed
                    <span>{changedCount}</span>
                  </button>

                  <button
                    type="button"
                    className={
                      resultFilter === "important"
                        ? "compare-result-tab compare-result-tab-active"
                        : "compare-result-tab"
                    }
                    onClick={() =>
                      setResultFilter("important")
                    }
                  >
                    Important
                    <span>{importantCount}</span>
                  </button>

                  <button
                    type="button"
                    className={
                      resultFilter === "matching"
                        ? "compare-result-tab compare-result-tab-active"
                        : "compare-result-tab"
                    }
                    onClick={() =>
                      setResultFilter("matching")
                    }
                  >
                    Matching
                    <span>{matchingCount}</span>
                  </button>

                </div>

                {/* Highlight Toolbar */}
                <div className="compare-difference-toolbar">

                  <div className="compare-difference-legend">

                    <span className="compare-legend-title">
                      Difference Types
                    </span>

                    <span className="compare-legend-item">
                      <span className="compare-legend-dot compare-legend-changed" />
                      Changed
                    </span>

                    <span className="compare-legend-item">
                      <span className="compare-legend-dot compare-legend-important" />
                      Important
                    </span>

                    <span className="compare-legend-item">
                      <span className="compare-legend-dot compare-legend-matching" />
                      Matching
                    </span>

                  </div>

                  <button
                    type="button"
                    className="compare-toggle-button"
                    onClick={() =>
                      setShowDifferences((current) => !current)
                    }
                    disabled={isActionRunning}
                  >
                    {showDifferences
                      ? "Hide Highlights"
                      : "Show Highlights"}
                  </button>

                </div>

                {/* Side-by-Side Content */}
                <div className="compare-side-by-side">

                  {/* Document One */}
                  <article className="compare-content-panel">

                    <div className="compare-content-panel-header">

                      <div className="compare-content-file-icon">
                        {getFileIcon(documentOne.type)}
                      </div>

                      <div>
                        <h3>{documentOne.name}</h3>

                        <span>
                          {documentOne.type}
                        </span>
                      </div>

                    </div>

                    <div className="compare-content-body">

                      <span className="compare-section-label">
                        {documentContent.documentOne.section}
                      </span>

                      <p>
                        Employees are entitled to{" "}
                        {showDifferences ? (
                          <mark className="compare-highlight-changed">
                            20 days
                          </mark>
                        ) : (
                          "20 days"
                        )}{" "}
                        of annual leave every calendar year.
                      </p>

                      <p>
                        Leave requests should be submitted to the{" "}
                        {showDifferences ? (
                          <mark className="compare-highlight-important">
                            reporting manager
                          </mark>
                        ) : (
                          "reporting manager"
                        )}{" "}
                        for approval.
                      </p>

                      <div className="compare-document-actions-row">

                        <button
                          type="button"
                          className="compare-document-action"
                          onClick={() =>
                            handleViewDocument(documentOne)
                          }
                          disabled={isActionRunning}
                        >
                          📄 View Document
                        </button>

                        <button
                          type="button"
                          className="compare-document-action"
                          onClick={() =>
                            handleAskAI(documentOne)
                          }
                          disabled={isActionRunning}
                        >
                          🤖 Ask AI
                        </button>

                      </div>

                    </div>

                  </article>

                  {/* Document Two */}
                  <article className="compare-content-panel">

                    <div className="compare-content-panel-header">

                      <div className="compare-content-file-icon">
                        {getFileIcon(documentTwo.type)}
                      </div>

                      <div>
                        <h3>{documentTwo.name}</h3>

                        <span>
                          {documentTwo.type}
                        </span>
                      </div>

                    </div>

                    <div className="compare-content-body">

                      <span className="compare-section-label">
                        {documentContent.documentTwo.section}
                      </span>

                      <p>
                        Employees are entitled to{" "}
                        {showDifferences ? (
                          <mark className="compare-highlight-changed">
                            25 days
                          </mark>
                        ) : (
                          "25 days"
                        )}{" "}
                        of annual leave every calendar year.
                      </p>

                      <p>
                        Leave requests must be submitted to the{" "}
                        {showDifferences ? (
                          <mark className="compare-highlight-important">
                            department manager
                          </mark>
                        ) : (
                          "department manager"
                        )}{" "}
                        at least{" "}
                        {showDifferences ? (
                          <mark className="compare-highlight-changed">
                            five working days in advance
                          </mark>
                        ) : (
                          "five working days in advance"
                        )}.
                      </p>

                      <div className="compare-document-actions-row">

                        <button
                          type="button"
                          className="compare-document-action"
                          onClick={() =>
                            handleViewDocument(documentTwo)
                          }
                          disabled={isActionRunning}
                        >
                          📄 View Document
                        </button>

                        <button
                          type="button"
                          className="compare-document-action"
                          onClick={() =>
                            handleAskAI(documentTwo)
                          }
                          disabled={isActionRunning}
                        >
                          🤖 Ask AI
                        </button>

                      </div>

                    </div>

                  </article>

                </div>

                {/* Detailed Results */}
                <div className="compare-difference-details">

                  <div className="compare-difference-details-header">

                    <div>
                      <h2>Comparison Details</h2>

                      <p>
                        Detailed findings from the document
                        comparison.
                      </p>
                    </div>

                    <span>
                      {filteredDifferences.length}{" "}
                      {filteredDifferences.length === 1
                        ? "finding"
                        : "findings"}
                    </span>

                  </div>

                  <div className="compare-difference-list">

                    {filteredDifferences.length > 0 ? (
                      filteredDifferences.map(
                        (difference) => (
                          <article
                            key={difference.id}
                            className={`compare-difference-item ${getDifferenceClass(
                              difference.type
                            )}`}
                          >

                            <div className="compare-difference-item-marker">
                              {difference.type ===
                              "matching"
                                ? "✓"
                                : difference.type ===
                                    "important"
                                  ? "!"
                                  : "↔"}
                            </div>

                            <div className="compare-difference-item-content">

                              <div className="compare-difference-item-top">

                                <div>
                                  <h3>
                                    {difference.title}
                                  </h3>

                                  <small>
                                    {difference.location}
                                  </small>
                                </div>

                                <span>
                                  {getDifferenceLabel(
                                    difference.type
                                  )}
                                </span>

                              </div>

                              <div className="compare-difference-values">

                                <div>
                                  <small>
                                    Document 1
                                  </small>

                                  <p>
                                    {difference.documentOne}
                                  </p>

                                </div>

                                <div>
                                  <small>
                                    Document 2
                                  </small>

                                  <p>
                                    {difference.documentTwo}
                                  </p>
                                </div>

                              </div>

                              <p className="compare-difference-description">
                                {difference.description}
                              </p>

                            </div>

                          </article>
                        )
                      )
                    ) : (
                      <div className="compare-no-results">

                        <div>✓</div>

                        <h3>
                          No results in this category
                        </h3>

                        <p>
                          Select another result category
                          to view comparison findings.
                        </p>

                      </div>
                    )}

                  </div>

                </div>

              </section>
            )}

          {/* Information Card */}
          <section className="compare-info-card">

            <div className="compare-info-icon">
              💡
            </div>

            <div>
              <strong>
                How Document Comparison works
              </strong>

              <p>
                Select two uploaded documents. DocAI analyzes
                their content and identifies matching
                information, changes, and important differences.
              </p>
            </div>

          </section>

        </div>
      </div>
    </MainLayout>
  );
}