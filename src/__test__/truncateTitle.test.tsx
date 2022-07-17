import truncateTitle from '../popup/truncateTitle'
 
test('titleが空の場合、空が返る', () => {
    expect(truncateTitle(10, '')).toMatch('');
});

test('titleが指定文字数より多い場合、指定文字数で切られる', () => {
    expect(truncateTitle(10, '01234567890')).toMatch('0123456789');
});

test('titleが指定文字数以下の場合、すべて表示される', () => {
    expect(truncateTitle(10, '0123456789')).toMatch('0123456789');
});
