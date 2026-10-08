"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";

type DocumentStatus =
  | "Ready"
  | "Processing"
  | "Failed";

type DocumentType =
  | "PDF"
  | "Word"
  | "Excel"
  | "PowerPoint"
  | "TXT"
  | "CSV"
  | "Markdown";

type DocumentItem = {
  id: number;
  name: string;
  type: DocumentType;
  size: string;
  date: string;
  status: DocumentStatus;
};

const initialDocuments: DocumentItem[] = [
  {
    id: 1,
    name: "Employee Handbook.pdf",
    type: "PDF",
    size: "2.4 MB",
    date: "Oct 05, 2026",
    status: "Ready",
  },
  {
    id: 2,
    name: "Company Policy.docx",
    type: "Word",
    size: "1.8 MB",
    date: "Oct 04, 2026",
    status: "Ready",
  },
  {
    id: 3,
    name: "Sales Report.xlsx",
    type: "Excel",
    size: "856 KB",
    date: "Oct 03, 2026",
    status: "Processing",
  },
  {
    id: 4,
    name: "Project Presentation.pptx",
    type: "PowerPoint",
    size: "4.2 MB",
    date: "Oct 02, 2026",
    status: "Ready",
  },
  {
    id: 5,
    name: "Meeting Notes.txt",
    type: "TXT",
    size: "24 KB",
    date: "Oct 01, 2026",
    status: "Failed",
  },
];

