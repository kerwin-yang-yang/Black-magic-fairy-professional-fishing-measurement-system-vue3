<script setup >
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

import TableSampleClients from "@/components/TableSampleClients.vue";
import TableUserManage from "@/components/TableUserManage.vue";
import TableOrganization from "@/components/Tables/TableOrganization.vue";
import { get } from "lodash";
import http from "@/request/http";
import RelationGraph from 'relation-graph/vue3';
// import { BaseUrl } from "@/stores/replace";
const relationGraph$ = ref(null);
const options = {
  allowSwitchLineShape: true,
  allowSwitchJunctionPoint: true,
  defaultJunctionPoint: 'border',
  allowSwitchLineShape: false,
  allowSwitchJunctionPoint: false,
  allowShowDownloadButton: false,
  allowShowMiniToolBar: false,
  moveToCenterWhenRefresh: true,
  backgrounImage: 'https://th.bing.com/th/id/R.921f1ffe9e67cd90dfca775408e37295?rik=pzf2yxNFrmm%2b6Q&pid=ImgRaw&r=0',

  'layouts': [
    {
      'label': '中心',
      'layoutName': 'tree',
      'layoutClassName': 'seeks-layout-center',
      'defaultJunctionPoint': 'border',
      'defaultNodeShape': 0,
      'defaultLineShape': 1,
      'from': 'left',
      // 通过这4个属性来调整 tree-层级距离&节点距离
      'min_per_width': '200',
      'max_per_width': '500',
      'min_per_height': '40',
      'max_per_height': '100',
      'levelDistance': '' // 如果此选项有值，则优先级高于上面那4个选项
    }
  ],
  'defaultLineMarker': {
    'markerWidth': 30,
    'markerHeight': 30,
    'refX': 6,
    'refY': 6,
    'data': 'M2,2 L10,6 L2,10 L6,6 L2,2'
  },
  moveToCenterWhenRefresh: true,
  useAnimationWhenRefresh: true,
  zoomToFitWhenRefresh: true,
  'defaultExpandHolderPosition': 'right',
  'defaultNodeShape': 1,
  'defaultNodeWidth': '100',
  'defaultLineShape': 2,
  'defaultJunctionPoint': 'lr',
  'defaultNodeBorderWidth': 0,
  'defaultLineColor': 'rgba(0, 186, 189, 1)',
  'defaultNodeColor': 'rgba(0, 206, 209, 1)'



}
const graphJsonData = {
  'rootId': 'a',
  'nodes': [
    { 'id': 'a', 'text': '钓鱼系统管理系统', 'styleClass': 'c-g-center', 'color': '#A4C1FF' }],
  'lines': []
};
onMounted(async () => {
  await loadData()
  updateData()
})
const updateData = () => {
  console.log(testdata)
  testdata.forEach((item) => {
    if (item.istoporg == true) {
      graphJsonData.nodes.push({
        id: 'top-' + item.id, text: item.name, data: {
          istop: 1
        }
      })
    } else {
      graphJsonData.nodes.push({
        id: 'other-' + item.id, text: item.name, data: {
          istop: 0
        }
      })
    }

    if (item.istoporg == true) {
      graphJsonData.lines.push({
        from: 'a', to: 'top-' + item.id, text: '负责'
      }
      )
      // testdata.forEach((itemone) => {
      //   if (itemone.higherorgid == item.id) {
      //     graphJsonData.lines.push({
      //       from: 'top-' + item.id, to: 'other-' + itemone.id, text: '下属公司'
      //     }
      //     )
      //   }

      // }
      // )
    }

  });
  testdata.forEach((item) => {
    if (item.higherorgid != 0 && item.istoporg == false) {
      graphJsonData.lines.push({
        from: 'top-' + item.higherorgid, to: 'other-' + item.id, text: '下属公司'
      })
      graphJsonData.lines.push({
        from: 'other-' + item.higherorgid, to: 'other-' + item.id, text: '下属公司'
      })
    }
  })



  relationGraph$.value.setJsonData(graphJsonData, (graphInstance) => {
    console.log('relationGraph ready!');
  })
}
const selectOptions = [
  { id: 1, label: "Business development" },
  { id: 2, label: "Marketing" },
  { id: 3, label: "Sales" },
];

let testdata = reactive(null)
let tabledata = reactive({

})
let isDataLoaded = ref(false)
const loadData = async () => {
  await http.get('/organization/')
    .then((response) => {
      // console.log(testdata);
      // console.log(response.data);
      testdata = response.data.children
      console.log(testdata);
      // isDataLoaded.value = true

    })
    .catch((error) => {
      console.log(error);
    })
  // testdata = [{ id: 1, name: 'test1' }, { id: 2, name: 'test2' }]  
  isDataLoaded.value = true
}

