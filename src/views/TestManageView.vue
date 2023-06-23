<script setup>
import { reactive, ref, onMounted, Suspense, computed } from "vue";
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

import TableTest from "@/components/Tables/TableTest.vue";

import { get } from "lodash";
import http from "@/request/http";
import { rangeArr } from "element-plus";
import TableMailTemplate from "@/components/Tables/TableMailTemplate.vue";




onMounted(() => {
  loadData()
})
const selectOptions = [
  { id: 1, label: "Business development" },
  { id: 2, label: "Marketing" },
  { id: 3, label: "Sales" },
];
const isModalActive = ref(false);
const isModalDangerActive = ref(false);
const isAddActive = ref(false);
const formStatusWithHeader = ref(true);
const frozenTip = ref(false)
const formStatusCurrent = ref(0);
const ShowOne = ref()
const ShowFind = ref(false);
const result = ref()
const isLockUnlock = ref(false)
const chooseMailTemplateFlag = ref(false)
const chooseCatcherFlag = ref(false)
const chooseMailServerFlag = ref(false)
const chooseTargetFlag = ref(false)
const chooseProjectFlag = ref(false)
const isLockUnlockTip = ref(false)
const isOperationSuccess = ref(false)
const canNotChooseTarget = ref(false)
const isProjectChosen = ref(false)
const isOperationFailed = ref(false)
const isUpdate = ref(false)
const checkedOnes = ref([])
const checkedOnesOfMailTemplate = ref([])
const checkedOnesOfCatcher = ref([])
const checkedOnesOfTarget = ref([])
const checkedOnesOfMailServer = ref([])
const checkedOnesOfProject = ref([])
const formStatusOptions = ["info", "success", "danger", "warning"];
const reportStatusOptions = ref([true, false])
const startTime = ref('01:00')

let isDataLoaded = ref(false)
const updateVisiable = ref(false)
let allData = reactive(null)
// let targetIdList = computed([])
let showData = reactive({
  data: [
    {
      id: '',
      name: '111111111111111111111',
      project_id: '1111111111111111111111',
      mail_id: '11111111111111',
      type: '11111111111111111',
      comments: '11111111111',
      status: '111111111111111',
      catcher_name: '1111111111',
      catcher_id: '111111111111',
      report_status: false,
      target_id_list: '11111111111',
      target_num: '1111111111',
      delivery_name: '111111111',
      delivery_address: '11111111111',
      delivery_freq: '1111111',
      mail_server_id: '11111111',
      mail_server_name: '111111111',
      islocked: false,
      isfrozen: false,
      ispaused: false,
      frozenbyuid: '1111111111',
    }
  ]
})
let mailTemplate = reactive([
  {
    id: '1',
    subject: '账号窃取',
    type: '钓鱼攻击',
    content: '你好：xxxxxx',
    attachid: 'attach_1',
    createtime: '',
    createbyuid: '',
    modifytime: '',
    midifybyuid: '',
    is_locked: 'false',
    comments: '无',
  }, {
    id: 'show',
    subject: '邮件主题show',
    type: '邮件类型show',
    content: '邮件内容show',
    attachid: '附件id-show',
    createtime: '',
    createbyuid: '',
    modifytime: '',
    midifybyuid: '',
    is_locked: 'show',
    comments: 'show',
  }, {
    id: 'show',
    subject: '邮件主题show',
    type: '邮件类型show',
    content: '邮件内容show',
    attachid: '附件id-show',
    createtime: '',
    createbyuid: '',
    modifytime: '',
    midifybyuid: '',
    is_locked: 'show',
    comments: 'show',
  }, {
    id: 'show',
    subject: '邮件主题show',
    type: '邮件类型show',
    content: '邮件内容show',
    attachid: '附件id-show',
    createtime: '',
    createbyuid: '',
    modifytime: '',
    midifybyuid: '',
    is_locked: 'show',
    comments: 'show',
  }, {
    id: 'show',
    subject: '邮件主题show',
    type: '邮件类型show',
    content: '邮件内容show',
    attachid: '附件id-show',
    createtime: '',
    createbyuid: '',
    modifytime: '',
    midifybyuid: '',
    is_locked: 'show',
    comments: 'show',
  }
])
let catcher = reactive([
  {
    id: '',
    address: '',
  }
])
let mailServer = reactive([
  {
    id: '',
    address: '',
  }
])
let project = reactive([
  {
    id: '',
    address: '',
  }
])
let targetOfProject = reactive([
  {
    id: '',
    address: '',
  }
])

