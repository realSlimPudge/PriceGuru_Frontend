const express = require('express');
const cors = require('cors');
const puppeteer = require('puppeteer');
const { JSDOM } = require('jsdom');
const app = express();
const port = 3001;

app.use(cors());

app.get('/api/search', async (req, res) => {
  const query = req.query.q;
  const count = parseInt(req.query.count, 10) || 10; // По умолчанию 10 карточек

  if (!query) {
    return res.status(400).json({ error: 'Отсутствует параметр запроса' });
  }

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`https://www.wildberries.ru/catalog/0/search.aspx?search=${encodeURIComponent(query)}`);

    await page.waitForSelector('.product-card', { timeout: 60000 });

    const html = await page.content();
    const dom = new JSDOM(html);
    const items = dom.window.document.querySelectorAll('.product-card');

    if (items.length === 0) {
      console.error('Товары не найдены');
      await browser.close();
      return res.status(500).json({ error: 'Товары не найдены' });
    }

    const productsData = Array.from(items).slice(0, count).map(item => {
      const link = item.querySelector('.product-card__link');
      const image = item.querySelector('.j-thumbnail');
      const price = item.querySelector('.price__lower-price');
      const oldPrice = item.querySelector('del');
      const brand = item.querySelector('.product-card__brand');
      const name = item.querySelector('.product-card__name');

      return {
        href: link ? link.href : '',
        image: image ? image.src : '',
        price: price ? price.textContent.trim() : '',
        oldPrice: oldPrice ? oldPrice.textContent.trim() : '',
        brand: brand ? brand.textContent.trim() : '',
        name: name ? name.textContent.trim() : ''
      };
    });

    await browser.close();
    res.json(productsData);
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error);
    res.status(500).json({ error: 'Ошибка при загрузке данных', details: error.message });
  }
});

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
