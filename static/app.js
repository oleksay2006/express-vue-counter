const App = {
  data() {
    return {
      counter: 0,
      caution: false
    }
  },
  methods: {
    setCookie(name, value, expires, path, domain, secure) {
      var curCookie = name + "=" + escape(value) +
        ((expires) ? "; expires=" + expires.toGMTString() : "") +
        ((path) ? "; path=" + path : "") +
        ((domain) ? "; domain=" + domain : "") +
        ((secure) ? "; secure" : "")
      if (!this.caution || (name + "=" + escape(value)).length <= 4000)
        document.cookie = curCookie
      else
        if (confirm("Cookie exceeds 4KB and will be cut!"))
          document.cookie = curCookie
    },
    getCookie(name) {
      var prefix = name + "="
      var cookieStartIndex = document.cookie.indexOf(prefix)
      if (cookieStartIndex == -1)
        return null
      var cookieEndIndex = document.cookie.indexOf(";", cookieStartIndex + prefix.length)
      if (cookieEndIndex == -1)
        cookieEndIndex = document.cookie.length
      return unescape(document.cookie.substring(cookieStartIndex + prefix.length, cookieEndIndex))
    },
    deleteCookie(name, path, domain) {
      if (this.getCookie(name)) {
        document.cookie = name + "=" +
          ((path) ? "; path=" + path : "") +
          ((domain) ? "; domain=" + domain : "") +
          "; expires=Thu, 01-Jan-70 00:00:01 GMT"
      }
    },
    fixDate(date) {
      var base = new Date(0)
      var skew = base.getTime()
      if (skew > 0)
        date.setTime(date.getTime() - skew)
    }
  },
  mounted() {
    var now = new Date()
    this.fixDate(now)
    now.setTime(now.getTime() + 365 * 24 * 60 * 60 * 1000)
    var visits = this.getCookie("counter")
    if (!visits)
      visits = 1
    else
      visits = parseInt(visits) + 1
    this.setCookie("counter", visits, now)
    // document.write("You have been here " + visits + " time(s).")
    this.counter = visits;
  }
}
Vue.createApp(App).mount('#app')