# SAKINA — Design System

> Identité visuelle de l'application. « Sakina » (سكينة) : la sérénité.
> Luxe discret, lumière douce, espace. Chaque écran doit pouvoir figurer dans une keynote.

---

## 1. Principes

1. **L'espace est le luxe.** On retire avant d'ajouter. Marges généreuses, jamais deux
   éléments décoratifs côte à côte.
2. **Une seule voix dorée.** L'or est un murmure : hairlines, icônes, chiffres. Jamais
   de grands aplats dorés.
3. **Le vert est sacré.** Le vert profond est réservé aux moments spirituels forts
   (prochaine prière, actions primaires). Pas de vert décoratif.
4. **Le contenu est l'ornement.** La calligraphie arabe EST le visuel. On ne la
   concurrence pas.
5. **Le mouvement est une politesse.** Les animations expliquent (entrée, hiérarchie,
   feedback) — elles ne divertissent jamais.

---

## 2. Couleurs

### Neutres chauds (fondations)
| Token | Hex | Usage |
|---|---|---|
| `ivory` | `#F6F4EF` | Fond d'écran principal |
| `ivory-50` | `#FBFAF7` | Surfaces élevées (cartes) |
| `sand` | `#EFEBE3` | Remplissages ton-sur-ton, chips |
| `sand-200` | `#E6E0D4` | Hairlines appuyées |
| `hairline` | `#EAE5DC` | Bordures 1px par défaut |

### Or mat & bronze (signature)
| Token | Hex | Usage |
|---|---|---|
| `gold-200` | `#E9DDBF` | Fond tonal doré très léger |
| `gold` | `#C2A566` | Icônes, chiffres clés, hairlines premium |
| `gold-600` | `#A8894E` | Or appuyé, texte sur clair |
| `bronze` | `#8A7147` | Texte doré lisible, labels |

### Vert profond (accent sacré)
| Token | Hex | Usage |
|---|---|---|
| `forest` | `#0E5648` | Carte prochaine prière, CTA primaires |
| `forest-600` | `#0B4A3E` | Hover / pressed |
| `forest-50` | `#EDF3F1` | Fond tonal vert très léger |

### Noir chaleureux (texte)
| Token | Hex | Usage |
|---|---|---|
| `ink` | `#1D1A16` | Titres, texte primaire, thème sombre |
| `ink-800` | `#2A2620` | Surfaces sombres élevées |
| `muted` | `#797065` | Texte secondaire |
| `faint` | `#A69C8D` | Texte tertiaire, placeholders |

### Sémantiques
`success` = forest · `warning` `#B97324` · `danger` `#B3402F` (rouge brique, jamais criard)

**Interdits :** gradients saturés, vert menthe/teal (#0d9488 ✝), couleurs froides pures,
ombres colorées.

---

## 3. Typographie

**UI — pile système (SF Pro sur Apple) :**
`-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Inter", "Segoe UI", sans-serif`

**Coran / arabe :** `"Amiri", serif` — leading très généreux (`leading-[2.2]`), jamais gras.

### Échelle
| Style | Classe | Spécs |
|---|---|---|
| Display | `text-display` | 32px / 700 / -0.02em |
| Title | `text-title` | 24px / 700 / -0.01em |
| Title 2 | `text-title2` | 20px / 600 |
| Headline | `text-headline` | 17px / 600 |
| Body | `text-body` | 15px / 400 / lh 1.5 |
| Callout | `text-callout` | 14px / 500 |
| Footnote | `text-footnote` | 13px / 400 |
| Caption | `text-caption` | 11px / 600 / uppercase / +0.08em |
| Coran | `text-quran` | 26–30px Amiri / lh 2.2 / dir rtl |

Les chiffres importants (horaires, stats) utilisent `tabular-nums`.

---

## 4. Géométrie

- **Grille 4pt.** Écran : `px-5` (20px). Sections espacées de `space-y-7` (28px).
- **Rayons :** carte `rounded-card` (24px) · tuile `rounded-tile` (20px) ·
  contrôle `rounded-control` (14px) · pastille `rounded-full`.
- **Hairlines :** 1px `border-hairline`. Jamais de bordure 2px décorative.

## 5. Ombres (matière, pas décor)

| Token | Usage |
|---|---|
| `shadow-soft` | Cartes posées — `0 1px 2px rgba(29,26,22,.04), 0 12px 32px -16px rgba(29,26,22,.14)` |
| `shadow-float` | Éléments flottants (nav, player) — `0 2px 6px rgba(29,26,22,.05), 0 24px 48px -16px rgba(29,26,22,.20)` |
| `shadow-glow-gold` | CTA doré uniquement — `0 8px 28px -10px rgba(194,165,102,.55)` |

## 6. Composants (src/components/premium)

- **`Screen`** — wrapper de page : fond ivoire, padding, animation d'entrée.
- **`PageHeader`** — titre + sous-titre arabe + action, sticky translucide (blur).
- **`PCard`** — carte premium. Variants : `default` (ivory-50 + hairline + soft),
  `tonal` (sand, sans ombre), `forest` (vert profond, texte ivoire),
  `dark` (ink, or en accent), `gold` (fond gold-200 tonal).
- **`Section`** — en-tête de section : caption dorée + titre + lien « Tout voir ».
- **`StatTile`** — chiffre clé tabular + label caption.
- **`ProgressRing`** — anneau de progression fin (stroke 3), or sur sable.
- **`Pressable`** — enveloppe motion : scale 0.97 au press, spring doux.
- **`GoldHairline`** — séparateur ⟡ centré, or à 40%.

## 7. Navigation

5 onglets, jamais plus : **Accueil · Coran · Prière · Progression · Profil**.
Barre flottante translucide (blur), pastille active animée (spring `layoutId`),
icônes lucide `strokeWidth={1.75}`. Tout le reste est accessible depuis l'Accueil.

## 8. Mouvement

- **Courbe signature :** `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out-expo).
- **Durées :** micro 200ms · élément 350ms · page 500ms.
- **Entrée de page :** fade + translateY(12px), stagger enfants 60ms.
- **Press :** scale 0.97, spring `{ stiffness: 400, damping: 30 }`.
- **Jamais :** rebonds exagérés, rotations décoratives, parallaxe gratuite.

## 9. Iconographie

`lucide-react`, `strokeWidth={1.75}`, taille 20–22px dans les tuiles, 24px max.
Une icône = un sens. Pas d'emojis dans l'UI (réservés au contenu si nécessaire).

## 10. Ton rédactionnel

Court, calme, révérencieux. « Qu'Allah facilite ta journée » plutôt que « Bienvenue ! ».
Jamais de point d'exclamation double, jamais de MAJUSCULES criardes.
