# Prompter for konsistente fotorealistiske skadestedsbilder

Disse promptene er laget for Nano Banana eller tilsvarende bildegenerator. Målet er å lage fire nye bilder der alle ser samme hendelse: samme røde personbil, samme militære logistikkjøretøy, samme kjørefelt, samme skadepunkt, samme retning og samme utvikling i tid.

Den viktigste forbedringen er at alle prompts bruker en fast **scene-bibel**. Ikke endre denne mellom bildene.

## Bruksmåte for best kontinuitet

1. Bruk samme format hver gang: 16:9, helst 1600 x 900 eller høyere.
2. Generer først `Bilde 1`.
3. Bruk `Bilde 1` som referansebilde for `Bilde 2-4` hvis verktøyet støtter image reference.
4. Bruk samme seed hvis verktøyet støtter seed.
5. Ikke be generatoren om "new angle from the opposite side". Alle kameraer skal være på samme trafikkside, bak eller skrått bak hendelsen.
6. Forkast bilder der bilen/lastebilen bytter side, kjøretøyene speiles, bilen står foran lastebilen, eller skaden flyttes til feil side.

## Fast scene-bibel

Denne delen skal være med i alle prompts. Den låser geometri, kjøretøy og hendelse.

```text
PHOTOREALISTIC TRAINING IMAGE. Create a realistic emergency exercise image for a Norwegian 110 emergency dispatch training scenario. The scene is fictional and staged, but must look like a real documentary training photograph.

LOCATION AND ROAD GEOMETRY:
E18 Farrisbrua near Larvik, Norway, modern motorway bridge over water and forested terrain, overcast Nordic daylight, slightly damp asphalt, concrete bridge barriers, muted realistic colors. The visible carriageway has two lanes in the same direction. Traffic direction is away from the camera, toward Oslo/Sandefjord. The camera is always behind the incident or slightly behind-left of the incident, looking forward in the same direction as stopped traffic. Do not show the opposite carriageway as the main scene. Do not mirror the scene.

FIXED INCIDENT LAYOUT - MUST STAY IDENTICAL IN ALL IMAGES:
- A dark olive-green military logistics truck is stopped in the RIGHT lane, close to the right concrete bridge barrier.
- The military truck points away from the camera, in the same direction as traffic.
- The truck is a non-combat logistics/cargo vehicle: boxy cab, canvas-covered cargo bed, 6 wheels, matte dark green, no weapons, no ammunition, no visible insignia, no readable markings.
- A red civilian 5-door compact station wagon / hatchback is BEHIND the truck, never in front of it.
- The red car has struck the LEFT rear corner of the military truck.
- The red car's FRONT-RIGHT corner is crushed into or very close to the truck's LEFT rear corner.
- The red car is diagonal: its nose points slightly right toward the truck, and its rear points slightly left into the left lane.
- From the camera behind the incident, the red car is slightly LEFT of the truck, the truck is ahead and to the RIGHT.
- The car remains in exactly this same position in every image. The truck remains in exactly this same position in every image.
- Light grey smoke comes from the red car's front engine compartment. No visible flames in images 1-3. Image 4 may show only light residual smoke.
- Traffic is stopped behind the incident in both lanes. The incident blocks the right lane and partly blocks the left lane.

CONTINUITY LOCK:
Use the same red car model, same dark green logistics truck, same damage, same smoke source, same lane positions, same bridge setting, same weather, same time of day and same road direction in all images. Do not swap left/right. Do not place the red car on the other side of the truck. Do not move the truck to the left lane. Do not rotate the scene 180 degrees. Do not change the red car into a sedan, SUV or different color. Do not change the military truck into an armored combat vehicle.

STYLE:
Photorealistic documentary emergency-service training photo, realistic perspective, natural Nordic daylight, no cinematic exaggeration, no dramatic movie lighting, no CGI look, no illustration, no toy-like vehicles.

SAFETY AND PRIVACY:
No gore, no blood, no dead body, no visible severe injuries, no identifiable faces, no readable license plates, no real emergency-service logos, no brand logos, no military insignia, no text overlays, no watermark.
```

