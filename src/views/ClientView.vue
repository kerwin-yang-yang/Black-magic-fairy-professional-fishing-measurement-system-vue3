<script setup>
import { reactive, ref, onMounted, Suspense } from "vue";
import CardBoxModal from "@/components/CardBoxModal.vue";
import { mdiBallotOutline, mdiAccount, mdiMail, mdiGithub,mdiTableBorder  } from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import FormCheckRadioGroup from "@/components/FormCheckRadioGroup.vue";
import FormFilePicker from "@/components/FormFilePicker.vue";
import NotificationBar from "@/components/NotificationBar.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import BaseDivider from "@/components/BaseDivider.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import SectionTitle from "@/components/SectionTitle.vue";

import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import NotificationBarInCard from "@/components/NotificationBarInCard.vue";

import TableClient from "@/components/Tables/TableClient.vue";

import { get } from "lodash";
import http from "@/request/http";

const selectOptions = [
    { id: 1, label: "Business development" },
    { id: 2, label: "Marketing" },
    { id: 3, label: "Sales" },
];

onMounted(() => {
    loadData()
})

let isDataLoaded = ref(false)
const loadData = async () => {
    await http.get('/user/')
        .then((response) => {
            // console.log(testdata);
            // console.log(response.data);
            testdata = response.data.children
            console.log(testdata);
            isDataLoaded.value = true

        })
        .catch((error) => {
            console.log(error);
        })
}
const form = ref({

});

const customElementsForm = reactive({
    checkbox: ["lorem"],
    radio: "one",
    switch: ["one"],
    file: null,
});
let testdata = reactive(null)

const show = (thing) => {
    // console.log(thing)
    // tablething.value = thing
    form = testdata.find(obj => obj.id == thing);
    console.log(form)
    isModalActive.value = true

};
const tablething = ref(null)
const edit = (thing) => {


    // console.log(thing)
    tablething.value = thing
    form.value = testdata.find(obj => obj.id == thing);
    console.log(form.value)
    isModalActive.value = true

};
const updateForm = () => {
    const id = form.value.id
    delete form.value.createtime;
    delete form.value.freezetime;
    delete form.value.id;
    delete form.value.modifytime;
    http.put('/user/' + id, form.value)
        .then((response) => {
            console.log(response)
        })
}
const deleteOne = (thing) => {
    console.log(thing)
    tablething.value = thing

    isModalDangerActive.value = true

};
const deleteBack = () => {

    http.delete('/organization/' + tablething.value)
        .then((response) => {
            console.log(response)
        })
}
const isModalActive = ref(false);

const isModalDangerActive = ref(false);
const isAddActive = ref(false);

const formStatusWithHeader = ref(true);

const formStatusCurrent = ref(0);

const formStatusOptions = ["info", "success", "danger", "warning"];

