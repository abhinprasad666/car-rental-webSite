import mongoose from "mongoose";

const { Schema } = mongoose;

const carSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        brand: {
            type: String,
            required: true,
            trim: true,
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
        fuelType: {
            type: String,
            enum: ["Petrol", "Diesel", "Electric"],
            default: "Petrol",
            required: true,
        },
        transmission: {
            type: String,
            enum: ["Manual", "Automatic"],
            required: true,
        },
        seats: {
            type: Number,
            required: true,
            min: 2,
            max: 50,
        },
        available: {
            type: Boolean,
            default: true,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        location: {
            type: String,
            required: true,
            trim: true,
        },
        image: {
            type: String,
            default: "",
        },
        description: {
            type: String,
            trim: true,
            default: "",
        },
        rating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5,
        },
        numOfReviews: {
            type: Number,
            default: 0,
        },
        reviews: [
            {
                type: Schema.Types.ObjectId,
                ref: "Review",
                default: [],
            },
        ],
        isFeatured: {
            type: Boolean,
            default: false,
        },
        dealer: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

const Car = mongoose.model("Car", carSchema);

export default Car;
