import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Send, MessageCircleHeart, ChevronDown, Phone, ExternalLink, MapPin, Clock, GraduationCap, Star
} from "lucide-react";

/* ─────────────────────────────────────────────
   KNOWLEDGE BASE
───────────────────────────────────────────── */
interface QA {
  keywords: string[];
  answer: string;
  followUp?: string;
  whatsapp?: boolean;
}

const KB: QA[] = [
  // ── Admissions ──
  {
    keywords: ["admit", "admission", "enroll", "join", "apply", "register", "registration", "how to join", "new admission"],
    answer: "Admissions are open all year round! To enroll your little one, you can visit our school on Kamatghar Road, Brahmanand Nagar, Bhiwandi, or reach out on WhatsApp and our team will guide you through every step.",
    followUp: "Would you like to know what documents you need to bring, or shall I connect you with our team right away?",
    whatsapp: true,
  },
  {
    keywords: ["document", "papers", "certificate", "birth", "id", "proof", "aadhaar", "records"],
    answer: "For admission, please carry: your child's birth certificate, a passport-size photo, the parent's/guardian's ID proof (Aadhaar or similar), and the child's vaccination record if available. That is all you need to get started!",
    followUp: "Would you like help scheduling a school visit?",
  },
  {
    keywords: ["age", "year", "old", "how old", "eligible", "eligibility", "criteria", "qualify"],
    answer: "We welcome children from 2 to 6 years old across our four programs:\n- Playgroup: 2–3 years\n- Nursery: 3–4 years\n- LKG: 4–5 years\n- UKG: 5–6 years",
    followUp: "Would you like details about a specific program?",
  },
  // ── Programs ──
  {
    keywords: ["program", "programme", "course", "class", "classes", "curriculum", "what do you offer", "levels"],
    answer: "We offer four thoughtfully designed programs:\n1. Playgroup (2–3 yrs) : music, sensory play, free play\n2. Nursery (3–4 yrs) : creative arts, alphabets, friendships\n3. LKG (4–5 yrs) : phonics, number sense, craft, outdoor play\n4. UKG (5–6 yrs) : reading, writing, basic math, public speaking",
    followUp: "Would you like more details about any specific program?",
  },
  {
    keywords: ["playgroup", "play group", "2 year", "2-3", "toddler", "youngest"],
    answer: "Our Playgroup is for children aged 2–3 years. It is a gentle, warm introduction to school life through sensory bins, story time, music & rhymes, free play, and snack time. We focus on comfort, routine, and joy!",
    followUp: "Would you like to book a visit so your little one can explore the classroom?",
    whatsapp: true,
  },
  {
    keywords: ["nursery", "3 year", "3-4"],
    answer: "Nursery is designed for children aged 3–4 years. We build confidence through finger painting, ABC fun, counting games, outdoor play, and show & tell sessions. Every day is a creative adventure!",
    followUp: "Shall I help you schedule a visit or connect you with a teacher?",
    whatsapp: true,
  },
  {
    keywords: ["lkg", "lower kg", "lower kindergarten", "4 year", "4-5"],
    answer: "LKG is for children aged 4–5 years. Structured learning meets joyful exploration through phonics, number sense, craft projects, group games, and cultural events. A perfect balance of fun and learning!",
    followUp: "Would you like details about fees or the admission process for LKG?",
    whatsapp: true,
  },
  {
    keywords: ["ukg", "upper kg", "upper kindergarten", "5 year", "5-6", "pre-primary", "big school"],
    answer: "UKG prepares children aged 5–6 years for primary school with reading, writing, basic math, public speaking, and science play. Your child will leave with strong fundamentals and a happy heart!",
    followUp: "Would you like to know about the UKG admission process?",
    whatsapp: true,
  },
  // ── Timings ──
  {
    keywords: ["timing", "time", "hours", "open", "close", "schedule", "when", "sunday", "week"],
    answer: "We are open daily, including Sundays, from 6:30 AM to 12:00 AM (midnight). Our school is always here for you!",
    followUp: "Would you like to schedule a visit at a convenient time?",
  },
  {
    keywords: ["school timing", "school time", "class timing", "class time", "session", "morning", "afternoon"],
    answer: "Class sessions are held in the morning. The school building is accessible from 6:30 AM to 12:00 AM (midnight). For specific session timings tailored to your child's program, please reach out on WhatsApp.",
    followUp: "Shall I connect you with our team for a detailed schedule?",
    whatsapp: true,
  },
  // ── Fees ──
  {
    keywords: ["fee", "fees", "cost", "price", "charge", "tuition", "how much", "monthly", "annual", "payment"],
    answer: "Our fee structure is thoughtfully tailored to each program to ensure great value. Please share your phone number or WhatsApp us and our team will share the complete fee details within an hour — we are happy to help!",
    followUp: "Would you like to send us a WhatsApp message right now?",
    whatsapp: true,
  },
  // ── Safety & Facilities ──
  {
    keywords: ["safe", "safety", "secure", "cctv", "camera", "monitor", "surveillance"],
    answer: "Your child's safety is our absolute top priority. Our campus has CCTV monitoring throughout, sanitised play areas, and all our staff are trained in child safety protocols. Parents can rest assured.",
    followUp: "Would you like to come see our facilities in person?",
  },
  {
    keywords: ["hygiene", "hygienic", "clean", "sanitise", "sanitize", "cleanliness"],
    answer: "We maintain strict hygiene standards — play areas are sanitised daily, common surfaces are cleaned regularly, and we follow all recommended health protocols. A clean, healthy space is a happy learning space!",
    followUp: "Would you like to know more about our safety measures?",
  },
  {
    keywords: ["facility", "facilities", "infrastructure", "playground", "play area", "outdoor", "garden", "slide", "swing"],
    answer: "Our facilities include: CCTV-monitored classrooms, sanitised play areas, outdoor garden with slides and swings, sand pit, a bright learning environment, and a welcoming snack area. Everything designed for little champions!",
    followUp: "Shall I help you book a campus tour?",
    whatsapp: true,
  },
  {
    keywords: ["transport", "bus", "pickup", "drop", "van", "vehicle", "commute"],
    answer: "We currently do not operate a school bus service. Most of our families are from the Bhiwandi area and find us conveniently located on Kamatghar Road, Brahmanand Nagar. For specific transport queries, please contact us directly.",
    followUp: "Would you like our location details or directions?",
    whatsapp: true,
  },
  // ── Ratio & Teachers ──
  {
    keywords: ["ratio", "teacher", "teacher student", "12:1", "staff", "how many teachers", "individual attention"],
    answer: "We maintain a 12:1 student-to-teacher ratio, ensuring every child gets individual attention, care, and encouragement. Our 6+ teachers are chosen for both their expertise and their warmth.",
    followUp: "Would you like to know more about our teaching approach?",
  },
  {
    keywords: ["teacher quality", "qualified", "trained", "experience", "teaching method", "approach", "methodology"],
    answer: "Our teachers are carefully selected for their patience, warmth, and professional training in early childhood education. They use play-based and activity-driven methods to make learning natural and joyful.",
    followUp: "Would you like to meet our teachers? Come for a visit!",
    whatsapp: true,
  },
  // ── Location & Directions ──
  {
    keywords: ["location", "address", "where", "directions", "find", "map", "google", "navigate", "reach", "how to come"],
    answer: "We are located at:\nKamatghar Road, Brahmanand Nagar, Bhiwandi, Maharashtra 421305.\nPlus Code: 73C2+QR Bhiwandi\n\nYou can search 'Little Champs School Bhiwandi' on Google Maps for turn-by-turn directions.",
    followUp: "Shall I open WhatsApp so our team can share a live location?",
    whatsapp: true,
  },
  {
    keywords: ["bhiwandi", "near", "landmark", "brahmanand", "kamatghar"],
    answer: "Our school is on Kamatghar Road in Brahmanand Nagar, Bhiwandi. It is a well-known area and most local rickshaws and cabs can find us easily. The Plus Code is 73C2+QR Bhiwandi for Google Maps.",
    followUp: "Would you like to WhatsApp us for a live location pin?",
    whatsapp: true,
  },
  // ── Contact ──
  {
    keywords: ["contact", "phone", "call", "number", "email", "reach", "whatsapp", "message", "chat"],
    answer: "You can reach us through:\nPhone / WhatsApp: +91 73873 26222\nEmail: info@littlechampsschool.com\nWe are available daily from 6:30 AM to midnight. We love hearing from parents!",
    followUp: "Would you like to open WhatsApp and message us directly?",
    whatsapp: true,
  },
  // ── Potty Training / Readiness ──
  {
    keywords: ["potty", "toilet", "diaper", "nappy", "trained", "toilet trained", "bathroom"],
    answer: "Your child does not need to be fully potty-trained to join our Playgroup. Our trained teachers are patient and supportive, and we handle these situations with care, warmth, and zero stress for families.",
    followUp: "Do you have any other questions about joining us?",
  },
  // ── Food & Snacks ──
  {
    keywords: ["food", "lunch", "snack", "meal", "eat", "tiffin", "water", "diet"],
    answer: "Children bring their own tiffin (snack box) from home. We encourage healthy, homemade snacks. Fresh drinking water is available at all times. For specific dietary requirements, please discuss with our staff during admission.",
    followUp: "Any other questions about daily routines?",
  },
  // ── Events & Holidays ──
  {
    keywords: ["event", "activity", "annual", "celebration", "diwali", "holi", "christmas", "sports", "cultural", "festival"],
    answer: "We celebrate life at Little Champs! Annual Day, Diwali, Holi, Christmas, Sports Day, and cultural programs are all part of our vibrant school calendar. These events help children grow in confidence and express their creativity.",
    followUp: "Would you like to know about our upcoming events?",
    whatsapp: true,
  },
  {
    keywords: ["holiday", "vacation", "summer", "summer camp", "break", "off day", "closed"],
    answer: "We follow the Maharashtra school holiday calendar and have occasional special closures for festivals. Summer activities and camps are planned based on parent interest. For the latest holiday schedule, please WhatsApp us.",
    followUp: "Shall I connect you with our team for the full calendar?",
    whatsapp: true,
  },
  // ── Ratings & Testimonials ──
  {
    keywords: ["rating", "review", "feedback", "testimonial", "parent", "recommend", "good", "reputation"],
    answer: "We are proud to hold a 5.0-star rating from our parent community! Here is what some parents have said:\n- 'My daughter looks forward to school every single day!' — Raviraj\n- 'Excellent execution and professional staff.' — Prashant\n- 'Overall growth for the baby — confidence, manners and learning.' — Nutan Patil",
    followUp: "Would you like to visit and experience the warmth yourself?",
    whatsapp: true,
  },
  // ── Visit Scheduling ──
  {
    keywords: ["visit", "tour", "come", "see", "look around", "walk in", "book a visit", "appointment"],
    answer: "We would love to welcome you! You can walk in any day between 6:30 AM and 12:00 AM, or message us on WhatsApp to schedule a dedicated tour with one of our teachers.",
    followUp: "Shall I open WhatsApp to book your visit right now?",
    whatsapp: true,
  },
  // ── USPs ──
  {
    keywords: ["special", "unique", "different", "why choose", "best", "better", "advantage", "usp", "stand out", "benefit"],
    answer: "What makes Little Champs truly special:\n- Play-based, child-centered learning\n- 12:1 student-to-teacher ratio\n- 5.0-star parent rating\n- CCTV-monitored, hygienic campus\n- Cultural festivals and annual events\n- Warm, experienced teachers\n- 200+ happy kids since 2019",
    followUp: "Would you like to come see for yourself? We would love to have you!",
    whatsapp: true,
  },
  // ── Since / History ──
  {
    keywords: ["since", "founded", "established", "history", "how long", "years", "experience", "old school"],
    answer: "Little Champs School has been nurturing young minds since 2019. In just a few years, we have grown to 200+ happy children and earned a 5.0-star rating from parents. We grow with every little champ!",
    followUp: "Would you like to join our growing family?",
  },
];

