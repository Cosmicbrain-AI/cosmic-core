import { useState } from "react";
import { Maximize2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import "./DeploymentPhotoRail.css";

const photos = [
  {
    title: "In the hallway",
    src: "/media/deployment/hallway-delivery.png",
    alt: "A black robot holds a woven basket in a warmly lit hallway, with its articulated supports and wheeled base visible.",
    caption: "A basket in hand. A little help along the way.",
    width: 1470,
    height: 1070,
  },
  {
    title: "At the doorstep",
    src: "/media/deployment/doorstep-handoff.jpeg",
    alt: "A person faces the black robot at a doorway, with a basket of linens between them.",
    caption: "People and robots, meeting in everyday spaces.",
    width: 901,
    height: 655,
  },
  {
    title: "In the laundry room",
    src: "/media/deployment/laundry-room.jpeg",
    alt: "Side view of the black robot carrying a basket beside washing machines and hanging shirts.",
    caption: "A familiar space. A new kind of teammate.",
    width: 935,
    height: 641,
  },
] as const;

export function DeploymentPhotoRail() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const photo = photos[selectedIndex];

  return (
    <div className="deployment-photo-rail">
      <figure className="dpr-figure">
        <Dialog>
          <DialogTrigger asChild>
            <button
              type="button"
              className="dpr-photo"
              aria-label={`Enlarge deployment photo: ${photo.title}`}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                loading="lazy"
                decoding="async"
              />
              <span className="dpr-expand" aria-hidden="true">
                <Maximize2 size={13} />
              </span>
            </button>
          </DialogTrigger>
          <DialogContent className="dpr-lightbox">
            <div className="dpr-lightbox-heading">
              <DialogTitle>{photo.title}</DialogTitle>
              <DialogDescription>{photo.caption}</DialogDescription>
            </div>
            <img src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} />
          </DialogContent>
        </Dialog>
        <figcaption className="dpr-caption" aria-live="polite" aria-atomic="true">
          <span>{photo.title}</span>
          <p>{photo.caption}</p>
        </figcaption>
      </figure>
      <div className="dpr-controls">
        <span className="dpr-photo-label">A closer look</span>
        <div role="group" aria-label="Choose a deployment photograph">
          {photos.map((item, index) => (
            <button
              key={item.src}
              type="button"
              aria-label={`Photo ${index + 1}: ${item.title}`}
              aria-pressed={selectedIndex === index}
              onClick={() => setSelectedIndex(index)}
            >
              0{index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
