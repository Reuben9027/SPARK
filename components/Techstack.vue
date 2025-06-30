<template>
  <div class="techstack">
    <v-card variant="outlined" class="pa-6">
      <v-card-title class="d-flex align-center justify-space-between mb-4">
        <span class="text-h4">Technology Stack & AI Tools</span>
        <v-btn
          color="primary"
          prepend-icon="mdi-plus"
          @click="addTechnology"
          size="large"
        >
          Add Technology
        </v-btn>
      </v-card-title>

      <v-card-text>
        <v-row>
          <v-col cols="12" md="8">
            <v-card variant="outlined" class="pa-4 mb-4">
              <v-card-title class="text-h6 mb-3"
                >AI & Machine Learning Stack</v-card-title
              >
              <div class="tech-grid">
                <v-card
                  v-for="tech in aiTechnologies"
                  :key="tech.id"
                  variant="outlined"
                  class="tech-card"
                  :class="{ 'ai-powered': tech.aiPowered }"
                >
                  <v-card-text class="py-3">
                    <div class="d-flex align-center justify-space-between">
                      <div class="flex-grow-1">
                        <div class="d-flex align-center mb-2">
                          <v-icon :color="tech.color" class="mr-2">{{
                            tech.icon
                          }}</v-icon>
                          <h4 class="text-h6 font-weight-bold">
                            {{ tech.name }}
                          </h4>
                          <v-icon
                            v-if="tech.aiPowered"
                            color="primary"
                            size="small"
                            class="ml-2"
                          >
                            mdi-robot
                          </v-icon>
                        </div>
                        <p class="text-body-2 text-grey-darken-1 mb-2">
                          {{ tech.description }}
                        </p>
                        <div class="d-flex align-center">
                          <v-chip
                            :color="getStatusColor(tech.status)"
                            size="small"
                            class="mr-2"
                          >
                            {{ tech.status }}
                          </v-chip>
                          <v-chip
                            :color="getTypeColor(tech.type)"
                            size="small"
                            class="mr-2"
                          >
                            {{ tech.type }}
                          </v-chip>
                          <span class="text-caption text-grey"
                            >v{{ tech.version }}</span
                          >
                        </div>
                      </div>
                      <div class="text-right">
                        <div
                          class="text-h6 font-weight-bold"
                          :class="`text-${tech.color}`"
                        >
                          {{ tech.performance }}%
                        </div>
                        <div class="text-caption text-grey">Performance</div>
                      </div>
                    </div>
                  </v-card-text>
                </v-card>
              </div>
            </v-card>

            <v-card variant="outlined" class="pa-4">
              <v-card-title class="text-h6 mb-3"
                >Development Stack</v-card-title
              >
              <div class="dev-stack">
                <div class="stack-category mb-4">
                  <h5 class="text-h6 font-weight-medium mb-3">Frontend</h5>
                  <div class="tech-list">
                    <v-chip
                      v-for="tech in frontendTech"
                      :key="tech.id"
                      :color="tech.color"
                      variant="outlined"
                      class="mr-2 mb-2"
                      size="large"
                    >
                      <v-icon start>{{ tech.icon }}</v-icon>
                      {{ tech.name }}
                    </v-chip>
                  </div>
                </div>

                <div class="stack-category mb-4">
                  <h5 class="text-h6 font-weight-medium mb-3">Backend</h5>
                  <div class="tech-list">
                    <v-chip
                      v-for="tech in backendTech"
                      :key="tech.id"
                      :color="tech.color"
                      variant="outlined"
                      class="mr-2 mb-2"
                      size="large"
                    >
                      <v-icon start>{{ tech.icon }}</v-icon>
                      {{ tech.name }}
                    </v-chip>
                  </div>
                </div>

                <div class="stack-category">
                  <h5 class="text-h6 font-weight-medium mb-3">
                    Database & Cloud
                  </h5>
                  <div class="tech-list">
                    <v-chip
                      v-for="tech in infrastructureTech"
                      :key="tech.id"
                      :color="tech.color"
                      variant="outlined"
                      class="mr-2 mb-2"
                      size="large"
                    >
                      <v-icon start>{{ tech.icon }}</v-icon>
                      {{ tech.name }}
                    </v-chip>
                  </div>
                </div>
              </div>
            </v-card>
          </v-col>

          <v-col cols="12" md="4">
            <v-card variant="outlined" class="pa-4 mb-4">
              <v-card-title class="text-h6 mb-3">Stack Overview</v-card-title>
              <div class="stats-grid">
                <div class="stat-item text-center">
                  <div class="text-h4 font-weight-bold text-primary">
                    {{ totalTechnologies }}
                  </div>
                  <div class="text-caption text-grey">Total Tech</div>
                </div>
                <div class="stat-item text-center">
                  <div class="text-h4 font-weight-bold text-success">
                    {{ aiTechnologiesCount }}
                  </div>
                  <div class="text-caption text-grey">AI Tools</div>
                </div>
                <div class="stat-item text-center">
                  <div class="text-h4 font-weight-bold text-warning">
                    {{ activeTechnologies }}
                  </div>
                  <div class="text-caption text-grey">Active</div>
                </div>
                <div class="stat-item text-center">
                  <div class="text-h4 font-weight-bold text-info">
                    {{ avgPerformance }}%
                  </div>
                  <div class="text-caption text-grey">Avg Performance</div>
                </div>
              </div>
            </v-card>

            <v-card variant="outlined" class="pa-4 mb-4">
              <v-card-title class="text-h6 mb-3"
                >AI Integration Status</v-card-title
              >
              <div
                v-for="integration in aiIntegrations"
                :key="integration.id"
                class="integration-item mb-3"
              >
                <div class="d-flex align-center justify-space-between">
                  <div>
                    <h6 class="text-body-2 font-weight-medium">
                      {{ integration.name }}
                    </h6>
                    <p class="text-caption text-grey">
                      {{ integration.description }}
                    </p>
                  </div>
                  <v-chip
                    :color="
                      integration.status === 'connected' ? 'success' : 'warning'
                    "
                    size="small"
                  >
                    {{ integration.status }}
                  </v-chip>
                </div>
              </div>
            </v-card>

            <v-card variant="outlined" class="pa-4">
              <v-card-title class="text-h6 mb-3"
                >Recommended Upgrades</v-card-title
              >
              <div
                v-for="upgrade in recommendedUpgrades"
                :key="upgrade.id"
                class="upgrade-item mb-3"
              >
                <div class="d-flex align-start">
                  <v-icon color="primary" class="mr-2 mt-1"
                    >mdi-lightbulb</v-icon
                  >
                  <div>
                    <h6 class="text-body-2 font-weight-medium mb-1">
                      {{ upgrade.title }}
                    </h6>
                    <p class="text-caption text-grey">
                      {{ upgrade.description }}
                    </p>
                    <v-btn
                      size="x-small"
                      color="primary"
                      variant="text"
                      class="mt-1"
                    >
                      Upgrade
                    </v-btn>
                  </div>
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

