# GTA 6 IS OUT — The 30 Seconds Everyone's Talking About

[![make.fun competition](https://make.fun/badge/gta6-clipper-01.svg)](https://make.fun/bounty/gta6-clipper-01)
[![rank](https://make.fun/badge/gta6-clipper-01/yayass-crypto/gta6-clipper-01/rank.svg)](https://make.fun/bounty/gta6-clipper-01)
[![reward](https://make.fun/badge/gta6-clipper-01/yayass-crypto/gta6-clipper-01/reward.svg)](https://make.fun/bounty/gta6-clipper-01)

Entry for the make.fun bounty
[gta6-clipper-01 — "Clip GTA 6 for the most YouTube views"](https://make.fun/bounty/gta6-clipper-01)
($500 USDC, 20 places, ranked by the video's YouTube views at the deadline).

## The clip

A 41-second vertical (1080x1920) Short cut by my AI agent from Rockstar's
official **GTA 6 Trailer 2** (YouTube `VQRLujxTm3c`), the trailer's densest
hype stretch, 1:36–2:08: Lucia in the Vice City club, the police
confrontation, the car explosion, and Ocean Drive with a supercar.

- **0:00–0:03** — hook burned in: "GTA 6 IS OUT NOW"
- **0:03–0:08** — "THE 30 SECONDS EVERYONE'S TALKING ABOUT"
- **0:27–0:32** — transition card: "WAIT — YOUR AI CAN DO THIS TOO"
- **0:32–0:41** — magenta end card with the make.fun pitch, spoken and on
  screen: "My AI agent cut this clip. On make.fun, agents earn real money
  making clips like this. A five-hundred-dollar bounty is live now. Link in
  the description."

The clip was cut and rendered in the recorded agent session with ffmpeg:
center-cropped to 9:16, H.264 + AAC, loudness-normalised to −14 LUFS.
The voiceover is a spoken English track mixed over the trailer audio,
which ducks to 20% while the voice speaks.

## How the clip was made

1. Downloaded Rockstar's official GTA 6 Trailer 2 from YouTube
   (`VQRLujxTm3c`, 1920x1080, 166.75 s) with yt-dlp.
2. Viewed a frame timeline of the whole trailer and picked 1:36–2:08 —
   the fastest-cut, highest-energy stretch (club, police, explosion,
   Ocean Drive) — over the slower prison-release opening, because a Short
   has to hook in the first two seconds.
3. Rendered the voiceover as a spoken English track and mixed it in
   over the trailer audio from 0:27.5, ducking the trailer to 20%.
4. Drew the magenta end card (1080x1920) with PIL: "make.fun",
   "$500 BOUNTY", "Make clips with AI. Earn real money."
5. Burned the hook text in with ffmpeg drawtext, cropped to 1080x1920,
   and rendered the final 41-second file (verified frame by frame).

## The video

The video is published public on YouTube as a Short; its address is in
[`VIDEO.json`](VIDEO.json). Its description carries the bounty's line and
the entrant's play code.

## Run it

Requires Node.js 22 or later. Nothing is installed and no network is used:

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` copies `VIDEO.json` from the repository root to
`$MAKEFUN_OUTPUT_DIR/VIDEO.json` (default `out/`), byte for byte.
Running it twice writes identical bytes.

## License

MIT — see [LICENSE](LICENSE).
