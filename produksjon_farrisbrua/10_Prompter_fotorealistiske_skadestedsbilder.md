# Prompter for fotorealistiske skadestedsbilder

Disse promptene er laget for Nano Banana eller tilsvarende bildegenerator. De skal erstatte skissene i `08_bildepakke/`.

Målet er å lage realistiske øvingsbilder som gir situasjonsforståelse for 110-operatører, uten grafiske personskader, identifiserbare personer, ekte registreringsnummer, etatslogoer eller misvisende informasjon.

## Viktig bruksmåte

For best kontinuitet:

1. Generer først **Bilde 1**.
2. Bruk Bilde 1 som referansebilde for Bilde 2-4 hvis verktøyet støtter referanse.
3. Be verktøyet beholde samme sted, vær, lys, kjøretøy og retning.
4. Ikke bruk ekte foto av en reell ulykke.
5. Ikke legg inn blod, døde personer, hardt skadde personer eller identifiserbare ansikter.

## Felles stilprompt

Bruk dette som fast innledning i alle bildepromptene:

```text
Create a photorealistic emergency exercise image for a Norwegian 110 emergency dispatch training scenario. The scene is a staged, fictional traffic incident on E18 Farrisbrua near Larvik, Norway, on a modern motorway bridge over water and forested terrain. Overcast Nordic daylight, realistic road surface, concrete bridge barriers, muted natural colors, documentary emergency-service photography style, 35mm lens, eye-level or slightly elevated viewpoint, high detail, realistic perspective, no cinematic exaggeration.

The image must look like a realistic training photograph, not a movie poster and not an illustration. No gore, no blood, no visible severe injuries, no identifiable faces, no readable license plates, no real emergency-service logos, no brand logos, no text overlays, no watermark.

Scenario continuity: same incident throughout the image series: a red civilian passenger car has front-end damage after a collision with a dark green military logistics truck on E18 Farrisbrua. Light grey smoke comes from the red car's engine compartment. The military vehicle is present as total-defence context only, not as a combat scene. No weapons, no ammunition, no explosion, no fireball.
```

## Negativ prompt

Bruk denne i negativt promptfelt hvis verktøyet har det:

```text
gore, blood, dead body, severe injury, trapped person visible in distress, identifiable face, readable license plate, real police logo, real ambulance logo, real fire department logo, brand logo, military weapons, ammunition, explosion, fireball, terrorism, war scene, dramatic action movie lighting, rainstorm, night scene, snow, helicopter, crowd panic, news graphics, text, watermark, blurry, cartoon, illustration, CGI, toy-like vehicles, unrealistic road geometry
```

## Bilde 1 - Initial oversikt fra første melder

**Bruk i øvelsen:** ca. 10-15 minutter hvis de øvende trenger visuell støtte til posisjon og omfang. Kan også brukes i ettergjennomgang.

**Ønsket læring:** posisjon, kjørefelt, røyk/brannindikasjon, militær kolonne som kontekst, trafikkstans.

```text
[FELLES STILPROMPT]

Image 1 of 4: Initial overview from the first caller's perspective, about 30 to 50 meters behind the incident. The camera is inside or just outside a stopped civilian car in the traffic queue, looking forward along E18 Farrisbrua in the direction of Oslo/Sandefjord. In the middle distance, a red civilian passenger car with front-end damage is stopped at an angle near a dark green military logistics truck. Light grey smoke rises from the red car's engine compartment. Several civilian vehicles are stopped behind the incident with hazard lights, but no crowd.

There are no emergency vehicles visible yet. A few people are standing at a safe distance near the vehicles, seen from behind or too far away to identify. The bridge, water below, concrete barriers and wooded Larvik/Farris landscape are visible enough to establish location and scale. The scene should communicate uncertainty: possible fire, possible injuries, traffic blocked, but not chaos.

Composition: wide horizontal 16:9 image, slightly elevated eye-level viewpoint, realistic distance, enough empty road and bridge context for a dispatcher to understand the scene.
```

## Bilde 2 - Nærmere observasjon av skadepunkt

**Bruk i øvelsen:** ca. 15-22 minutter, som supplerende bilde fra melder eller før første ressurs er fremme.

**Ønsket læring:** skille røyk fra åpen flamme, forstå personbil mot tyngre kjøretøy, avklare mulig diesel/lekkasje uten å overdrive farlig last.

