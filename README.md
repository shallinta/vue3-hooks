# Vue3 hooks

[![npm package](https://img.shields.io/npm/v/vue3-hooks.svg)](https://www.npmjs.org/package/vue3-hooks)
[![npm download](https://img.shields.io/npm/dt/vue3-hooks.svg)](https://www.npmjs.org/package/vue3-hooks)
[![github license](https://img.shields.io/github/license/shallinta/vue3-hooks.svg)](https://github.com/shallinta/vue3-hooks/blob/master/LICENSE)
[![github issues open](https://img.shields.io/github/issues/shallinta/vue3-hooks.svg)](https://github.com/shallinta/vue3-hooks/issues?q=is%3Aopen+is%3Aissue)
[![github issues closed](https://img.shields.io/github/issues-closed/shallinta/vue3-hooks.svg)](https://github.com/shallinta/vue3-hooks/issues?q=is%3Aissue+is%3Aclosed)
![github language top](https://img.shields.io/github/languages/top/shallinta/vue3-hooks.svg)
[![github stars](https://img.shields.io/github/stars/shallinta/vue3-hooks.svg?style=social&label=Stars)](https://github.com/shallinta/vue3-hooks)  

[![NPM](https://nodei.co/npm/vue3-hooks.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/vue3-hooks)

> Using vue3.x composition api in react-hooks style.

The react-like vue3 hooks are implemented just with composition api, requiring no any other dependencies but vue3.

If you are used to react hooks, and new to vue 3, you will try this. In this case, however, I suggest learning original composition api. It's easy :D.

<b>
What `vue3-hooks` really make sense is that so many third-party hooks library based on react can now easily migrate to vue technolegy stack.
</b>
If you are an author of third-party react hooks, you may consider to use `vue3-hooks` to migrate your library to vue family. Very few code modification is required.

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

## Recently updated

See [CHANGELOG](CHANGELOG.md) here.

## LICENSE

[MIT](LICENSE)
