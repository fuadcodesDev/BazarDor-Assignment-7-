export default function HomeLoading() {
  return (
    <main className="mx-auto min-h-screen max-w-6xl space-y-10 px-4 py-10">
      {/* Hero skeleton */}
      <section className="grid animate-pulse grid-cols-1 gap-8 rounded-2xl bg-[#e2eae3] p-6 sm:p-10 md:grid-cols-2 md:items-center">
        <div className="space-y-4">
          <div className="h-4 w-36 rounded bg-[#cbd8cc]" />
          <div className="h-8 w-full max-w-md rounded bg-[#cbd8cc]" />
          <div className="h-8 w-4/5 max-w-sm rounded bg-[#cbd8cc]" />
          <div className="h-4 w-full max-w-sm rounded bg-[#cbd8cc]" />
          <div className="h-11 w-36 rounded-lg bg-[#cbd8cc]" />
        </div>

        <div className="h-48 rounded-xl bg-[#cbd8cc] sm:h-60" />
      </section>

      {/* Product section skeletons */}
      {[0, 1, 2].map((section) => (
        <section key={section} className="animate-pulse">
          <div className="h-7 w-48 rounded bg-[#e2eae3]" />

          {section === 2 && (
            <div className="mt-3 h-4 w-32 rounded bg-[#e2eae3]" />
          )}

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="rounded-xl border border-[#e2eae3] bg-[#fbfdfb] p-4"
              >
                <div className="h-10 w-10 rounded-lg bg-[#e2eae3]" />
                <div className="mt-4 h-4 w-3/4 rounded bg-[#e2eae3]" />
                <div className="mt-2 h-3 w-1/2 rounded bg-[#e2eae3]" />
                <div className="mt-5 h-6 w-2/3 rounded bg-[#e2eae3]" />
              </div>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}