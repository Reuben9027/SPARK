<template>
  <div class="project">
    <v-card variant="outlined" class="pa-6">
      <v-card-title class="d-flex align-center justify-space-between mb-4">
        <span class="text-h4">Project Details & AI Insights</span>
        <v-btn
          color="primary"
          prepend-icon="mdi-robot"
          @click="generateAIInsights"
          size="large"
        >
          AI Analysis
        </v-btn>
      </v-card-title>

      <v-card-text>
        <v-row>
          <v-col cols="12" md="8">
            <v-card variant="outlined" class="pa-4 mb-4">
              <v-card-title class="text-h6 mb-3">Project Overview</v-card-title>
              <div class="project-info">
                <div class="d-flex align-center mb-4">
                  <v-avatar size="64" color="primary" class="mr-4">
                    <v-icon size="32" color="white">mdi-robot</v-icon>
                  </v-avatar>
                  <div>
                    <h3 class="text-h5 font-weight-bold">
                      AI Project Management System
                    </h3>
                    <p class="text-body-1 text-grey-darken-1">
                      Intelligent project management for solopreneurs
                    </p>
                  </div>
                </div>

                <v-row>
                  <v-col cols="12" md="6">
                    <div class="info-item mb-3">
                      <label class="text-caption text-grey">Status</label>
                      <v-chip color="primary" size="small">In Progress</v-chip>
                    </div>
                    <div class="info-item mb-3">
                      <label class="text-caption text-grey">Priority</label>
                      <v-chip color="error" size="small">High</v-chip>
                    </div>
                    <div class="info-item mb-3">
                      <label class="text-caption text-grey">Start Date</label>
                      <p class="text-body-2">January 15, 2024</p>
                    </div>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div class="info-item mb-3">
                      <label class="text-caption text-grey">Progress</label>
                      <v-progress-linear
                        :model-value="projectProgress"
                        color="primary"
                        height="8"
                        rounded
                      ></v-progress-linear>
                      <span class="text-caption"
                        >{{ projectProgress }}% Complete</span
                      >
                    </div>
                    <div class="info-item mb-3">
                      <label class="text-caption text-grey"
                        >Estimated Completion</label
                      >
                      <p class="text-body-2">March 30, 2024</p>
                    </div>
                    <div class="info-item mb-3">
                      <label class="text-caption text-grey">Budget</label>
                      <p class="text-body-2">$15,000 / $20,000</p>
                    </div>
                  </v-col>
                </v-row>
              </div>
            </v-card>

            <v-card variant="outlined" class="pa-4">
              <v-card-title class="text-h6 mb-3">AI-Powered Tasks</v-card-title>
              <div class="tasks-list">
                <v-card
                  v-for="task in aiTasks"
                  :key="task.id"
                  variant="outlined"
                  class="mb-3 task-card"
                  :class="{ 'ai-suggested': task.aiSuggested }"
                >
                  <v-card-text class="py-3">
                    <div class="d-flex align-center justify-space-between">
                      <div class="flex-grow-1">
                        <div class="d-flex align-center mb-2">
                          <h4 class="text-h6 font-weight-bold">
                            {{ task.title }}
                          </h4>
                          <v-icon
                            v-if="task.aiSuggested"
                            color="primary"
                            size="small"
                            class="ml-2"
                          >
                            mdi-robot
                          </v-icon>
                        </div>
                        <p class="text-body-2 text-grey-darken-1 mb-2">
                          {{ task.description }}
                        </p>
                        <div class="d-flex align-center">
                          <v-chip
                            :color="getPriorityColor(task.priority)"
                            size="small"
                            class="mr-2"
                          >
                            {{ task.priority }}
                          </v-chip>
                          <v-chip
                            :color="getStatusColor(task.status)"
                            size="small"
                            class="mr-2"
                          >
                            {{ task.status }}
                          </v-chip>
                          <span class="text-caption text-grey"
                            >{{ task.estimatedHours }}h</span
                          >
                        </div>
                      </div>
                      <div class="d-flex align-center">
                        <v-btn
                          :color="
                            task.status === 'completed' ? 'success' : 'primary'
                          "
                          :icon="
                            task.status === 'completed'
                              ? 'mdi-check-circle'
                              : 'mdi-check'
                          "
                          variant="text"
                          size="small"
                          @click="toggleTaskStatus(task.id)"
                          class="mr-2"
                        ></v-btn>
                        <v-btn
                          color="error"
                          icon="mdi-delete"
                          variant="text"
                          size="small"
                          @click="deleteTask(task.id)"
                        ></v-btn>
                      </div>
                    </div>
                  </v-card-text>
                </v-card>
              </div>
            </v-card>
          </v-col>

          <v-col cols="12" md="4">
            <v-card variant="outlined" class="pa-4 mb-4">
              <v-card-title class="text-h6 mb-3">AI Insights</v-card-title>
              <div
                v-for="insight in aiInsights"
                :key="insight.id"
                class="insight-item mb-3"
              >
                <div class="d-flex align-start">
                  <v-icon
                    :color="
                      insight.type === 'positive'
                        ? 'success'
                        : insight.type === 'warning'
                        ? 'warning'
                        : 'info'
                    "
                    class="mr-2 mt-1"
                  >
                    {{ insight.icon }}
                  </v-icon>
                  <div>
                    <h6 class="text-body-2 font-weight-medium mb-1">
                      {{ insight.title }}
                    </h6>
                    <p class="text-caption text-grey">
                      {{ insight.description }}
                    </p>
                    <v-btn
                      size="x-small"
                      color="primary"
                      variant="text"
                      class="mt-1"
                    >
                      View Details
                    </v-btn>
                  </div>
                </div>
              </div>
            </v-card>

            <v-card variant="outlined" class="pa-4 mb-4">
              <v-card-title class="text-h6 mb-3">Risk Assessment</v-card-title>
              <div
                v-for="risk in riskAssessment"
                :key="risk.id"
                class="risk-item mb-3"
              >
                <div class="d-flex align-center justify-space-between">
                  <div>
                    <h6 class="text-body-2 font-weight-medium">
                      {{ risk.title }}
                    </h6>
                    <p class="text-caption text-grey">{{ risk.description }}</p>
                  </div>
                  <v-chip :color="getRiskColor(risk.level)" size="small">
                    {{ risk.level }}
                  </v-chip>
                </div>
              </div>
            </v-card>

            <v-card variant="outlined" class="pa-4">
              <v-card-title class="text-h6 mb-3">Team Performance</v-card-title>
              <div class="performance-metrics">
                <div class="metric-item text-center mb-3">
                  <div class="text-h4 font-weight-bold text-success">
                    {{ productivityScore }}%
                  </div>
                  <div class="text-caption text-grey">Productivity</div>
                </div>
                <div class="metric-item text-center mb-3">
                  <div class="text-h4 font-weight-bold text-primary">
                    {{ efficiencyScore }}%
                  </div>
                  <div class="text-caption text-grey">Efficiency</div>
                </div>
                <div class="metric-item text-center">
                  <div class="text-h4 font-weight-bold text-warning">
                    {{ qualityScore }}%
                  </div>
                  <div class="text-caption text-grey">Quality</div>
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const projectProgress = ref(65);

