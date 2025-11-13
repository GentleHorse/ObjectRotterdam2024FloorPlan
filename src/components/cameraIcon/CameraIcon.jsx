export default function CameraIcon() {
  const handleScreenshot = () => {
    // Find the Three.js canvas element
    const canvas = document.querySelector('canvas');
    
    if (!canvas) {
      console.error('Canvas not found');
      return;
    }

    try {
      // Convert canvas to blob
      canvas.toBlob((blob) => {
        if (!blob) {
          console.error('Failed to create image blob');
          return;
        }

        // Create download link
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        link.download = `floor-plan-screenshot-${timestamp}.png`;
        link.href = url;
        link.click();

        // Clean up
        URL.revokeObjectURL(url);
      }, 'image/png');
    } catch (error) {
      console.error('Error taking screenshot:', error);
    }
  };

  return (
    <div className="camera-icon">
      <div 
        className="camera-icon-container"
        onClick={handleScreenshot}
      >
        <img
          src="/camera-icon.png"
          alt="Camera"
          className="camera-icon-image"
        />
      </div>
    </div>
  );
}
