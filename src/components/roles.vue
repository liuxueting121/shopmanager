<template>
    <!-- 面包屑 -->
    <el-card class="box">
        <cus-bread level1="权限管理" level2="角色列表"></cus-bread>
        <el-button class="btn">添加角色</el-button>
        <!-- 表格 -->
        <el-table :data="roles" style="width: 100%" height="400px">
            <el-table-column type="expand">
                <template slot-scope="scope">
                    <el-row class="level1" v-for="(item1,i) in scope.row.children" :key="i">
                        <el-col :span="4">
                            <el-tag @close="deleRights(scope.row,item1)" closable type="danger">{{item1.authName}}</el-tag>
                            <i class="el-icon-arrow-right"></i>
                        </el-col>
                        <el-col :span="20">
                            <el-row class="level2" v-for="(item2,i) in item1.children" :key="i">
                                <el-col :span="4">
                                    <el-tag @close="deleRights(scope.row,item2)" closable type="info">{{item2.authName}}</el-tag>
                                    <i class="el-icon-arrow-right"></i>
                                </el-col>
                                <el-col :span="20">
                                    <el-tag @close="deleRights(scope.row,item3)" closable type="warning" v-for="(item3,i) in item2.children" :key="i">{{item3.authName}}</el-tag>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                    <el-row v-if="scope.row.children.length===0">
                        <el-col>
                            <span>未分配权限</span>
                        </el-col>
                    </el-row>
                </template>
            </el-table-column>
            <el-table-column type="index" label="#" width="160"></el-table-column>
            <el-table-column prop="roleName" label="角色名称" width="200"></el-table-column>
            <el-table-column prop="roleDesc" label="角色描述" width="200"></el-table-column>
            <el-table-column label="操作" width="360">
                <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit" circle size="mini" plain></el-button>
                    <el-button type="danger" icon="el-icon-delete" circle size="mini" plain></el-button>
                    <el-button @click="showDiaSetRights(scope.row)" type="success" icon="el-icon-check" circle size="mini" plain></el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 对话框-分配权限 -->
        <el-dialog title="分配权限" :visible.sync="dialogFormVisible">
            <!-- node-key 每个节点唯一标识 值来源于treedata中的key名-->
            <el-tree  ref="treeDom" :data="treedata" show-checkbox default-expand-all="" node-key="id"  :default-checked-keys="arrCheck" :props="defaultProps">
            </el-tree>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="setRights()">确 定</el-button>
            </div>
        </el-dialog>

    </el-card>
</template>

<script>
export default {
  data() {
    return {
      roles: [],
      dialogFormVisible: false,
    //   树形结构绑定的数据
    treedata:[],
    // 默认选中的数据[被选中节点的id]
    arrCheck:[],
      defaultProps: {
        //   label和children的值来源于树形结构绑定数据treedata中的key名，"label"
        label: "authName",
        children: "children"
      },
    //   当前角色id
    currRoleId:-1
    };
  },
  created() {
    this.getRoles();
  },
  methods: {
    // 分配权限
   async setRights() {
        
         // 默认选中->全选节点+半选节点->arrCheck[全选节点id+半选节点id]
            // 获取树形结构中全选id->操作第三方组件->el-tree->组件API(attr和方法)
                // getCheckedKeys
                // 在js中调用组件标签的js方法-> ref操作dom
                // 1. 给要操作的页面元素设置ref="值"
            //     // 2. 在js中通过this.$refs.ref的值.js方法
                const arr1 = this.$refs.treeDom.getCheckedKeys();
                
            // // 获取树形结构中半选id
            const arr2 = this.$refs.treeDom.getHalfCheckedKeys();
            // Es6展开操作运算符
            const arr = [...arr1,...arr2];
            // 发送请求
            const res = await this.$http.post(`roles/${this.currRoleId}/rights`,{
                rids:arr.join(',')
            });
            console.log(res);
            if(res.data.meta.status===200) {
                this.dialogFormVisible = false;
                this.getRoles();
            };
            
    },
    // 取消权限
    async deleRights(role, rights) {
      const res = await this.$http.delete(
        `roles/${role.id}/rights/${rights.id}`
      );
      const { meta: { msg, status }, data } = res.data;
      if (status === 200) {
        // 提示
        this.$message.success(msg);
        // 更新S
        // this.getRoles();
        // 只更新当前角色的权限
        role.children = data;
      }
    },
    async showDiaSetRights(role) {
        this.currRoleId = role.id;
        const res = await this.$http.get(`rights/tree`)
        const {meta:{msg,status},data} = res.data
        if (status===200) {
            this.treedata = data;

        //获取当前角色有的权限
        const res2 = await this.$http.get(`roles`) 




            const temp = [];
            role.children.forEach((item1)=>{
                // temp.push(item1.id);
                item1.children.forEach((item2)=>{
                    // temp.push(item2.id);
                    item2.children.forEach((item3)=>{
                        temp.push(item3.id);
                    });
                });
            });
            // 取出每一层节点的id
            console.log(temp);
            this.arrExpand = temp;
            

           
            this.arrCheck = temp;

        }
        
        
      this.dialogFormVisible = true;
    },
    async getRoles() {
      const res = await this.$http.get(`roles`);
      this.roles = res.data.data;
      console.log(this.roles);
    }
  }
};
</script>

<style>
.box {
  height: 100%;
}
.btn {
  margin-top: 20px;
}
.level1,
.level2 {
  margin-bottom: 10px;
}
</style>
