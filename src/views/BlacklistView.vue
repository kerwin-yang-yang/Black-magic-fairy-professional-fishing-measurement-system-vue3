<script setup>
import { reactive, ref, onMounted, Suspense } from "vue";
import CardBoxModal from "@/components/CardBoxModal.vue";
import { mdiBallotOutline, mdiAccount, mdiMail, mdiGithub, mdiTableBorder } from "@mdi/js";
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
import UserAvatar from "@/components/UserAvatar.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import NotificationBarInCard from "@/components/NotificationBarInCard.vue";


import TableBlacklist from "@/components/Tables/TableBlacklist.vue";
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
    await http.get('/phishing_event/')
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
    http.put('/organization/' + id, form.value)
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
            message.value = response.data
            isDone.value = true
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
            message.value = response.data
            loadData()
        })
    isDone.value = true
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

const isdelteALL = ref(false)
const deleteOnesBefore = () => {
    isdelteALL.value = true
}
const deleteOnes = () => {
    checkedOnes.value.forEach((item) => {
        const id = item.id;
        http.delete(`/organization/${id}`)
            .then((response) => {
                console.log(`成功删除行: ${id}`, response);
            })
            .catch((error) => {
                console.log(`删除行失败: ${id}`, error);
            });
    });
    isdelteALL.value = false
    message.value = '删除成功'
    isDone.value = true
}
const checkedOnes = ref([])
const handleCheckedRows = (thing) => {
    checkedOnes.value = thing
    console.log(checkedOnes.value)
}

const isDone = ref(false)
const message = ref('')
const searchOne = ref(null)
// const searchData = () => {
//   console.log(searchOne.value);
//   let foundData = testdata.filter(
//     obj => Object.values(obj).includes(searchOne.value)
//   );

//   console.log(foundData);
// };
const searchData = () => {
    console.log(searchOne.value);
    console.log(testdata);
    let foundData = testdata.filter(item =>
        Object.values(item).includes(String(searchOne.value))
    );

    console.log(foundData);
};

const ShowOne = ref()
const ShowFind = ref(false);
const result = ref()
const findOne = () => {
    if (testdata != null) {
        result.value = testdata.filter(item => {
            return Object.values(item).some(value => {
                if (typeof value === 'number') {
                    // 将数字转换为字符串，然后判断是否包含查询字符串
                    return String(value).includes();
                } else if (typeof value === 'string') {
                    return value.includes(ShowOne.value);
                }
                // 如果属性值不是字符串或数字，则忽略该属性
                return false;
            });
        });
    } else {
        result.value = [];
    }

    ShowFind.value = true

    console.log(result.value);

}
</script>

