const puppeteer = require('puppeteer')

describe('AddItemForm', () => {
    it('Base example, visually looks correct', async () => {
        // APIs from jest-puppeteer
        const browser = await puppeteer.launch()
        const page = await browser.newPage();
        await page.goto('http://localhost:9009/iframe.html?id=todolist-additemform--add-item-form-base');
        const image = await page.screenshot();

        // API from jest-image-snapshot
        expect(image).toMatchImageSnapshot();
    });
});
