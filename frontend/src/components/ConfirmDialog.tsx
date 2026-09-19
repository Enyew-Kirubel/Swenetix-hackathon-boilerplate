import { useEffect } from "react";
import { createPortal } from "react-dom";

interface Props {
  title: string;
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

// A small in-app replacement for window.confirm(), styled like the rest of the app.
export default function ConfirmDialog({
  title,
  message,
  confirmLabel = "Delete",
  onConfirm,
  onCancel,
}: Props) {
  // Escape cancels, like a native dialog
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onCancel]);

  // Rendered into <body> so it is not affected by the card it was opened from. React still
  // bubbles clicks up to the card, so they are stopped here to avoid opening the edit window.
  return createPortal(
    <div
      className="overlay"
      onClick={(e) => {
        e.stopPropagation();
        onCancel();
      }}
    >
      <div
        className="modal confirm"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 id="confirm-title">{title}</h3>
        <p className="muted">{message}</p>
        <div className="modal-actions">
          {/* Cancel has focus first so pressing Enter by accident never deletes anything */}
          <button type="button" className="secondary" onClick={onCancel} autoFocus>
            Cancel
          </button>
          <button type="button" className="danger" onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}