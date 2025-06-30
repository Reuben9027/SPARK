<template>
  <div class="project-list">
    <v-card variant="outlined" class="pa-6">
      <v-card-title class="d-flex align-center justify-space-between mb-6">
        <div>
          <span class="text-h4">Project List</span>
          <p class="text-body-1 text-grey-darken-1 mt-2">
            Manage and track all your projects in one place
          </p>
        </div>
        <v-btn
          color="primary"
          prepend-icon="mdi-plus"
          @click="showAddDialog = true"
          size="large"
        >
          Add Project
        </v-btn>
      </v-card-title>

      <v-card-text>
        <div v-if="projects.length === 0" class="text-center py-12">
          <v-icon size="80" color="grey-lighten-1">mdi-folder-outline</v-icon>
          <p class="text-h6 text-grey mt-4">No projects yet</p>
          <p class="text-body-1 text-grey-darken-1">
            Create your first project to get started
          </p>
          <v-btn color="primary" class="mt-4" @click="showAddDialog = true">
            Create Your First Project
          </v-btn>
        </div>

        <v-row v-else>
          <v-col
            v-for="project in projects"
            :key="project.id"
            cols="12"
            md="6"
            lg="4"
          >
            <v-card
              variant="outlined"
              class="project-card h-100"
              :class="{ 'completed-project': project.progress === 100 }"
            >
              <v-card-text class="pa-4">
                <!-- Project Header -->
                <div class="d-flex align-center justify-space-between mb-4">
                  <div class="flex-grow-1">
                    <h3 class="text-h6 font-weight-bold mb-2">
                      {{ project.title }}
                    </h3>
                    <div class="d-flex align-center">
                      <v-chip
                        :color="getStatusColor(project.status)"
                        size="small"
                        variant="tonal"
                        class="mr-2"
                      >
                        {{ project.status }}
                      </v-chip>
                      <span class="text-caption text-grey">
                        {{ formatDate(project.createdAt) }}
                      </span>
                    </div>
                  </div>
                  <v-menu>
                    <template v-slot:activator="{ props }">
                      <v-btn
                        icon="mdi-dots-vertical"
                        variant="text"
                        size="small"
                        v-bind="props"
                      ></v-btn>
                    </template>
                    <v-list>
                      <v-list-item @click="editProject(project.id)">
                        <v-list-item-title>Edit</v-list-item-title>
                      </v-list-item>
                      <v-list-item @click="deleteProject(project.id)">
                        <v-list-item-title class="text-error"
                          >Delete</v-list-item-title
                        >
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </div>

                <!-- Progress Section -->
                <div class="mb-4">
                  <div class="d-flex align-center justify-space-between mb-2">
                    <span class="text-body-2 font-weight-medium">Progress</span>
                    <span class="text-body-2 text-grey"
                      >{{ project.progress }}%</span
                    >
                  </div>
                  <v-progress-linear
                    :model-value="project.progress"
                    :color="getProgressColor(project.progress)"
                    height="8"
                    rounded
                  ></v-progress-linear>
                </div>

                <!-- Project Summary -->
                <div class="mb-4">
                  <p class="text-body-2 text-grey-darken-1 line-clamp-3">
                    {{ project.summary }}
                  </p>
                </div>

                <!-- Project Stats -->
                <div class="d-flex align-center justify-space-between">
                  <div class="d-flex align-center">
                    <v-icon size="16" color="primary" class="mr-1"
                      >mdi-account-group</v-icon
                    >
                    <span class="text-caption"
                      >{{ project.teamSize }} members</span
                    >
                  </div>
                  <div class="d-flex align-center">
                    <v-icon size="16" color="warning" class="mr-1"
                      >mdi-calendar</v-icon
                    >
                    <span class="text-caption">{{ project.deadline }}</span>
                  </div>
                </div>

                <!-- Action Buttons -->
                <div class="d-flex align-center mt-4">
                  <v-btn
                    color="primary"
                    variant="outlined"
                    size="small"
                    prepend-icon="mdi-eye"
                    @click="viewProject(project.id)"
                    class="mr-2"
                  >
                    View
                  </v-btn>
                  <v-btn
                    color="secondary"
                    variant="outlined"
                    size="small"
                    prepend-icon="mdi-pencil"
                    @click="editProject(project.id)"
                  >
                    Edit
                  </v-btn>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- Project Summary Stats -->
        <v-row class="mt-6">
          <v-col cols="12">
            <v-card variant="outlined" class="pa-4">
              <v-card-title class="text-h6 mb-3">Project Summary</v-card-title>
              <div class="d-flex justify-space-around">
                <div class="text-center">
                  <div class="text-h4 font-weight-bold text-primary">
                    {{ totalProjects }}
                  </div>
                  <div class="text-caption text-grey">Total Projects</div>
                </div>
                <div class="text-center">
                  <div class="text-h4 font-weight-bold text-success">
                    {{ completedProjects }}
                  </div>
                  <div class="text-caption text-grey">Completed</div>
                </div>
                <div class="text-center">
                  <div class="text-h4 font-weight-bold text-warning">
                    {{ inProgressProjects }}
                  </div>
                  <div class="text-caption text-grey">In Progress</div>
                </div>
                <div class="text-center">
                  <div class="text-h4 font-weight-bold text-info">
                    {{ avgProgress }}%
                  </div>
                  <div class="text-caption text-grey">Avg Progress</div>
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Add Project Dialog -->
    <v-dialog v-model="showAddDialog" max-width="600px" persistent>
      <v-card>
        <v-card-title class="text-h5 pa-4">
          <v-icon class="mr-2" color="primary">mdi-plus</v-icon>
          Add New Project
        </v-card-title>

        <v-card-text class="pa-4">
          <v-form ref="form" v-model="isFormValid">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="newProject.title"
                  label="Project Title"
                  variant="outlined"
                  :rules="[(v) => !!v || 'Project title is required']"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-textarea
                  v-model="newProject.summary"
                  label="Project Summary"
                  variant="outlined"
                  :rules="[(v) => !!v || 'Project summary is required']"
                  rows="3"
                  required
                ></v-textarea>
              </v-col>

              <v-col cols="12" md="6">
                <v-select
                  v-model="newProject.status"
                  label="Status"
                  variant="outlined"
                  :items="statusOptions"
                  :rules="[(v) => !!v || 'Status is required']"
                  required
                ></v-select>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model="newProject.teamSize"
                  label="Team Size"
                  variant="outlined"
                  type="number"
                  :rules="[
                    (v) => !!v || 'Team size is required',
                    (v) => v > 0 || 'Team size must be greater than 0',
                  ]"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model="newProject.deadline"
                  label="Deadline"
                  variant="outlined"
                  placeholder="e.g., Dec 15, 2024"
                  :rules="[(v) => !!v || 'Deadline is required']"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-slider
                  v-model="newProject.progress"
                  label="Initial Progress"
                  :min="0"
                  :max="100"
                  :step="5"
                  thumb-label
                  color="primary"
                ></v-slider>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>

        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>
          <v-btn color="grey" variant="text" @click="cancelAddProject">
            Cancel
          </v-btn>
          <v-btn
            color="primary"
            @click="confirmAddProject"
            :disabled="!isFormValid"
            :loading="isAdding"
          >
            Add Project
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

