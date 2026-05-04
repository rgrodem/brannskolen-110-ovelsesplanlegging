import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs";
import { createRequire } from "node:module";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);
const pptxgen = require("C:/Users/runeg/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/pptxgenjs");
const root = path.resolve(__dirname, "..");
const out = path.join(root, "produksjon_farrisbrua");
const imgDir = path.join(out, "08_bildepakke");
const pptxPath = path.join(out, "07_Presentasjon_B43_Farrisbrua.pptx");

const pptx = new pptxgen();
pptx.layout = "LAYOUT_WIDE";
pptx.author = "B43 øvingsgruppe";
pptx.subject = "Før-brief og ettergjennomgang for realistisk 110-øvelse";
pptx.title = "Farrisbrua B43";
pptx.company = "Brannskolen 110 kurs";
pptx.theme = {
  headFontFace: "Arial",
  bodyFontFace: "Arial",
  lang: "nb-NO",
};
pptx.defineLayout({ name: "CUSTOM_WIDE", width: 13.333, height: 7.5 });
pptx.layout = "CUSTOM_WIDE";

const C = {
  navy: "203864",
  red: "A0302A",
  blue: "1F5F8B",
  green: "28724F",
  amber: "9A6B12",
  ink: "1D252C",
  muted: "5F6B76",
  pale: "F4F7FA",
  white: "FFFFFF",
  line: "D7DDE4",
};

function addFooter(slide, section = "B43 øvelse") {
  slide.addText(section, { x: 0.55, y: 7.05, w: 4.6, h: 0.18, fontFace: "Arial", fontSize: 7.5, color: C.muted });
  slide.addText("ØVELSE - fiktivt scenario", { x: 9.9, y: 7.05, w: 2.8, h: 0.18, fontFace: "Arial", fontSize: 7.5, color: C.muted, align: "right" });
}

function title(slide, text, kicker = "") {
  if (kicker) slide.addText(kicker.toUpperCase(), { x: 0.6, y: 0.35, w: 6.5, h: 0.2, fontSize: 8.5, bold: true, color: C.red, charSpace: 1 });
  slide.addText(text, { x: 0.6, y: 0.68, w: 11.8, h: 0.48, fontSize: 25, bold: true, color: C.navy, fit: "shrink" });
  slide.addShape(pptx.ShapeType.line, { x: 0.6, y: 1.28, w: 1.35, h: 0, line: { color: C.red, width: 2.2 } });
}

function bulletList(slide, items, x, y, w, h, opts = {}) {
  const runs = [];
  for (const item of items) {
    runs.push({ text: item, options: { bullet: { type: "bullet" }, breakLine: true } });
  }
  slide.addText(runs, { x, y, w, h, fontSize: opts.fontSize ?? 15, color: opts.color ?? C.ink, breakLine: false, fit: "shrink", valign: "mid", paraSpaceAfterPt: 5 });
}

function band(slide, x, y, w, h, color, label) {
  slide.addShape(pptx.ShapeType.roundRect, { x, y, w, h, rectRadius: 0.05, fill: { color }, line: { color } });
  slide.addText(label, { x: x + 0.1, y: y + 0.1, w: w - 0.2, h: h - 0.2, fontSize: 12, bold: true, color: C.white, align: "center", valign: "mid", fit: "shrink" });
}

function sectionLabel(slide, x, y, text, color = C.blue) {
  slide.addShape(pptx.ShapeType.roundRect, { x, y, w: 1.35, h: 0.28, rectRadius: 0.04, fill: { color }, line: { color } });
  slide.addText(text, { x: x + 0.08, y: y + 0.06, w: 1.19, h: 0.12, fontSize: 7.5, bold: true, color: C.white, align: "center", fit: "shrink" });
}

// 1 cover
{
  const slide = pptx.addSlide();
  slide.background = { color: C.pale };
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 13.333, h: 7.5, fill: { color: C.pale }, line: { transparency: 100 } });
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 13.333, h: 1.05, fill: { color: C.navy }, line: { color: C.navy } });
  slide.addText("FARRISBRUA B43", { x: 0.7, y: 1.85, w: 8.7, h: 0.8, fontSize: 40, bold: true, color: C.navy, fit: "shrink" });
  slide.addText("Realistisk spilløvelse for 110-vaktlag", { x: 0.75, y: 2.78, w: 8.7, h: 0.36, fontSize: 18, color: C.ink });
  slide.addText("3 OP + 1 VL | ca. 90 minutter action time | Stavern", { x: 0.75, y: 3.28, w: 8.7, h: 0.25, fontSize: 12.5, color: C.muted });
  slide.addImage({ path: path.join(imgDir, "bilde_1_farrisbrua.png"), x: 7.35, y: 1.55, w: 5.25, h: 2.95 });
  band(slide, 0.75, 5.05, 2.1, 0.52, C.red, "Før-brief");
  band(slide, 3.05, 5.05, 2.1, 0.52, C.blue, "Spillstab");
  band(slide, 5.35, 5.05, 2.1, 0.52, C.green, "AAR");
  slide.addText("Scenarioet er ukjent for de øvende ved start. Bildet brukes først i ettergjennomgang eller på riktig tidspunkt i spillet.", { x: 0.75, y: 6.03, w: 11.8, h: 0.28, fontSize: 10.5, color: C.muted });
  addFooter(slide, "Presentasjon");
}

