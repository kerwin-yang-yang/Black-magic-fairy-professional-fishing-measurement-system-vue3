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

import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import NotificationBarInCard from "@/components/NotificationBarInCard.vue";
import TableProjectManage from '@/components/TableProjectManage.vue';
import TableUser from "@/components/Tables/TableUser.vue";
import TableSampleClients from "@/components/TableSampleClients.vue";
import TableUserManage from "@/components/TableUserManage.vue";
import { get } from "lodash";
import http from "@/request/http";


onMounted(() => {
    loadData()
})
const tablething = ref(null)
// 判断数据是否加载
let isDataLoaded = ref(false)
const selectOptions = [
    { id: 1, label: "Business development" },
    { id: 2, label: "Marketing" },
    { id: 3, label: "Sales" },
];
const isModalActive = ref(false);
const isModalDangerActive = ref(false);
const isAddActive = ref(false);
const updateVisiable = ref(false)
const formStatusWithHeader = ref(true);
const isQueryActive = ref(false)
const formStatusCurrent = ref(0);
const formStatusOptions = ["info", "success", "danger", "warning"];
const checkedOnes = ref([])
let testdata = reactive(null)
let allData = reactive([])
let queryInfo = ref({
    id: '',
    username: '',
    sysrole: '',
    orgid: '',
    is_locked: '',
    is_frozen: '',
})
let queryData = ref({
    id: '33333',
    username: '33333333',
    sysrole: '3333333',
    orgid: '33333333',
    is_locked: '3333333',
    is_frozen: '3333333',
})
let showData = reactive({
    data: []
})
const updateInfo = reactive({
    id: '',
    username: '',
    sysrole: '',
    is_frozen: '',
    is_locked: '',
    orgid: null,
    comment: '无',
    password: '必填项',
})
const addFormData = reactive({
    id: '',
    username: '',
    password: '',
    orgid: '',
    sysrole: '',
    comment: '',
    email: '',
})
// 加载数据
const loadData = async () => {
    http.get('/user/')
        .then((response) => {
            allData = response.data.children
            showData.data = allData
            isDataLoaded.value = true
        })
}
// 存储中间数据
const form = ref({
});

//后面的user对应属性还没有改

const show = (thing) => {

    form = testdata.find(obj => obj.id == thing);
    console.log(form)
    isModalActive.value = true

};

const edit = (thing) => {

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

const formStatusSubmit = () => {
    formStatusCurrent.value = formStatusOptions[formStatusCurrent.value + 1]
        ? formStatusCurrent.value + 1
        : 0;
};

const addForm = () => {
    form.orgid = parseInt(addFormData.orgid);
    http.post('/user/', addFormData)
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
        })
}




const lock = (thing) => {
    // console.log(thing)
    http.patch('/user/' + thing + '/action/lock')
        .then((response) => {
            console.log(response)
            message.value = '操作成功'
            isDone.value = true
        })
}
const unlock = (thing) => {
    // console.log(thing)
    http.patch('/user/' + thing + '/action/unlock')
        .then((response) => {
            console.log(response)
            message.value = '操作成功'
            isDone.value = true
        })
}
const froze = (thing) => {
    // console.log(thing)
    http.patch('/user/' + thing + '/action/freeze')
        .then((response) => {
            console.log(response)
            message.value = '操作成功'
            isDone.value = true
        })
}
const unfroze = (thing) => {
    // console.log(thing)
    http.patch('/user/' + thing + '/action/unfreeze')
        .then((response) => {
            console.log(response)
            message.value = '操作成功'
            isDone.value = true
        })
}
const lockUnlock = (thing) => {
    if (thing.is_locked == false) {
        http.patch('/user/' + thing.id + '/action/lock')
            .then((response) => {
                console.log(response)
                message.value = '操作成功'
                isDone.value = true
            })
    } else {
        http.patch('/user/' + thing.id + '/action/unlock')
            .then((response) => {
                console.log(response)
                message.value = '操作成功'
                isDone.value = true
            })
    }
}
const freezeUnfreeze = (thing) => {
    if (thing.is_frozen == false) {
        http.patch('/user/' + thing.id + '/action/freeze')
            .then((response) => {
                console.log(response)
                message.value = '操作成功'
                isDone.value = true
            })
    } else {
        http.patch('/user/' + thing.id + '/action/unfreeze')
            .then((response) => {
                console.log(response)
                message.value = '操作成功'
                isDone.value = true
            })
    }
}

