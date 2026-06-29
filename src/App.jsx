import { useEffect, useMemo, useState } from "react";
import {
  BookOpenText,
  ChevronRight,
  Compass,
  Crown,
  Landmark,
  Mail,
  MapPinned,
  Menu,
  ScrollText,
  Shield,
  Sparkles,
  X,
} from "lucide-react";
import heroImage from "../assets/lune-dargent-hero.png";
import woodsImage from "../assets/chants-eternels.png";
import wellImage from "../assets/puits-de-soleil.png";
import courtImage from "../assets/cour-royale.png";
import sunstriderLogo from "../assets/sunstrider-logo.png";

const navItems = [
  ["Accueil", "/"],
  ["Histoire", "/histoire"],
  ["Monarchie", "/monarchie"],
  ["Découvrir", "/decouvrir"],
  ["Culture", "/culture"],
  ["Visite", "/visite"],
  ["Actualités", "/actualites"],
  ["Contacts", "/contacts"],
];

const timeline = [
  ["Fondation du royaume", "Les exilés hauts-elfes établissent une patrie durable autour d'un idéal de souveraineté."],
  ["Dynastie Sunstrider", "La maison royale devient le fil politique, symbolique et spirituel du royaume."],
  ["Construction de Lune-d'Argent", "La capitale unit urbanisme monumental, défense élégante et magie appliquée."],
  ["Les Trolls", "Les frontières sont forgées dans la vigilance, les alliances et la maîtrise du terrain."],
  ["La Deuxième Guerre", "Quel'Thalas défend ses bois sacrés et découvre le prix d'une diplomatie continentale."],
  ["Destruction du Puits de Soleil", "Le coeur du royaume est brisé, mais ses archives, ses serments et son peuple demeurent."],
  ["Naissance des Sin'dorei", "Le deuil devient identité : les enfants du sang portent la mémoire des disparus."],
  ["Reconstruction", "Les quartiers, jardins, académies et institutions rouvrent sous surveillance royale."],
  ["Aujourd'hui", "Un royaume vivant, prudent, fastueux sans tapage, tourné vers l'avenir."],
];

const monarchs = [
  {
    name: "Dath'Remar Sunstrider",
    role: "Fondateur du royaume",
    period: "Fondation de Quel'Thalas",
    summary: "Premier repère dynastique, il donne aux exilés hauts-elfes une patrie, une couronne et un principe de souveraineté durable.",
    bio: "Dans les archives publiques, Dath'Remar est moins présenté comme une statue intouchable que comme l'acte de naissance du royaume : celui qui transforme l'exil en institution, la magie en responsabilité civique et le territoire en promesse commune.",
    legacy: "La légitimité Sunstrider, les premiers serments de Lune-d'Argent et l'idée que la couronne protège autant qu'elle gouverne.",
  },
  {
    name: "Anasterian Sunstrider",
    role: "Roi de longue mémoire",
    period: "Âge de défense et de splendeur",
    summary: "Souverain associé à la stabilité de Lune-d'Argent, aux alliances difficiles et à la défense des frontières du royaume.",
    bio: "Anasterian incarne la monarchie dans sa durée : audiences, vigilance militaire, prudence diplomatique et maintien du prestige royal. Sa figure rappelle que Quel'Thalas n'a jamais été seulement une cité brillante, mais un État tenu par des décisions exigeantes.",
    legacy: "La grandeur administrative de la capitale, la mémoire des guerres et l'image d'une couronne capable de durer.",
  },
  {
    name: "Kael'thas Sunstrider",
    role: "Prince héritier",
    period: "Crise, rupture et naissance des Sin'dorei",
    summary: "Figure centrale d'une époque fracturée, présente dans l'histoire du royaume sans en absorber toute la mémoire.",
    bio: "Kael'thas appartient aux chapitres les plus douloureux et les plus commentés des registres royaux. Le portail le replace dans la continuité dynastique : héritier d'une maison, témoin d'une catastrophe, symbole d'un peuple qui cherche à survivre sans oublier ce qu'il a perdu.",
    legacy: "La transition vers l'identité sin'dorei, les débats de reconstruction et la nécessité de séparer mémoire royale et culte de personnalité.",
  },
];

const regions = {
  silvermoon: {
    title: "Lune-d'Argent",
    image: heroImage,
    description:
      "Capitale solaire du royaume, Lune-d'Argent rassemble palais, promenades, chancelleries, jardins publics et districts d'artisanat fin.",
    feature: "Urbanisme monumental et défense enchantée.",
    wildlife: "Faucons-pérégrins dorés, lynx des bois, phalènes de feu doux.",
    architecture: "Flèches d'ivoire, ponts ajourés, arcades rouges et or.",
  },
  woods: {
    title: "Bois des Chants éternels",
    image: woodsImage,
    description:
      "Coeur verdoyant du royaume, ces bois préservent la lumière ancienne, les sentiers de mémoire et les villages de veille.",
    feature: "Forêt entretenue comme un jardin sacré et une frontière vivante.",
    wildlife: "Dragonhawks, cerfs solaires, chouettes blanches et jeunes lynx.",
    architecture: "Belvédères, ponts fins, pierres de route et kiosques de garde.",
  },
  sunstrider: {
    title: "Île de Haut-Soleil",
    description:
      "Lieu d'origine et de formation, l'île porte encore le souffle des premiers serments et des premières académies.",
    feature: "Point de passage recommandé pour comprendre la fondation du royaume.",
    wildlife: "Oiseaux marins, petits félins des côtes et fleurs de sel doré.",
    architecture: "Tours basses, cours d'entraînement, quais de pierre claire.",
  },
  academy: {
    title: "Académies de magie",
    description:
      "Institutions exigeantes où la pratique arcane est enseignée comme un service, une science et une responsabilité publique.",
    feature: "Accès sur accréditation, visites guidées dans les ailes publiques.",
    wildlife: "Familiers homologués, phalènes lumineuses et plantes réactives.",
    architecture: "Salles hautes, verrières, bibliothèques scellées, cercles d'étude.",
  },
  walk: {
    title: "Promenade des Anciens",
    description:
      "Une grande allée patrimoniale reliant jardins, statues, fontaines et archives de la mémoire dynastique.",
    feature: "Cérémonies publiques et veillées de restauration.",
    wildlife: "Paons dorés, pollinisateurs des jardins, poissons des bassins.",
    architecture: "Statuaire, fontaines fines, bancs de pierre et portiques gravés.",
  },
  frontiers: {
    title: "Marches frontalières",
    description:
      "Territoires de vigilance où les routes commerciales croisent postes de garde, bois denses et anciennes lignes de défense.",
    feature: "Accès conseillé avec escorte ou itinéraire officiel.",
    wildlife: "Lynx adultes, rapaces, sangliers des sous-bois et lucioles chaudes.",
    architecture: "Tours de guet, arches de contrôle, relais de caravane.",
  },
};

const regionOrder = ["silvermoon", "woods", "sunstrider", "academy", "walk", "frontiers"];

const regionRoutes = {
  silvermoon: "lune-dargent",
  woods: "bois-des-chants-eternels",
  sunstrider: "ile-de-haut-soleil",
  academy: "academies-de-magie",
  walk: "promenade-des-anciens",
  frontiers: "marches-frontalieres",
};

