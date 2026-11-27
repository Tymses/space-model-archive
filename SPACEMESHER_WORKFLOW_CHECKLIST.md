# SPACEMESHER – verpflichtende Pre-flight-/Post-flight-Checkliste

Diese Checkliste ergänzt `PROJECT_HANDBOOK.md`. Sie gilt vor **jedem** projektbezogenen Antwortschritt sowie vor und nach jeder Änderung an SPACEMESHER. Sie ist keine Behauptung, dass ein Werkzeug das tatsächliche Lesen eines Dokuments vollständig nachweisen kann.

## Pre-flight: vor jeder Projektantwort oder Änderung

- [ ] Das aktuelle `PROJECT_HANDBOOK.md` vollständig gesucht und gelesen.
- [ ] Alle zugänglichen relevanten Dokumentationsspeicherorte gesucht und gelesen, einschließlich eines separaten BOGY-Projekttagebuchs, falls zugänglich.
- [ ] Nicht zugängliche Speicherorte mit Ort/Grund im Handbuch bzw. im PR festgehalten; keine Synchronisierung behauptet.
- [ ] Tatsächlichen GitHub-`main`-Kopf, jüngste Commits, offene PRs sowie relevante Backup- und Feature-Branches geprüft; lokale Tracking-Referenzen allein nicht als Nachweis verwendet.
- [ ] Arbeitsbaum, Zielbranch, betroffene Dateien, Tests und Rückfallpfad geprüft.
- [ ] Von dem inspizierten `main`-Commit einen neuen, nicht überschriebenen Backup-Branch angelegt.
- [ ] Nur den freigegebenen, kleinsten Änderungsumfang geplant.

## Post-flight: nach jeder genehmigten Änderung

- [ ] Enddiff und relevante Tests geprüft; nicht ausgeführte Prüfungen samt Grund dokumentiert.
- [ ] `PROJECT_HANDBOOK.md` mit Commit/Branch, Dateien, Tests, Risiken, offenem Stand und Rollback-Referenz aktualisiert.
- [ ] Alle anderen zugänglichen Dokumentationsorte aktualisiert und verifiziert.
- [ ] Für jedes nicht zugängliche Tagebuch bzw. jeden nicht aktualisierbaren Ort den genauen Status dokumentiert; keine Synchronisierung behauptet.
- [ ] PR-Vorlage vollständig bestätigt und der verpflichtende CI-Check ist grün.
- [ ] Die Branch-Schutzregel für `main` verlangt den Check **Enforce project workflow**. Ohne diesen GitHub-Administrator-Schritt signalisiert der Check einen Verstoß, kann einen Merge aber nicht selbst blockieren.

## Technische Grenze

Der Workflow `.github/workflows/enforce-project-workflow.yml` prüft bei jeder Pull Request nach `main` maschinell, dass die vorgegebene PR-Bestätigung vollständig ist und `PROJECT_HANDBOOK.md` im selben PR geändert wurde. Das ist eine wirksame CI-Sperre gegen unvollständige PRs, sofern sie im Branch-Schutz als erforderlicher Statuscheck konfiguriert ist. Er kann weder das tatsächliche Lesen noch Änderungen außerhalb von GitHub technisch beweisen.