const shut = (thing) => {
    tablething.value = thing
    isModalDangerActive.value = true
}
const confirmShut = () => {
    http.delete('/user/' + tablething.value)
        .then((response) => {
            console.log(response)
            message.value = '操作成功'
            isDone.value = true
        })
}
const update = (thing) => {
    tablething.value = thing
    updateVisiable.value = true
}
const confirmUpdate = () => {
    updateInfo.orgid = parseInt(updateInfo.orgid);
    http.put('/user/' + tablething.value.id, {
        username: updateInfo.username,
        sysrole: updateInfo.sysrole,
        password: updateInfo.password,
        orgid: updateInfo.orgid,
        comment: updateInfo.comment,
    }).then(response => {
        console.log(response.data)
        message.value = '操作成功'
        isDone.value = true
    })
        .catch(error => {
            console.error(error);
        });
    console.log(updateInfo)
}


const add = () => {
    isAddActive.value = true;
}
const confirmAdd = () => {
    addFormData.orgid = parseInt(addFormData.orgid);
    http.post('/user/', {
        username: addFormData.username,
        orgid: addFormData.orgid,
        email: addFormData.email,
        comment: addFormData.comment,
        sysrole: addFormData.sysrole,
        password: addFormData.password,
    })
        .then((response) => {
            console.log(response)
            message.value = '操作成功'
            isDone.value = true
        })
}
const handleCheckedRows = (thing) => {
    checkedOnes.value = thing
    console.log(checkedOnes.value)
}
const selectedLock = () => {
    checkedOnes.value.forEach((user) => {
        // console.log(task)
        http.patch('/user/' + user.id + '/action/lock').then(response => {
            console.log(response.data)
            message.value = '操作成功'
            isDone.value = true
        }).catch(error => {
            console.error(error);
        })
    })
}
const selectedUnlock = () => {
    checkedOnes.value.forEach((user) => {
        // console.log(task)
        http.patch('/user/' + user.id + '/action/unlock').then(response => {
            console.log(response.data)
            message.value = '操作成功'
            isDone.value = true
        }).catch(error => {
            console.error(error);
        })
    })
}
const selectedFroze = () => {
    checkedOnes.value.forEach((user) => {
        // console.log(task)
        http.patch('/user/' + user.id + '/action/freeze').then(response => {
            console.log(response.data)
            message.value = '操作成功'
            isDone.value = true
        }).catch(error => {
            console.error(error);
        })
    })
}
const selectedUnfroze = () => {
    checkedOnes.value.forEach((user) => {
        // console.log(user)
        http.patch('/user/' + user.id + '/action/unfreeze').then(response => {
            console.log(response.data)
            message.value = '操作成功'
            isDone.value = true
        }).catch(error => {
            console.error(error);
        })
    })
}
const selectedDelete = () => {
    checkedOnes.value.forEach((user) => {
        // console.log(task)
        http.delete('/user/' + user.id).then(response => {
            console.log(response.data)
            message.value = '操作成功'
            isDone.value = true
        }).catch(error => {
            console.error(error);
        })
    })
}
const queryById = async () => {
    // isQueryActive.value = true
    await http.get('/user/' + queryInfo.value.id).then(response => {
        queryData.value = response.data;
    })
        .catch(error => {
            console.error(error);
        });
    queryDialog()
}
const queryDialog = () => {
    console.log(queryData)
    isQueryActive.value = true
}

