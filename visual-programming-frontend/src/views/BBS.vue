<template>
  <div>
    <el-dialog title="创建帖子" :visible.sync="dialogVisible" width="50%">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="帖子标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="帖子类型">
          <el-radio-group v-model="form.type">
            <el-radio label="1">普通帖</el-radio>
            <el-radio label="2">模块分享帖</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="form.type === '2'" label="模块名称">
          <el-input v-model="form.modules_name"></el-input>
        </el-form-item>
        <el-form-item label="帖子内容">
          <el-input :rows="8" type="textarea" v-model="form.content"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- blog列表 -->
    <el-row type="flex" justify="start">
      <el-button type="primary" @click="dialogVisible = true">添加帖子</el-button>
    </el-row>
    <el-container>
      <el-aside width="60%">
        <el-card v-for="(item, idx) in blogs" :key="idx" class="item">
          <template slot="header">{{item.title}}</template>
          <div style="color:#a6a6a6;font-size:13px">{{item.type === "1"?"普通帖":"模块分享帖"}}</div>
          <div class="content">{{item.content}}</div>

          <!-- <hr
            style="filter: alpha(opacity=100,finishopacity=0,style=3);margin:20px 0px 20px 0px;"
            width="100%"
            color="#CCCCCC"
            size="1"
          />-->

          <el-collapse style="margin-top:10px" v-model="activeName" accordion>
            <el-collapse-item title="评论" :name="idx">
              <div v-for="(item1,index1) in item.critic" :key="index1">
                <div style="display:flex;flex-direction:row;">
                  <i class="el-icon-caret-right" style="line-height:30px;margin-left:30px"></i>
                  <span style="height:30px;line-height:30px;color:#409eff" >{{item1.sender}}:</span>
                  <div style="height:30px;line-height:30px">
                    {{item1.content}}
                    <!-- <span style="color:#aaaaaa;font-size:13px">{{item1.date}}</span> -->
                  </div>
                </div>
              </div>
              <div style="display:flex;flex-direction:row;">
                <el-input v-model="input" style="margin-left:30px;margin-right:10px" placeholder="请输入内容"></el-input>
                <el-button type="success" @click="send(idx)">发送</el-button>
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-card>
      </el-aside>
      <el-main>
        <el-card class="populars">
          <h2>当前热门</h2>
          <div class="link-container">
            <div v-for="(item, idx) in populars" :key="idx" class="populars-item">
              <el-link type="primary">{{item}}</el-link>
            </div>
          </div>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      blogs: [
        {
          title: "如何创建模块",
          type: "1",
          content:
            "       第一步，添加输入输出\n       第二步，添加计算逻辑\n       第三步，测试",
          critic: [
            {
              sender: "test1",
              date: "一天前",
              content: "老铁666"
            },
            {
              sender: "test2",
              date: "一天前",
              content: "膜拜大佬"
            }
          ]
        },
        {
          title: "如何使用模块",
          type: "1",
          content:
            "       第一步，添加输入输出\n       第二步，添加计算逻辑\n       第三步，测试"
        },
        {
          title: "如何添加自定义组件",
          type: "1",
          content:
            "       第一步，添加输入输出\n       第二步，添加计算逻辑\n       第三步，测试"
        },
        {
          title: "使用技巧",
          type: "1",
          content:
            "       第一步，添加输入输出\n       第二步，添加计辑\n       第三步，测试"
        },
        {
          title: "如何使用他人的模块",
          type: "1",
          content:
            "       第一步，添加输入输出\n       第二步，添加计算逻辑\n       第三步，测试"
        }
      ],
      populars: ["入门教程", "最佳实践", "如何创建模块", "如何使用模块"],
      dialogVisible: false,
      activeName: -1,
      input: "",
      form: {
        title: "",
        type: "1",
        modules_name: "",
        content: "",
        critic:[]
      }
    };
  },
  methods: {
    form_init() {
      this.form.title = "";
      this.form.type = "1";
      this.form.modules_name = "";
      this.from.content = "";
    },

    onSubmit() {
      this.dialogVisible = false;
      this.blogs.splice(0, 0, JSON.parse(JSON.stringify(this.form)));
      this.form_init();
    },
    send(i) {
      console.log(i);
      console.log(this.blogs)
      var text = this.input;
      if(text != ""){
        this.blogs[i].critic.push({
        sender: "我",
        date: "",
        content: text,
        critic: []
      });
      }
      this.input = "";
    }
  }
};
</script>

<style lang="scss">
.populars {
  margin-left: 20%;
  h2 {
    margin-bottom: 1rem;
  }

  .link-container {
    text-align: left;
    margin-left: 43%;
  }
  .populars-item {
    // text-align: left;

    margin-top: 0.5rem;
  }
}

.item {
  margin-top: 1rem;

  .content {
    white-space: pre-wrap;
    text-align: left;
    // text-indent:2em
  }
}
</style>