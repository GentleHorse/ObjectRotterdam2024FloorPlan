import logoImage from "../../../public/logo.png";
import titleLogoImage from "../../../public/title-logo.png";

export default function Header() {
  return (
    <header className="floor-plan-header">
      <div>
        <div>
          <a href="https://objectrotterdam.com/" target="_blank">
            <img src={logoImage} className="logo" />
            <img src={titleLogoImage} className="title-logo" />
          </a>
        </div>
        <div>
          <p>2-4 February, 2024</p>
        </div>
      </div>

      <div>
        <a 
          href="https://object-rotterdam-2024-digital-archive.vercel.app/" 
          className="digital-archive-link"
        >
          <div className="digital-archive-overlay"></div>
          <p>Digital Archive</p>
        </a>
      </div>
    </header>
  );
}
