export default function ProductDetails() {
  return (
    <section className="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <span className="text-xs font-bold tracking-wider text-slate-500 uppercase">Sony</span>
      <h1 className="mt-1.5 text-2xl font-bold tracking-tight text-slate-900">WH-1000XM4 Wireless Noise Canceling Headphones</h1>

      <div className="mt-3 flex items-center gap-2 text-sm">
        <span className="tracking-wide text-accent" aria-label="4 out of 5 stars">★★★★☆</span>
        <span className="text-slate-500">(1,240 Ratings)</span>
      </div>

      <div className="mt-5 flex flex-wrap items-baseline gap-3">
        <span className="text-3xl font-extrabold text-slate-900">$278.00</span>
        <span className="text-base text-slate-400 line-through">$349.99</span>
        <span className="rounded bg-red-100 px-2 py-0.5 text-xs font-bold text-red-700">20% OFF</span>
      </div>

      <div className="mt-6">
        <h3 className="text-base font-bold text-slate-900">Key Highlights</h3>
        <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-6 text-slate-700">
          <li>Industry-leading Active Noise Cancellation with HD Processor QN1</li>
          <li>Up to 30-hour battery life with quick charging capability</li>
          <li>Touch sensor controls for music playback and volume</li>
          <li>Speak-to-chat technology automatically pauses music during calls</li>
        </ul>
      </div>
    </section>
  );
}