const formStatusSubmit = () => {
    formStatusCurrent.value = formStatusOptions[formStatusCurrent.value + 1]
        ? formStatusCurrent.value + 1
        : 0;
};
const add = () => {

    form.value = {
        "name": "string",
        "logopath": "N/A",
        "istoporg": false,
        "higherorgid": 0,
        "islocked": false,
        "isfrozen": false,
        "frozenbyuid": 0,
        "clientcontact": "string",
        "comments": "string"
    }

    isAddActive.value = true;
    // http.post('/organization/', form.value)
    //   .then((response) => {
    //     console.log(response)
    //   })
    console.log('ok')
}
const addForm = () => {
    http.post('/organization/', form.value)
        .then((response) => {
            console.log(response)
        })
}
const uploadLogo = (thing) => {
    // 构建 FormData 对象并设置请求参数
    const formData = new FormData();
    formData.append('file', thing, '头像6.jpeg');
    formData.append('name', form.value.name);
    console.log(thing)
    http.post('/organization/logo', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
        .then((response) => {
            form.value.logopath = "http://192.168.94.97:5000/" + response.data.url
            updateForm()
            console.log()
        })
}
</script>

<template>
    <LayoutAuthenticated>


        <CardBoxModal v-model="isModalActive" title="修改组织信息" button="info" has-cancel @confirm="updateForm">

            <FormField label="名字       /    logo地址">
                <FormControl v-model="form.name" :icon="mdiAccount" />

                <FormControl v-model="form.logopath" type="email" :icon="mdiMail" />
            </FormField>
            <FormField label="logo上传">
                <FormFilePicker label="Upload" @update:model-value="uploadLogo" />
            </FormField>

            <FormField label="是否冻结   /   是否锁定" help="Do not enter the leading zero">
                <FormControl v-model="form.isfrozen" type="tel" />
                <FormControl v-model="form.islocked" type="tel" />
            </FormField>


        </CardBoxModal>

        <CardBoxModal v-model="isAddActive" title="增加组织" button="info" has-cancel @confirm="addForm">

            <FormField label="信息">
                <FormControl v-model="form.name" :icon="mdiAccount" />
                <FormControl v-model="form.logopath" type="email" :icon="mdiMail" />



            </FormField>
            <FormField label="信息">
                <FormControl v-model="form.istoporg" type="email" :icon="mdiMail" />
                <FormControl v-model="form.higherorgid" type="email" :icon="mdiMail" />
            </FormField>

            <FormField label="信息">
                <FormControl v-model="form.islocked" type="email" :icon="mdiMail" disabled />
                <FormControl v-model="form.frozenbyuid" type="email" :icon="mdiMail" disabled />
            </FormField>
            <FormField label="信息">
                <FormControl v-model="form.clientcontact" type="email" :icon="mdiMail" />
                <FormControl v-model="form.comments" type="email" :icon="mdiMail" />
            </FormField>



        </CardBoxModal>


        <CardBoxModal v-model="isModalDangerActive" title="Please confirm" button="danger" has-cancel @confirm="deleteBack">
            <h6>确定要删除id为{{ tablething }}的组织吗</h6>
        </CardBoxModal>

        <SectionMain>
            <SectionTitleLineWithButton :icon="mdiTableBorder" title="Tables" main>
                <BaseButton href="https://github.com/kerwin-yang-yang/vue3" target="_blank" :icon="mdiGithub"
                    label="Star on GitHub" color="contrast" rounded-full small />
            </SectionTitleLineWithButton>
            <FormField>
                <BaseButtons>
                    <!-- <BaseButton color="success" label="新增" outline rounded-full @buttonclick="add" />
                    <BaseButton color="danger" label="批量删除" outline rounded-full @buttonclick="" /> -->
                    <BaseButton color="success" label="新增" outline rounded-full @buttonclick="add" />
                    <BaseButton color="danger" label="删除" outline rounded-full @buttonclick="" />
                    <BaseButton color="info" label="冻结" outline rounded-full @buttonclick="" />
                    <BaseButton color="warning" label="解冻" outline rounded-full @buttonclick="" />
                    <BaseButton color="contrast" label="导入" outline rounded-full @buttonclick="" />
                    <BaseButton color="contrast" label="下载" outline rounded-full @buttonclick="" />

                </BaseButtons>
                <el-form :inline="true" class="form" style="margin-top: 20px;">
                    <el-form-item>
                        <FormControl v-model="form.name" :icon="mdiAccount" placeholder="查询内容" />
                    </el-form-item>
                    <el-form-item>
                        <BaseButtons>
                            <BaseButton color="danger" label="查询" outline rounded-full @buttonclick="" />
                        </BaseButtons>
                    </el-form-item>

                </el-form>

            </FormField>
            <!-- <CardBox class="mb-12" has-table>
        <TableSampleClients checkable />

      </CardBox> -->
            <Suspense>
                <template #default>
                    <CardBox class="mb-6" has-table v-if="isDataLoaded">
                        <TableClient checkable :data1="testdata" @showbutton="show" @editbutton="edit"
                            @deletebutton="deleteOne" @freezebutton="" @unfreezebutton="" />
                    </CardBox>
                </template>
                <template #fallback>

                    <div>Loading...</div>
                </template>
            </Suspense>
            <!-- <CardBox class="mb-6" has-table v-if="isDataLoaded">
        <TableUserManage checkable :data1="testdata" @showbutton="show" @editbutton="edit" @deletebutton="deleteOne" />

      </CardBox> -->

            <!-- <SectionTitleLineWithButton :icon="mdiBallotOutline" title="Forms example" main>Array
        <BaseButton href="https://github.com/justboil/admin-one-vue-tailwind" target="_blank" :icon="mdiGithub"
          label="Star on GitHub" color="contrast" rounded-full small />
      </SectionTitleLineWithButton>
      <CardBox form @submit.prevent="submit">
        <FormField label="Grouped with icons">
          <FormControl v-model="form.name" :icon="mdiAccount" />
          <FormControl v-model="form.clientcontact" type="email" :icon="mdiMail" />
        </FormField>

        <FormField label="With help line" help="Do not enter the leading zero">
          <FormControl v-model="form.phone" type="tel" placeholder="Your phone number" />
        </FormField>

        <FormField label="Dropdown">
          <FormControl v-model="form.department" :options="selectOptions" />
        </FormField>

        <BaseDivider />

        <FormField label="Question" help="Your question. Max 255 characters">
          <FormControl type="textarea" placeholder="Explain how we can help you" />
        </FormField>

        <template #footer>
          <BaseButtons>
            <BaseButton type="submit" color="info" label="Submit" />
            <BaseButton type="reset" color="info" outline label="Reset" />
          </BaseButtons>
        </template>
      </CardBox> -->
        </SectionMain>

        <!-- <SectionTitle>Custom elements</SectionTitle>

      <SectionMain>
        <CardBox>
          <FormField label="Checkbox">
            <FormCheckRadioGroup v-model="customElementsForm.checkbox" name="sample-checkbox"
              :options="{ lorem: 'Lorem', ipsum: 'Ipsum', dolore: 'Dolore' }" />
          </FormField>

          <BaseDivider />

          <FormField label="Radio">
            <FormCheckRadioGroup v-model="customElementsForm.radio" name="sample-radio" type="radio"
              :options="{ one: 'One', two: 'Two' }" />
          </FormField>

          <BaseDivider />

          <FormField label="Switch">
            <FormCheckRadioGroup v-model="customElementsForm.switch" name="sample-switch" type="switch"
              :options="{ one: 'One', two: 'Two' }" />
          </FormField>

          <BaseDivider />

          <FormFilePicker v-model="customElementsForm.file" label="Upload" />
        </CardBox>

        <SectionTitle>Form with status example</SectionTitle>

        <CardBox class="md:w-7/12 lg:w-5/12 xl:w-4/12 shadow-2xl md:mx-auto" is-form is-hoverable
          @submit.prevent="formStatusSubmit">
          <NotificationBarInCard :color="formStatusOptions[formStatusCurrent]"
            :is-placed-with-header="formStatusWithHeader">
            <span><b class="capitalize">{{
              formStatusOptions[formStatusCurrent]
            }}</b>
              state</span>
          </NotificationBarInCard>
          <FormField label="Fields">
            <FormControl v-model="form.name" :icon-left="mdiAccount" help="Your full name" placeholder="Name" />
          </FormField>

          <template #footer>
            <BaseButton label="Trigger" type="submit" color="info" />
          </template>
        </CardBox>
      </SectionMain> -->
    </LayoutAuthenticated>
</template>
