<script setup>
import { computed, ref, defineEmits, onMounted, nextTick } from "vue";
import { useMainStore } from "@/stores/main";
import { mdiEye, mdiTrashCan } from "@mdi/js";
import CardBoxModal from "@/components/CardBoxModal.vue";
import TableCheckboxCell from "@/components/TableCheckboxCell.vue";
import BaseLevel from "@/components/BaseLevel.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import BaseButton from "@/components/BaseButton.vue";
import UserAvatar from "@/components/UserAvatar.vue";
import FormCheckRadio from "@/components/FormCheckRadio.vue";
import { data } from "browserslist";
import { replaceTable } from "@/stores/replace";
import { replaceValue } from "@/stores/valueReplace";

const props = defineProps({
    checkable: Boolean,
    data1: Array,
});
console.log(props)
const emits = defineEmits(['stopbutton', 'deletebutton', 'recoverybutton', 'lockoutbutton', 'unlockbutton', 'generatebutton', 'updatebutton', 'downloadbutton', 'frozenbutton'])

const mainStore = useMainStore();

const items = computed(() => mainStore.clients);

const isModalActive = ref(false);

const isModalDangerActive = ref(false);

const perPage = ref(5);

const currentPage = ref(0);

const checkedRows = ref([]);
const notificationSettingsModel = ref([]);

const notificationsOutline = computed(
    () => notificationSettingsModel.value.indexOf("outline") > -1
);
const shownNestedTables = new Set()


const itemsPaginated = computed(() => {
    const blacklist = ["create_time", 'frozen_by', 'modified_time', 'locked_by', 'project_creator_id', 'project_creator_name', 'end_time', 'project_creator_email', 'organization_id', 'project_manager_id']; // 声明一个黑名单数组，包含需要剔除的列名

    const columns = Object.keys(props.data1[0]).filter(column => !blacklist.includes(column)); // 获取所有不在黑名单中的列名，并且只选择前14列

    return props.data1.map((item) => {
        const row = {};
        columns.forEach((column) => {
            row[column] = item[column];
        });
        return row;
    }).slice(
        perPage.value * currentPage.value,
        perPage.value * (currentPage.value + 1)
    );
});
const itemsPaginated1 = computed(() => {
    // 'orgid', 'liaison_id',
    const columns = ['project_creator_email', 'modified_time', 'locked_by', 'frozen_by', "create_time"];// 指定要显示的列名，比如这里只显示前三列和第五列、第十列

    return props.data1
        .map((item) => {
            const row = {};
            columns.forEach((column) => {
                row[column] = item[column];
            });
            return row;
        })
        .slice(perPage.value * currentPage.value, perPage.value * (currentPage.value + 1));
});
// const itemsPaginated = computed(() => {
//     const columns = Object.keys(props.data1[0]).slice(0, 14) // 获取前5列的列名

//     return props.data1.map((item) => {
//         const row = {};
//         columns.forEach((column) => {
//             row[column] = item[column];
//         });
//         return row;
//     }).slice(
//         perPage.value * currentPage.value,
//         perPage.value * (currentPage.value + 1)
//     );
// });
// const itemsPaginated1 = computed(() => {

//     const columns = Object.keys(props.data1[0]).slice(14); // 获取前5列的列名
//     return props.data1.map((item) => {
//         const row = {};
//         columns.forEach((column) => {
//             row[column] = item[column];
//         });
//         return row;
//     }).slice(
//         perPage.value * currentPage.value,
//         perPage.value * (currentPage.value + 1)
//     );
// });

const numPages = computed(() => Math.ceil(props.data1.length / perPage.value));

const currentPageHuman = computed(() => currentPage.value + 1);

const pagesList = computed(() => {
    const pagesList = [];

    for (let i = 0; i < numPages.value; i++) {
        pagesList.push(i);
    }

    return pagesList;
});

const remove = (arr, cb) => {
    const newArr = [];

    arr.forEach((item) => {
        if (!cb(item)) {
            newArr.push(item);
        }
    });

    return newArr;
};
onMounted(() => {

    console.log(props.data1)

})

// 子组件
const checked = (isChecked, client) => {
    if (isChecked) {
        checkedRows.value.push(client);
    } else {
        checkedRows.value = remove(
            checkedRows.value,
            (row) => row.id === client.id
        );
    }
    // console.log(columns)
    // console.log()
    // 触发自定义事件，并传递 checkedRows 数据给父组件
    emits('update-checked-rows', checkedRows.value);
};
const isNestedTableShown = ref(true)

const toggleNestedTable = (client) => shownNestedTables.has(client.id) ? shownNestedTables.delete(client.id) : shownNestedTables.add(client.id)

