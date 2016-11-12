import { WarehouseClientPage } from './app.po';

describe('warehouse-client App', function() {
  let page: WarehouseClientPage;

  beforeEach(() => {
    page = new WarehouseClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
