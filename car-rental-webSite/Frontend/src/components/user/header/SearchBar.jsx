import { Search } from "lucide-react";

export default function SearchBar({ fullWidth = false }) {
  return (
    <div className="relative w-full md:w-auto">
      <input
        type="text"
        placeholder="Search cars"
        className={`${
          fullWidth ? "w-full" : ""
        } rounded-md border border-gray-300 px-4 py-1 focus:outline-none focus:ring-2 focus:ring-sky-400 dark:bg-gray-700 dark:text-white dark:border-gray-600`}
      />
      <button className="absolute right-2 top-1.5 text-gray-500 dark:text-gray-300">
        <Search size={18} />
      </button>
    </div>
  );
}
