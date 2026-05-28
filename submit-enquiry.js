const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  const filePath = 'file:///' + path.resolve(__dirname, 'index.html').replace(/\\/g, '/');
  await page.goto(filePath);

  // Scroll to the contact section
  await page.locator('#contact').scrollIntoViewIfNeeded();

  // Fill in the form fields
  await page.fill('#name', 'Lun Pin Hon');
  await page.fill('#email', 'lunpin.hon@redbeaconam.com');
  await page.fill('#phone', '+852 9000 0000');
  await page.selectOption('#investment', '$250,000 – $1,000,000');
  await page.fill('#message', 'This is a test enquiry submitted via Playwright to verify the contact form is working correctly.');

  // Take a screenshot before submitting
  await page.screenshot({ path: 'form-filled.png' });
  console.log('Form filled — screenshot saved to form-filled.png');

  // Submit the form
  await page.click('#submit-btn');

  // Wait for success/error message
  try {
    await page.waitForFunction(() => {
      const msg = document.getElementById('form-msg');
      return msg && msg.textContent.trim().length > 0;
    }, { timeout: 15000 });

    const msg = await page.$eval('#form-msg', el => el.textContent.trim());
    console.log('Form response:', msg);
    await page.screenshot({ path: 'form-submitted.png' });
    console.log('Result screenshot saved to form-submitted.png');
  } catch (err) {
    console.error('Timed out waiting for form response:', err.message);
    await page.screenshot({ path: 'form-timeout.png' });
  }

  await browser.close();
})();