let sendDate = ref('')
let startSendTime = ref('')
let currentTime = ref('')
const newTask = reactive([{
  name: '测试',
  project_id: 0,
  project_name: '测试',
  mail_id: 0,
  type: '测试',
  comments: '无',
  status: 'waiting',
  catcher_name: '测试',
  catcher_id: 0,
  report_status: false,
  target_id_list: [],
  target_num: 0,
  delivery_time: '',
  delivery_name: '测试',
  delivery_address: '测试',
  delivery_freq: '10',
  mail_server_id: '10',
  mail_server_name: '测试',
  islocked: false,
  isfrozen: false,
  ispaused: false,
  frozenbyuid: 0,
  mail_template_subject: '',
}]);
let updateInfo = ref({
  id: '',
  name: '测试',
  project_id: '',
  project_name: '测试',
  mail_id: 0,
  type: '测试',
  comments: '无',
  status: 'waiting',
  catcher_name: '测试',
  catcher_id: 0,
  report_status: false,
  target_id_list: '',
  target_num: 0,
  delivery_time: '',
  delivery_name: '测试',
  delivery_address: '测试',
  delivery_freq: '10',
  mail_server_id: '10',
  mail_server_name: '测试',
  islocked: false,
  isfrozen: false,
  ispaused: false,
  frozenbyuid: 0,
  mail_template_subject: '',
})
let form = reactive({})

let testdata = reactive(null)
const tablething = ref(null)

const loadData = async () => {
  http.get('/task/')
    .then((response) => {
      allData = response.data.children
      showData.data = allData

      showData.data.forEach(item => {
        if (item.status == 'finish') {
          item.status = '结束'
        } else if (item.status == 'waiting') {
          item.status = '等待'
        } else if (item.status == 'frozen') {
          item.status = '冻结'
        } else {
          item.status = '运行'
        }
      })
      isDataLoaded.value = true
    })
}
const customElementsForm = reactive({
  checkbox: ["lorem"],
  radio: "one",
  switch: ["one"],
  file: null,
});



function getCurrentTime() {
  var now = new Date();
  var hours = now.getHours().toString().padStart(2, '0'); // 获取小时，并补零
  var minutes = now.getMinutes().toString().padStart(2, '0'); // 获取分钟，并补零
  var currentTime = hours + ':' + minutes;
  return currentTime;
}
const formStatusSubmit = () => {
  formStatusCurrent.value = formStatusOptions[formStatusCurrent.value + 1]
    ? formStatusCurrent.value + 1
    : 0;
};

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
const show = (thing) => {
  // console.log(thing)
  // tablething.value = thing
  form = testdata.find(obj => obj.id == thing);
  console.log(form)
  isModalActive.value = true

};



