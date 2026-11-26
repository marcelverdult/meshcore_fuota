<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="logo/logo-dark.png">
    <img src="logo/logo.png" width="420" alt="MeshCore FUOTA: Firmware Update Over the Air">
  </picture>
</p>

# MeshCore FUOTA

**Deutsch:** Firmware-Updates über LoRa für MeshCore-Repeater. Dieses Repository enthält vorerst die Beschreibung
des Entwurfs zur Prüfung und die Anleitung zum Installieren, auf Deutsch und Englisch:
**https://marcelverdult.github.io/meshcore_fuota/**

Stand: Basis MeshCore 1.18.0, im Testaufbau gemessen mit FakeTecs (nRF52840, S140 6.1.1), einem
SenseCAP P1 (S140 7.3.0) und einem RAK4631. Seit dem 25. November 2026 ist v1.18.0-fuota5 das erste Release. Neue Knoten
bekommen das Seed-Paket 1.18. Die Version v1.17.1-fuota1 bleibt als Testversion, um das Update per Funk von 1.17.1 auf
1.18.0 zu testen. Eine neue MeshCore-Version bekommt zuerst ein Basispaket zum Testen und, wenn sie stabil ist, das
Seed-Paket. Verlauf: Alpha 1 begann am 11. November 2026 (Pakete am 16. November 2026 zurückgezogen), Alpha 2 am
18. November 2026. Nichts davon ist in MeshCore eingereicht.
Die Veröffentlichung des Quellcodes ist noch offen. Wir suchen Denkfehler: Schick Rückmeldungen als Issue.

**English:** Firmware updates over LoRa for MeshCore repeaters. For now this repository holds the description of the
design for review and the install guide, in German and English:
**https://marcelverdult.github.io/meshcore_fuota/**

Status: based on MeshCore 1.18.0, measured on the bench with FakeTecs (nRF52840, S140 6.1.1), one
SenseCAP P1 (S140 7.3.0) and one RAK4631. Since 25 November 2026, v1.18.0-fuota5 has been the first release. New nodes
get the seed package 1.18. Version v1.17.1-fuota1 stays as a test version, to test the update over the air from 1.17.1 to
1.18.0. A new MeshCore version gets a base package for testing first and, once it is stable, the seed package. History:
alpha 1 began on 11 November 2026 (packages withdrawn on 16 November 2026), alpha 2 on 18 November 2026. Nothing of it has
been submitted to MeshCore. Publication of the source code is still open. We are looking for flaws in the reasoning: send feedback as an issue.

**Lizenz / License:** Text und Abbildungen / text and figures: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/),
siehe / see `LICENSE`. Namensnennung / attribution: „MeshCore FUOTA, github.com/marcelverdult/meshcore_fuota“.
Ausgenommen ist das Logo (Ordner `logo/`): Es steht nicht unter CC BY 4.0. / The logo (folder `logo/`) is excluded: it is
not licensed under CC BY 4.0.
