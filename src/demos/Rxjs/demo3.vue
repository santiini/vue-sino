<template>
  <div>
    <h4>vue-rx</h4>
    <input v-model="search">

    <div v-if="results">
      <h1>{{results.term}}</h1>
      <ul v-if="results.matches.length">
        <li v-for="(match,i) of results.matches" :key="i">
          <a :href="match.url">{{match.title}}</a>
          <p>{{ match.description }}</p>
        </li>
      </ul>

      <p v-else>No matches found</p>
    </div>
  </div>
</template>

<script>
  /* eslint-disable */
  import Rx from 'rxjs/Rx'

  export default {
    name: 'rxjs-demo3',
    data() {
      return {
        search: ''
      }
    },
    subscriptions() {
      return {
        results: this.$watchAsObservable('search')
          .pluck('newValue')
          .filter(text => text.length > 5)
          .debounceTime(500)
          .distinctUntilChanged()
          .switchMap(fetchTerm)
          .map(formatResult)
      }
    }
  }

function fetchTerm (term) {
  console.log(term)
  return Rx.Observable.fromPromise($.ajax({
    url: 'http://en.wikipedia.org/w/api.php',
    dataType: 'jsonp',
    data: {
      action: 'opensearch',
      format: 'json',
      search: term
    }
  }).promise())
}
function formatResult (res) {
  return {
    term: res[0],
    matches: res[1].map((title, i) => ({
      title: title,
      description: res[2][i],
      url: res[3][i]
    }))
  }
}
</script>

<style lang="stylus" scoped>

</style>