export default function DocumentsPage() {
  const [documents, setDocuments] =
    useState<DocumentItem[]>(initialDocuments);

  const [searchTerm, setSearchTerm] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [sortOption, setSortOption] =
    useState("newest");

  const [message, setMessage] = useState("");

  const getDocumentIconClass = (
    type: DocumentType
  ) => {
    switch (type) {
      case "PDF":
        return "document-icon pdf";

      case "Word":
        return "document-icon word";

      case "Excel":
        return "document-icon excel";

      case "PowerPoint":
        return "document-icon powerpoint";

      case "TXT":
      case "Markdown":
        return "document-icon text";

      case "CSV":
        return "document-icon csv";

      default:
        return "document-icon";
    }
  };

  const getDocumentIconText = (
    type: DocumentType
  ) => {
    switch (type) {
      case "PDF":
        return "PDF";

      case "Word":
        return "DOC";

      case "Excel":
        return "XLS";

      case "PowerPoint":
        return "PPT";

      case "TXT":
        return "TXT";

      case "CSV":
        return "CSV";

      case "Markdown":
        return "MD";

      default:
        return "FILE";
    }
  };

  const getStatusClass = (
    status: DocumentStatus
  ) => {
    switch (status) {
      case "Ready":
        return "document-status ready";

      case "Processing":
        return "document-status processing";

      case "Failed":
        return "document-status failed";

      default:
        return "document-status";
    }
  };

  const filteredDocuments = useMemo(() => {
    let result = [...documents];

    if (searchTerm.trim()) {
      const search = searchTerm
        .toLowerCase()
        .trim();

      result = result.filter((document) =>
        document.name
          .toLowerCase()
          .includes(search)
      );
    }

    if (statusFilter !== "All") {
      result = result.filter(
        (document) =>
          document.status === statusFilter
      );
    }

    if (sortOption === "name-asc") {
      result.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }

    if (sortOption === "name-desc") {
      result.sort((a, b) =>
        b.name.localeCompare(a.name)
      );
    }

    if (sortOption === "newest") {
      result.sort((a, b) => b.id - a.id);
    }

    if (sortOption === "oldest") {
      result.sort((a, b) => a.id - b.id);
    }

    return result;
  }, [
    documents,
    searchTerm,
    statusFilter,
    sortOption,
  ]);

  const readyCount = documents.filter(
    (document) => document.status === "Ready"
  ).length;

  const processingCount = documents.filter(
    (document) => document.status === "Processing"
  ).length;

  const failedCount = documents.filter(
    (document) => document.status === "Failed"
  ).length;

  const handleView = (
    documentItem: DocumentItem
  ) => {
    setMessage(
      `Opening "${documentItem.name}" for preview. Document preview will be connected to the backend later.`
    );
  };

  const handleDownload = (
    documentItem: DocumentItem
  ) => {
    const fileContent = `DocAI Demo Download

Document: ${documentItem.name}
Type: ${documentItem.type}
Size: ${documentItem.size}
Uploaded: ${documentItem.date}
Status: ${documentItem.status}

This is a frontend demo download.
The real document download will be connected to the backend later.`;

    const blob = new Blob(
      [fileContent],
      {
        type: "text/plain",
      }
    );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;

    link.download = `${documentItem.name}.txt`;

    link.click();

    URL.revokeObjectURL(url);

    setMessage(
      `"${documentItem.name}" download started.`
    );
  };

  const handleRename = (
    documentId: number
  ) => {
    const documentToRename =
      documents.find(
        (document) =>
          document.id === documentId
      );

    if (!documentToRename) {
      return;
    }

    const newName = window.prompt(
      "Enter the new document name:",
      documentToRename.name
    );

    if (
      !newName ||
      !newName.trim()
    ) {
      return;
    }

    setDocuments((currentDocuments) =>
      currentDocuments.map(
        (document) =>
          document.id === documentId
            ? {
                ...document,
                name: newName.trim(),
              }
            : document
      )
    );

    setMessage(
      `Document renamed to "${newName.trim()}".`
    );
  };

  const handleDelete = (
    documentId: number
  ) => {
    const documentToDelete =
      documents.find(
        (document) =>
          document.id === documentId
      );

    if (!documentToDelete) {
      return;
    }

    const confirmed =
      window.confirm(
        `Are you sure you want to delete "${documentToDelete.name}"?`
      );

    if (!confirmed) {
      return;
    }

    setDocuments((currentDocuments) =>
      currentDocuments.filter(
        (document) =>
          document.id !== documentId
      )
    );

    setMessage(
      `"${documentToDelete.name}" was deleted.`
    );
  };

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("All");
    setSortOption("newest");
  };

  return (
    <MainLayout>
      <div className="page-container">
        {/* PAGE HEADER */}
        <div className="page-header documents-page-header">
          <div>
            <h1>My Documents</h1>

            <p>
              View and manage all your uploaded
              documents.
            </p>
          </div>

          <Link
            href="/upload"
            className="primary-button documents-upload-button"
          >
            + Upload Documents
          </Link>
        </div>

        {/* ACTION MESSAGE */}
        {message && (
          <div className="upload-error-message">
            <span className="upload-error-icon">
              ✓
            </span>

            <div>
              <strong>Action completed</strong>

              <p>{message}</p>
            </div>

            <button
              type="button"
              className="remove-file-button"
              onClick={() =>
                setMessage("")
              }
              aria-label="Close message"
            >
              ×
            </button>
          </div>
        )}

        {/* DOCUMENT SUMMARY */}
        <div className="documents-summary">
          <div className="documents-summary-item">
            <span className="documents-summary-label">
              Total Documents
            </span>

            <strong>
              {documents.length}
            </strong>
          </div>

          <div className="documents-summary-item">
            <span className="documents-summary-label">
              Ready
            </span>

            <strong>
              {readyCount}
            </strong>
          </div>

          <div className="documents-summary-item">
            <span className="documents-summary-label">
              Processing
            </span>

            <strong>
              {processingCount}
            </strong>
          </div>

          <div className="documents-summary-item">
            <span className="documents-summary-label">
              Failed
            </span>

            <strong>
              {failedCount}
            </strong>
          </div>
        </div>

        {/* DOCUMENT TABLE */}
        <div className="documents-table-card">
          <div className="documents-table-header">
            <div>
              <h2>All Documents</h2>

              <p>
                Search, filter, sort, and manage
                your documents.
              </p>
            </div>
          </div>

          {/* SEARCH / FILTER / SORT */}
          <div className="documents-controls">
            <div className="documents-search-box">
              <span className="documents-search-icon">
                🔎
              </span>

              <input
                type="text"
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(
                    event.target.value
                  )
                }
              />

              {searchTerm && (
                <button
                  type="button"
                  className="documents-search-clear"
                  onClick={() =>
                    setSearchTerm("")
                  }
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </div>

            <div className="documents-filter-group">
              <label htmlFor="status-filter">
                Status
              </label>

              <select
                id="status-filter"
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(
                    event.target.value
                  )
                }
              >
                <option value="All">
                  All Status
                </option>

                <option value="Ready">
                  Ready
                </option>

                <option value="Processing">
                  Processing
                </option>

                <option value="Failed">
                  Failed
                </option>
              </select>
            </div>

            <div className="documents-filter-group">
              <label htmlFor="sort-documents">
                Sort By
              </label>

              <select
                id="sort-documents"
                value={sortOption}
                onChange={(event) =>
                  setSortOption(
                    event.target.value
                  )
                }
              >
                <option value="newest">
                  Newest First
                </option>

                <option value="oldest">
                  Oldest First
                </option>

                <option value="name-asc">
                  Name A-Z
                </option>

                <option value="name-desc">
                  Name Z-A
                </option>
              </select>
            </div>
          </div>

          {/* RESULTS INFO */}
          <div className="documents-results-info">
            <span>
              Showing{" "}
              <strong>
                {filteredDocuments.length}
              </strong>{" "}
              of{" "}
              <strong>
                {documents.length}
              </strong>{" "}
              documents
            </span>

            {(searchTerm ||
              statusFilter !== "All" ||
              sortOption !== "newest") && (
              <button
                type="button"
                className="clear-document-filters"
                onClick={clearFilters}
              >
                Clear Search & Filters
              </button>
            )}
          </div>

          {/* TABLE */}
          {filteredDocuments.length > 0 ? (
            <div className="documents-table-wrapper">
              <table className="documents-table">
                <thead>
                  <tr>
                    <th>
                      Document
                    </th>

                    <th>
                      Type
                    </th>

                    <th>
                      Size
                    </th>

                    <th>
                      Upload Date
                    </th>

                    <th>
                      Status
                    </th>

                    <th>
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredDocuments.map(
                    (document) => (
                      <tr
                        key={document.id}
                      >
                        {/* DOCUMENT */}
                        <td>
                          <div className="document-name-cell">
                            <div
                              className={getDocumentIconClass(
                                document.type
                              )}
                            >
                              {getDocumentIconText(
                                document.type
                              )}
                            </div>

                            <div className="document-name-info">
                              <strong
                                title={
                                  document.name
                                }
                              >
                                {
                                  document.name
                                }
                              </strong>

                              <span>
                                Document
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* TYPE */}
                        <td>
                          <span className="document-type">
                            {document.type}
                          </span>
                        </td>

                        {/* SIZE */}
                        <td>
                          <span className="document-size">
                            {document.size}
                          </span>
                        </td>

                        {/* DATE */}
                        <td>
                          <span className="document-date">
                            {document.date}
                          </span>
                        </td>

                        {/* STATUS */}
                        <td>
                          <span
                            className={getStatusClass(
                              document.status
                            )}
                          >
                            <span className="status-dot" />

                            {
                              document.status
                            }
                          </span>
                        </td>

                        {/* ACTIONS */}
                        <td>
                          <div className="document-actions">
                            <button
                              type="button"
                              className="document-action-button"
                              onClick={() =>
                                handleView(
                                  document
                                )
                              }
                              title="View document"
                            >
                              View
                            </button>

                            <button
                              type="button"
                              className="document-action-button"
                              onClick={() =>
                                handleDownload(
                                  document
                                )
                              }
                              title="Download document"
                            >
                              Download
                            </button>

                            <button
                              type="button"
                              className="document-action-button"
                              onClick={() =>
                                handleRename(
                                  document.id
                                )
                              }
                              title="Rename document"
                            >
                              Rename
                            </button>

                            <button
                              type="button"
                              className="document-action-button"
                              onClick={() =>
                                handleDelete(
                                  document.id
                                )
                              }
                              title="Delete document"
                            >
                              Delete
                            </button>

                            <Link
                              href="/chat"
                              className="document-action-button"
                              title="Ask AI about this document"
                            >
                              Ask AI
                            </Link>

                            <Link
                              href="/insights"
                              className="document-action-button"
                              title="Summarize document"
                            >
                              Summarize
                            </Link>

                            <Link
                              href="/compare"
                              className="document-action-button"
                              title="Compare documents"
                            >
                              Compare
                            </Link>
                          </div>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            /* EMPTY / NO RESULTS */
            <div className="documents-empty-state">
              <div className="documents-empty-icon">
                📄
              </div>

              <h3>
                No documents found
              </h3>

              <p>
                No documents match your current
                search or filters.
              </p>

              <button
                type="button"
                className="primary-button"
                onClick={clearFilters}
              >
                Clear Search & Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}