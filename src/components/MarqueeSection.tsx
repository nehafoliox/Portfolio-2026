import React, { useEffect, useRef, useState } from 'react';

/**
 * MarqueeSection — two rows of images scrolling horizontally based on page scroll.
 * Source: https://drive.google.com/drive/folders/1XwDSj633XbcsiSAJQkLXbE_2HtIZVHz4?usp=drive_link
 * First 11 files = row 1 (moves RIGHT), remaining 10 = row 2 (moves LEFT).
 */

const drive = (id: string) => `https://drive.google.com/thumbnail?id=${id}&sz=w1000`;

const MARQUEE_IMAGES: string[] = [
  // Row 1 — first 11
  drive('1iCVcmeABRsqtHvhOtYlQ0T5kII7vwEoT'), // 4.png
  drive('1wA1bINo54tXBagJDRKZzgygh6wt1EudQ'), // 9.png
  drive('1kuFy7xBjO9pdWNlPEFXhxf91-EH1cXHT'), // About us 2.png
  drive('1vdkgb33-X_eIFsuP0gAm2qmP2lWwqFlK'), // anime collectors hub.png
  drive('1eGrTIPmyFltFgLiFe_2V1PwVAgOkjG-4'), // Contact new.png
  drive('1HuRh35gV4vbBgbgcSlDr1Th2i81GS9ai'), // Contact.png
  drive('1-71aYB6UHvhSGhl6WPoO5JQxXznkOAEK'), // Desktop - 2.png
  drive('1M3qVd30yGpdHUWPVPH6gdabamFelmjcb'), // display-1.png
  drive('1ANONQdvQzz5eM7xwnP_ItwfnCga8oEZ-'), // explore community.png
  drive('1zb-EpoQX5l5gI8mCKEgfDysofFbsiQFU'), // faq.png
  drive('18cRFPM7kiHTgtaaXF6OF-feBaqPYjaOa'), // Flow -1.png
  // Row 2 — remaining 10
  drive('1HOhlJy9Frv9kFySzbqTKosHZbb0xyNax'), // LUNEXIS.jpg
  drive('1tXXU0_8LXUdVme7C_PYAMYcL9xaCP5R7'), // MacBook Air - 1.png
  drive('1fkvy8Ay-YZrrKLUfTAhiPp2gQNNiynGR'), // MacBook Pro 14_ - 26.png
  drive('1BYxW0svBe1LRD6XQTUGCFnRjJ745WBub'), // MacBook Pro 14_ - 27.png
  drive('14_r5L3Y1ml5pBQa4PYz9Q7dPAJw8TfSn'), // MacBook Pro 16_ - 10.jpg
  drive('19mQi2yQUK7_OkgprU_7ny_1k-cXabSso'), // MacBook Pro 16_ - 14.jpg
  drive('1Dzye4-FSAon0SdGzBNfF8fEo5TAY8zuE'), // MacBook Pro 16_ - 21.jpg
  drive('1JY8zF_Kw0lYRpV36ztRgPA-yT4YIyebI'), // MacBook Pro 16_ - 7.png
  drive('1xxE6-qF_cS29gCSv0iOzyv3QNy-mNOmy'), // NEWSLETTER.png
  drive('1RGjcdyBAHeODHMwGCsfitMjg6ANidMCP'), // shop by anime.png
];

// Fallback if a Drive file isn't publicly accessible.
const FALLBACK = (seed: string) => `https://picsum.photos/seed/${seed}/420/270`;

function Tile({ src, seed }: { src: string; seed: string }) {
  const [err, setErr] = useState(false);
  const finalSrc = err ? FALLBACK(seed) : src;
  return (
    <img
      src={finalSrc}
      alt=""
      loading="lazy"
      draggable={false}
      referrerPolicy="no-referrer"
      onError={() => setErr(true)}
      className="w-[420px] h-[270px] max-w-none rounded-2xl object-cover shrink-0 select-none pointer-events-none"
    />
  );
}

export const MarqueeSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (!sectionRef.current) return;
        const sectionTop =
          sectionRef.current.getBoundingClientRect().top + window.scrollY;
        setOffset((window.scrollY - sectionTop + window.innerHeight) * 0.3);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const row1 = MARQUEE_IMAGES.slice(0, 11);
  const row2 = MARQUEE_IMAGES.slice(11);

  const renderRow = (images: string[], rowKey: string) => {
    const tripled = [...images, ...images, ...images];
    return tripled.map((src, i) => (
      <Tile key={`${rowKey}-${i}`} src={src} seed={`${rowKey}-${i % images.length}`} />
    ));
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden"
    >
      <div className="flex flex-col gap-3">
        <div className="overflow-hidden">
          <div
            className="flex gap-3 w-max"
            style={{
              transform: `translateX(${offset - 200}px)`,
              willChange: 'transform',
            }}
          >
            {renderRow(row1, 'row1')}
          </div>
        </div>
        <div className="overflow-hidden">
          <div
            className="flex gap-3 w-max"
            style={{
              transform: `translateX(${-(offset - 200)}px)`,
              willChange: 'transform',
            }}
          >
            {renderRow(row2, 'row2')}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarqueeSection;
