# Icon Assets

Place your icon files in the appropriate subdirectories:

## Directory Structure

```
icons/
├── diet/           # Diet-related icons
├── supplements/    # Supplement icons
└── lifestyle/      # Lifestyle icons
```

## Required Icons

### Diet Icons (`diet/`)
- grain.svg - Whole grains
- vegetables.svg - Vegetables
- protein.svg - Protein sources
- fish.svg - Fish/seafood
- beverage.svg - Beverages
- ketogenic.svg - Keto diet

### Supplement Icons (`supplements/`)
- omega3.svg - Omega-3 fatty acids
- probiotics.svg - Probiotics
- vitamins.svg - Vitamins
- minerals.svg - Minerals

### Lifestyle Icons (`lifestyle/`)
- meditation.svg - Meditation/stress relief
- sleep.svg - Sleep
- exercise.svg - Physical activity

## Icon Guidelines

- **Format**: SVG preferred (scalable, lightweight)
- **Size**: 64x64px or larger (SVG scales automatically)
- **Style**: Simple, flat design with single or dual colors
- **Color**: Icons should be monochrome or use brand colors
- **Background**: Transparent

## Alternative: Using Icon Libraries

Instead of custom icons, you can use Lucide React icons (already installed):

```tsx
import { Apple, Dumbbell, Moon } from 'lucide-react';

<Apple className="w-8 h-8 text-green-600" />
```

Available Lucide icons that match requirements:
- Diet: Apple, Carrot, Fish, Coffee
- Supplements: Pill, Heart, Droplet
- Lifestyle: Moon, Activity, BedDouble

## Usage in Code

```tsx
import Image from 'next/image';

<Image 
  src="/icons/diet/grain.svg" 
  alt="Whole grains" 
  width={64} 
  height={64}
/>
```

## Free Icon Resources

If you need to source icons:
- [Heroicons](https://heroicons.com/)
- [Lucide Icons](https://lucide.dev/)
- [Flaticon](https://www.flaticon.com/)
- [Noun Project](https://thenounproject.com/)
