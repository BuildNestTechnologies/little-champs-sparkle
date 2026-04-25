import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check, Loader2, MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { toast } from "sonner";

const schema = z.object({
  parent: z.string().trim().min(2, "Please enter your name").max(80),
  child: z.string().trim().min(1, "Please enter your child's name").max(80),
  age: z.string().min(1, "Pick an age group"),
  phone: z.string().trim().regex(/^[+\d][\d\s-]{7,15}$/, "Enter a valid phone number"),
  email: z.string().trim().email("Enter a valid email").max(120),
  message: z.string().trim().max(800).optional().or(z.literal("")),
});

type FormVals = z.infer<typeof schema>;

const Field = ({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) => (
  <label className="block">
    <span className="font-playful font-bold text-ink/80 text-sm">{label}</span>
    <div className="mt-1.5">{children}</div>
    {error && <span className="block mt-1 text-xs text-destructive">{error}</span>}
  </label>
);

const inp = "w-full px-4 py-3 rounded-2xl bg-white border border-border focus:border-sky focus:ring-2 focus:ring-sky/30 outline-none transition font-body text-ink placeholder:text-ink/40";

export const Contact = () => {
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormVals>({ resolver: zodResolver(schema) });

  const onSubmit = async (_v: FormVals) => {
    setState("sending");
    await new Promise((r) => setTimeout(r, 1300));
    setState("done");
    toast.success("Thank you! We'll be in touch soon.");
    setTimeout(() => { setState("idle"); reset(); }, 2200);
  };

  return (
    <section id="contact" className="relative py-24 lg:py-32 bg-cream">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-hand text-3xl text-leaf">we'd love to meet you</span>
          <h2 className="mt-1 font-display font-bold text-4xl lg:text-5xl text-ink">
            Visit <span className="gradient-text">Little Champs</span>
          </h2>
          <p className="mt-3 text-ink/70">Drop by, call, or send us a note — we’ll reply with a smile.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Map + info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="rounded-[2rem] bg-white shadow-card p-3 lg:p-4 flex flex-col"
          >
            <div className="rounded-3xl overflow-hidden h-72 lg:h-80 ring-2 ring-white shadow-card">
              <iframe
                title="Little Champs School location"
                src="https://www.google.com/maps?q=Kamatghar+Road+Brahmanand+Nagar+Bhiwandi+421305&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-4 p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-candy text-white flex items-center justify-center shrink-0"><MapPin className="w-5 h-5" /></div>
                <div>
                  <div className="font-display font-bold text-ink">Visit us</div>
                  <div className="text-sm text-ink/70">Kamatghar Road, Brahmanand Nagar,<br />Bhiwandi, Maharashtra 421305</div>
                  <div className="text-xs text-ink/50 mt-1 font-playful">Plus Code: 73C2+QR Bhiwandi</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky text-white flex items-center justify-center shrink-0"><Phone className="w-5 h-5" /></div>
                <div>
                  <div className="font-display font-bold text-ink">Call us</div>
                  <a href="tel:+917387326222" className="text-sm text-ink/70 hover:text-ink">+91 73873 26222</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-sunshine text-ink flex items-center justify-center shrink-0"><Mail className="w-5 h-5" /></div>
                <div>
                  <div className="font-display font-bold text-ink">Email us</div>
                  <a href="mailto:info@littlechampsschool.com" className="text-sm text-ink/70 hover:text-ink break-all">info@littlechampsschool.com</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-leaf text-white flex items-center justify-center shrink-0"><Clock className="w-5 h-5" /></div>
                <div>
                  <div className="font-display font-bold text-ink">Open</div>
                  <div className="text-sm text-ink/70">Open daily<br />Sunday 6:30 AM – 12:00 AM</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-[2rem] bg-white shadow-pop p-6 lg:p-8"
          >
            <h3 className="font-display font-bold text-2xl text-ink">Send us an inquiry</h3>
            <p className="text-ink/60 text-sm mb-5">We usually reply within a few hours.</p>

            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Parent name" error={errors.parent?.message}>
                <input className={inp} placeholder="Your full name" {...register("parent")} />
              </Field>
              <Field label="Child name" error={errors.child?.message}>
                <input className={inp} placeholder="Your child's name" {...register("child")} />
              </Field>
              <Field label="Child age" error={errors.age?.message}>
                <select className={inp} defaultValue="" {...register("age")}>
                  <option value="" disabled>Select age group</option>
                  <option value="playgroup">Playgroup (2–3 yrs)</option>
                  <option value="nursery">Nursery (3–4 yrs)</option>
                  <option value="lkg">LKG (4–5 yrs)</option>
                  <option value="ukg">UKG (5–6 yrs)</option>
                </select>
              </Field>
              <Field label="Phone" error={errors.phone?.message}>
                <input className={inp} placeholder="+91 ..." {...register("phone")} />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Email" error={errors.email?.message}>
                  <input className={inp} placeholder="you@email.com" {...register("email")} />
                </Field>
              </div>
              <div className="sm:col-span-2">
                <Field label="Message (optional)" error={errors.message?.message}>
                  <textarea rows={4} className={inp} placeholder="Tell us about your little one…" {...register("message")} />
                </Field>
              </div>
            </div>

            <button
              type="submit"
              disabled={state !== "idle"}
              className={`mt-5 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-display font-bold text-white shadow-pop btn-pop transition-all ${
                state === "done" ? "bg-leaf" : "bg-gradient-rainbow"
              }`}
            >
              {state === "idle" && (<><Send className="w-5 h-5" /> Send Inquiry</>)}
              {state === "sending" && (<><Loader2 className="w-5 h-5 animate-spin" /> Sending…</>)}
              {state === "done" && (<><Check className="w-5 h-5" /> Sent! See you soon</>)}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};
