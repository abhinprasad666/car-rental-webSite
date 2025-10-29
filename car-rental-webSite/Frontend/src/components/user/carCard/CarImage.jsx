export default function CarImage({ image, name }) {
  return (
    <div className="h-40 bg-gray-100 rounded-lg flex justify-center items-center mb-4 overflow-hidden">
      {image ? (
        <img
          src={image}
          alt={name}
          className="object-cover w-full h-full rounded-lg"
        />
      ) : (
        <span className="text-gray-400 text-sm">IMAGE</span>
      )}
    </div>
  );
}
