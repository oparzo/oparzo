import { describe, it, expect } from "vitest";
import { calculateTotals } from "@/lib/order/calculate-totals";

describe("calculateTotals — price trust regression suite", () => {
  it("applies a valid coupon and Dhaka shipping", async () => {
    const result = await calculateTotals({
      items: [
        {
          product_slug: "test-product",
          quantity: 2,
          unit_price: 100,
          total_price: 200,
        },
      ],
      couponCode: "VALID",
      paymentMethod: "Cash on Delivery",
      destination: "Dhaka",
      profileId: "test-user",
    });

    expect(result.subtotal).toBe(200);
    expect(result.discount).toBe(20);
    expect(result.shipping_fee).toBe(60);
    expect(result.grand_total).toBe(240);
  });

  it("rejects a malformed coupon (no discount applied)", async () => {
    const result = await calculateTotals({
      items: [
        {
          product_slug: "p",
          quantity: 1,
          unit_price: 50,
          total_price: 50,
        },
      ],
      couponCode: "GHOST",
      paymentMethod: "Cash on Delivery",
      destination: "Sylhet",
      profileId: "u",
    });
    expect(result.discount).toBe(0);
    expect(Number.isFinite(result.grand_total)).toBe(true);
  });

  it("refuses negative item quantity", async () => {
    await expect(
      calculateTotals({
        items: [
          {
            product_slug: "p",
            quantity: -1,
            unit_price: 100,
            total_price: -100,
          },
        ],
        couponCode: null,
        paymentMethod: "Cash on Delivery",
        destination: null,
        profileId: "u",
      })
    ).rejects.toThrow();
  });
});
