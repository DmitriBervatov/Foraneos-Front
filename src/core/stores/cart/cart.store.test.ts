import type { ProductResponse } from "@/core/types/products/products.model";
import { beforeEach, describe, expect, it } from "vitest";
import { type CartItemDraft, useCartStore } from "./cart.store";

const product: ProductResponse = {
  id: 1,
  name: "Lomo saltado",
  description: "Plato de prueba",
  price: 25,
  imageUrl: "https://example.com/lomo.jpg",
  categoryId: 2,
  categoryName: "Platos principales",
  preparationTimeMinutes: 20,
  ingredients: [],
  active: true,
  rating: 5,
  extras: [],
  isCombo: false,
  comboItems: [],
};

function createItem(overrides: Partial<CartItemDraft> = {}): CartItemDraft {
  return {
    product,
    quantity: 1,
    selectedExtras: [],
    notes: "",
    finalPrice: 25,
    ...overrides,
  };
}

describe("useCartStore", () => {
  beforeEach(() => {
    localStorage.clear();
    useCartStore.setState({ items: [], isCartOpen: false });
  });

  it("agrega un producto y calcula sus totales", () => {
    useCartStore.getState().addItem(createItem({ quantity: 2 }));

    const state = useCartStore.getState();
    expect(state.items).toHaveLength(1);
    expect(state.getTotalItems()).toBe(2);
    expect(state.getTotalPrice()).toBe(50);
  });

  it("agrupa productos iguales y suma sus cantidades", () => {
    useCartStore.getState().addItem(createItem());
    useCartStore.getState().addItem(createItem({ quantity: 2 }));

    const state = useCartStore.getState();
    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(3);
  });

  it("mantiene separados los productos con extras diferentes", () => {
    useCartStore.getState().addItem(createItem());
    useCartStore.getState().addItem(
      createItem({
        selectedExtras: [{ id: 10, name: "Queso", price: 3 }],
        finalPrice: 28,
      })
    );

    expect(useCartStore.getState().items).toHaveLength(2);
  });

  it("elimina un producto cuando su cantidad llega a cero", () => {
    useCartStore.getState().addItem(createItem());
    const cartItemId = useCartStore.getState().items[0].cartItemId;

    useCartStore.getState().updateQuantity(cartItemId, -1);

    expect(useCartStore.getState().items).toHaveLength(0);
  });
});
