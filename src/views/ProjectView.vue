<script setup>
import { reactive, ref, onMounted, Suspense, computed, watch, toRefs } from "vue";
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

import TableProject from "@/components/Tables/TableProject.vue";
import { get } from "lodash";
import http from "@/request/http";

const selectOptions = [
  { id: 1, label: "Business development" },
  { id: 2, label: "Marketing" },
  { id: 3, label: "Sales" },
];


const formStatusWithHeader = ref(true);

const formStatusCurrent = ref(0);

const formStatusOptions = ["info", "success", "danger", "warning"];

const formStatusSubmit = () => {
  formStatusCurrent.value = formStatusOptions[formStatusCurrent.value + 1]
    ? formStatusCurrent.value + 1
    : 0;
};
onMounted(async () => {
  await loadData()
})

let testdata = reactive(null)
let userdata = reactive(null)
let ogrdata = reactive(null)
let isDataLoaded = ref(false)
// let tabledata = computed(() => {
//   return testdata
// })
let tabledata = reactive({
  data: []
})
const loadData = async () => {
  await http.get('/project/')
    .then((response) => {

      testdata = reactive(response.data.children)
      // console.log(response.data.children)
      tabledata.data = response.data.children

    })
    .catch((error) => {
      console.log(error);
    })
  await http.get('/user/')
    .then((response) => {
      // console.log(testdata);
      // console.log(response.data);
      userdata = response.data.children
      // console.log(testdata);
      // isDataLoaded.value = true

    })
    .catch((error) => {
      console.log(error);
    })
  await http.get('/organization/')
    .then((response) => {
      // console.log(testdata);
      // console.log(response.data);
      ogrdata = response.data.children
      console.log(testdata);
      isDataLoaded.value = true

    })
    .catch((error) => {
      console.log(error); testdata
    })
  isDataLoaded.value = true
}
const tablething = ref(null)

const form = ref({

});


const edit = (thing) => {
  tablething.value = thing
  form.value = testdata.find(obj => obj.id == thing);
  console.log(form.value)
  isModalActive.value = true
  orgs.value =
    ogrdata.map(item => item.name);
  results.value =
    userdata.map(item => item.username);
  liaisons.value =
    testdata.map(item => item.liaison_name);

};
const updateForm = () => {
  const id = form.value.id
  const updateThing = {
    "project_name": form.value.project_name,
    "project_manager_name": form.value.project_manager_name,
    "comment": form.value.comment
  }
  if (form.value.is_locked == 'False') {
    http.put('/project/' + id, updateThing)
      .then((response) => {
        console.log(response)
        isModalActive.value = false
        message.value = '修改成功'
        loadData()
        isDone.value = true
      })
      .catch((error) => {
        isModalActive.value = false
        message.value = '修改失败：' + error.message
        isDone.value = true
      })
  } else {
    isFrozenOneActive.value = false;

    message.value = '项目被锁定，请先解锁'
    isDone.value = true;
  }

}

const add = () => {
  // form.value = testdata.find(obj => obj.id == 1);
  form.value = {
    project_name: "string",
    // project_manager_id: 1,
    project_manager: 'zzz',
    // contact_email: "string",
    // liaison_id: 2,
    comment: "string",

    // test_name: 'string'
  }
  console.log(testdata)
  orgs.value =
    ogrdata.map(item => item.name);
  results.value =
    userdata.map(item => item.username);
  liaisons.value =
    testdata.map(item => item.liaison_name);

  isAddActive.value = true;


}
const results = ref()
const liaisons = ref()
const orgs = ref()

const addForm = () => {
  // if (testdata && testdata.length > 0) {
  //   form.value.liaison_id = testdata.find(project => project.liaison_name === form.value.liaison_name).liaison_id;
  //   console.log(form.value)
  //   // form.value.project_manager_id = userdata.find(project => project.username === form.value.username).project_manager_id;
  //   // form.value.orgid = ogrdata.find(project => project.name === form.value.name).orgid;
  // }
  // else {
  //   console.error('testdata 数组为空或未定义！');
  // }
  console.log(form.value)
  http.post('/project/', form.value)
    .then((response) => {
      console.log(response)
      isAddActive.value = false
      message.value = '添加成功'
      isDone.value = true
    })
    .catch(error => {
      isAddActive.value = false
      message.value = '添加失败：' + error.message
      isDone.value = true
    })
  loadData()

}

