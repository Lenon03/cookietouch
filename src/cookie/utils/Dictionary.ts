export default class Dictionary<T extends number | string, U> implements IterableIterator<{ key: T, value: U }> {
  private mKeys: T[] = [];
  private mValues: U[] = [];
  private mIteratorIndex: number = 0;

  private undefinedKeyErrorMessage: string = "Key is either undefined, null or an empty string.";

  constructor(init?: Array<{key: T, value: U}>) {
    if (!init) {
      return;
    }
    for (const item of init) {
      (this as any)[item.key] = item.value;
      this.mKeys.push(item.key);
      this.mValues.push(item.value);
    }
  }

  public add(key: T, value: U): void {

    const addAction = (mkey: T, mvalue: U): void => {
      if (this.containsKey(mkey)) {
        throw new Error("An element with the same key already exists in the dictionary.");
      }
      (this as any)[key] = value;
      this.mKeys.push(mkey);
      this.mValues.push(mvalue);
    };

    this.checkKeyAndPerformAction(addAction, key, value);
  }

  public remove(key: T): boolean {

    const removeAction = (mkey: T): boolean => {
      if (!this.containsKey(key)) {
        return false;
      }

      const index = this.mKeys.indexOf(mkey);
      this.mKeys.splice(index, 1);
      this.mValues.splice(index, 1);
      delete (this as any)[key];

      return true;
    };

    return (this.checkKeyAndPerformAction(removeAction, key)) as boolean;
  }

  public getValue(key: T): U {

    const getValueAction = (mmkey: T): U => {
      if (!this.containsKey(mmkey)) {
        return null;
      }

      const index = this.mKeys.indexOf(mmkey);
      return this.mValues[index];
    };

    return this.checkKeyAndPerformAction(getValueAction, key) as U;
  }

  public containsKey(key: T): boolean {

    const containsKeyAction = (mkey: T): boolean => {
      if (this.mKeys.indexOf(mkey) === -1) {
        return false;
      }
      return true;
    };

    return this.checkKeyAndPerformAction(containsKeyAction, key) as boolean;
  }

  public changeValueForKey(key: T, newValue: U): void {

    const changeValueForKeyAction = (mkey: T, mnewValue: U): void => {
      if (!this.containsKey(mkey)) {
        throw new Error("In the dictionary there is no element with the given key.");
      }

      const index = this.mKeys.indexOf(mkey);
      this.mValues[index] = mnewValue;
    };

    this.checkKeyAndPerformAction(changeValueForKeyAction, key, newValue);
  }

  public keys(): T[] {
    return this.mKeys;
  }

  public values(): U[] {
    return this.mValues;
  }

  public count(): number {
    return this.mValues.length;
  }

  public next(): IteratorResult<{ key: T, value: U }> {
    if (this.mIteratorIndex >= this.count() - 1) {
      this.mIteratorIndex = 0;
      return {
        done: true,
        value: null,
      };
    } else {
      const current = this.mIteratorIndex;
      this.mIteratorIndex++;
      return {
        done: false,
        value: { key: this.mKeys[current], value: this.mValues[current] },
      };
    }
  }

  public [Symbol.iterator](): IterableIterator<{ key: T, value: U }> {
    return this;
  }

  private isEitherUndefinedNullOrStringEmpty(object: any): boolean {
    return (typeof object) === "undefined" || object === null || object.toString() === "";
  }

  private checkKeyAndPerformAction(
    action: (key: T, value?: U) => void | U | boolean, key: T, value?: U): void | U | boolean {

    if (this.isEitherUndefinedNullOrStringEmpty(key)) {
      throw new Error(this.undefinedKeyErrorMessage);
    }

    return action(key, value);
  }
}
