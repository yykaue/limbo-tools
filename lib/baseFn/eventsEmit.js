/**
 *Created by limbo <yykaue@qq.com> on 2021/4/1.
 */

// eslint-disable-next-line no-unused-vars
class EventsEmit {
  constructor (key) {
    this.events = {}
    this._addListenerStorage()
  }

  spaceName = '__@EventsEmit__'

  storageChange = (e) => {
    const { key, newValue } = e
    if (key.startsWith(this.spaceName)) {
      const eventName = key.replace(this.spaceName, '')
      const events = this.events[eventName] || (this.events[eventName] = [])
      let payload
      try {
        payload = JSON.parse(newValue) || { arg: [] }
      } catch {
        payload = { arg: [] }
      }
      events.forEach(fn => fn.apply(null, payload.arg))
    }
  }

  _addListenerStorage () {
    window.addEventListener('storage', this.storageChange)
  }

  $destroy () {
    window.removeEventListener('storage', this.storageChange)
  }

  $on (eventName, hanlder) {
    const events = this.events[eventName] || (this.events[eventName] = [])
    if (events.every(fn => fn !== hanlder)) {
      events.push(hanlder)
    }
  }

  $un (eventName, hanlder) {
    if (!eventName) {
      this.events = {}
      return
    }
    if (!this.events[eventName]) {
      return
    }
    if (!hanlder) {
      this.events[eventName] = []
      return
    }

    const events = this.events[eventName]
    if (!Array.isArray(events)) {
      return
    }
    let i = 0
    while (i < events.length) {
      if (events[i] === hanlder) {
        break
      }
      i++
    }
    if (i < events.length) {
      events.splice(i, 1)
    }
  }

  $emit (eventName, arg = [], _self = true) {
    if (_self) {
      const events = this.events[eventName] || (this.events[eventName] = [])
      events.forEach(fn => fn.apply(null, arg))
    } else {
      const payload = {
        arg,
        key: `${Date.now()}-${Math.random()}`
      }
      localStorage.setItem(this.spaceName + eventName, JSON.stringify(payload))
    }
  }
}