// Dialog state
const showAddDialog = ref(false);
const isFormValid = ref(false);
const isAdding = ref(false);
const form = ref();

// New project form data
const newProject = ref({
  title: "",
  summary: "",
  status: "Planning",
  teamSize: 1,
  deadline: "",
  progress: 0,
});

// Status options for the select field
const statusOptions = ["Planning", "In Progress", "Testing", "Completed"];

// Project data
const projects = ref([
  {
    id: 1,
    title: "E-commerce Platform",
    summary:
      "A modern e-commerce platform with advanced features including user authentication, product management, shopping cart, payment integration, and admin dashboard.",
    progress: 75,
    status: "In Progress",
    teamSize: 5,
    deadline: "Dec 15, 2024",
    createdAt: new Date("2024-01-10"),
  },
  {
    id: 2,
    title: "Mobile Banking App",
    summary:
      "Secure mobile banking application with biometric authentication, real-time transactions, bill payments, and financial analytics dashboard.",
    progress: 45,
    status: "In Progress",
    teamSize: 8,
    deadline: "Jan 30, 2025",
    createdAt: new Date("2024-01-15"),
  },
  {
    id: 3,
    title: "Task Management System",
    summary:
      "Collaborative task management tool with real-time updates, team collaboration, file sharing, and progress tracking features.",
    progress: 100,
    status: "Completed",
    teamSize: 3,
    deadline: "Nov 20, 2024",
    createdAt: new Date("2024-01-05"),
  },
  {
    id: 4,
    title: "AI Chatbot Assistant",
    summary:
      "Intelligent chatbot powered by machine learning for customer support, with natural language processing and integration capabilities.",
    progress: 30,
    status: "Planning",
    teamSize: 4,
    deadline: "Feb 15, 2025",
    createdAt: new Date("2024-01-20"),
  },
  {
    id: 5,
    title: "Social Media Dashboard",
    summary:
      "Comprehensive social media management dashboard with analytics, scheduling, content creation, and multi-platform integration.",
    progress: 60,
    status: "In Progress",
    teamSize: 6,
    deadline: "Jan 10, 2025",
    createdAt: new Date("2024-01-12"),
  },
  {
    id: 6,
    title: "Inventory Management System",
    summary:
      "Complete inventory tracking system with barcode scanning, stock alerts, supplier management, and detailed reporting.",
    progress: 90,
    status: "Testing",
    teamSize: 4,
    deadline: "Dec 30, 2024",
    createdAt: new Date("2024-01-08"),
  },
]);

