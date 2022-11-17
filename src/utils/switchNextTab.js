async function switchNextTab(driver) {
  const originalWindow = await driver.getAllWindowHandles();
  await driver.switchTo().window(originalWindow[originalWindow.length - 1]);
}

module.exports = switchNextTab;
