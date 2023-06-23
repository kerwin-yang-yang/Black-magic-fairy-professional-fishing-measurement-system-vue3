<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { mdiAccount, mdiAsterisk } from "@mdi/js";
import SectionFullScreen from "@/components/SectionFullScreen.vue";
import CardBox from "@/components/CardBox.vue";
import FormCheckRadio from "@/components/FormCheckRadio.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import LayoutGuest from "@/layouts/LayoutGuest.vue";
import { onMounted, onBeforeUnmount } from 'vue';
import { useMainStore } from '@/stores/main.js'
import * as THREE from 'three';
import WAVES from 'vanta/dist/vanta.waves.min.js'
import http from "@/request/http";
const form = reactive({
  email: "wpc@qq.com",
  password: "wpc",
  remember: true,
  verify_code: null
});
const vantaRef = ref(null); // 使用ref创建一个响应式引用
let vantaEffect;
const mess = ref(null);

onMounted(() => {
  vantaEffect = WAVES({
    el: vantaRef.value,
    THREE: THREE
  })
  VANTA.WAVES({
    el: vantaRef.value,
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    shininess: 150.00,
    waveHeight: 40.00,
    waveSpeed: 1.35,
    zoom: 0.65,
    color: 0x210062
  })
})
onBeforeUnmount((form) => {
  if (vantaEffect) {
    vantaEffect.destroy()
  }
})
const router = useRouter();

const submit = async (form) => {
  // 登录验证
  await useMainStore().login(form)
  // console.log(useMainStore().login(form))
  if (useMainStore().islogined) {
    console.log(useMainStore().tryLoginMess)
    mess.value = useMainStore().tryLoginMess;
    router.push("/dashboard");
  }
  else {
    console.log(useMainStore().tryLoginMess)
    mess.value = useMainStore().tryLoginMess;
    router.push("/login");
  }

};
const getImg = () => {
  http.get('/auth/verify_code', {
    responseType: 'blob',

  })
    .then((res) => {
      console.log(res.data)
      const blob = new Blob([res.data], { type: 'image/gif' });
      verifyimg.value = window.URL.createObjectURL(blob)

    })
}
const verifyimg = ref('https://img0.baidu.com/it/u=2673243120,3070690751&fm=253&fmt=auto&app=138&f=JPEG?w=417&h=211')
const Xsubmit = () => {

}
</script>

<template>
  <LayoutGuest>
    <SectionFullScreen v-slot="{ cardClass }" bg="pinkRed" style="z-index: 1000;" v-if="mess">
      <CardBox :class="cardClass">
        <div class="space-y-3">
          <h1 class="text-2xl">Login failed</h1>

          <p>{{ mess }}</p>
        </div>

        <template #footer>
          <BaseButtons>
            <BaseButton label="Done" @click="mess = null" color="danger" />
          </BaseButtons>
        </template>
      </CardBox>
    </SectionFullScreen>
    <div ref="vantaRef" style="width:100%;height:100vh">
      <div class="my_title">
        <div class="auth-user-testimonial">
          <!-- <p class="text-center"><img src="@src/state/logo3.jpg" alt height="100" /></p>
          <p class="text-center"><img src="@src/state/name.png" alt height="30" /></p> -->
          <!-- <p
															class="font-size-24 font-weight-bold text-white mb-1 text-center">
															officeShield
														</p> -->
          <img src="/src/state/logo.png" alt height="50" style="margin-left:42%" />

          <!-- <img src="@src/state/name.png" alt height="30" /> -->
          <p class="font-size-24 font-weight-bold mb-1 text-center">
            黑魔仙专业钓鱼测评平台</p>

          <!-- <p class="font-size-24 font-weight-bold mb-1 text-center">
            </p>
          <p class="font-size-24 font-weight-bold mb-1 text-center">
            </p> -->
        </div>
      </div>
    </div>
    <SectionFullScreen v-slot="{ cardClass }" bg="purplePink">

      <CardBox :class="cardClass" is-form @submit.prevent="submit(form)">
        <h1 style="font-size:30px;margin-left:45%"><strong>登录</strong></h1>
        <FormField label="邮箱" help="Please enter your login">
          <FormControl v-model="form.email" :icon="mdiAccount" name="login" autocomplete="username" />
        </FormField>

        <FormField label="密码" help="Please enter your password">
          <FormControl v-model="form.password" :icon="mdiAsterisk" type="password" name="password"
            autocomplete="current-password" />
        </FormField>
        <FormField label="验证码" help="Please enter your password">
          <FormControl v-model="form.verify_code" :icon="mdiAsterisk" autocomplete="current-password" />
          <div style="display:flex"><img />
            <!-- 点击可变的验证码图片 -->
            <img width="60" height="30" @click="getImg" :src="verifyimg">
          </div>
        </FormField>

        <FormCheckRadio v-model="form.remember" name="remember" label="Remember" :input-value="true" />

        <template #footer>
          <BaseButtons>
            <!-- <BaseButton to="/dashboard" type="submit" color="info" label="Login" />
            <BaseButton to="/dashboard" color="info" outline label="Back" /> -->
            <!-- <BaseButton label="Done" to="/dashboard" color="danger" /> -->
            <BaseButton type="submit" color="info" label="登录" />
            <BaseButton to="/dashboard" color="info" outline label="取消" />
          </BaseButtons>
        </template>
      </CardBox>
    </SectionFullScreen>
    <SectionFullScreen v-slot="{ cardClass }" bg="purplePink">
      <CardBox :class="cardClass" is-form @submit.prevent="Xsubmit">
        <h1 style="font-size:30px;margin-left:45%"><strong>注册</strong></h1>
        <FormField label="邮箱" help="Please enter your login">
          <FormControl v-model="form.email" :icon="mdiAccount" name="login" autocomplete="username" />
        </FormField>
        <FormField label="名字" help="Please enter your login">
          <FormControl v-model="form.name" :icon="mdiAccount" name="login" autocomplete="username" />
        </FormField>
        <FormField label="密码" help="Please enter your login">
          <FormControl v-model="form.password" :icon="mdiAccount" type="password" name="login" autocomplete="username" />
        </FormField>


        <FormField label="再次输入密码" help="Please enter your login">
          <FormControl v-model="form.password" :icon="mdiAccount" type="password" name="login" autocomplete="username" />
        </FormField>

        <FormCheckRadio name="remember" label="Remember" :input-value="true" />


        <!-- v-model="form.remember" -->
        <template #footer>
          <BaseButtons>
            <!-- <BaseButton to="/dashboard" type="submit" color="info" label="Login" />
            <BaseButton to="/dashboard" color="info" outline label="Back" /> -->
            <!-- <BaseButton label="Done" to="/dashboard" color="danger" /> -->
            <BaseButton type="submit" color="info" label="注册" />
            <BaseButton to="/dashboard" color="info" outline label="取消" />
          </BaseButtons>
        </template>
      </CardBox>
    </SectionFullScreen>

  </LayoutGuest>
</template>
<style  >
.my_title {
  z-index: 999;
  position: relative;

  top: 35%;
  /* left: 4%;
	right: 4%; */
  color: aquamarine;
  font-size: 30px;
  font-weight: bolder;
}
</style>