# Code Challange - Microservice - kafka
**Esse repositorio e para estudo de microservice com kafka**

Primeiro passou foi criar codigo simples para entender funcionamento do Kafka.

Nos proximos dias vou atualizando codigo para ver como vai ficar no final do estudo. ***Atualização 03/12/2020***

Nessa Fase do estudo adicionei as bibliotecas **express** e **mongoose** para trabalhar com cadastro de usuario afim de enviar um e-mail, fiz apenas parte de **producer** o **consumer** sera feito posterior ***Atualização 04/12/2020 - 05/12/2020***

Finalizando a **primeira** parte do estudo, no **consumer** tratei os dados enviados pele **producer** para enviar o e-mail, e quando o e-mail for enviado e ter mensagem de sucesso de envio, ele retornara para um topico no **kafka** responsavel pelo retorno, o **response-envio** e agora no producer irar ter uma função de **consumer** para processar esses dados enviados.***Atualização 05/12/2020***

Os primeiros exemplos criei um pasta e colocar todo o codigo anterior nele para começar um novo passo.***Atualização 06/12/2020***

# Code Challange - Microservice - kafka - Venda 
Irei utilizar a base de um projeto que tinha desevolvido utilizando **TypeScript** para criar a API, e para fazer **consumer** de dados
decidir utilizar outra linguagem, que foi o **Python** 

Nesse proximo passo irei criar um api e microservices  que cuidara de:
1. Cadastro de Produto ***Atualização 12/12/2020***
2. Cadastro de usuarios ***Atualização 10/12/2020***
3. Ordem de compra ***Atualização 22/12/2020***
4. Microservice de envio de e-mail (*TypeScript*)
5. Microservice de tratamento de pagamento 
6. Microservice de tratamento melhor frete para compra
   
