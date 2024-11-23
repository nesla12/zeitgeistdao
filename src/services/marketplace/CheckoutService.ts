import type { CheckoutState, CheckoutItem, PaymentMethod, ShippingAddress } from '../../types/marketplace';

class CheckoutService {
  private checkoutState: CheckoutState = {
    items: [],
    subtotal: 0,
    shipping: 0,
    insurance: 0,
    tax: 0,
    total: 0
  };

  async addItem(item: CheckoutItem): Promise<CheckoutState> {
    this.checkoutState.items.push(item);
    await this.recalculateTotals();
    return this.checkoutState;
  }

  async removeItem(itemId: string): Promise<CheckoutState> {
    this.checkoutState.items = this.checkoutState.items.filter(item => item.id !== itemId);
    await this.recalculateTotals();
    return this.checkoutState;
  }

  async updateQuantity(itemId: string, quantity: number): Promise<CheckoutState> {
    const item = this.checkoutState.items.find(item => item.id === itemId);
    if (item) {
      item.quantity = quantity;
      await this.recalculateTotals();
    }
    return this.checkoutState;
  }

  async setShippingAddress(address: ShippingAddress): Promise<CheckoutState> {
    this.checkoutState.shippingAddress = address;
    await this.recalculateTotals();
    return this.checkoutState;
  }

  async setPaymentMethod(method: PaymentMethod): Promise<CheckoutState> {
    this.checkoutState.paymentMethod = method;
    return this.checkoutState;
  }

  async processPayment(): Promise<{ success: boolean; orderId?: string }> {
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      success: true,
      orderId: Math.random().toString(36).substr(2, 9)
    };
  }

  private async recalculateTotals() {
    this.checkoutState.subtotal = this.checkoutState.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    this.checkoutState.shipping = this.checkoutState.items.reduce(
      (total, item) => total + (item.shipping?.cost || 0),
      0
    );

    this.checkoutState.insurance = this.checkoutState.items.reduce(
      (total, item) => total + (item.shipping?.insurance?.cost || 0),
      0
    );

    // Calculate tax (example: 10%)
    this.checkoutState.tax = this.checkoutState.subtotal * 0.1;

    this.checkoutState.total = 
      this.checkoutState.subtotal +
      this.checkoutState.shipping +
      this.checkoutState.insurance +
      this.checkoutState.tax;
  }

  getState(): CheckoutState {
    return this.checkoutState;
  }
}

export const checkoutService = new CheckoutService();