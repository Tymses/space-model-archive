# SPACEMESHER – Redaktionsleitfaden und Freigabeprozess

Stand: 27. November 2026

Dieses Dokument ist die verbindliche Arbeitsanweisung für die redaktionelle Aufnahme, Prüfung und Freigabe von Modellen. Es behauptet nicht, dass alle vorhandenen Datensätze bereits geprüft sind.

## Zielzustand

Jeder veröffentlichte Eintrag ist fachlich richtig kategorisiert, verständlich beschrieben, mit einer nachvollziehbaren Originalquelle verknüpft und hinsichtlich Dateiformat, Lizenz und Maßstab transparent. Aussagen wie „verified“ dürfen nur verwendet werden, wenn sie durch die jeweils passende Quelle belegt sind.

## 1. Kategorien

Jeder Datensatz erhält genau eine primäre Kategorie. Weitere passende Sammlungen werden als Cross-Listing angezeigt, ohne den Datensatz zu duplizieren.

| Kategorie | Gehört hinein | Gehört nicht hinein |
|---|---|---|
| Spacecraft | Satelliten, Sonden, Orbiter, Lander, Rover, Raumstationen und Missionshardware | Gelände- und Oberflächenmodelle |
| Planetary features | Krater, Berge, Täler, Vulkane, Landeplätze und andere konkrete Oberflächenformen | Satelliten oder Raumfahrzeuge |
| Asteroids, comets & meteorites | Asteroiden-/Kometenformen, Zwergplaneten und gescannte Meteoritenproben | Allgemeine Planetentopografie |
| Moons | Natürliche Satelliten als Himmelskörper und globale Formmodelle | Lokale Krater- und Geländeausschnitte |
| Terrain data & printable terrain | Geländemeshes, Höhenmodelle, DEMs, Höhenkarten und Generatoren für druckbares Gelände | Raumfahrzeuge und globale Körpermodelle |

**Fachregel:** ICESat, ICESat-2 und Jason-2 sind Erdbeobachtungssatelliten. Ihre Modelle gehören in Spacecraft, nicht in Planetary features. Der wissenschaftliche Zweck einer Mission ändert nicht die Art der dargestellten Geometrie.

## 2. Primärkategorie und Cross-Listing

1. Prüfe, was die Geometrie tatsächlich darstellt – nicht nur Missionsname, Ordner oder Datenquelle.
2. Wähle die fachlich treffendste Primärkategorie.
3. Cross-liste nur, wenn ein echter Mehrwert für eine zweite Sammlung besteht.
4. Zeige zusätzliche Sammlungen sichtbar an, z. B. „Also in: Terrain data & printable terrain“.
5. Verwende stabile IDs und gemeinsame Datensätze statt doppelter Kopien.

Beispiele: Gale-Crater-STL primär Planetary features und zusätzlich Terrain; globales Mars-DEM primär Terrain; ICESat-2-Satellit primär Spacecraft; globales Phobos-Formmodell primär Moons.

## 3. Terrain-Sammlung umbenennen

„Height maps“ ist zu eng, weil dort auch fertige STL-Geländemodelle und Generatoren liegen. Zielname: **Terrain data & printable terrain**.

Vor der UI-Änderung alle Titel, Untertitel, Navigation, Filter, Suchtexte, Hilfetexte, README und Tests prüfen. Interne IDs und Dateipfade nicht unnötig umbenennen. Klar unterscheiden zwischen Rohdaten (DEM/Height map), fertigem Mesh (STL/OBJ) und Generator.

Empfohlener Untertitel: **Elevation data, printable terrain models and tools to create 3D terrain.**

## 4. Quellen und Links

- „Source / Original source“ führt zur konkreten Originalseite des Herausgebers, nicht automatisch zum Download-Mirror.
- GitHub-Ordner und Raw-Dateien sind Repository-/Downloadziele, nicht die redaktionelle Originalquelle.
- Wenn keine individuelle NASA-Detailseite auffindbar ist, darf die offizielle NASA-3D-Resources-Katalogseite als allgemeine Quelle dienen – klar als Katalog gekennzeichnet.
- Missionsseiten nur verwenden, wenn sie tatsächlich zur Mission des Modells gehören.
- URLs nicht aus Slugs erraten. Ungeklärte Quellen als „noch zu prüfen“ kennzeichnen.
- Download-Link und Quellen-Link getrennt halten, wenn der Download gespiegelt ist.

Prüfschritte: stabile ID finden; Datei-URL und Quellseite getrennt prüfen; Zielseite inhaltlich abgleichen; bestätigte URL in einem Regressionstest festschreiben. HTTP-Erreichbarkeit allein beweist keine inhaltliche Richtigkeit.

## 5. Maßstab und Größenverständlichkeit

