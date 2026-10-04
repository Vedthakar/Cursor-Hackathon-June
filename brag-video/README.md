# Wedding Cam brag video 🏆

`wedding-cam-brag.mp4`: a 34s 1080p video celebrating our **Cursor Hackathon win** and walking through the pipeline (snap → sticker → price → AI barter → paid).

## Re-render

Scenes are plain HTML/CSS driven by a deterministic `render(t)` in `brag.html`. To rebuild:

```bash
npm i playwright          # or symlink a global install to ./node_modules
node render.mjs frames 30
ffmpeg -framerate 30 -i frames/f%05d.jpg -i music.wav -c:v libx264 -crf 18 -pix_fmt yuv420p \
  -c:a aac -shortest -movflags +faststart wedding-cam-brag.mp4
```

The soundtrack is a synth beat generated with ffmpeg `aevalsrc`, so no licensed audio is involved.
