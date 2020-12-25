import { Kafka, logLevel } from 'kafkajs'

const kafka = new Kafka({
    clientId: 'user-producer',
    brokers: ['localhost:9092'],
    logLevel: logLevel.WARN
})

export async function sendEmailKafka(user) {
    const producer = kafka.producer()
    await producer.connect()
    console.log(user)
    await producer.send({
        topic: 'confirmar-email',
        messages: [
            { value: JSON.stringify(user) },
        ],
    })
    await producer.disconnect()
}