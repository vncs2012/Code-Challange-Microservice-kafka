from kafka import KafkaConsumer
import json
import redis

r = redis.StrictRedis(host="localhost", port=6379, db=0, decode_responses=True)
# To consume latest messages and auto-commit offsets
consumer = KafkaConsumer('pagamento',
                         group_id='my-pagamento',
                         bootstrap_servers=['localhost:9092'], value_deserializer=lambda m: json.loads(m.decode('ascii')))

for message in consumer:
    # message value and key are raw bytes -- decode if necessary!
    # e.g., for unicode: `message.value.decode('utf-8')`

    # print ("%s:%d:%d: key=%s value=%s" % (message.topic, message.partition,
    #                                       message.offset, message.key,
    #                                       message.value))
    # {'_id': '5fe40eaf1bac35539829d413', 'tipo_pagamento': 'Boleto', 'nu_boleto': '10101010'}
    data = message.value
    dic =  json.dumps(data['pagamento'])
    r.set(data['id'], dic)
    print(r.get(data['id']))
