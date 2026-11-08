/**
 * Luxury Antonovich Design — company content.
 * Contact details, biography, testimonials and markets are taken from the
 * official website (antonovich-design.com, verified Nov 2026). Marketing copy
 * marked "original copy" is written for this site and is not a company quote.
 */
export const studio = {
  name: "Luxury Antonovich Design",
  short: "Antonovich Design",
  descriptor:
    "Architecture | Interior Design | Construction | Bespoke Furniture",
  positioning:
    "Luxury Architecture | Interior Design | Turnkey Project Execution",
  url: "https://antonovich-design.com",
  email: "info@antonovich-design.com",
  phone: "+971 542-99-5555",
  phoneHref: "tel:+971542995555",
  whatsapp: "https://wa.me/971542995555",
  // Original copy.
  message:
    "From the first architectural concept to the final decorative detail, every element is considered as part of one complete design vision.",
};

/** Regional offices exactly as published on antonovich-design.com/contact-us.html */
export const offices = [
  {
    id: "usa",
    region: "United States",
    name: "Luxury Antonovich Design",
    address: ["8300 NW 53rd ST, Suite 102", "Doral, Florida 33166-7812"],
    email: "info@antonovich-design.com",
    phone: "+971 542-99-5555",
    phoneHref: "tel:+971542995555",
    map: "https://www.google.com/maps/search/?api=1&query=8300+NW+53rd+St+Suite+102+Doral+FL+33166",
  },
  {
    id: "dubai",
    region: "Dubai, UAE",
    name: "Luxury Antonovich Design (Dubai)",
    address: [
      "2301 Office, 23rd Floor, Tower 1",
      "Boulevard Plaza, Dubai",
      "P.O. Box 283157",
    ],
    email: "info@antonovich-group.ae",
    phone: "+971 542-99-5555",
    phoneHref: "tel:+971542995555",
    map: "https://www.google.com/maps/search/?api=1&query=Boulevard+Plaza+Tower+1+Dubai",
  },
  {
    id: "showroom",
    region: "Furniture Showroom — Dubai",
    name: "Luxury Antonovich Home KA",
    address: [
      "Al Wasl Road, Al Badaa, Jumeirah, Dubai",
      "Unit 4, Building Plot No. 333-1103",
      "P.O. Box 53820",
    ],
    email: "info@antonovich-group.ae",
    phone: "+971 542-99-5555",
    phoneHref: "tel:+971542995555",
    map: "https://www.google.com/maps/search/?api=1&query=Al+Wasl+Road+Al+Badaa+Jumeirah+Dubai",
  },
  {
    id: "ksa",
    region: "Saudi Arabia",
    name: "Interior Design and Fit-out Company in Saudi Arabia",
    address: ["Hugayat Tower, 28th Floor", "Riyadh 11321, Saudi Arabia"],
    email: "Antonovych.design.ksa@gmail.com",
    phone: "+971 542-99-5555",
    phoneHref: "tel:+971542995555",
    map: "https://www.google.com/maps/search/?api=1&query=Hugayat+Tower+Riyadh",
  },
];

/** Markets named on the official About page. Headquarters: Dubai, Miami and Riyadh. */
export const markets = [
  "United States",
  "United Arab Emirates",
  "Saudi Arabia",
  "Europe",
  "United Kingdom",
  "Russia",
  "Africa",
  "China",
];

export const socials = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/antonovich.design.usa/",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/Luxury-Antonovich-Design-192389887574124/timeline/",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/channel/UCBbDe0unCvmF5TRfXctnKvg",
  },
  {
    label: "Pinterest",
    href: "https://www.pinterest.com/antonovichdesignusa/",
  },
];

/** Official biography, About Us page. */
export const founder = {
  name: "Katrina Antonovich",
  role: "CEO, Chief Designer, Architect & Engineer",
  // Verbatim from antonovich-design.com/about-us.html
  bio: [
    "Academic architectural education in the world capital of regal luxury is the basis of her style in works. Her amazing ability to look into the future of architecture and design, to serve our valued customers and clients with all the subtleties associated with the demands, and to create true masterpieces of luxury, make the LUXURY ANTONOVICH DESIGN handwriting recognizable worldwide.",
    "Using brilliant taste and a touch of luxury we are experts in interior fit-out works, joinery, furniture, and furnishing and provide turnkey projects to prime residential, commercial sectors, palaces and high-profile residences.",
    "The owner and ideologist of her author’s furniture showroom Katrina Antonovich brand in Dubai, Jumeirah Road and her well-coordinated team of professionals create designer furniture to order — unique world-class furniture collection masterpieces, which already pleases its owners with the highest quality, reliability and elegance.",
  ],
};

