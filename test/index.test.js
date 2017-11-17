const mergeShallow = require('../lib');

describe('mergeShallow', () => {
  it('should preform a basic merge', () => {
    const obj1 = {
      1: {
        firstName: 'blake',
      },
    };

    const obj2 = {
      1: {
        lastName: 'guilloud',
      },
    };

    const sut = mergeShallow(obj1, obj2);

    expect(sut[1].firstName).toBe('blake');
    expect(sut[1].lastName).toBe('guilloud');
  });

  it('should persist data that exists in the first argument and not the second', () => {
    const obj1 = {
      1: {
        firstName: 'blake',
        gender: 'male',
      },
    };

    const obj2 = {
      1: {
        lastName: 'guilloud',
      },
    };

    const sut = mergeShallow(obj1, obj2);

    expect(sut[1].firstName).toBe('blake');
    expect(sut[1].lastName).toBe('guilloud');
    expect(sut[1].gender).toBe('male');
  });

  it('should persist overwrite nested objects and arrays', () => {
    const obj1 = {
      1: {
        firstName: 'blake',
        pets: ['kylo'],
        skills: {
          react: false,
        },
      },
    };

    const obj2 = {
      1: {
        lastName: 'guilloud',
        skills: {
          node: true,
        },
      },
    };

    const sut = mergeShallow(obj1, obj2);

    expect(sut[1].firstName).toBe('blake');
    expect(sut[1].lastName).toBe('guilloud');
    expect(sut[1].pets[0]).toBe('kylo');
    expect(sut[1].skills.node).toBe(true);
    expect(sut[1].skills.react).toBe(undefined);
  });
});