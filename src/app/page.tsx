import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Hammer, DraftingCompass, Paintbrush } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getProducts } from '@/lib/data';
import { ProductCard } from '@/components/product-card';

export default async function Home() {
  const featuredProducts = await getProducts(3);

  return (
    <div className="flex flex-col">
      <section className="relative h-[60vh] md:h-[80vh] w-full flex items-center justify-center text-center text-white bg-gray-800">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-bold text-white shadow-lg">
            Creative Wood Solutions
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-gray-200">
            Bespoke Wood Creations for the Modern Home and Business
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="font-bold">
              <Link href="/products">
                Explore Products <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="font-bold">
              <Link href="/projects">Our Portfolio</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="features" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <Hammer className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-2xl font-headline font-semibold">Quality Craftsmanship</h3>
              <p className="mt-2 text-muted-foreground">
                Built to last with traditional techniques and the finest materials.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <DraftingCompass className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-2xl font-headline font-semibold">Custom Designs</h3>
              <p className="mt-2 text-muted-foreground">
                Your vision, brought to life. We collaborate with you on every detail.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <Paintbrush className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-2xl font-headline font-semibold">Artisanal Finishes</h3>
              <p className="mt-2 text-muted-foreground">
                Hand-applied finishes that protect and enhance the natural beauty of the wood.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="featured-products" className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-center">Featured Products</h2>
          <p className="mt-2 text-center text-muted-foreground max-w-xl mx-auto">
            Discover our most popular handcrafted items, perfect for any space.
          </p>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild>
              <Link href="/products">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