const aiTasks = ref([
  {
    id: 1,
    title: "Implement AI Task Prioritization",
    description:
      "Build machine learning model to automatically prioritize tasks based on deadlines and importance",
    priority: "high",
    status: "completed",
    estimatedHours: 16,
    aiSuggested: true,
  },
  {
    id: 2,
    title: "Design Smart Dashboard",
    description:
      "Create AI-powered dashboard with predictive analytics and insights",
    priority: "high",
    status: "in-progress",
    estimatedHours: 24,
    aiSuggested: true,
  },
  {
    id: 3,
    title: "Integrate OpenAI API",
    description:
      "Connect OpenAI GPT-4 for content generation and task analysis",
    priority: "medium",
    status: "in-progress",
    estimatedHours: 12,
    aiSuggested: false,
  },
  {
    id: 4,
    title: "Build User Authentication",
    description:
      "Implement secure authentication system with AI-powered fraud detection",
    priority: "medium",
    status: "planned",
    estimatedHours: 20,
    aiSuggested: true,
  },
  {
    id: 5,
    title: "Create Mobile App",
    description: "Develop responsive mobile application with AI features",
    priority: "low",
    status: "planned",
    estimatedHours: 40,
    aiSuggested: false,
  },
]);

const aiInsights = ref([
  {
    id: 1,
    title: "Optimal Task Order",
    description: "AI suggests reordering tasks for 23% efficiency improvement",
    type: "positive",
    icon: "mdi-trending-up",
  },
  {
    id: 2,
    title: "Resource Allocation",
    description: "Consider allocating more time to AI integration tasks",
    type: "warning",
    icon: "mdi-lightbulb",
  },
  {
    id: 3,
    title: "Risk Mitigation",
    description: "Implement backup plan for API rate limits",
    type: "info",
    icon: "mdi-shield",
  },
]);

const riskAssessment = ref([
  {
    id: 1,
    title: "API Rate Limits",
    description: "OpenAI API usage may exceed limits",
    level: "medium",
  },
  {
    id: 2,
    title: "Data Security",
    description: "Ensure proper encryption for user data",
    level: "low",
  },
  {
    id: 3,
    title: "Timeline Risk",
    description: "Mobile app development may delay launch",
    level: "high",
  },
]);

const productivityScore = ref(87);
const efficiencyScore = ref(92);
const qualityScore = ref(89);

function getPriorityColor(priority: string) {
  switch (priority) {
    case "high":
      return "error";
    case "medium":
      return "warning";
    case "low":
      return "success";
    default:
      return "grey";
  }
}

function getStatusColor(status: string) {
  switch (status) {
    case "completed":
      return "success";
    case "in-progress":
      return "primary";
    case "planned":
      return "warning";
    default:
      return "grey";
  }
}

function getRiskColor(level: string) {
  switch (level) {
    case "high":
      return "error";
    case "medium":
      return "warning";
    case "low":
      return "success";
    default:
      return "grey";
  }
}

function toggleTaskStatus(id: number) {
  const task = aiTasks.value.find((t) => t.id === id);
  if (task) {
    if (task.status === "completed") {
      task.status = "in-progress";
    } else if (task.status === "in-progress") {
      task.status = "completed";
    } else {
      task.status = "in-progress";
    }
  }
}

function deleteTask(id: number) {
  aiTasks.value = aiTasks.value.filter((t) => t.id !== id);
}

function generateAIInsights() {
  console.log('Generating AI-powered project insights');
}

// Define component name for better debugging
defineOptions({
  name: 'Project'
});
</script>

<style scoped>
.project {
  max-width: 1400px;
  margin: 0 auto;
}

.task-card {
  transition: all 0.3s ease;
}

.task-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.ai-suggested {
  border-left: 4px solid #1976d2;
}

.info-item {
  margin-bottom: 16px;
}

.info-item label {
  display: block;
  margin-bottom: 4px;
}

.insight-item {
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
}

.insight-item:last-child {
  border-bottom: none;
}

.risk-item {
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
}

.risk-item:last-child {
  border-bottom: none;
}

.performance-metrics {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.metric-item {
  padding: 16px;
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.02);
}
</style>
