# Asset Replacement Guide

All AI-generated images live in `src/assets/`. Each is imported as an ES module from the section that uses it. To replace any of them with real school photography, simply overwrite the file at the same path with a new image (PNG or JPG) of similar aspect ratio.

## Where each asset is used

| File | Used by | Recommended size |
| --- | --- | --- |
| `logo-mark.png` | `src/components/Logo.tsx` | Square, ≥ 256×256 |
| `hero-kids.png` | `src/components/sections/Hero.tsx` | ~1200×900, scene with right-side breathing room |
| `about-classroom.png` | `src/components/sections/About.tsx` | ~1200×900, classroom warmth |
| `program-playgroup.png` … `program-ukg.png` | `src/components/sections/Programs.tsx` | ~1000×800 each |
| `gallery-1.png` … `gallery-8.png` | `src/components/sections/Gallery.tsx` | Mix of square & 3:4 portrait |
| `avatar-mom-1.png`, `avatar-dad-1.png`, `avatar-mom-2.png` | `src/components/sections/Testimonials.tsx` | Square, 256×256 |

## Other content to update

- **Phone & email** — search for `+91 73873 26222` and `info@littlechampsschool.com`.
- **Address & Plus Code** — search for `Brahmanand Nagar` to find every reference.
- **Instagram handle** — search for `little_champs_school`.
- **Reviews** — `src/components/sections/Testimonials.tsx`, `REVIEWS` array.
- **Video tour** — replace the YouTube `embed/dQw4w9WgXcQ` URL in `src/components/sections/Gallery.tsx`.

