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

  it('should overwrite nested objects and arrays', () => {
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

  it('should preform complex merges', () => {
    const obj1 = {
      1: {
        firstName: 'blake',
        pets: ['kylo'],
        skills: {
          react: false,
        },
        parents: {
          mark: {
            type: 'father',
            firstName: 'mark',
            lastName: 'guilloud',
          },
          alison: {
            type: 'mother',
            firstName: 'alison',
            lastName: 'guilloud',
            parents: {
              bobbie: {
                firstName: 'barbara',
                lastName: 'bailey',
              },
            },
          },
        },
      },
    };

    const obj2 = {
      1: {
        lastName: 'guilloud',
        skills: {
          node: true,
        },
        pets: ['kylo', 'leia'],
        parents: {
          alison: {
            type: 'mother',
            firstName: 'alison',
            lastName: 'bailey',
            parents: {
              barbara: {
                firstName: 'barbara',
                lastName: 'bailey',
              },
              ray: {
                firstName: 'ray',
                lastName: 'bailey',
              },
            },
          },
        },
      },
    };

    const sut = mergeShallow(obj1, obj2);

    expect(sut[1].firstName).toBe('blake');
    expect(sut[1].lastName).toBe('guilloud');
    expect(sut[1].pets[0]).toBe('kylo');
    expect(sut[1].pets[1]).toBe('leia');
    expect(sut[1].skills.node).toBe(true);
    expect(sut[1].skills.react).toBe(undefined);
    expect(sut[1].parents.mark).toBe(undefined);
    expect(sut[1].parents.alison.lastName).toBe('bailey');
    expect(sut[1].parents.alison.parents.ray.lastName).toBe('bailey');
  });
});