## Negativ prompt

Bruk denne i negativt promptfelt hvis verktøyet har det:

```text
mirrored scene, reversed direction, car in front of truck, truck in left lane, red car on wrong side, different car, different truck, SUV, sedan, armored vehicle, tank, weapons, ammunition, explosion, fireball, large flames, war scene, terrorism, police chase, helicopter, gore, blood, dead body, severe injury, trapped person visible in distress, identifiable face, readable license plate, real police logo, real ambulance logo, real fire department logo, brand logo, military insignia, text, watermark, news graphics, cartoon, illustration, CGI, toy-like vehicles, unrealistic bridge geometry, wrong road direction, night, snow, heavy rain, panic crowd
```

## Kvalitetskontroll før bildet tas inn i dokumentene

Godkjenn bare bilder som svarer "ja" på disse punktene:

- Står militærlastebilen i høyre felt, foran bilen, nær høyre betongrekkverk?
- Står den røde bilen bak og litt til venstre for lastebilen?
- Er bilens front-høyre hjørne mot lastebilens venstre bakhjørne?
- Peker begge kjøretøy i samme kjøreretning, bort fra kamera?
- Kommer røyken fra motorrommet på den røde bilen?
- Er dette samme hendelse som de andre bildene, ikke en ny ulykke?

## Bilde 1 - Initial oversikt fra første melder

**Bruk i øvelsen:** Initialfase. Første melder har grunnlag for trippelvarsling og utalarmering.

**Ønsket læring:** posisjon, kjørefelt, røyk/brannindikasjon, militær kolonne som kontekst, trafikkstans.

```text
[PASTE THE FIXED SCENE BIBLE HERE]

IMAGE 1 OF 4 - INITIAL CALLER OVERVIEW:
The camera is inside or just outside a stopped civilian car in the traffic queue, approximately 35-50 meters behind the incident. Viewpoint is eye-level from behind the incident, looking forward along E18 Farrisbrua in the same direction as traffic.

Show the fixed incident layout clearly in the middle distance: the dark olive-green military logistics truck stopped in the RIGHT lane near the right bridge barrier, and the red 5-door compact station wagon / hatchback BEHIND it, slightly left of the truck, diagonal, with its front-right corner damaged against the truck's left rear corner. Light grey smoke rises from the red car's engine compartment.

No emergency vehicles have arrived yet. Several civilian vehicles are stopped behind the incident in both lanes with hazard lights. A few bystanders stand at a safe distance near the stopped vehicles, seen from behind or too far away to identify. The bridge, concrete barriers, water and forested Larvik/Farris landscape should be visible enough to establish location and scale.

The image should communicate uncertainty: possible fire, possible injuries, blocked traffic, and a military logistics truck as total-defence context, but not chaos.

Composition: horizontal 16:9, realistic documentary training photo, slightly elevated eye-level view, enough road and bridge context for a 110 operator to understand the scene.
```

## Bilde 2 - Nærmere observasjon av skadepunkt

**Bruk i øvelsen:** Supplerende bilde fra melder eller avklaring før første ressurs er fremme.

**Ønsket læring:** skille røyk fra åpen flamme, forstå personbil mot tyngre kjøretøy, avklare mulig diesel/lekkasje uten å overdrive farlig last.

