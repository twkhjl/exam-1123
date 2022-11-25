<script setup>
import { ref } from 'vue';
import { useReminderStore } from "../stores/reminder";

const reminderStore = useReminderStore();

defineProps([
  'reminder',
  'title',
  'description'])


const emits = defineEmits(['onRemoveEvent', 'onUpdateEvent'])

const is_editing = ref(false);

const errors = ref(null);

function startEditing() {
  is_editing.value = true;
}
function cancelEditing() {
  is_editing.value = false;
}


const title = ref();
const description = ref();


function get_datetime_format(created_at, updated_at) {

  // const d = new Date();
  // return d;

  let created_at_parts = created_at.split(/[- : T]/);

  const [year, month, day, hour, min, sec] = created_at_parts;
  return `新增於${year}-${month}-${day} ${hour}:${min},最後修改於${updated_at}`;
}

async function remove(id) {
  await emits('onRemoveEvent', id);
  return;
}

async function update(id) {
  const updatedData = {
    id,
    title: title.value.value,
    description: description.value.value,
  };

  const result = await reminderStore.update(updatedData);

  if (result.errors) {
    errors.value = result.errors;
    return;
  }
  is_editing.value = false;
  await emits('onUpdateEvent');
  return;
}

</script>


<template>
  <div class="container mt-4 bg-light-gray">
    <div class="row">
      <div class="col-sm-12 px-4">
        <template v-if="is_editing">




          <input ref="title" class="form-control mt-4" :value="reminder.title" type="text">

          <template v-if="errors">
            <div class="mt-2 mb-2 text-danger">{{ errors && errors.title[0] || '' }}</div>
          </template>

        </template>
        <template v-else>
          <h1>{{ reminder.title }}</h1>
        </template>

        <hr>

        <template v-if="!is_editing">
          <!-- <div>新增於2022-10-22 23:47,最後修改於2022-10-22 23:47</div> -->
          <div>{{ get_datetime_format(reminder.created_at, reminder.updated_at) }}</div>
          <hr>
        </template>


        <template v-if="is_editing">
          <textarea ref="description" class="form-control" rows="3">{{ reminder.description }}</textarea>
        </template>
        <template v-else>
          <h5 class="">{{ reminder.description }}</h5>
        </template>
        <hr>
      </div>

      <template v-if="is_editing">
        <div class="col-sm-12 d-flex justify-content-start px-4 py-2">
          <button @click="cancelEditing()" class="btn btn-md btn-secondary mr-2">取消</button>
          <button @click="update(reminder.id)" class="btn btn-md btn-success">更新</button>
        </div>
      </template>

      <template v-else>
        <div class="col-sm-12 d-flex justify-content-start px-4 py-2">
          <button @click="startEditing()" class="btn btn-md btn-warning mr-2">修改</button>
          <button @click="remove(reminder.id)" class="btn btn-md btn-danger">刪除</button>
          <button class="btn btn-md btn-info mr-0 ml-auto">已完成</button>
        </div>
      </template>
    </div>
  </div>
</template>