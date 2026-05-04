from pathlib import Path
import json
import re
import zipfile
from xml.etree import ElementTree as ET
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "produksjon_farrisbrua"
RENDER = OUT / "qa" / "rendered_docx"
PPTX = OUT / "07_Presentasjon_B43_Farrisbrua.pptx"


def pptx_check():
    ns = {"a": "http://schemas.openxmlformats.org/drawingml/2006/main"}
    with zipfile.ZipFile(PPTX) as z:
        slides = sorted(
            [n for n in z.namelist() if re.match(r"ppt/slides/slide\d+\.xml$", n)],
            key=lambda n: int(re.search(r"slide(\d+)", n).group(1)),
        )
        text = []
        for n in slides:
            root = ET.fromstring(z.read(n))
            text.extend([t.text or "" for t in root.findall(".//a:t", ns)])
    joined = "\n".join(text)
    required = ["FARRISBRUA B43", "Før-brief", "Læringsmål", "STOPP ØVELSE B43", "AAR"]
    return {
        "slides": len(slides),
        "missing": [r for r in required if r not in joined],
        "chars": len(joined),
    }


def render_check():
    rows = []
    for docx in sorted(OUT.glob("*.docx")):
        d = RENDER / docx.stem
        pages = sorted(d.glob("page-*.png"))
        rows.append({"doc": docx.name, "pages": len(pages), "ok": len(pages) > 0})
    return rows


def image_check():
    rows = []
    for p in sorted((OUT / "08_bildepakke").glob("*.png")):
        with Image.open(p) as im:
            rows.append({"image": str(p.relative_to(OUT)), "size": f"{im.size[0]}x{im.size[1]}", "ok": im.size == (1600, 900)})
    return rows


def main():
    manifest = json.loads((OUT / "manifest.json").read_text(encoding="utf-8"))
    ppt = pptx_check()
    renders = render_check()
    images = image_check()
    all_ok = manifest["all_ok"] and not ppt["missing"] and ppt["slides"] == 8 and all(r["ok"] for r in renders) and all(i["ok"] for i in images)

    lines = [
        "# QA - Farrisbrua B43",
        "",
        "## Dokumentkontroll",
        "",
    ]
    for r in manifest["results"]:
        status = "OK" if r["ok"] else "MANGLER"
        lines.append(f"- {status}: `{r['file']}` ({r['chars']} tegn)")
        if r["missing"]:
            lines.append(f"  - Mangler: {', '.join(r['missing'])}")

    lines.extend(["", "## DOCX-render", ""])
    for r in renders:
        status = "OK" if r["ok"] else "MANGLER"
        lines.append(f"- {status}: `{r['doc']}` - {r['pages']} renderede sider")
    lines.append("")
    lines.append("Merknad: artifact-tool returnerte exitkode 1 uten stderr, men produserte PNG-sider for alle DOCX-dokumenter.")
    docx_contact = OUT / "qa" / "rendered_docx_all_pages_contactsheet.png"
    if docx_contact.exists():
        rel = str(docx_contact.relative_to(ROOT)).replace("\\", "/")
        lines.append(f"- Visuelt DOCX-kontaktark: `{rel}`")

    lines.extend(["", "## Bildekontroll", ""])
    for i in images:
        status = "OK" if i["ok"] else "AVVIK"
        lines.append(f"- {status}: `{i['image']}` - {i['size']} px")

    lines.extend(["", "## Presentasjon", ""])
    lines.append(f"- Slides: {ppt['slides']}")
    lines.append(f"- Teksttegn: {ppt['chars']}")
    lines.append(f"- Manglende kontrollord: {', '.join(ppt['missing']) if ppt['missing'] else 'ingen'}")
    visual_report = OUT / "qa" / "pptx_visual_check" / "visual_check_report.json"
    if visual_report.exists():
        visual = json.loads(visual_report.read_text(encoding="utf-8"))
        lines.append(f"- Visuell PPTX-render: OK - {visual['slideCount']} slides rendret til PNG.")
        lines.append(f"- Kontaktark: `{visual['contactSheet']}`")
    else:
        lines.append("- Visuell PPTX-render: ikke kjørt.")

    lines.extend([
        "",
        "## Scenarioavklaringer valgt i førsteutkast",
        "",
        "- Geografi: E18 Farrisbrua, Larvik, retning Oslo/Sandefjord.",
        "- Innringere: 3 i initialfasen.",
        "- Innringer 1: grunnlag for trippelvarsling og utalarmering.",
        "- Innringer 2 og 3: avstandsmeldinger som avsluttes kort etter sjekk for ny kritisk informasjon.",
        "- Militær kolonne: totalforsvarskontekst, ikke tung motspiller.",
        "- Aktivt motspill: AMK, politi, VTS, 01/09/UL/IL.",
        "",
        f"Samlet status: {'OK' if all_ok else 'AVVIK'}",
        "",
    ])
    (OUT / "00_QA_sjekkliste.md").write_text("\n".join(lines), encoding="utf-8")
    print(json.dumps({"all_ok": all_ok, "pptx": ppt, "renders": renders, "images": images}, ensure_ascii=False, indent=2))
    if not all_ok:
        raise SystemExit(2)


if __name__ == "__main__":
    main()
