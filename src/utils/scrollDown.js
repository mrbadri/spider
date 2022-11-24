const { By } = require('selenium-webdriver');

async function scrollDown(driver) {
  const wrap = await driver.findElement(By.css('#wrap'));
  const footer = await driver.findElement(By.css('#footer'));
  const wrapH = (await wrap.getRect()).height;
  const footerH = (await footer.getRect()).height;

  console.log('scroll down:', wrapH, footerH);

  await driver
    .actions()
    .scroll(0, 0, 0, wrapH)
    .perform();
}

module.exports = scrollDown;
