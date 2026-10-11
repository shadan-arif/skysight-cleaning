import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, type FormEvent } from "react";
import { ArrowUpRight, Menu, X, Building2, Sun, Wind, Factory, Landmark, Paintbrush, Layers } from "lucide-react";
import logo from "@/assets/BionicEyeLogoTrimmed.png.asset.json";
import hero from "@/assets/C10_3.jpg.asset.json";
import facade from "@/assets/865A0018.jpg.asset.json";
import field from "@/assets/IMG_2240.JPG.asset.json";
import { SystemCarousel } from "@/components/SystemCarousel";
import { enquirySchema, enquiryEmail } from "@/lib/enquiry";

export const Route = createFileRoute("/v2")({
  head: () => ({
    meta: [
      { title: "The Bionic Eye | Facade and structure cleaning — v2" },
      { name: "description", content: "Facade and structure cleaning without access equipment." },
      { property: "og:title", content: "The Bionic Eye | Facade and structure cleaning" },
      { property: "og:description", content: "Facade and structure cleaning without access equipment." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: V2Page,
});

const navigation = [
  ["Solutions", "#v2-solutions"],
  ["Support", "#v2-support"],
  ["Regulation", "#v2-regulation"],
  ["Sectors", "#v2-sectors"],
  ["About Us", "#v2-about-us"],
  ["Contact", "#v2-contact"],
];

const specifications = [
  ["Working height", "Over 60 metres"],
  ["Flow rate", "Up to 15 litres per minute"],
  ["Working pressure", "Around 170 bar at the nozzle, up to 255 bar at peak"],
  ["Collision avoidance", "Radar, with standoff control"],
  ["Maximum take-off mass", "29 kg"],
];

const applications = [
  [Building2, "Commercial and residential facades, and glass curtain walling"],
  [Sun, "Solar farms and rooftop arrays"],
  [Wind, "Wind turbine towers"],
  [Factory, "Industrial silos, tanks and cladding"],
  [Landmark, "Heritage and listed structures"],
  [Paintbrush, "Graffiti removal"],
  [Layers, "Surface coating and treatment, currently in development"],
] as const;

const VIDEO_SRC = "https://thebioniceye.vercel.app/assets/video/c10-short.mp4";
const VIDEO_POSTER = "https://thebioniceye.vercel.app/assets/video/c10-short-poster-wash-1920.jpg";

function V2Film() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  function togglePlay() {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); }
    else { v.pause(); setPlaying(false); }
  }

  return (
    <figure className="v2-film" aria-label="Film of the C10 cleaning">
      <div className="v2-film__frame">
        <video
          ref={videoRef}
          className="v2-film__video"
          src={VIDEO_SRC}
          poster={VIDEO_POSTER}
          preload="none"
          playsInline
          controls={playing}
          width={1920}
          height={1080}
          aria-label="Film of the C10 cleaning, 55 seconds, music only"
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
        />
        {!playing && (
          <button
            className="v2-film__play"
            type="button"
            aria-label="Play film, 55 seconds"
            onClick={togglePlay}
          >
            <span className="v2-film__play-icon" aria-hidden="true" />
            <span className="v2-film__play-label">
              Play film <span className="v2-film__play-time">0:55</span>
            </span>
          </button>
        )}
      </div>
    </figure>
  );
}

function V2EnquiryForm() {
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const result = enquirySchema.safeParse(data);
    if (!result.success) {
      const issue = result.error.issues[0];
      const element = issue ? form.elements.namedItem(String(issue.path[0])) : null;
      if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
        element.setCustomValidity(issue?.message ?? "");
        element.reportValidity();
      }
      return;
    }
    window.location.href = enquiryEmail(result.data);
  }
  return (
    <form
      className="v2-form"
      id="v2-enquiry-form"
      onSubmit={submit}
      onInput={(event) => {
        const target = event.target;
        if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement)
          target.setCustomValidity("");
      }}
    >
      <div className="v2-field">
        <label className="v2-field__label" htmlFor="v2-f-name">Name</label>
        <input className="v2-field__input" id="v2-f-name" name="name" type="text" autoComplete="name" required maxLength={100} />
      </div>
      <div className="v2-field">
        <label className="v2-field__label" htmlFor="v2-f-company">Company</label>
        <input className="v2-field__input" id="v2-f-company" name="company" type="text" autoComplete="organization" maxLength={160} />
      </div>
      <div className="v2-field-row">
        <div className="v2-field">
          <label className="v2-field__label" htmlFor="v2-f-email">Email</label>
          <input className="v2-field__input" id="v2-f-email" name="email" type="email" autoComplete="email" required maxLength={255} />
        </div>
        <div className="v2-field">
          <label className="v2-field__label" htmlFor="v2-f-phone">Telephone</label>
          <input className="v2-field__input" id="v2-f-phone" name="telephone" type="tel" autoComplete="tel" maxLength={40} />
        </div>
      </div>
      <div className="v2-field">
        <label className="v2-field__label" htmlFor="v2-f-message">Sites or work involved</label>
        <textarea className="v2-field__input v2-field__input--area" id="v2-f-message" name="sites" rows={5} maxLength={4000} />
      </div>
      <button className="v2-btn v2-btn--primary v2-btn--lg v2-form__submit" type="submit">
        Discuss a requirement <ArrowUpRight size={18} aria-hidden="true" />
      </button>
    </form>
  );
}

