<template>
    <div ref="editorDom"></div>
</template>

<script>
// 富文本编辑器
import Editor from "wangeditor";
export default {
   name: '',
   components: {},
   mounted(){
        this.editor = new Editor(this.$refs.editorDom);
        this.editor.customConfig.onchange = html => {
            this.$emit("update:content", html);
        };
        this.editor.create(); // 创建富文本实例
   },
   props: {
       isClear: {
           type: Boolean,
           default: false
       },
       value: {
           type: String,
           default: ""
       }
   },
   watch: {
       isClear: {
           handler(){
               this.editor.txt.clear();
           }
       },
       value: {
           handler(newValue){
               this.editor.txt.html(newValue);
           }
       }
   }
}
</script>
<style lang='scss' scoped>
</style>