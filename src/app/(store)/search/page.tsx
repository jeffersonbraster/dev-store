import { api } from '@/app/data/api'
import { Product } from '@/app/data/types/product'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'

interface SearchProps {
  searchParams: {
    q: string
  }
}

async function searchProduct(q: string): Promise<Product[]> {
  const response = await api(`/products/search?q=${q}`, {
    cache: 'no-store',
    // next: {
    //   revalidate: 60 * 60 * 24, // 24 hours
    // },
  })

  const products = await response.json()

  return products
}

export default async function Search({ searchParams }: SearchProps) {
  const { q } = searchParams

  if (!q) {
    redirect('/')
  }

  const products = await searchProduct(q)

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm">
        Resultados para: <span className="font-semibold">{q}</span>
      </p>

      <div className="grid grid-cols-3 gap-4">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.slug}`}
            className="group relative rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-end"
          >
            <Image
              src={product.image}
              width={480}
              height={480}
              alt="moletom java"
              quality={100}
              className="group-hover:scale-105 transition-transform duration-300"
            />

            <div className="absolute bottom-10 right-10 h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
              <span className="text-sm truncate">{product.price}</span>
              <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
                {product.price.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
