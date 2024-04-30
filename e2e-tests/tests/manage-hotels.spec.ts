import { test, expect } from "@playwright/test";
import path from "path";

const UI_URL = "http://localhost:5173/";


test.beforeEach(async ({ page }) => {
    await page.goto(UI_URL);

    // get the sign in button and click it
    await page.getByRole("link", { name: "Sign In" }).click();
  
    await expect (page.getByRole("heading", { name: "Sign In" })).toBeVisible();
  
    await page.locator("[name= email]").fill ("Arbaz@gmail.com");
    await page.locator("[name= password]").fill ("654321");
  
    await page.getByRole("button", { name: "Login" }).click();
  
    await expect(page.getByText("Login Successful")).toBeVisible();});

    test("should allow user to add a hotel", async ({ page }) => {
        await page.goto(`${UI_URL}add-hotel`);

        await page.locator('[name="name"]').fill("Test Hotel");
await page.locator('[name="city"]').fill("Test City");
await page.locator('[name="country"]').fill("Test Country");
await page.locator('[name="description"]').fill("This is the description for the Test Hotel");
await page.locator('[name="pricePerNight"]').fill("100");


        await page.selectOption('select[name="starRating"]', "3");  

        await page.getByText("Hall").click();
        await page.getByLabel("Parking").check();
        await page.getByLabel("Catering Included").check();

        await page.locator('[name="adultCount"]').fill("2");
        await page.locator('[name="childCount"]').fill("4");

        await page.setInputFiles('[name="imagesFiles"]', [
            path.join(__dirname, "files", "hall.jpg"),
            path.join(__dirname, "files", "photo.jpg"),
        ] );

        await page.getByRole("button", { name: "Save" }).click();
        // await expect(page.getByText("Hotel saved")).toBeVisible();

    });


    //commented out the below
    test("should display hotels", async ({ page }) => {
        await page.goto(`${UI_URL}my-hotels` , { waitUntil: 'networkidle' });

        await expect(page.getByText("White Rose")).toBeVisible({ timeout: 10000 });
        await expect(page.getByText("White Rose Marquee")).toBeVisible();
        await expect(page.getByText("ISLAMABAD, Pakistan")).toBeVisible();
        await expect(page.getByText("Marquee/Banquet")).toBeVisible();
        await expect(page.getByText("998 per head")).toBeVisible();
        await expect(page.getByText("100 adults, 47 children")).toBeVisible();
        await expect(page.getByText("5 Star Rating")).toBeVisible();
        
        await expect(page.getByRole("link", {name: "View Details"})) .toBeVisible();
        await expect(page.getByRole("link", {name: "Add Hotel"})) .toBeVisible();

    });
    