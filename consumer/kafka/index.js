import { Kafka, logLevel } from 'kafkajs'
import { sendEmail } from '../envio_email'

const kafka = new Kafka({
    clientId: 'consumer',
    brokers: ['localhost:9092'],
    logLevel: logLevel.WARN
})

export async function runEnvio() {
    const consumer = kafka.consumer({ groupId: 'group-email' })

    await consumer.connect()
    await consumer.subscribe({ topic: 'topic-email', fromBeginning: true })
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const data = JSON.parse(message.value)
            console.log(data)
            sendEmail(data)
        }
    })
}

export async function rumResponseEnvio(params) {
    console.log('entrou response ',params)
    const producer = kafka.producer()
    await producer.connect()
    await producer.send({
        topic: 'response-envio',
        messages: [
            { value: JSON.stringify(params) },
        ],
    })
    await producer.disconnect()
}

