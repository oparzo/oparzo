import Link from "next/link";

export default function NotFound() {
  return (
    <main
      className="
min-h-screen
flex
items-center
justify-center
text-center
px-6
"
    >
      <div>
        <h1
          className="
text-8xl
font-serif
"
        >
          404
        </h1>

        <h2
          className="
text-4xl
font-serif
mt-6
"
        >
          Page Not Found
        </h2>

        <p
          className="
mt-6
text-gray-500
"
        >
          The page you are looking for does not exist.
        </p>

        <Link
          href="/"

          className="
inline-block
mt-10
bg-[var(--ink)]
text-white
px-8
py-4
text-xs
tracking-[0.3em]
uppercase
"
        >
          Back Home
        </Link>
      </div>
    </main>
  );
}
