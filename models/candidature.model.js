import mongoose from "mongoose";

const candidatureSchema = new mongoose.Schema(
  {
    entreprise: {
      type: String,
      required: true,
    },
    poste: {
      type: String,
      required: true,
    },
    lienOffre: {
      type: String,
      required: false,
    },
    dateEnvoi: {
      type: Date,
      required: true,
      default: Date.now,
    },
    statut: {
      type: String,
      enum: ["En attente", "Acceptée", "Refusée"],
      default: "En attente",
    },
    dateRelance: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Candidature = mongoose.models.Candidature || mongoose.model("Candidature", candidatureSchema);

export default Candidature;
