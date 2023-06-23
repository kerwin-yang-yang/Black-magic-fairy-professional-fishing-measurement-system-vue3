<script setup>
import { computed, ref, onMounted, reactive } from "vue";
import { useMainStore } from "@/stores/main";
import http from "@/request/http";
import {
  mdiAccountMultiple,
  mdiCartOutline,
  mdiChartTimelineVariant,
  mdiMonitorCellphone,
  mdiReload,
  mdiGithub,
  mdiChartPie,
  mdiAccount,
  mdiCoffee,
  mdiOrbit,
  mdiMathLog,
  mdiPlaylistCheck,
  mdiPlaylistEdit,
  mdiBicyclePennyFarthing
} from "@mdi/js";
import * as chartConfig from "@/components/Charts/chart.config.js";
import LineChart from "@/components/Charts/LineChart.vue";
import SectionMain from "@/components/SectionMain.vue";
import CardBoxWidget from "@/components/CardBoxWidget.vue";
import CardBox from "@/components/CardBox.vue";
import TableSampleClients from "@/components/TableSampleClients.vue";
import NotificationBar from "@/components/NotificationBar.vue";
import BaseButton from "@/components/BaseButton.vue";
import CardBoxTransaction from "@/components/CardBoxTransaction.vue";
import CardBoxClient from "@/components/CardBoxClient.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import TableBlacklist from "@/components/Tables/TableBlacklist.vue";
import SectionBannerStarOnGitHub from "@/components/SectionBannerStarOnGitHub.vue";

const data11 = ref()
const chartData = ref(null);
onMounted(() => {
  loadData()
})

const checkedOnes = ref([])
const handleCheckedRows = (thing) => {
  checkedOnes.value = thing
  console.log(checkedOnes.value)
}
let isDataLoaded = ref(false)
const loadData = async () => {
  await http.get('/phishing_event/')
    .then((response) => {
      // console.log(testdata);
      // console.log(response.data);
      testdata = response.data.children
      console.log(testdata);


    })
    .catch((error) => {
      console.log(error);
    })
  await http.get('/statistics_ns/')
    .then((response) => {
      // console.log(testdata);
      // console.log(response.data);
      data11.value = response.data
      console.log(data11.value);
      isDataLoaded.value = true

    })
    .catch((error) => {
      console.log(error);
    })
}
let testdata = reactive(null)
const fillChartData = () => {
  chartData.value = chartConfig.sampleChartData();
};

onMounted(() => {
  fillChartData();
});

const mainStore = useMainStore();

const clientBarItems = computed(() => mainStore.clients.slice(0, 4));

const transactionBarItems = computed(() => mainStore.history);
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiChartTimelineVariant" title="Overview" main>
        <BaseButton href="https://github.com/justboil/admin-one-vue-tailwind" target="_blank" :icon="mdiGithub"
          label="Star on GitHub" color="contrast" rounded-full small />
      </SectionTitleLineWithButton>

      <div class="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6" v-if="data11">
        <CardBoxWidget trend="100%" trend-type="up" color="text-emerald-500" :icon="mdiAccountMultiple"
          :number="data11.user_number" label="人员数量" />
        <!-- suffix="人" -->
        <CardBoxWidget trend="30%" trend-type="down" color="text-blue-500" :icon="mdiCoffee"
          :number="data11.organization_number" label="组织数量" />
        <!-- prefix="$" -->
        <!-- ​
code: "success"
​​
event_number: 4
​​
log_number: 129
​​
organization_number: 6
​​
project_number: 4
​​
task_number: 13
​​
user_number: 9 -->
        <CardBoxWidget trend="35%" trend-type="up" color="text-red-500" :icon="mdiPlaylistEdit"
          :number="data11.project_number" label="项目数量" />
        <CardBoxWidget trend="Overflow" trend-type="alert" color="text-red-500" :icon="mdiBicyclePennyFarthing"
          :number="data11.task_number" label="测评任务数量" />
        <CardBoxWidget trend="Overflow" trend-type="alert" color="text-red-500" :icon="mdiPlaylistCheck"
          :number="data11.event_number" label="中招总量" />
        <CardBoxWidget trend="Overflow" trend-type="alert" color="text-red-500" :icon="mdiMathLog"
          :number="data11.log_number" label="日志数量" />
      </div>

      <!-- <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div class="flex flex-col justify-between">
          <CardBoxTransaction v-for="(transaction, index) in transactionBarItems" :key="index"
            :amount="transaction.amount" :date="transaction.date" :business="transaction.business"
            :type="transaction.type" :name="transaction.name" :account="transaction.account" />
        </div>
        <div class="flex flex-col justify-between">
          <CardBoxClient v-for="client in clientBarItems" :key="client.id" :name="client.name" :login="client.login"
            :date="client.created" :progress="client.progress" />
        </div>
      </div> -->



      <SectionTitleLineWithButton :icon="mdiChartPie" title="每日中招次数">
        <BaseButton :icon="mdiReload" color="whiteDark" @click="fillChartData" />
      </SectionTitleLineWithButton>

      <CardBox class="mb-6">
        <div v-if="chartData">
          <line-chart :data="chartData" class="h-96" />
        </div>
      </CardBox>

      <SectionTitleLineWithButton :icon="mdiAccountMultiple" title="具体中招记录" />

      <!-- <NotificationBar color="info" :icon="mdiMonitorCellphone">
        <b>Responsive table.</b> Collapses on mobile
      </NotificationBar> -->
      <CardBox class="mb-6" has-table v-if="isDataLoaded">
        <TableBlacklist checkable :data1="testdata" @stopbutton="edit" @deletebutton="deleteOne"
          :checkedRows="checkedOnes" />
      </CardBox>
      <SectionBannerStarOnGitHub class="mt-6 mb-6" />
    </SectionMain>
  </LayoutAuthenticated>
</template>
