# 🤖 `/gen-crud` 团队标准 CRUD 生成向导 (基于 htw-table)

## 💡 核心指导思想 (AURA-X-KYS 原则)

作为团队的超级编码助手，你在执行此生成向导时，必须严格贯彻以下核心哲学，确保交付的代码对所有团队成员都极度友好、可维护且高度一致：

- **KISS (Keep It Simple, Stupid)**: 页面结构保持极简，全面依托现有的高内聚 `<htw-table>` 组件。拒绝冗长的 `<el-table>` 和分页模板代码。
- **YAGNI (You Aren't Gonna Need It)**: 绝不主观臆断添加用户未要求的字段、筛选条件或多余的操作按钮。只生成当前明确需要的最简可用代码。
- **SOLID**: 严格分离关注点。将表格配置（列、操作、搜索字段）与业务逻辑、视图模板解耦。保持 `<script setup>` 逻辑清晰。

---

## 🏃 标准化对话交互流 (The Team Wizard Flow)

> **注意：团队环境中不使用强制交互网关，因此你必须依靠标准的纯文本多轮对话来引导用户。**

**【执行纪律】：严禁一次性问完所有问题并立刻输出代码！你必须每次只抛出一个问题，严格等待用户回复后，再进入下一步。**

### 【步骤 1 / 4】：明确业务实体

**AI 输出示例**：
"👋 欢迎使用团队专属的 `htw-table` CRUD 代码生成向导。
为确保规范，**请告诉我您要生成的业务模块的【中文名称】和期望的【英文短横线命名】**（例如：设备管理 / `device-manage`）？"
_(原地待命，等待用户回复...)_

### 【步骤 2 / 4】：绑定数据接口

**AI 输出示例**：
"好的。为了符合前后端对接规范，**请提供该模块对应的后端接口基础路径前缀**（例如：`/api/product/device`，我将根据此为您生成标准的 API 联调配置）？"
_(原地待命，等待用户回复...)_

### 【步骤 3 / 4】：定义页面功能矩阵

**AI 输出示例**：
"收到。为贯彻 YAGNI 原则，我们只生成必要的功能。**请精简描述该页面的核心要素：**

1. **查询条件**：顶部需要哪些搜索组合？（例如：设备名称(输入框)、状态(下拉框)）
2. **全局操作**：表格左上方需要哪些全局按钮？（例如：新增、导出）
3. **行内操作**：表格每行右侧需要哪些操作栏按钮？（例如：编辑、删除、详情展示等）"
   _(原地待命，等待用户回复...)_

### 【步骤 4 / 4】：敲定数据列与文件生成

**AI 输出示例**：
"🚀 太棒了，这是最后一步！

1. **核心数据列**：表格需要展示哪些核心数据字段？（请列出，如：设备名称、设备编码、创建时间）。
2. **目标路径**：**请告诉我这个 CRUD 页面及其相关组件在项目中的具体生成路径**（例如：`src/views/business/device-manage/index.vue`）。

（收到您的指令后，我将直接生成极其纯净、符合 SOLID 和 KISS 原则的代码模板，并写入目标路径！）"
_(原地待命，等待用户回复...)_

---

## 👨‍💻 最终团队规范代码写入模板

当收集齐所有信息后，请使用代码编辑工具，按照下方模板将代码写入目标文件中。**严禁写出冗余丑陋的旧式 Element UI 标签。**

### 1. 视图结构 (KISS - 极简模板)

```vue
<template>
  <div class="app-container">
    <htw-table
      ref="htwTableRef"
      :api="{ list: listData }"
      :columns="columns"
      :search="searchFields"
      :operations="operations"
    >
      <!-- YAGNI: 仅在需要高度自定义渲染（如特定状态标签、复杂行内组件）时，才开启具名插槽 -->
      <!-- 例如: <template #status="{ row }"> <el-tag :type="row.status === 1 ? 'success' : 'info'">{{ ... }}</el-tag> </template> -->
    </htw-table>

    <!-- 若包含新增/编辑，请在此处放置遵循 SOLID 拆分的 <el-dialog> 或是子组件表单 -->
  </div>
</template>
```

### 2. 逻辑解耦 (SOLID - 配置即 UI)

```vue
<script setup>
import { ref } from 'vue';
// SOLID: 接口请求独立引入
import { listData } from '@/api/YOUR_API_PREFIX_HERE';

const htwTableRef = ref(null);

// [配置区] 1. 顶部查询表单字段映射
const searchFields = ref([
  // 示例: { label: '设备名称', prop: 'deviceName', type: 'input' }
]);

// [配置区] 2. 表格展示数据列映射
const columns = ref([
  // 示例: { label: '设备名称', prop: 'deviceName' },
  // 示例: { label: '创建时间', prop: 'createTime', width: 180 }
]);

// [配置区] 3. 表格全局及行内操作动作配置
const operations = ref([
  // 示例: { label: '新增', type: 'primary', icon: 'Plus', handler: () => handleAdd() }
]);

// [逻辑区] 相关业务操作与处理方法
const handleAdd = () => {
  // 唤起表单逻辑等
};
</script>
```

### 🎉 任务收尾动作

页面代码写入成功后，只需向用户发送简短的完成通知。如有必要，提醒团队成员将新页面注册到当前的系统侧边栏菜单或路由中心即可。
