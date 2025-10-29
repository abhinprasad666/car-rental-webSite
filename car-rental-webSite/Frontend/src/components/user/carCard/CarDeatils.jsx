import { Car, Users, Fuel, Settings, MapPin } from "lucide-react";

export default function CarDetails({
  name,
  type,
  seats,
  fuel,
  transmission,
  location,
}) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-800 mb-3">{name}</h2>
      <ul className="text-gray-600 text-sm space-y-1 mb-4">
        <li className="flex items-center gap-2">
          <Car className="w-4 h-4 text-gray-500" /> {type} Suv
        </li>
        <li className="flex items-center gap-2">
          <Users className="w-4 h-4 text-gray-500" /> {seats} Seats
        </li>
        <li className="flex items-center gap-2">
          <Fuel className="w-4 h-4 text-gray-500" /> {fuel} Fuel 
        </li>
        <li className="flex items-center gap-2">
          <Settings className="w-4 h-4 text-gray-500" /> {transmission} Transmission
        </li>
        <li className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-gray-500" /> {location} Location 
        </li>
      </ul>
    </div>
  );
}
