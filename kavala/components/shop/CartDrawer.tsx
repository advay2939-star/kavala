"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { useCart } from "@/lib/store/cart";
import { Button } from "@/components/ui/Button";
import { commerceEnabledClient, startCheckout } from "@/components/shop/checkout";

/**
 * Right-hand cart drawer. Checkout is intentionally disabled until the
 * Medusa + Stripe integration lands (Chunk 3) — no fake checkout stubs.
 */
export function CartDrawer() {
  const { open, setOpen, lines, setQty, remove, subtotal } = useCart();
  const reduce = useReducedMotion();
  const [checkingOut, setCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const enabled = commerceEnabledClient();

  async function handleCheckout() {
    setCheckoutError(null);
    setCheckingOut(true);
    try {
      await startCheckout(lines);
    } catch (err) {
      setCheckoutError(err instanceof Error ? err.message : "Checkout could not be started.");
      setCheckingOut(false);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.32 }}
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-bone/10 bg-lacquer"
            initial={{ x: reduce ? 0 : "100%", opacity: reduce ? 0 : 1 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: reduce ? 0 : "100%", opacity: reduce ? 0 : 1 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between border-b border-bone/10 p-6">
              <h2 className="type-display text-xl text-bone">Your cart</h2>
              <button onClick={() => setOpen(false)} className="text-[13px] uppercase tracking-[0.14em] text-bone-dim hover:text-bone" aria-label="Close cart">
                Close
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {lines.length === 0 ? (
                <p className="text-[14px] leading-relaxed text-bone-dim">
                  Your cart is empty. The ritual begins in the shop.
                </p>
              ) : (
                <ul className="space-y-6">
                  {lines.map((line) => (
                    <motion.li
                      key={line.sku}
                      className="hairline flex items-center justify-between gap-4 p-4"
                      initial={{ scale: 1 }}
                      animate={{ scale: [1, 1.02, 1] }}
                      transition={{ duration: 0.3 }}
                    >
                      <div>
                        <p className="text-[14px] text-bone">{line.name}</p>
                        <p className="mt-1 text-[13px] text-bone-dim">${line.priceUsd}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <label className="sr-only" htmlFor={`qty-${line.sku}`}>
                          Quantity for {line.name}
                        </label>
                        <div className="hairline flex items-center">
                          <button className="px-3 py-1.5 text-bone-dim hover:text-bone" onClick={() => setQty(line.sku, line.qty - 1)} aria-label={`Decrease quantity of ${line.name}`}>
                            −
                          </button>
                          <span id={`qty-${line.sku}`} className="w-6 text-center text-[14px] text-bone">{line.qty}</span>
                          <button className="px-3 py-1.5 text-bone-dim hover:text-bone" onClick={() => setQty(line.sku, line.qty + 1)} aria-label={`Increase quantity of ${line.name}`}>
                            +
                          </button>
                        </div>
                        <button onClick={() => remove(line.sku)} className="text-[12px] text-bone-dim/70 underline-offset-2 hover:text-bone hover:underline">
                          Remove
                        </button>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>

            <div className="border-t border-bone/10 p-6">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-[14px] text-bone-dim">Subtotal</span>
                <span className="type-display text-xl text-bone">${subtotal()}</span>
              </div>
              {enabled ? (
                <>
                  <Button
                    onClick={handleCheckout}
                    loading={checkingOut}
                    disabled={lines.length === 0}
                    className="w-full"
                  >
                    Checkout
                  </Button>
                  {checkoutError && (
                    <p role="alert" className="mt-3 text-center text-[12px] text-oil-bright">
                      {checkoutError} Try again, or contact us if it persists.
                    </p>
                  )}
                </>
              ) : (
                <>
                  <Button disabled className="w-full" aria-label="Checkout unavailable in preview build">
                    Checkout — arriving with launch
                  </Button>
                  <p className="mt-3 text-center text-[12px] text-bone-dim/70">
                    Payments open when the store launches. This preview cart does not process orders.
                  </p>
                </>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
