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
      <div className="bg-white rounded-lg shadow-lg w-full sm:w-[400px] md:w-[500px] lg:w-[600px] max-w-[90%] max-h-[90vh] overflow-auto p-6">
        
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          Confirmation de suppression
        </h2>

        <p className="mb-6 text-gray-700">
          Êtes-vous sûr de vouloir supprimer&nbsp;
          <span className="font-medium text-[#e3342f]">"{item}"</span> ?
        </p>
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-white rounded cursor-pointer"
          >
            Non
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-[#e3342f] hover:bg-[#cc1f1a] text-white rounded cursor-pointer"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}
