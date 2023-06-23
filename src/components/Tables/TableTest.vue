<script setup>
import { computed, ref, defineEmits, onMounted } from "vue";
import { useMainStore } from "@/stores/main";
import { mdiEye, mdiTrashCan } from "@mdi/js";
import CardBoxModal from "@/components/CardBoxModal.vue";
import TableCheckboxCell from "@/components/TableCheckboxCell.vue";
import BaseLevel from "@/components/BaseLevel.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import BaseButton from "@/components/BaseButton.vue";
import UserAvatar from "@/components/UserAvatar.vue";
import { data } from "browserslist";
import { replaceTable } from '@/stores/replace'
import { replaceValue } from "@/stores/valueReplace";
const props = defineProps({
    checkable: Boolean,
    data1: Array,
});
const emits = defineEmits(['updatebutton', 'shutbutton', 'lockUnlockButton', 'freezeUnfreezeButton', 'downloadbutton'])

const mainStore = useMainStore();

const items = computed(() => mainStore.clients);

const isModalActive = ref(false);

const isModalDangerActive = ref(false);

const perPage = ref(5);

const currentPage = ref(0);

const checkedRows = ref([]);

// const itemsPaginated = computed(() =>
//     props.data1.slice(
//         perPage.value * currentPage.value,
//         perPage.value * (currentPage.value + 1)
//     )
// );
// const replaceTable = {
//     // 'id': '编号',
//     'projectname': '项目名称',
//     'project_manager': '项目执行人'
// }
// const itemsPaginated = computed(() => {
//     const columns = Object.keys(props.data1[0]); // 获取前5列的列名
//     // .slice(0, 6)
//     return props.data1.map((item) => {
//         const row = {};
//         columns.forEach((column) => {
//             const newColumn = replaceTable[column] || column; // 使用替换表中定义的键名进行替换
//             row[newColumn] = item[column];
//         });
//         return row;
//     }).slice(
//         perPage.value * currentPage.value,
//         perPage.value * (currentPage.value + 1)
//     );
// });

const itemsPaginated = computed(() => {
    const columns = Object.keys(props.data1[0]); // 获取前5列的列名
    // .slice(0, 6)
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

    // 触发自定义事件，并传递 checkedRows 数据给父组件
    emits('update-checked-rows', checkedRows.value);
};

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
            {{ checkedRow.name }}
        </span>
    </div>
    <div class="table-container ">
        <table>
            <thead>
                <tr>
                    <th v-if="props.checkable" />
                    <th v-for="(value, key, index) in itemsPaginated[0]" :key="key">
                        {{ replaceTable[key] ?? key.slice(0, 20) }}
                    </th>
                    <th class="fixed2">操作</th>
                    <th />
                </tr>
            </thead>
            <tbody>
                <tr v-for="client in itemsPaginated" :key="client.id">
                    <TableCheckboxCell v-if="props.checkable" @checked="checked($event, client)" />
                    <td v-for="(value, key,) in client" :key="key">
                        <template v-if="key === 'logopath'">
                            <img :src="value" alt="Logo" width="50" height="50" />
                        </template>
                        <template v-else>
                            {{ replaceValue[value] ?? value }}
                        </template>
                    </td>
                    <td class="fixed1" v-if="client.type != 'qrcode'">
                        <BaseButtons type="justify-start lg:justify-end" no-wrap>
                            <BaseButton :label="client.islocked == false ? '锁定' : '解锁'"
                                :color="client.islocked == false ? 'warning' : 'success'" :icon="mdiTrashCan" small
                                @buttonclick="$emit('lockUnlockButton', client)" />
                            <BaseButton :label="client.isfrozen == false ? '冻结' : '解冻'"
                                :color="client.isfrozen == false ? 'warning' : 'success'" :icon="mdiTrashCan" small
                                @buttonclick="$emit('freezeUnfreezeButton', client)" />
                            <BaseButton label="修改" color="info" :icon="Edit" small
                                @buttonclick="$emit('updatebutton', client)" />
                            <!-- <BaseButton label="删除" color="danger" :icon="mdiTrashCan" small -->
                            <BaseButton label="删除" color="danger" :icon="delete" small
                                @buttonclick="$emit('shutbutton', client.id)" />
                        </BaseButtons>
                    </td>
                    <td class="fixed1" v-if="client.type == 'qrcode'">
                        <BaseButtons type="justify-start lg:justify-end" no-wrap>
                            <BaseButton label="下载" color="info" :icon="delete" small
                                @buttonclick="$emit('downloadbutton', client.id)">

                            </BaseButton>
                        </BaseButtons>
                    </td>

                </tr>
            </tbody>
        </table>
    </div>

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
.table-container {
    width: 100%;
    overflow-x: auto;
    /* 设置最大高度，让表格主体出现纵向滚动条 */
    /* max-height: 400px; */
}

table {
    /* 宽度 100% */
    width: 100%;
    /* 添加表格边框，以便更好地观察效果 */
    border-collapse: collapse;
    border-spacing: 0;
    border: 1px solid #0e0e0e;
}


thead th {
    /* 固定表头位置 */
    position: sticky;
    top: 0;
    /* 背景颜色与字体样式等 */
    /* background-color: #0a0a0a; */
    /* color: #e9ebf0; */
    font-weight: bold;
    /* 添加不透明度 */

    color: #fff;
    background-color: #182234;

}

/* 去除滚动条样式 */
.table-container::-webkit-scrollbar {
    width: 0;
    /* 去除垂直滚动条（水平滚动条同理） */
    height: 0;
    /* 去除水平滚动条（垂直滚动条同理） */
    background-color: transparent;
    /* 设置滚动条背景颜色为透明 */
}

tbody td {
    /* 表格边框样式 */
    border: 1px solid #edf2f7;

}

/* .fixed1 {
    position: sticky;
    color: #fff;
    opacity: 0.5;
    right: 0;
    opacity: 1;
    background-color: #0a0b0b;

}

.fixed2 {
    position: sticky;
    color: #fff;
    background-color: #0a0b0b;
    top: 0;
    right: 0;
    opacity: 1;


} */
</style>