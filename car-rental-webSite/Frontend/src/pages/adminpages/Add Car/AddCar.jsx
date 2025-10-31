import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { Upload } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addCar, getCategories } from "../../../redux/actions/authActions/admin/carActions";
import { showToast } from "../../../utils/toastUtils";
import { clearCarMessage } from "../../../redux/slices/authSlice/admin/carSlice/carSlice";

export default function AddCar() {
  const dispatch = useDispatch();
  const { loading, error, success, categories,uploading } = useSelector((state) => state.car);

  //  Fetch categories only once
  useEffect(() => {
    if(uploading){
          showToast("Car added successfully! 🚗 Your listing is now live.", "success");
         clearCarMessage()
    }
    dispatch(getCategories());
  }, [dispatch,uploading]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  // 🔹 Handle Image Change + Preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setSelectedFile(null);
      setImagePreview(null);
    }
  };

  // 🔹 Submit Logic
  const onSubmit = (data) => {
    if (!selectedFile) {
      alert("Please select an image before submitting!");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("name", data.name);
    formData.append("brand", data.brand);
    formData.append("category", data.category); // backend needs ID
    formData.append("fuelType", data.fuelType);
    formData.append("transmission", data.transmission);
    formData.append("seats", data.seats);
    formData.append("price", data.price);
    formData.append("location", data.location);
    formData.append("description", data.description || "");

    dispatch(addCar(formData));
  };

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200 text-center">
        Add New Car
      </h2>

      {/* ✅ Success & Error Messages */}
      {success && (
        <p className="text-green-600 font-medium mb-4 text-center">
          ✅ Car added successfully!
        </p>
      )}
      {error && (
        <p className="text-red-600 font-medium mb-4 text-center">❌ {error}</p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Car Name */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
            Car Name
          </label>
          <input
            type="text"
            {...register("name", { required: "Car name is required" })}
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-sky-500"
            placeholder="Enter car name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Brand */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
            Brand
          </label>
          <input
            type="text"
            {...register("brand", { required: "Brand is required" })}
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-sky-500"
            placeholder="Enter brand name"
          />
          {errors.brand && (
            <p className="text-red-500 text-sm mt-1">{errors.brand.message}</p>
          )}
        </div>

        {/* ✅ Category Dropdown */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
            Category
          </label>
          <select
            {...register("category", { required: "Category is required" })}
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-sky-500"
          >
            <option value="">Select category</option>
            {categories && categories.length > 0 ? (
              categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))
            ) : (
              <option disabled>Loading categories...</option>
            )}
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">
              {errors.category.message}
            </p>
          )}
        </div>

        {/* Fuel Type */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
            Fuel Type
          </label>
          <select
            {...register("fuelType", { required: "Fuel type is required" })}
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-sky-500"
          >
            <option value="">Select fuel type</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
          </select>
          {errors.fuelType && (
            <p className="text-red-500 text-sm mt-1">
              {errors.fuelType.message}
            </p>
          )}
        </div>

        {/* Transmission */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
            Transmission
          </label>
          <select
            {...register("transmission", {
              required: "Transmission type is required",
            })}
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-sky-500"
          >
            <option value="">Select transmission</option>
            <option value="Manual">Manual</option>
            <option value="Automatic">Automatic</option>
          </select>
          {errors.transmission && (
            <p className="text-red-500 text-sm mt-1">
              {errors.transmission.message}
            </p>
          )}
        </div>

        {/* Seats */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
            Seats
          </label>
          <input
            type="number"
            {...register("seats", {
              required: "Number of seats is required",
              min: { value: 2, message: "Minimum 2 seats required" },
              max: { value: 50, message: "Maximum 50 seats allowed" },
            })}
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-sky-500"
            placeholder="Enter number of seats"
          />
          {errors.seats && (
            <p className="text-red-500 text-sm mt-1">{errors.seats.message}</p>
          )}
        </div>

        {/* Price */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
            Price
          </label>
          <input
            type="number"
            {...register("price", {
              required: "Price is required",
              min: { value: 0, message: "Price must be positive" },
            })}
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-sky-500"
            placeholder="Enter price"
          />
          {errors.price && (
            <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
          )}
        </div>

        {/* Location */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
            Location
          </label>
          <input
            type="text"
            {...register("location", { required: "Location is required" })}
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-sky-500"
            placeholder="Enter car location"
          />
          {errors.location && (
            <p className="text-red-500 text-sm mt-1">
              {errors.location.message}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
            Description
          </label>
          <textarea
            {...register("description")}
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-sky-500"
            placeholder="Enter car description"
          ></textarea>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
            Car Image
          </label>
          <div className="border-2 border-dashed border-gray-400 dark:border-gray-600 rounded-xl p-6 text-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            {!imagePreview ? (
              <div className="flex flex-col items-center justify-center space-y-2">
                <Upload className="w-10 h-10 text-gray-500 dark:text-gray-400" />
                <p className="text-gray-600 dark:text-gray-300">
                  Click to upload or drag image here
                </p>
              </div>
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

        {/* Submit Button */}
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
            {loading ? "Uploading..." : "Add Car"}
          </button>
        </div>
      </form>
    </div>
  );
}
