import { DomainException } from '../common/DomainException'
import { ErrorDefinitions } from '../../../../http/config/error-definitions'

export namespace Exceptions {
  export class CartNotFound extends DomainException {
    constructor() {
      super(ErrorDefinitions.CartNotFound)
    }
  }

  export class ItemNotFound extends DomainException {
    constructor() {
      super(ErrorDefinitions.ItemNotFound)
    }
  }

  export class ProductNotFound extends DomainException {
    constructor() {
      super(ErrorDefinitions.ItemNotFound)
    }
  }

  export class ItemNotInCart extends DomainException {
    constructor() {
      super(ErrorDefinitions.ItemNotInCart)
    }
  }

  export class ProductNotInStock extends DomainException {
    constructor() {
      super(ErrorDefinitions.ProductNotInStock)
    }
  }

  export class ProductAvailabilityExceeded extends DomainException {
    constructor() {
      super(ErrorDefinitions.ProductAvailabilityExceeded)
    }
  }
}
