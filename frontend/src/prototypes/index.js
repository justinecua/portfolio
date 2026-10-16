import urbanCover from "./urbancoffee/assets/storefront-dusk.jpg";
import { designs as urbanDesigns } from "./urbancoffee/designs/registry";

// Every client prototype listed on /prototypes. Each one also needs its
// own route in App.jsx at /prototype/<slug>.
export const PROTOTYPES = [
  {
    slug: "urbancoffee",
    name: "Urban Coffee Studio",
    kind: "Roastery + kitchen",
    location: "Tibanga, Iligan City",
    blurb:
      "In-house roasted coffee, rice bowls, and a space that has always had a thing for artists.",
    cover: urbanCover,
    designs: urbanDesigns.map(({ id, name }) => ({ id, name })),
  },
];