const stopOne = (thing) => {
  tablething.value = thing
  form.value = testdata.find(obj => obj.id == thing);
  isStopOneActive.value = true;

}
// 停止某个项目
const stopOneback = () => {

  let isfrozen = ref('Stop');
  console.log(form.value)
  if (form.value.status == 'Running') {
    isfrozen.value = 'Stop';
  }
  else {
    isfrozen.value = 'Running';
  }
  if (form.value.is_locked == 'False') {
    http.patch(`/project/${tablething.value}/action/${isfrozen.value}`)
      .then((response) => {

        isStopOneActive.value = false;

        if (response.data.code == 'success' || response.data.status == 'success') {
          message.value = '切换项目执行状态成功'
        }
        isDone.value = true;

      })
      .catch((error) => {
        isStopOneActive.value = false;

        message.value = error.message
        isDone.value = true;
      })
  } else {
    isFrozenOneActive.value = false;

    message.value = '项目被锁定，请先解锁'
    isDone.value = true;
  }

}
const deleteOne = (thing) => {
  console.log(thing)
  tablething.value = thing
  form.value = testdata.find(obj => obj.id == thing);
  isModalDangerActive.value = true

};
const deleteBack = () => {

  if (form.value.is_locked == 'False') {
    http.delete('/project/' + tablething.value)
      .then((response) => {
        // console.log(response)
        // message.value = response.data
        isModalDangerActive.value = false;

        if (response.data.code == 'success' || response.data.status == 'success') {
          message.value = '删除成功'
        }
        isDone.value = true;
      })
      .catch((error) => {
        message.value = error.message
        isModalDangerActive.value = false;
        isDone.value = true;
      })
  } else {
    isModalDangerActive.value = false;

    message.value = '项目被锁定，请先解锁'
    isDone.value = true;
  }

}

const frozenOne = (thing) => {
  tablething.value = thing
  form.value = testdata.find(obj => obj.id == thing);
  isFrozenOneActive.value = true;

}
const frozenOneback = () => {

  let isfrozen = ref('freeze');
  if (form.value.is_frozen == 'False') {
    isfrozen.value = 'freeze';
  }
  else {
    isfrozen.value = 'unfreeze';
  }
  if (form.value.is_locked == 'False') {
    http.patch(`/project/${tablething.value}/action/${isfrozen.value}`)
      .then((response) => {
        console.log(response.data)
        isFrozenOneActive.value = false;

        if (response.data.code == 'success' || response.data.status == 'success') {
          message.value = '切换冻结状态成功'
        }
        isDone.value = true;

      })
      .catch((error) => {
        isFrozenOneActive.value = false;

        message.value = error.message
        isDone.value = true;
      })
  }
  else {
    isFrozenOneActive.value = false;

    message.value = '项目被锁定，请先解锁'
    isDone.value = true;
  }

}

const lockoutOne = (thing) => {
  tablething.value = thing
  form.value = testdata.find(obj => obj.id == thing);
  isLockOneActive.value = true;
}
const Lockoneback = () => {
  let islock = ref('lock');
  console.log(form.value.is_locked)
  if (form.value.is_locked == 'False') {
    islock.value = 'lock';
  }
  else {
    islock.value = 'unlock';
  }
  http.patch(`/project/${tablething.value}/action/${islock.value}`)
    .then((response) => {
      console.log(response.data)
      isLockOneActive.value = false;

      if (response.data.code == 'success' || response.data.status == 'success') {
        message.value = '切换锁定状态成功'
      }
      isDone.value = true;

    })
}


const isdelteALL = ref(false)
const deleteOnesBefore = () => {
  isdelteALL.value = true
}
const deleteOnes = () => {
  if (checkedOnes.value === []) {
    isdelteALL.value = false
    message.value = '未选中项目'
    isDone.value = true
  } else {
    checkedOnes.value.forEach((item) => {
      const id = item.id;
      http.delete(`/project/${id}`)
        .then((response) => {
          console.log(`成功删除行: ${id}`, response);
        })
        .catch((error) => {
          isdelteALL.value = false
          message.value = '删除出现问题'
          isDone.value = true
        });
    });
    isdelteALL.value = false
    message.value = '删除成功'
    isDone.value = true
  }

}

const stopOnesbefore = () => {

  isstopALL.value = true
}

