<template>
    <svg class="svg-icon" :class="className" aria-hidden="true">
        <use :xlink:href="iconName"></use>
    </svg>
</template>
<script>
import { ref, computed, onMounted } from '@vue/composition-api';
export default {
    name: "SvgIcon",
    props: { // 接收父级传入的变量数据
        icon: {
            type: String,
            default: ""
        },
        className : {
            type: String,
            default: ""
        }
    },
    setup(props){
        // 计算属性，得出最终结果，并返回
        const iconName = computed(() => `#icon-${props.icon}`);
        return {
            props,
            iconName
        }
    }
}
</script>
<style lang="scss" scoped>
.svg-icon {
    width: 1em;
    height: 1em;
    fill: currentColor;
}
</style>