export default function CartComponent() {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-lg font-bold text-slate-900">Cart Summary</h3>
      <div className="mt-4 flex justify-between gap-4 text-sm text-slate-700">
        <span>Subtotal (2 items):</span>
        <strong>$607.00</strong>
      </div>
      <div className="mt-2.5 flex justify-between gap-4 text-sm text-slate-700">
        <span>Shipping:</span>
        <span className="font-semibold text-emerald-600">FREE</span>
      </div>
      <button className="mt-5 w-full rounded-lg bg-accent px-4 py-3 font-bold text-slate-950 transition hover:bg-amber-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand">Proceed to Checkout</button>
    </section>
  );
}
