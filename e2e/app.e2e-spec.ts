import { AngularPuremvcPage } from './app.po';

describe('angular-puremvc App', () => {
  let page: AngularPuremvcPage;

  beforeEach(() => {
    page = new AngularPuremvcPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
