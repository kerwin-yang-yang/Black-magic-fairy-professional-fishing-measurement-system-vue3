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
import { onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'
import WAVES from 'vanta/dist/vanta.waves.min.js'

const form = reactive({
  login: "john.doe",
  pass: "highly-secure-password-fYjUw-",
  remember: true,
});
const vantaRef = ref(null); // 使用ref创建一个响应式引用
let vantaEffect;

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
onBeforeUnmount(() => {
  if (vantaEffect) {
    vantaEffect.destroy()
  }
})
const router = useRouter();

const submit = () => {
  router.push("/dashboard");
};
</script>

<template>
  <LayoutGuest>

    <div ref="vantaRef" style="width:100%;height:100vh">
      <div class="my_title">
        <div class="auth-user-testimonial">
          <!-- <p class="text-center"><img src="@src/state/logo3.jpg" alt height="100" /></p>
          <p class="text-center"><img src="@src/state/name.png" alt height="30" /></p> -->
          <!-- <p
															class="font-size-24 font-weight-bold text-white mb-1 text-center">
															officeShield
														</p> -->
          <p class="font-size-24 font-weight-bold mb-1 text-center">
            面向在线办公的隐私泄露 </p>

          <p class="font-size-24 font-weight-bold mb-1 text-center">
            多维感知与溯源防护系统</p>
        </div>
      </div>
    </div>
    <SectionFullScreen v-slot="{ cardClass }" bg="purplePink">
      <CardBox :class="cardClass" is-form @submit.prevent="submit">
        <FormField label="Login" help="Please enter your login">
          <FormControl v-model="form.login" :icon="mdiAccount" name="login" autocomplete="username" />
        </FormField>

        <FormField label="Password" help="Please enter your password">
          <FormControl v-model="form.pass" :icon="mdiAsterisk" type="password" name="password"
            autocomplete="current-password" />
        </FormField>

        <FormCheckRadio v-model="form.remember" name="remember" label="Remember" :input-value="true" />

        <template #footer>
          <BaseButtons>
            <!-- <BaseButton to="/dashboard" type="submit" color="info" label="Login" />
            <BaseButton to="/dashboard" color="info" outline label="Back" /> -->
            <!-- <BaseButton label="Done" to="/dashboard" color="danger" /> -->
            <BaseButton type="submit" color="info" label="Login" />
            <BaseButton to="/dashboard" color="info" outline label="Back" />
          </BaseButtons>
        </template>
      </CardBox>
    </SectionFullScreen>
    <SectionFullScreen v-slot="{ cardClass }" bg="purplePink">
      <CardBox :class="cardClass" is-form @submit.prevent="submit">
        <FormField label="Login" help="Please enter your login">
          <FormControl v-model="form.login" :icon="mdiAccount" name="login" autocomplete="username" />
        </FormField>

        <FormField label="Password" help="Please enter your password">
          <FormControl v-model="form.pass" :icon="mdiAsterisk" type="password" name="password"
            autocomplete="current-password" />
        </FormField>

        <FormCheckRadio v-model="form.remember" name="remember" label="Remember" :input-value="true" />

        <template #footer>
          <BaseButtons>
            <!-- <BaseButton to="/dashboard" type="submit" color="info" label="Login" />
            <BaseButton to="/dashboard" color="info" outline label="Back" /> -->
            <!-- <BaseButton label="Done" to="/dashboard" color="danger" /> -->
            <BaseButton type="submit" color="info" label="Login" />
            <BaseButton to="/dashboard" color="info" outline label="Back" />
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
  font-size: 15px;
  font-weight: bolder;
}
</style>