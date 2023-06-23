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
import { replaceTable } from "@/stores/replace";
import { replaceValue } from "@/stores/valueReplace";
const props = defineProps({
    checkable: Boolean,
    data1: Array,
    checkedRows: Array
});
const emits = defineEmits(['showbutton', 'editbutton', 'deletebutton', 'freezebutton', 'unfreezebutton', 'checkedOnes'])

const mainStore = useMainStore();

const items = computed(() => mainStore.clients);

const isModalActive = ref(false);

const isModalDangerActive = ref(false);

const perPage = ref(5);

const currentPage = ref(0);

const checkedRows = ref(props.checkedRows);

// const itemsPaginated = computed(() =>
//     props.data1.slice(
//         perPage.value * currentPage.value,
//         perPage.value * (currentPage.value + 1)
//     )
// );
const itemsPaginated = computed(() => {
    const blacklist = ["create_time", 'frozen_by', 'modified_time', 'locked_by', 'project_creator_id', 'project_creator_name', 'end_time', 'project_creator_email',
        'createdbyuid', 'modifiedbyuid', 'modifybyuid', 'frozenbyuid', 'lockbyuid']; // 声明一个黑名单数组，包含需要剔除的列名

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
                        {{ replaceTable[key] ?? key }}
                    </th>
                    <!-- <th>操作</th> -->
                    <!-- <th /> -->
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
