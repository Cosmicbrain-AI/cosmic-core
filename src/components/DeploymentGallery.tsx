import { useRef, useState } from "react";
import { ArrowUpRight, Maximize2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import "./DeploymentGallery.css";

const photographs = [
  {
    id: "hallway",
    label: "In the hallway",
    src: "/media/deployment/hallway-delivery.png",
    alt: "A black robot on a wheeled base holds a woven basket in a warmly lit hotel hallway.",
    caption: "A basket in hand. A little help along the way.",
    detail:
      "The articulated arms, camera head, and mobile base come together in an everyday space.",
    width: 1470,
    height: 1070,
  },
  {
    id: "doorstep",
    label: "At the doorstep",
    src: "/media/deployment/doorstep-handoff.jpeg",
    alt: "A person stands opposite the black robot at a doorway, with a basket of linens between them.",
    caption: "The small moments that make a day easier.",
    detail: "An up-close look at the robot and a basket of linens at the doorway.",
    width: 901,
    height: 655,
  },
  {
    id: "laundry",
    label: "Laundry handoff",
    src: "/media/deployment/laundry-room.jpeg",
    alt: "Side view of the black robot carrying a basket beside washing machines and hanging shirts.",
    caption: "A familiar space. A new kind of teammate.",
    detail: "A side view of the robot’s arms and wheeled base beside the laundry machines.",
    width: 935,
    height: 641,
  },
] as const;

export function DeploymentGallery() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectorRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const selected = photographs[selectedIndex];

  return (
    <section id="deployment" className="deployment-section" aria-labelledby="deployment-heading">
      <div className="page-width">
        <div className="deployment-heading">
          <div>
            <span className="eyebrow">From our world to yours</span>
            <h2 id="deployment-heading">
              This is what a<br />
              <em>helping hand</em> looks like.
            </h2>
          </div>
          <p>
            Meet the robot behind the model. Take a closer look at the hardware, the everyday
            spaces, and the moments where people and robots meet.
          </p>
        </div>

        <div className="deployment-gallery">
          <figure className="deployment-feature">
            <Dialog>
              <DialogTrigger asChild>
                <button
                  type="button"
                  className="deployment-photo-button"
                  aria-label={`Expand photo: ${selected.label}`}
                >
                  <img
                    src={selected.src}
                    alt={selected.alt}
                    width={selected.width}
                    height={selected.height}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="deployment-photo-tag">
                    <span aria-hidden="true" /> {selected.label}
                  </span>
                  <span className="deployment-expand" aria-hidden="true">
                    <Maximize2 size={15} /> <span>Take a closer look</span>
                  </span>
                </button>
              </DialogTrigger>
              <DialogContent className="deployment-lightbox">
                <div className="deployment-lightbox-heading">
                  <DialogTitle>{selected.label}</DialogTitle>
                  <DialogDescription>{selected.caption}</DialogDescription>
                </div>
                <img
                  src={selected.src}
                  alt={selected.alt}
                  width={selected.width}
                  height={selected.height}
                />
              </DialogContent>
            </Dialog>
            <figcaption className="deployment-caption" aria-live="polite" aria-atomic="true">
              <span className="deployment-frame-number">
                <span className="eyebrow">Frame</span>
                <span>0{selectedIndex + 1}</span>
              </span>
              <div>
                <h3>{selected.caption}</h3>
                <p>{selected.detail}</p>
              </div>
            </figcaption>
          </figure>

          <div className="deployment-alternates" aria-label="More robot photographs">
            {photographs.map((photograph, index) =>
              index === selectedIndex ? null : (
                <button
                  key={photograph.id}
                  type="button"
                  className="deployment-thumbnail"
                  aria-label={`View photo: ${photograph.label}`}
                  onClick={() => {
                    setSelectedIndex(index);
                    // The selected thumbnail moves into the feature. Keep keyboard focus
                    // on its persistent photograph selector when that thumbnail unmounts.
                    selectorRefs.current[index]?.focus({ preventScroll: true });
                  }}
                >
                  <span className="deployment-thumbnail-image">
                    <img
                      src={photograph.src}
                      alt={photograph.alt}
                      width={photograph.width}
                      height={photograph.height}
                      loading="lazy"
                      decoding="async"
                    />
                  </span>
                  <span className="deployment-thumbnail-label">
                    <span className="eyebrow">0{index + 1}</span>
                    <span>{photograph.label}</span>
                    <ArrowUpRight size={17} aria-hidden="true" />
                  </span>
                </button>
              ),
            )}
          </div>
        </div>

        <div className="deployment-footer">
          <p>Real spaces. Thoughtful engineering. A very human purpose.</p>
          <div className="deployment-selectors" role="group" aria-label="Select a robot photograph">
            {photographs.map((photograph, index) => (
              <button
                key={photograph.id}
                ref={(element) => {
                  selectorRefs.current[index] = element;
                }}
                type="button"
                aria-label={photograph.label}
                aria-pressed={selectedIndex === index}
                onClick={() => setSelectedIndex(index)}
              >
                0{index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