const stopOnes = () => {

  checkedOnes.value.forEach((item) => {
    const id = item.id;
    let islock = ref('Stop');
    http.patch(`/project/${id}/action/${islock.value}`)
      .then((response) => {
        console.log(`成功删除行: ${id}`, response);
      })
      .catch((error) => {
        isstopALL.value = false
        message.value = '暂停项目出现问题'
        isDone.value = true
      });
  });
  isstopALL.value = false
  message.value = '暂停成功'
  isDone.value = true

}
const isstartALL = ref(false)
const startOnesbefore = () => {
  isstartALL.value = true

}
const startOnes = () => {
  checkedOnes.value.forEach((item) => {
    const id = item.id;
    let islock = ref('Running');
    http.patch(`/project/${id}/action/${islock.value}`)
      .then((response) => {
        console.log(`成功启动行: ${id}`, response);
      })
      .catch((error) => {
        isstartALL.value = false
        message.value = '重启项目出现问题'
        isDone.value = true
      });
  });
  isstartALL.value = false
  message.value = '重启成功'
  isDone.value = true

}

const frozenOnesbefore = () => {
  isfrozenALL.value = true

}

const frozenOnes = () => {


  checkedOnes.value.forEach((item) => {
    const id = item.id;
    let islock = ref('freeze');
    http.patch(`/project/${id}/action/${islock.value}`)
      .then((response) => {
        console.log(`成功冻结行: ${id}`, response);
      })
      .catch((error) => {
        isfrozenALL.value = false
        message.value = '冻结项目出现问题'
        isDone.value = true
      });
  });
  isfrozenALL.value = false
  message.value = '冻结成功'
  isDone.value = true
}
const isunfrozenALL = ref(false)
const unfrozenOnesbefore = () => {
  isunfrozenALL.value = true
}
const unfrozenOnes = () => {
  checkedOnes.value.forEach((item) => {
    const id = item.id;
    let islock = ref('unfreeze');
    http.patch(`/project/${id}/action/${islock.value}`)
      .then((response) => {
        console.log(`成功解冻行: ${id}`, response);
      })
      .catch((error) => {
        isunfrozenALL.value = false
        message.value = '解冻项目出现问题'
        isDone.value = true
      });
  });
  isunfrozenALL.value = false
  message.value = '解冻成功'
  isDone.value = true

}

const islockALL = ref(false)
const lockoutOnesBefore = () => {
  islockALL.value = true
  console.log('hhhh')
}
const LockOnes = () => {

  checkedOnes.value.forEach((item) => {
    const id = item.id;
    let islock = ref('lock');
    http.patch(`/project/${id}/action/${islock.value}`)
      .then((response) => {
        console.log(`成功锁定行: ${id}`, response);
      })
      .catch((error) => {
        islockALL.value = false
        message.value = '锁定项目出现问题'
        isDone.value = true
      });
  });
  islockALL.value = false
  message.value = '锁定成功'
  isDone.value = true

}
const isunlockALL = ref(false)
const unlockOnesBefore = () => {
  isunlockALL.value = true

}
const unLockOnes = () => {
  checkedOnes.value.forEach((item) => {
    const id = item.id;
    let islock = ref('unlock');
    http.patch(`/project/${id}/action/${islock.value}`)
      .then((response) => {
        console.log(`成功解锁行: ${id}`, response);
      })
      .catch((error) => {
        isunlockALL.value = false
        message.value = '解锁项目出现问题'
        isDone.value = true
      });
  });
  isunlockALL.value = false
  message.value = '解锁成功'
  isDone.value = true

}

const isDone = ref(false)
const message = ref('')

const checkedOnes = ref([])
const handleCheckedRows = (thing) => {
  checkedOnes.value = thing
  console.log(checkedOnes.value)
}

const isModalActive = ref(false);
const isStopOneActive = ref(false);
const isModalDangerActive = ref(false);
const isAddActive = ref(false);
const isFrozenOneActive = ref(false);
const isstopALL = ref(false);
const isfrozenALL = ref(false);
const isLockOneActive = ref(false);

