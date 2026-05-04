import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = process.cwd();
const scriptPath = fileURLToPath(import.meta.url);
const isRenderChild = process.argv.includes("--render-child");
const userArgs = process.argv.slice(2).filter((arg) => arg !== "--render-child");

const pptxPath = path.resolve(
  root,
  userArgs[0] || "produksjon_farrisbrua/07_Presentasjon_B43_Farrisbrua.pptx",
);
const outDir = path.resolve(
  root,
  userArgs[1] || "produksjon_farrisbrua/qa/pptx_visual_check",
);
const reportPath = path.join(outDir, "visual_check_report.json");
const contactSheetPath = path.join(outDir, "pptx_contactsheet.png");

if (!isRenderChild) {
  fs.mkdirSync(outDir, { recursive: true });
  const child = spawnSync(process.execPath, [scriptPath, "--render-child", ...userArgs], {
    cwd: root,
    encoding: "utf8",
    maxBuffer: 20 * 1024 * 1024,
  });

  if (fs.existsSync(reportPath) && fs.existsSync(contactSheetPath)) {
    const report = fs.readFileSync(reportPath, "utf8").trim();
    console.log(report);
    process.exit(0);
  }

  if (child.stdout) process.stdout.write(child.stdout);
  if (child.stderr) process.stderr.write(child.stderr);
  process.exit(child.status || 1);
}

const home = process.env.USERPROFILE || process.env.HOME;
if (!home) throw new Error("Could not resolve user home directory.");

const runtimeNodeModules = path.join(
  home,
  ".cache",
  "codex-runtimes",
  "codex-primary-runtime",
  "dependencies",
  "node",
  "node_modules",
);

const artifactToolPath = path.join(
  runtimeNodeModules,
  "@oai",
  "artifact-tool",
  "dist",
  "artifact_tool.mjs",
);
const skiaCanvasPath = path.join(
  runtimeNodeModules,
  "@oai",
  "artifact-tool",
  "node_modules",
  "skia-canvas",
  "lib",
  "index.js",
);

const [{ FileBlob, PresentationFile, drawSlideToCtx }, { Canvas, loadImage }] =
  await Promise.all([
    import(pathToFileURL(artifactToolPath).href),
    import(pathToFileURL(skiaCanvasPath).href),
  ]);

if (!fs.existsSync(pptxPath)) {
  throw new Error(`Missing PPTX: ${pptxPath}`);
}

fs.mkdirSync(outDir, { recursive: true });

const presentation = await PresentationFile.importPptx(await FileBlob.load(pptxPath));
const slideFiles = [];

for (let i = 0; i < presentation.slides.items.length; i += 1) {
  const slide = presentation.slides.items[i];
  const width = Math.ceil(slide.frame.width);
  const height = Math.ceil(slide.frame.height);
  const canvas = new Canvas(width, height);
  const ctx = canvas.getContext("2d");

  await drawSlideToCtx(
    slide,
    presentation,
    ctx,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    { clearBeforeDraw: true },
  );

  const file = path.join(outDir, `slide_${String(i + 1).padStart(2, "0")}.png`);
  await canvas.toFile(file);
  slideFiles.push(file);
}

const thumbW = 426;
const thumbH = 240;
const cols = 2;
const gap = 24;
const labelH = 34;
const pad = 28;
const rows = Math.ceil(slideFiles.length / cols);
const sheet = new Canvas(
  cols * thumbW + (cols - 1) * gap + pad * 2,
  rows * (thumbH + labelH) + (rows - 1) * gap + pad * 2,
);
const sheetCtx = sheet.getContext("2d");

sheetCtx.fillStyle = "#f6f7f8";
sheetCtx.fillRect(0, 0, sheet.width, sheet.height);
sheetCtx.font = "bold 18px Segoe UI, Arial";
sheetCtx.textBaseline = "alphabetic";

for (let i = 0; i < slideFiles.length; i += 1) {
  const img = await loadImage(slideFiles[i]);
  const col = i % cols;
  const row = Math.floor(i / cols);
  const x = pad + col * (thumbW + gap);
  const y = pad + row * (thumbH + labelH + gap);

  sheetCtx.fillStyle = "#ffffff";
  sheetCtx.fillRect(x - 4, y - 4, thumbW + 8, thumbH + 8);
  sheetCtx.strokeStyle = "#d8dee4";
  sheetCtx.strokeRect(x - 4, y - 4, thumbW + 8, thumbH + 8);
  sheetCtx.drawImage(img, x, y, thumbW, thumbH);
  sheetCtx.fillStyle = "#172026";
  sheetCtx.fillText(`Slide ${i + 1}`, x, y + thumbH + 25);
}

await sheet.toFile(contactSheetPath);

const report = {
  pptx: path.relative(root, pptxPath).replaceAll("\\", "/"),
  outDir: path.relative(root, outDir).replaceAll("\\", "/"),
  slideCount: presentation.slides.items.length,
  renderedSlides: slideFiles.map((file) => path.relative(root, file).replaceAll("\\", "/")),
  contactSheet: path.relative(root, contactSheetPath).replaceAll("\\", "/"),
  slideSize: presentation.slides.items[0]
    ? {
        width: Math.ceil(presentation.slides.items[0].frame.width),
        height: Math.ceil(presentation.slides.items[0].frame.height),
      }
    : null,
};

fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
console.log(JSON.stringify(report, null, 2));

process.exit(0);
