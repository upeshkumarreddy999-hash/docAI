"use client";

import { FormEvent, KeyboardEvent, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";

type SourceReference = {
  id: number;
  documentName: string;
  fileType: string;
  location: string;
  excerpt: string;
};

type ChatMessage = {
  id: number;
  role: "user" | "ai";
  message: string;
  sources?: SourceReference[];
};

type DocumentItem = {
  id: number;
  name: string;
  type: string;
  size: string;
};

const initialMessages: ChatMessage[] = [
  {
    id: 1,
    role: "user",
    message: "What is the annual leave policy?",
  },
  {
    id: 2,
    role: "ai",
    message:
      "According to the Employee Handbook, employees are entitled to 20 days of annual leave per year. Annual leave should be requested in advance and approved by the employee's manager.",
    sources: [
      {
        id: 1,
        documentName: "Employee Handbook.pdf",
        fileType: "PDF",
        location: "Page 12",
        excerpt:
          "Employees are entitled to 20 days of annual leave per year. Annual leave should be requested in advance and approved by the employee's manager.",
      },
      {
        id: 2,
        documentName: "Company Policies.pdf",
        fileType: "PDF",
        location: "Page 8",
        excerpt:
          "All leave requests must be submitted according to the company's leave approval policy.",
      },
    ],
  },
  {
    id: 3,
    role: "user",
    message: "How many days of leave can I take at once?",
  },
  {
    id: 4,
    role: "ai",
    message:
      "The uploaded documents indicate that leave requests should be submitted according to the company's leave policy. Please refer to the relevant policy section for the maximum consecutive leave period.",
    sources: [
      {
        id: 3,
        documentName: "Employee Handbook.pdf",
        fileType: "PDF",
        location: "Page 13",
        excerpt:
          "Employees should follow the leave request procedure when requesting consecutive days of annual leave.",
      },
    ],
  },
];

const availableDocuments: DocumentItem[] = [
  {
    id: 1,
    name: "Employee Handbook.pdf",
    type: "PDF",
    size: "12.4 MB",
  },
  {
    id: 2,
    name: "Company Policies.pdf",
    type: "PDF",
    size: "8.7 MB",
  },
  {
    id: 3,
    name: "Leave Policy.pdf",
    type: "PDF",
    size: "4.2 MB",
  },
  {
    id: 4,
    name: "Workplace Guidelines.docx",
    type: "DOCX",
    size: "2.8 MB",
  },
  {
    id: 5,
    name: "Employee Benefits.xlsx",
    type: "XLSX",
    size: "1.9 MB",
  },
];

export default function ChatPage() {
  const [messages, setMessages] =
    useState<ChatMessage[]>(initialMessages);

  const [question, setQuestion] = useState("");

  const [selectedDocuments, setSelectedDocuments] = useState<
    DocumentItem[]
  >([
    availableDocuments[0],
    availableDocuments[1],
  ]);

  const [showDocumentSelector, setShowDocumentSelector] =
    useState(false);

  const [expandedSources, setExpandedSources] =
    useState<number[]>([]);

  const [copiedMessageId, setCopiedMessageId] =
    useState<number | null>(null);

  const [feedback, setFeedback] = useState<
    Record<number, "helpful" | "not-helpful">
  >({});

  const [isLoading, setIsLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState<
    string | null
  >(null);

  const [lastQuestion, setLastQuestion] = useState("");

  const handleSendMessage = () => {
    const trimmedQuestion = question.trim();

    if (!trimmedQuestion || isLoading) {
      return;
    }

    setErrorMessage(null);
    setLastQuestion(trimmedQuestion);

    const newUserMessage: ChatMessage = {
      id: Date.now(),
      role: "user",
      message: trimmedQuestion,
    };

    setMessages((currentMessages) => [
      ...currentMessages,
      newUserMessage,
    ]);

    setQuestion("");
    setIsLoading(true);

    /*
      Frontend simulation only.

      Later this will be replaced with:
      API request → Python FastAPI → AI/RAG → response
    */

    setTimeout(() => {
      setIsLoading(false);

      const aiResponse: ChatMessage = {
        id: Date.now() + 1,
        role: "ai",
        message:
          "Based on the selected documents, relevant information was found for your question. This is currently a frontend simulation. The real AI response will be connected through the backend API later.",
        sources: [
          {
            id: Date.now() + 2,
            documentName:
              selectedDocuments[0]?.name ||
              "Selected document",
            fileType:
              selectedDocuments[0]?.type || "DOC",
            location: "Relevant section",
            excerpt:
              "Relevant information from the selected document will appear here when the real AI document processing system is connected.",
          },
        ],
      };

      setMessages((currentMessages) => [
        ...currentMessages,
        aiResponse,
      ]);
    }, 1800);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSendMessage();
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const handleCopy = async (
    messageId: number,
    message: string,
  ) => {
    try {
      await navigator.clipboard.writeText(message);

      setCopiedMessageId(messageId);

      setTimeout(() => {
        setCopiedMessageId(null);
      }, 2000);
    } catch {
      alert("Unable to copy the answer.");
    }
  };

  const handleRegenerate = (messageId: number) => {
    if (isLoading) {
      return;
    }

    setErrorMessage(null);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      setMessages((currentMessages) =>
        currentMessages.map((chatMessage) => {
          if (
            chatMessage.id !== messageId ||
            chatMessage.role !== "ai"
          ) {
            return chatMessage;
          }

          return {
            ...chatMessage,
            message:
              "Here is a regenerated response based on the selected documents. The relevant information has been reviewed again.",
          };
        }),
      );
    }, 1800);
  };

  const handleFeedback = (
    messageId: number,
    type: "helpful" | "not-helpful",
  ) => {
    setFeedback((currentFeedback) => ({
      ...currentFeedback,
      [messageId]: type,
    }));
  };

  const handleRetry = () => {
    if (!lastQuestion || isLoading) {
      return;
    }

    setErrorMessage(null);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      const retryResponse: ChatMessage = {
        id: Date.now(),
        role: "ai",
        message:
          "The request was successfully processed after retrying. This is a frontend simulation of the AI response.",
      };

      setMessages((currentMessages) => [
        ...currentMessages,
        retryResponse,
      ]);
    }, 1800);
  };

  const isDocumentSelected = (documentId: number) => {
    return selectedDocuments.some(
      (document) => document.id === documentId,
    );
  };

  const toggleDocument = (document: DocumentItem) => {
    const alreadySelected = isDocumentSelected(document.id);

    if (alreadySelected) {
      setSelectedDocuments((currentDocuments) =>
        currentDocuments.filter(
          (selectedDocument) =>
            selectedDocument.id !== document.id,
        ),
      );

      return;
    }

    if (selectedDocuments.length >= 20) {
      return;
    }

    setSelectedDocuments((currentDocuments) => [
      ...currentDocuments,
      document,
    ]);
  };

  const removeDocument = (documentId: number) => {
    setSelectedDocuments((currentDocuments) =>
      currentDocuments.filter(
        (document) => document.id !== documentId,
      ),
    );
  };

  const toggleSource = (sourceId: number) => {
    setExpandedSources((currentSources) =>
      currentSources.includes(sourceId)
        ? currentSources.filter((id) => id !== sourceId)
        : [...currentSources, sourceId],
    );
  };

  return (
    <MainLayout>
      <div className="page-container chat-page">
        {/* Page Header */}
        <div className="page-header">
          <div>
            <h1>AI Q&A</h1>

            <p>
              Ask questions about your uploaded documents and get
              AI-powered answers.
            </p>
          </div>
        </div>

        {/* Chat Workspace */}
        <div className="chat-workspace">
          {/* Main Chat */}
          <section className="chat-main">
            {/* Chat Header */}
            <div className="chat-header">
              <div className="chat-header-info">
                <div className="chat-ai-icon">AI</div>

                <div>
                  <h2>DocAI Assistant</h2>

                  <p>
                    Ask questions about your documents
                  </p>
                </div>
              </div>

              <div className="chat-status">
                <span
                  className="chat-status-dot"
                  style={{
                    background: isLoading
                      ? "var(--warning)"
                      : "var(--success)",
                  }}
                />

                {isLoading ? "Thinking..." : "Ready"}
              </div>
            </div>

            {/* Conversation */}
            <div className="chat-conversation">
              {messages.map((chatMessage) => (
                <div
                  key={chatMessage.id}
                  className={`chat-message ${
                    chatMessage.role === "user"
                      ? "chat-message-user"
                      : "chat-message-ai"
                  }`}
                >
                  <div
                    className={`chat-message-avatar ${
                      chatMessage.role === "user"
                        ? "user-avatar"
                        : "ai-avatar"
                    }`}
                  >
                    {chatMessage.role === "user" ? "U" : "AI"}
                  </div>

                  <div className="chat-message-content">
                    <div className="chat-message-name">
                      {chatMessage.role === "user"
                        ? "You"
                        : "DocAI Assistant"}
                    </div>

                    <div className="chat-message-bubble">
                      {chatMessage.message}
                    </div>

                    {/* Sources */}
                    {chatMessage.role === "ai" &&
                      chatMessage.sources &&
                      chatMessage.sources.length > 0 && (
                        <div
                          style={{
                            marginTop: "12px",
                            width: "100%",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent:
                                "space-between",
                              alignItems: "center",
                              marginBottom: "8px",
                              fontSize: "12px",
                              color:
                                "var(--text-secondary)",
                            }}
                          >
                            <strong
                              style={{
                                color:
                                  "var(--text-primary)",
                              }}
                            >
                              Sources
                            </strong>

                            <span>
                              {chatMessage.sources.length}{" "}
                              {chatMessage.sources.length === 1
                                ? "reference"
                                : "references"}
                            </span>
                          </div>

                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "8px",
                            }}
                          >
                            {chatMessage.sources.map(
                              (source) => {
                                const isExpanded =
                                  expandedSources.includes(
                                    source.id,
                                  );

                                return (
                                  <div
                                    key={source.id}
                                    style={{
                                      border:
                                        "1px solid var(--border)",
                                      borderRadius: "8px",
                                      background:
                                        "var(--white)",
                                      overflow: "hidden",
                                    }}
                                  >
                                    <button
                                      type="button"
                                      onClick={() =>
                                        toggleSource(
                                          source.id,
                                        )
                                      }
                                      style={{
                                        width: "100%",
                                        display: "flex",
                                        alignItems:
                                          "center",
                                        gap: "10px",
                                        padding: "10px",
                                        border: "none",
                                        background:
                                          "transparent",
                                        cursor: "pointer",
                                        textAlign: "left",
                                      }}
                                    >
                                      <span
                                        style={{
                                          width: "34px",
                                          height: "34px",
                                          minWidth: "34px",
                                          display: "flex",
                                          alignItems:
                                            "center",
                                          justifyContent:
                                            "center",
                                          borderRadius: "7px",
                                          background:
                                            "var(--primary-light)",
                                          color:
                                            "var(--primary)",
                                          fontSize: "10px",
                                          fontWeight: 700,
                                        }}
                                      >
                                        {source.fileType}
                                      </span>

                                      <span
                                        style={{
                                          display: "flex",
                                          flexDirection:
                                            "column",
                                          minWidth: 0,
                                          flex: 1,
                                        }}
                                      >
                                        <strong
                                          style={{
                                            fontSize: "12px",
                                            color:
                                              "var(--text-primary)",
                                            overflow: "hidden",
                                            textOverflow:
                                              "ellipsis",
                                            whiteSpace:
                                              "nowrap",
                                          }}
                                        >
                                          {
                                            source.documentName
                                          }
                                        </strong>

                                        <span
                                          style={{
                                            marginTop: "3px",
                                            fontSize: "11px",
                                            color:
                                              "var(--text-muted)",
                                          }}
                                        >
                                          {source.location}
                                        </span>
                                      </span>

                                      <span
                                        style={{
                                          fontSize: "14px",
                                          color:
                                            "var(--text-muted)",
                                        }}
                                      >
                                        {isExpanded
                                          ? "⌃"
                                          : "⌄"}
                                      </span>
                                    </button>

                                    {isExpanded && (
                                      <div
                                        style={{
                                          padding: "10px",
                                          borderTop:
                                            "1px solid var(--border-light)",
                                          background:
                                            "var(--background)",
                                        }}
                                      >
                                        <span
                                          style={{
                                            display: "block",
                                            fontSize: "10px",
                                            fontWeight: 700,
                                            color:
                                              "var(--text-muted)",
                                            marginBottom:
                                              "5px",
                                            textTransform:
                                              "uppercase",
                                          }}
                                        >
                                          Relevant excerpt
                                        </span>

                                        <p
                                          style={{
                                            margin: 0,
                                            fontSize: "12px",
                                            lineHeight: 1.6,
                                            color:
                                              "var(--text-secondary)",
                                          }}
                                        >
                                          &quot;
                                          {source.excerpt}
                                          &quot;
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                );
                              },
                            )}
                          </div>
                        </div>
                      )}

                    {/* Actions */}
                    {chatMessage.role === "ai" && (
                      <div className="chat-message-actions">
                        <button
                          type="button"
                          onClick={() =>
                            handleCopy(
                              chatMessage.id,
                              chatMessage.message,
                            )
                          }
                          disabled={isLoading}
                        >
                          {copiedMessageId ===
                          chatMessage.id
                            ? "Copied ✓"
                            : "Copy"}
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleRegenerate(
                              chatMessage.id,
                            )
                          }
                          disabled={isLoading}
                        >
                          Regenerate
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleFeedback(
                              chatMessage.id,
                              "helpful",
                            )
                          }
                          disabled={isLoading}
                        >
                          {feedback[chatMessage.id] ===
                          "helpful"
                            ? "Helpful ✓"
                            : "Helpful"}
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleFeedback(
                              chatMessage.id,
                              "not-helpful",
                            )
                          }
                          disabled={isLoading}
                        >
                          {feedback[chatMessage.id] ===
                          "not-helpful"
                            ? "Not Helpful ✓"
                            : "Not Helpful"}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Loading State */}
              {isLoading && (
                <div className="chat-message chat-message-ai">
                  <div className="chat-message-avatar ai-avatar">
                    AI
                  </div>

                  <div className="chat-message-content">
                    <div className="chat-message-name">
                      DocAI Assistant
                    </div>

                    <div
                      className="chat-message-bubble"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <span>Analyzing your documents</span>

                      <span
                        style={{
                          display: "inline-flex",
                          gap: "4px",
                        }}
                      >
                        <span
                          style={{
                            width: "6px",
                            height: "6px",
                            borderRadius: "50%",
                            background:
                              "var(--primary)",
                          }}
                        />

                        <span
                          style={{
                            width: "6px",
                            height: "6px",
                            borderRadius: "50%",
                            background:
                              "var(--primary)",
                          }}
                        />

                        <span
                          style={{
                            width: "6px",
                            height: "6px",
                            borderRadius: "50%",
                            background:
                              "var(--primary)",
                          }}
                        />
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Error State */}
              {errorMessage && (
                <div
                  style={{
                    marginTop: "16px",
                    padding: "14px",
                    border: "1px solid #f1b5b5",
                    borderRadius: "10px",
                    background: "#fff5f5",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <div>
                    <strong
                      style={{
                        display: "block",
                        fontSize: "13px",
                        marginBottom: "4px",
                      }}
                    >
                      Something went wrong
                    </strong>

                    <span
                      style={{
                        fontSize: "12px",
                        color: "var(--text-secondary)",
                      }}
                    >
                      {errorMessage}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleRetry}
                    disabled={isLoading}
                    style={{
                      border: "1px solid var(--border)",
                      background: "var(--white)",
                      borderRadius: "7px",
                      padding: "7px 12px",
                      cursor: isLoading
                        ? "not-allowed"
                        : "pointer",
                      fontSize: "12px",
                      fontWeight: 600,
                    }}
                  >
                    Retry
                  </button>
                </div>
              )}
            </div>

            {/* Input */}
            <form
              className="chat-input-area"
              onSubmit={handleSubmit}
            >
              <div className="chat-input-wrapper">
                <textarea
                  value={question}
                  onChange={(event) =>
                    setQuestion(event.target.value)
                  }
                  onKeyDown={handleKeyDown}
                  placeholder={
                    isLoading
                      ? "DocAI is processing your question..."
                      : "Ask a question about your documents..."
                  }
                  rows={1}
                  disabled={isLoading}
                  aria-label="Ask a question"
                />

                <button
                  type="submit"
                  className="chat-send-button"
                  disabled={
                    !question.trim() || isLoading
                  }
                  aria-label="Send question"
                >
                  {isLoading ? "..." : "↑"}
                </button>
              </div>

              <div className="chat-input-footer">
                <span>
                  {isLoading
                    ? "Please wait while DocAI processes your question."
                    : "Press Enter to send · Shift + Enter for a new line"}
                </span>

                <span>DocAI</span>
              </div>
            </form>
          </section>

          {/* Document Context */}
          <aside className="chat-context-panel">
            <div className="chat-context-header">
              <div>
                <h3>Document Context</h3>

                <p>
                  Documents used for this conversation
                </p>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "12px",
                fontSize: "13px",
              }}
            >
              <span>Selected documents</span>

              <strong>
                {selectedDocuments.length} / 20
              </strong>
            </div>

            {selectedDocuments.length > 0 ? (
              selectedDocuments.map((document) => (
                <div
                  className="chat-context-document"
                  key={document.id}
                >
                  <div className="chat-context-document-icon">
                    {document.type}
                  </div>

                  <div className="chat-context-document-info">
                    <strong>{document.name}</strong>

                    <span>{document.size}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      removeDocument(document.id)
                    }
                    disabled={isLoading}
                    aria-label={`Remove ${document.name}`}
                  >
                    ×
                  </button>
                </div>
              ))
            ) : (
              <div
                style={{
                  padding: "16px",
                  border: "1px dashed var(--border)",
                  borderRadius: "10px",
                  marginBottom: "12px",
                  textAlign: "center",
                  fontSize: "13px",
                  color: "var(--text-muted)",
                }}
              >
                No documents selected.
              </div>
            )}

            <button
              type="button"
              className="secondary-button"
              onClick={() =>
                setShowDocumentSelector(
                  (currentValue) => !currentValue,
                )
              }
              disabled={isLoading}
            >
              {showDocumentSelector
                ? "− Close Documents"
                : "+ Select Documents"}
            </button>

            {showDocumentSelector && (
              <div
                style={{
                  marginTop: "12px",
                  border: "1px solid var(--border)",
                  borderRadius: "10px",
                  overflow: "hidden",
                  background: "var(--white)",
                }}
              >
                <div
                  style={{
                    padding: "12px",
                    borderBottom:
                      "1px solid var(--border-light)",
                    background: "var(--background)",
                  }}
                >
                  <strong
                    style={{
                      display: "block",
                      fontSize: "13px",
                      marginBottom: "4px",
                    }}
                  >
                    Select documents
                  </strong>

                  <span
                    style={{
                      fontSize: "12px",
                      color: "var(--text-muted)",
                    }}
                  >
                    Choose documents that DocAI should use
                    for this conversation.
                  </span>
                </div>

                <div
                  style={{
                    maxHeight: "280px",
                    overflowY: "auto",
                  }}
                >
                  {availableDocuments.map((document) => {
                    const selected =
                      isDocumentSelected(document.id);

                    const selectionDisabled =
                      !selected &&
                      selectedDocuments.length >= 20;

                    return (
                      <button
                        type="button"
                        key={document.id}
                        onClick={() =>
                          toggleDocument(document)
                        }
                        disabled={
                          selectionDisabled || isLoading
                        }
                        style={{
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          padding: "12px",
                          border: "none",
                          borderBottom:
                            "1px solid var(--border-light)",
                          background: selected
                            ? "var(--primary-light)"
                            : "var(--white)",
                          cursor:
                            selectionDisabled || isLoading
                              ? "not-allowed"
                              : "pointer",
                          textAlign: "left",
                          opacity:
                            selectionDisabled || isLoading
                              ? 0.5
                              : 1,
                        }}
                      >
                        <span
                          style={{
                            width: "18px",
                            height: "18px",
                            minWidth: "18px",
                            border: selected
                              ? "1px solid var(--primary)"
                              : "1px solid var(--border)",
                            borderRadius: "5px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: selected
                              ? "var(--primary)"
                              : "var(--white)",
                            color: "var(--white)",
                            fontSize: "11px",
                            fontWeight: 700,
                          }}
                        >
                          {selected ? "✓" : ""}
                        </span>

                        <span
                          style={{
                            fontSize: "10px",
                            fontWeight: 700,
                            color:
                              "var(--primary)",
                            background:
                              "var(--primary-light)",
                            padding: "4px 5px",
                            borderRadius: "4px",
                          }}
                        >
                          {document.type}
                        </span>

                        <span
                          style={{
                            display: "flex",
                            flexDirection:
                              "column",
                            minWidth: 0,
                            flex: 1,
                          }}
                        >
                          <strong
                            style={{
                              fontSize: "12px",
                              color:
                                "var(--text-primary)",
                              overflow: "hidden",
                              textOverflow:
                                "ellipsis",
                              whiteSpace:
                                "nowrap",
                            }}
                          >
                            {document.name}
                          </strong>

                          <span
                            style={{
                              fontSize: "11px",
                              color:
                                "var(--text-muted)",
                              marginTop: "2px",
                            }}
                          >
                            {document.size}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div
                  style={{
                    padding: "10px 12px",
                    fontSize: "11px",
                    color: "var(--text-muted)",
                    background:
                      "var(--background)",
                  }}
                >
                  Maximum 20 documents can be selected for
                  one conversation.
                </div>
              </div>
            )}

            <div className="chat-context-info">
              <strong>How DocAI works</strong>

              <p>
                Your question is analyzed against the selected
                documents. Relevant information is retrieved and
                used to generate the answer.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </MainLayout>
  );
}