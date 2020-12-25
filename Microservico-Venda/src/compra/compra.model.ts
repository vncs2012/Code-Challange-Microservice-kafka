import * as mongoose from "mongoose"
import { Produto } from "../produto/produto.model"
import { User } from "../users/users.model"
import * as populate from "mongoose-autopopulate"
import { PagamentoKafka } from './compra.producer'
import { EventEmitter } from "events"

export interface Compra extends mongoose.Document {
    endereco: String,
    estado: String,
    cidade: String,
    cep: String,
    email: String,
    contato: String,
    valorCompra: Number,
    itens: produtos[],
    user: mongoose.Types.ObjectId | User,
    pagamento: pagamento
}

export interface produtos extends mongoose.Document {
    produto: mongoose.Types.ObjectId,
    quantidade: Number
}

export interface pagamento extends mongoose.Document {
    tipo_pagamento: String,
    nu_boleto: String,
    cartao: cartao,
    data_pagamento: Date,
}

export interface cartao extends mongoose.Document {
    bandeira: String,
    numero: String,
    validade: String,
    titular: String,
    seguranca: Number
}

const produtosSchema = new mongoose.Schema({
    produto: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Produto',
        required: false,
        default: [],
        autopopulate: true
    },
    quantidade: {
        type: Number,
        required: true,
    },
});

const cartaoSchema = new mongoose.Schema({
    bandeira: {
        type: String,
        required: true
    },
    numero: {
        type: String,
        required: true
    },
    validade: {
        type: String,
        required: true
    },
    titular: {
        type: String,
        required: true
    },
    seguranca: {
        type: Number,
        required: true
    }
})

const pagamentoSchema = new mongoose.Schema({
    tipo_pagamento: {
        type: String,
        require: true
    },
    nu_boleto: {
        type: String,
        required: false,
    },
    cartao: {
        type: cartaoSchema,
        require: false
    },
    data_pagamento: {
        type: Date,
        required: false
    }
});

const compraSchema = new mongoose.Schema({
    endereco: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        required: true
    },
    cidade: {
        type: String,
        required: true
    },
    cep: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        match: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    },
    contato: {
        type: String,
        required: true
    },
    valorCompra: {
        type: Number,
        required: false
    },
    itens: {
        type: [produtosSchema],
        required: false,
        select: true,
        default: []
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        autopopulate: true
    },
    pagamento:
    {
        type: pagamentoSchema,
        required: false
    }

}, {
    timestamps: { currentTime: () => Date.now() }
})
const calcularCompra = (obj, value, quantidade) => {
    obj.valorCompra = obj.valorCompra + (value * quantidade)
}

const saveMiddleware = async function (next) {
    var compra: Compra = this
    let totalCompra: number = 0
    if (this.itens.length > 0) {
        this.itens.forEach(element => {
            Produto.findOne({ "_id": element.produto }).exec(function (err, doc) {
                if (err) {
                    console.log(err);
                }
                totalCompra += (doc.preco * element.quantidade)
                compra.valorCompra = totalCompra
            })
        })
    }
    next()
}

compraSchema.pre('save', saveMiddleware)
compraSchema.post('save', function (doc) {
    const data = {
        id: doc._id,
        pagamento: doc.pagamento
    }
    if (data)
        PagamentoKafka(data)
    console.log(`chamar producer`);
});

// compraSchema.plugin<Compra>(populate)
export const Compra = mongoose.model<Compra>("Compra", compraSchema);

