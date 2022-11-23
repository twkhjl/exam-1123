<script setup>
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
  <div class="container mt-10vh bg-light-gray">
    <div class="row">
      <div class="col-sm-12 px-4">
        <h1>主題</h1>
        <hr>
        <div>新增於2022-10-22 23:47,最後修改於2022-10-22 23:47</div>
        <hr>
        <h5 class="text-gray">無備註事項</h5>
        <hr>
      </div>
      <div class="col-sm-12 d-flex justify-content-start px-4 py-2">
        <button class="btn btn-md btn-warning mr-2">修改</button>
        <button class="btn btn-md btn-danger">刪除</button>
        <button class="btn btn-md btn-info mr-0 ml-auto">已完成</button>
      </div>
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
          <form>
            <div class="form-group">
              <label for="exampleInputEmail1">提醒事項主題</label>
              <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                placeholder="請輸入主題">
              <small id="emailHelp" class="form-text text-muted"></small>
            </div>
            <div class="form-group">
              <label for="exampleFormControlTextarea1">提醒事項備註</label>
              <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"
              placeholder="請輸入備註"
              ></textarea>
            </div>
            <div class="form-check form-check-inline">
              <span class="mr-2">是否寄出提醒通知信?</span>
              <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" checked>
              <label class="form-check-label" for="inlineRadio1">否</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2">
              <label class="form-check-label" for="inlineRadio2">是</label>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            取消
          </button>
          <button type="button" class="btn btn-primary">送出</button>
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