// Computed properties
const totalProjects = computed(() => projects.value.length);
const completedProjects = computed(
  () => projects.value.filter((p) => p.status === "Completed").length
);
const inProgressProjects = computed(
  () => projects.value.filter((p) => p.status === "In Progress").length
);
const avgProgress = computed(() => {
  if (projects.value.length === 0) return 0;
  const total = projects.value.reduce(
    (sum, project) => sum + project.progress,
    0
  );
  return Math.round(total / projects.value.length);
});

function getStatusColor(status: string) {
  switch (status) {
    case "Completed":
      return "success";
    case "In Progress":
      return "primary";
    case "Testing":
      return "warning";
    case "Planning":
      return "info";
    default:
      return "grey";
  }
}

function getProgressColor(progress: number) {
  if (progress >= 80) return "success";
  if (progress >= 50) return "warning";
  return "error";
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function addNewProject() {
  showAddDialog.value = true;
}

function cancelAddProject() {
  showAddDialog.value = false;
  resetForm();
}

function resetForm() {
  newProject.value = {
    title: "",
    summary: "",
    status: "Planning",
    teamSize: 1,
    deadline: "",
    progress: 0,
  };
  if (form.value) {
    form.value.reset();
  }
}

function confirmAddProject() {
  if (!isFormValid.value) return;

  isAdding.value = true;

  // Simulate API call delay
  setTimeout(() => {
    const project = {
      id: Date.now(), // Generate unique ID
      title: newProject.value.title,
      summary: newProject.value.summary,
      progress: newProject.value.progress,
      status: newProject.value.status,
      teamSize: newProject.value.teamSize,
      deadline: newProject.value.deadline,
      createdAt: new Date(),
    };

    projects.value.unshift(project); // Add to beginning of list

    isAdding.value = false;
    showAddDialog.value = false;
    resetForm();
  }, 1000);
}

function editProject(id: number) {
  console.log("Editing project:", id);
}

function deleteProject(id: number) {
  projects.value = projects.value.filter((p) => p.id !== id);
}

function viewProject(id: number) {
  console.log("Viewing project:", id);
}
</script>

<style scoped>
.project-list {
  max-width: 1400px;
  margin: 0 auto;
}

.project-card {
  transition: all 0.3s ease;
  cursor: pointer;
}

.project-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.completed-project {
  opacity: 0.8;
  background-color: rgba(76, 175, 80, 0.05);
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Dark theme adjustments */
.v-theme--dark .completed-project {
  background-color: rgba(76, 175, 80, 0.1);
}
</style>
