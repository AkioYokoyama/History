import truncateTitle from '../popup/truncateTitle'
 
test('titleが空の場合、空が返る', () => {
    expect(truncateTitle(10, '')).toMatch('');
});
