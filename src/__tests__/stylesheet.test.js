import CustomStyleSheet from '../../index';

beforeEach(() => {
  CustomStyleSheet.reset();
});

it('when we pass an object, it returns the same', () => {
  const obj = {
    container: {
      flex: 1
    }
  };

  expect(CustomStyleSheet.create(obj)).toEqual(obj);
});
it('when we add a plugin, it should take it into account', () => {
  CustomStyleSheet.addPlugin((object) => {
    return {
      container: {
        flex: 2,
      }
    };
  });

  const obj = {
    container: {
      flex: 1
    }
  };

  expect(CustomStyleSheet.create(obj)).toEqual({
    container: {
      flex: 2,
    }
  });
});

it('when we define global variables, it replaces the values by their value', () => {
  const obj = {
    $redColor: 'red',
    container: {
      color: '$redColor'
    }
  };

  expect(CustomStyleSheet.create(obj)).toEqual({
    container: {
      color: 'red',
    }
  });
});
it('when we define multiple selectors separated by |, it should copy their values', () => {
  const obj = {
    container: {
      borderWidth: 1,
    },
    block: {
      borderWidth: 2,
      color: "red",
    },
    'block|container|test': {
      borderRadius: 3,
    },
    'block|container': {
      width: 100,
      height: 100,
    }
  };

  expect(CustomStyleSheet.create(obj)).toEqual({
    container: {
      borderWidth: 1,
      borderRadius: 3,
      width: 100,
      height: 100,
    },
    block: {
      borderWidth: 2,
      borderRadius: 3,
      color: "red",
      width: 100,
      height: 100,
    },
    test: {
      borderRadius: 3,
    }
  });
});
it('should scale the values', () => {
  const obj = {
    container: {
      height: "100@vs",
      width: "100@s",
    }
  };

  expect(CustomStyleSheet.create(obj)).toEqual({
    container: {
      height: 197,
      width: 215,
    }
  });
});
