import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-rose-100 to-teal-100">
      <h1 className="text-9xl font-extrabold text-gray-800 tracking-widest">404</h1>
      <div className="bg-white px-2 text-sm rounded rotate-12 absolute">
        Chat Not Found
      </div>
      <button className="mt-5">
        <Link href="/" legacyBehavior>
          <a className="relative inline-block rounded-2xl text-sm font-medium text-white group focus:outline-none focus:ring">
            <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-white group-hover:translate-y-0 group-hover:translate-x-0"></span>
            <span className="relative block px-8 py-3 bg-black border border-current">
              Go Home
            </span>
          </a>
        </Link>
      </button>
    </div>
  );
}
