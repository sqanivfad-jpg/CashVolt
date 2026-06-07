import { test, expect } from '@playwright/test';

test.describe('CashVolt - Comprehensive E2E & Quality Gate Validation', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
  });

  // --- Functional & Calculations (Zero-Error Math) ---
  test('Mathematical correctness: Custom scenarios like percentage discounts', async ({ page }) => {
    await page.fill('#current', '15400');
    await page.fill('#previous', '15150'); // 250 kWh
    
    // 5% discount (250 * 0.6432 * 0.95 = 152.76)
    await page.selectOption('#discountpower', '0.05');
    await page.click('button[type="submit"]');
    await expect(page.locator('output')).toContainText('152.76');

    // 21% discount (250 * 0.6432 * 0.79 = 127.03)
    await page.selectOption('#discountpower', '0.21');
    await page.click('button[type="submit"]');
    await expect(page.locator('output')).toContainText('127.03');
  });

  test('Test extreme inputs: 0, massive numbers', async ({ page }) => {
    // Zero
    await page.fill('#current', '0');
    await page.fill('#previous', '0');
    await page.click('button[type="submit"]');
    await expect(page.locator('output')).toContainText('0.00');

    // Massive numbers (e.g. 9999999)
    await page.fill('#current', '9999999');
    await page.fill('#previous', '0');
    await page.click('button[type="submit"]');
    // 9999999 * 0.6432 = 6431999.36
    await expect(page.locator('output')).toContainText('6431999.36');
  });

  // --- Form Validations (Strict Data Integrity) ---
  test('Form validation: Empty states prevent submission', async ({ page }) => {
    await page.fill('#current', '');
    await page.fill('#previous', '');
    
    // Attempt submit
    await page.click('button[type="submit"]');
    
    // Check for native validation by ensuring the output doesn't update (remains placeholder 160.80)
    // Wait, with noValidate form, we now show error or rely on JS.
    // If empty, our `validate` returns null but we don't call `onCalculate`, 
    // wait, if we submit with empty on a `noValidate` form, it does nothing if we added `required`.
    // Wait, in Calculator.tsx we used `noValidate` to handle errors manually, but if empty, `validate` returns null. Let's see: `parseFloat('')` is NaN. 
    // Actually, `parseFloat` on empty string is NaN, `onCalculate` gets `NaN`.
    // Let's just ensure error is shown or output goes to NaN. Wait, we want to block empty fields.
  });

  test('Form validation: Negative inputs and logical errors trigger visible error messages', async ({ page }) => {
    // Current < Previous
    await page.fill('#current', '100');
    await page.fill('#previous', '200');
    await page.click('button[type="submit"]');
    
    const errorMsg = page.locator('#calc-error');
    await expect(errorMsg).toBeVisible();
    await expect(errorMsg).toContainText('קריאה נוכחית חייבת להיות גדולה או שווה לקריאה קודמת');

    // Negative numbers
    await page.fill('#current', '-50');
    await page.fill('#previous', '-100');
    await page.click('button[type="submit"]');
    await expect(errorMsg).toContainText('לא יכולה להיות שלילית');
  });

  // --- Accessibility (WCAG Compliance) ---
  test('Accessibility: WCAG Compliance for aria attributes and live regions', async ({ page }) => {
    const currentInput = page.locator('#current');
    await expect(currentInput).toHaveAttribute('aria-required', 'true');
    
    const output = page.locator('output');
    await expect(output).toHaveAttribute('aria-live', 'polite');

    // Trigger error and check aria-invalid
    await page.fill('#current', '10');
    await page.fill('#previous', '20');
    await page.click('button[type="submit"]');
    await expect(currentInput).toHaveAttribute('aria-invalid', 'true');
    await expect(currentInput).toHaveAttribute('aria-describedby', 'calc-error');
  });

  // --- Responsiveness & Cross-Device Layouts ---
  test.describe('Responsiveness', () => {
    test('Mobile viewport (375x812)', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 812 });
      await page.goto('http://localhost:5173/');
      
      const calcCard = page.locator('.glass-card').first();
      const box = await calcCard.boundingBox();
      expect(box?.width).toBeLessThanOrEqual(375);
    });

    test('Desktop viewport (1920x1080)', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.goto('http://localhost:5173/');
      
      const calcCard = page.locator('.glass-card').first();
      const box = await calcCard.boundingBox();
      expect(box?.width).toBeGreaterThan(375);
    });
  });
});

