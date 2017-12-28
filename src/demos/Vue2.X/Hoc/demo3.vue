<template>
  <div id="demo">

    <h3>baseComponent</h3>
    <base-component foo="bar" @hello="hello" @click.native="native">
        ⑤ default-slot
        <h4 slot="test">③ test-slot</h4>
    </base-component>
    <hr/>

    <h3>HOC04</h3>
    <enhanced-component4 foo="bar" @hello="hello" @click.native="native">
        ⑤ default-slot
        <h4 slot="test">③ test-slot</h4>
    </enhanced-component4>
    <hr/>
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
</style>
