import CustomStyleSheet from '../../index';

beforeEach(() => {
  CustomStyleSheet.reset();
});

it('should return the original object when no plugin is provided', () => {
  const obj = {
    container: {
      flex: 1
    }
  };

  expect(CustomStyleSheet.create(obj)).toEqual(obj);
});
it('should take the plugin into account', () => {
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

it('should apply the globalVariable plugin', () => {
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
it('should apply the multiSelectors plugin', () => {
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
it('should apply the scalePlugin', () => {
  const obj = {
    container: {
      height: "100@vs",
      width: "100@s",
      zIndex: "-100@s",
    }
  };

  expect(CustomStyleSheet.create(obj)).toEqual({
    container: {
      height: 197,
      width: 215,
      zIndex: -215,
    }
  });
});

describe("inherits", () => {

  it('should apply the inheritPlugin', () => {
    const obj = {
      contentContainer: {
        width: 100,
      },
      container: {
        $inherits: "contentContainer",
        height: 100,
      }
    };

    expect(CustomStyleSheet.create(obj)).toEqual({
      contentContainer: {
        width: 100,
      },
      container: {
        width: 100,
        height: 100,
      }
    });
  });

  it('should override inherited', () => {
    const obj = {
      contentContainer: {
        width: 100,
      },
      container: {
        $inherits: "contentContainer",
        height: 100,
        width: 150,
      }
    };

    expect(CustomStyleSheet.create(obj)).toEqual({
      contentContainer: {
        width: 100,
      },
      container: {
        width: 150,
        height: 100,
      }
    });
  });

  it('should apply the inheritPlugin in a transitive way', () => {
    const obj = {
      topContainer: {
        zIndex: 0,
      },
      contentContainer: {
        $inherits: "topContainer",
        width: 100,
      },
      container: {
        $inherits: "contentContainer",
        height: 100,
      }
    };

    expect(CustomStyleSheet.create(obj)).toEqual({
      topContainer: {
        zIndex: 0,
      },
      contentContainer: {
        zIndex: 0,
        width: 100,
      },
      container: {
        zIndex: 0,
        width: 100,
        height: 100,
      }
    });
  });
  it('should apply the inheritPlugin in a transitive way', () => {
    const obj = {
      topContainer: {
        zIndex: 0,
      },
      contentContainer: {
        $inherits: "topContainer",
        width: 100,
      },
      container: {
        $inherits: "contentContainer",
        height: 100,
      }
    };

    expect(CustomStyleSheet.create(obj)).toEqual({
      topContainer: {
        zIndex: 0,
      },
      contentContainer: {
        zIndex: 0,
        width: 100,
      },
      container: {
        zIndex: 0,
        width: 100,
        height: 100,
      }
    });
  });
  it('should apply the inheritPlugin in a transitive way and override', () => {
    const obj = {
      topContainer: {
        zIndex: 0,
        color: "red",
      },
      contentContainer: {
        $inherits: "topContainer",
        width: 100,
        color: "blue",
      },
      container: {
        $inherits: "contentContainer",
        height: 100,
        zIndex: 100,
      }
    };

    expect(CustomStyleSheet.create(obj)).toEqual({
      topContainer: {
        zIndex: 0,
        color: "red",
      },
      contentContainer: {
        zIndex: 0,
        width: 100,
        color: "blue",
      },
      container: {
        zIndex: 100,
        width: 100,
        height: 100,
        color: "blue",
      }
    });
  });
  it('should inherits multiple targets', () => {
    const obj = {
      testContainer: {
        marginLeft: 0,
      },
      topContainer: {
        zIndex: 0,
      },
      contentContainer: {
        $inherits: "testContainer",
        width: 100,
      },
      container: {
        $inherits: ["contentContainer", "topContainer"],
        height: 100,
      }
    };

    expect(CustomStyleSheet.create(obj)).toEqual({
      testContainer: {
        marginLeft: 0,
      },
      topContainer: {
        zIndex: 0,
      },
      contentContainer: {
        marginLeft: 0,
        width: 100,
      },
      container: {
        zIndex: 0,
        width: 100,
        height: 100,
        marginLeft: 0,
      }
    });
  });
})
