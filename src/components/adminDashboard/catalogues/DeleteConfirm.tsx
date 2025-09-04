import { useRef } from "react";

type Props = {
  item: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function DeleteConfirm({ item, onConfirm, onCancel }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      onCancel();
    }
  };

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 bg-[#1E2939]/80 bg-opacity-50 flex items-center justify-center z-50"
    >
      <div className="bg-white rounded-lg shadow-lg w-[90%] sm:w-[400px] p-6">
        <p className="mb-6">Supprimer "{item}" ?</p>
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onCancel}
            className="inline-block px-4 py-2 bg-gray-300 hover:bg-gray-400 text-white rounded"
          >
            Non
          </button>
          <button
            onClick={onConfirm}
            className="inline-block px-4 py-2 bg-[#e3342f] hover:bg-[#cc1f1a] text-white rounded"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}
