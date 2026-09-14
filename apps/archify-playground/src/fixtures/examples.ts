import type { Example } from '../types';

export const EXAMPLES: Example[] = [
  {
    id: 'web-api',
    title: 'REST API Stack',
    description: `REST API Stack
Browser → API Gateway : HTTP request
API Gateway → Auth Service : validate token
Auth Service → Redis : check session
API Gateway → User Service : route request
User Service → Postgres : query data
User Service → API Gateway : response
API Gateway → Browser : JSON response`,
    ir: {
      title: 'REST API Stack',
      nodes: [
        { id: 'browser', label: 'Browser', kind: 'client' },
        { id: 'api_gateway', label: 'API Gateway', kind: 'gateway' },
        { id: 'auth_service', label: 'Auth Service', kind: 'service' },
        { id: 'redis', label: 'Redis', kind: 'cache' },
        { id: 'user_service', label: 'User Service', kind: 'service' },
        { id: 'postgres', label: 'Postgres', kind: 'database' },
      ],
      edges: [
        { from: 'browser', to: 'api_gateway', label: 'HTTP request' },
        { from: 'api_gateway', to: 'auth_service', label: 'validate token' },
        { from: 'auth_service', to: 'redis', label: 'check session' },
        { from: 'api_gateway', to: 'user_service', label: 'route request' },
        { from: 'user_service', to: 'postgres', label: 'query data' },
        { from: 'user_service', to: 'api_gateway', label: 'response' },
        { from: 'api_gateway', to: 'browser', label: 'JSON response' },
      ],
    },
  },
  {
    id: 'event-driven',
    title: 'Event-Driven Order System',
    description: `Event-Driven Order System
Mobile App → API Gateway : place order
API Gateway → Order Service : create order
Order Service → Kafka : publish OrderCreated
Kafka → Payment Service : consume event
Payment Service → Stripe : charge card
Payment Service → Kafka : publish PaymentConfirmed
Kafka → Notification Service : consume event
Notification Service → SendGrid : send email`,
    ir: {
      title: 'Event-Driven Order System',
      nodes: [
        { id: 'mobile_app', label: 'Mobile App', kind: 'client' },
        { id: 'api_gateway', label: 'API Gateway', kind: 'gateway' },
        { id: 'order_service', label: 'Order Service', kind: 'service' },
        { id: 'kafka', label: 'Kafka', kind: 'queue' },
        { id: 'payment_service', label: 'Payment Service', kind: 'service' },
        { id: 'stripe', label: 'Stripe', kind: 'external' },
        { id: 'notification_service', label: 'Notification Service', kind: 'service' },
        { id: 'sendgrid', label: 'SendGrid', kind: 'external' },
      ],
      edges: [
        { from: 'mobile_app', to: 'api_gateway', label: 'place order' },
        { from: 'api_gateway', to: 'order_service', label: 'create order' },
        { from: 'order_service', to: 'kafka', label: 'OrderCreated' },
        { from: 'kafka', to: 'payment_service', label: 'consume event' },
        { from: 'payment_service', to: 'stripe', label: 'charge card' },
        { from: 'payment_service', to: 'kafka', label: 'PaymentConfirmed' },
        { from: 'kafka', to: 'notification_service', label: 'consume event' },
        { from: 'notification_service', to: 'sendgrid', label: 'send email' },
      ],
    },
  },
  {
    id: 'cdn-cache',
    title: 'CDN & Caching Layer',
    description: `CDN & Caching Layer
User → CDN : request asset
CDN → Redis : check cache
Redis → CDN : cache miss
CDN → Origin Server : fetch content
Origin Server → Database : load data
Origin Server → Redis : store in cache
Redis → CDN : cached response
CDN → User : serve asset`,
    ir: {
      title: 'CDN & Caching Layer',
      nodes: [
        { id: 'user', label: 'User', kind: 'client' },
        { id: 'cdn', label: 'CDN', kind: 'gateway' },
        { id: 'redis', label: 'Redis', kind: 'cache' },
        { id: 'origin_server', label: 'Origin Server', kind: 'service' },
        { id: 'database', label: 'Database', kind: 'database' },
      ],
      edges: [
        { from: 'user', to: 'cdn', label: 'request asset' },
        { from: 'cdn', to: 'redis', label: 'check cache' },
        { from: 'redis', to: 'cdn', label: 'cache miss' },
        { from: 'cdn', to: 'origin_server', label: 'fetch content' },
        { from: 'origin_server', to: 'database', label: 'load data' },
        { from: 'origin_server', to: 'redis', label: 'store in cache' },
        { from: 'redis', to: 'cdn', label: 'cached response' },
        { from: 'cdn', to: 'user', label: 'serve asset' },
      ],
    },
  },
];
