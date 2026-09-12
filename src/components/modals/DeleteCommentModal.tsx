type DeleteCommentModalProps = {
  isPending: boolean;
  onCancel: () => void;
  onDelete: () => void;
};

function DeleteCommentModal({
  isPending,
  onCancel,
  onDelete,
}: DeleteCommentModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4">
      <div className="bg-secondary-content border-base-300 w-full max-w-md rounded-xl border p-6 shadow-md md:p-5">
        <div>
          <h2 className="text-base-content text-lg font-semibold">
            Delete Comment
          </h2>

          <p className="text-base-content/60 mt-1 text-base">
            This action cannot be undone
          </p>
        </div>

        <div className="mt-6 flex justify-end gap-3 md:gap-2">
          <button
            type="button"
            disabled={isPending}
            onClick={onCancel}
            className="border-base-300 rounded-lg border px-4 py-2 text-sm disabled:opacity-50 md:px-3"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={isPending}
            onClick={onDelete}
            className="rounded-lg bg-red-500 px-4 py-2 text-sm text-black disabled:opacity-50 md:px-3"
          >
            {isPending ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteCommentModal;