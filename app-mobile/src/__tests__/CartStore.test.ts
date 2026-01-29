import { useCartStore } from "../store/cart-store";

describe("Cart Store", () => {
  beforeEach(() => {
    useCartStore.getState().clear();
  });

  it("deve adicionar um item ao carrinho", () => {
    const item = { id: "1", name: "Pizza", price: 10 };
    useCartStore.getState().addItem(item);

    const state = useCartStore.getState();
    expect(state.items.length).toBe(1);
    expect(state.items[0].quantity).toBe(1);
    expect(state.total()).toBe(10);
  });

  it("deve incrementar a quantidade se o item já existir", () => {
    const item = { id: "1", name: "Pizza", price: 10 };
    useCartStore.getState().addItem(item);
    useCartStore.getState().addItem(item);

    const state = useCartStore.getState();
    expect(state.items.length).toBe(1);
    expect(state.items[0].quantity).toBe(2);
    expect(state.total()).toBe(20);
  });

  it("deve remover um item do carrinho", () => {
    const item = { id: "1", name: "Pizza", price: 10 };
    useCartStore.getState().addItem(item);
    useCartStore.getState().removeItem("1");

    const state = useCartStore.getState();
    expect(state.items.length).toBe(0);
  });
});
