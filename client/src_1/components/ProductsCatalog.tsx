import { products } from '../data/products';

interface CatalogProps {
  num?: number;
}

export default function ProductsCatalog({ num = 4 }: CatalogProps) {
  const displayItems = products.slice(0, num);

  return (
    <div className="grid grid-cols-1 gap-5 py-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {displayItems.map((prod) => (
        <article key={prod.id} className="flex min-w-0 flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md">
          <img src={prod.img} alt={prod.title} className="mb-3 h-40 w-full object-contain" />
          <div className="text-xs font-semibold tracking-wide text-slate-500 uppercase">{prod.brand}</div>
          <h3 className="mt-1 line-clamp-2 text-sm font-semibold leading-5 text-slate-900">{prod.title}</h3>
          <div className="mt-auto pt-3 text-lg font-extrabold text-brand">${prod.price.toFixed(2)}</div>
          <button className="mt-3 rounded-md bg-brand px-3.5 py-2 text-sm font-semibold text-white transition hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand">Add to Cart</button>
        </article>
      ))}
    </div>
  );
}