- Geometriegröße und reale Referenzgröße getrennt anzeigen.
- Einen Maßstab wie 1:0.965 nicht ohne Erklärung zeigen.
- Verständliche Ergänzung: **Model is 3.6% larger than the real-world reference**.
- Bei Maßstäben unter 1 erklären, dass das Modell gegenüber der Referenz vergrößert ist.
- Nur belegte Maße verwenden; mittlere Durchmesser nicht stillschweigend als längste Achse ausgeben.
- Quellenqualität und Messgenauigkeit getrennt darstellen.

## 6. Beschreibung und Einsteiger-Workflow

Beschreibungen müssen zum konkreten Modell passen. Prüfen: Objektidentität, Modelltyp, Format, Besonderheiten (z. B. vertikale Überhöhung), Unsicherheiten und Lizenzhinweise. Keine allgemeine Katalogbeschreibung als konkrete Modellbeschreibung ausgeben. Druckbarkeit oder Reparaturfreiheit niemals garantieren.

Der Detailseiten-Workflow soll kurz bleiben:
1. Modell und Originalquelle prüfen.
2. Datei herunterladen oder im 3D-Preview ansehen.
3. Maßstab und Bauraum im Scaling-Workspace prüfen.
4. Datei im eigenen Slicer kontrollieren und dort Druckeinstellungen und Supports festlegen.

SPACEMESHER ist kein Slicer. Eine positive Bauraumprüfung garantiert keine Druckbarkeit.

## 7. Redaktionsablauf pro Datensatz

1. **Identität:** Name, Objekt, Mission und Variante verifizieren.
2. **Kategorie:** Primärkategorie nach dargestellter Geometrie wählen; Cross-Listing begründen.
3. **Quelle:** Originalseite und Downloadziel getrennt verifizieren.
4. **Datei:** Format, Größe und Verfügbarkeit prüfen; Archive nicht als einzelne Meshes ausgeben.
5. **Lizenz:** Herausgeberangabe und Attribution dokumentieren.
6. **Maße:** reale Referenzmaße mit Quelle erfassen oder ausdrücklich unbekannt lassen.
7. **Beschreibung:** sachlich, objektbezogen und einsteigerfreundlich formulieren.
8. **Darstellung:** Preview, Titel, Cross-Listing und Links prüfen.
9. **Freigabe:** Regressionstests ausführen und Änderung protokollieren.

## 8. Freigabe-Checkliste

- [ ] Objekt und Modellvariante stimmen.
- [ ] Primärkategorie ist korrekt.
- [ ] Cross-Listings sind begründet und sichtbar.
- [ ] Originalquelle führt nicht versehentlich zu einem Repository-Mirror.
- [ ] Download-Link führt zur richtigen Datei bzw. zum richtigen Paket.
- [ ] Format und Dateigröße sind geprüft.
- [ ] Lizenz und Attribution sind quellenbasiert.
- [ ] Maße sind belegt oder als unbekannt markiert.
- [ ] Maßstabsdarstellung ist verständlich.
- [ ] Beschreibung passt zum konkreten Modell.
- [ ] Keine unbelegte Aussage zur Druckbarkeit.
- [ ] Regressionstests und Katalog-Audit sind erfolgreich.

## 9. Umsetzungsreihenfolge

**P0 – fachliche Fehler und Quellen:** Satelliten umsortieren; NASA-Links korrigieren; fehlende individuelle NASA-Seiten auf den offiziellen NASA-Katalog verweisen.

**P1 – Kategorien: umgesetzt.** Die öffentliche Sammlung heißt „Terrain data & printable terrain“; der interne Routenschlüssel `height-maps` und bestehende Modell-IDs bleiben stabil. NASA-Terrain-Cross-Listings werden auf Karten und Detailseiten sichtbar ausgewiesen.

**P2 – Maßstab und Texte: umgesetzt.** Die Maßstabsanzeige benennt die prozentuale Abweichung des Quelldatei-Modells von der realen Referenz. Der Einsteigerablauf beginnt beim Finden eines Archiveintrags und endet mit der Prüfung im eigenen Slicer.

**P3 – Qualitätssicherung: erweitert.** Diese Änderung ergänzt Regressionstests für Terrain-Namensgebung, Cross-Listing-Sichtbarkeit, Maßstabsformulierung und Einsteiger-Workflow. Pull-Request-CI wird so konfiguriert, dass auch reine UI-/Teständerungen die Node-Regressionssuite auslösen. Externe Erreichbarkeit bleibt von inhaltlicher Richtigkeit getrennt.

## 10. Definition of Done

Die redaktionelle Überarbeitung ist abgeschlossen, wenn keine Satelliten als Planetary features einsortiert sind, NASA-Quellen auf NASA-Seiten statt GitHub-Folder zeigen, die Terrain-Sammlung eindeutig benannt ist, Cross-Listings sichtbar sind, Maßstabsabweichungen verständlich sind, jede Detailseite einen realistischen Einsteiger-Workflow enthält und alle redaktionellen Tests bestehen.
