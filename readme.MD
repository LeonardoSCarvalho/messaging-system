# Projeto de Estudo: Comunicação entre Microserviços com RabbitMQ

Este é um projeto de estudo que demonstra como implementar a comunicação entre microserviços utilizando RabbitMQ como mensagem broker. O projeto consiste em dois microserviços, `order-service` e `payment-service`, que se comunicam assincronamente através de mensagens.

## Arquitetura

A arquitetura do projeto é baseada em mensagens e segue o padrão de arquitetura de microserviços. 

- **order-service**: Responsável por receber pedidos e enviar informações sobre os pedidos para processamento.
- **payment-service**: Responsável por processar os pagamentos dos pedidos.

A comunicação entre os microserviços segue o seguinte fluxo:

1. O `order-service` recebe um pedido via HTTP POST e envia uma mensagem para o RabbitMQ com os dados do pedido.
2. O `payment-service` consome a mensagem do RabbitMQ, processa o pagamento e envia uma confirmação de pagamento para o RabbitMQ.
3. O `order-service` consome a confirmação de pagamento do RabbitMQ e finaliza o pedido.

## Configuração

O projeto utiliza Docker Compose para facilitar a configuração dos serviços e do RabbitMQ. O arquivo `docker-compose.yml` define os serviços e a rede necessária para a comunicação entre eles. As variáveis de ambiente `RABBITMQ_URL` nos serviços `order-service` e `payment-service` são configuradas para apontar para o serviço RabbitMQ no Docker Compose.

## Objetivo do Estudo

O objetivo deste projeto é explorar os conceitos de comunicação entre microserviços utilizando RabbitMQ e mensageria assíncrona. Ao final do estudo, espera-se compreender os benefícios e desafios dessa abordagem em ambientes distribuídos e escaláveis.

## Diagramas

### Diagrama de Arquitetura

+-------------------+ +-------------------+ +-------------------+
| | | | | |
| order-service | | payment-service | | rabbitmq |
| :3000 | <--->| :3000 | | :5672 |
| | | | | |
+-------------------+ +-------------------+ +-------------------+



### Diagrama de Sequência


order-service payment-service
| |
| |
| POST /order with order data |
|----------------------------------------->|
| |
| |
| |
| Process order and send |
| confirmation message |
|<-----------------------------------------|
| |



## Executando o Projeto

Para executar o projeto, clone o repositório e execute o seguinte comando na raiz do projeto:

```bash
docker-compose up --build


Isso irá criar e iniciar os contêineres para os serviços order-service, payment-service e RabbitMQ. Você poderá então enviar pedidos para o order-service e verificar os logs para acompanhar a comunicação entre os serviços.
