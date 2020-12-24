<template>
  <div>控制台</div>
</template>

<script>
import { OrderList } from "@/api/order";
export default {
  name: "ConsoleIndex",
  components: {},
  props: {},
  mounted(){
    OrderList({
      pageSize: 10,
      pageNumber: 1
    }).then(response => {

    })
  }
  
}
</script>
<style lang="scss" scoped>
</style>