import logoImage from "../../../public/logo.png";
import titleLogoImage from "../../../public/title-logo.png";

export default function Header() {
  return (
    <header className="floor-plan-header">
      <section>
        <a href="https://objectrotterdam.com/" target="_blank">
          <img src={logoImage} className="logo" />
          <img src={titleLogoImage} className="title-logo" />
        </a>
      </section>
      <section>
        <p>2-4 February, 2024</p>
      </section>
    </header>
  );
}