<template>
    <LayoutAuthenticated>
        <CardBoxModal v-model="ShowFind" title="查找结果" button="danger" has-cancel @confirm="ShowFind = false">
            <CardBox v-if="result == []">
                <p>
                    没有数据
                </p>
            </CardBox>
            <CardBox v-for="item in result" style="border:2px solid">
                {{ item }}
                <!-- <FormField label="日志id">
                    <FormControl v-model="item.id" :icon="mdiAccount" isdisabled=true />

                </FormField>
                <FormField label="日志类型">
                    <FormControl v-model="item.type" :icon="mdiAccount" isdisabled=true />

                </FormField>
                <FormField label="执行人">
                    <FormControl v-model="item.operator" type="tel" :icon="mdiMail" isdisabled=true />
                </FormField> -->
            </CardBox>

        </CardBoxModal>
        <CardBoxModal v-model="isDone" title="消息提醒" button="danger" has-cancel @confirm="isDone = false">
            <p>{{ message }}</p>
        </CardBoxModal>
        <CardBoxModal v-model="isdelteALL" title="确定删除选定的所有组织吗" button="danger" has-cancel @confirm="deleteOnes">
        </CardBoxModal>
        <CardBoxModal v-model="isModalActive" title="修改组织信息" button="info" has-cancel @confirm="updateForm">

            <FormField label="公司名字">
                <FormControl v-model="form.name" :icon="mdiAccount" />

            </FormField>
            <FormField label="意见">
                <FormControl v-model="form.comments" type="tel" />


            </FormField>

            <FormField label="公司logo">
                <UserAvatar :avatar="form.logopath" class="w-24 h-24 mx-auto lg:w-6 lg:h-6" />

            </FormField>



            <FormField label="修改logo" help="Do not enter the leading zero">

                <FormFilePicker label="Upload" @update:model-value="uploadLogo" />
            </FormField>
            <FormField label="是否锁定" help="Do not enter the leading zero">
                <FormControl v-model="form.islocked" type="tel" />

            </FormField>
            <FormField label="是否冻结" help="Do not enter the leading zero">
                <FormControl v-model="form.isfrozen" type="tel" />
            </FormField>
            <FormField label="是否冻结" help="Do not enter the leading zero">
                <FormControl v-model="form.isfrozen" type="tel" />
            </FormField>
            <FormField label="是否是顶尖" help="Do not enter the leading zero">
                <FormControl v-model="form.istoporg" type="tel" isdisabled=true />
            </FormField>

            <FormField label="最上头公司id" help="Do not enter the leading zero">
                <FormControl v-model="form.higherorgid" type="tel" isdisabled=true />
            </FormField>
            <FormField label="客户联系" help="Do not enter the leading zero">
                <FormControl v-model="form.clientcontact" type="tel" />
            </FormField>

            <FormField label="意见" help="Do not enter the leading zero">
                <FormControl v-model="form.comments" type="tel" />
            </FormField>

        </CardBoxModal>

        <CardBoxModal v-model="isAddActive" title="增加组织" button="info" has-cancel @confirm="addForm">

            <FormField label="基本信息">
                <FormControl v-model="form.name" :icon="mdiAccount" isdisabled=true />
            </FormField>
            <FormField label="基本信息">
                <FormControl v-model="form.logopath" type="email" :icon="mdiMail" />

            </FormField>
            <FormField label="信息">
                <FormControl v-model="form.istoporg" type="email" :icon="mdiMail" />
            </FormField>
            <FormField label="基本信息">
                <FormControl v-model="form.higherorgid" type="email" :icon="mdiMail" />

            </FormField>
            <FormField label="信息">
                <FormControl v-model="form.islocked" type="email" :icon="mdiMail" disabled />
            </FormField>

            <FormField label="基本信息">
                <FormControl v-model="form.frozenbyuid" type="email" :icon="mdiMail" disabled />
            </FormField>
            <FormField label="信息">
                <FormControl v-model="form.clientcontact" type="email" :icon="mdiMail" />

            </FormField>

            <FormField label="基本信息">
                <FormControl v-model="form.comments" type="email" :icon="mdiMail" />
            </FormField>



        </CardBoxModal>


        <CardBoxModal v-model="isModalDangerActive" title="Please confirm" button="danger" has-cancel @confirm="deleteBack">
            <h6>确定要删除id为{{ tablething }}的组织吗</h6>
        </CardBoxModal>

        <SectionMain>
            <SectionTitleLineWithButton :icon="mdiTableBorder" title="中招" main>
                <BaseButton href="https://github.com/kerwin-yang-yang/vue3" target="_blank" :icon="mdiGithub"
                    label="Star on GitHub" color="contrast" rounded-full small />
            </SectionTitleLineWithButton>
            <FormField>
                <!-- <BaseButtons>
                    <BaseButton color="success" label="新增" outline rounded-full @buttonclick="add" />
                    <BaseButton color="danger" label="批量删除" outline rounded-full @buttonclick="deleteOnesBefore" />
                    <BaseButton color="danger" label="查询" outline rounded-full @buttonclick="" />
                </BaseButtons> -->
                <el-form :inline="true" class="form" style="margin-top: 20px;">
                    <el-form-item>
                        <FormControl v-model="ShowOne" :icon="mdiAccount" placeholder="查询内容" />
                    </el-form-item>
                    <el-form-item>
                        <BaseButtons>
                            <BaseButton color="danger" label="查询" outline rounded-full @buttonclick="findOne" />
                        </BaseButtons>
                    </el-form-item>

                </el-form>

            </FormField>

            <Suspense>
                <template #default>
                    <CardBox class="mb-6" has-table v-if="isDataLoaded">
                        <TableBlacklist checkable :data1="testdata" @stopbutton="edit" @deletebutton="deleteOne"
                            :checkedRows="checkedOnes" />
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
