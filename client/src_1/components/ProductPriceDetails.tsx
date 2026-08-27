export default function ProductPriceDetails() {
  return (
    <aside className="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:sticky lg:top-20">
      <div className="text-3xl font-extrabold text-slate-900">$278.00</div>
      <div className="mt-1 text-sm font-semibold text-emerald-600">✓ In Stock — Ships Today</div>

      <div className="mt-5 flex items-center gap-3 text-sm text-slate-700">
        <label htmlFor="quantity">Quantity:</label>
        <select id="quantity" defaultValue="1" className="rounded-md border border-slate-300 bg-white px-3 py-1.5 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </div>

      <button className="mt-5 w-full rounded-lg bg-brand px-4 py-3 font-bold text-white transition hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand">Add to Cart</button>
      <button className="mt-2.5 w-full rounded-lg bg-accent px-4 py-3 font-bold text-slate-950 transition hover:bg-amber-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand">Buy Now</button>

      <div className="mt-5 border-t border-slate-200 pt-4 text-xs leading-5 text-slate-500">
        <p>Ships from <strong className="text-slate-700">ECOMMY Warehouse</strong></p>
        <p>Sold by <strong className="text-slate-700">Sony Direct Store</strong></p>
      </div>
    </aside>
  );
}
