import mongoose, {Schema, Document} from "mongoose";


export interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    category: mongoose.Types.ObjectId;
    stock: number;
    imageUrl: string;
}   

const ProductSchema: Schema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    category: {type: mongoose.Types.ObjectId, ref: 'Category', required: true},
    stock: {type: Number, required: true},
    imageUrl: {type: String, required: true}
}, {timestamps: true});

export default mongoose.model<IProduct>("Product", ProductSchema);