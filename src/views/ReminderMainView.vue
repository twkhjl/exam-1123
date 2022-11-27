<script setup>
import { onMounted, ref } from 'vue';
import ReminderItemVue from '../components/ReminderItem.vue';
import { useReminderStore } from "../stores/reminder";
import { useStorageStore } from '../stores/auth/user_storage';
import { useAuthStore } from '../stores/auth/user_auth';

import router from '@/router'

import loaderVue from '../components/loader.vue'


const storage = useStorageStore();
const auth = useAuthStore();

const reminderStore = useReminderStore();

const data = ref([]);
const errors = ref(null);

const is_loading = ref(true);

const title = ref();
const description = ref();
const send_notification = ref("no");

const send_date = ref();
const send_time = ref();
const filter_is_done = ref(false);

onMounted(async () => {

  data.value = await reminderStore.all({ is_done: filter_is_done.value });
  
  is_loading.value=false;

  // reset modal when modal is hidden
  $("#modalAddNew").on("hidden.bs.modal", function (e) {
    resetForm();

  })
})

function resetForm() {
  title.value = '';
  description.value = '';
  send_notification.value = 'no';
  send_date.value = null;
  send_time.value = null;
  errors.value = null;

}

async function filterIsDone() {

  is_loading.value=true;

  data.value = await reminderStore.all({
    is_done: !filter_is_done.value
  });

  filter_is_done.value = !filter_is_done.value;
  is_loading.value=false;

}

async function toggleItemIsDone(id) {

  is_loading.value=true;
  data.value = await reminderStore.all({ is_done: filter_is_done.value });
  is_loading.value=false;

  // let item_id = data.value.findIndex((el)=>el.id==id);
  // console.log(data.value[item_id]);

  // data.value[item_id].is_done=!data.value[item_id].is_done;

}


async function create() {


  const is_send_enabled = send_notification.value == 'no' ? false : true;
  const req_data = {
    title: title.value,
    description: description.value,
    send_notification: is_send_enabled,
    send_time: send_time.value,
  };

  is_loading.value = true;
  const result = await reminderStore.store(req_data);
  is_loading.value = false;
  if (result.errors) {
    errors.value = result.errors;
    return;
  }
  data.value = await reminderStore.all({ is_done: filter_is_done.value });
  $('#modalAddNew').modal('hide');
}

async function remove(id) {
  const choice=confirm('是否確定刪除?');

  if(choice){
    const result = await reminderStore.destroy({id});
    console.log(result);
    data.value = data.value.filter((o) => o.id !== id);
  }
  return;
}

async function update() {

  data.value = await reminderStore.all({ is_done: filter_is_done.value });

  return;

}



async function logout() {
  await auth.logout()
  storage.removeUser()
  storage.removeToken()

  router.push({ name: 'login' })
}

</script>

<template>

  <div class="container">
    <div class="row">
      <div class="col-sm-12 mt-4">
        <button data-toggle="modal" data-target="#modalAddNew" class="btn btn-md btn-success mr-2">新增提醒事項</button>
        <button @click="filterIsDone()" class="btn btn-md btn-secondary">
          {{ `切換${filter_is_done ? '未完成' : '已完成'}提醒事項` }}
        </button>
        <button @click="router.push({name:'home'})" class="btn btn-md btn-info ml-2">回首頁</button>


        <div class="dropdown user-menu-dropdown-btn">
          <button class="btn btn-warning dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown"
            aria-haspopup="true" aria-expanded="false">
            {{ storage.getUser().name }},你好!
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <RouterLink to="/changePassword" class="dropdown-item">更改密碼</RouterLink>
            <RouterLink to="/" class="dropdown-item">回到首頁</RouterLink>
            <a @click.prevent="logout" class="dropdown-item" href="#">登出</a>
          </div>

        </div>

      </div>
    </div>
  </div>

  <hr>
  <div class="container mt-10vh mb-4">
    <div class="row relative">
      <template v-if="is_loading">
        <div class="loader-container d-flex">
          <loaderVue></loaderVue>
        </div>
      </template>
      <template v-else>

        <template v-if="data.length<=0">
          <div>目前無資料...</div>
        </template>
        <template v-for="(item, idx) in data" :key="idx">
          <ReminderItemVue :reminder="item" @onRemoveEvent="remove" @onUpdateEvent="update"
            @onToggleItemIsDoneEvent="toggleItemIsDone"></ReminderItemVue>
        </template>

      </template>

    </div>
  </div>



  <!-- modal -->

  <div class="modal fade" id="modalAddNew" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">新增提醒事項</h5>
        </div>
        <div class="modal-body">
          <form id="formAddNew">
            <div class="form-group">
              <label for="inputTitle">提醒事項主題</label>
              <input v-model="title" type="text" class="form-control" id="inputTitle" aria-describedby="emailHelp"
                placeholder="請輸入主題">
              <template v-if="errors">
                <div class="mt-2 mb-2 text-danger">{{ errors && errors.title[0] || '' }}</div>
              </template>
            </div>
            <div class="form-group">
              <label for="textareaDescription">提醒事項備註</label>
              <textarea v-model="description" class="form-control" id="textareaDescription" rows="3"
                placeholder="請輸入備註"></textarea>
            </div>
            <div class="form-check form-check-inline">
              <span class="mr-2">是否寄出提醒通知信?</span>
              <input v-model="send_notification" class="form-check-input" type="radio" name="inlineRadioOptions"
                id="inlineRadio1" value="no">
              <label class="form-check-label" for="inlineRadio1">否</label>
            </div>
            <div class="form-check form-check-inline">
              <input v-model="send_notification" class="form-check-input" type="radio" name="inlineRadioOptions"
                id="inlineRadio2" value="yes">
              <label class="form-check-label" for="inlineRadio2">是</label>
            </div>
            <template v-if="send_notification == 'yes'">
              <div class="form-group mt-4">
                <label for="inputSendDate">選擇寄送時間</label>
                <input v-model="send_time" type="datetime-local" class="form-control" id="inputSendDate"
                  aria-describedby="emailHelp" placeholder="">
                <template v-if="errors">
                  <div class="mt-2 mb-2 text-danger">{{ errors && errors['send_time'][0] || '' }}</div>
                </template>
              </div>

            </template>

          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            取消
          </button>

          <template v-if="is_loading">
            <button class="btn btn-secondary" data-dismiss="modal" disabled>
              <div class="spinner-border spinner-border-sm" role="status">
                <span class="sr-only">Loading...</span>
              </div>
              請稍候...
            </button>
          </template>
          <template v-else>
            <button @click.prevent="create" type="button" class="btn btn-primary">送出</button>
          </template>
        </div>
      </div>
    </div>
  </div>



</template>


<style scoped>
* {
  /* border: 1px solid black; */
}

.user-menu-dropdown-btn {
  position: absolute;
  top: 32px;
  right: 0;
}

.loader-container{
  position:absolute;
  left:0;
  top:-5vh;
  width:100vw;
  height:auto;
  /* border:1px solid black; */
  justify-content: center;
  align-items: center;
}

</style>