/** Services grouped for the six-tab services showcase. Copy is original. */
export const services = [
  {
    id: "interior-design",
    image: "/assets/antonovich/living-rooms/exclusive-interior-miami-01.webp",
    alt: "Exclusive interior in Miami by Luxury Antonovich Design",
    title: "Luxury interior design",
    text: "Distinctive residential and commercial interiors — spatial planning, materials, furniture, lighting and bespoke detailing for villas, palaces, hotels and offices.",
  },
  {
    id: "architecture",
    image:
      "/assets/antonovich/architecture/comfort-architecture-design-01.webp",
    alt: "Comfort architecture design by Luxury Antonovich Design",
    title: "Architecture & engineering",
    text: "Architectural concepts, house planning and master planning, integrated with MEP engineering and smart home systems.",
  },
  {
    id: "exterior-landscape",
    image: "/assets/antonovich/landscapes/landscape-designs-in-kenya-02.webp",
    alt: "Landscape design with fountain and classical villa by Luxury Antonovich Design",
    title: "Exterior & landscape",
    text: "A complete architectural identity through facades, gardens, swimming pools and outdoor living environments.",
  },
  {
    id: "construction",
    image: "/assets/antonovich/miscellaneous/antonovich-services-03.webp",
    alt: "Luxury Antonovich Design engineers on a construction site",
    title: "Construction & fit-out",
    text: "Construction, renovation, interior fit-out and architectural supervision — through to turnkey delivery.",
  },
  {
    id: "furniture",
    image: "/assets/antonovich/miscellaneous/antonovich-services-12.webp",
    alt: "Bespoke sofa and carpet by Luxury Antonovich Design",
    title: "Bespoke furniture",
    text: "Custom furniture, joinery, beds, dining tables and wardrobes of own production, designed for each project.",
  },
  {
    id: "lighting-decor",
    image: "/assets/antonovich/miscellaneous/antonovich-services-08.webp",
    alt: "Crystal chandelier by Luxury Antonovich Design",
    title: "Lighting & decor",
    text: "Chandeliers, artistic stained glass, curtains, wallpapers, carpets, mosaics, marble and stone.",
  },
];

/** Six differentiators. Copy is original and factual (no awards, counts or certifications). */
export const differentiators = [
  {
    title: "Expertise",
    image:
      "/assets/antonovich/villas/interior-design-luxury-villa-in-san-francisco-01.webp",
    alt: "Luxury villa interior in San Francisco by Luxury Antonovich Design",
    text: "Architecture, engineering, interior design, furniture production and construction brought together by one coordinated team.",
  },
  {
    title: "International",
    image: "/assets/antonovich/hospitality/gorgeous-hotel-design-01.webp",
    alt: "Hotel exterior with domed pavilion and pool by Luxury Antonovich Design",
    text: "Design, fit-out, architecture and construction services across the Middle East, the United States, Europe, the United Kingdom, Russia and Africa.",
  },
  {
    title: "Own production",
    image: "/assets/antonovich/miscellaneous/antonovich-services-06.webp",
    alt: "Gold-finished bespoke furniture piece by Luxury Antonovich Design",
    text: "Designer furniture, lighting and decor made to order, alongside pieces sourced from leading European and American manufacturers.",
  },
  {
    title: "Integrated design",
    image: "/assets/antonovich/architecture/modern-architecture-design-01.webp",
    alt: "Modern villa architecture with illuminated terraces by Luxury Antonovich Design",
    text: "A harmonious combination of architecture and interior image — every room is designed as part of the building and the landscape beyond.",
  },
  {
    title: "One coordination",
    image: "/assets/antonovich/architecture/villa-proiect-in-dubai-03.webp",
    alt: "Villa project in Dubai with landscaped grounds by Luxury Antonovich Design",
    text: "From concept to completion: planning, supervision, procurement, fit-out and final styling managed as one continuous process.",
  },
  {
    title: "Craftsmanship",
    image:
      "/assets/antonovich/residential/mastery-in-luxurious-staircase-design-and-execution-01.webp",
    alt: "Luxurious marble staircase with gilded capitals by Luxury Antonovich Design",
    text: "Natural marble, stucco, artistic glass, fine textiles and hand-finished joinery, selected and detailed with exacting care.",
  },
];

/** Testimonials — original wording from antonovich-design.com/testimonials.html (excerpted). */
export const testimonials = [
  {
    author: "Sergey, New York",
    text: "I am extremely pleased with our cooperation, I am delighted with the result of apartment renovation… everything is thought out to the smallest detail! Materials — the highest quality, technology — the most advanced!",
  },
  {
    author: "Nelson, Miami",
    text: "She easily managed to organize the space of the villa so that it remained as bright and airy, but filled with meaning and all the necessary furniture. Each element is thought out, the fabrics are selected with a surprisingly harmonious combination with flooring and walls fit-out.",
  },
  {
    author: "Joseph Reddy, California",
    text: "At first, I was a bit hesitant to hire a designer internationally, but the process was so seamless and exceeded my expectations… I highly recommend Luxury Antonovich Design and continue to remain a huge fan of their work.",
  },
];

/** Contact-form options. */
export const projectTypes = [
  "Residential",
  "Commercial",
  "Hospitality",
  "Architecture",
  "Interior Fit-Out",
  "Other",
];
export const serviceOptions = [
  "Interior Design",
  "Architecture",
  "Exterior Design",
  "Furniture",
  "Construction",
  "Landscaping",
  "Engineering & MEP",
  "Smart Home",
  "Project Management",
];
