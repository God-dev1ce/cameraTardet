<script setup lang="ts">
import {onMounted, ref} from "vue";
import {getNodeTree, type NodeInfo} from "@/api/nodeInfo.ts";
import {ElMessage} from "element-plus";
import {type DeviceInfo, getNodeDeviceList} from "@/api/deviceInfo.ts";

interface TreeNode {
  label: string
  children?: TreeNode[]
  [key: string]: any
}

const treeData = ref<TreeNode[]>()

const deviceList = ref<DeviceInfo[]>()

function convertToTreeData(data: NodeInfo[]): TreeNode[] {
  return data.map((node) => ({
    label: node.name,
    children: node.children && node.children.length > 0 ? convertToTreeData(node.children) : [],
    id: node.id,
    parent_id: node.parent_id
  }))
}

async function refreshNode(){
  await getNodeTree().then(res => {
    if (res.code == 200) {
      treeData.value = convertToTreeData(res.data)
      if(res.data.length!=0){
        refreshDeviceList(res.data[0].id)
      }
    }
  })
}

function refreshDeviceList(node_id: string){
  getNodeDeviceList(node_id).then((res)=>{
    if(res.code == 200){
      deviceList.value = res.data.devices
    }
  })
}

const hasChildren = (data: any): boolean => {
  return Array.isArray(data.children) && data.children.length > 0
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
        <el-tree
            :data="treeData"
            node-key="id"
            :props="{ label: 'label', children: 'children' }"
            default-expand-all
            style="padding: 10px 0 0 0; background: rgba(0,0,0,0)"
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

      <el-row class="tree" style="height: 100px"></el-row>
      <el-row style="height: 20px"></el-row>

      <el-row class="tree">
        <el-table :data="deviceList" style="width: 100%" border>
          <el-table-column prop="name" label="设备名称" />
          <el-table-column prop="code" label="设备编码" />
          <el-table-column prop="is_online" label="在线情况">
            <template #default="{ row }">
              <el-tag :type="row.is_online ? 'success' : 'danger'">
                {{ row.is_online ? '在线' : '离线' }}
              </el-tag>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </el-col>
  </el-row>
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
