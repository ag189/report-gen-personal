# Image Assets

Place your image files in this directory:

## Required Images

1. **cover-graphic.jpg** (or .png)
   - Cover page hero image showing aging lifecycle
   - Recommended size: 1200x800px or larger
   - Subject: Aging stages visualization

2. **logo.svg** (or .png)
   - GENESSENSE/MEDGENOME logo
   - Transparent background preferred
   - Recommended size: 400x100px or scalable SVG

3. **dna-methylation.svg** (or .png)
   - DNA helix or methylation illustration
   - For science explanation pages
   - Recommended size: 600x400px

## Usage in Code

Images in this folder are accessible via `/images/filename`:

```tsx
import Image from 'next/image';

<Image 
  src="/images/logo.svg" 
  alt="Logo" 
  width={400} 
  height={100}
/>
```

Or in CSS:

```css
background-image: url('/images/cover-graphic.jpg');
```

## Temporary Placeholders

Currently, the app uses emoji placeholders (👤→👨→👴, 🧬) for images. Replace these with actual images when available.

## Image Optimization

- Use SVG for logos and icons (scalable, smaller file size)
- Optimize JPG/PNG images before adding (use tools like TinyPNG)
- Keep individual files under 500KB for better performance
