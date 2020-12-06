# Code Challange - Microservice - kafka
**Esse repositorio e para estudo de microservice com kafka**

Primeiro passou foi criar codigo simples para entender funcionamento do Kafka.

Nos proximos dias vou atualizando codigo para ver como vai ficar no final do estudo. ***Atualização 03/12/2020***

Nessa Fase do estudo adicionei as bibliotecas **express** e **mongoose** para trabalhar com cadastro de usuario afim de enviar um e-mail, fiz apenas parte de **producer** o **consumer** sera feito posterior ***Atualização 04/12/2020 - 05/12/2020***

Finalizando a **primeira** parte do estudo, no **consumer** tratei os dados enviados pele **producer** para enviar o e-mail, e quando o e-mail for enviado e ter mensagem de sucesso de envio, ele retornara para um topico no **kafka** responsavel pelo retorno, o **response-envio** e agora no producer irar ter uma função de **consumer** para processar esses dados enviados.***Atualização 05/12/2020***
