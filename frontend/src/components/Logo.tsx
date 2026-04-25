import logoMark from "@/assets/logo-mark.png";

export const Logo = ({ size = 40, withWordmark = true }: { size?: number; withWordmark?: boolean }) => (
  <a href="#home" className="flex items-center gap-3 group" aria-label="Little Champs School home">
    <span
      className="rounded-full overflow-hidden ring-2 ring-white shadow-soft bg-white transition-transform duration-500 group-hover:rotate-[8deg]"
      style={{ width: size, height: size }}
    >
      <img src={logoMark} alt="Little Champs School logo" className="w-full h-full object-cover" />
    </span>
    {withWordmark && (
      <span className="leading-none">
        <span className="block font-display font-bold text-lg md:text-xl text-ink tracking-tight">
          Little <span className="gradient-text">Champs</span>
        </span>
        <span className="block font-hand text-candy text-sm -mt-0.5">…born to win</span>
      </span>
    )}
  </a>
);