const updateForm = () => {
  const id = form.value.id
  delete form.value.createtime;
  delete form.value.freezetime;
  delete form.value.id;
  delete form.value.modifytime;
  http.put('/user/' + updateInfo.id, form.value)
    .then((response) => {
      console.log(response)
    })
}
const handleCheckedRows = (thing) => {
  checkedOnes.value = thing
  console.log(checkedOnes.value)
}
const handleCheckedRowsOfMailTemplate = (thing) => {
  checkedOnesOfMailTemplate.value = thing
  console.log(checkedOnesOfMailTemplate.value)
  newTask.mail_id = checkedOnesOfMailTemplate.value[0].id
  newTask.mail_template_subject = checkedOnesOfMailTemplate.value[0].subject
  // form = checkedOnesOfMailTemplate.value
  console.log(newTask.mail_id)
}
const handleCheckedRowsOfCatcher = (thing) => {
  if (isUpdate.value == false) {
    checkedOnesOfCatcher.value = thing
    console.log(checkedOnesOfCatcher.value)
    newTask.catcher_id = checkedOnesOfCatcher.value[0].id
    newTask.catcher_name = checkedOnesOfCatcher.value[0].name

  } else {
    checkedOnesOfCatcher.value = thing
    updateInfo.value.catcher_id = checkedOnesOfCatcher.value[0].id
    updateInfo.value.catcher_name = checkedOnesOfCatcher.value[0].name

  }

}
const handleCheckedRowsOfMailServer = (thing) => {

  checkedOnesOfMailServer.value = thing
  newTask.mail_server_id = checkedOnesOfMailServer.value[0].id
  newTask.mail_server_name = checkedOnesOfMailServer.value[0].name
  console.log('ssssssssssss')
  console.log(newTask.mail_server_id)

}
const handleCheckedRowsOfProject = (thing) => {
  checkedOnesOfProject.value = thing
  console.log(checkedOnesOfProject.value)
  newTask.project_id = checkedOnesOfProject.value[0].id
  newTask.project_name = checkedOnesOfProject.value[0].project_name
  // form = checkedOnesOfMailTemplate.value
  console.log(newTask.project_id)
}
const handleCheckedRowsOfTargetOfProject = (thing) => {
  if (isUpdate.value == false) {
    checkedOnesOfTarget.value = thing
    var packedString = '[';
    checkedOnesOfTarget.value.forEach(item => {
      packedString += item.id;
      packedString += ','
    })
    packedString = packedString.slice(0, packedString.length - 1)
    packedString += ']';
    console.log('ggggggg')
    console.log(packedString)
    newTask[0].target_id_list = packedString
    newTask[0].target_num = checkedOnesOfTarget.value.length
  } else {
    checkedOnesOfTarget.value = thing
    var packedString = '[';
    checkedOnesOfTarget.value.forEach(item => {
      packedString += item.id;
      packedString += ','
    })
    packedString = packedString.slice(0, packedString.length - 1)
    packedString += ']';
    console.log('ggggggg')
    console.log(packedString)
    updateInfo.value.target_id_list = packedString
  }

}

const lock = (thing) => {
  // console.log(thing)
  http.patch('/task/' + thing + '/action/lock')
    .then((response) => {
      console.log(response)
    })
}
const unlock = (thing) => {
  // console.log(thing)
  http.patch('/task/' + thing + '/action/unlock')
    .then((response) => {
      console.log(response)
    })
}
const froze = (thing) => {
  // console.log(thing)
  http.patch('/task/' + thing + '/action/freeze')
    .then((response) => {
      console.log(response)
    })
}
const unfroze = (thing) => {
  // console.log(thing)
  http.patch('/task/' + thing + '/action/unfreeze')
    .then((response) => {
      console.log(response)
    })
}
const shut = (thing) => {
  // conosle.log(tablething.value)
  // console.log(thing)
  tablething.value = thing
  isModalDangerActive.value = true
}
const confirmShut = () => {
  http.delete('/task/' + tablething.value)
    .then((response) => {
      if (response.status == 201) {
        isOperationSuccess.value = true
      }
    })
}
const update = (thing) => {
  updateInfo.value = thing;
  updateVisiable.value = true
  isUpdate.value = true
  console.log(thing)
  console.log(updateInfo.value)
}
const confirmUpdate = () => {

  updateInfo.value.project_id = parseInt(updateInfo.valueproject_id);
  updateInfo.value.mail_server_id = parseInt(updateInfo.value.mail_id);
  updateInfo.value.catcher_id = parseInt(updateInfo.value.catcher_id);
  updateInfo.value.delivery_freq = parseInt(updateInfo.value.delivery_freq);
  updateInfo.value.delivery_time = formatDate(sendDate.value) + ' ' + startSendTime.value + ':00.000000'
  console.log(updateInfo.value)
  // http.put('/task/'+updateInfo.value.id,{
  //   type:updateInfo.value.type,
  //   name:updateInfo.value.name,
  //   id:updateInfo.value.id,
  //   project_id:updateInfo.value.project_id,
  //   catcher_id:updateInfo.value.catcher_id,
  //   mail_server_id:updateInfo.value.mail_server_id,
  //   delivery_freq:updateInfo.value.delivery_freq,
  //   target_id_list:updateInfo.value.target_id_list,
  //   delivery_time:updateInfo.value.delivery_time,
  // }).then(response => {
  //   if (response.status == 201) {
  //     isOperationSuccess.value = true
  //   }else{
  //     isOperationFailed.value = true
  //   }
  // })
  // .catch(error => {
  //   console.error(error);
  // });
  isUpdate.value = false
}
const lock_unlock = (thing) => {
  tablething.value = thing
  // form.value = testdata.find(obj => obj.id == thing);
  isLockUnlock.value = true;

}
// 停止某个项目
const confirmlockUnlock = () => {

  let isfrozen = ref('Stop');
  console.log(form.value)
  if (form.value.status == 'Running') {
    isfrozen.value = 'Stop';
  }
  else {
    isfrozen.value = 'Running';
  }
  http.patch(`/project/${tablething.value}/action/${isfrozen.value}`)
    .then((response) => {

      isStopOneActive.value = false;

      message.value = response.data
      isDone.value = true;

    })
    .catch((error) => {
      isStopOneActive.value = false;

      message.value = error.message
      isDone.value = true;
    })
}
function formatDate(dateString) {
  const regex = /^(\w{3})\s(\w{3})\s(\d{2})\s(\d{4})/;
  const match = regex.exec(dateString);

  if (match) {
    const [, , month, day, year] = match;
    const monthIndex = {
      Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06',
      Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12'
    };

    return `${year}-${monthIndex[month]}-${day.padStart(2, '0')}`;
  }

  return null;
}