```text
[PASTE THE FIXED SCENE BIBLE HERE]

IMAGE 2 OF 4 - CLOSER VIEW OF THE SAME COLLISION POINT:
Create a closer view from a safe roadside position behind-left of the incident, still looking forward in the same traffic direction. This is the exact same incident and exact same vehicle placement as Image 1. Do not mirror the scene and do not move either vehicle.

The dark olive-green military logistics truck remains stopped in the RIGHT lane near the right concrete bridge barrier, pointing away from the camera. The red 5-door compact station wagon / hatchback remains BEHIND and slightly LEFT of the truck, diagonal, with its front-right corner crushed into or very close to the truck's left rear corner. The rear of the red car still points slightly left into the left lane. Light grey smoke comes from the red car's front engine compartment. No visible flames.

Show moderate front-end damage on the red car, focused on the front-right corner. Show the truck as heavy but not destroyed. A small dark wet-looking patch near the front of the red car may suggest possible coolant or diesel on the asphalt, but it must be small and not dramatic.

Two people in neutral outdoor clothing or indistinct uniforms stand at a safe distance, backs turned or faces not visible. One person may be holding a phone. No graphic injury is visible. Traffic is stopped behind the incident.

Composition: horizontal 16:9, realistic normal/short-telephoto perspective from behind-left, detailed but not sensational.
```

## Bilde 3 - Trafikk og fremkommelighet for VTS

**Bruk i øvelsen:** Situasjonsbilde fra VTS/politi om kø, stenging og fremkommelighet.

**Ønsket læring:** trafikk, fremkommelighet, behov for stenging, trygg arbeidsplass og samvirke med politi/VTS.

```text
[PASTE THE FIXED SCENE BIBLE HERE]

IMAGE 3 OF 4 - WIDER TRAFFIC AND ACCESS VIEW:
Create a wider elevated traffic-management view from behind the same incident, as if seen from a roadside/VTS-style camera or elevated roadside position. The camera still looks forward in the same direction as traffic. This is the exact same incident as Image 1 and Image 2. Do not mirror the scene and do not move the vehicles.

Farther ahead, the dark olive-green military logistics truck is still stopped in the RIGHT lane near the right bridge barrier, pointing away from the camera. The red 5-door compact station wagon / hatchback is still BEHIND and slightly LEFT of the truck, diagonal, with its front-right corner at the truck's left rear corner. Light grey smoke comes from the red car's engine compartment.

Show the traffic consequence: stopped vehicles form a queue behind the incident in both lanes. The right lane is blocked by the truck and damaged red car. The left lane is partly blocked by the diagonal rear of the red car and stopped traffic, leaving limited or no passage for responding resources. The bridge over water, concrete barriers and forested terrain are visible.

No emergency response should dominate this image. If any blue-light presence is visible, it must be very distant and generic, with no readable logos. The purpose is queue length, blocked lanes and access limitations, not rescue work.

Composition: horizontal 16:9, elevated realistic overview, clean and readable scene geometry, same road direction and vehicle positions as the other images.
```

## Bilde 4 - Første ressurs fremme / overgang til driftsfase

**Bruk i øvelsen:** Vindusmelding, første ressurs fremme, overgang til driftsfase.

**Ønsket læring:** brann/røyk under kontroll/avklaring, første ressurs fremme, strukturert arbeid på stedet.

```text
[PASTE THE FIXED SCENE BIBLE HERE]

IMAGE 4 OF 4 - FIRST RESOURCES ARRIVED, SAME INCIDENT:
Create a realistic documentary training photo after first fire and ambulance resources have arrived. The fixed incident layout must remain identical to Images 1-3. Do not mirror the scene and do not move the damaged vehicles.

The dark olive-green military logistics truck remains stopped in the RIGHT lane near the right bridge barrier, pointing away from the camera. The red 5-door compact station wagon / hatchback remains BEHIND and slightly LEFT of the truck, diagonal, with its front-right corner at the truck's left rear corner. Only light residual grey smoke is visible from the red car's engine compartment. No visible flames.

A generic red fire engine without readable logos is parked behind the incident, aligned with the traffic direction, protecting the work area. It should not hide the red car and truck. A generic white ambulance without readable logos is positioned farther back in the queue or shoulder area. Responders in high-visibility protective gear work calmly around the driver's side/front area of the red car, seen from behind or with faces obscured. One firefighter may stand near the engine compartment with a hose line or extinguisher ready. Ambulance personnel may stage equipment nearby, but no patient close-up is visible.

The scene now looks controlled and structured: stopped traffic, protected work area, calm responders, no panic. The image should communicate that first resource is on scene and the incident is moving into a managed operational phase.

Composition: horizontal 16:9, slightly elevated viewpoint from behind-left, clear view of vehicle positions and emergency response layout, same road direction and same damaged vehicle placement as the previous images.
```