const aiTechnologies = ref([
  {
    id: 1,
    name: "OpenAI GPT-4",
    description: "Advanced language model for content generation and analysis",
    type: "AI Model",
    status: "active",
    version: "4.0",
    performance: 95,
    color: "primary",
    icon: "mdi-robot",
    aiPowered: true,
  },
  {
    id: 2,
    name: "TensorFlow.js",
    description: "Machine learning library for browser-based AI applications",
    type: "ML Framework",
    status: "active",
    version: "4.15.0",
    performance: 88,
    color: "orange",
    icon: "mdi-brain",
    aiPowered: true,
  },
  {
    id: 3,
    name: "Hugging Face",
    description: "Natural language processing models and transformers",
    type: "NLP Library",
    status: "active",
    version: "4.35.0",
    performance: 92,
    color: "yellow",
    icon: "mdi-chat-processing",
    aiPowered: true,
  },
  {
    id: 4,
    name: "Custom ML Model",
    description: "Proprietary machine learning model for project optimization",
    type: "Custom AI",
    status: "development",
    version: "1.2.0",
    performance: 78,
    color: "purple",
    icon: "mdi-cog",
    aiPowered: true,
  },
]);

const frontendTech = ref([
  { id: 1, name: "Vue.js", color: "green", icon: "mdi-vuejs" },
  { id: 2, name: "Vuetify", color: "blue", icon: "mdi-material-design" },
  {
    id: 3,
    name: "TypeScript",
    color: "blue-darken-2",
    icon: "mdi-language-typescript",
  },
  { id: 4, name: "PWA", color: "purple", icon: "mdi-cellphone" },
]);

