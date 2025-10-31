import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getCategories,
  updateCar,
} from "../../../redux/actions/authActions/admin/carActions";
import { showToast } from "../../../utils/toastUtils";
import { clearCarMessage } from "../../../redux/slices/authSlice/admin/carSlice/carSlice";

const UpdateCar = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { loading, error, success, categories, cars } = useSelector(
    (state) => state.car
  );

  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [carData, setCarData] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // 1️⃣ Fetch categories on mount
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  // 2️⃣ Load car details once both cars and categories are ready
  useEffect(() => {
    const foundCar = cars.find((c) => c._id === id);
    if (foundCar) {
      setCarData(foundCar);
      setImagePreview(foundCar.image?.url || foundCar.image || null);
    }
  }, [cars, id]);

  // 3️⃣ When categories + carData available → set default form values
  useEffect(() => {
    if (carData && categories.length > 0) {
      reset({
        name: carData.name,
        brand: carData.brand,
        category:
          carData.category?._id ||
          (typeof carData.category === "string"
            ? carData.category
            : ""),
        fuelType: carData.fuelType,
        transmission: carData.transmission,
        seats: carData.seats,
        price: carData.price,
        location: carData.location,
        description: carData.description,
      });
    }
  }, [carData, categories, reset]);

  // ✅ Toasts
  useEffect(() => {
    if (success) {
      showToast("✅ Car updated successfully!", "success");
      dispatch(clearCarMessage());
    }
    if (error) {
      showToast(`❌ ${error}`, "error");
      dispatch(clearCarMessage());
    }
  }, [success, error, dispatch]);

  // 🔹 Image Upload Preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // 🔹 Submit Updated Data
  const onSubmit = (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    if (selectedFile) formData.append("image", selectedFile);
    dispatch(updateCar(id, formData));
  };

  if (!carData) {
    return (
      <div className="text-center text-gray-500 mt-20 text-lg">
        Loading car details...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200 text-center">
        Update Car Details
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Car Name */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
            Car Name
          </label>
          <input
            type="text"
            {...register("name", { required: "Car name is required" })}
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 focus:ring-2 focus:ring-sky-500"
          />
        </div>

        {/* Brand */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
            Brand
          </label>
          <input
            type="text"
            {...register("brand", { required: "Brand is required" })}
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 focus:ring-2 focus:ring-sky-500"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
            Category
          </label>
          <select
            {...register("category", { required: "Category is required" })}
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 focus:ring-2 focus:ring-sky-500"
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Fuel Type */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
            Fuel Type
          </label>
          <select
            {...register("fuelType")}
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 focus:ring-2 focus:ring-sky-500"
          >
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
          </select>
        </div>

        {/* Transmission */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
            Transmission
          </label>
          <select
            {...register("transmission")}
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 focus:ring-2 focus:ring-sky-500"
          >
            <option value="Manual">Manual</option>
            <option value="Automatic">Automatic</option>
          </select>
        </div>

        {/* Seats */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
            Seats
          </label>
          <input
            type="number"
            {...register("seats")}
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 focus:ring-2 focus:ring-sky-500"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
            Price
          </label>
          <input
            type="number"
            {...register("price")}
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 focus:ring-2 focus:ring-sky-500"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
            Location
          </label>
          <input
            type="text"
            {...register("location")}
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 focus:ring-2 focus:ring-sky-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
            Description
          </label>
          <textarea
            {...register("description")}
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 focus:ring-2 focus:ring-sky-500"
          ></textarea>
        </div>

        {/* Image */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
            Car Image
          </label>
          <div className="border-2 border-dashed border-gray-400 rounded-xl p-6 text-center hover:bg-gray-100 transition relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            {!imagePreview ? (
              <p className="text-gray-600">Click to upload or drag image</p>
            ) : (
              <div className="flex flex-col items-center space-y-3">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-48 h-32 object-cover rounded-lg shadow"
                />
                <p className="text-sm text-gray-500">Change Image</p>
              </div>
            )}
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white font-semibold py-2 rounded-lg transition duration-300 ${
              loading
                ? "bg-sky-400 cursor-not-allowed"
                : "bg-sky-600 hover:bg-sky-700"
            }`}
          >
            {loading ? "Updating..." : "Update Car"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateCar;
