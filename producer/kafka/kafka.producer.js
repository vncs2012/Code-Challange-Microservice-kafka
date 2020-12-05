import { Kafka, logLevel } from 'kafkajs'

export async function runKafka(user) {
    const kafka = new Kafka({
        clientId: 'producer',
        brokers: ['localhost:9092'],
        logLevel: logLevel.WARN
    })
    const producer = kafka.producer()
    await producer.connect()
    await producer.send({
        topic: 'topic-email',
        messages: [
            { value: JSON.stringify(user) },
        ],
    })
    await producer.disconnect()
}