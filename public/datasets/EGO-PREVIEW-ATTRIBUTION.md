# Egocentric dataset preview attribution

These files are third-party public dataset examples. They are not CosmicBrain data, robot policy results, or evidence of a partnership. Publisher assets were retrieved on October 2, 2026. Format conversions and frame extraction are noted below; no AI edits or semantic alterations were made.

## HoloAssist

- Local files: `holoassist-modalities.mp4` (600 x 358, 5 seconds, 2,560,028 bytes) and `holoassist-modalities.png` (first-frame poster, 600 x 357).
- Original source: https://holoassist.github.io/images/samples/nintendo_all_modal.gif
- Dataset and rights source: https://holoassist.github.io/
- Description: Human egocentric Nintendo Switch manipulation example showing RGB, depth, hand tracking, eye gaze and IMU data.
- Attribution: HoloAssist, Xin Wang, Taein Kwon and collaborators, Microsoft Research and collaborating institutions, ICCV 2023.
- License: Community Data License Agreement, Permissive, Version 2.0. The publisher links this license for the dataset. The complete text is included in `CDLA-Permissive-2.0.txt`; make that text available with the shared preview.
- Official license: https://cdla.dev/permissive-2-0/
- Official plain text: https://raw.githubusercontent.com/Community-Data-License-Agreements/Releases/main/CDLA-Permissive-2.0.txt
- Paper: https://openaccess.thecvf.com/content/ICCV2023/html/Wang_HoloAssist_an_Egocentric_Human_Interaction_Dataset_for_Interactive_AI_Assistants_ICCV_2023_paper.html
- Changes: GIF transcoded to H.264 MP4, with one black row of padding added at the bottom for even-height video encoding. Poster is the original first frame saved as PNG. Source GIF SHA-256: `1b97c623c164f36156eb091e38cfac7416901403ea7f227ff102b95b17b6a865`.

## HO-Cap

- Local files: `hocap-pick-and-place.mp4` (1920 x 1080, 60.59 seconds, 8,454,876 bytes) and `hocap-pick-and-place.png` (poster extracted at 2 seconds).
- Original source: https://irvlutd.github.io/HOCap/static/videos/demo_video_task1_small.mp4
- Dataset and rights source: https://irvlutd.github.io/HOCap/
- Description: Official human pick-and-place dataset demo. HO-Cap captures HoloLens egocentric video with multiple RGB-D views and annotations for hands and objects.
- Attribution: HO-Cap, Jikai Wang, Qifan Zhang, Yu-Wei Chao, Bowen Wen, Xiaohu Guo and Yu Xiang; University of Texas at Dallas and NVIDIA; NeurIPS 2025.
- License: Creative Commons Attribution 4.0 International (CC BY 4.0), expressly stated on the official dataset page. Retain attribution and license link with the preview; original asset content is unchanged.
- Official license: https://creativecommons.org/licenses/by/4.0/
- Paper: https://arxiv.org/abs/2406.06843
- Changes: Original MP4 is unchanged. The poster is a PNG frame extracted at 2 seconds to avoid the intro fade. Original MP4 SHA-256: `1ed04910b3bd048dd3bd94781f6f6f16bcff80ab6ab5a7e8f120cdff188dca5b`.

Display these as human egocentric demonstrations, separately from robot teleoperation data. Use user-controlled video with its provided poster and `preload="none"` so the page does not eagerly fetch all media.

## EgoSuite / EgoDemo

- Official preview source: https://egosuite100k.lightwheel.ai/
- Publisher-hosted video: https://lw-cdn.lightwheel.net/build/egosuite-open100k/assets/feishu-20260826-103400-B0jsOkHY.mp4
- Matching publisher-hosted poster: https://lw-cdn.lightwheel.net/build/egosuite-open100k/assets/feishu-20260826-103400-Bej6_GzJ.jpg
- Attribution: Lightwheel, official EgoSuite project preview, hosted by the publisher.
- Description: Real first-person human demonstration arranging decorative objects near a window. The poster and frames at five and 35 seconds were visually inspected; this clip shows camera imagery without a pose overlay. The native player was verified in the website.
- Media access: Public official project showcase. No explicit open media reuse license was found; use the publisher's URLs without rehosting, cropping or transcoding. The preview is not asserted to be a particular episode in the gated 50-hour EgoDemo sample.
- Dataset terms and access: https://huggingface.co/datasets/LightwheelAI/EgoDemo . This is separate from access to the public project preview. No gated terms were accepted and no gated episodes were accessed.
- Changes: None. Neither video nor poster is copied into the published assets.

## EgoVerse

- Official source and credit: EgoVerse consortium, https://egoverse.ai/ . Official human data preview hosted by the publisher.
- Publisher-hosted video: https://egoverse.ai/assets/videos/dense-language-overlay.mp4
- Description: A real human first-person tray-carrying demonstration, with dense sub-action annotations, 3D hand trajectories and scene reconstruction. The first frame was visually inspected and contains human hands and cups on a tray. This is not a robot teleoperation episode.
- Technical details: 1920 x 1080, 35.05 seconds. The public endpoint supports range requests. No official poster is specified; use metadata preloading to render the original first frame.
- Media access: Public official project visualization. No blanket redistribution license was verified for this website video. Use the stable publisher-hosted source without copying or editing the video or an extracted poster into public assets. Do not label this preview Apache 2.0 or infer media rights from the code license.
- Dataset terms: https://partners.mecka.ai/egoverse . Individual dataset episode terms remain separate from the public project preview. No gated terms were accepted, no credentials were used and no signed episode URL is published.
- Changes: None. The publisher-hosted clip is displayed unchanged.

## CaptainCook4D

- Official source: https://captaincook4d.github.io/captain-cook/static/videos/error_categories/technique_error_1.mp4
- Attribution: CaptainCook4D, Rohith Peddi, Shivvrat Arya and collaborators, University of Texas at Dallas and University of Florida, NeurIPS 2024. Project: https://captaincook4d.github.io/captain-cook/ .
- Rights: Apache License 2.0, explicitly stated for the data on the official project and https://github.com/CaptainCook4D/CaptainCook4D#license--consent . Complete license text is included in `Apache-2.0.txt`.
- Local assets: `captaincook-spillage.mp4`, 640 x 360, 5 seconds, H.264, silent, 466,938 bytes; `captaincook-spillage.jpg`, poster extracted at 2 seconds, 46,032 bytes.
- Description: Human egocentric mixing of corn, with visible spillage on a countertop. The publisher identifies the last three panels of its five-panel montage as technique errors; this preview uses the third panel.
- Changes: Crop `640:360:1280:0` from the 3200 x 360 comparison. Audio removed; video reencoded with H.264 CRF 22 and faststart. No speed changes, AI edits or invented overlays. Source, credit and changes are also embedded in the MP4 metadata.
- Original SHA-256: `01dbcc0c543e5ab23a30fa4a70d1586233a72ab59cd72309846d32104c1665e4`. Preview SHA-256: `f3848c940788ffd6705c3de15b6215283357772902c4fa3cfe011f8523151889`. Poster SHA-256: `cfa7b592cf679064f333b800d06a2aa0273287e4aec89d4bab91fbf92be6434e`.
