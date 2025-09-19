
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {

    // Login Page:-
  
    await page.goto("https://www.saucedemo.com/");

    

    const usernameField = await page.locator("#user-name");
    const passwordField = await page.locator("#password");
    const loginBtn = await page.locator("#login-button");

    await expect(usernameField).toBeVisible();
    await usernameField.fill("standard_user");

    await expect(passwordField).toBeVisible();
    await passwordField.fill("secret_sauce");

    await expect(loginBtn).toBeVisible();
    await loginBtn.click();

    // Products Page:-

    const addToCartBtn = page.locator(".btn_inventory");
    const numberOfAddToCartBtn = await addToCartBtn.count();

    for(let i=0; i< numberOfAddToCartBtn; i++){
        await addToCartBtn.nth(i).click();
    }


    const shoppingCart = page.locator(".shopping_cart_link");
    const numberOfItemsDisplayed = page.locator(".shopping_cart_badge");
    const numberOfItemsAddedInCart = await numberOfItemsDisplayed.textContent();
    console.log("Total Number of Items added in a cart:", numberOfItemsAddedInCart);

    await shoppingCart.click();
    



    // Your Cart Page:-
    
    await page.waitForTimeout(2000);

    const checkoutBtn = page.locator("#checkout");
    await checkoutBtn.scrollIntoViewIfNeeded();
    await expect(checkoutBtn).toBeVisible();
    await expect(checkoutBtn).toBeEnabled();
    await checkoutBtn.click();

    // Checkout Information Page:- 

    const firstName = page.locator("#first-name");
    const lastName = page.locator("#last-name");
    const postalCode = page.locator("#postal-code");
    const continueBtn = page.locator("#continue");

    await expect(firstName).toBeVisible();
    await firstName.fill("standard_user");

    await expect(lastName).toBeVisible();
    await lastName.fill("secret_sauce");

    await expect(postalCode).toBeVisible();
    await postalCode.fill("000000");

    await expect(continueBtn).toBeVisible();
    await continueBtn.click();

    // Checkout Overview:- 

    let totalInventoryPrice = 0; 

    const inventoryItemPrice = page.locator(".inventory_item_price");
    const numberOfItems = await inventoryItemPrice.count();
    for(let i=0; i< numberOfItems; i++){
        const price = await inventoryItemPrice.nth(i).innerText();
        const splitPrice = await price.split('$')[1].trim();
        totalInventoryPrice += parseFloat(splitPrice);
    }

    console.log(totalInventoryPrice);

    const taxPrice = page.locator(".summary_tax_label");
    const splitTaxPrice = await taxPrice.innerText();
    const tax = await splitTaxPrice.split('$')[1].trim();
    console.log(tax);

    const summaryTotalLabel = page.locator(".summary_total_label");
    const splitSummaryTotal = await summaryTotalLabel.textContent();
    const total = parseFloat(await splitSummaryTotal.split('$')[1].trim());
    console.log(total);

    // confirm if the addition of tax and price of all orders is equal to total. 

    const expectedTotal = parseFloat(tax) + parseFloat(totalInventoryPrice);
    console.log(expectedTotal);

    await expect(total).toBe(expectedTotal);

    const finishBtn = page.locator("#finish");
    await expect(finishBtn).toBeVisible();
    await expect(finishBtn).toBeEnabled();
    await finishBtn.click();

    // Checkout COmplete page:-

    const headerText = page.locator(".complete-header");
    await expect(headerText).toHaveText("Thank you for your order!");

    const orderConfirmation = page.locator(".complete-text");
    await expect(orderConfirmation).toContainText("Your order has been dispatched");

    const backToHomeBtn = page.locator("#back-to-products");
    await expect(backToHomeBtn).toBeVisible();
    await expect(backToHomeBtn).toBeEnabled();
    await backToHomeBtn.click();

    // BackToHomePage:- 

    const menu = page.locator("#react-burger-menu-btn");
    const logOutBtn = page.locator("#logout_sidebar_link");

    await expect(menu).toBeVisible();
    await menu.click();

    await page.waitForTimeout(3000);

    await expect(logOutBtn).toBeVisible();
    await logOutBtn.click();

    // Back to Login Page- 

    await page.waitForTimeout(3000); 
    await expect(page).toHaveURL('https://www.saucedemo.com/');







    
    

});

