import mongoose from "mongoose";

const configOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectToDB = async () => {
  const connectionUrl =
    "mongodb+srv://osmargraca:osmar.97@cluster0.lwdnile.mongodb.net/";

  mongoose
    .connect(connectionUrl, configOptions)
    .then(() => console.log("farmaDB connected successfully!"))
    .catch((err) =>
      console.log("Getting error from DB connection ${err.message}")
    );
};

export default connectToDB;