const routeToRegion = Object.fromEntries(Object.entries(regionRoutes).map(([key, slug]) => [slug, key]));

const places = [
  {
    slug: "grande-avenue-solaire",
    title: "Grande avenue solaire",
    text: "L'axe cérémoniel de Lune-d'Argent, pensé pour les délégations et les processions.",
  },
  {
    slug: "promenade-des-anciens",
    title: "Promenade des Anciens",
    text: "Une allée patrimoniale où statues, arbres-mémoires et fontaines racontent la dynastie.",
  },
  {
    slug: "academie-de-magie",
    title: "Académie de magie",
    text: "Centre d'enseignement encadré, accessible aux visiteurs accrédités.",
  },
  {
    slug: "ile-de-haut-soleil",
    title: "Île de Haut-Soleil",
    text: "Lieu de naissance symbolique, idéal pour comprendre les premiers serments du royaume.",
  },
];

const culture = [
  {
    slug: "traditions",
    title: "Traditions",
    text: "Serments de mémoire, rites solaires, salutations formelles et hospitalité codifiée.",
  },
  {
    slug: "magie",
    title: "Magie",
    text: "Discipline publique, service civique, recherche académique et protections de quartier.",
  },
  {
    slug: "architecture",
    title: "Architecture",
    text: "Crème, or, rouge, lignes verticales et jardins intégrés aux institutions.",
  },
  {
    slug: "artisanat",
    title: "Artisanat",
    text: "Joaillerie fine, tissus crimson, reliure, vitrail, gravure et instruments arcaniques.",
  },
  {
    slug: "fetes",
    title: "Fêtes",
    text: "Festivals du Puits, veillées des jardins, concerts de cour et journées de restauration.",
  },
  {
    slug: "vie-quotidienne",
    title: "Vie quotidienne",
    text: "Terrasses calmes, patrouilles polies, marchés parfumés et débats d'académie.",
  },
];

const itineraries = {
  first: {
    label: "Première visite",
    duration: "1 journée",
    title: "Capitale et jardins",
    description:
      "Grande avenue solaire, Promenade des Anciens, terrasses publiques et point de vue sur les flèches royales avant le coucher du soleil.",
  },
  culture: {
    label: "Culture",
    duration: "2 journées",
    title: "Ateliers, archives et fêtes",
    description:
      "Visite des quartiers d'artisanat, halte aux bibliothèques publiques, concert de cour et marché des étoffes crimson.",
  },
  diplomacy: {
    label: "Diplomatie",
    duration: "Sur accréditation",
    title: "Chancelleries et audiences",
    description:
      "Entrée par les portes orientales, passage au bureau des délégations, audience protocolaire et réception dans les jardins.",
  },
};

const news = [
  {
    slug: "festival-du-puits",
    meta: "3 jours",
    title: "Le Festival du Puits de Soleil débutera sous haute garde cérémonielle.",
    href: "/actualites/festival-du-puits",
    label: "Lire l'avis public",
    body: "Les accès au sanctuaire seront ouverts par créneaux, avec priorité aux délégations enregistrées, aux familles citoyennes et aux académies accréditées.",
    details: [
      ["Accès", "Entrée par créneaux officiels, contrôle des invitations et files séparées pour les délégations."],
      ["Cérémonie", "Ouverture au lever du soleil, allocution de la chancellerie et veillée publique au sanctuaire."],
      ["Visiteurs", "Tenue correcte, silence dans les galeries hautes et aucune démonstration magique hors autorisation."],
    ],
    actionHref: "/visite",
    actionLabel: "Préparer l'accès",
    actionIcon: MapPinned,
  },
  {
    slug: "jardins-royaux",
    meta: "Cette semaine",
    title: "Les jardins royaux rouvrent aux visiteurs après restauration des fontaines.",
    href: "/actualites/jardins-royaux",
    label: "Lire la réouverture",
    body: "La Promenade des Anciens retrouve son circuit complet. Les visites du soir sont maintenues, sous réserve des cérémonies privées de la cour.",
    details: [
      ["Horaires publics", "Jardins ouverts de l'aube au crépuscule, avec fermeture partielle pendant les audiences de cour."],
      ["Parcours", "Fontaines restaurées, portiques gravés et belvédères accessibles par la promenade principale."],
      ["Règles", "Photographies arcaniques interdites près des bassins et circulation limitée autour des massifs restaurés."],
    ],
    actionHref: "/lieux/promenade-des-anciens",
    actionLabel: "Voir la promenade",
    actionIcon: MapPinned,
  },
  {
    slug: "caravanes-commerciales",
    meta: "Administration",
    title: "La chancellerie publie une nouvelle procédure pour les caravanes commerciales.",
    href: "/actualites/caravanes-commerciales",
    label: "Lire la procédure",
    body: "Les convois doivent désormais déposer leurs manifestes trois jours avant l'entrée par les portes orientales, cachet de guilde compris.",
    details: [
      ["Délai", "Manifeste complet exigé trois jours avant l'entrée du convoi sur le territoire."],
      ["Contrôle", "Inspection des cargaisons, cachet de guilde et validation par la chancellerie commerciale."],
      ["Entrée", "Passage par les portes orientales uniquement, sauf laissez-passer diplomatique explicite."],
    ],
    actionHref: "/contacts/commerce",
    actionLabel: "Joindre le commerce",
    actionIcon: Mail,
  },
];

const contacts = [
  {
    slug: "diplomatie",
    title: "Diplomatie",
    text: "Ambassades, délégations, traités, audiences protocolaires.",
    label: "Bureau des délégations",
    href: "/contacts/diplomatie",
  },
  {
    slug: "commerce",
    title: "Commerce",
    text: "Accréditations marchandes, routes, taxes, convois.",
    label: "Chancellerie commerciale",
    href: "/contacts/commerce",
  },
  {
    slug: "tourisme",
    title: "Tourisme",
    text: "Visites guidées, restrictions, jardins publics, accès aux académies.",
    label: "Office royal",
    href: "/contacts/tourisme",
  },
  {
    slug: "administration",
    title: "Administration",
    text: "Registres, autorisations, archives et demandes citoyennes.",
    label: "Guichet central",
    href: "/contacts/administration",
  },
  {
    slug: "citoyens",
    title: "Citoyens",
    text: "Signalements, services de quartier, cérémonies et informations publiques.",
    label: "Registre civique",
    href: "/contacts/citoyens",
  },
];

const securityBadges = [
  {
    icon: Shield,
    label: "Sceau royal",
    text: "Certificat solaire valide et contrôlé par la Chancellerie.",
  },
  {
    icon: Sparkles,
    label: "Anti-divination",
    text: "Lecture distante, miroirs indiscrets et regards non invités neutralisés.",
  },
  {
    icon: ScrollText,
    label: "RGPD",
    text: "Runes Générales de Protection Diplomatique appliquées aux registres.",
  },
  {
    icon: Landmark,
    label: "Audit public",
    text: "Dernier contrôle : Chambre des Magistères, cycle administratif 7.",
  },
];

