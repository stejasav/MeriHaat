import ProductCell from './ProductCell';

// The ruled calendar grid: identical cells divided by 1px ink rules. Borders live on the cells,
// so a short last row stays open paper instead of filling with ink.
export default function ProductGrid({ products, cols = 'grid-cols-2 md:grid-cols-3 xl:grid-cols-4', compact, priorityCount = 0, outOfSeason = null, className = 'border-l border-t border-ink' }) {
  return (
    <div className={`grid ${cols} ${className}`}>
      {products.map((p, i) => (
        <div key={p.id} className="border-b border-r border-ink">
          <ProductCell product={p} compact={compact} priority={i < priorityCount} outOfSeason={outOfSeason} />
        </div>
      ))}
    </div>
  );
}