```text
[FELLES STILPROMPT]

Image 2 of 4: Closer view of the collision point, still before emergency vehicles arrive. The red civilian passenger car has visible front-end damage against or very close to a dark green military logistics truck. Light grey smoke comes from the car's engine compartment, but there are no visible flames. The truck is stationary and intact enough to look like a heavy logistics vehicle, not a combat vehicle. A faint dark wet-looking patch near the vehicles suggests possible diesel or coolant on the road, but it is not dramatic and not spreading widely.

Two people in neutral outdoor clothing or indistinct uniforms stand at a safe distance, backs turned or faces not visible. One person appears to be speaking on a phone. No one is visibly injured in a graphic way. The motorway lanes and bridge barriers are clear. Traffic is stopped behind the incident.

Composition: horizontal 16:9, realistic telephoto/normal perspective from a safe roadside distance, detailed but not sensational.
```

## Bilde 3 - Trafikk og fremkommelighet for VTS

**Bruk i øvelsen:** ca. 35-45 minutter, som bilde eller situasjonsbeskrivelse fra VTS.

**Ønsket læring:** trafikk, fremkommelighet, behov for stenging, trygg arbeidsplass og samvirke med politi/VTS.

```text
[FELLES STILPROMPT]

Image 3 of 4: Wider traffic-management view of the same incident on E18 Farrisbrua. The red car and dark green military logistics truck are visible farther ahead, with stopped traffic behind them. Several civilian vehicles form a queue in the same direction. One lane is clearly blocked, and the second lane has limited or no passage. The bridge setting over water and forested terrain is visible. Add a generic yellow road-service or traffic-management vehicle at a distance if useful, but without readable logos or text.

No emergency response should dominate the image yet, or show only distant non-branded blue-light presence if necessary. The purpose is to show queue length, blocked lanes and limited access for responding resources, not dramatic rescue.

Composition: horizontal 16:9, elevated viewpoint as if from a roadside camera or VTS-style overview, realistic Norwegian motorway bridge, clean and readable scene geometry.
```

## Bilde 4 - Første ressurs fremme / overgang til driftsfase

**Bruk i øvelsen:** ca. 22-35 minutter eller i driftsfase når UL/IL gir vindusmelding.

**Ønsket læring:** vindusmelding, brann/røyk under kontroll/avklaring, første ressurs fremme, overgang fra akuttfase til driftsfase.

```text
[FELLES STILPROMPT]

Image 4 of 4: First fire and ambulance resources have arrived at the same Farrisbrua incident. A generic red fire engine without readable logos is parked behind the damaged red car and the dark green military logistics truck, positioned to protect the scene. A generic white ambulance without readable logos is visible farther back. Responders in high-visibility gear are working calmly, seen from behind or with faces obscured. One firefighter is near the red car's engine compartment with a hose line or extinguisher ready, but there are no visible flames and only light residual smoke.

The scene now looks controlled and structured: traffic stopped, working area protected, police/VTS traffic management implied but not visually dominant. No gore, no visible severe injuries, no panic. The image should communicate that first resource is on scene and the incident is moving into a managed operational phase.

Composition: horizontal 16:9, realistic documentary emergency-service photograph, slightly elevated viewpoint, clear view of vehicle positions and emergency response layout.
```

## Alternativ: samlet prompt for alle fire bilder

Hvis verktøyet kan generere en serie med fire konsistente bilder samtidig:

```text
Create a consistent four-image photorealistic series for a Norwegian 110 emergency dispatch training scenario. Use the same fictional incident, same location, same weather, same vehicles and same road direction in all four images.

Location: E18 Farrisbrua near Larvik, Norway, modern motorway bridge over water and forested terrain, overcast Nordic daylight.

Incident: a red civilian passenger car has collided with or struck the rear/side of a dark green military logistics truck in a military convoy. Light grey smoke from the red car's engine compartment. No visible flames in images 1-3, no explosion, no weapons, no ammunition, no gore.

Image 1: initial overview from first caller, 30-50 meters behind, no emergency vehicles yet, traffic stopped, uncertain situation.
Image 2: closer view of red car and military logistics truck, light smoke, possible small fluid patch, no visible severe injuries.
Image 3: wider traffic/VTS view showing blocked lanes, queue and limited access on the bridge.
Image 4: first fire resource and ambulance arrived, generic non-branded emergency vehicles, calm responders, light residual smoke, controlled scene moving into driftsfase.

Style: photorealistic documentary emergency-service training photos, 16:9 horizontal, realistic perspective, muted colors, no logos, no readable license plates, no identifiable faces, no text overlays, no watermark.
```

## Filnavn ved eksport

Bruk disse filnavnene når bildene eksporteres og legges inn i øvelsespakken:

- `bilde_1_farrisbrua_foto.png`
- `bilde_2_farrisbrua_foto.png`
- `bilde_3_farrisbrua_foto.png`
- `bilde_4_farrisbrua_foto.png`

Når bildene er valgt, bør `08_Bildepakke_og_situasjonskort_B43_Farrisbrua.docx` oppdateres slik at skissene erstattes med de fotorealistiske bildene.
