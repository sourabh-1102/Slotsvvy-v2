import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IParcel extends Document {
  id: string; // Public ID like TRK-2023-001
  sender: string;
  senderAddress?: string;
  receiver: string;
  address: string;
  phone: string;
  weight: string;
  pincode: string;
  status: 'SCHEDULED' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'FAILED' | 'Expected';
  slot: string;
  driverId?: string | null;
  createdAt: Date;
}

const ParcelSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  sender: { type: String, required: true },
  senderAddress: { type: String },
  receiver: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String },
  weight: { type: String },
  pincode: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['SCHEDULED', 'OUT_FOR_DELIVERY', 'DELIVERED', 'FAILED', 'Expected'],
    default: 'SCHEDULED' 
  },
  slot: { type: String, default: 'Unassigned' },
  driverId: { type: String, default: null },
}, {
  timestamps: true,
});

// Avoid OverwriteModelError
const Parcel: Model<IParcel> = mongoose.models.Parcel || mongoose.model<IParcel>('Parcel', ParcelSchema);

export default Parcel;
