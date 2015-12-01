export default function (Vue, options) {
  const _ = Vue.util
  const store = options.store
  const subscriber = []
  const unsubscriber = []
  // bring redux to revue
  _.defineReactive(Vue.prototype, '$revue', store)
  // listen for state changes
  Vue.mixin({
    created () {
      if (subscriber.length > 0) {
        return
      }
      Object.keys(store.getState()).forEach(prop => {
        subscriber.push(prop)
        let currentValue
        const handleChange = () => {
          let previousValue = currentValue
          currentValue = store.getState()[prop]
          if (previousValue !== currentValue) {
            this.$set(prop, currentValue)
          }
        }
        unsubscriber.push(store.subscribe(handleChange))
      })
    }
  })
}
