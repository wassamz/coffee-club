import { CoffeeClub2Page } from './app.po';

describe('coffee-club2 App', function() {
  let page: CoffeeClub2Page;

  beforeEach(() => {
    page = new CoffeeClub2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
