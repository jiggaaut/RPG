mp.game.graphics.notify("Loaded nbank.shop");

setInterval(() => {
  mp.game.invoke("0x9E4CFFF989258472");
  mp.game.invoke("0xF4F2C0D4EE209E20");
}, 25000);

let browser: BrowserMp;

mp.events.add({
  guiReady: () => {
    browser = mp.browsers.new("package://nbank/index.html");
    mp.gui.cursor.show(false, false);
  },
  shopInventory: (value: string) => {
    browser.execute(`trigger('shopInventory', '${value}')`);
    if (value.length > 0) {
      mp.gui.cursor.show(true, true);
    }
  },
  responsePreviewProduct: (success: boolean, errorMessage: string) => {
    browser.execute(
      `trigger('responsePreviewProduct', ${success}, '${errorMessage}')`
    );
  },
  responseBuyProduct: (success: boolean, errorMessage: string) => {
    browser.execute(
      `trigger('responseBuyProduct', ${success}, '${errorMessage}')`
    );
  },
  onMessageFromServer: (value: string) => {
    browser.execute(`trigger('onMessage', '${value}')`);
  },
});

mp.events.add(
  "buyProduct",
  (item: number, variant: number, paymentType: string) => {
    mp.events.callRemote("buyProduct", item, variant, paymentType);
  }
);

mp.events.add("previewProduct", (item, variant) => {
  mp.events.callRemote("previewProduct", item, variant);
});

mp.keys.bind(0x71, true, () => {
  mp.events.callRemote("triggerInteraction");
});

mp.events.add("initialized", () => {
  mp.game.graphics.notify(`The Framework was loaded`);
  mp.gui.cursor.show(false, false);
});

mp.events.add("logToChat", (value) => {
  mp.game.graphics.notify(value);
});

mp.events.add("closeShop", () => {
  mp.gui.cursor.show(false, false);
});
