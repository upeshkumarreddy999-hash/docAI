"use client";

import { ChangeEvent, DragEvent, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import LoadingState from "@/components/common/LoadingState";

const MAX_FILES = 20;

const ALLOWED_EXTENSIONS = [
  ".pdf",
  ".doc",
  ".docx",
  ".xls",
  ".xlsx",
  ".ppt",
  ".pptx",
  ".txt",
  ".csv",
  ".md",
];

const ALLOWED_FILE_TYPES = [
  "PDF",
  "Word",
  "Excel",
  "PowerPoint",
  "TXT",
  "CSV",
  "Markdown",
];

type FileStatus =
  | "Uploading"
  | "Processing"
  | "Extracting Content"
  | "Processing Complete"
  | "Failed";

type SelectedFile = {
  file: File;
  status: FileStatus;
  progress: number;
};

export default function UploadPage() {
  const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const isFileTypeAllowed = (file: File) => {
    const fileName = file.name.toLowerCase();

    return ALLOWED_EXTENSIONS.some((extension) =>
      fileName.endsWith(extension)
    );
  };

  const startProcessing = (startIndex: number) => {
    const statusSequence: {
      status: FileStatus;
      progress: number;
      delay: number;
    }[] = [
      {
        status: "Uploading",
        progress: 25,
        delay: 800,
      },
      {
        status: "Processing",
        progress: 50,
        delay: 1000,
      },
      {
        status: "Extracting Content",
        progress: 75,
        delay: 1200,
      },
      {
        status: "Processing Complete",
        progress: 100,
        delay: 1000,
      },
    ];

    statusSequence.forEach(({ status, progress, delay }) => {
      setTimeout(() => {
        setSelectedFiles((currentFiles) =>
          currentFiles.map((item, index) =>
            index === startIndex
              ? {
                  ...item,
                  status,
                  progress,
                }
              : item
          )
        );
      }, delay);
    });
  };

  const addFiles = (files: File[]) => {
    setErrorMessage("");

    const remainingSlots = MAX_FILES - selectedFiles.length;

    if (remainingSlots <= 0) {
      setErrorMessage(
        `You can upload a maximum of ${MAX_FILES} files in one session.`
      );
      return;
    }

    const filesToCheck = files.slice(0, remainingSlots);

    const validFiles: File[] = [];
    const invalidFiles: string[] = [];

    filesToCheck.forEach((file) => {
      if (isFileTypeAllowed(file)) {
        validFiles.push(file);
      } else {
        invalidFiles.push(file.name);
      }
    });

    if (invalidFiles.length > 0) {
      setErrorMessage(
        `Unsupported file type: ${invalidFiles.join(
          ", "
        )}. Please upload only PDF, Word, Excel, PowerPoint, TXT, CSV, or Markdown files.`
      );
    }

    if (files.length > remainingSlots) {
      setErrorMessage(
        `You can upload a maximum of ${MAX_FILES} files in one session. Only ${remainingSlots} additional file${
          remainingSlots === 1 ? "" : "s"
        } can be added.`
      );
    }

    if (validFiles.length > 0) {
      const firstNewFileIndex = selectedFiles.length;

      const newFiles: SelectedFile[] = validFiles.map((file) => ({
        file,
        status: "Uploading",
        progress: 10,
      }));

      setSelectedFiles((currentFiles) => [
        ...currentFiles,
        ...newFiles,
      ]);

      newFiles.forEach((_, index) => {
        startProcessing(firstNewFileIndex + index);
      });
    }
  };

  const handleFileChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(event.target.files || []);

    if (files.length > 0) {
      addFiles(files);
    }

    event.target.value = "";
  };

  const handleDragOver = (
    event: DragEvent<HTMLDivElement>
  ) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (
    event: DragEvent<HTMLDivElement>
  ) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (
    event: DragEvent<HTMLDivElement>
  ) => {
    event.preventDefault();
    setIsDragging(false);

    const files = Array.from(event.dataTransfer.files);

    if (files.length > 0) {
      addFiles(files);
    }
  };

  const removeFile = (indexToRemove: number) => {
    setSelectedFiles((currentFiles) =>
      currentFiles.filter(
        (_, index) => index !== indexToRemove
      )
    );

    setErrorMessage("");
  };

  const getStatusClass = (status: FileStatus) => {
    switch (status) {
      case "Uploading":
        return "file-status uploading";

      case "Processing":
        return "file-status processing";

      case "Extracting Content":
        return "file-status extracting";

      case "Processing Complete":
        return "file-status complete";

      case "Failed":
        return "file-status failed";

      default:
        return "file-status";
    }
  };

  const isProcessing = selectedFiles.some(
    (selectedFile) =>
      selectedFile.status === "Uploading" ||
      selectedFile.status === "Processing" ||
      selectedFile.status === "Extracting Content"
  );

  return (
    <MainLayout>
      <div className="page-container">
        <div className="page-header">
          <div>
            <h1>Upload Documents</h1>

            <p>
              Upload your files to analyze them with
              DocAI.
            </p>
          </div>
        </div>

        <div
          className={`upload-page-card ${
            isDragging
              ? "upload-page-card-dragging"
              : ""
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="upload-icon">↑</div>

          <h2>Upload your documents</h2>

          <p className="upload-description">
            Drag and drop your files here, or browse your
            computer to select documents.
          </p>

          <label className="primary-button upload-browse-button">
            Browse Files

            <input
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv,.md"
              onChange={handleFileChange}
              hidden
            />
          </label>

          <p className="upload-info">
            Maximum {MAX_FILES} files per session.
          </p>

          <div className="supported-files">
            {ALLOWED_FILE_TYPES.map((type) => (
              <span key={type}>{type}</span>
            ))}
          </div>

          <p className="drag-drop-hint">
            Or drag and drop your files anywhere in this
            area
          </p>
        </div>

        {errorMessage && (
          <div className="upload-error-message">
            <span className="upload-error-icon">
              !
            </span>

            <div>
              <strong>File upload error</strong>

              <p>{errorMessage}</p>
            </div>
          </div>
        )}

        {isProcessing && (
          <LoadingState
            variant="inline"
            title="Processing documents..."
          />
        )}

        {selectedFiles.length > 0 && (
          <div className="selected-files-section">
            <div className="selected-files-header">
              <div>
                <h2>Selected Files</h2>

                <p>
                  {selectedFiles.length} / {MAX_FILES}{" "}
                  {selectedFiles.length === 1
                    ? "file"
                    : "files"}{" "}
                  selected
                </p>
              </div>
            </div>

            <div className="selected-files-list">
              {selectedFiles.map(
                (selectedFile, index) => (
                  <div
                    className="selected-file-item"
                    key={`${selectedFile.file.name}-${index}`}
                  >
                    <div className="selected-file-icon">
                      📄
                    </div>

                    <div className="selected-file-info">
                      <strong>
                        {selectedFile.file.name}
                      </strong>

                      <span>
                        {(
                          selectedFile.file.size / 1024
                        ).toFixed(1)}{" "}
                        KB
                      </span>

                      <div className="file-progress">
                        <div
                          className="file-progress-bar"
                          style={{
                            width: `${selectedFile.progress}%`,
                          }}
                        />
                      </div>
                    </div>

                    <div
                      className={getStatusClass(
                        selectedFile.status
                      )}
                    >
                      {selectedFile.status}
                    </div>

                    <button
                      type="button"
                      className="remove-file-button"
                      onClick={() =>
                        removeFile(index)
                      }
                      aria-label={`Remove ${selectedFile.file.name}`}
                    >
                      ×
                    </button>
                  </div>
                )
              )}
            </div>
          </div>
        )}
        
      </div>
    </MainLayout>
  );
}