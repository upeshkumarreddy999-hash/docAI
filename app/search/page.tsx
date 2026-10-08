"use client";

import { FormEvent, KeyboardEvent, useMemo, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";

type SearchDocument = {
  id: number;
  name: string;
  type: string;
  location: string;
  content: string;
  relevance: number;
};

const sampleDocuments: SearchDocument[] = [
  {
    id: 1,
    name: "Employee Handbook.pdf",
    type: "PDF",
    location: "Page 12",
    content:
      "Employees are entitled to 20 days of annual leave every calendar year.",
    relevance: 96,
  },
  {
    id: 2,
    name: "Company Policies.pdf",
    type: "PDF",
    location: "Page 8",
    content:
      "Annual leave requests must be submitted to the manager for approval.",
    relevance: 91,
  },
  {
    id: 3,
    name: "HR Guidelines.docx",
    type: "Word",
    location: "Section 4.2",
    content:
      "Employees should submit leave requests at least five working days in advance.",
    relevance: 87,
  },
  {
    id: 4,
    name: "Working Hours Policy.pdf",
    type: "PDF",
    location: "Page 5",
    content:
      "The standard working hours are from 9:00 AM to 6:00 PM, Monday to Friday.",
    relevance: 82,
  },
  {
    id: 5,
    name: "Employee Benefits.xlsx",
    type: "Excel",
    location: "Sheet: Benefits",
    content:
      "Employees can access health insurance, paid leave, and other company benefits.",
    relevance: 78,
  },
  {
    id: 6,
    name: "Company Overview.pptx",
    type: "PowerPoint",
    location: "Slide 6",
    content:
      "The company provides technology solutions and services to organizations worldwide.",
    relevance: 72,
  },
];

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");

  const [fileType, setFileType] = useState("All Types");
  const [sortBy, setSortBy] = useState("Relevance");

  // Search action state
  const [actionMessage, setActionMessage] = useState("");

  // Loading and error state
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState("");

  const searchResults = useMemo(() => {
    if (!submittedQuery.trim()) {
      return [];
    }

    const query = submittedQuery.toLowerCase().trim();

    const queryWords = query
      .split(/\s+/)
      .filter((word) => word.length > 1);

    let results = sampleDocuments.filter((document) => {
      const searchableText = `
        ${document.name}
        ${document.type}
        ${document.location}
        ${document.content}
      `.toLowerCase();

      const matchesSearch =
        searchableText.includes(query) ||
        queryWords.some((word) => searchableText.includes(word));

      const matchesFileType =
        fileType === "All Types" || document.type === fileType;

      return matchesSearch && matchesFileType;
    });

    if (sortBy === "Relevance") {
      results = [...results].sort(
        (a, b) => b.relevance - a.relevance
      );
    }

    if (sortBy === "Document Name") {
      results = [...results].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }

    return results;
  }, [submittedQuery, fileType, sortBy]);

  const performSearch = (query: string) => {
    setIsSearching(true);
    setSearchError("");
    setActionMessage("");

    /*
     * Frontend simulation.
     *
     * Later this delay will be replaced with
     * the real backend/API search request.
     */
    setTimeout(() => {
      /*
       * For now, searches work successfully.
       *
       * Error state is available through the Retry
       * functionality and can later be connected
       * to real API errors.
       */
      setSubmittedQuery(query);
      setIsSearching(false);
    }, 1200);
  };

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedQuery = searchQuery.trim();

    if (!trimmedQuery || isSearching) {
      return;
    }

    performSearch(trimmedQuery);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();

      const trimmedQuery = searchQuery.trim();

      if (!trimmedQuery || isSearching) {
        return;
      }

      performSearch(trimmedQuery);
    }
  };

  const handleClear = () => {
    if (isSearching) {
      return;
    }

    setSearchQuery("");
    setSubmittedQuery("");
    setFileType("All Types");
    setSortBy("Relevance");
    setActionMessage("");
    setSearchError("");
  };

  const handleClearFilters = () => {
    if (isSearching) {
      return;
    }

    setFileType("All Types");
    setSortBy("Relevance");
    setActionMessage("");
  };

  // Step 11.6 - View Document action
  const handleViewDocument = (document: SearchDocument) => {
    if (isSearching) {
      return;
    }

    setActionMessage(
      `Opening ${document.name} at ${document.location}...`
    );

    setTimeout(() => {
      setActionMessage(
        `${document.name} selected. Document viewer will be connected later.`
      );
    }, 1200);
  };

  // Step 11.6 - Ask AI action
  const handleAskAI = (document: SearchDocument) => {
    if (isSearching) {
      return;
    }

    setActionMessage(
      `Preparing AI Q&A for ${document.name}...`
    );

    setTimeout(() => {
      setActionMessage(
        `AI Q&A selected for ${document.name}. Backend connection will be added later.`
      );
    }, 1200);
  };

  // Step 11.7 - Retry search
  const handleRetry = () => {
    if (!searchQuery.trim() || isSearching) {
      return;
    }

    performSearch(searchQuery.trim());
  };

  return (
    <MainLayout>
      <div className="page-container search-page">
        {/* Page Header */}
        <div className="page-header">
          <div>
            <h1>Search Documents</h1>
            <p>
              Search across your uploaded documents and find relevant
              information quickly.
            </p>
          </div>
        </div>

        {/* Search Main Card */}
        <section className="search-main-card">
          <form
            className="search-input-section"
            onSubmit={handleSearch}
          >
            <div className="search-input-wrapper">
              <span
                className="search-input-icon"
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
                onKeyDown={handleKeyDown}
                placeholder="Search your documents..."
                aria-label="Search your documents"
                disabled={isSearching}
              />

              <button
                type="submit"
                className="search-button"
                disabled={!searchQuery.trim() || isSearching}
              >
                {isSearching ? "Searching..." : "Search"}
              </button>
            </div>

            <div className="search-input-hint">
              Search document names, content, pages, sections, and
              other information.
            </div>
          </form>

          {submittedQuery && !isSearching && (
            <div className="search-submitted-message">
              <div>
                <strong>Search query:</strong>{" "}
                <span>{submittedQuery}</span>
              </div>

              <button
                type="button"
                className="search-clear-button"
                onClick={handleClear}
                disabled={isSearching}
              >
                Clear
              </button>
            </div>
          )}
        </section>

        {/* Loading State */}
        {isSearching && (
          <section className="search-loading-state">
            <div className="search-loading-spinner" />

            <div>
              <h3>Searching your documents...</h3>
              <p>
                DocAI is searching your uploaded documents for
                relevant information.
              </p>
            </div>
          </section>
        )}

        {/* Error State */}
        {searchError && !isSearching && (
          <section className="search-error-state">
            <div className="search-error-icon">!</div>

            <div className="search-error-content">
              <h3>Unable to complete the search</h3>

              <p>{searchError}</p>

              <button
                type="button"
                className="search-retry-button"
                onClick={handleRetry}
              >
                Try Again
              </button>
            </div>
          </section>
        )}

        {/* Action Message */}
        {actionMessage && !isSearching && (
          <div className="search-action-message">
            <span>✓</span>
            <p>{actionMessage}</p>
          </div>
        )}

        {/* Search Results */}
        <section className="search-results-card">
          <div className="search-results-header">
            <div>
              <h2>Search Results</h2>

              <p>
                {submittedQuery
                  ? `Results matching "${submittedQuery}"`
                  : "Enter a search query to find matching documents and content."}
              </p>
            </div>

            <span className="search-results-count">
              {submittedQuery && !isSearching
                ? `${searchResults.length} ${
                    searchResults.length === 1
                      ? "result"
                      : "results"
                  }`
                : "0 results"}
            </span>
          </div>

          {/* Filters */}
          {submittedQuery && !isSearching && !searchError && (
            <div className="search-filters">
              <div className="search-filter-group">
                <label htmlFor="file-type">File Type</label>

                <select
                  id="file-type"
                  value={fileType}
                  onChange={(event) =>
                    setFileType(event.target.value)
                  }
                  disabled={isSearching}
                >
                  <option value="All Types">All Types</option>
                  <option value="PDF">PDF</option>
                  <option value="Word">Word</option>
                  <option value="Excel">Excel</option>
                  <option value="PowerPoint">PowerPoint</option>
                </select>
              </div>

              <div className="search-filter-group">
                <label htmlFor="sort-by">Sort By</label>

                <select
                  id="sort-by"
                  value={sortBy}
                  onChange={(event) =>
                    setSortBy(event.target.value)
                  }
                  disabled={isSearching}
                >
                  <option value="Relevance">Relevance</option>
                  <option value="Document Name">
                    Document Name
                  </option>
                </select>
              </div>

              <button
                type="button"
                className="search-clear-button"
                onClick={handleClearFilters}
                disabled={isSearching}
              >
                Clear Filters
              </button>
            </div>
          )}

          {/* Initial State */}
          {!submittedQuery && !isSearching && !searchError && (
            <div className="search-empty-state">
              <div className="search-empty-icon">🔎</div>

              <h3>Start searching your documents</h3>

              <p>
                Enter a keyword, phrase, or topic above to search
                through your uploaded documents.
              </p>
            </div>
          )}

          {/* No Results */}
          {submittedQuery &&
            !isSearching &&
            !searchError &&
            searchResults.length === 0 && (
              <div className="search-empty-state">
                <div className="search-empty-icon">📄</div>

                <h3>No matching documents found</h3>

                <p>
                  No documents match your search and selected
                  filters. Try another keyword or change the filters.
                </p>
              </div>
            )}

          {/* Results */}
          {submittedQuery &&
            !isSearching &&
            !searchError &&
            searchResults.length > 0 && (
              <div className="search-result-list">
                {searchResults.map((document) => (
                  <article
                    key={document.id}
                    className="search-result-item"
                  >
                    <div className="search-result-icon">
                      {document.type === "PDF"
                        ? "PDF"
                        : document.type === "Word"
                          ? "DOC"
                          : document.type === "Excel"
                            ? "XLS"
                            : "PPT"}
                    </div>

                    <div className="search-result-content">
                      <div className="search-result-top">
                        <div>
                          <h3>{document.name}</h3>

                          <div className="search-result-meta">
                            <span>{document.type}</span>
                            <span>•</span>
                            <span>{document.location}</span>
                          </div>
                        </div>

                        <span className="search-result-relevance">
                          {document.relevance}% match
                        </span>
                      </div>

                      <p>{document.content}</p>

                      <div className="search-result-bottom">
                        <span>
                          Matching content found in{" "}
                          {document.location}.
                        </span>

                        <div className="search-result-actions">
                          <button
                            type="button"
                            className="search-result-action"
                            onClick={() =>
                              handleViewDocument(document)
                            }
                            disabled={isSearching}
                          >
                            View Document
                          </button>

                          <button
                            type="button"
                            className="search-result-action search-ai-action"
                            onClick={() =>
                              handleAskAI(document)
                            }
                            disabled={isSearching}
                          >
                            Ask AI
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
        </section>
      </div>
    </MainLayout>
  );
}