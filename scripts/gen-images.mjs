// Generates AI illustrations for Little Champs School via Lovable AI Gateway
import fs from "node:fs";
import path from "node:path";

const KEY = process.env.LOVABLE_API_KEY;
if (!KEY) { console.error("missing LOVABLE_API_KEY"); process.exit(1); }

const OUT = "src/assets";
fs.mkdirSync(OUT, { recursive: true });

const STYLE =
  "Flat vector illustration, warm cheerful kindergarten brand style, soft rounded shapes, " +
  "vibrant palette of sunshine yellow #FFD23F, sky blue #4FC3F7, candy pink #FF6FAE, playful green #7DD957, " +
  "clean cream background #FFFBF2, soft drop shadows, friendly faces, no text, no watermark, " +
  "modern editorial illustration, joyful, premium quality.";

const jobs = [
  { name: "hero-kids.png", prompt: `Hero scene of diverse happy preschool children playing together — one girl on a swing, a boy with a balloon, another child with a paper airplane, big smiling sun, fluffy clouds, scattered ABC blocks and a small rainbow. Composition leaves room on the right. ${STYLE}` },
  { name: "about-classroom.png", prompt: `Cozy modern kindergarten classroom interior, low colorful tables with crayons and books, alphabet wall, plants, large window with sunshine, two cheerful children reading a picture book with a kind teacher. ${STYLE}` },
  { name: "program-playgroup.png", prompt: `Two toddlers age 2-3 playing with soft stacking blocks and stuffed animals on a play mat, sensory toys around. ${STYLE}` },
  { name: "program-nursery.png", prompt: `Three nursery children age 3-4 finger painting on big paper at a low table, colorful aprons, paint splatters. ${STYLE}` },
  { name: "program-lkg.png", prompt: `LKG children age 4-5 sitting in a circle learning the alphabet with a teacher holding flashcards, hands raised eagerly. ${STYLE}` },
  { name: "program-ukg.png", prompt: `UKG children age 5-6 reading books and writing in notebooks at small desks, focused and proud, small graduation cap on the desk. ${STYLE}` },
  { name: "gallery-1.png", prompt: `Children dancing in colorful cultural festival costumes on a small stage with marigold garlands. ${STYLE}` },
  { name: "gallery-2.png", prompt: `Outdoor play area with slide, swings and seesaw, kids laughing under a big tree. ${STYLE}` },
  { name: "gallery-3.png", prompt: `Birthday celebration in classroom, cake with candles, party hats, balloons, kids cheering. ${STYLE}` },
  { name: "gallery-4.png", prompt: `Art and craft corner with kids making paper masks and gluing colored paper, scissors and glitter. ${STYLE}` },
  { name: "gallery-5.png", prompt: `Storytime under a tree with teacher reading from a giant picture book to attentive kids sitting on grass. ${STYLE}` },
  { name: "gallery-6.png", prompt: `Sports day at preschool, kids in colored team t-shirts running a fun race with ribbons and trophies. ${STYLE}` },
  { name: "gallery-7.png", prompt: `Music class with toddlers playing tambourines, xylophones and small drums, smiling teacher with guitar. ${STYLE}` },
  { name: "gallery-8.png", prompt: `Healthy snack time with kids eating fruits and milk at a low table, neat and clean. ${STYLE}` },
  { name: "avatar-mom-1.png", prompt: `Avatar bust portrait of a warm smiling Indian mother in her 30s, soft pastel background, simple flat illustration. ${STYLE}` },
  { name: "avatar-dad-1.png", prompt: `Avatar bust portrait of a friendly Indian father in his 30s, glasses, soft pastel background, simple flat illustration. ${STYLE}` },
  { name: "avatar-mom-2.png", prompt: `Avatar bust portrait of a cheerful Indian mother in her late 20s wearing a saree, soft pastel background, flat illustration. ${STYLE}` },
];

async function gen({ name, prompt }) {
  const dest = path.join(OUT, name);
  if (fs.existsSync(dest)) { console.log("skip", name); return; }
  console.log("gen", name);
  const r = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash-image",
      messages: [{ role: "user", content: prompt }],
      modalities: ["image", "text"],
    }),
  });
  if (!r.ok) { console.error(name, r.status, await r.text()); return; }
  const data = await r.json();
  const url = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;
  if (!url) { console.error(name, "no image", JSON.stringify(data).slice(0,300)); return; }
  const b64 = url.split(",")[1];
  fs.writeFileSync(dest, Buffer.from(b64, "base64"));
  console.log("ok", name, fs.statSync(dest).size);
}

// run with limited concurrency
const CONC = 4;
let i = 0;
async function worker() { while (i < jobs.length) { const j = jobs[i++]; try { await gen(j); } catch(e){console.error(j.name,e);} } }
await Promise.all(Array.from({length: CONC}, worker));
console.log("done");
