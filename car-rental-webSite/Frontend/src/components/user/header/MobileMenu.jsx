import NavLinks from "./NavLinks";
import SearchBar from "./SearchBar";
import DarkModeToggle from "./DarkModeToggle";

export default function MobileMenu({ isOpen }) {
  if (!isOpen) return null;

  return (
    <div className="md:hidden px-4 pb-3 space-y-4">
      {/* Navigation links with vertical gap */}
      <div className="flex flex-col space-y-3">
        <NavLinks />
      </div>

      {/* Search bar */}
      <SearchBar fullWidth />

      {/* Dark/Light toggle + Login */}
      <div className="flex items-center space-x-4">
        <DarkModeToggle />
        <button className="bg-teal-500 text-white px-4 py-1 rounded-md shadow hover:bg-teal-600">
          Login
        </button>
      </div>
    </div>
  );
}
