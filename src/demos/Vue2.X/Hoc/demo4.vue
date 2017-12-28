<template>
  <div id="app">
    <h4>This is the Normal component rendered as-is:</h4>
    <base-test
      @update="alert($event)"
      @click.native="handleNativeClick"
      :message="message"
    >
    <p>This goes into the default slot</p>
    <p slot="test">this goes into the test slot</p>
    <template slot="withScope" slot-scope="{message}">
      <p>This is a scoped slot, it received the message: {{message}}</p>
    </template>
    </base-test>

    <hr>
    <h4>This is the same component wrapped in a HOC</h4>
    <hoc
      @update="alert($event)"
      @click.native="handleNativeClick"
      :message="message"
    >
      <p>This goes into the default slot</p>
      <p slot="test">this goes into the test slot</p>
      <template slot="withScope" slot-scope="{message}">
      <!-- <template slot="withScope" scope="{message}"> -->
        <p>This is a scoped slot, it received the message: {{message}}</p>
      </template>
    </hoc>
</div>

</template>


<style scoped>
.demo {
  padding: 20px 80px 50px;
}

h3 {
  color: red;
}

h4 {
  background-color: yellow;
}

h5 {
  background-color: #ff4200;
  color: white;
}

p {
  background-color: #00cc66;
}

code {
  display: block;
  background-color: #ff9933;
  font-size: 15px;
}

hr {
  background-color: transparent;
  border: none;
  height: 100px;
}
.default {
  background-color: blue;
  color: white;
}

.test {
  background-color: green;
  color: black;
}

.with-scope {
  background-color: orange;
  color: black;
}
</style>