</script>

<template>
    <CardBoxModal v-model="isModalActive" title="Sample modal">
        <p>Lorem ipsum dolor sit amet <b>adipiscing elit</b></p>
        <p>This is sample modal</p>
    </CardBoxModal>

    <CardBoxModal v-model="isModalDangerActive" title="Please confirm" button="danger" has-cancel>
        <p>Lorem ipsum dolor sit amet <b>adipiscing elit</b></p>
        <p>This is sample modal</p>
    </CardBoxModal>

    <div v-if="checkedRows.length" class="p-3 bg-gray-100/50 dark:bg-slate-800">
        <span v-for="checkedRow in checkedRows" :key="checkedRow.id"
            class="inline-block px-2 py-1 rounded-sm mr-2 text-sm bg-gray-100 dark:bg-slate-700">
            {{ checkedRow.project_name }}
        </span>
    </div>
    <div class="table-container">
        <table>
            <thead>
                <tr>
                    <th v-if="props.checkable" />

                    <th v-for="(value, key, index) in itemsPaginated[0]" :key="key">
                        {{ replaceTable[key] ?? key }}
                    </th>
                    <th>操作</th>
                    <th />
                </tr>
            </thead>

            <tbody>

                <tr v-for="(client, index ) in itemsPaginated" :key="client.id">
                    <TableCheckboxCell v-if="props.checkable" @checked="checked($event, client)" />
                    <td v-for="(value, key) in client" :key="key">
                        <template v-if="key === 'logopath'">
                            <img :src="value" alt="Logo" width="50" height="50" />
                        </template>
                        <template v-else>
                            {{ replaceValue[value] ?? value }}
                        </template>
                    </td>

                    <td class="before:hidden lg:w-1 whitespace-nowrap">
                        <FormField label="Settings">
                            <FormCheckRadioGroup v-model="buttonSettingsModel" name="buttons-switch" type="switch" :options="{
                                outline: 'Outline',
                                small: 'Small',
                                rounded: 'Rounded',
                                disabled: 'Disabled',
                            }" />
                        </FormField>
                        <BaseButtons type="justify-start lg:justify-end" no-wrap>
                            <!-- <BaseButton :label="client.status == 'Running' ? '暂停' : '恢复'"
                            :color="client.status == 'Running' ? 'danger' : 'success'" :icon="mdiEye" small
                            @buttonclick="$emit('stopbutton', client.id)" /> -->
                            <BaseButton label="修改" color="info" :icon="mdiTrashCan" small
                                @buttonclick="$emit('recoverybutton', client.id)" />
                            <BaseButton label="删除" color="danger" :icon="mdiEye" small
                                @buttonclick="$emit('deletebutton', client.id)" />
                            <BaseButton :label="client.is_locked == 'True' ? '解锁' : '锁定'"
                                :color="client.is_locked == 'True' ? 'success' : 'danger'" :icon="mdiEye" small
                                @buttonclick="$emit('lockoutbutton', client.id)" />
                            <BaseButton :label="client.is_frozen == 'True' ? '解冻' : '冻结'"
                                :color="client.is_frozen == 'True' ? 'success' : 'danger'" :icon="mdiTrashCan" small
                                @buttonclick="$emit('frozenbutton', client.id)" />
                            <!-- 
                        <BaseButton label="报告生成" color="info" :icon="mdiEye" small
                            @buttonclick="$emit('generatebutton', client.id)" />

                        <BaseButton label="报告更新" color="info" :icon="mdiEye" small
                            @buttonclick="$emit('updatebutton', client.id)" />
                        <BaseButton label="下载" color="info" :icon="mdiEye" small
                            @buttonclick="$emit('downloadbutton', client.id)" /> -->


                        </BaseButtons>
                    </td>

                    <td type="expand">
                        <button @click="isNestedTableShown = !isNestedTableShown">
                            <!-- toggleNestedTable(client) -->
                            {{ isNestedTableShown ? '隐藏其他数据' : '展开其他数据' }}
                        </button>

                    </td>

                </tr>
                <!-- <tr v-if="isNestedTableShown" style="z-index:222">
            <tr>
                <thead>
                    <tr>
                        <th v-if="props.checkable" />
                        <th>{{ replaceTable['id'] }}</th>
                        <th v-for="(value, key, index) in itemsPaginated1[0]" :key="key">
                            {{ replaceTable[key] ?? key }}
                        </th>
                    </tr>
                </thead>
            </tr>

            <tr>
        <tbody>

            <tr v-for="(data, index) in itemsPaginated1" :key="data.id">
                <TableCheckboxCell v-if="props.checkable" @checked="checked($event, client)" />
                <td>{{ index + 1 }}</td>

                <td v-for="(value, key) in data" :key="key">
                    {{ value }}
                </td>

            </tr>
        </tbody>
        </tr>

        </tr> -->


            </tbody>
        </table>
    </div>


    <CardBox>
        <table v-if="isNestedTableShown">
            <thead>
                <tr>
                    <th v-if="props.checkable" />
                    <th>{{ replaceTable['id'] }}</th>
                    <th v-for="(value, key, index) in itemsPaginated1[0]" :key="key">
                        {{ replaceTable[key] ?? key }}
                    </th>
                </tr>
            </thead>
            <tbody>

                <tr v-for="(data, index) in itemsPaginated1" :key="data.id">
                    <TableCheckboxCell v-if="props.checkable" @checked="checked($event, client)" />
                    <td>{{ index + 1 }}</td>

                    <td v-for="(value, key) in data" :key="key">
                        {{ value }}
                    </td>

                </tr>
            </tbody>
        </table>

    </CardBox>

    <!-- <table>
        <thead>
            <tr>
                <th v-if="props.checkable" />

                <th v-for="(value, key, index) in itemsPaginated[0]" :key="key">
                    {{ replaceTable[key] ?? key }}
                </th>
                <th>操作</th>
                <th />
            </tr>
        </thead>

        <tbody>

            <tr v-for="(client, index ) in itemsPaginated" :key="client.id">
                <TableCheckboxCell v-if="props.checkable" @checked="checked($event, client)" />
                <td v-for="(value, key,) in client" :key="key">
                    <template v-if="key === 'logopath'">
                        <img :src="value" alt="Logo" width="50" height="50" />
                    </template>
                    <template v-else>
                        {{ value }}
                    </template>
                </td>

                <td class="before:hidden lg:w-1 whitespace-nowrap">
                    <FormField label="Settings">
                        <FormCheckRadioGroup v-model="buttonSettingsModel" name="buttons-switch" type="switch" :options="{
                            outline: 'Outline',
                            small: 'Small',
                            rounded: 'Rounded',
                            disabled: 'Disabled',
                        }" />
                    </FormField>
                    <BaseButtons type="justify-start lg:justify-end" no-wrap>
                        <BaseButton :label="client.status == 'Running' ? '暂停' : '恢复'"
                            :color="client.status == 'Running' ? 'danger' : 'success'" :icon="mdiEye" small
                            @buttonclick="$emit('stopbutton', client.id)" />
                        <BaseButton label="修改" color="info" :icon="mdiTrashCan" small
                            @buttonclick="$emit('recoverybutton', client.id)" />
                        <BaseButton label="删除" color="danger" :icon="mdiEye" small
                            @buttonclick="$emit('deletebutton', client.id)" />
                        <BaseButton :label="client.is_locked == 'True' ? '解锁' : '锁定'"
                            :color="client.is_locked == 'True' ? 'success' : 'danger'" :icon="mdiEye" small
                            @buttonclick="$emit('lockoutbutton', client.id)" />
                        <BaseButton :label="client.is_frozen == 'True' ? '解冻' : '冻结'"
                            :color="client.is_frozen == 'True' ? 'success' : 'danger'" :icon="mdiTrashCan" small
                            @buttonclick="$emit('frozenbutton', client.id)" />

                        <BaseButton label="报告生成" color="info" :icon="mdiEye" small
                            @buttonclick="$emit('generatebutton', client.id)" />

                        <BaseButton label="报告更新" color="info" :icon="mdiEye" small
                            @buttonclick="$emit('updatebutton', client.id)" />
                        <BaseButton label="下载" color="info" :icon="mdiEye" small
                            @buttonclick="$emit('downloadbutton', client.id)" />

                    </BaseButtons>
                </td>
            </tr>
        </tbody>

    </table>
     -->
    <div class="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
        <BaseLevel>
            <BaseButtons>
                <BaseButton v-for="page in pagesList" :key="page" :active="page === currentPage" :label="page + 1"
                    :color="page === currentPage ? 'lightDark' : 'whiteDark'" small @click="currentPage = page" />
            </BaseButtons>
            <small>Page {{ currentPageHuman }} of {{ numPages }}</small>
        </BaseLevel>
    </div>
</template>
<style>
/* 去除滚动条样式 */
.table-container::-webkit-scrollbar {
    width: 0;
    /* 去除垂直滚动条（水平滚动条同理） */
    height: 0;
    /* 去除水平滚动条（垂直滚动条同理） */
    background-color: transparent;
    /* 设置滚动条背景颜色为透明 */
}
</style>