const form = ref({

});

const customElementsForm = reactive({
  checkbox: ["lorem"],
  radio: "one",
  switch: ["one"],
  file: null,
});


const show = (thing) => {
  // console.log(thing)
  // tablething.value = thing
  form.value = testdata.find(obj => obj.id == thing);
  console.log(form)
  isModalActive.value = true

};
const tablething = ref(null)
const edit = (thing) => {


  console.log(thing)
  tablething.value = thing
  console.log(testdata)
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
  console.log(form.value)
  form.value.comments = ''
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
      isModalDangerActive.value = false
      message.value = response.data
      isDone.value = true
    })
    .catch((error) => {
      isModalDangerActive.value = false
      message.value = '删除操作失败'
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
      form.value.logopath = 'http://192.168.43.76:5000/' + response.data.url
      // updateForm()
      console.log(form.value.logopath)
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
        message.value = '删除操作失败'
        isDone.value = true
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
const searchData = () => {
  console.log(searchOne.value);
  console.log(testdata);
  let foundData = testdata.filter(item =>
    Object.values(item).includes(String(searchOne.value))
  );

  console.log(foundData);
};
const isChangeStopActive = ref(false)
const changestopbefore = (thing) => {
  isChangeStopActive.value = true;
  tablething.value = thing
  form.value = testdata.find(obj => obj.id == thing);

}
const changestop = () => {
  let islock = ref('lock');
  if (form.value.islocked == false) {
    islock.value = 'lock';
  }
  else {
    islock.value = 'unlock';
  }
  http.patch(`/organization/${tablething.value}/action/${islock.value}`)
    .then((response) => {
      console.log(response.data)
      isChangeStopActive.value = false;

      message.value = response.data
      isDone.value = true;

    })
    .catch((error) => {
      message.value = '修改锁定操作失败'
      isDone.value = true
    })
}

const isShow = ref(false)
// const isShowCodePanel = ref(false)
// const isShowNodeMenuPanel = ref(false)
// const nodeMenuPanelPosition = ref({ x: 0, y: 0 })
// const showNodeMenus = (nodeObject, $event) => {
//   this.currentNode = nodeObject;
//   const _base_position = this.$refs.myPage.getBoundingClientRect();
//   console.log('showNodeMenus:', $event, _base_position);
//   this.isShowNodeMenuPanel = true;
//   this.nodeMenuPanelPosition.x = $event.clientX - _base_position.x;
//   this.nodeMenuPanelPosition.y = $event.clientY - _base_position.y;
// }
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


    <CardBoxModal v-model="isShow" title="公司关系" button="danger" has-cancel @confirm="isShow = false">
      <!-- <CardBox class="mb-6"> -->
      <div>
        <div style="border: #efefef solid 1px; height: calc(100vh - 100px);width: 100%;background-color: black;">
          <relation-graph ref="relationGraph$" :options="options">
            <template #node="{ node }">
              <div style="padding-top:20px;">{{ node.text }}</div>
            </template>
          </relation-graph>
        </div>
      </div>
      <!-- </CardBox> -->


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
        <FormControl v-model="form.islocked" isdisabled=true />

      </FormField>
      <!-- <FormField label="是否冻结" help="Do not enter the leading zero">
        <FormControl v-model="form.isfrozen" :options="[true,false]" />
      </FormField> -->
      <FormField label="是否冻结" help="Do not enter the leading zero">
        <FormControl v-model="form.isfrozen" type="tel" :options="[true, false]" />
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

      <FormField label="组织姓名">
        <FormControl v-model="form.name" :icon="mdiAccount" />
      </FormField>
      <FormField label="组织logo">
        <!-- <FormControl v-model="form.logopath" type="email" :icon="mdiMail" /> -->
        <UserAvatar :avatar="form.logopath" class="w-24 h-24 mx-auto lg:w-6 lg:h-6" />
        <FormFilePicker label="Upload" @update:model-value="uploadLogo" />
      </FormField>
      <FormField label="是否顶级">
        <FormControl v-model="form.istoporg" :options="[true, false]" :icon="mdiMail" />
      </FormField>
      <FormField label="上级id">
        <FormControl v-model="form.higherorgid" type="number" :icon="mdiMail" />

      </FormField>
      <FormField label="是否锁定">
        <FormControl v-model="form.islocked" :icon="mdiMail" :options="[true, false]" />
      </FormField>

      <FormField label="被谁冻结">
        <FormControl v-model="form.frozenbyuid" :icon="mdiMail" isdisabled=true />
      </FormField>
      <FormField label="客户信息">
        <FormControl v-model="form.clientcontact" type="email" :icon="mdiMail" />

      </FormField>

      <FormField label="意见">
        <FormControl v-model="form.comments" type="email" :icon="mdiMail" />
      </FormField>



    </CardBoxModal>


    <CardBoxModal v-model="isChangeStopActive" title="Please confirm" button="danger" has-cancel @confirm="changestop">
      <h6>确定要切换id为{{ tablething }}的组织的锁定状态吗</h6>
    </CardBoxModal>
    <CardBoxModal v-model="isModalDangerActive" title="Please confirm" button="danger" has-cancel @confirm="deleteBack">
      <h6>确定要删除id为{{ tablething }}的组织吗</h6>
    </CardBoxModal>
    <CardBoxModal v-model="ShowFind" title="查找结果" button="danger" has-cancel @confirm="ShowFind = false">
      <CardBox v-if="result == []">
        <p>
          没有数据
        </p>
      </CardBox>
      <CardBox v-for="item in result" style="border:2px solid">
        <!-- {{ item }} -->
        <FormField label="组织id">
          <FormControl v-model="item.id" :icon="mdiAccount" isdisabled=true />

        </FormField>
        <FormField label="组织名称">
          <FormControl v-model="item.name" :icon="mdiAccount" isdisabled=true />

        </FormField>
        <FormField label="联系">
          <FormControl v-model="item.clientcontact" type="tel" :icon="mdiMail" isdisabled=true />
        </FormField>
      </CardBox>

    </CardBoxModal>

    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiTableBorder" title="组织管理" main>
        <BaseButton href="https://github.com/kerwin-yang-yang/vue3" target="_blank" :icon="mdiGithub"
          label="Star on GitHub" color="contrast" rounded-full small />
      </SectionTitleLineWithButton>


      <SectionTitle>管理组织架构图</SectionTitle>
      <CardBox>
        <div>
          <div style="border: #efefef solid 1px; height: calc(100vh - 100px);width: 100%;">

            <relation-graph ref="relationGraph$" :options="options">
              <!-- <div slot="node" slot-scope="{node}">
                <div style="height:80px;line-height: 80px;border-radius: 50%;cursor: pointer;"
                  @click="showNodeMenus(node, $event)" @contextmenu.prevent.stop="showNodeMenus(node, $event)"
                  @mouseover="nodeSlotOver(node, $event)" @mouseout="nodeSlotOut(node, $event)">
                  <i style="font-size: 30px;" :class="node.data.myicon" />
                </div>
                <div
                  style="color: forestgreen;font-size: 16px;position: absolute;width: 160px;height:25px;line-height: 25px;margin-top:5px;margin-left:-48px;text-align: center;background-color: rgba(66,187,66,0.2);">
                  {{ node.data.myicon }}
                </div>
              </div> -->
            </relation-graph>
          </div>
        </div>
      </CardBox>
      <!-- <CardBox>
        <div v-show="isShowNodeMenuPanel"
          :style="{ left: nodeMenuPanelPosition.x + 'px', top: nodeMenuPanelPosition.y + 'px' }"
          style="z-index: 999;padding:10px;background-color: #ffffff;border:#eeeeee solid 1px;box-shadow: 0px 0px 8px #cccccc;position: absolute;">
          <div style="line-height: 25px;padding-left: 10px;color: #888888;font-size: 12px;">对这个节点进行操作：</div>
          <div class="c-node-menu-item" @click.stop="doAction('操作1')">操作1</div>
          <div class="c-node-menu-item" @click.stop="doAction('操作1')">操作2</div>
          <div class="c-node-menu-item" @click.stop="doAction('操作1')">操作3</div>
          <div class="c-node-menu-item" @click.stop="doAction('操作1')">操作4</div>
        </div>
      </CardBox> -->

      <SectionTitle>组织具体信息</SectionTitle>
      <FormField>
        <BaseButtons>
          <BaseButton color="success" label="新增" outline rounded-full @buttonclick="add" />
          <!-- <BaseButton color="success" label="公司关系图" outline rounded-full @buttonclick="isShow = true" /> -->
          <BaseButton color="danger" label="批量删除" outline rounded-full @buttonclick="deleteOnesBefore" />
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

            <TableOrganization checkable :data1="testdata" @showbutton="show" @editbutton="edit" @deletebutton="deleteOne"
              :checkedRows="checkedOnes" @update-checked-rows="handleCheckedRows" @stopbutton='changestopbefore' />
          </CardBox>
        </template>
        <template #fallback>

          <div>Loading...</div>
        </template>
      </Suspense>

    </SectionMain>


  </LayoutAuthenticated>
</template>
