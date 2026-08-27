import { getProductImage } from '../data/products';

export default function ProductDisplayComponent({ id }: { id: string }) {
  const imageUrl: string = getProductImage(id);

  return (
    <section>
      <div className="mb-4 w-full overflow-hidden rounded-2xl bg-white p-4 shadow-sm">
        <img src={imageUrl} className="aspect-square w-full rounded-xl object-contain" alt="Main product display" />
      </div>
      <div className="flex flex-wrap gap-2.5">
        {[1, 2, 3, 4].map((thumbnail) => (
          <button className="h-15 w-15 overflow-hidden rounded-lg border border-slate-200 bg-white p-1 transition hover:border-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand" key={thumbnail} aria-label={`View product image ${thumbnail}`}>
            <img src={imageUrl} className="h-full w-full rounded object-cover" alt="" />
          </button>
        ))}
      </div>
    </section>
  );
}