const backendTech = ref([
  { id: 1, name: "Node.js", color: "green", icon: "mdi-nodejs" },
  { id: 2, name: "Express", color: "grey", icon: "mdi-server" },
  { id: 3, name: "Python", color: "blue", icon: "mdi-language-python" },
  { id: 4, name: "FastAPI", color: "green-darken-1", icon: "mdi-api" },
]);

const infrastructureTech = ref([
  { id: 1, name: "MongoDB", color: "green", icon: "mdi-database" },
  { id: 2, name: "AWS", color: "orange", icon: "mdi-cloud" },
  { id: 3, name: "Docker", color: "blue", icon: "mdi-docker" },
  { id: 4, name: "Redis", color: "red", icon: "mdi-database" },
]);

const aiIntegrations = ref([
  {
    id: 1,
    name: "OpenAI API",
    description: "Connected for content generation",
    status: "connected",
  },
  {
    id: 2,
    name: "Google Cloud AI",
    description: "Connected for ML services",
    status: "connected",
  },
  {
    id: 3,
    name: "Azure Cognitive",
    description: "Pending connection",
    status: "pending",
  },
]);

const recommendedUpgrades = ref([
  {
    id: 1,
    title: "Upgrade to GPT-4 Turbo",
    description: "Get faster response times and better performance",
    type: "performance",
  },
  {
    id: 2,
    title: "Add Claude Integration",
    description: "Enhance reasoning capabilities for complex tasks",
    type: "capability",
  },
  {
    id: 3,
    title: "Implement Vector Database",
    description: "Improve semantic search and retrieval",
    type: "infrastructure",
  },
]);

const totalTechnologies = computed(
  () =>
    aiTechnologies.value.length +
    frontendTech.value.length +
    backendTech.value.length +
    infrastructureTech.value.length
);
const aiTechnologiesCount = computed(
  () => aiTechnologies.value.filter((t) => t.aiPowered).length
);
const activeTechnologies = computed(
  () => aiTechnologies.value.filter((t) => t.status === "active").length
);
const avgPerformance = computed(() => {
  const total = aiTechnologies.value.reduce(
    (sum, tech) => sum + tech.performance,
    0
  );
  return Math.round(total / aiTechnologies.value.length);
});

function getStatusColor(status: string) {
  switch (status) {
    case "active":
      return "success";
    case "development":
      return "primary";
    case "planned":
      return "warning";
    default:
      return "grey";
  }
}

function getTypeColor(type: string) {
  switch (type) {
    case "AI Model":
      return "primary";
    case "ML Framework":
      return "success";
    case "NLP Library":
      return "info";
    case "Custom AI":
      return "purple";
    default:
      return "grey";
  }
}

function addTechnology() {
  console.log("Adding new technology to stack");
}

// Define component name for better debugging
defineOptions({
  name: 'Techstack'
});
</script>

<style scoped>
.techstack {
  max-width: 1400px;
  margin: 0 auto;
}

.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 16px;
}

.tech-card {
  transition: all 0.3s ease;
}

.tech-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.ai-powered {
  border-left: 4px solid #1976d2;
}

.stack-category {
  margin-bottom: 24px;
}

.tech-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.stat-item {
  padding: 16px;
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.02);
}

.integration-item {
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
}

.integration-item:last-child {
  border-bottom: none;
}

.upgrade-item {
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
}

.upgrade-item:last-child {
  border-bottom: none;
}
</style>
