import { Kafka,logLevel } from 'kafkajs'

const kafka = new Kafka({
    clientId: 'consumer',
    brokers: ['localhost:9092'],
    logLevel: logLevel.WARN 
})

const consumer = kafka.consumer({ groupId: 'group-email' })

async function run() {
    await consumer.connect()
    await consumer.subscribe({ topic: 'topic-email', fromBeginning: true })
    await consumer.run({ 
        eachMessage: async ({ topic, partition, message }) => {
            console.log(JSON.parse(message.value))
        },
    })
}
run().catch(console.error)