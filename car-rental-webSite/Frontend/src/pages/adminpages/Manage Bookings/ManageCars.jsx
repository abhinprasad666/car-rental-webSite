import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCars, deleteCar } from "../../../redux/actions/authActions/admin/carActions";
import { useNavigate } from "react-router-dom";
import { clearCarMessage } from "../../../redux/slices/authSlice/admin/carSlice/carSlice";

export default function ManageCars() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cars, loading, error, deleteSuccess, deleting } = useSelector((state) => state.car);

  useEffect(() => {
    dispatch(getAllCars());
  }, [dispatch]);

  // ✅ Show toast-like messages
  useEffect(() => {
    if (deleteSuccess) {
      alert("✅ Car deleted successfully!");
      dispatch(clearCarMessage());
    }
    if (error) {
      alert(`❌ ${error}`);
      dispatch(clearCarMessage());
    }
  }, [deleteSuccess, error, dispatch]);

  const handleDelete = (carId) => {
    if (window.confirm("Are you sure you want to delete this car?")) {
      dispatch(deleteCar(carId));
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
        Manage Cars
      </h2>

      {loading && <p className="text-sky-600 font-medium text-center mb-3">Fetching cars...</p>}
      {deleting && <p className="text-orange-500 font-medium text-center mb-3">Deleting car...</p>}
      {error && <p className="text-red-500 font-medium text-center mb-3">{error}</p>}

      <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow rounded-xl">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700 text-left">
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Brand</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Price/day</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {cars && cars.length > 0 ? (
              cars.map((car) => (
                <tr key={car._id} className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  <td className="px-4 py-2">
                    <img
                      src={car.image?.url || car.image || "/no-image.jpg"}
                      alt={car.name}
                      className="w-20 h-14 object-cover rounded-md shadow"
                    />
                  </td>
                  <td className="px-4 py-2 font-medium text-gray-800 dark:text-gray-200">
                    {car.name}
                  </td>
                  <td className="px-4 py-2">{car.brand}</td>
                  <td className="px-4 py-2">
                    <span className="px-2 py-1 text-sm bg-sky-100 text-sky-800 rounded-md dark:bg-sky-900 dark:text-sky-200">
                      {car.category?.name || "N/A"}
                    </span>
                  </td>
                  <td className="px-4 py-2 font-semibold text-gray-700 dark:text-gray-300">
                    ₹{car.price}
                  </td>
                  <td className="px-4 py-2 text-right space-x-3">
                    <button
                      onClick={() => navigate(`/admin/edit-car/${car._id}`)}
                      className="text-sky-500 hover:underline font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(car._id)}
                      className="text-red-500 hover:underline font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              !loading && (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-500 dark:text-gray-400">
                    No cars found.
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
