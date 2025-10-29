import CarImage from "../carCard/CarImage";
import CarDetails from "../carCard/CarDeatils";
import BookButton from "../carCard/BookButton";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCars } from "../../../redux/actions/carActions/carActios";

export default function CarCard({
  image,
  name,
  type,
  seats,
  fuel,
  transmission,
  location,
  price,
  available,
}) 



{
  const { loading,cars } = useSelector((state) => state.cars);
  console.log("cars new data ",cars)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCars)
    }, [dispatch]);

  return (

    <div className="bg-gradient-to-b from-white to-sky-50 rounded-2xl shadow-lg p-4 w-[300px] md:w-[320px] hover:shadow-xl transition relative">
      {/* Availability Badge */}
      <span
        className={`absolute top-4 left-4 text-white text-xs font-semibold px-3 py-1 rounded-full ${
          available ? "bg-teal-500" : "bg-red-500"
        }`}
      >
        {available ? "Available Now" : "Not Available"}
      </span>

      {/* Car Image */}
      <CarImage image={image} name={name} />

      {/* Car Details */}
      <CarDetails
        name={name}
        type={type}
        seats={seats}
        fuel={fuel}
        transmission={transmission}
        location={location}
      />

      {/* Footer Section */}
      <div className="flex justify-between items-center mt-4">
        <p className="text-lg font-semibold text-gray-800">{price}1000/Day</p>
        <BookButton available={available} />
      </div>
    </div>
  );
}