## Alternativ: generer alle fire som én serie

Hvis verktøyet kan lage en sammenhengende serie eller en 2x2 kontaktplate, bruk denne. Den kan gi bedre intern konsistens enn fire uavhengige genereringer. Del deretter opp bildet i fire separate 16:9-bilder.

```text
Create a consistent four-image photorealistic series for a Norwegian 110 emergency dispatch training scenario. The four images must show the same fictional incident on E18 Farrisbrua near Larvik, Norway, from different distances and moments in time, but with the exact same vehicle placement and damage in every image.

Use a 2x2 grid with four separate horizontal 16:9 documentary training photos. No text labels inside the images.

FIXED INCIDENT LAYOUT FOR ALL FOUR PANELS:
E18 Farrisbrua, modern motorway bridge over water and forested terrain, overcast Nordic daylight, damp asphalt, concrete bridge barriers. Camera direction is always from behind the incident, looking forward in the same direction as traffic toward Oslo/Sandefjord.

A dark olive-green military logistics truck is stopped in the RIGHT lane near the right concrete barrier, pointing away from the camera. A red civilian 5-door compact station wagon / hatchback is BEHIND and slightly LEFT of the truck, diagonal. The red car's front-right corner is crushed into the truck's left rear corner. The rear of the red car points slightly left into the left lane. Light grey smoke comes from the red car's front engine compartment. This exact geometry must not change in any panel. Do not mirror any panel. Do not place the red car on the opposite side. Do not move the truck to the left lane. Do not show the red car in front of the truck.

Panel 1: Initial caller overview, 35-50 meters behind, no emergency vehicles, stopped civilian traffic, uncertain but controlled scene.
Panel 2: Closer behind-left view of the same collision point, visible front-right damage on the red car, small possible fluid patch, no flames.
Panel 3: Wider elevated traffic/VTS view, queue behind the incident, right lane blocked and left lane partly blocked, limited access.
Panel 4: First fire and ambulance resources arrived, generic non-branded fire engine and ambulance behind the incident, calm responders, light residual smoke, controlled work area.

Style: photorealistic documentary emergency-service training photos, realistic perspective, muted Nordic colors, no cinematic exaggeration, no gore, no blood, no identifiable faces, no readable license plates, no real logos, no text overlays, no watermark.
```

## Videoprompt 1 - 15 sekunder mobilvideo til 110

Denne er oppdatert med samme scene-bibel og samme geometri som bildene.

