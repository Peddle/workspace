import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="text-center max-w-4xl">
        <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
          Effortlessly Generate Your Resignation Letter
        </h1>
        <p className="mt-3 text-xl text-gray-300 sm:mt-5">
          Leaving your job? Let our AI-powered tool create a professional resignation letter for you in seconds. Simply provide a few details and let our advanced language model do the rest.
        </p>
        <div className="mt-8 sm:flex sm:justify-center">
          <div className="rounded-md shadow">
            <Link href="/generator">
              <span className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10">
                Get Started
              </span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

In this landing page:
- We create a full-height section with a gradient background.
- We display a large headline and a brief description of the resignation letter generator.
- We add a prominent "Get Started" button that links to the `/generator` page.

3. Update the `src/app/generator/page.tsx` file to change the form submission URL:

