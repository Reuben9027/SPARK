<template>
  <div class="features">
    <v-card variant="outlined" class="pa-6">
      <v-card-title class="d-flex align-center justify-space-between mb-6">
        <div>
          <span class="text-h4">Project Features</span>
          <p class="text-body-1 text-grey-darken-1 mt-2">
            Discover what makes our app powerful for solo founders and indie
            hackers
          </p>
        </div>
        <v-btn
          color="primary"
          prepend-icon="mdi-plus"
          @click="addNewFeature"
          size="large"
        >
          Add Feature
        </v-btn>
      </v-card-title>

      <v-card-text>
        <!-- Features Grid -->
        <v-row>
          <v-col
            v-for="feature in features"
            :key="feature.id"
            cols="12"
            md="6"
            lg="4"
          >
            <v-card
              class="feature-card"
              variant="outlined"
              :class="{ expanded: expandedFeatures.includes(feature.id) }"
            >
              <!-- Feature Header -->
              <v-card-title
                class="feature-header"
                @click="toggleFeature(feature.id)"
              >
                <div class="d-flex align-center justify-space-between w-100">
                  <div class="d-flex align-center">
                    <v-icon
                      :color="
                        feature.status === 'completed'
                          ? 'success'
                          : feature.status === 'in-progress'
                          ? 'warning'
                          : 'grey'
                      "
                      class="mr-3"
                      size="large"
                    >
                      {{ feature.icon }}
                    </v-icon>
                    <div>
                      <h3 class="text-h6 font-weight-bold mb-1">
                        {{ feature.title }}
                      </h3>
                      <div class="d-flex align-center">
                        <v-chip
                          :color="getStatusColor(feature.status)"
                          size="small"
                          variant="tonal"
                          class="mr-2"
                        >
                          {{ feature.status }}
                        </v-chip>
                        <v-chip
                          :color="getPriorityColor(feature.priority)"
                          size="small"
                          variant="tonal"
                        >
                          {{ feature.priority }}
                        </v-chip>
                      </div>
                    </div>
                  </div>
                  <v-icon
                    :icon="
                      expandedFeatures.includes(feature.id)
                        ? 'mdi-chevron-up'
                        : 'mdi-chevron-down'
                    "
                    class="expand-icon"
                  ></v-icon>
                </div>
              </v-card-title>

              <!-- Expanded Content -->
              <v-expand-transition>
                <div v-show="expandedFeatures.includes(feature.id)">
                  <v-divider></v-divider>
                  <v-card-text class="feature-details">
                    <!-- Description -->
                    <div class="mb-4">
                      <h4 class="text-subtitle-1 font-weight-bold mb-2">
                        Description
                      </h4>
                      <p class="text-body-2 text-grey-darken-1">
                        {{ feature.description }}
                      </p>
                    </div>

                    <!-- Benefits -->
                    <div
                      class="mb-4"
                      v-if="feature.benefits && feature.benefits.length > 0"
                    >
                      <h4 class="text-subtitle-1 font-weight-bold mb-2">
                        Benefits
                      </h4>
                      <v-list density="compact" class="pa-0">
                        <v-list-item
                          v-for="benefit in feature.benefits"
                          :key="benefit"
                          class="pa-0"
                        >
                          <template v-slot:prepend>
                            <v-icon color="success" size="small"
                              >mdi-check-circle</v-icon
                            >
                          </template>
                          <v-list-item-title class="text-body-2">{{
                            benefit
                          }}</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </div>

                    <!-- Requirements -->
                    <div
                      class="mb-4"
                      v-if="
                        feature.requirements && feature.requirements.length > 0
                      "
                    >
                      <h4 class="text-subtitle-1 font-weight-bold mb-2">
                        Requirements
                      </h4>
                      <v-list density="compact" class="pa-0">
                        <v-list-item
                          v-for="requirement in feature.requirements"
                          :key="requirement"
                          class="pa-0"
                        >
                          <template v-slot:prepend>
                            <v-icon color="info" size="small"
                              >mdi-information</v-icon
                            >
                          </template>
                          <v-list-item-title class="text-body-2">{{
                            requirement
                          }}</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </div>

                    <!-- Technical Details -->
                    <div class="mb-4" v-if="feature.technicalDetails">
                      <h4 class="text-subtitle-1 font-weight-bold mb-2">
                        Technical Details
                      </h4>
                      <v-card variant="outlined" class="pa-3">
                        <div class="d-flex align-center mb-2">
                          <v-icon color="primary" size="small" class="mr-2"
                            >mdi-code-tags</v-icon
                          >
                          <span class="text-caption font-weight-medium"
                            >Implementation</span
                          >
                        </div>
                        <p class="text-body-2 text-grey-darken-1 mb-2">
                          {{ feature.technicalDetails.implementation }}
                        </p>
                        <div class="d-flex align-center">
                          <v-chip
                            v-for="tech in feature.technicalDetails
                              .technologies"
                            :key="tech"
                            size="small"
                            variant="outlined"
                            class="mr-1"
                          >
                            {{ tech }}
                          </v-chip>
                        </div>
                      </v-card>
                    </div>

                    <!-- Timeline -->
                    <div class="mb-4" v-if="feature.timeline">
                      <h4 class="text-subtitle-1 font-weight-bold mb-2">
                        Timeline
                      </h4>
                      <div class="d-flex align-center">
                        <v-icon color="primary" size="small" class="mr-2"
                          >mdi-calendar-clock</v-icon
                        >
                        <span class="text-body-2">
                          Estimated: {{ feature.timeline.estimated }} days
                        </span>
                        <v-spacer></v-spacer>
                        <span class="text-caption text-grey">
                          Due: {{ formatDate(feature.timeline.dueDate) }}
                        </span>
                      </div>
                    </div>

                    <!-- Actions -->
                    <div class="d-flex justify-space-between align-center">
                      <div class="d-flex align-center">
                        <v-btn
                          :color="
                            feature.status === 'completed'
                              ? 'success'
                              : 'primary'
                          "
                          variant="tonal"
                          size="small"
                          @click="updateFeatureStatus(feature.id)"
                          class="mr-2"
                        >
                          <v-icon start size="small">
                            {{
                              feature.status === "completed"
                                ? "mdi-check"
                                : "mdi-play"
                            }}
                          </v-icon>
                          {{
                            feature.status === "completed"
                              ? "Completed"
                              : "Mark Complete"
                          }}
                        </v-btn>
                        <v-btn
                          color="secondary"
                          variant="outlined"
                          size="small"
                          @click="editFeature(feature)"
                        >
                          <v-icon start size="small">mdi-pencil</v-icon>
                          Edit
                        </v-btn>
                      </div>
                      <v-btn
                        color="error"
                        variant="text"
                        size="small"
                        @click="deleteFeature(feature.id)"
                      >
                        <v-icon size="small">mdi-delete</v-icon>
                      </v-btn>
                    </div>
                  </v-card-text>
                </div>
              </v-expand-transition>
            </v-card>
          </v-col>
        </v-row>

        <!-- Empty State -->
        <div v-if="features.length === 0" class="text-center py-12">
          <v-icon size="64" color="grey-lighten-1"
            >mdi-lightbulb-outline</v-icon
          >
          <h3 class="text-h5 mt-4 mb-2">No Features Yet</h3>
          <p class="text-grey mb-4">
            Start by adding your first project feature
          </p>
          <v-btn color="primary" @click="addNewFeature">
            Add Your First Feature
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface Feature {
  id: number;
  title: string;
  description: string;
  icon: string;
  status: "not-started" | "in-progress" | "completed";
  priority: "low" | "medium" | "high" | "urgent";
  benefits?: string[];
  requirements?: string[];
  technicalDetails?: {
    implementation: string;
    technologies: string[];
  };
  timeline?: {
    estimated: number;
    dueDate: string;
  };
}

// Reactive data
const expandedFeatures = ref<number[]>([]);

// Sample features data
const features = ref<Feature[]>([
  {
    id: 1,
    title: "AI Idea Validator",
    description:
      "Validate your startup idea with real-time AI feedback and market data analysis to ensure product-market fit before development begins.",
    icon: "mdi-lightbulb-on-outline",
    status: "completed",
    priority: "high",
    benefits: [
      "Reduces risk of building the wrong product",
      "Provides data-driven insights",
      "Saves time and resources",
      "Improves market positioning",
    ],
    requirements: [
      "Market research data access",
      "AI model integration",
      "User feedback collection system",
    ],
    technicalDetails: {
      implementation:
        "Integrate OpenAI API for idea analysis, combine with market data APIs, and create a scoring algorithm based on multiple factors.",
      technologies: ["OpenAI API", "Market Data APIs", "Python", "React"],
    },
    timeline: {
      estimated: 14,
      dueDate: "2024-02-15",
    },
  },
  {
    id: 2,
    title: "MVP Planner",
    description:
      "Break down your idea into must-have features and plan your minimum viable product with detailed user stories and acceptance criteria.",
    icon: "mdi-clipboard-check-outline",
    status: "in-progress",
    priority: "high",
    benefits: [
      "Clear development roadmap",
      "Focused feature set",
      "Better resource allocation",
      "Faster time to market",
    ],
    requirements: [
      "User research completed",
      "Core features identified",
      "Technical architecture planned",
    ],
    technicalDetails: {
      implementation:
        "Create a drag-and-drop interface for feature prioritization, integrate with project management tools, and generate user stories automatically.",
      technologies: ["Vue.js", "Node.js", "MongoDB", "Jira API"],
    },
    timeline: {
      estimated: 10,
      dueDate: "2024-02-20",
    },
  },
  {
    id: 3,
    title: "Task Generator",
    description:
      "Instantly generate a list of development tasks from your MVP plan, ready for execution with proper estimation and dependencies.",
    icon: "mdi-format-list-checkbox",
    status: "not-started",
    priority: "medium",
    benefits: [
      "Automated task breakdown",
      "Consistent task structure",
      "Time estimation included",
      "Dependency mapping",
    ],
    requirements: [
      "MVP plan completed",
      "Development team available",
      "Project management tool setup",
    ],
    technicalDetails: {
      implementation:
        "Use AI to analyze feature requirements and generate detailed tasks with time estimates and dependencies.",
      technologies: ["GPT-4", "Python", "PostgreSQL", "REST API"],
    },
    timeline: {
      estimated: 7,
      dueDate: "2024-02-25",
    },
  },
  {
    id: 4,
    title: "Tech Stack Recommender",
    description:
      "Get tailored recommendations on tools and frameworks based on your project needs, team size, and technical requirements.",
    icon: "mdi-cogs",
    status: "completed",
    priority: "medium",
    benefits: [
      "Optimized technology choices",
      "Reduced learning curve",
      "Better performance",
      "Scalability planning",
    ],
    requirements: [
      "Project requirements defined",
      "Team skills assessment",
      "Budget constraints known",
    ],
    technicalDetails: {
      implementation:
        "Create a decision tree algorithm that considers project type, team size, budget, and performance requirements to recommend optimal tech stacks.",
      technologies: ["Python", "Machine Learning", "React", "Node.js"],
    },
    timeline: {
      estimated: 5,
      dueDate: "2024-02-10",
    },
  },
  {
    id: 5,
    title: "AI PM Assistant",
    description:
      "Chat with an AI project manager to guide your progress, remove blockers, and provide real-time project management assistance.",
    icon: "mdi-robot-outline",
    status: "in-progress",
    priority: "urgent",
    benefits: [
      "24/7 project guidance",
      "Instant problem solving",
      "Progress tracking",
      "Risk identification",
    ],
    requirements: [
      "Project data integration",
      "AI model training",
      "Chat interface development",
    ],
    technicalDetails: {
      implementation:
        "Build a conversational AI using GPT-4 with project context, integrate with project management APIs, and provide real-time assistance.",
      technologies: ["GPT-4", "WebSocket", "Vue.js", "Python FastAPI"],
    },
    timeline: {
      estimated: 21,
      dueDate: "2024-03-15",
    },
  },
  {
    id: 6,
    title: "Progress Tracker",
    description:
      "Visualize your development journey with interactive charts, milestone tracking, and motivation-boosting analytics.",
    icon: "mdi-timeline-check-outline",
    status: "not-started",
    priority: "low",
    benefits: [
      "Visual progress tracking",
      "Motivation through milestones",
      "Performance insights",
      "Team collaboration",
    ],
    requirements: [
      "Task completion data",
      "Chart library integration",
      "Real-time updates",
    ],
    technicalDetails: {
      implementation:
        "Create interactive dashboards with D3.js, integrate with task management systems, and provide real-time progress visualization.",
      technologies: ["D3.js", "Vue.js", "WebSocket", "Chart.js"],
    },
    timeline: {
      estimated: 12,
      dueDate: "2024-03-01",
    },
  },
]);

// Methods
function toggleFeature(featureId: number) {
  const index = expandedFeatures.value.indexOf(featureId);
  if (index > -1) {
    expandedFeatures.value.splice(index, 1);
  } else {
    expandedFeatures.value.push(featureId);
  }
}

function getStatusColor(status: string) {
  const colors = {
    "not-started": "grey",
    "in-progress": "warning",
    completed: "success",
  };
  return colors[status as keyof typeof colors] || "grey";
}

function getPriorityColor(priority: string) {
  const colors = {
    low: "success",
    medium: "info",
    high: "warning",
    urgent: "error",
  };
  return colors[priority as keyof typeof colors] || "grey";
}

function updateFeatureStatus(featureId: number) {
  const feature = features.value.find((f) => f.id === featureId);
  if (feature) {
    if (feature.status === "completed") {
      feature.status = "not-started";
    } else if (feature.status === "not-started") {
      feature.status = "in-progress";
    } else {
      feature.status = "completed";
    }
  }
}

function addNewFeature() {
  // Implementation for adding new feature
  console.log("Add new feature");
}

function editFeature(feature: Feature) {
  // Implementation for editing feature
  console.log("Edit feature:", feature);
}

function deleteFeature(featureId: number) {
  features.value = features.value.filter((f) => f.id !== featureId);
  // Remove from expanded list if it was expanded
  const index = expandedFeatures.value.indexOf(featureId);
  if (index > -1) {
    expandedFeatures.value.splice(index, 1);
  }
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
</script>

<style scoped>
.feature-card {
  transition: all 0.3s ease;
  cursor: pointer;
}

.feature-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.feature-card.expanded {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.feature-header {
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.feature-header:hover {
  background-color: rgba(0, 0, 0, 0.02);
}

.expand-icon {
  transition: transform 0.3s ease;
}

.feature-details {
  background-color: rgba(0, 0, 0, 0.01);
}

/* Dark theme adjustments */
.v-theme--dark .feature-header:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

.v-theme--dark .feature-details {
  background-color: rgba(255, 255, 255, 0.02);
}
</style>