// 2 før-brief rammer
{
  const slide = pptx.addSlide();
  title(slide, "Før-brief: rammer for de øvende", "Del 1");
  bulletList(slide, [
    "B43 er en fiktiv øvelsessentral i kontrollromsetting.",
    "Øvelsen varer ca. 90 minutter og kjøres som spilløvelse.",
    "Systembruk/LEO evalueres bare der det er nødvendig for gjennomføringen.",
    "Dere øver struktur, rollefordeling, meldingsmottak, samvirke og situasjonsforståelse.",
    "Scenarioet er ukjent ved start."
  ], 0.85, 1.75, 6.1, 3.9);
  slide.addShape(pptx.ShapeType.roundRect, { x: 7.4, y: 1.75, w: 4.9, h: 3.45, rectRadius: 0.06, fill: { color: "F9FBFC" }, line: { color: C.line } });
  slide.addText("Stoppkode", { x: 7.75, y: 2.1, w: 4.2, h: 0.3, fontSize: 14, bold: true, color: C.red });
  slide.addText("STOPP ØVELSE B43", { x: 7.75, y: 2.65, w: 4.2, h: 0.42, fontSize: 22, bold: true, color: C.navy, fit: "shrink" });
  slide.addText("Ved reell hendelse eller uklarhet stoppes øvelsen og øvingsleder avklarer videre håndtering.", { x: 7.75, y: 3.35, w: 4.05, h: 0.75, fontSize: 12, color: C.ink, fit: "shrink" });
  addFooter(slide, "Før-brief");
}

// 3 læringsmål
{
  const slide = pptx.addSlide();
  title(slide, "Læringsmål for vaktlaget", "Del 1");
  const rows = [
    ["1", "Håndtere første nødmelding og utalarmering strukturert og tidsriktig."],
    ["2", "Etablere og oppdatere felles situasjonsforståelse mens ressurser er på vei."],
    ["3", "Samvirke hensiktsmessig med politi, AMK og VTS."],
    ["4", "Fordele oppgaver og sikre overgang fra akuttfase til driftsfase."],
    ["5", "Oppsummere status presist før øvelsen avsluttes."]
  ];
  let y = 1.65;
  for (const [num, txt] of rows) {
    slide.addShape(pptx.ShapeType.ellipse, { x: 0.9, y: y + 0.02, w: 0.42, h: 0.42, fill: { color: C.blue }, line: { color: C.blue } });
    slide.addText(num, { x: 1.02, y: y + 0.12, w: 0.18, h: 0.12, fontSize: 8.5, bold: true, color: C.white, align: "center" });
    slide.addText(txt, { x: 1.55, y, w: 10.8, h: 0.38, fontSize: 15.5, color: C.ink, fit: "shrink" });
    y += 0.78;
  }
  addFooter(slide, "Før-brief");
}

// 4 forventet arbeidsform
{
  const slide = pptx.addSlide();
  title(slide, "Forventet arbeidsform", "Del 1");
  const cols = [
    ["OP 1", "Meldingsmottak\nMelderoppfølging\nTrygg veiledning"],
    ["OP 2", "Utalarmering\nTrippelvarsling\nAMK/politi/VTS"],
    ["OP 3", "Logg\nRessursoversikt\nStøtte til VL"],
    ["VL", "Prioritering\nRollefordeling\nFelles situasjonsbilde"],
  ];
  const colors = [C.red, C.blue, C.amber, C.green];
  cols.forEach(([h, body], i) => {
    const x = 0.72 + i * 3.05;
    slide.addShape(pptx.ShapeType.roundRect, { x, y: 1.82, w: 2.65, h: 3.3, rectRadius: 0.07, fill: { color: "FFFFFF" }, line: { color: C.line } });
    sectionLabel(slide, x + 0.25, 2.12, h, colors[i]);
    slide.addText(body, { x: x + 0.3, y: 2.75, w: 2.05, h: 1.6, fontSize: 15, bold: true, color: C.ink, align: "center", valign: "mid", breakLine: false, fit: "shrink" });
  });
  slide.addText("Dette er ikke en påtvunget fasit, men en struktur som gjør det mulig å lykkes i et kunstig øvingsmiljø.", { x: 1.0, y: 5.75, w: 11.3, h: 0.3, fontSize: 12, color: C.muted, align: "center" });
  addFooter(slide, "Før-brief");
}

