from kafka import KafkaProducer
from kafka.errors import KafkaError
import json

producer = KafkaProducer(
    bootstrap_servers=['localhost:9092'],
    value_serializer=lambda m: json.dumps(m).encode('ascii')
    )

def on_send_success(record_metadata):
    print(record_metadata.topic)
    print(record_metadata.partition)
    print(record_metadata.offset)

def on_send_error(excp):
    log.error('I am an errback', exc_info=excp)

producer.send('pagamento', key=b'teste', value={
    'age': '26',
    'name':"Vinicius Miranda"
}).add_callback(on_send_success).add_errback(on_send_error)
producer.flush()

