# Vue3 hooks

> Using vue3.x composition api in react-hooks style.

The react-like vue3 hooks are implemented just with composition api, requiring no any other dependencies but vue3.

If you are used to react hooks, and new to vue 3, you will try this.

However, I suggest learning original composition api. It's easy :D.

## install

```sh
npm install --save vue3-hooks
```

## features

- [x] useState (use `ref` and `reactive` from vue)
- [x] useEffect (use `watch` from vue)
- [ ] *WIP*: more react-like hooks

> `useCallback` is no need because `setup` will only been run once.

## usage

```javascript
import { computed } from 'vue';
import { useState, useEffect } from 'vue3-hooks';
import ajaxFetch from 'ajax-fetch-esm';
// ...

<p>{{ id }}</p>
<p>Counter: {{ count }}</p>
<p>{{ data.toString() }}</p>

// ...
setup(props) {
  // ...

  // all vue apps prefer using counter for example instead of hello world.
  const [count, setCount] = useState(0);
  const [data, setData] = useState({});

  // yes, vue3 composition api allow us passing an async function.
  // normal functions are also ok.
  // `() => props.id` means watching a computed vue3 variable.
  useEffect(async ([nextCount, nextId], [prevCount, prevId]) => {
    const timer = setTimeout(() => {
      setData(await ajaxFetch.get({ current: nextCount, id: nextId }));
    }, 500);
    // clean up
    return () => {
      clearTimeout(timer);
    };
  }, [count, () => props.id]);

  // ...
  return {
    // ...
    count,
    data,
    id: computed(() => props.id),
    // ...
  };
}
// ...

```
