import type { Voice } from "@/data/voices";

export function VoiceEntry({ voice }: { voice: Voice }) {
  const paragraphs = voice.body.split("\n\n");

  if (voice.imageOrientation === "horizontal") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-12 gap-y-[48px] md:gap-x-0">
        <div className="md:col-span-5">
          <div style={{ aspectRatio: "3/2", overflow: "hidden" }}>
            <img
              src={voice.imagePath}
              alt={voice.imageAlt}
              width={voice.imageWidth}
              height={voice.imageHeight}
              loading="lazy"
              decoding="async"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "brightness(0.97) saturate(0.92)",
                display: "block",
              }}
            />
          </div>
        </div>

        <div className="md:col-span-1" aria-hidden="true" />

        <div className="md:col-span-6 flex flex-col">
          <Prose paragraphs={paragraphs} />
          <Signature voice={voice} />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[720px] mx-auto">
      <div style={{ aspectRatio: "2/3", overflow: "hidden" }}>
        <img
          src={voice.imagePath}
          alt={voice.imageAlt}
          width={voice.imageWidth}
          height={voice.imageHeight}
          loading="lazy"
          decoding="async"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(0.97) saturate(0.92)",
            display: "block",
          }}
        />
      </div>
      <div className="mt-[48px]">
        <Prose paragraphs={paragraphs} />
        <Signature voice={voice} />
      </div>
    </div>
  );
}

function Prose({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div>
      {paragraphs.map((para, i) => (
        <p
          key={i}
          className="font-fraunces italic text-[19px] text-[#1A1816] leading-[1.6]"
          style={{ marginTop: i > 0 ? "24px" : 0 }}
        >
          {para}
        </p>
      ))}
    </div>
  );
}

function Signature({ voice }: { voice: Voice }) {
  return (
    <p
      className="font-mono-meta text-[#5C5750]"
      style={{ marginTop: "32px" }}
    >
      — {voice.firstName} · {voice.practice} · {voice.location}
    </p>
  );
}