const add = () => {
  isAddActive.value = true;
  currentTime.value = getCurrentTime()
}
const confirmAdd = () => {
  console.log(newTask[0].target_id_list)
  newTask.project_id = parseInt(newTask.project_id);
  newTask.mail_id = parseInt(newTask.mail_id);
  newTask.catcher_id = parseInt(newTask.catcher_id);
  newTask.target_num = parseInt(newTask.target_num);
  newTask.delivery_freq = parseInt(newTask.delivery_freq);
  newTask.mail_server_id = parseInt(newTask.mail_server_id);
  newTask.frozenbyuid = parseInt(newTask.frozenbyuid);
  newTask.islocked = Boolean(newTask.islocked)
  newTask.isfrozen = Boolean(newTask.isfrozen)
  newTask.ispaused = Boolean(newTask.ispaused)
  newTask.report_status = Boolean(newTask.report_status)
  newTask.delivery_time = formatDate(sendDate.value) + ' ' + startSendTime.value + ':00.000000'
  console.log(newTask.target_id_list)
  console.log(startSendTime.value)

  http.post('/task/', {
    name: newTask.name,
    project_id: newTask.project_id,
    type: newTask.type,
    mail_id: newTask.mail_id,
    // status:newTask.status,
    catcher_id: newTask.catcher_id,
    report_status: newTask.report_status,
    // target_num:newTask.target_num,
    // target_id_list:newTask[0].target_id_list,
    target_id_list: newTask[0].target_id_list,
    delivery_name: newTask.delivery_name,
    delivery_time: newTask.delivery_time,
    delivery_address: newTask.mail_server_name,
    delivery_freq: newTask.delivery_freq,
    mail_server_id: newTask.mail_server_id,
    islocked: false,
    isfrozen: false,
    ispaused: false,
    frozenbyuid: 0,
    comments: newTask.comments
  }).then((response) => {
    // console.log('here')

    // // }
    isOperationSuccess.value = true
  })
}
const selectedStart = () => {
  checkedOnes.value.forEach((task) => {
    console.log(task.id)
    http.patch('/task/' + task.id + '/action/begin').then(response => {
      console.log(response.data)
      if (response.status == 201) {
        isOperationSuccess.value = true
      }
    }).catch(error => {
      console.error(error);
    })
  })
}
const selectedLock = () => {
  checkedOnes.value.forEach((task) => {
    console.log(task)
    http.patch('/task/' + task.id + '/action/lock').then(response => {
      console.log(response.data)
      if (response.status == 201) {
        isOperationSuccess.value = true
      }
    }).catch(error => {
      console.error(error);

    })
  })
}
const selectedUnlock = () => {
  checkedOnes.value.forEach((task) => {
    console.log(task)
    http.patch('/task/' + task.id + '/action/unlock').then(response => {
      console.log(response.data)
      if (response.status == 201) {
        isOperationSuccess.value = true
      }
    }).catch(error => {
      console.error(error);
    })
  })
}
const selectedFroze = () => {
  checkedOnes.value.forEach((task) => {
    console.log(task)
    http.patch('/task/' + task.id + '/action/freeze').then(response => {
      console.log(response.data)
      if (response.status == 201) {
        isOperationSuccess.value = true
      }
    }).catch(error => {
      console.error(error);
    })
  })
}
const selectedUnfroze = () => {
  checkedOnes.value.forEach((task) => {
    console.log(task)
    http.patch('/task/' + task.id + '/action/unfreeze').then(response => {
      console.log(response.data)
      if (response.status == 201) {
        isOperationSuccess.value = true
      }
    }).catch(error => {
      console.error(error);
    })
  })
}
const selectedPause = () => {
  checkedOnes.value.forEach((task) => {
    console.log(task)
    http.patch('/task/' + task.id + '/action/pause').then(response => {
      console.log(response.data)
      if (response.status == 201) {
        isOperationSuccess.value = true
      }
    }).catch(error => {
      console.error(error);
    })
  })
}
const selectedUnpause = () => {
  checkedOnes.value.forEach((task) => {
    console.log(task)
    http.patch('/task/' + task.id + '/action/unpause').then(response => {
      console.log(response.data)
      if (response.status == 201) {
        isOperationSuccess.value = true
      }
    }).catch(error => {
      console.error(error);
    })
  })
}
const selectedDelete = () => {
  checkedOnes.value.forEach((task) => {
    console.log(task)
    http.patch('/task/' + task.id + '/action/delete').then(response => {
      console.log(response.data)
      if (response.status == 201) {
        isOperationSuccess.value = true
      }
    }).catch(error => {
      console.error(error);
    })
  })
}
const findOne = () => {
  // if (allData != null) {
  console.log(allData)
  result.value = allData.filter(item => {
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
  // } else {
  //   result.value = [];
  // }
  ShowFind.value = true
  console.log(result.value);
}
const chooseMailTemplate = async () => {
  await http.get('/mail/template')
    .then((response) => {
      mailTemplate = response.data.children
      console.log('ssssssssssssssssssssssssssssssss')
    })
  chooseMailTemplateFlag.value = true
}
const chooseCatcher = async () => {
  await http.get('/server_catcher/')
    .then((response) => {
      catcher = response.data.children
    })
  chooseCatcherFlag.value = true
}
const chooseMailServer = async () => {
  await http.get('/sever_sender/')
    .then((response) => {
      mailServer = response.data.children
    })
  chooseMailServerFlag.value = true
}
const chooseTarget = async () => {
  if (isProjectChosen.value == true) {
    await http.get('/user/' + newTask.project_id + '/info')
      // await http.get('/sever_sender/')
      .then((response) => {
        targetOfProject = response.data.children
        console.log('papapap')
        console.log(targetOfProject)
      })
    chooseTargetFlag.value = true
  } else {
    canNotChooseTarget.value = true
  }

}
const chooseProject = async () => {
  await http.get('/project/')
    .then((response) => {
      project = response.data.children
    })
  chooseProjectFlag.value = true
  isProjectChosen.value = true
}

const lockUnlockConfirm = (thing) => {
  form = thing
  isLockUnlockTip.value = true
}
const lockUnlock = () => {
  if (form.islocked == false) {
    http.patch('/task/' + form.id + '/action/lock')
      .then((response) => {
        if (response.status == 201) {
          isOperationSuccess.value = true
        }
      })
    console.log('false')
  } else {
    http.patch('/task/' + form.id + '/action/unlock')
      .then((response) => {
        if (response.status == 201) {
          isOperationSuccess.value = true
        }
      })

  }
}
const freezeUnfreeze = (thing) => {
  if (thing.isfrozen == false && thing.status == 'running') {
    http.patch('/task/' + thing.id + '/action/freeze')
      .then((response) => {
        if (response.status == 201) {
          isOperationSuccess.value = true
        }
      })
  } else if (thing.isfrozen == true) {
    http.patch('/task/' + thing.id + '/action/unfreeze')
      .then((response) => {
        if (response.status == 201) {
          isOperationSuccess.value = true
        }
      })
  } else {
    frozenTip.value = true
  }
}

const setDisableDate = (time) => {
  const today = new Date().setHours(0, 0, 0, 0); // 获取今天的起始时间（时、分、秒、毫秒均为0）
  return time.getTime() < today;
}
const ChangeData = () => {
  loadData()
}
const downQrcode = (thing) => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', '/qrcode/' + thing, true);
  xhr.responseType = 'blob';
  xhr.onload = function () {
    if (this.status === 200) {
      const blob = this.response;
      const a = document.createElement('a');
      a.download = 'qrcode.zip';
      a.href = URL.createObjectURL(blob);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };
  xhr.send();
};
</script>

<template>
  <LayoutAuthenticated>



    <CardBox class="mb-6" has-table>
      <CardBoxModal v-model="isAddActive" title="添加测评任务信息" button="info" has-cancel @confirm="confirmAdd">
        <FormField label="任务名称">
          <FormControl v-model="newTask.name" :icon="mdiAccount" />
        </FormField>
        <FormField label="任务目标">
          <FormControl v-model="newTask[0].target_id_list" :icon="mdiAccount" isdisabled=true />
          <BaseButton color="contrast" label="选择目标" outline rounded-full @buttonclick="chooseTarget" />
        </FormField>
        <FormField label="项目编号">
          <FormControl v-model="newTask.project_name" :icon="mdiAccount" isdisabled=true />
          <BaseButton color="contrast" label="选择项目编号" outline rounded-full @buttonclick="chooseProject" />
        </FormField>
        <FormField label="任务种类">
          <FormControl v-model="newTask.type" :icon="mdiAccount" :options="['mail', 'qrcode']" />
        </FormField>
        <FormField label="邮件模板">
          <FormControl v-model="newTask.mail_template_subject" :icon="mdiAccount" isdisabled=true />
          <BaseButton color="contrast" label="选择邮件模板" outline rounded-full @buttonclick="chooseMailTemplate" />
        </FormField>
        <FormField label="捕获服务器">
          <FormControl v-model="newTask.catcher_name" :icon="mdiAccount" isdisabled=true />
          <BaseButton color="contrast" label="选择捕获服务器" outline rounded-full @buttonclick="chooseCatcher" />
        </FormField>
        <FormField label="报告状态">
          <FormControl v-model="newTask.report_status" :icon="mdiAccount" :options="[false, true]" />
        </FormField>
        <FormField label="目标数量">
          <FormControl v-model="newTask[0].target_num" :icon="mdiAccount" isdisabled=true type="number" />
        </FormField>

        <FormField label="发件人">
          <FormControl v-model="newTask.delivery_name" :icon="mdiAccount" />
        </FormField>
        <FormField label="发件时间">
          <el-date-picker v-model="sendDate" type="date" placeholder="选择日期" :disabled-date="setDisableDate"
            size="large" />
          <el-time-select v-model="startSendTime" start="00:00" step="00:5" end="23:45" placeholder="选择时间" />
        </FormField>
        <FormField label="邮件服务器">
          <FormControl v-model="newTask.mail_server_id" :icon="mdiAccount" isdisabled=true />
          <BaseButton color="contrast" label="选择邮件服务器" outline rounded-full @buttonclick="chooseMailServer" />
        </FormField>
        <FormField label="发件地址">
          <FormControl v-model="newTask.mail_server_name" :icon="mdiAccount" isdisabled=true />
        </FormField>
        <FormField label="频率">
          <FormControl v-model="newTask.delivery_freq" :icon="mdiAccount" type="number" />
        </FormField>

        <!-- <FormField label="锁定">
          <FormControl v-model="newTask.islocked" :icon="mdiAccount" />
        </FormField>
        <FormField label="冻结">
          <FormControl v-model="newTask.isfrozen" :icon="mdiAccount" />
        </FormField>
        <FormField label="暂停">
          <FormControl v-model="newTask.ispaused" :icon="mdiAccount" />
        </FormField>
        <FormField label="冻结操作者">
          <FormControl v-model="newTask.frozenbyuid" :icon="mdiAccount" />
        </FormField> -->
        <FormField label="备注">
          <FormControl v-model="newTask.comments" :icon="mdiAccount" />
        </FormField>
      </CardBoxModal>
      <CardBoxModal v-model="isModalDangerActive" title="确认删除" button="danger" has-cancel @confirm="confirmShut">
        <h6>确定要删除id为{{ tablething }}的测评任务吗</h6>
      </CardBoxModal>
    </CardBox>

    <CardBoxModal v-model="isLockUnlockTip" title="确认操作" button="danger" has-cancel @confirm="lockUnlock">
      <h6>确定要{{ form.islocked == true ? '解锁' : '锁定' }}id为{{ form.id }}的测评任务吗</h6>
    </CardBoxModal>
    <CardBoxModal v-model="isOperationSuccess" title="操作完成" button="danger" has-cancel @confirm="ChangeData">
      <h6>操作成功！</h6>
    </CardBoxModal>
    <CardBoxModal v-model="isOperationFailed" title="操作终端" button="danger" has-cancel @confirm="">
      <h6>操作失败！</h6>
    </CardBoxModal>
    <CardBoxModal v-model="canNotChooseTarget" title="提示" button="danger" has-cancel @confirm="">
      <h6>必须先选择项目后，才能确定目标人员</h6>
    </CardBoxModal>



    <CardBoxModal v-model="frozenTip" title="无法冻结" button="danger" has-cancel @confirm="confirmLockUnlock">
      <h6>只能冻结处于运行中的任务！</h6>
    </CardBoxModal>

    <CardBoxModal v-model="updateVisiable" title="修改测评任务信息" button="info" has-cancel @confirm="confirmUpdate">
      <FormField label="任务名称">
        <FormControl v-model="updateInfo.name" :icon="mdiAccount" />
      </FormField>
      <FormField label="任务种类">
        <FormControl v-model="updateInfo.type" :icon="mdiAccount" :options="['mail', 'qrcode']" />
      </FormField>
      <FormField label="项目编号">
        <FormControl v-model="updateInfo.project_id" :icon="mdiAccount" isdisabled=true />
        <BaseButton color="contrast" label="选择项目编号" outline rounded-full @buttonclick="chooseProject" />
      </FormField>
      <FormField label="捕获服务器">
        <FormControl v-model="updateInfo.catcher_name" :icon="mdiAccount" isdisabled=true />
        <BaseButton color="contrast" label="选择捕获服务器" outline rounded-full @buttonclick="chooseCatcher" />
      </FormField>
      <FormField label="邮件服务器">
        <FormControl v-model="updateInfo.mail_server_id" :icon="mdiAccount" isdisabled=true />
        <BaseButton color="contrast" label="选择邮件服务器" outline rounded-full @buttonclick="chooseMailServer" />
      </FormField>
      <FormField label="频率">
        <FormControl v-model="updateInfo.delivery_freq" :icon="mdiAccount" type="number" />
      </FormField>
      <FormField label="任务目标">
        <FormControl v-model="updateInfo.target_id_list" :icon="mdiAccount" isdisabled=true />
        <!-- <FormControl v-model="targetIdList" :icon="mdiAccount"  /> -->
        <BaseButton color="contrast" label="选择目标" outline rounded-full @buttonclick="chooseTarget" />
      </FormField>
      <FormField label="发件时间">
        <!-- <FormControl v-model="newTask.delivery_time" :icon="mdiAccount" /> -->
        <el-date-picker v-model="sendDate" type="date" placeholder="选择日期" :disabled-date="setDisableDate" size="large" />
        <el-time-select v-model="startSendTime" start="00:00" step="00:15" end="23:45" placeholder="选择时间" />
      </FormField>
      <!-- <FormControl v-model="newTask.islocked" :icon="mdiAccount" :options="{true,false}" /> -->
    </CardBoxModal>

    <CardBoxModal v-model="ShowFind" title="查找结果" button="danger" has-cancel @confirm="ShowFind = false">
      <CardBox v-if="result == []">
        <p>
          没有数据
        </p>
      </CardBox>
      <CardBox v-for="item in result" style="border:2px solid">
        <!-- {{ item }} -->
        <FormField label="任务名称">
          <FormControl v-model="item.name" :icon="mdiAccount" />

        </FormField>
        <FormField label="状态">
          <FormControl v-model="item.status" type="tel" :icon="mdiMail" />
        </FormField>
      </CardBox>
    </CardBoxModal>


    <CardBoxModal v-model="chooseMailTemplateFlag" title="邮件模板" button="danger" has-cancel @confirm="ShowFind = false">
      <TableMailTemplate @update-checked-rows="handleCheckedRowsOfMailTemplate" checkable :data1="mailTemplate" />
    </CardBoxModal>
    <CardBoxModal v-model="chooseMailServerFlag" title="邮件服务器" button="danger" has-cancel @confirm="ShowFind = false">
      <TableMailTemplate @update-checked-rows="handleCheckedRowsOfMailServer" checkable :data1="mailServer" />
    </CardBoxModal>
    <CardBoxModal v-model="chooseTargetFlag" title="目标" button="danger" has-cancel @confirm="ShowFind = false">
      <TableMailTemplate @update-checked-rows="handleCheckedRowsOfTargetOfProject" checkable :data1="targetOfProject" />
    </CardBoxModal>
    <CardBoxModal v-model="chooseCatcherFlag" title="捕获服务器" button="danger" has-cancel @confirm="ShowFind = false">
      <TableMailTemplate checkable @update-checked-rows="handleCheckedRowsOfCatcher" :data1="catcher" />
    </CardBoxModal>
    <CardBoxModal v-model="chooseProjectFlag" title="项目列表" button="danger" has-cancel @confirm="ShowFind = false">
      <TableMailTemplate checkable @update-checked-rows="handleCheckedRowsOfProject" :data1="project" />
    </CardBoxModal>









    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiTableBorder" title="钓鱼测评任务管理" main>
        <BaseButton href="https://github.com/kerwin-yang-yang/vue3" target="_blank" :icon="mdiGithub"
          label="Star on GitHub" color="contrast" rounded-full small />
      </SectionTitleLineWithButton>

      <FormField>
        <BaseButtons>
          <BaseButton color="contrast" label="新增" outline rounded-full @buttonclick="add" />
          <BaseButton color="info" label="开始" outline rounded-full @buttonclick="selectedStart" />
          <BaseButton color="warning" label="暂停" outline rounded-full @buttonclick="selectedPause" />
          <BaseButton color="success" label="继续" outline rounded-full @buttonclick="selectedUnpause" />
          <BaseButton color="warning" label="锁定" outline rounded-full @buttonclick="selectedLock" />
          <BaseButton color="success" label="解锁" outline rounded-full @buttonclick="selectedUnlock" />
          <BaseButton color="warning" label="冻结" outline rounded-full @buttonclick="selectedFroze" />
          <BaseButton color="success" label="解冻" outline rounded-full @buttonclick="selectedUnfroze" />
          <BaseButton color="danger" label="删除" outline rounded-full @buttonclick="selectedDelete" />


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
            <TableTest checkable :data1="showData.data" @update-checked-rows="handleCheckedRows"
              @lockUnlockButton="lockUnlockConfirm" @freezeUnfreezeButton="freezeUnfreeze" @updatebutton="update"
              @shutbutton="shut" @downloadbutton='downQrcode' />
          </CardBox>
        </template>
        <template #fallback>

          <div>Loading...</div>
        </template>
      </Suspense>
    </SectionMain>
  </LayoutAuthenticated>
</template>
