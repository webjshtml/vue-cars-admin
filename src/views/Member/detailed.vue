<template>
    <ul class="detailed">
        <li>
            <label>用户名：</label>
            <span>{{ data.username }}</span>
        </li>
        <li>
            <label>真实姓名：</label>
            <span>{{ data.truename }}</span>
        </li>
        <li>
            <label>性别：</label>
            <span>{{ data.gender === 1 ? "男" : "女"}}</span>
        </li>
        <li>
            <label>身份证（正面）</label>
            <span>
                <img :src="data.cardPhotoFace" />
            </span>
        </li>
        <el-row>
            <el-col :span="2">
                <div class="label">用户名：</div>
            </el-col>
            <el-col :span="22">
                <div class="label">{{ data.username }}</div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="2">
                <div class="label"></div>
            </el-col>
            <el-col :span="22" class="min-height-1">
                <div class="label ">{{ data.truename }}</div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="2">
                <div class="label">性别：</div>
            </el-col>
            <el-col :span="22">
                <div class="label">{{ data.gender === 1 ? "男" : "女"}}</div>
            </el-col>
        </el-row>
    </ul>
</template>

<script>
import { Detailed } from "@/api/member";
export default {
    name: '',
    components: {},
    props: {},
    data(){
        return {
            id: this.$route.query.id,
            data: {}
        }
    },
    beforeMount(){
        this.id && this.detailed()
    },
    methods: {
        detailed(){
            Detailed({ id: this.id }).then(response => {
                const data = response.data;
                data && (this.data = data);
            })
        }
        
    }
}
</script>
<style lang='scss' scoped>
.detailed { 
    line-height: 34px;
    li {
        display: flex;
        label { 
            width: 100px;
            font-weight: bold;
        }
        span {
            flex: 1;
        }
        img { width: 200px; }
    }
}
</style>