const FALLBACK = "I would love to help you with that! For this specific query, our team would be the best to assist. Please WhatsApp us and we will reply promptly.";
const FALLBACK_FOLLOWUP = "Shall I open WhatsApp so you can message our team directly?";

/* ─────────────────────────────────────────────
   MATCHING ENGINE
───────────────────────────────────────────── */
function findAnswer(input: string): QA {
  const lower = input.toLowerCase();
  let best: QA | null = null;
  let bestScore = 0;

  for (const qa of KB) {
    const score = qa.keywords.filter((kw) => lower.includes(kw)).length;
    if (score > bestScore) {
      bestScore = score;
      best = qa;
    }
  }

  return best && bestScore > 0
    ? best
    : { keywords: [], answer: FALLBACK, followUp: FALLBACK_FOLLOWUP, whatsapp: true };
}

/* ─────────────────────────────────────────────
   SUGGESTED QUICK QUESTIONS
───────────────────────────────────────────── */
const QUICK = [
  "What programs do you offer?",
  "How do I get admission?",
  "What are your timings?",
  "Where are you located?",
  "What is the fee structure?",
];

/* ─────────────────────────────────────────────
   MESSAGE TYPE
───────────────────────────────────────────── */
interface Message {
  id: number;
  from: "bot" | "user";
  text: string;
  followUp?: string;
  whatsapp?: boolean;
}

