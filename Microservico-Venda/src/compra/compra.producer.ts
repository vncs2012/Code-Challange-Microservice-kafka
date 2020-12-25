import { Kafka, logLevel } from 'kafkajs'

const kafka = new Kafka({
    clientId: 'user-producer',
    brokers: ['localhost:9092'],
    logLevel: logLevel.WARN
})

export async function PagamentoKafka(dados_pagamento) {
    const producer = kafka.producer()
    await producer.connect()
    console.log(dados_pagamento)
    await producer.send({
        topic: 'pagamento',
        messages: [
            { value: JSON.stringify(dados_pagamento) },
        ],
    })
    await producer.disconnect()
}