const ShowOne = ref()
const ShowFind = ref(false);
const result = ref()
const findOne = () => {
  console.log(testdata)
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

// watch(testdata, (data) => {
//   console.log(data)
//   tabledata = data

// })


const changeData = () => {
  loadData()
  isDone.value = false
}
</script>


<template>
  <LayoutAuthenticated>

    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiTableBorder" title="项目管理" main>
        <BaseButton href="https://github.com/kerwin-yang-yang/vue3" target="_blank" :icon="mdiGithub"
          label="Star on GitHub" color="contrast" rounded-full small />
      </SectionTitleLineWithButton>
      <FormField>
        <BaseButtons>
          <!-- <BaseButton color="warning" label="暂停" outline rounded-full @buttonclick="stopOnesbefore" />
          <BaseButton color="warning" label="开始" outline rounded-full @buttonclick="startOnesbefore" /> -->
          <BaseButton color="info" label="冻结" outline rounded-full @buttonclick="frozenOnesbefore" />
          <BaseButton color="info" label="解冻" outline rounded-full @buttonclick="unfrozenOnesbefore" />
          <BaseButton color="danger" label="删除" outline rounded-full @buttonclick="deleteOnesBefore" />
          <BaseButton color="contrast" label="锁定" outline rounded-full @buttonclick="lockoutOnesBefore" />
          <BaseButton color="contrast" label="解锁" outline rounded-full @buttonclick="unlockOnesBefore" />
          <!-- <BaseButton color="danger" label="查询" outline rounded-full @buttonclick="" /> -->
        </BaseButtons>
        <el-form :inline="true" class="form" style="margin-top: 20px;">
          <el-form-item>
            <FormControl v-model="ShowOne" :icon="mdiAccount" placeholder="查询内容" />
          </el-form-item>
          <el-form-item>
            <BaseButtons>
              <BaseButton color="danger" label="查询" outline rounded-full @buttonclick="findOne" />
            </BaseButtons>

            <BaseButton color="success" label="新增" outline rounded-full @buttonclick="add" />

          </el-form-item>

        </el-form>

      </FormField>
      <!-- <Suspense> -->
      <!-- <template #default> -->

      <TableProject refs="table" v-if="isDataLoaded" checkable :data1="tabledata.data" @stopbutton="stopOne"
        @recoverybutton="edit" @deletebutton="deleteOne" @lockoutbutton="lockoutOne" @unlockbutton="" @generatetbutton=""
        @updatebutton="" @downloadbutton="" @frozenbutton='frozenOne' @update-checked-rows="handleCheckedRows" />

      <!-- </template>
        <template #fallback>

          <div>Loading...</div>
        </template> -->
      <!-- </Suspense> -->
    </SectionMain>

    <CardBoxModal v-model="isModalActive" title="修改项目信息" button="info" has-cancel @confirm="updateForm">

      <FormField label="项目名称">
        <FormControl v-model="form.project_name" :icon="mdiAccount" />

      </FormField>

      <FormField label="负责人" help="Do not enter the leading zero">
        <FormControl v-model="form.project_manager_name" type="number" :options='results' />
      </FormField>
      <!-- 

      <FormField label="状态">
        <FormControl v-model="form.status" type="tel" :icon="mdiMail" />
      </FormField>
      <FormField label="客户联系">
        <FormControl v-model="form.customer_contact" type="tel" />

      </FormField>



      <FormField label="联系邮件">
        <FormControl v-model="form.contact_email" type="email" />
      </FormField> -->


      <FormField label="意见" help="Do not enter the leading zero">
        <FormControl v-model="form.comment" type="tel" />
      </FormField>

    </CardBoxModal>

    <CardBoxModal v-model="isAddActive" title="增加" button="info" has-cancel @confirm="addForm">

      <FormField label="项目名称">
        <FormControl v-model="form.project_name" :icon="mdiAccount" />

      </FormField>
      <!-- <FormField label="项目负责人">
        <FormControl v-model="form.project_manager_id" type="number" :icon="mdiMail" />
        <FormControl v-model="form.project_manager" :icon="mdiMail" :options="results" />
      </FormField> -->


      <!-- <FormField label="用户联系方式">
        <FormControl v-model="form.customer_contact" type="email" :icon="mdiMail" />

      </FormField> -->

      <FormField label="目标组织和人员">
        <!-- <FormControl v-model="form.liaison_id" type="number" :icon="mdiMail" /> -->
        <FormControl v-model="form.organization_name" :icon="mdiMail" :options="orgs" />
        <!-- <FormControl v-model="form.liaison_name" :icon="mdiMail" :options="liaisons" /> -->

      </FormField>
      <!-- 
      <FormField label="联系人邮箱">
        <FormControl v-model="form.contact_email" type="email" :icon="mdiMail" />

      </FormField> -->
      <!-- <FormField label="组织选择">
        <FormControl v-model="form.orgid" type="number" :icon="mdiMail" />


      </FormField> -->








      <FormField label="意见">
        <FormControl v-model="form.comment" type="email" :icon="mdiMail" />
      </FormField>
      <!-- 
      <FormField label="电话号码" help="Do not enter the leading zero">
        <FormControl v-model="form.test_number" type="tel" />
      </FormField> -->




    </CardBoxModal>

    <CardBoxModal v-model="isDone" title="消息提醒" button="danger" has-cancel @confirm="changeData">
      <h1>{{ message }}</h1>
    </CardBoxModal>

    <CardBoxModal v-model="isModalDangerActive" title="消息提示" button="danger" has-cancel @confirm="deleteBack">
      <h6>确定要<strong style="color:red"></strong>删除id为{{ tablething }}的项目吗</h6>
    </CardBoxModal>
    <CardBoxModal v-model="isStopOneActive" title="消息提示" button="danger" has-cancel @confirm="stopOneback">
      <h6>确定要<strong style="color:red">{{ form.status == 'Running' ? '暂停' : '恢复' }}</strong> id为{{ tablething }}的项目吗</h6>
    </CardBoxModal>
    <CardBoxModal v-model="isFrozenOneActive" title="消息提示" button="danger" has-cancel @confirm="frozenOneback">
      <h6>确定要<strong style="color:red">{{ form.is_frozen == 'False' ? '冻结' : '解冻' }}</strong> id为{{ tablething }}的项目吗</h6>
    </CardBoxModal>
    <CardBoxModal v-model="isLockOneActive" title="消息提示" button="danger" has-cancel @confirm="Lockoneback">
      <h6>确定要<strong style="color:red">{{ form.is_locked == 'False' ? '锁定' : '解锁2' }}</strong>id为{{ tablething }}的项目吗</h6>
    </CardBoxModal>
    <CardBoxModal v-model="isdelteALL" title="消息提示" button="danger" has-cancel @confirm="deleteOnes">
      <h6>确定要批量删除选择的项目吗，可能会发生严重后果</h6>
    </CardBoxModal>
    <CardBoxModal v-model="isstopALL" title="消息提示" button="danger" has-cancel @confirm="stopOnes">
      <h6>确定要批量暂停选择的项目吗，可能会发生严重后果</h6>
    </CardBoxModal>
    <CardBoxModal v-model="isstartALL" title="消息提示" button="danger" has-cancel @confirm="startOnes">
      <h6>确定要批量重启选择的项目吗，可能会发生严重后果</h6>
    </CardBoxModal>

    <CardBoxModal v-model="isfrozenALL" title="消息提示" button="danger" has-cancel @confirm="frozenOnes">
      <h6>确定要冻结这些的项目吗，可能会发生严重后果</h6>

    </CardBoxModal>
    <CardBoxModal v-model="isunfrozenALL" title="消息提示" button="danger" has-cancel @confirm="unfrozenOnes">
      <h6>确定要解冻这些的项目吗，可能会发生严重后果</h6>

    </CardBoxModal>
    <CardBoxModal v-model="islockALL" title="消息提示" button="danger" has-cancel @confirm="LockOnes">
      <h6>确定要批量锁定选择的项目吗，可能会发生严重后果</h6>
    </CardBoxModal>
    <CardBoxModal v-model="isunlockALL" title="消息提示" button="danger" has-cancel @confirm="unLockOnes">
      <h6>确定要批量解锁选择的项目吗，可能会发生严重后果</h6>
    </CardBoxModal>

    <CardBoxModal v-model="ShowFind" title="查找结果" button="danger" has-cancel @confirm="ShowFind = false">
      <CardBox v-if="result == []">
        <p>
          没有数据
        </p>
      </CardBox>
      <CardBox v-for="item in result" style="border:2px solid">
        <!-- {{ item }} -->
        <FormField label="项目id">
          <FormControl v-model="item.id" :icon="mdiAccount" isdisabled=true />

        </FormField>
        <FormField label="项目名称">
          <FormControl v-model="item.project_name" :icon="mdiAccount" isdisabled=true />

        </FormField>
        <FormField label="状态">
          <FormControl v-model="item.status" type="tel" :icon="mdiMail" isdisabled=true />
        </FormField>
      </CardBox>

    </CardBoxModal>

  </LayoutAuthenticated>
</template>