// 5 spillstab brief
{
  const slide = pptx.addSlide();
  title(slide, "Spillstab: styr etter hensikt, ikke dramatikk", "Del 2");
  bulletList(slide, [
    "Motspillere følger spillkort og dreiebok.",
    "Ikke legg inn farlig last, sabotasje, mange hardt skadde eller større eskalering uten øvingsleder.",
    "Innringer 2 og 3 skal bare teste håndtering av duplikat-/avstandsmeldinger.",
    "Forsvaret/militær kolonne er kontekst, ikke hovedaktør.",
    "Dersom teknikk svikter, gis innspillet muntlig av øvingsleder."
  ], 0.85, 1.65, 6.3, 4.25, { fontSize: 14.5 });
  slide.addImage({ path: path.join(imgDir, "bilde_2_farrisbrua.png"), x: 7.65, y: 1.65, w: 4.65, h: 2.62 });
  slide.addText("Bildepakke brukes bare på definert tidspunkt.", { x: 7.75, y: 4.55, w: 4.3, h: 0.3, fontSize: 12.5, color: C.muted, align: "center" });
  addFooter(slide, "Spillstab");
}

// 6 øvelsesforløp etter
{
  const slide = pptx.addSlide();
  title(slide, "Ettergjennomgang: faktisk øvelsesforløp", "Del 3");
  const phases = [
    ["0-8", "Nødtelefon\nutalarmering"],
    ["8-22", "Fremkjøring\nsituasjonsbilde"],
    ["22-35", "Første ressurs\nvindusmelding"],
    ["35-75", "Driftsfase\navklaringer"],
    ["75-90", "Status\nAAR"],
  ];
  phases.forEach(([t, label], i) => {
    const x = 0.75 + i * 2.45;
    slide.addShape(pptx.ShapeType.chevron, { x, y: 2.05, w: 2.18, h: 1.1, fill: { color: i < 2 ? C.red : i === 2 ? C.amber : C.blue }, line: { color: "FFFFFF", width: 1 } });
    slide.addText(t + " min", { x: x + 0.5, y: 2.28, w: 1.3, h: 0.16, fontSize: 10, bold: true, color: C.white, fit: "shrink" });
    slide.addText(label, { x: x + 0.5, y: 2.52, w: 1.35, h: 0.45, fontSize: 10.5, color: C.white, fit: "shrink" });
  });
  slide.addImage({ path: path.join(imgDir, "bilde_4_farrisbrua.png"), x: 3.5, y: 4.0, w: 6.4, h: 2.3 });
  addFooter(slide, "Ettergjennomgang");
}

// 7 AAR
{
  const slide = pptx.addSlide();
  title(slide, "AAR: fem spørsmål", "Del 3");
  const qs = [
    "Hva forventet vi ville skje?",
    "Hva skjedde?",
    "Hvorfor ble det slik?",
    "Hva gikk bra, og hvorfor?",
    "Hva kan forbedres, og hvordan?"
  ];
  qs.forEach((q, i) => {
    slide.addText(String(i + 1), { x: 1.0, y: 1.7 + i * 0.78, w: 0.35, h: 0.25, fontSize: 13, bold: true, color: C.red, align: "center" });
    slide.addText(q, { x: 1.55, y: 1.65 + i * 0.78, w: 9.8, h: 0.35, fontSize: 17, color: C.ink, fit: "shrink" });
  });
  slide.addText("Fokus på hva og hvorfor, ikke hvem.", { x: 1.05, y: 6.15, w: 10.8, h: 0.35, fontSize: 15, bold: true, color: C.navy, align: "center" });
  addFooter(slide, "AAR");
}

// 8 læringspunkter
{
  const slide = pptx.addSlide();
  title(slide, "Oppsummer læring i tre kolonner", "Del 3");
  const columns = [
    ["Fortsette", C.green, "Hva fungerte godt nok til å videreføres?"],
    ["Slutte", C.red, "Hva skapte støy, venting eller uklarhet?"],
    ["Begynne", C.blue, "Hva bør prøves neste gang?"],
  ];
  columns.forEach(([h, color, body], i) => {
    const x = 0.8 + i * 4.1;
    slide.addShape(pptx.ShapeType.roundRect, { x, y: 1.9, w: 3.5, h: 3.25, rectRadius: 0.06, fill: { color: "FFFFFF" }, line: { color: C.line } });
    slide.addShape(pptx.ShapeType.rect, { x, y: 1.9, w: 3.5, h: 0.52, fill: { color }, line: { color } });
    slide.addText(h, { x: x + 0.25, y: 2.06, w: 3.0, h: 0.18, fontSize: 12, bold: true, color: C.white, align: "center" });
    slide.addText(body, { x: x + 0.35, y: 2.75, w: 2.8, h: 0.75, fontSize: 13, color: C.ink, align: "center", valign: "mid", fit: "shrink" });
    slide.addShape(pptx.ShapeType.line, { x: x + 0.35, y: 4.05, w: 2.8, h: 0, line: { color: C.line, width: 1 } });
    slide.addShape(pptx.ShapeType.line, { x: x + 0.35, y: 4.45, w: 2.8, h: 0, line: { color: C.line, width: 1 } });
  });
  addFooter(slide, "AAR");
}

await pptx.writeFile({ fileName: pptxPath });

const stat = fs.statSync(pptxPath);
console.log(JSON.stringify({ ok: true, file: pptxPath, bytes: stat.size, slides: pptx._slides.length }, null, 2));
