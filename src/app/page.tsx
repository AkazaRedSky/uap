import { Inter } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl justify-between font-mono text-sm">
        <div className='p-2'>
          <h1 className='text-center text-slate-600 text-[48px]'>PROJECT UAP 1.1 </h1>
        </div>
        <div className='p-2'>
          <h1 className='text-center text-slate-300 text-[24px]'>Aplikasi Pembelian Permainan Video </h1>
        </div>
        <div className='p-2 flex justify-center'>
          <Link href='/dashboard' className='mt-4 px-4 py-2 text-white/75 hover:text-slate-500 hover:bg-sky-300 bg-lime-600 text-[24px] rounded'>Start Here!</Link>
        </div>
      </div>
      <div className='p-2 flex flex-grow justify-end'>
        <Link href='https://www.github.com/AkazaRedSky/uap' className='text-white/75'>Changelogs</Link>
      </div>
    </main>
  )
}
