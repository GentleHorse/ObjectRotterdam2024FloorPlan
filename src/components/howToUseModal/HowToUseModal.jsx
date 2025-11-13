export default function HowToUseModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="how-to-use-modal">
      <div className="modal-overlay" onClick={onClose}></div>
      
      <div className="modal-content">
        <div className="modal-title">
          <h1>How to Use</h1>
        </div>

        <div className="modal-description">
          <p>Click an object to activate a "pivot control".</p>
          <p>
            <strong>MOVE</strong>, <strong>ROTATE</strong> objects to make your own exhibition layouts.
          </p>
          <p>
            Layouts are not saved automatically, so don't forget to take a <strong>SCREENSHOT</strong>.
          </p>
        </div>

        <div className="modal-images">
          <div className="modal-image">
            <img src="/modal-image-01.webp" alt="Example 1" />
          </div>
          <div className="modal-image">
            <img src="/modal-image-02.webp" alt="Example 2" />
          </div>
          <div className="modal-image">
            <img src="/modal-image-03.webp" alt="Example 3" />
          </div>
        </div>

        <button className="modal-button" onClick={onClose}>
          Create Your Floor Plan
        </button>
      </div>
    </div>
  );
}