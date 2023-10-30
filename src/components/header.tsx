import Link from 'next/link'
import { Search } from 'lucide-react'
import Image from 'next/image'
import { CartWidget } from './cart-widget'

export function Header() {
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-5">
        <Link href="/" className="text-2xl font-extrabold text-white">
          devstore
        </Link>

        <form className="flex w-[320px] items-center gap-3 rounded-full bg-zinc-900 px-5 py-3 ring-zinc-700">
          <Search className="w-5 h-5 text-zinc-500" />

          <input
            type="text"
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-500"
            placeholder="Buscar produtos.."
          />
        </form>
      </div>

      <div className="flex items-center gap-4">
        <CartWidget />

        <div className="w-px h-4 bg-zinc-700" />

        <Link href="/" className="flex items-center gap-2 hover:underline">
          <span className="text-sm">Conta</span>
          <Image
            src="https://github.com/jeffersonbraster.png"
            className="h-6 w-6 rounded-full"
            width={24}
            height={24}
            alt="Jefferson Brandão"
          />
        </Link>
      </div>
    </header>
  )
}