const WA_URL = "https://wa.me/917387326222?text=Hello%20Little%20Champs%20School%2C%20I%20need%20help%20with...";

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Message[]>([
    {
      id: 0,
      from: "bot",
      text: "Hi! I'm BuildNest Bot, your friendly guide to Little Champs School. Ask me anything about admissions, programs, timings, location, or fees!",
      followUp: "You can also tap one of the quick questions below to get started.",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [showQuick, setShowQuick] = useState(true);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const counterRef = useRef(1);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, typing]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 350);
  }, [open]);

  const sendMessage = useCallback((text: string) => {
    if (!text.trim()) return;
    setShowQuick(false);

    const uid = counterRef.current++;
    setMsgs((prev) => [...prev, { id: uid, from: "user", text }]);
    setInput("");
    setTyping(true);

    const delay = 600 + Math.random() * 500;
    setTimeout(() => {
      const qa = findAnswer(text);
      setTyping(false);
      setMsgs((prev) => [
        ...prev,
        {
          id: counterRef.current++,
          from: "bot",
          text: qa.answer,
          followUp: qa.followUp,
          whatsapp: qa.whatsapp,
        },
      ]);
    }, delay);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* ── Chat Panel ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="buildnest-bot-panel"
            initial={{ opacity: 0, y: 32, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 32, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 340, damping: 28 }}
            className="fixed bottom-24 right-4 sm:right-6 z-[100] w-[calc(100vw-2rem)] max-w-[380px] flex flex-col rounded-[1.75rem] overflow-hidden shadow-[0_24px_64px_-12px_hsl(222_35%_20%/0.35)] dark:shadow-[0_24px_64px_-12px_hsl(0_0%_0%/0.6)]"
          >
            {/* Header */}
            <div className="bg-gradient-rainbow px-5 py-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <MessageCircleHeart className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-display font-bold text-black text-base leading-tight">BuildNest Bot</div>
                <div className="text-black/80 text-xs font-playful flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-leaf inline-block" />
                  Little Champs School Assistant
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 bg-background dark:bg-card overflow-y-auto max-h-[360px] min-h-[200px] p-4 space-y-3 scroll-smooth">
              {msgs.map((m) => (
                <div key={m.id} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                  {m.from === "bot" && (
                    <div className="w-7 h-7 rounded-full bg-gradient-rainbow flex items-center justify-center shrink-0 mr-2 mt-0.5">
                      <MessageCircleHeart className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}
                  <div className={`max-w-[82%] space-y-2`}>
                    <div
                      className={`px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line font-body ${
                        m.from === "user"
                          ? "bg-gradient-rainbow text-white rounded-br-sm"
                          : "bg-white dark:bg-muted text-black dark:text-foreground shadow-card rounded-bl-sm"
                      }`}
                    >
                      {m.text}
                    </div>
                    {m.from === "bot" && m.followUp && (
                      <div className="px-4 py-2 rounded-2xl rounded-bl-sm bg-sky/10 dark:bg-sky/20 text-sky text-xs font-playful font-bold border border-sky/20">
                        {m.followUp}
                      </div>
                    )}
                    {m.from === "bot" && m.whatsapp && (
                      <a
                        href={WA_URL}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-leaf text-white text-xs font-bold shadow-card hover:-translate-y-0.5 transition-transform"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Chat on WhatsApp
                      </a>
                    )}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {typing && (
                <div className="flex items-start gap-2">
                  <div className="w-7 h-7 rounded-full bg-gradient-rainbow flex items-center justify-center shrink-0 mt-0.5">
                    <MessageCircleHeart className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div className="px-4 py-3 rounded-2xl rounded-bl-sm bg-white dark:bg-muted shadow-card">
                    <div className="flex gap-1 items-center h-4">
                      {[0, 0.18, 0.36].map((d, i) => (
                        <motion.span
                          key={i}
                          className="w-2 h-2 rounded-full bg-sky"
                          animate={{ y: [0, -5, 0] }}
                          transition={{ repeat: Infinity, duration: 0.75, delay: d }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Quick questions */}
              {showQuick && (
                <div className="space-y-1.5 pt-1">
                  <p className="text-xs text-ink/50 dark:text-foreground/50 font-playful font-bold uppercase tracking-wide">Quick questions</p>
                  {QUICK.map((q) => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      className="w-full text-left px-3 py-2 rounded-xl bg-white dark:bg-muted border border-border text-sm font-playful font-bold text-ink dark:text-foreground hover:bg-sky/10 dark:hover:bg-sky/20 hover:border-sky/30 transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}

              <div ref={endRef} />
            </div>

            {/* Info strip */}
            <div className="bg-muted dark:bg-background/60 px-4 py-2 flex items-center gap-4 text-xs text-black border-t border-border">
              <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> +91 73873 26222</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Open daily</span>
              <span className="flex items-center gap-1"><Star className="w-3 h-3 fill-sunshine text-sunshine" /> 5.0</span>
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="bg-white dark:bg-card border-t border-border px-3 py-3 flex items-center gap-2"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question…"
                className="flex-1 bg-muted dark:bg-background rounded-full px-4 py-2.5 text-sm outline-none text-black dark:text-foreground placeholder:text-muted-foreground font-body"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                aria-label="Send message"
                className="w-10 h-10 rounded-full bg-gradient-rainbow flex items-center justify-center shrink-0 disabled:opacity-40 transition-opacity shadow-card"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Bubble Trigger ── */}
      <motion.button
        id="buildnest-bot-toggle"
        aria-label={open ? "Close BuildNest Bot chat" : "Open BuildNest Bot chat"}
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        className="fixed bottom-5 right-4 sm:right-6 z-[100] w-14 h-14 rounded-full bg-gradient-rainbow shadow-pop flex items-center justify-center"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-6 h-6 text-white" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircleHeart className="w-6 h-6 text-white" />
            </motion.span>
          )}
        </AnimatePresence>

        {/* Pulsing ring when closed */}
        {!open && (
          <motion.span
            className="absolute inset-0 rounded-full bg-candy"
            animate={{ scale: [1, 1.45, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2.2, repeat: Infinity }}
          />
        )}
      </motion.button>
    </>
  );
};
