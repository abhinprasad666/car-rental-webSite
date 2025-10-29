import mongoose from "mongoose";

const dealerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // each user can have only one seller profile
    },
    companyName:{
        type:String
    },
    licenseNo: {
      type: String,
    },

    address:{
      type: String,
    },
    bio:{
        type:String
    },
   
    verified: {
      type: Boolean,
      default: false,
    },

    // cars: [
    //     { type: mongoose.Schema.Types.ObjectId, ref: "Car" }
    // ],

    status: {
      type: String,
      enum: ["active", "inactive", "banned"],
      default: "active",
    },
  },
  { timestamps: true }
);

const Dealer = mongoose.model("dealer", dealerSchema);

export default Dealer;
