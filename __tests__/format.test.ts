const { formatCoords } = require('../utils/format');

describe('formatCoords', () => {
  it('formats coordinates to 4 decimal places', () => {
    const lat = 37.4220936;
    const lon = -122.083922;
    const result = formatCoords(lat, lon);
    expect(result).toBe('37.4221, -122.0839');
  });
});