const homeSections = [
  {
    icon: ScrollText,
    eyebrow: "Archives royales",
    title: "Histoire",
    text: "Une chronologie lisible pour comprendre la fondation, les guerres, le Puits de Soleil et la reconstruction sans transformer le portail en encyclopédie.",
    image: wellImage,
    imageAlt: "Sanctuaire doré du Puits de Soleil",
    caption: "Archives du Puits de Soleil",
    href: "/histoire",
    cta: "Aller à l'histoire",
    highlights: ["Fondation du royaume", "Dynastie Sunstrider", "Reconstruction actuelle"],
  },
  {
    icon: Crown,
    eyebrow: "Couronne",
    title: "La Monarchie",
    text: "La maison Sunstrider comme institution : légitimité, devoir public, mémoire dynastique et place de Kael'thas dans une histoire plus vaste.",
    image: courtImage,
    imageAlt: "Salle d'audience de la cour royale",
    caption: "Cour royale de Lune-d'Argent",
    href: "/monarchie",
    cta: "Voir la monarchie",
    highlights: ["Dath'Remar", "Anasterian", "Kael'thas"],
  },
  {
    icon: Compass,
    eyebrow: "Territoire",
    title: "Découvrir Quel'Thalas",
    text: "La grande porte vers les régions : capitale, bois, académies, promenades et marches frontalières avec leurs particularités.",
    image: heroImage,
    imageAlt: "Vue monumentale de Lune-d'Argent",
    caption: "Capitale du royaume",
    href: "/decouvrir",
    cta: "Explorer le royaume",
    highlights: ["Lune-d'Argent", "Bois des Chants éternels", "Marches frontalières"],
  },
  {
    icon: MapPinned,
    eyebrow: "Carte officielle",
    title: "Lieux incontournables",
    text: "Les haltes qui donnent envie de cliquer : grande avenue solaire, académie, promenade, jardins et lieux de mémoire.",
    image: heroImage,
    imageAlt: "Avenue solaire de Lune-d'Argent",
    caption: "Itinéraires publics",
    href: "/lieux",
    cta: "Voir les lieux",
    highlights: ["Grande avenue solaire", "Promenade des Anciens", "Académie de magie"],
  },
  {
    icon: BookOpenText,
    eyebrow: "Vie sin'dorei",
    title: "Culture",
    text: "Traditions, magie, architecture, artisanat et fêtes : le royaume existe aussi dans ses gestes ordinaires.",
    image: woodsImage,
    imageAlt: "Bois dorés des Chants éternels",
    caption: "Vie sin'dorei",
    href: "/culture",
    cta: "Entrer dans la culture",
    highlights: ["Traditions", "Artisanat", "Fêtes publiques"],
  },
  {
    icon: Shield,
    eyebrow: "Office royal",
    title: "Préparer sa visite",
    text: "Accès, recommandations, étiquette, itinéraires et règles à respecter avant d'entrer sur le territoire.",
    image: courtImage,
    imageAlt: "Chancellerie accueillant les visiteurs accrédités",
    caption: "Office royal de tourisme",
    href: "/visite",
    cta: "Préparer la visite",
    highlights: ["Première visite", "Circuit culture", "Accréditation diplomatique"],
  },
  {
    icon: Sparkles,
    eyebrow: "Annonces publiques",
    title: "Actualités",
    text: "Faux avis officiels, festivals, jardins rouverts et procédures administratives pour donner une vraie respiration au portail.",
    image: wellImage,
    imageAlt: "Sanctuaire public illuminé",
    caption: "Avis publics",
    href: "/actualites",
    cta: "Lire les annonces",
    highlights: ["Festival du Puits", "Jardins royaux", "Caravanes commerciales"],
  },
  {
    icon: Mail,
    eyebrow: "Services publics",
    title: "Contacts",
    text: "Diplomatie, commerce, tourisme, administration et citoyens : chaque demande a sa porte, sans adresse mail ridicule.",
    image: courtImage,
    imageAlt: "Bureaux administratifs de la chancellerie",
    caption: "Services officiels",
    href: "/contacts",
    cta: "Choisir un service",
    highlights: ["Diplomatie", "Commerce", "Administration"],
  },
];

function normalizePath(pathname) {
  const cleanPath = pathname.replace(/\/+$/, "");
  return cleanPath || "/";
}

