# Zentro Background Music Library

Place royalty-free MP3 tracks here. The system selects tracks based on the video style.

## Expected File Names

### Cinematic
- `cinematic-epic.mp3` — Orchestral, dramatic, building
- `cinematic-inspire.mp3` — Uplifting, hopeful, sweeping

### Modern
- `modern-sleek.mp3` — Electronic, clean, rhythmic
- `modern-beat.mp3` — Upbeat, contemporary, driving

### Minimal
- `minimal-clean.mp3` — Ambient, sparse, airy
- `minimal-ambient.mp3` — Atmospheric, subtle, calming

### Corporate
- `corporate-professional.mp3` — Trustworthy, steady, polished
- `corporate-trust.mp3` — Warm, confident, refined

### Tech
- `tech-futuristic.mp3` — Synth-driven, innovative, energetic
- `tech-innovation.mp3` — Digital, pulsing, forward-looking

## Royalty-Free Music Sources

- **Pixabay Music**: https://pixabay.com/music/
- **Uppbeat**: https://uppbeat.io/
- **Mixkit**: https://mixkit.co/free-stock-music/
- **YouTube Audio Library**: https://studio.youtube.com/channel/UC.../music

## Fallback Behavior

If no music files are found, the system renders videos without background music.
The `<Audio>` component in Remotion is simply not rendered when `musicPath` is empty.
