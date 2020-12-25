import { Kafka, logLevel } from 'kafkajs'

const kafka = new Kafka({
    clientId: 'producer',
    brokers: ['localhost:9092'],
    logLevel: logLevel.WARN
})

export async function runKafka(user) {
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
export async function rumKafkaConsumer() {
    const consumer = kafka.consumer({ groupId: 'response-email' })
    await consumer.connect()
    await consumer.subscribe({ topic: 'response-envio', fromBeginning: true })
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const data = JSON.parse(message.value)
            console.log(`Topico ${topic} `)
            console.log(data)
        }
    })
}