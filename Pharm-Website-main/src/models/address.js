import mongoose from "mongoose";

const NewAddressSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    nomeCompleto: String,
    address: String,
    cidade: String,
    pais: String,
    codigoPostal: String,
  },
  { timestamps: true }
);

const Address =
  mongoose.models.Address || mongoose.model("Address", NewAddressSchema);

export default Address;