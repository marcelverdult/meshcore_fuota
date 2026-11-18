<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="logo/logo-dark.png">
    <img src="logo/logo.png" width="420" alt="MeshCore FUOTA: Firmware Update Over the Air">
  </picture>
</p>

# MeshCore FUOTA

**Deutsch:** Firmware-Updates über LoRa für MeshCore-Repeater. Dieses Repository enthält vorerst die Beschreibung
des Entwurfs zur Prüfung und die Anleitung für den Alpha-Test, auf Deutsch und Englisch:
**https://marcelverdult.github.io/meshcore_fuota/**

Stand: Proof of Concept, Basis MeshCore 1.18.0, im Testaufbau gemessen mit FakeTecs (nRF52840, S140 6.1.1), einem
SenseCAP P1 (S140 7.3.0) und einem RAK4631. Der erste Alpha-Test begann am 11. November 2026 mit 1.17.1-b2 und
1.18.0-b3. Wir haben diese Pakete am 16. November 2026 zurückgezogen. Seit dem 18. November 2026 läuft ein zweiter Alpha-Test mit
v1.17.1-fuota1. Sein Release liegt in diesem Repository. Eine allgemeine Freigabe gibt es nicht. Nichts davon ist
in MeshCore eingereicht.
Der Quellcode folgt später. Wir suchen Denkfehler: Schick Rückmeldungen als Issue.

**English:** Firmware updates over LoRa for MeshCore repeaters. For now this repository holds the description of the
design for review and the guide for the alpha test, in German and English:
**https://marcelverdult.github.io/meshcore_fuota/**

Status: proof of concept based on MeshCore 1.18.0, measured on the bench with FakeTecs (nRF52840, S140 6.1.1), one
SenseCAP P1 (S140 7.3.0) and one RAK4631. The first alpha test began on 11 November 2026 with 1.17.1-b2 and 1.18.0-b3. We withdrew those packages on
16 November 2026. A second alpha test with v1.17.1-fuota1 has been running since 18 November 2026. Its release is in this
repository. There is no general release. Nothing of it has been submitted to MeshCore. The source code follows later. We are looking for flaws in the reasoning: send feedback as an issue.

**Lizenz / License:** Text und Abbildungen / text and figures: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/),
siehe / see `LICENSE`. Namensnennung / attribution: „MeshCore FUOTA, github.com/marcelverdult/meshcore_fuota“.
Ausgenommen ist das Logo (Ordner `logo/`): Es steht nicht unter CC BY 4.0. / The logo (folder `logo/`) is excluded: it is
not licensed under CC BY 4.0.