function useRoute() {
  const [path, setPath] = useState(() => normalizePath(window.location.pathname));

  useEffect(() => {
    const onPopState = () => setPath(normalizePath(window.location.pathname));
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const navigate = (href) => {
    if (href.startsWith("#")) {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    const nextPath = normalizePath(href);
    if (nextPath !== normalizePath(window.location.pathname)) {
      window.history.pushState({}, "", nextPath);
      setPath(nextPath);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return [path, navigate];
}

function useReveal(path) {
  useEffect(() => {
    const items = document.querySelectorAll(".reveal");

    if (!("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-visible"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [path]);
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeItinerary, setActiveItinerary] = useState("first");
  const [activeRegion, setActiveRegion] = useState("silvermoon");
  const [currentPath, navigate] = useRoute();
  const selectedItinerary = itineraries[activeItinerary];

  useReveal(currentPath);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHome = currentPath === "/";

  const headerClass = useMemo(
    () =>
      `fixed inset-x-0 top-0 z-50 flex min-h-[68px] items-center justify-between gap-6 border-b px-[max(18px,calc((100vw-1180px)/2))] py-3 backdrop-blur-xl transition-colors md:min-h-[76px] md:py-3.5 ${
        scrolled || menuOpen || !isHome
          ? "border-gold/30 bg-ivory/95 text-ink"
          : "border-ivory/20 bg-ink/45 text-ivory"
      }`,
    [isHome, menuOpen, scrolled],
  );

  const handleNavigation = (event) => {
    const anchor = event.target.closest("a[href]");
    if (!anchor) return;

    const href = anchor.getAttribute("href");
    if (!href || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) return;

    const url = new URL(anchor.href, window.location.origin);
    if (url.origin !== window.location.origin) return;

    event.preventDefault();
    setMenuOpen(false);
    navigate(href.startsWith("#") ? href : url.pathname);
  };

  return (
    <div id="top" className="min-h-screen overflow-x-hidden bg-cream text-ink" onClick={handleNavigation}>
      <header className={headerClass}>
        <a className="flex min-w-0 items-center gap-3" href="/" aria-label="Retour a l'accueil">
          <img
            className="h-12 w-10 shrink-0 object-contain drop-shadow-[0_0_10px_rgba(215,170,85,.55)] md:h-14 md:w-12"
            src={sunstriderLogo}
            alt="Emblème de Quel'Thalas"
          />
          <span>
            <strong className="block font-serifTitle text-base font-bold leading-tight">Quel'Thalas</strong>
            <small className="block text-xs opacity-80">Portail royal</small>
          </span>
        </a>

        <button
          className="inline-flex h-11 w-11 items-center justify-center rounded border border-current md:hidden"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-nav"
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <nav
          id="primary-nav"
          className={`absolute left-0 right-0 top-[68px] flex-col border-b border-gold/30 bg-ivory px-5 pb-5 text-ink md:static md:flex md:flex-row md:items-center md:justify-end md:gap-6 md:border-0 md:bg-transparent md:p-0 md:text-current ${
            menuOpen ? "flex" : "hidden md:flex"
          }`}
          aria-label="Navigation principale"
        >
          {navItems.map(([label, href]) => (
            <a
              key={href}
              className={`border-b border-gold/20 py-3 text-sm font-extrabold transition-colors hover:text-crimson md:border-0 md:py-2 ${
                currentPath === href || currentPath.startsWith(`${href}/`) ? "text-crimson md:text-gold-bright" : ""
              }`}
              href={href}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
        </nav>
      </header>

      <main>{renderRoute(currentPath, { activeItinerary, selectedItinerary, setActiveItinerary, activeRegion, setActiveRegion })}</main>

      <footer className="bg-ink px-[max(22px,calc((100vw-1180px)/2))] py-10 text-ivory/80">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_1.65fr]">
          <div className="flex items-start gap-4">
            <img
              className="h-20 w-16 shrink-0 object-contain drop-shadow-[0_0_14px_rgba(215,170,85,.5)]"
              src={sunstriderLogo}
              alt=""
            />
            <div>
              <strong className="font-serifTitle text-xl text-ivory">Royaume de Quel'Thalas</strong>
              <p className="mt-2 max-w-md">
                Portail officiel de la couronne, des services publics sin'dorei et des accès
                diplomatiques dûment enchantés.
              </p>
              <a className="mt-5 inline-flex items-center gap-1 font-extrabold text-gold-bright" href="#top">
                Retour en haut
                <ChevronRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="rounded-lg border border-gold-bright/30 bg-ivory/5 p-5">
            <div className="flex flex-col gap-2 border-b border-gold-bright/20 pb-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="eyebrow mb-1">Sécurité du portail</p>
                <h2 className="font-display text-2xl leading-tight text-ivory">Protection royale active</h2>
              </div>
              <p className="font-mono text-xs uppercase text-gold-bright">TLS-SUNWELL-4096 · Pare-feu runique</p>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {securityBadges.map(({ icon: Icon, label, text }) => (
                <article key={label} className="rounded border border-ivory/15 bg-ink/35 p-4">
                  <div className="flex items-center gap-2 text-gold-bright">
                    <Icon className="h-4 w-4" />
                    <h3 className="font-serifTitle text-sm font-bold uppercase">{label}</h3>
                  </div>
                  <p className="mt-2 text-sm text-ivory/75">{text}</p>
                </article>
              ))}
            </div>

            <div className="mt-5 grid gap-3 border-t border-gold-bright/20 pt-4 text-sm text-ivory/70 md:grid-cols-3">
              <p>
                <strong className="text-ivory">Cookies :</strong> uniquement des biscuits au mana
                strictement nécessaires à l'audience.
              </p>
              <p>
                <strong className="text-ivory">Données :</strong> aucune vente à des cartographes
                tiers, colporteurs ou archivistes non accrédités.
              </p>
              <p>
                <strong className="text-ivory">Alerte :</strong> toute tentative d'intrusion est
                transmise aux Magistères de service.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function renderRoute(path, itineraryProps) {
  const segments = path.split("/").filter(Boolean);
  const [section, slug] = segments;

  if (!section) return <HomePage />;
  if (section === "histoire") return <HistorySection />;
  if (section === "monarchie") return <MonarchySection />;
  if (section === "decouvrir") return slug ? <RegionDetailPage regionKey={routeToRegion[slug]} /> : <DiscoverPage {...itineraryProps} />;
  if (section === "lieux") return slug ? <PlaceDetailPage place={places.find((item) => item.slug === slug)} /> : <PlacesSection />;
  if (section === "culture") return slug ? <CultureDetailPage item={culture.find((entry) => entry.slug === slug)} /> : <CultureSection />;
  if (section === "visite") return <VisitSection {...itineraryProps} />;
  if (section === "actualites") return slug ? <NewsDetailPage article={news.find((item) => item.slug === slug)} /> : <NewsSection />;
  if (section === "contacts") return slug ? <ContactDetailPage contact={contacts.find((item) => item.slug === slug)} /> : <ContactSection />;

  return <NotFoundPage />;
}

function HomePage() {
  return (
    <>
      <HeroSection />
      <NoticeStrip />
      <HomeSectionPreviews />
      <NewsSection compact />
    </>
  );
}

function HomeSectionPreviews() {
  return (
    <section className="bg-cream py-16 lg:py-20" aria-labelledby="home-overview-title">
      <div className="px-[max(22px,calc((100vw-1180px)/2))]">
        <SectionHeading eyebrow="Accueil du portail" title="Tout le royaume, depuis une seule porte.">
          Archives, couronne, territoires, visites, annonces et services publics : les grandes entrées
          du portail royal sont réunies ici pour présenter Quel'Thalas dès l'accueil.
        </SectionHeading>
      </div>

      <div className="mt-4 space-y-10 lg:mt-8 lg:space-y-14">
        {homeSections.map(({ icon: Icon, eyebrow, title, text, href, cta, highlights, image, imageAlt, caption }, index) => (
          <section key={href} className={`reveal py-10 md:py-12 lg:py-14 ${index % 2 ? "bg-ivory" : "bg-cream"}`}>
            <div className="mx-auto grid max-w-[1180px] gap-8 px-[max(22px,calc((100vw-1180px)/2))] lg:grid-cols-[0.9fr_1fr] lg:items-center lg:gap-14">
              <figure className={`relative m-0 min-h-[240px] overflow-hidden rounded-lg border border-gold/40 bg-silver shadow-royal md:min-h-[310px] lg:h-[360px] ${index % 2 ? "lg:order-2" : ""}`}>
                <img className="absolute inset-0 h-full w-full object-cover" src={image} alt={imageAlt} />
                <span className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" aria-hidden="true" />
                <figcaption className="absolute bottom-5 left-5 right-5 flex items-center justify-between gap-4 border-t border-gold-bright/45 pt-4 text-ivory">
                  <span className="font-serifTitle text-sm font-bold uppercase text-gold-bright">{caption}</span>
                  <span className="hidden text-sm text-ivory/75 md:inline">Royaume de Quel'Thalas</span>
                </figcaption>
              </figure>

              <div className={`max-w-[620px] py-2 ${index % 2 ? "lg:order-1" : ""}`}>
                <div className="flex items-center gap-3 text-crimson">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-gold/60 bg-ivory text-gold">
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="font-serifTitle text-xs font-bold uppercase">{eyebrow}</p>
                </div>

                <h3 className="royal-title mt-6 text-3xl md:text-[2.45rem]">{title}</h3>
                <p className="mt-5 text-ink-soft">{text}</p>

                <ul className="mt-7 grid border-y border-gold/30 md:grid-cols-3">
                  {highlights.map((item) => (
                    <li key={item} className="border-b border-gold/30 py-4 last:border-b-0 md:border-b-0 md:border-r md:px-4 md:first:pl-0 md:last:border-r-0">
                      <span className="block h-2 w-2 rotate-45 border border-gold bg-gold/25" />
                      <strong className="mt-4 block font-display text-base leading-tight">{item}</strong>
                    </li>
                  ))}
                </ul>

                <a className="mt-8 inline-flex min-h-[46px] w-fit items-center justify-center gap-2 rounded border border-crimson bg-crimson px-5 py-3 font-extrabold text-ivory transition hover:bg-crimson-deep" href={href}>
                  {cta}
                  <ChevronRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}

function HeroSection() {
  return (
    <section
      id="accueil"
      className="relative grid min-h-[82svh] content-end gap-5 px-[max(18px,calc((100vw-1180px)/2))] pb-9 pt-28 text-ivory md:min-h-[86svh] md:items-end md:pb-16 md:pt-28"
      style={{
        backgroundImage: `linear-gradient(90deg, rgba(32,23,20,.78) 0%, rgba(32,23,20,.46) 42%, rgba(32,23,20,.12) 100%), linear-gradient(0deg, rgba(32,23,20,.72) 0%, rgba(32,23,20,0) 42%), url(${heroImage})`,
        backgroundPosition: "58% center",
        backgroundSize: "cover",
      }}
      aria-labelledby="hero-title"
    >
      <div className="reveal max-w-[840px]">
        <p className="eyebrow">Royaume de Quel'Thalas</p>
        <h1 id="hero-title" className="royal-title max-w-[820px] text-[2.55rem] md:text-[4.15rem]">
          Bienvenue à Quel'Thalas, joyau des Sin'dorei.
        </h1>
        <p className="mt-5 max-w-[640px] font-display text-lg leading-relaxed text-ivory/90 md:text-xl">
          Aux marches du nord, la couronne veille sur une terre de lumière, de mémoire et
          d'excellence arcane. Lune-d'Argent vous ouvre ses portes.
        </p>
        <div className="mt-7 flex flex-wrap gap-3" aria-label="Actions principales">
          <HeroButton href="/decouvrir" tone="primary" icon={Compass}>
            Découvrir le royaume
          </HeroButton>
          <HeroButton href="/visite" tone="gold" icon={MapPinned}>
            Préparer votre visite
          </HeroButton>
          <HeroButton href="/histoire" tone="ghost" icon={ScrollText}>
            Notre histoire
          </HeroButton>
        </div>
      </div>

      <aside className="reveal flex max-w-full flex-wrap justify-start gap-2 text-sm text-ivory/75 md:absolute md:bottom-7 md:right-[max(22px,calc((100vw-1180px)/2))] md:max-w-[560px] md:justify-end">
        {[
          ["Capitale", "Lune-d'Argent"],
          ["Couronne", "Maison Sunstrider"],
          ["Langue officielle", "Thalassien"],
        ].map(([label, value]) => (
          <span key={label} className="rounded border border-ivory/25 bg-ink/35 px-3 py-2">
            {label} <strong className="text-ivory">{value}</strong>
          </span>
        ))}
      </aside>
    </section>
  );
}

function NoticeStrip() {
  return (
    <section className="grid border-b border-crimson/20 bg-ivory md:grid-cols-3" aria-label="Informations publiques">
      {[
        ["Audience", "Guichet royal ouvert", "/contacts/administration"],
        ["Accès", "Portes orientales sous contrôle courtois", "/visite"],
        ["Saison", "Jardins en floraison dorée", "/actualites/jardins-royaux"],
      ].map(([label, value, href]) => (
        <a key={label} className="border-b border-crimson/20 px-5 py-5 transition hover:bg-cream md:min-h-[94px] md:border-b-0 md:border-r md:px-16" href={href}>
          <span className="font-serifTitle text-xs font-bold uppercase text-crimson">{label}</span>
          <strong className="mt-1 block font-display text-lg leading-snug">{value}</strong>
        </a>
      ))}
    </section>
  );
}

function DiscoverPage({ activeRegion, setActiveRegion }) {
  return (
    <>
      <RegionsSection activeRegion={activeRegion} setActiveRegion={setActiveRegion} />
      <PlacesSection />
    </>
  );
}

function RegionDetailPage({ regionKey }) {
  if (!regionKey || !regions[regionKey]) return <NotFoundPage />;

  const region = regions[regionKey];

  return (
    <>
      <section className="section-pad bg-cream pt-32">
        <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="reveal">
            <p className="eyebrow">Guide régional</p>
            <h1 className="royal-title text-4xl md:text-[3.5rem]">{region.title}</h1>
            <p className="mt-5 max-w-[690px] text-ink-soft">{region.description}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <HeroButton href="/decouvrir" tone="primary" icon={Compass}>
                Toutes les régions
              </HeroButton>
              <HeroButton href="/visite" tone="gold" icon={MapPinned}>
                Préparer l'accès
              </HeroButton>
            </div>
          </div>
          {region.image ? (
            <ImagePanel image={region.image} alt={region.title} caption={region.title} />
          ) : (
            <article className="panel reveal min-h-[320px] bg-crimson-deep text-ivory">
              <Sparkles className="mb-5 h-8 w-8 text-gold-bright" />
              <h2 className="font-display text-3xl">Aperçu réservé aux visiteurs accrédités</h2>
              <p className="mt-4 text-ivory/80">
                Les illustrations détaillées de cette zone sont consultables auprès de l'office royal.
              </p>
            </article>
          )}
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            ["Particularité", region.feature],
            ["Espèces locales", region.wildlife],
            ["Architecture", region.architecture],
          ].map(([label, value]) => (
            <article key={label} className="panel reveal">
              <p className="font-serifTitle text-xs font-bold uppercase text-crimson">{label}</p>
              <p className="mt-3 text-ink-soft">{value}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function PlaceDetailPage({ place }) {
  if (!place) return <NotFoundPage />;

  return (
    <section className="section-pad bg-ivory pt-32">
      <div className="reveal max-w-3xl">
        <p className="eyebrow">Lieu incontournable</p>
        <h1 className="royal-title text-4xl md:text-[3.5rem]">{place.title}</h1>
        <p className="mt-5 text-ink-soft">{place.text}</p>
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        <article className="panel reveal">
          <h2 className="font-display text-2xl">Pourquoi y aller</h2>
          <p className="mt-3 text-ink-soft">Pour voir comment le royaume met en scène son histoire sans la figer.</p>
        </article>
        <article className="panel reveal">
          <h2 className="font-display text-2xl">Accès conseillé</h2>
          <p className="mt-3 text-ink-soft">Passage par les itinéraires publics et créneaux recommandés de l'office royal.</p>
        </article>
        <article className="panel reveal">
          <h2 className="font-display text-2xl">À proximité</h2>
          <p className="mt-3 text-ink-soft">Jardins, belvédères, fontaines et comptoirs d'artisanat officiel.</p>
        </article>
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <HeroButton href="/decouvrir" tone="primary" icon={Compass}>
          Retour aux lieux
        </HeroButton>
        <HeroButton href="/visite" tone="gold" icon={MapPinned}>
          Ajouter à l'itinéraire
        </HeroButton>
      </div>
    </section>
  );
}

function CultureDetailPage({ item }) {
  if (!item) return <NotFoundPage />;

  return (
    <section className="section-pad bg-cream pt-32">
      <div className="reveal max-w-3xl">
        <p className="eyebrow">Culture sin'dorei</p>
        <h1 className="royal-title text-4xl md:text-[3.5rem]">{item.title}</h1>
        <p className="mt-5 text-ink-soft">{item.text}</p>
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        <article className="panel reveal">
          <h2 className="font-display text-2xl">À observer</h2>
          <p className="mt-3 text-ink-soft">
            Les usages publics, les gestes de courtoisie et la manière dont le royaume lie beauté,
            discipline et mémoire.
          </p>
        </article>
        <article className="panel reveal">
          <h2 className="font-display text-2xl">Où commencer</h2>
          <p className="mt-3 text-ink-soft">
            Les visites culturelles partent des promenades publiques et se prolongent dans les ateliers
            accrédités.
          </p>
        </article>
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <HeroButton href="/culture" tone="primary" icon={BookOpenText}>
          Toute la culture
        </HeroButton>
        <HeroButton href="/visite" tone="gold" icon={MapPinned}>
          Voir les visites
        </HeroButton>
      </div>
    </section>
  );
}

function NewsDetailPage({ article }) {
  if (!article) return <NotFoundPage />;

  const detailItems = article.details ?? [
    ["Service concerné", "Chancellerie royale et office public compétent."],
    ["Statut", "Avis publié, registre ouvert, mise à jour surveillée."],
    ["Action recommandée", "Consulter les accès et contacter le service concerné si nécessaire."],
  ];
  const ActionIcon = article.actionIcon ?? Mail;

  return (
    <section className="section-pad bg-ivory pt-32">
      <div className="reveal max-w-3xl">
        <p className="eyebrow">Actualité royale · {article.meta}</p>
        <h1 className="royal-title text-4xl md:text-[3.4rem]">{article.title}</h1>
        <p className="mt-5 text-ink-soft">{article.body}</p>
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {detailItems.map(([title, text]) => (
          <article key={title} className="panel reveal">
            <h2 className="font-display text-2xl">{title}</h2>
            <p className="mt-3 text-ink-soft">{text}</p>
          </article>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <HeroButton href="/actualites" tone="primary" icon={ScrollText}>
          Toutes les annonces
        </HeroButton>
        <HeroButton href={article.actionHref ?? "/contacts"} tone="gold" icon={ActionIcon}>
          {article.actionLabel ?? "Service compétent"}
        </HeroButton>
      </div>
    </section>
  );
}

function ContactDetailPage({ contact }) {
  if (!contact) return <NotFoundPage />;

  return (
    <section className="section-pad bg-cream pt-32">
      <div className="reveal max-w-3xl">
        <p className="eyebrow">Service officiel</p>
        <h1 className="royal-title text-4xl md:text-[3.5rem]">{contact.title}</h1>
        <p className="mt-5 text-ink-soft">{contact.text}</p>
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {[
          ["1", "Préparer l'objet", "Indiquez le motif, la délégation ou le registre concerné."],
          ["2", "Déposer la requête", "Le bureau trie la demande avant transmission aux services compétents."],
          ["3", "Audience ou réponse", "Une réponse officielle est émise après validation administrative."],
        ].map(([step, title, text]) => (
          <article key={step} className="panel reveal">
            <NumberBadge>{step}</NumberBadge>
            <h2 className="font-display text-2xl">{title}</h2>
            <p className="mt-3 text-ink-soft">{text}</p>
          </article>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <HeroButton href="/contacts" tone="primary" icon={Mail}>
          Tous les services
        </HeroButton>
        <HeroButton href="/visite" tone="gold" icon={MapPinned}>
          Voir les accès
        </HeroButton>
      </div>
    </section>
  );
}

function NotFoundPage() {
  return (
    <section className="section-pad bg-cream pt-32">
      <div className="reveal max-w-3xl">
        <p className="eyebrow">Registre introuvable</p>
        <h1 className="royal-title text-4xl md:text-[3.5rem]">Cette page n'existe pas dans les archives publiques.</h1>
        <p className="mt-5 text-ink-soft">
          Le lien demandé ne correspond à aucune entrée ouverte du portail royal.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <HeroButton href="/" tone="primary" icon={Compass}>
            Retour au portail
          </HeroButton>
          <HeroButton href="/contacts/administration" tone="gold" icon={Mail}>
            Signaler l'erreur
          </HeroButton>
        </div>
      </div>
    </section>
  );
}

function HeroButton({ href, tone, icon: Icon, children }) {
  const tones = {
    primary: "border-ivory/20 bg-crimson text-ivory hover:bg-crimson-deep",
    gold: "border-ivory/30 bg-gold-bright text-ink hover:bg-gold",
    ghost: "border-ivory/40 bg-ivory/10 text-ivory hover:bg-ivory/20",
  };

  return (
    <a
      className={`inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded border px-5 py-3 font-extrabold leading-none transition md:w-auto ${tones[tone]}`}
      href={href}
    >
      <Icon className="h-4 w-4" />
      {children}
    </a>
  );
}

function ImagePanel({ image, alt, caption }) {
  return (
    <figure className="reveal relative m-0 overflow-hidden rounded-lg border border-gold/50 bg-silver shadow-royal-deep">
      <img className="aspect-[16/10] w-full object-cover" src={image} alt={alt} />
      <figcaption className="absolute bottom-4 left-4 rounded border border-ivory/30 bg-ink/70 px-3 py-2 text-xs font-bold text-ivory">
        {caption}
      </figcaption>
    </figure>
  );
}

function SectionHeading({ eyebrow, title, children, light = false }) {
  return (
    <div className="reveal mb-9 max-w-[790px]">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className={`royal-title text-3xl md:text-[2.65rem] ${light ? "text-ivory" : "text-ink"}`}>{title}</h2>
      {children && <p className={`mt-5 max-w-[690px] ${light ? "text-ivory/80" : "text-ink-soft"}`}>{children}</p>}
    </div>
  );
}

function HistorySection() {
  return (
    <section id="histoire" className="section-pad bg-gradient-to-b from-ivory/90 to-cream" aria-labelledby="history-title">
      <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="reveal">
          <p className="eyebrow">Archives royales</p>
          <h2 id="history-title" className="royal-title text-3xl md:text-[2.65rem]">
            Une histoire gravée dans la pierre, pas perdue dans les marges.
          </h2>
          <p className="mt-5 max-w-[690px] text-ink-soft">
            Quel'Thalas ne se résume pas à ses blessures. Le royaume se raconte par ses fondations,
            ses serments, ses pertes et la discipline avec laquelle il s'est relevé.
          </p>
        </div>
        <ImagePanel image={wellImage} alt="Sanctuaire doré du Puits de Soleil" caption="Sanctuaire restauré du Puits de Soleil" />
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3" aria-label="Chronologie de Quel'Thalas">
        {timeline.map(([title, text], index) => (
          <article key={title} className="panel reveal min-h-[220px]">
            <NumberBadge>{String(index + 1).padStart(2, "0")}</NumberBadge>
            <h3 className="font-display text-[1.38rem] leading-tight">{title}</h3>
            <p className="mt-3 text-ink-soft">{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function MonarchySection() {
  return (
    <section id="monarchie" className="section-pad bg-crimson-deep text-ivory" aria-labelledby="monarchy-title">
      <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <ImagePanel image={courtImage} alt="Grande salle administrative de la cour royale" caption="Chancellerie et salle d'audience royale" />
        <div className="reveal">
          <p className="eyebrow">La Couronne</p>
          <h2 id="monarchy-title" className="royal-title text-3xl md:text-[2.65rem]">
            La monarchie n'est pas un portrait. C'est une continuité.
          </h2>
          <p className="mt-5 max-w-[690px] text-ivory/80">
            La famille Sunstrider incarne la légitimité historique de Quel'Thalas : fondation,
            protection du Puits, autorité diplomatique et devoir envers les Sin'dorei.
          </p>
          <div className="mt-7 grid gap-4">
            {monarchs.map(({ name, role, period, summary }) => (
              <article key={name} className="rounded-lg border border-gold-bright/35 bg-ivory/10 p-5">
                <p className="font-serifTitle text-xs font-bold uppercase text-gold-bright">{role}</p>
                <h3 className="mt-2 font-display text-[1.38rem] leading-tight">{name}</h3>
                <p className="mt-1 text-sm font-bold uppercase text-ivory/55">{period}</p>
                <p className="mt-3 text-ivory/80">{summary}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-12 grid gap-5 lg:grid-cols-3" aria-label="Biographies Sunstrider">
        {monarchs.map(({ name, role, bio, legacy }) => (
          <article key={name} className="reveal rounded-lg border border-gold-bright/35 bg-ivory p-6 text-ink shadow-royal">
            <p className="font-serifTitle text-xs font-bold uppercase text-crimson">{role}</p>
            <h3 className="mt-2 font-display text-2xl leading-tight">{name}</h3>
            <p className="mt-4 text-ink-soft">{bio}</p>
            <div className="mt-6 border-t border-gold/30 pt-4">
              <p className="font-serifTitle text-xs font-bold uppercase text-crimson">Héritage public</p>
              <p className="mt-2 text-ink-soft">{legacy}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function RegionsSection({ activeRegion = "silvermoon", setActiveRegion = () => {} }) {
  const selectedRegion = regions[activeRegion];

  return (
    <section id="decouvrir" className="section-pad bg-cream" aria-labelledby="discover-title">
      <SectionHeading eyebrow="Découvrir Quel'Thalas" title="Un royaume se comprend par ses lieux.">
        Chaque région possède son rythme : cérémonial dans la capitale, pastoral dans les bois,
        studieux près des académies, diplomatique aux portes.
      </SectionHeading>

      <div className="grid items-start gap-7 lg:grid-cols-[1.55fr_0.85fr]">
        <div className="grid gap-4 md:grid-cols-2" aria-label="Régions de Quel'Thalas">
          {regionOrder.map((key) => (
            <button
              key={key}
              className={`reveal group relative min-h-[172px] overflow-hidden rounded-lg border text-left text-ivory shadow-royal transition md:min-h-[188px] ${
                activeRegion === key ? "border-gold-bright ring-4 ring-gold-bright/20" : "border-gold/40"
              }`}
              type="button"
              aria-pressed={activeRegion === key}
              onClick={() => setActiveRegion(key)}
            >
              {regions[key].image ? (
                <img
                  className="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  src={regions[key].image}
                  alt=""
                />
              ) : (
                <span
                  className="absolute inset-5 border border-gold-bright/50 bg-[radial-gradient(circle_at_50%_42%,rgba(215,170,85,.7)_0_5%,transparent_6%),linear-gradient(45deg,transparent_46%,rgba(215,170,85,.65)_47%_53%,transparent_54%),linear-gradient(-45deg,transparent_46%,rgba(215,170,85,.45)_47%_53%,transparent_54%)] bg-crimson opacity-80"
                  aria-hidden="true"
                />
              )}
              <span className="absolute inset-0 bg-gradient-to-t from-ink/85 to-ink/10" />
              <span className="absolute bottom-5 left-5 right-5 z-10 font-serifTitle text-lg font-bold leading-tight">
                {regions[key].title}
              </span>
            </button>
          ))}
        </div>

        <aside className="reveal top-24 rounded-lg border border-gold/45 bg-ivory p-7 shadow-royal lg:sticky" aria-live="polite">
          <p className="eyebrow">Guide régional</p>
          <h3 className="font-display text-3xl leading-tight">{selectedRegion.title}</h3>
          <p className="mt-3 text-ink-soft">{selectedRegion.description}</p>
          <dl className="mt-6 grid gap-4">
            {[
              ["Particularité", selectedRegion.feature],
              ["Espèces locales", selectedRegion.wildlife],
              ["Architecture", selectedRegion.architecture],
            ].map(([label, value]) => (
              <div key={label} className="border-t border-gold/30 pt-4">
                <dt className="font-serifTitle text-xs font-bold uppercase text-crimson">{label}</dt>
                <dd className="mt-1 text-ink-soft">{value}</dd>
              </div>
            ))}
          </dl>
          <a className="mt-6 inline-flex items-center gap-1 font-extrabold text-crimson" href={`/decouvrir/${regionRoutes[activeRegion]}`}>
            Ouvrir la fiche de {selectedRegion.title}
            <ChevronRight className="h-4 w-4" />
          </a>
        </aside>
      </div>
    </section>
  );
}

function PlacesSection() {
  return (
    <section className="section-pad bg-ivory" aria-labelledby="places-title">
      <SectionHeading eyebrow="Lieux incontournables" title="Des adresses qui méritent un détour, pas une note de bas de page." />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {places.map(({ slug, title, text }, index) => (
          <a key={title} className="panel reveal group flex min-h-[220px] flex-col transition hover:-translate-y-1 hover:border-gold/60" href={`/lieux/${slug}`}>
            <NumberBadge>{String(index + 1).padStart(2, "0")}</NumberBadge>
            <h3 className="font-display text-[1.38rem] leading-tight">{title}</h3>
            <p className="mt-3 text-ink-soft">{text}</p>
            <span className="mt-auto inline-flex items-center gap-1 font-extrabold text-crimson">
              Voir la fiche
              <ChevronRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}

function CultureSection() {
  return (
    <section id="culture" className="section-pad bg-gradient-to-b from-ivory/90 to-cream" aria-labelledby="culture-title">
      <SectionHeading eyebrow="Culture sin'dorei" title="La noblesse se voit dans les gestes ordinaires.">
        La culture de Quel'Thalas n'est pas seulement cérémonielle. Elle se vit dans les marchés,
        les ateliers, les fêtes de quartier, les bibliothèques et l'art de recevoir.
      </SectionHeading>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {culture.map(({ slug, title, text }) => (
          <a key={title} className="panel reveal group flex min-h-[178px] flex-col transition hover:-translate-y-1 hover:border-gold/60" href={`/culture/${slug}`}>
            <h3 className="font-display text-[1.38rem] leading-tight">{title}</h3>
            <p className="mt-3 text-ink-soft">{text}</p>
            <span className="mt-auto inline-flex items-center gap-1 font-extrabold text-crimson">
              Explorer
              <ChevronRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}

function VisitSection({ activeItinerary, selectedItinerary, setActiveItinerary }) {
  return (
    <section id="visite" className="section-pad bg-crimson-deep text-ivory" aria-labelledby="visit-title">
      <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="reveal">
          <p className="eyebrow">Office royal de tourisme</p>
          <h2 id="visit-title" className="royal-title text-3xl md:text-[2.65rem]">
            Préparer votre visite
          </h2>
          <p className="mt-5 max-w-[690px] text-ivory/80">
            Les visiteurs sont accueillis avec faste, mais Quel'Thalas reste un royaume souverain :
            l'élégance attendue commence à la porte.
          </p>
          <ul className="mt-7 grid gap-3">
            {[
              "Présenter une lettre d'objet ou une invitation commerciale.",
              "Respecter les sanctuaires, jardins mémoriels et zones d'étude.",
              "Éviter les démonstrations magiques sans autorisation.",
              "Suivre les itinéraires balisés hors des quartiers résidentiels.",
            ].map((item) => (
              <li key={item} className="relative rounded-lg border border-gold-bright/35 bg-ivory/10 py-3 pl-11 pr-4">
                <span className="absolute left-4 top-5 h-3 w-3 rotate-45 border border-gold-bright" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="reveal overflow-hidden rounded-lg border border-gold-bright/45 bg-ivory/10">
          <div className="grid border-b border-gold-bright/35 md:grid-cols-3" role="tablist" aria-label="Itinéraires proposés">
            {Object.entries(itineraries).map(([key, itinerary]) => (
              <button
                key={key}
                className={`min-h-[54px] border-b border-gold-bright/35 px-3 py-3 font-extrabold md:border-b-0 md:border-r ${
                  activeItinerary === key ? "bg-gold-bright text-ink" : "text-ivory"
                }`}
                type="button"
                role="tab"
                aria-selected={activeItinerary === key}
                onClick={() => setActiveItinerary(key)}
              >
                {itinerary.label}
              </button>
            ))}
          </div>
          <div className="min-h-[250px] p-8">
            <p className="eyebrow">{selectedItinerary.duration}</p>
            <h3 className="font-display text-[1.38rem] leading-tight">{selectedItinerary.title}</h3>
            <p className="mt-3 text-ivory/80">{selectedItinerary.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function NewsSection({ compact = false }) {
  const visibleNews = compact ? news.slice(0, 3) : news;

  return (
    <section className="section-pad bg-ivory" aria-labelledby="news-title">
      <SectionHeading eyebrow="Actualités royales" title="Le royaume respire aussi par ses annonces." />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {visibleNews.map(({ meta, title, href, label }) => (
          <article key={title} className="panel reveal flex min-h-[240px] flex-col">
            <p className="mb-3 font-serifTitle text-xs font-bold uppercase text-crimson">{meta}</p>
            <h3 className="font-display text-[1.38rem] leading-tight">{title}</h3>
            <a className="mt-auto inline-flex items-center gap-1 font-extrabold text-crimson" href={href}>
              {label}
              <ChevronRight className="h-4 w-4" />
            </a>
          </article>
        ))}
      </div>
      {compact && (
        <a className="mt-8 inline-flex items-center gap-1 font-extrabold text-crimson" href="/actualites">
          Toutes les annonces royales
          <ChevronRight className="h-4 w-4" />
        </a>
      )}
    </section>
  );
}

function ContactSection() {
  const icons = [Landmark, Shield, Compass, BookOpenText, Mail];
  const [requestSent, setRequestSent] = useState(false);

  const handleContactSubmit = (event) => {
    event.preventDefault();
    setRequestSent(true);
  };

  return (
    <section id="contacts" className="section-pad bg-cream" aria-labelledby="contact-title">
      <SectionHeading eyebrow="Contacts officiels" title="Une porte pour chaque demande.">
        Les requêtes adressées à la couronne sont orientées vers le bon service avant audience.
      </SectionHeading>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {contacts.map(({ title, text, label, href }, index) => {
          const Icon = icons[index];

          return (
            <article key={title} className="panel reveal flex min-h-[235px] flex-col">
              <Icon className="mb-4 h-5 w-5 text-gold" />
              <h3 className="font-display text-[1.38rem] leading-tight">{title}</h3>
              <p className="mt-3 text-ink-soft">{text}</p>
              <a className="mt-auto inline-flex items-center gap-1 font-extrabold text-crimson" href={href}>
                {label}
                <ChevronRight className="h-4 w-4" />
              </a>
            </article>
          );
        })}
      </div>

      <div className="mt-12 grid gap-8 rounded-lg border border-gold/45 bg-ivory p-6 shadow-royal lg:grid-cols-[0.86fr_1.14fr] lg:p-8">
        <div className="reveal">
          <p className="eyebrow">Dépôt de requête</p>
          <h3 className="royal-title text-3xl md:text-[2.4rem]">Formulaire du guichet central</h3>
          <p className="mt-4 text-ink-soft">
            Les demandes sont enregistrées dans le registre public approprié, puis orientées vers le
            service compétent avant réponse officielle.
          </p>
          <div className="mt-6 border-t border-gold/30 pt-5 text-sm text-ink-soft">
            <p>
              <strong className="text-ink">Délai indicatif :</strong> trois jours ouvrés, hors audience
              diplomatique et convocation de chancellerie.
            </p>
            <p className="mt-3">
              <strong className="text-ink">Pièces utiles :</strong> sceau de délégation, objet clair,
              itinéraire souhaité ou registre concerné.
            </p>
          </div>
        </div>

        <form className="reveal grid gap-4" onSubmit={handleContactSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 font-bold text-ink">
              Service destinataire
              <select className="min-h-[46px] rounded border border-gold/45 bg-cream px-3 font-normal text-ink" name="service" defaultValue="tourisme">
                {contacts.map(({ slug, title }) => (
                  <option key={slug} value={slug}>
                    {title}
                  </option>
                ))}
              </select>
            </label>
            <label className="grid gap-2 font-bold text-ink">
              Priorité
              <select className="min-h-[46px] rounded border border-gold/45 bg-cream px-3 font-normal text-ink" name="priority" defaultValue="standard">
                <option value="standard">Standard</option>
                <option value="audience">Audience officielle</option>
                <option value="urgent">Urgence administrative</option>
              </select>
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 font-bold text-ink">
              Nom ou délégation
              <input className="min-h-[46px] rounded border border-gold/45 bg-cream px-3 font-normal text-ink" name="name" placeholder="Maison, guilde ou visiteur" />
            </label>
            <label className="grid gap-2 font-bold text-ink">
              Réponse souhaitée
              <input className="min-h-[46px] rounded border border-gold/45 bg-cream px-3 font-normal text-ink" name="reply" placeholder="Courrier, cristal, messager..." />
            </label>
          </div>

          <label className="grid gap-2 font-bold text-ink">
            Objet
            <input className="min-h-[46px] rounded border border-gold/45 bg-cream px-3 font-normal text-ink" name="subject" placeholder="Ex. demande de visite des jardins royaux" />
          </label>

          <label className="grid gap-2 font-bold text-ink">
            Message
            <textarea className="min-h-[130px] rounded border border-gold/45 bg-cream px-3 py-3 font-normal text-ink" name="message" placeholder="Exposez la requête avec précision et courtoisie." />
          </label>

          <label className="flex items-start gap-3 rounded border border-gold/30 bg-cream px-4 py-3 text-sm text-ink-soft">
            <input className="mt-1" type="checkbox" name="seal" />
            <span>Je certifie que cette demande ne contient ni sort offensif, ni miroir indiscret, ni fausse accréditation.</span>
          </label>

          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <button className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded border border-crimson bg-crimson px-5 py-3 font-extrabold text-ivory transition hover:bg-crimson-deep" type="submit">
              <Mail className="h-4 w-4" />
              Déposer la requête
            </button>
            {requestSent && (
              <p className="rounded border border-gold/45 bg-gold-bright/20 px-4 py-3 text-sm font-bold text-ink">
                Requête enregistrée dans le registre royal. Aucun vrai courrier n'a été envoyé.
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}

function NumberBadge({ children }) {
  return (
    <span className="mb-5 inline-flex h-9 w-9 items-center justify-center rounded-full border border-gold/60 font-serifTitle text-xs font-bold text-crimson">
      {children}
    </span>
  );
}

export default App;
