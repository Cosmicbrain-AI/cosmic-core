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
