import { ref, UnwrapRef, reactive, watch, WatchOptions } from 'vue';

const isObject = (o): o is object => {
  return typeof o === 'object';
}

const isFunction = (f): f is Function => {
  return typeof f === 'function';
}

export const useState = <T>(defaultValue: T) => {
  if (isObject(defaultValue)) {
    return useStateObj(defaultValue);
  }
  const state = ref(defaultValue);
  const set = (value: T): void => {
    state.value = value as UnwrapRef<T>;
  };
  return [state, set];
};

const useStateObj = <O extends object>(defaultObj: O) => {
  const obj = reactive(defaultObj);
  const set = (valueObj: O): void => {
    Object.entries(valueObj).forEach(([key, val]) => {
      obj[key] = val;
    });
  };
  return [obj, set];
}

export const useEffect = (effectHandler, dependencies) => {
  return watch(dependencies, (changedDependencies, prevDependencies, onCleanUp) => {
    const effectCleaner = effectHandler(changedDependencies, prevDependencies);
    if (isFunction(effectCleaner)) {
      onCleanUp(effectCleaner);
    }
  }, { immediate: true, deep: true } as WatchOptions);
}
