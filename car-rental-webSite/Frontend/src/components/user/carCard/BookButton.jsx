export default function BookButton({ available }) {
  return (
    <button
      disabled={!available}
      className={`px-4 py-2 text-sm rounded-md font-medium text-white transition ${
        available
          ? "bg-green-500 hover:bg-green-600"
          : "bg-gray-400 cursor-not-allowed"
      }`}
    >
      {available ? "Book Now" : "Unavailable"}
    </button>
  );
}
