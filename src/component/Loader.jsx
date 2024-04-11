export const Loader = () => {
  return (
    <div className="loader-container fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
      <div
        className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] text-[#ffce47]"
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};
