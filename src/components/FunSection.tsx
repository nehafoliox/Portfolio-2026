import React from 'react';

export const FunSection: React.FC = () => {
  return (
    <section
      id="fun"
      className="relative w-full scroll-mt-24 px-6 sm:px-8 md:px-10 pt-4 sm:pt-6 pb-16"
      style={{ background: '#0C0C0C' }}
    >
      <div className="max-w-[1800px] mx-auto w-full">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-2.5 h-2.5 rounded-full bg-white/80" />
          <span className="rachel-mono text-xs uppercase tracking-[0.2em] text-neutral-400">
            Fun / Experiments
          </span>
        </div>

        <h2
          className="rachel-serif text-white tracking-tight mb-3 text-balance"
          style={{ fontSize: 'clamp(1.75rem, 5vw, 3rem)', lineHeight: 1.1 }}
        >
          Vibe-coded <em className="italic">fun</em> stuff.
        </h2>
        <p className="text-base text-neutral-400 max-w-xl mb-8">
          Discord bots, tiny sites, playful experiments — full details coming soon.
        </p>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Placeholder — user will confirm what goes here */}
          <article className="group block transition-all duration-300 ease-in-out">
            <div className="flex flex-col gap-2">
              <div className="relative w-full aspect-[16/9] border border-dashed border-white/20 overflow-hidden box-border flex items-center justify-center">
                <span className="rachel-mono text-sm text-neutral-500">
                  Discord bot — coming soon
                </span>
                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 ease-in-out group-hover:bg-black/40" />
              </div>
              <div className="flex flex-col justify-between gap-0.5 mt-1 lg:flex-row">
                <h3 className="rachel-serif text-white" style={{ fontSize: '17px' }}>
                  Discord bot
                </h3>
                <h4
                  className="rachel-mono text-neutral-400 transition-colors duration-300 ease-in-out group-hover:text-[#e65f2e]"
                  style={{ fontSize: '15px' }}
                >
                  Bot • Coming soon
                </h4>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default FunSection;
