import * as mongoose from "mongoose";

export interface atributos extends mongoose.Document {
    largura: number,
    comprimento: number,
    altura: number,
    peso: number,
    cor: String,
    material: String
}

export interface Produto extends mongoose.Document {
    codigo: String
    nome: String,
    preco: number,
    atributos: atributos[]
}

const attributesSchema = new mongoose.Schema({
    largura: {
        type: Number,
        required: true
    },
    comprimento: {
        type: Number,
        required: true
    },
    altura: {
        type: Number,
        required: true
    },
    peso: {
        type: Number,
        required: false
    },
    cor: {
        type: String,
        required: false
    },
    material: {
        type: String,
        required: false
    }
});
const productSchema = new mongoose.Schema({
    codigo: {
        type: String,
        required: true,
        unique: true
    },
    nome: {
        type: String,
        required: true,
        unique: true
    },
    preco: {
        type: Number,
        required: true,
    },
    atributos: {
        type: [attributesSchema],
        required: true,
        select: false,
        default: []
    },
}, {
    timestamps: { currentTime: () => Date.now() }
});

export const Produto = mongoose.model<Produto>("Produto", productSchema);
