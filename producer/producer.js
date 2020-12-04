import { Kafka, logLevel } from 'kafkajs'

const kafka = new Kafka({
    clientId: 'producer',
    brokers: ['localhost:9092'],
    logLevel: logLevel.WARN
})

const producer = kafka.producer()

let user = [
    {
        name: 'Vinicius Carvalho Miranda',
        email: 'vncs@gmail.com'
    }
]
console.log(user)
async function run() {
    await producer.connect()
    await producer.send({
        topic: 'topic-email',
        messages: [
            { value: JSON.stringify(user) },
        ],
    })
    await producer.disconnect()
}

run().catch(console.error)