const ShowOne = ref()
const ShowFind = ref(false);
const result = ref()
const findOne = () => {
    console.log(showData.data)
    if (showData.data != null) {
        result.value = showData.data.filter(item => {
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


const isDone = ref(false)
const message = ref('')
const changeData = () => {
    loadData()
    isDone.value = false
}
</script>

<template>
    <LayoutAuthenticated>
        <CardBoxModal v-model="isDone" title="消息提醒" button="danger" has-cancel @confirm="changeData">
            <p>{{ message }}</p>
        </CardBoxModal>
        <CardBoxModal v-model="ShowFind" title="查找结果" button="danger" has-cancel @confirm="ShowFind = false">
            <CardBox v-if="result == []">
                <p>
                    没有数据
                </p>
            </CardBox>
            <CardBox v-for="item in result" style="border:2px solid">
                <!-- {{ item }} -->
                <FormField label="姓名">
                    <FormControl v-model="item.username" :icon="mdiAccount" isdisabled=true />

                </FormField>
                <FormField label="角色">
                    <FormControl v-model="item.sysrole" :icon="mdiAccount" isdisabled=true />

                </FormField>
                <FormField label="邮箱">
                    <FormControl v-model="item.email" type="tel" :icon="mdiMail" isdisabled=true />
                </FormField>
            </CardBox>

        </CardBoxModal>
        <CardBoxModal v-model="updateVisiable" title="修改人员信息" button="info" has-cancel @confirm="confirmUpdate">
            <FormField label="用户名">
                <FormControl v-model="updateInfo.username" :icon="mdiAccount" />
            </FormField>
            <FormField label="密码">
                <FormControl v-model="updateInfo.password" :icon="mdiAccount" />
            </FormField>
            <FormField label="组织">
                <FormControl v-model="updateInfo.orgid" :icon="mdiAccount" />
            </FormField>
            <FormField label="角色">
                <FormControl v-model="updateInfo.sysrole" :icon="mdiAccount" />
            </FormField>
            <FormField label="备注">
                <FormControl v-model="updateInfo.comment" :icon="mdiAccount" />
            </FormField>
        </CardBoxModal>

        <CardBoxModal v-model="isQueryActive" title="查询结果">
            <FormField label="编号">
                <FormControl v-model="queryData.id" :icon="mdiAccount" isdisabled=true />
            </FormField>
            <FormField label="用户名">
                <FormControl v-model="queryData.username" :icon="mdiAccount" isdisabled=true />
            </FormField>
            <FormField label="组织">
                <FormControl v-model="queryData.orgid" :icon="mdiAccount" isdisabled=true />
            </FormField>
            <FormField label="角色">
                <FormControl v-model="queryData.sysrole" :icon="mdiAccount" isdisabled=true />
            </FormField>
            <FormField label="是否锁定">
                <FormControl v-model="queryData.is_locked" :icon="mdiAccount" isdisabled=true />
            </FormField>
            <FormField label="是否冻结">
                <FormControl v-model="queryData.is_frozen" :icon="mdiAccount" isdisabled=true />
            </FormField>
        </CardBoxModal>



        <CardBoxModal v-model="isAddActive" title="增加人员" button="info" has-cancel @confirm="confirmAdd">
            <FormField label="邮箱">
                <FormControl v-model="addFormData.email" :icon="mdiAccount" />
            </FormField>
            <FormField label="用户名">
                <FormControl v-model="addFormData.username" type="email" :icon="mdiMail" />
            </FormField>
            <FormField label="密码">
                <FormControl v-model="addFormData.password" type="email" :icon="mdiMail" />
            </FormField>
            <FormField label="组织">
                <FormControl v-model="addFormData.orgid" type="email" :icon="mdiMail" disabled />
            </FormField>
            <FormField label="角色">
                <FormControl v-model="addFormData.sysrole" type="email" :icon="mdiMail" />
            </FormField>
            <FormField label="备注">
                <FormControl v-model="addFormData.comment" type="email" :icon="mdiMail" />
            </FormField>




        </CardBoxModal>

        <CardBoxModal v-model="isModalDangerActive" title="Please confirm" button="danger" has-cancel
            @confirm="confirmShut">
            <h6>确定要删除id为{{ tablething }}的成员吗</h6>
        </CardBoxModal>

        <SectionMain>
            <SectionTitleLineWithButton :icon="mdiTableBorder" title="用户管理" main>
                <BaseButton href="https://github.com/kerwin-yang-yang/vue3" target="_blank" :icon="mdiGithub"
                    label="Star on GitHub" color="contrast" rounded-full small />
            </SectionTitleLineWithButton>
            <FormField>
                <BaseButtons>

                    <BaseButton color="info" label="新增" outline rounded-full @buttonclick="add" />
                    <BaseButton color="danger" label="删除" outline rounded-full @buttonclick="selectedDelete" />
                    <BaseButton color="warning" label="冻结" outline rounded-full @buttonclick="selectedFroze" />
                    <BaseButton color="success" label="解冻" outline rounded-full @buttonclick="selectedUnfroze" />
                    <BaseButton color="warning" label="锁定" outline rounded-full @buttonclick="selectedLock" />
                    <BaseButton color="success" label="解锁" outline rounded-full @buttonclick="selectedUnlock" />

                </BaseButtons>
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
                        <TableUser checkable :data1="showData.data" @update-checked-rows="handleCheckedRows"
                            @lockUnlockButton="lockUnlock" @freezeUnfreezeButton="freezeUnfreeze" @updatebutton="update"
                            @delbutton="shut" />
                        <!-- <TableUser checkable :data1="showData" @update-checked-rows="handleCheckedRows" @lockbutton="lock" @unlockbutton="unlock" @frozebutton="froze" @unfrozebutton="unfroze" @updatebutton="update" @delbutton="shut" /> -->
                    </CardBox>
                </template>
                <template #fallback>

                    <div>Loading...</div>
                </template>
            </Suspense>

        </SectionMain>


    </LayoutAuthenticated>
</template>
