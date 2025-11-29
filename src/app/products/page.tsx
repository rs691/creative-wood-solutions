import { getProducts } from '@/lib/data';
import { ProductCard } from '@/components/product-card';

export const metadata = {
  title: 'Our Products - Creative Wood Solutions',
  description: 'Explore our collection of handcrafted wooden furniture and decor.',
};

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold">Our Products</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Each piece is meticulously crafted by hand, blending traditional techniques with modern aesthetics.
        </p>
      </div>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-muted-foreground">No products found. Please check back later.</p>
        </div>
      )}
    </div>
  );
}