```text
Create a 15-second photorealistic handheld vertical smartphone video from the perspective of a civilian caller filming for the Norwegian 110 emergency dispatch centre through a secure incident video-sharing link similar to IncidentShare.

Use the exact same fictional incident geometry as the still-image series:
E18 Farrisbrua near Larvik, Norway, modern motorway bridge over water and forested terrain, overcast Nordic daylight, damp asphalt. Camera starts behind stopped traffic and looks forward in the same direction as traffic toward Oslo/Sandefjord.

A dark olive-green military logistics truck is stopped in the RIGHT lane near the right concrete bridge barrier, pointing away from the camera. A red civilian 5-door compact station wagon / hatchback is BEHIND and slightly LEFT of the truck, diagonal, with its front-right corner crushed into the truck's left rear corner. The red car's rear points slightly left into the left lane. Light grey smoke comes from the red car's front engine compartment. Do not mirror this geometry. Do not move the vehicles. Do not place the car in front of the truck.

Camera style:
Handheld 9:16 smartphone video, natural walking movement, slight hand shake, realistic phone autofocus and exposure changes. The camera operator walks slowly and carefully from approximately 50 meters behind the incident to approximately 20 meters behind it, staying behind stopped vehicles and outside the danger area.

Timeline:
0-3 seconds: Starts behind stopped civilian vehicles on the bridge. Traffic queue and blocked lanes are visible. Incident is ahead with faint smoke.
3-8 seconds: Camera moves slowly closer. The red car behind-left of the green military truck becomes clearer. Smoke from the car's front engine compartment is visible.
8-12 seconds: Camera pauses and pans slightly from queue to damaged vehicles, showing lane blockage, vehicle positions and smoke.
12-15 seconds: Final steady view from safe distance, showing red car, military truck, stopped traffic, light smoke and bridge environment.

No emergency vehicles have arrived yet. No gore, no blood, no visible severe injuries, no identifiable faces, no readable plates, no real logos, no weapons, no ammunition, no text, no watermark.
```

## Videoprompt 2 - 15 sekunder etter at første ressurser er fremme

```text
Create a 15-second photorealistic handheld vertical smartphone video from a civilian observer filming from a safe distance for the Norwegian 110 emergency dispatch centre through a secure incident video-sharing link similar to IncidentShare.

Use the exact same fixed incident geometry as the still-image series:
E18 Farrisbrua near Larvik, Norway, modern motorway bridge over water and forested terrain, overcast Nordic daylight, damp asphalt. Camera remains behind or behind-left of the incident, looking forward in the same direction as traffic.

A dark olive-green military logistics truck remains stopped in the RIGHT lane near the right concrete bridge barrier, pointing away from the camera. A red civilian 5-door compact station wagon / hatchback remains BEHIND and slightly LEFT of the truck, diagonal, with its front-right corner at the truck's left rear corner. Only light residual grey smoke is visible from the red car's engine compartment. Do not mirror the geometry. Do not move the vehicles.

Situation:
Fire and ambulance have arrived. A generic red fire engine without readable logos is parked behind the incident to protect the work area. A generic white ambulance without readable logos is positioned farther back. Firefighters in high-visibility protective clothing work calmly around the red car, preparing or carrying out controlled extrication/driver access. Ambulance personnel are nearby with stretcher or medical bag. The driver/patient is not clearly visible and no close-up injury is shown.

Camera style:
Handheld 9:16 smartphone video from approximately 40-70 meters behind the incident, behind stopped traffic or on a safe shoulder position. Slight natural hand shake, realistic phone autofocus and exposure changes. The camera operator does not enter the work area.

Timeline:
0-3 seconds: Starts behind the queue, showing fire engine, ambulance and stopped traffic in the distance.
3-7 seconds: Slowly zooms or steps slightly forward while staying safe. Red car, green military truck and responders become clearer.
7-11 seconds: Holds steady and pans slightly across firefighters working near the driver's side/front area and ambulance personnel staged nearby.
11-15 seconds: Settles on a wider overview of vehicle positions, blocked lanes, emergency resources, light residual smoke and calm controlled rescue work.

No gore, no blood, no dead bodies, no visible severe injuries, no identifiable faces, no readable plates, no real logos, no weapons, no ammunition, no text, no watermark.
```

## Filnavn ved eksport

Når bildene er valgt og skal legges inn i øvelsespakken, bruk disse filnavnene:

- `bilde_1_farrisbrua_foto.png`
- `bilde_2_farrisbrua_foto.png`
- `bilde_3_farrisbrua_foto.png`
- `bilde_4_farrisbrua_foto.png`

Når nye bilder er valgt, erstattes de gjeldende filene i `08_bildepakke/`:

- `bilde_1_farrisbrua.png`
- `bilde_2_farrisbrua.png`
- `bilde_3_farrisbrua.png`
- `bilde_4_farrisbrua.png`
