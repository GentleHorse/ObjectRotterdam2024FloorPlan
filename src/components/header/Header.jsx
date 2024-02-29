import logoImage from "../../../public/logo.png";
import titleLogoImage from "../../../public/title-logo.png";

export default function Header() {
  return (
    <header className="floor-plan-header">
      <section>
        <div>
          <a href="https://objectrotterdam.com/" target="_blank">
            <img src={logoImage} className="logo" />
            <img src={titleLogoImage} className="title-logo" />
          </a>
        </div>
        <div>
          <p>2-4 February, 2024</p>
        </div>
      </section>

      <section className="instruction">
        <h1>How to use?</h1>
        <p>Click an object to activate/deactivate a pivot control.</p>
        <p>
          [!] Object modifications with pivot controls are not saved automatically.
        </p>
      </section>
    </header>
  );
}
