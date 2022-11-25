<script setup>
import { onMounted, ref } from 'vue';
import ReminderItemVue from '../components/ReminderItem.vue';
import { useReminderStore } from "../stores/reminder";

const reminderStore = useReminderStore();

const data = ref();
const errors = ref(null);

const is_loading = ref(false);

const title = ref();
const description = ref();
const send_notification = ref("no");


onMounted(async () => {

  data.value = await reminderStore.all();

  // reset modal when modal is hidden
  $("#modalAddNew").on("hidden.bs.modal", function (e) {
    resetForm();

  })
})

function resetForm() {
  title.value = '';
  description.value = '';
  send_notification.value = 'no';
  errors.value=null;

}


async function create() {

  const is_send_enabled = send_notification.value == 'no' ? false : true;
  const req_data = {
    title: title.value,
    description: description.value,
    send_notification: is_send_enabled,
  };
  is_loading.value=true;
  const result = await reminderStore.store(req_data);
  is_loading.value=false;

  if(result.errors){
    errors.value =result.errors;
    return;
  }
  data.value = await reminderStore.all();
  $('#modalAddNew').modal('hide');
}

async function remove(id){
  await reminderStore.destroy(id);

  data.value = data.value.filter((o) => o.id !== id);

  console.log(id);
  return;
}

async function update(){
 
  data.value = await reminderStore.all();
  
  return;

}



</script>

<template>

  <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <button data-toggle="modal" data-target="#modalAddNew" class="btn btn-md btn-success mr-2">新增提醒事項</button>
        <button class="btn btn-md btn-secondary">切換已完成提醒事項</button>
      </div>
    </div>
  </div>

  <hr>
  <div class="container mt-10vh">
    <div class="row">
      <template v-for="(item, idx) in data" :key="idx">
        <ReminderItemVue 
        :reminder="item"
        @onRemoveEvent="remove"
        @onUpdateEvent="update"
        ></ReminderItemVue>
      </template>

    </div>
  </div>



  <!-- modal -->

  <div class="modal fade" id="modalAddNew" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">新增提醒事項</h5>
          <!-- <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button> -->
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
              <small id="emailHelp" class="form-text text-muted"></small>
            </div>
            <div class="form-group">
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
</style>