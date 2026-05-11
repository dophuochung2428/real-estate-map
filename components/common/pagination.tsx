export default function Pagination() {
  return (
    <div className="mt-10 flex items-center justify-center gap-3">
      {[1, 2, 3, 4, 5].map((page) => (
        <button
          key={page}
          className={`flex size-12 items-center justify-center rounded-2xl font-semibold transition ${
            page === 1 ? "bg-red-600 text-white" : "bg-white hover:bg-gray-100"
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
}
