```bash

http
├── config
│   ├── environment.ts
│   ├── error-definitions.ts
│   ├── http-codes.ts
│   └── http-methods.ts
├── routes
│   ├── cart
│   │   ├── add-item
│   │   │   ├── handler.ts
│   │   │   ├── route.ts
│   │   │   └── schema.ts
│   │   ├── create
│   │   │   ├── handler.ts
│   │   │   └── route.ts
│   │   ├── get
│   │   │   ├── handler.ts
│   │   │   ├── route.ts
│   │   │   └── schema.ts
│   │   └── remove-item
│   │       ├── handler.ts
│   │       ├── route.ts
│   │       └── schema.ts
│   ├── health-check
│   │   ├── handler.ts
│   │   └── route.ts
│   ├── product
│   │   ├── get-all
│   │   │   ├── handler.ts
│   │   │   ├── route.ts
│   │   │   └── validation.ts
│   │   └── update
│   │       ├── handler.ts
│   │       ├── route.ts
│   │       └── schema.ts
│   └── routes.ts
├── server.ts
└── utils
    ├── ValidationError.ts
    └── validate.ts

src
└── main
    └── Ecommerce
        ├── application
        │   ├── EcommerceApplicationService.ts
        │   ├── command
        │   │   ├── Cart
        │   │   │   ├── AddItem
        │   │   │   │   ├── AddItem.test.ts
        │   │   │   │   └── AddItem.ts
        │   │   │   ├── Create
        │   │   │   │   └── CreateCart.ts
        │   │   │   └── RemoveItem
        │   │   │       ├── RemoveItem.test.ts
        │   │   │       └── RemoveItem.ts
        │   │   └── Product
        │   │       └── Update
        │   │           ├── Update.test.ts
        │   │           └── Update.ts
        │   └── query
        │       ├── Cart.ts
        │       └── Product.ts
        ├── common
        │   ├── CurrencyCheckerInterface.ts
        │   ├── DomainEvent.ts
        │   ├── DomainException.ts
        │   ├── Entity.ts
        │   ├── EventPublisherInterface.ts
        │   ├── ObserverInterface.ts
        │   └── Price.ts
        ├── domain
        │   ├── Cart
        │   │   ├── Cart.test.ts
        │   │   └── Cart.ts
        │   ├── Events
        │   │   ├── ItemAdded.ts
        │   │   └── ItemRemoved.ts
        │   ├── Exceptions.ts
        │   └── Product
        │       ├── DomainEventHandler
        │       │   ├── DomainEventHandler.test.ts
        │       │   └── DomainEventHandler.ts
        │       └── Product.ts
        ├── infrastructure
        │   ├── communication
        │   │   ├── EventPublisher.ts
        │   │   └── MockEventPublisher.ts
        │   ├── integration
        │   │   └── InMemoryExchangeChecker.ts
        │   └── persistence
        │       └── InMemoryRepository.ts
        └── presentation
            └── index.ts
```
