<template>
  <div class="checklist">
    <v-card variant="outlined" class="pa-6">
      <v-card-title class="d-flex align-center justify-space-between mb-4">
        <span class="text-h4">Project Checklist</span>
        <v-btn
          color="primary"
          prepend-icon="mdi-plus"
          @click="showAddDialog = true"
          size="large"
        >
          Add Task
        </v-btn>
      </v-card-title>

      <v-card-text>
        <!-- Filters and Search -->
        <v-row class="mb-4">
          <v-col cols="12" md="4">
            <v-text-field
              v-model="search"
              prepend-inner-icon="mdi-magnify"
              label="Search tasks..."
              variant="outlined"
              density="compact"
              hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-select
              v-model="statusFilter"
              :items="statusOptions"
              label="Filter by Status"
              variant="outlined"
              density="compact"
              hide-details
            ></v-select>
          </v-col>
          <v-col cols="12" md="3">
            <v-select
              v-model="priorityFilter"
              :items="priorityOptions"
              label="Filter by Priority"
              variant="outlined"
              density="compact"
              hide-details
            ></v-select>
          </v-col>
          <v-col cols="12" md="2">
            <v-btn
              color="secondary"
              variant="outlined"
              @click="clearFilters"
              block
            >
              Clear
            </v-btn>
          </v-col>
        </v-row>

        <!-- Checklist Table -->
        <v-data-table
          :headers="headers"
          :items="filteredTasks"
          :search="search"
          class="elevation-1"
          :loading="loading"
          loading-text="Loading tasks..."
          no-data-text="No tasks found"
        >
          <!-- Task Column -->
          <template v-slot:item.task="{ item }">
            <div class="d-flex align-center">
              <v-checkbox
                v-model="item.completed"
                @change="updateTaskStatus(item)"
                hide-details
                class="mr-3"
              ></v-checkbox>
              <div>
                <div
                  class="font-weight-medium"
                  :class="{ 'text-decoration-line-through': item.completed }"
                >
                  {{ item.task }}
                </div>
                <div class="text-caption text-grey-darken-1">
                  {{ item.description }}
                </div>
              </div>
            </div>
          </template>

          <!-- Priority Column -->
          <template v-slot:item.priority="{ item }">
            <v-chip
              :color="getPriorityColor(item.priority)"
              size="small"
              variant="tonal"
            >
              <v-icon start size="small">
                {{ getPriorityIcon(item.priority) }}
              </v-icon>
              {{ item.priority }}
            </v-chip>
          </template>

          <!-- Status Column -->
          <template v-slot:item.status="{ item }">
            <v-chip
              :color="getStatusColor(item.status)"
              size="small"
              variant="tonal"
            >
              {{ item.status }}
            </v-chip>
          </template>

          <!-- Deadline Column -->
          <template v-slot:item.deadline="{ item }">
            <div class="d-flex align-center">
              <v-icon
                :color="getDeadlineColor(item.deadline)"
                size="small"
                class="mr-1"
              >
                {{ getDeadlineIcon(item.deadline) }}
              </v-icon>
              <span
                :class="getDeadlineColor(item.deadline)"
                class="text-caption font-weight-medium"
              >
                {{ formatDeadline(item.deadline) }}
              </span>
            </div>
          </template>

          <!-- Actions Column -->
          <template v-slot:item.actions="{ item }">
            <v-btn
              icon="mdi-pencil"
              variant="text"
              size="small"
              color="primary"
              @click="editTask(item)"
              class="mr-1"
            ></v-btn>
            <v-btn
              icon="mdi-delete"
              variant="text"
              size="small"
              color="error"
              @click="deleteTask(item)"
            ></v-btn>
          </template>
        </v-data-table>

        <!-- Progress Summary -->
        <v-row class="mt-6">
          <v-col cols="12" md="3">
            <v-card variant="outlined" class="text-center pa-4">
              <div class="text-h4 font-weight-bold text-primary">
                {{ totalTasks }}
              </div>
              <div class="text-caption text-grey">Total Tasks</div>
            </v-card>
          </v-col>
          <v-col cols="12" md="3">
            <v-card variant="outlined" class="text-center pa-4">
              <div class="text-h4 font-weight-bold text-success">
                {{ completedTasks }}
              </div>
              <div class="text-caption text-grey">Completed</div>
            </v-card>
          </v-col>
          <v-col cols="12" md="3">
            <v-card variant="outlined" class="text-center pa-4">
              <div class="text-h4 font-weight-bold text-warning">
                {{ pendingTasks }}
              </div>
              <div class="text-caption text-grey">Pending</div>
            </v-card>
          </v-col>
          <v-col cols="12" md="3">
            <v-card variant="outlined" class="text-center pa-4">
              <div class="text-h4 font-weight-bold text-info">
                {{ completionRate }}%
              </div>
              <div class="text-caption text-grey">Completion Rate</div>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Add/Edit Task Dialog -->
    <v-dialog v-model="showAddDialog" max-width="600px">
      <v-card>
        <v-card-title>
          {{ editingTask ? "Edit Task" : "Add New Task" }}
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-text-field
              v-model="taskForm.task"
              label="Task Title"
              variant="outlined"
              :rules="[(v) => !!v || 'Task title is required']"
              required
            ></v-text-field>

            <v-textarea
              v-model="taskForm.description"
              label="Description"
              variant="outlined"
              rows="3"
            ></v-textarea>

            <v-row>
              <v-col cols="12" md="6">
                <v-select
                  v-model="taskForm.priority"
                  :items="priorityOptions"
                  label="Priority"
                  variant="outlined"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" md="6">
                <v-select
                  v-model="taskForm.status"
                  :items="statusOptions"
                  label="Status"
                  variant="outlined"
                  required
                ></v-select>
              </v-col>
            </v-row>

            <v-text-field
              v-model="taskForm.deadline"
              label="Deadline"
              type="date"
              variant="outlined"
              required
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="grey-darken-1"
            variant="text"
            @click="showAddDialog = false"
          >
            Cancel
          </v-btn>
          <v-btn color="primary" @click="saveTask" :disabled="!valid">
            {{ editingTask ? "Update" : "Add" }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

interface Task {
  id: number;
  task: string;
  description: string;
  priority: "low" | "medium" | "high" | "urgent";
  status: "not-started" | "in-progress" | "review" | "completed";
  deadline: string;
  completed: boolean;
  createdAt: string;
}

// Reactive data
const loading = ref(false);
const search = ref("");
const statusFilter = ref("all");
const priorityFilter = ref("all");
const showAddDialog = ref(false);
const editingTask = ref<Task | null>(null);
const valid = ref(false);

// Sample data
const tasks = ref<Task[]>([
  {
    id: 1,
    task: "Design User Interface",
    description: "Create wireframes and mockups for the main application",
    priority: "high",
    status: "in-progress",
    deadline: "2024-02-15",
    completed: false,
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    task: "Implement Authentication",
    description: "Set up user login and registration system",
    priority: "urgent",
    status: "not-started",
    deadline: "2024-02-10",
    completed: false,
    createdAt: "2024-01-16",
  },
  {
    id: 3,
    task: "Database Schema Design",
    description: "Plan and create database structure",
    priority: "high",
    status: "completed",
    deadline: "2024-02-01",
    completed: true,
    createdAt: "2024-01-14",
  },
  {
    id: 4,
    task: "API Documentation",
    description: "Write comprehensive API documentation",
    priority: "medium",
    status: "review",
    deadline: "2024-02-20",
    completed: false,
    createdAt: "2024-01-17",
  },
  {
    id: 5,
    task: "Unit Testing",
    description: "Implement unit tests for core functionality",
    priority: "medium",
    status: "not-started",
    deadline: "2024-02-25",
    completed: false,
    createdAt: "2024-01-18",
  },
]);

// Form data
const taskForm = ref({
  task: "",
  description: "",
  priority: "medium" as Task["priority"],
  status: "not-started" as Task["status"],
  deadline: "",
});

// Table headers
const headers = [
  { title: "Task", key: "task", sortable: true },
  { title: "Priority", key: "priority", sortable: true },
  { title: "Status", key: "status", sortable: true },
  { title: "Deadline", key: "deadline", sortable: true },
  { title: "Actions", key: "actions", sortable: false },
];

// Options for filters
const statusOptions = [
  { title: "All Status", value: "all" },
  { title: "Not Started", value: "not-started" },
  { title: "In Progress", value: "in-progress" },
  { title: "Review", value: "review" },
  { title: "Completed", value: "completed" },
];

const priorityOptions = [
  { title: "All Priority", value: "all" },
  { title: "Low", value: "low" },
  { title: "Medium", value: "medium" },
  { title: "High", value: "high" },
  { title: "Urgent", value: "urgent" },
];

// Computed properties
const filteredTasks = computed(() => {
  let filtered = tasks.value;

  if (statusFilter.value !== "all") {
    filtered = filtered.filter((task) => task.status === statusFilter.value);
  }

  if (priorityFilter.value !== "all") {
    filtered = filtered.filter(
      (task) => task.priority === priorityFilter.value
    );
  }

  return filtered;
});

const totalTasks = computed(() => tasks.value.length);
const completedTasks = computed(
  () => tasks.value.filter((task) => task.completed).length
);
const pendingTasks = computed(() => totalTasks.value - completedTasks.value);
const completionRate = computed(() => {
  if (totalTasks.value === 0) return 0;
  return Math.round((completedTasks.value / totalTasks.value) * 100);
});

// Methods
function getPriorityColor(priority: string) {
  const colors = {
    low: "success",
    medium: "info",
    high: "warning",
    urgent: "error",
  };
  return colors[priority as keyof typeof colors] || "grey";
}

function getPriorityIcon(priority: string) {
  const icons = {
    low: "mdi-flag-outline",
    medium: "mdi-flag",
    high: "mdi-flag-variant",
    urgent: "mdi-flag-variant-outline",
  };
  return icons[priority as keyof typeof icons] || "mdi-flag";
}

function getStatusColor(status: string) {
  const colors = {
    "not-started": "grey",
    "in-progress": "warning",
    review: "info",
    completed: "success",
  };
  return colors[status as keyof typeof colors] || "grey";
}

function getDeadlineColor(deadline: string) {
  const today = new Date();
  const deadlineDate = new Date(deadline);
  const diffTime = deadlineDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return "error";
  if (diffDays <= 3) return "warning";
  return "success";
}

function getDeadlineIcon(deadline: string) {
  const today = new Date();
  const deadlineDate = new Date(deadline);
  const diffTime = deadlineDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return "mdi-calendar-remove";
  if (diffDays <= 3) return "mdi-calendar-clock";
  return "mdi-calendar-check";
}

function formatDeadline(deadline: string) {
  const date = new Date(deadline);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function clearFilters() {
  search.value = "";
  statusFilter.value = "all";
  priorityFilter.value = "all";
}

function updateTaskStatus(task: Task) {
  task.status = task.completed ? "completed" : "in-progress";
}

function editTask(task: Task) {
  editingTask.value = task;
  taskForm.value = {
    task: task.task,
    description: task.description,
    priority: task.priority,
    status: task.status,
    deadline: task.deadline,
  };
  showAddDialog.value = true;
}

function deleteTask(task: Task) {
  const index = tasks.value.findIndex((t) => t.id === task.id);
  if (index > -1) {
    tasks.value.splice(index, 1);
  }
}

function saveTask() {
  if (editingTask.value) {
    // Update existing task
    const index = tasks.value.findIndex((t) => t.id === editingTask.value!.id);
    if (index > -1) {
      tasks.value[index] = {
        ...tasks.value[index],
        ...taskForm.value,
      };
    }
    editingTask.value = null;
  } else {
    // Add new task
    const newTask: Task = {
      id: Date.now(),
      ...taskForm.value,
      completed: false,
      createdAt: new Date().toISOString().split("T")[0],
    };
    tasks.value.unshift(newTask);
  }

  // Reset form
  taskForm.value = {
    task: "",
    description: "",
    priority: "medium",
    status: "not-started",
    deadline: "",
  };
  showAddDialog.value = false;
}

// Lifecycle
onMounted(() => {
  // Simulate loading
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 1000);
});
</script>

<style scoped>
.checklist {
  max-width: 100%;
}

.v-data-table {
  border-radius: 8px;
  overflow: hidden;
}

.v-data-table :deep(.v-data-table-header) {
  background-color: #f5f5f5;
}

.v-theme--dark .v-data-table :deep(.v-data-table-header) {
  background-color: #424242;
}

.v-data-table :deep(.v-data-table__td) {
  padding: 12px 16px;
}

.v-data-table :deep(.v-data-table__tr:hover) {
  background-color: rgba(0, 0, 0, 0.04);
}

.v-theme--dark .v-data-table :deep(.v-data-table__tr:hover) {
  background-color: rgba(255, 255, 255, 0.04);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.stat-item {
  padding: 16px;
  border-radius: 8px;
  background-color: #f8f9fa;
}

.v-theme--dark .stat-item {
  background-color: #424242;
}
</style>
