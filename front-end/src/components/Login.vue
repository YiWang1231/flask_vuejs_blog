<template>
    <div class="container">
<!--      v-bind：vairant 即alert标签最后为 alert-vriant-->
        <alert
        v-if='sharedState.is_new'
        v-bind:variant='alertVariant'
        v-bind:message='alertMessage'>
        </alert>
      <h1>Sign In</h1>
      <div class="row">
        <div class="col-md-4">
          <form @submit.prevent="onSubmit">
            <div class="form-group">
              <label for="username">Username</label>
              <input type="text" v-model="loginForm.username" class="form-control" v-bind:class="{'is-invalid': loginForm.usernameError}" id="username" placeholder="">
              <div v-show="loginForm.usernameError" class="invalid-feedback">{{ loginForm.usernameError }}</div>
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" v-model="loginForm.password" class="form-control" v-bind:class="{'is-invalid': loginForm.passwordError}" id="password" placeholder="">
              <div v-show="loginForm.passwordError" class="invalid-feedback">{{ loginForm.passwordError }}</div>
            </div>
            <button type="submit" class="btn btn-primary">Sign In</button>
          </form>
        </div>
      </div>
      <br>
      <p>New user? <router-link to="/register">Click here to register!</router-link></p>
      <p>
        Forget your password?
        <a href="#">Click here Reset It</a>
      </p>
    </div>
</template>

<script>
import Alert from './Alert'
import store from '../store'
import axios from 'axios'
    export default {
        name: "Login", // name of the component
        components: {
            alert:Alert
        },
        data() {
            return {
              // store.state = is_new: false
              sharedState: store.state,
              alertVariant: 'info',
              alertMessage: 'Congratulations, you are now a registered user!',
              loginForm: {
                username: '',
                password: '',
                submitted: false,
                errors: 0,
                usernameError: null,
                passwordError: 0
              }

            }
        },
      methods: {
        onSubmit (e) {
          this.loginForm.submitted = true
          this.loginForm.errors = 0

          if (!this.loginForm.username) {
            this.loginForm.errors++
            this.loginForm.usernameError = "Username required."
          } else {
            this.loginForm.usernameError = null
          }

          if (!this.loginForm.password) {
            this.loginForm.errors++
            this.loginForm.passwordError = 'Password required.'
          } else {
            this.loginForm.passwordError = null
          }

          if (this.loginForm.errors > 0) {
            // handle the error 前端验证失败则返回false，不会通过axios调取后端接口
            return false
          }

          const path = '/tokens' // 不需要完成的API地址
          // axios 实现Basic Auth需要在Config中设置auth这个属性即可
          // post(url, data, config)
          // config{ auth {'username', 'password'}}
          this.$axios.post(path, {}, {
            auth: {
              'username': this.loginForm.username,
              'password': this.loginForm.password
            }
          }).then((response) => {
            //handle success
            // idnex.js中判断blog-token
            window.localStorage.setItem('blog-token', response.data.token)
            store.resetNotNewAction()
            store.loginAction()
            if (typeof this.$route.query.redirect == 'undefined') {
              this.$router.push('/')
            } else {
              this.$router.push(this.$route.query.redirect)
            }
          })
            .catch((error) => {
              // handle error
              // status or status_code??
              if (error.response.status == 401) {
                this.loginForm.usernameError = 'Invalid username or password.'
                this.loginForm.passwordError = 'Invalid username of password.'
              } else {
                console.log(error.response)
              }
            })
        }
      }
    }
</script>
