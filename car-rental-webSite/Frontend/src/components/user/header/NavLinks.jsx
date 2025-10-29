import { Home, Car, CalendarDays } from "lucide-react";

export default function NavLinks({ handleNavigate }) {
  const links = [
    { to: "/", label: "Home", icon: <Home size={18} /> },
    { to: "/car/availabile", label: "Cars", icon: <Car size={18} /> },
    // 👇 Update this path
    { to: "/booking-history", label: "Booking", icon: <CalendarDays size={18} /> },
  ];

  return (
    <div className="flex items-center space-x-6">
      {links.map((link) => (
        <button
          key={link.to}
          onClick={() => handleNavigate(link.to)}
          className="flex items-center space-x-1 text-gray-800 dark:text-gray-200 hover:text-sky-500 dark:hover:text-sky-400 transition"
        >
          {link.icon}
          <span>{link.label}</span>
        </button>
      ))}
    </div>
  );
}
