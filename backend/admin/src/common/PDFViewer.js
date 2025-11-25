const PDFViewer = ({ pdfUrl }) => {
  return (
    <div style={{ width: '100%', height: '800px' }}>
      <iframe title="PDF Viewer" src={pdfUrl} width="100%" height="100%" frameBorder="0" />
    </div>
  );
};

export default PDFViewer;