function V2Page() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="v2-root">
      {/* HEADER */}
      <header className={"v2-header" + (menuOpen ? " is-menu-open" : "")}>
        <div className="v2-container v2-header__inner">
          <a className="v2-header__logo" href="#v2-top" aria-label="The Bionic Eye, back to top">
            <img src={logo.url} alt="The Bionic Eye. Unmanned and unmatched." />
          </a>
          <button
            className="v2-menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="v2-site-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
            <span>{menuOpen ? "Close" : "Menu"}</span>
          </button>
          <nav className={"v2-nav" + (menuOpen ? " is-open" : "")} id="v2-site-nav" aria-label="Main">
            <ul className="v2-nav__list">
              {navigation.map(([label, href]) => (
                <li key={label}>
                  <a href={href} onClick={() => setMenuOpen(false)}>{label}</a>
                </li>
              ))}
              <li>
                <a className="v2-nav__contact" href="#v2-contact" onClick={() => setMenuOpen(false)}>
                  Contact
                </a>
              </li>
              <li>
                <a href="https://shop.thebioniceye.co.uk" target="_blank" rel="noreferrer">
                  Shop <ArrowUpRight size={13} aria-hidden="true" style={{display:"inline-block",verticalAlign:"middle"}} />
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main id="v2-top">
        {/* 1. HERO */}
        <section className="v2-hero" aria-labelledby="v2-hero-title">
          <figure className="v2-hero__media" aria-hidden="true">
            <img src={hero.url} alt="Cleaning drone washing a building facade" fetchPriority="high" />
          </figure>
          <div className="v2-container v2-hero__grid">
            <div className="v2-hero__copy">
              <h1 className="v2-hero__title" id="v2-hero-title">
                Facade and structure cleaning{" "}
                <span className="v2-hero__title-accent">without access equipment.</span>
              </h1>
              <p className="v2-hero__lead">
                Drone cleaning removes the requirement for scaffolding, cradles, powered access or rope
                teams across a substantial proportion of facade, glazing, cladding and roof maintenance.
                The work is carried out from ground level, and setup is measured in minutes rather than days.
              </p>
              <p className="v2-hero__lead v2-hero__lead--note">
                It does not replace access equipment for every application. We identify where it does not
                before specifying a system.
              </p>
              <div className="v2-hero__actions">
                <a className="v2-btn v2-btn--primary v2-btn--lg" href="#v2-contact">
                  Discuss a requirement
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 2. THE SYSTEM */}
        <section className="v2-section v2-section--alt v2-system" id="v2-solutions" aria-labelledby="v2-system-title">
          <div className="v2-container">
            <div className="v2-system__grid">
              <div className="v2-system__intro">
                <h2 className="v2-section-title" id="v2-system-title">The System</h2>
                <p className="v2-lead">
                  The ABZ Innovation C10 is the platform we have standardised on. It operates to over 60
                  metres, delivers up to 15 litres per minute at a working pressure around 170 bar at the
                  nozzle, up to 255 bar at peak, and uses radar for collision avoidance and standoff
                  control. Reverse osmosis water can be specified where surface finish, seals or painted
                  surfaces require it.
                </p>
                <p className="v2-lead">
                  Maximum take-off mass is 29 kg. The sub 25 kg limit that applied under the earlier
                  authorisation route is not required under UK SORA.
                </p>
              </div>
              <dl className="v2-specs" aria-label="Specification">
                {specifications.map(([label, value]) => (
                  <div className="v2-specs__row" key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
              <V2Film />
              <div className="v2-system__carousel-wrap">
                <SystemCarousel />
              </div>
            </div>
          </div>
        </section>

        {/* 3. APPLICATIONS */}
        <section className="v2-section v2-applications" id="v2-sectors" aria-labelledby="v2-apps-title">
          <div className="v2-container">
            <h2 className="v2-section-title" id="v2-apps-title">Applications</h2>
            <div className="v2-apps">
              <ul className="v2-apps__list">
                {applications.map(([Icon, text]) => (
                  <li key={text}>
                    <Icon aria-hidden="true" className="v2-apps__icon" />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
              <div className="v2-apps__gallery">
                <figure className="v2-app__media">
                  <img src={facade.url} width={1600} height={1200} loading="lazy" alt="Drone cleaning beside glazing and exterior cladding" />
                </figure>
                <figure className="v2-app__media">
                  <img src={field.url} width={1600} height={1200} loading="lazy" alt="Ground-level operators supervising a cleaning drone" />
                </figure>
              </div>
            </div>
          </div>
        </section>

        {/* 4. WHAT WE SUPPLY */}
        <section className="v2-section v2-supply" id="v2-support" aria-labelledby="v2-supply-title">
          <div className="v2-container">
            <h2 className="v2-section-title" id="v2-supply-title">What We Supply</h2>
            <div className="v2-supply__items">
              <p className="v2-supply__item v2-supply__item--lead">
                The drone, pressure system and nozzle set <strong>specified against your surfaces.</strong>
              </p>
              <p className="v2-supply__item">
                Pilot training is available <strong>as an additional service</strong>, and we can{" "}
                <strong>advise</strong> on preparing the operations manual and supporting documentation
                required for CAA authorisation.
              </p>
              <p className="v2-supply__item">
                Parts are held in the United Kingdom, repairs are carried out in our own workshop, and the{" "}
                <strong>enhanced warranty option</strong> provides priority servicing and maintenance, with
                loan equipment where parts are unavailable. We also offer white label services,{" "}
                <strong>arranged in advance</strong>, giving clients additional capacity.
              </p>
            </div>
          </div>
        </section>

        {/* 5. REGULATORY POSITION */}
        <section className="v2-section v2-regulation" id="v2-regulation" aria-labelledby="v2-reg-title">
          <div className="v2-container">
            <div className="v2-regulation__panel">
              <h2 className="v2-regulation__title" id="v2-reg-title">Regulatory Position</h2>
              <div className="v2-regulation__body">
                <p>
                  Cleaning operations at height adjacent to structures fall within the Specific Category,
                  which requires an Operational Authorisation from the Civil Aviation Authority. Since April
                  2025 these are granted through UK SORA.
                </p>
                <p>
                  The Operational Authorisation is held by the operator and not the supplier. The Bionic Eye
                  assists clients in attaining their own, drawing on the UK SORA authorisation we hold for
                  cleaning operations with our own PowerWash system, obtained in January 2026, and on the
                  applications we have supported since.
                </p>
                <a
                  className="v2-btn v2-btn--dark v2-btn--lg"
                  href="https://www.caa.co.uk/drones/rules-and-categories-of-drone-flying/flying-in-the-specific-category/"
                  target="_blank"
                  rel="noreferrer"
                >
                  How authorisation works <ArrowUpRight size={18} aria-hidden="true" style={{display:"inline-block",verticalAlign:"middle"}} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 6. PROVEN IN THE FIELD */}
        <section className="v2-section v2-proven" id="v2-about-us" aria-labelledby="v2-proven-title">
          <div className="v2-container v2-proven__grid">
            <h2 className="v2-section-title" id="v2-proven-title">Proven in the Field</h2>
            <div className="v2-proven__body">
              <p className="v2-proven__case">
                ABZ Innovation's case studies show what the C10 delivers in service. A factory facade was
                cleaned at <strong>around 300 square metres an hour</strong> using chemical-free reverse
                osmosis water. A roof carrying ten years of moss,{" "}
                <strong>about 550 square metres</strong>, was cleared in{" "}
                <strong>roughly three hours</strong> with no chemicals, and the system was set up and ready
                to fly in <strong>fifteen minutes</strong>.
              </p>
              <p className="v2-proven__qualifier">
                Figures are from ABZ Innovation case studies. Actual output varies with the surface, the
                level of soiling and site conditions.
              </p>
            </div>
          </div>
        </section>

        {/* 7. ENQUIRY */}
        <section className="v2-section v2-section--contact v2-enquiry" id="v2-contact" aria-labelledby="v2-enquiry-title">
          <div className="v2-container v2-enquiry__grid">
            <div className="v2-enquiry__aside">
              <h2 className="v2-enquiry__heading" id="v2-enquiry-title">Contact Us</h2>
              <p className="v2-enquiry__closing">
                Send us the sites you intend to work on. We will identify which are straightforward under a
                standard authorisation, which require additional work, and which are unlikely to be viable,
                before any commitment is made.
              </p>
              <figure className="v2-enquiry__media">
                <img src={facade.url} sizes="(min-width: 960px) 460px, 100vw" width={1600} height={1200} loading="lazy" alt="Cleaning drone beside a glazed facade." />
              </figure>
            </div>
            <V2EnquiryForm />
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="v2-footer" id="v2-footer" aria-label="About The Bionic Eye">
        <div className="v2-container v2-footer__grid">
          <div className="v2-footer__brand">
            <img src={logo.url} alt="The Bionic Eye. Unmanned and unmatched." loading="lazy" />
          </div>
          <div className="v2-footer__contact">
            <address>
              The Bionic Eye, Bionic House, Hall Farm, Berry Lane, Chorleywood, WD3 5EX, United Kingdom.
            </address>
            <p>
              Telephone <a href="tel:+441753655886">+44 1753 655886</a>. Email{" "}
              <a href="mailto:info@thebioniceye.co.uk">info@thebioniceye.co.uk</a>.
            </p>
            <p className="v2-footer__brands">
              Specialist brands:{" "}
              <a href="https://farmingbydrone.com/" target="_blank" rel="noreferrer">FarmingByDrone</a>{" "}|{" "}
              <a href="https://shop.thebioniceye.co.uk/collections/powerwash-pro-drones" target="_blank" rel="noreferrer">PowerWash</a>{" "}|{" "}
              <a href="https://cleaningbydrone.com/" target="_blank" rel="noreferrer">CleaningByDrone</a>
            </p>
          </div>
          <div className="v2-footer__about">
            <p>The Operational Authorisation is held by the operator and not the supplier. The Bionic Eye assists clients in attaining their own.</p>
            <p>CAA approved since 2014. UK SORA authorisation held for cleaning operations with the PowerWash system since January 2026.</p>
          </div>
        </div>
        <div className="v2-container v2-footer__base">
          <p>The Bionic Eye Ltd. Registered in England and Wales, company number 09053005. Registered office: 22 Wycombe End, Beaconsfield HP9 1NB.</p>
        </div>
      </footer>
    </div>
  );
}
