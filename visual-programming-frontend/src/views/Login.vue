<template>
  <div id="login">
    <div class="contain">
       <canvas id="cas">抱歉，您的浏览器不支持canvas</canvas>
	</div>
    <el-card shadow="always" id="card">
        <h1 id="card-title">VP Platform</h1>
        <el-form label-position="left" class="form">
            <el-form-item label="用户名" required label-width="20%">
                <el-input v-model="username" ></el-input>
            </el-form-item>
            <el-form-item label="密码" required label-width="20%">
                <el-input v-model="password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button id="login-button" type="primary" @click="login">
                    登录
                </el-button>
            </el-form-item>
        </el-form>
    </el-card>
  </div>
</template>

<script>

export default {
    name: 'Login',
    data() {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        async login() {
            const res = await this.$http.get('/user')
            console.log(res.data);
            for (let idx in res.data) {
                const value = res.data[idx];
                if (value.username === this.username && value.password === this.password) {
                    sessionStorage.setItem('username', value.username)
                    this.$router.push('/')
                } else {
                    this.$message.error('用户名或密码错误')
                }
            }
        }
    },
    mounted() {
    }
}
</script>

<style lang="scss">

#cas {
    position: absolute;
    top:0px;
    left: 0px;
}
.contain {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
}

#login {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

#card {
    width: 60%;
    height: 50%;
    margin: 3rem;
}

.form {
    margin-top: 3rem;
}

#card-title {
    color: grey;
}

#login-button {
    width: 40%;
    font-size: large;
    font-weight: 400;
}
</style>