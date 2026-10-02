export type PublicDataset = {
  id: string;
  name: string;
  publisher: string;
  kind: "egocentric" | "teleoperation";
  summary: string;
  scale: string;
  scaleNote: string;
  modalities: string[];
  tasks: string[];
  sourceUrl: string;
  exploreUrl: string;
  licenseLabel: string;
  licenseUrl: string;
  licenseNote: string;
  accessLabel: string;
  preview?: {
    src: string;
    poster?: string;
    alt: string;
    credit: string;
    sourceUrl: string;
    licenseUrl: string;
  };
};

/** Community datasets published by third parties, separate from CosmicBrain inventory. */
export const publicDatasets: PublicDataset[] = [
  {
    id: "egoverse",
    name: "EgoVerse",
    publisher: "EgoVerse consortium",
    kind: "egocentric",
    summary:
      "Human demonstrations from homes, workshops and labs, curated for learning how human behavior transfers to robots.",
    scale: "Living release",
    scaleNote:
      "Continuously expanded by the consortium. Project and explorer snapshots report different totals.",
    modalities: ["Egocentric video", "Camera poses", "Head tracking", "Language annotations"],
    tasks: ["Object placement", "Grocery packing", "Household manipulation"],
    sourceUrl: "https://egoverse.ai/",
    exploreUrl: "https://partners.mecka.ai/egoverse",
    licenseLabel: "Episode-specific licenses",
    licenseUrl: "https://partners.mecka.ai/egoverse",
    licenseNote:
      "Check each episode's license before reuse. The repository's MIT code license does not grant blanket dataset rights.",
    accessLabel: "Publisher explorer",
  },
  {
    id: "egodemo",
    name: "EgoSuite / EgoDemo",
    publisher: "Lightwheel",
    kind: "egocentric",
    summary:
      "A 50-hour sample of EgoSuite human activity, spanning its annotated subsets and two raw-video variants.",
    scale: "50-hour sample",
    scaleNote:
      "EgoSuite's launch report lists 10,000 hours released and 100,000 hours planned; EgoDemo is the sample.",
    modalities: [
      "Head-view video",
      "Wrist video (subset)",
      "Hand pose",
      "Body pose (subset)",
      "Semantic annotations",
    ],
    tasks: ["Cooking", "Tool use", "Packing", "Human-to-robot transfer"],
    sourceUrl: "https://huggingface.co/blog/LightwheelAI/egosuite-open100k",
    exploreUrl: "https://huggingface.co/datasets/LightwheelAI/EgoDemo",
    licenseLabel: "commercial-training-no-resale-v1.0",
    licenseUrl: "https://huggingface.co/datasets/LightwheelAI/EgoDemo",
    licenseNote:
      "Custom terms support commercial training and restrict resale. Training rights do not establish permission to republish previews.",
    accessLabel: "Gated · accept publisher terms",
  },
  {
    id: "holoassist",
    name: "HoloAssist",
    publisher: "HoloAssist research team",
    kind: "egocentric",
    summary:
      "Collaborative physical tasks with an instructor verbally guiding a performer wearing a mixed-reality headset.",
    scale: "169 hours",
    scaleNote: "The project page reports 169 hours; the ICCV 2023 paper reports 166 hours.",
    modalities: [
      "RGB",
      "Depth",
      "Hand pose",
      "Head pose",
      "Eye gaze",
      "IMU",
      "Audio",
      "Action / conversation annotations",
    ],
    tasks: ["Mistake detection", "Intervention prediction", "Hand forecasting"],
    sourceUrl: "https://holoassist.github.io/",
    exploreUrl: "https://holoassist.github.io/#download",
    licenseLabel: "CDLA–Permissive–2.0",
    licenseUrl: "https://cdla.dev/permissive-2-0/",
    licenseNote:
      "The publisher releases the dataset under CDLA–Permissive–2.0. Include the agreement text when sharing data.",
    accessLabel: "Publisher downloads",
    preview: {
      src: "/datasets/holoassist-modalities.mp4",
      poster: "/datasets/holoassist-modalities.png",
      alt: "HoloAssist human Nintendo Switch task showing RGB, depth, hand pose, gaze and IMU observations.",
      credit:
        "HoloAssist · Wang, Kwon & collaborators. GIF converted to video; poster frame extracted.",
      sourceUrl: "https://holoassist.github.io/images/samples/nintendo_all_modal.gif",
      licenseUrl: "/datasets/CDLA-Permissive-2.0.txt",
    },
  },
  {
    id: "captaincook4d",
    name: "CaptainCook4D",
    publisher: "CaptainCook4D research team",
    kind: "egocentric",
    summary:
      "Kitchen recipe recordings that capture correct procedures and deliberate errors, with step and action annotations.",
    scale: "384 recordings",
    scaleNote: "94.5 hours, with 5.3K step annotations and 10K fine-grained action annotations.",
    modalities: ["Egocentric video", "Step annotations", "Action annotations", "Error labels"],
    tasks: ["Procedural error recognition", "Step localization", "Procedure learning"],
    sourceUrl: "https://github.com/CaptainCook4D/CaptainCook4D",
    exploreUrl: "https://github.com/CaptainCook4D/CaptainCook4D#download-data",
    licenseLabel: "Apache 2.0 · dataset",
    licenseUrl: "https://github.com/CaptainCook4D/CaptainCook4D#license--consent",
    licenseNote:
      "The publisher explicitly licenses the dataset under Apache 2.0 and documents participant consent.",
    accessLabel: "Publisher downloader",
  },
  {
    id: "droid",
    name: "DROID",
    publisher: "DROID Dataset Team",
    kind: "teleoperation",
    summary:
      "Franka Panda manipulation demonstrations collected across varied real-world scenes using a shared robot platform.",
    scale: "350 hours",
    scaleNote:
      "76K demonstration trajectories across 564 scenes and 86 tasks, as reported by the project.",
    modalities: [
      "Exterior / wrist cameras",
      "Depth",
      "Camera calibration",
      "Robot actions / state",
      "Language instructions",
    ],
    tasks: ["Object manipulation", "Policy learning", "Scene generalization"],
    sourceUrl: "https://droid-dataset.github.io/",
    exploreUrl: "https://droid-dataset.github.io/",
    licenseLabel: "CC BY 4.0 · data",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
    licenseNote:
      "The official paper releases the full dataset under CC BY 4.0. Attribute the dataset and indicate changes when sharing.",
    accessLabel: "Publisher visualizer / downloads",
    preview: {
      src: "/datasets/droid-kitchen.mp4",
      poster: "/datasets/droid-kitchen.jpg",
      alt: "Official DROID montage of Franka robot demonstrations in varied kitchen scenes.",
      credit: "DROID Dataset Team · 2024. Original video; poster frame extracted.",
      sourceUrl: "https://droid-dataset.github.io/",
      licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
    },
  },
  {
    id: "bridgedata-v2",
    name: "BridgeData V2",
    publisher: "BridgeData V2 research team",
    kind: "teleoperation",
    summary:
      "WidowX manipulation trajectories for learning tasks conditioned on natural-language instructions or goal images.",
    scale: "60,096 trajectories",
    scaleNote:
      "50,365 teleoperated demonstrations plus 9,731 scripted rollouts, collected in 24 environments.",
    modalities: ["RGB", "Depth (subset)", "Robot actions / state", "Language instructions"],
    tasks: ["Pick and place", "Doors and drawers", "Cloth folding", "Goal-conditioned learning"],
    sourceUrl: "https://rail-berkeley.github.io/bridgedata/",
    exploreUrl: "https://rail-berkeley.github.io/bridgedata/",
    licenseLabel: "CC BY 4.0 · data",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
    licenseNote:
      "The publisher provides all data under CC BY 4.0. Attribute the dataset and indicate changes when sharing.",
    accessLabel: "Publisher samples / downloads",
    preview: {
      src: "/datasets/bridge-fold-cloth.mp4",
      poster: "/datasets/bridge-fold-cloth.jpg",
      alt: "Official BridgeData V2 robot cloth-folding teleoperation trajectory.",
      credit:
        "Homer Walke, Kevin Black, Abraham Lee & BridgeData V2 contributors · 2023. Unchanged preview.",
      sourceUrl: "https://rail-berkeley.github.io/bridgedata/",
      licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
    },
  },
  {
    id: "aist-bimanual",
    name: "AIST Bimanual Manipulation",
    publisher: "AIST · Motoda and collaborators",
    kind: "teleoperation",
    summary:
      "Dual-arm leader/follower demonstrations on an ALOHA platform, with synchronized observations and joint control signals.",
    scale: "10,000+ episodes",
    scaleNote: "100+ tasks in the v1 release, as reported by the project.",
    modalities: ["4-camera RGB", "Depth", "14-DoF joints / actions", "Language prompts"],
    tasks: ["Cable insertion", "Assembly", "Bimanual manipulation"],
    sourceUrl: "https://aistairc.github.io/aist_bimanip_site/",
    exploreUrl: "https://aistairc.github.io/aist_bimanip_site/dataset.html",
    licenseLabel: "CC BY 4.0 · project work",
    licenseUrl: "https://aistairc.github.io/aist_bimanip_site/",
    licenseNote:
      "The official project licenses its work and previews under CC BY 4.0. Retain credit and license information; check the downloaded release's accompanying terms.",
    accessLabel: "Publisher task browser / downloads",
    preview: {
      src: "/datasets/aist-lan.gif",
      poster: "/datasets/aist-lan.jpg",
      alt: "AIST dual-arm robot inserting a LAN cable into a hub, task 44.",
      credit: "© 2025 AIST · Motoda & collaborators. Unchanged official sample.",
      sourceUrl: "https://aistairc.github.io/aist_bimanip_site/",
      licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
    },
  },
  {
    id: "hocap",
    name: "HO-Cap",
    publisher: "UT Dallas & NVIDIA · Wang and collaborators",
    kind: "egocentric",
    summary:
      "Human hand-object interactions captured with egocentric HoloLens and multiple RGB-D views, with 3D hand and object pose annotations.",
    scale: "Multiview human capture",
    scaleNote:
      "Ego and external camera views. See the publisher's release for sequence and split details.",
    modalities: ["Egocentric RGB", "Multiview RGB-D", "3D hand pose", "3D object pose"],
    tasks: ["Pick and place", "Handovers", "Object use"],
    sourceUrl: "https://irvlutd.github.io/HOCap/",
    exploreUrl: "https://irvlutd.github.io/HOCap/#data",
    licenseLabel: "CC BY 4.0 · data",
    licenseUrl: "https://irvlutd.github.io/HOCap/#data",
    licenseNote:
      "The publisher releases the dataset under CC BY 4.0. The toolkit's separate software license does not change the dataset license.",
    accessLabel: "Publisher examples / downloads",
    preview: {
      src: "/datasets/hocap-pick-and-place.mp4",
      poster: "/datasets/hocap-pick-and-place.png",
      alt: "HO-Cap multiview human pick-and-place example with hand and object pose visualization.",
      credit:
        "HO-Cap · Wang, Zhang, Chao, Wen, Guo & Xiang. Original video; poster frame extracted.",
      sourceUrl: "https://irvlutd.github.io/HOCap/",
      licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
    },
  },
];
