export const PDFViewer = ({ pdfData, isOpenPdf, closePDF }) => {
  if (!isOpenPdf || !pdfData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-4xl h-[90vh] bg-white rounded-lg shadow-lg overflow-hidden">
        <button
          onClick={closePDF}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✖
        </button>
        <iframe
          src={pdfData}
          className="w-full h-full"
          title="PDF Viewer"
        ></iframe>
      </div>
    </div>
  );
};
