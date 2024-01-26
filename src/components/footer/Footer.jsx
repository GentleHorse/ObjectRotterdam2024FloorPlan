import hakaBuildingIconImage from "../../../public/haka-building-logo.png";

export default function Footer() {
  return (
    <footer className="floor-plan-footer">
      <a
        href="https://www.google.com/maps/place/HAKA-gebouw/@51.9080966,4.4345377,17z/data=!3m1!4b1!4m6!3m5!1s0x47c434ef92035e57:0x463a2e51eb7c5f28!8m2!3d51.9080966!4d4.4371126!16s%2Fg%2F1tczzplv?entry=ttu"
        target="_blank"
      >
        <img src={hakaBuildingIconImage} className="haka-building-logo" />
        <p>Friday - Sunday 11 - 18 hrs</p>
        <p>HAKA, Vierhavenstraat 38 - 42</p>
      </a>
      <section className="designers">
          <a href="https://jeroenvdbogaert.com/" target="_blank">
            <button>Jeroen van den Bogaert</button>
          </a>
          <a href="https://www.satomiminoshima.com/" target="_blank">
            <button>Satomi Minoshima</button>
          </a>
          <a href="https://www.toshihito.design/" target="_blank">
            <button>Toshihito Endo</button>
          </a>
      </section>
    </footer>
  );
}
