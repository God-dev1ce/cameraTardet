<script setup lang="ts">
import {nextTick, onMounted, ref} from "vue";
import {addNode, getNodeTree, type NodeInfo} from "@/api/nodeInfo.ts";
import {ElMessage, ElMessageBox} from "element-plus";
import {type DeviceInfo, getNodeDeviceList} from "@/api/deviceInfo.ts";
import NetWorkCamera from "@/components/NetWorkCamera.vue";

interface TreeNode {
  label: string
  children?: TreeNode[]
  id: string,
  parent_id: string | undefined
  name: string
}

const map = new Map<string, string>()

const treeData = ref<TreeNode[]>()

const deviceList = ref<DeviceInfo[]>()

const dialogVisible = ref(false)

const deviceLiveId = ref()

// 当前选择节点id
const selectNode = ref({
  name: "",
  id:"",
})

// 数据转换
function convertToTreeData(data: NodeInfo[]): TreeNode[] {
  return data.map((node) => ({
    label: node.name,
    children: node.children && node.children.length > 0 ? convertToTreeData(node.children) : [],
    id: node.id,
    parent_id: node.parent_id,
    name: node.name,
  }))
}

// 刷新节点树
async function refreshNode(){
  await getNodeTree().then(res => {
    if (res.code == 200) {
      treeData.value = convertToTreeData(res.data)
      // 递归映射节点数
      const traverse = (nodes: TreeNode[]) => {
        for(const node of nodes){
          map.set(node.id, node.label)
          if(node.children){
            traverse(node.children)
          }
        }
      }
      traverse(treeData.value)
      // 首次加载显示第一个节点的设备
      if(res.data.length!=0){
        selectNode.value.id = res.data[0].id
        selectNode.value.name = res.data[0].name
        refreshDeviceList(res.data[0].id)
      }
    }
  })
}

// 刷新当前节点的设备列表
function refreshDeviceList(node_id: string){
  getNodeDeviceList(node_id).then((res)=>{
    if(res.code == 200){
      deviceList.value = res.data.devices
    }
  }).catch(err=>{
    if(err.status==404){
      deviceList.value = undefined
    }
  })
}

const openLive= (id: string)=>{
  deviceLiveId.value = id
  dialogVisible.value = false
  nextTick(()=>{
    dialogVisible.value = true
  })
}

const handleNodeClick = (data: TreeNode, node: any, component: any)=>{
  selectNode.value.name = data?.name
  selectNode.value.id = data.id;
  refreshDeviceList(data?.id)
}

const hasChildren = (data: any): boolean => {
  return Array.isArray(data.children) && data.children.length > 0
}

const getNodeName=(id:string)=>{
  return map.get(id)
}

const open = () => {
  ElMessageBox.prompt('请输入节点名称', '新增节点', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
  })
      .then(({ value }) => {
        addNode(value, selectNode.value.id).then(res=>{
          if(res.code==200){
            ElMessage({
              type: 'success',
              message: `添加成功`,
            })
            refreshNode()
          }
        }).catch(err=>{
          ElMessage({
            type: 'info',
            message: err,
          })
        })
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '取消添加',
        })
      })
}

onMounted(() => {
  refreshNode()
  ElMessage.success("获取节点信息成功")
})
</script>

<template>
  <h1 class="title">设备管理</h1>
  <el-row :gutter="20">
    <!--展示树-->
    <el-col :span="6">
      <div class="tree">
        <div style="margin: 10px 0 0 10px; width: 100%">
          <el-row justify="space-between">
            <el-col :span="12">
              <h4>节点名称:{{ selectNode.name }}</h4>
            </el-col>
            <el-col :span="10">
              <el-button type="primary" size="small" @click="open">+</el-button>
              <el-button type="danger" size="small">-</el-button>
            </el-col>
          </el-row>


        </div>
        <hr style="margin: 10px 0 0 0"/>
        <el-tree
            :data="treeData"
            node-key="id"
            :props="{ label: 'label', children: 'children' }"
            default-expand-all
            style="padding: 10px 0 0 0; background: rgba(0,0,0,0)"
            @node-click="handleNodeClick"
        >
          <template #default="{ node, data }">
            <span>
              <el-icon class="mr-1">
                <Folder v-if="hasChildren(data)"/>
                <Document v-else/>
              </el-icon>
              {{ node.label }}
            </span>
          </template>

        </el-tree>

      </div>
    </el-col>

    <el-col :span="18">

      <el-row class="tree" style="height: 100px">

      </el-row>

      <el-row style="height: 20px"></el-row>

      <el-row class="tree">
        <el-table :data="deviceList" style="width: 100%; background: rgba(0,0,0,0); padding: 20px 20px 0 20px" >

          <el-table-column prop="name" label="设备名称" />

          <el-table-column prop="node_id" label="所属节点">
            <template #default="{ row }">
              {{ getNodeName(row.node_id) }}
            </template>
          </el-table-column>

          <el-table-column prop="code" label="设备编码" />

          <el-table-column prop="is_online" label="在线情况">
            <template #default="{ row }">
              <el-tag :type="row.is_online ? 'success' : 'danger'">
                {{ row.is_online ? '在线' : '离线' }}
              </el-tag>
            </template>
          </el-table-column>

          <el-table-column prop="" label="预览">
            <template #default="{ row }">
              <el-button key="primary" type="primary" @click="openLive(row.id)" text bg>预览</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </el-col>
  </el-row>

  <el-dialog v-model="dialogVisible" @close="dialogVisible = false" width="60%">
    <NetWorkCamera v-if="dialogVisible" :deviceId=deviceLiveId></NetWorkCamera>
  </el-dialog>
</template>

<style scoped>
.title {
  padding: 10px;
}

.tree {
  background: white;
  padding: 0;
  border: 1px solid #ccc;
  border-radius: 20px;
  height: 100vh;
}
</style>
