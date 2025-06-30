<template>
  <div class="design">
    <v-card variant="outlined" class="pa-6">
      <v-card-title class="d-flex align-center justify-space-between mb-4">
        <span class="text-h4">Design System & Assets</span>
        <v-btn
          color="primary"
          prepend-icon="mdi-palette"
          @click="createDesignAsset"
          size="large"
        >
          Create Asset
        </v-btn>
      </v-card-title>

      <v-card-text>
        <v-row>
          <v-col cols="12" md="8">
            <v-card variant="outlined" class="pa-4 mb-4">
              <v-card-title class="text-h6 mb-3"
                >Design Components</v-card-title
              >
              <div class="components-grid">
                <v-card
                  v-for="component in designComponents"
                  :key="component.id"
                  variant="outlined"
                  class="component-card"
                  :class="{ 'ai-generated': component.aiGenerated }"
                >
                  <v-card-text class="py-3">
                    <div class="d-flex align-center justify-space-between">
                      <div class="flex-grow-1">
                        <h4 class="text-h6 font-weight-bold mb-1">
                          {{ component.name }}
                        </h4>
                        <p class="text-body-2 text-grey-darken-1 mb-2">
                          {{ component.description }}
                        </p>
                        <div class="d-flex align-center">
                          <v-chip
                            :color="getTypeColor(component.type)"
                            size="small"
                            class="mr-2"
                          >
                            {{ component.type }}
                          </v-chip>
                          <v-chip
                            :color="getStatusColor(component.status)"
                            size="small"
                            class="mr-2"
                          >
                            {{ component.status }}
                          </v-chip>
                          <v-icon
                            v-if="component.aiGenerated"
                            color="primary"
                            size="small"
                            class="mr-2"
                          >
                            mdi-robot
                          </v-icon>
                        </div>
                      </div>
                      <div class="text-right">
                        <div class="text-h6 font-weight-bold text-primary">
                          {{ component.version }}
                        </div>
                        <div class="text-caption text-grey">Version</div>
                      </div>
                    </div>
                  </v-card-text>
                </v-card>
              </div>
            </v-card>

            <v-card variant="outlined" class="pa-4">
              <v-card-title class="text-h6 mb-3">Color Palette</v-card-title>
              <div class="color-palette">
                <div
                  v-for="color in colorPalette"
                  :key="color.name"
                  class="color-item"
                  :style="{ backgroundColor: color.hex }"
                >
                  <div class="color-info">
                    <h6 class="text-body-2 font-weight-medium">
                      {{ color.name }}
                    </h6>
                    <p class="text-caption">{{ color.hex }}</p>
                  </div>
                </div>
              </div>
            </v-card>
          </v-col>

          <v-col cols="12" md="4">
            <v-card variant="outlined" class="pa-4 mb-4">
              <v-card-title class="text-h6 mb-3">Design Stats</v-card-title>
              <div class="stats-grid">
                <div class="stat-item text-center">
                  <div class="text-h4 font-weight-bold text-primary">
                    {{ totalComponents }}
                  </div>
                  <div class="text-caption text-grey">Components</div>
                </div>
                <div class="stat-item text-center">
                  <div class="text-h4 font-weight-bold text-success">
                    {{ aiGeneratedCount }}
                  </div>
                  <div class="text-caption text-grey">AI Generated</div>
                </div>
                <div class="stat-item text-center">
                  <div class="text-h4 font-weight-bold text-warning">
                    {{ colorCount }}
                  </div>
                  <div class="text-caption text-grey">Colors</div>
                </div>
                <div class="stat-item text-center">
                  <div class="text-h4 font-weight-bold text-info">
                    {{ fontCount }}
                  </div>
                  <div class="text-caption text-grey">Fonts</div>
                </div>
              </div>
            </v-card>

            <v-card variant="outlined" class="pa-4 mb-4">
              <v-card-title class="text-h6 mb-3"
                >AI Design Suggestions</v-card-title
              >
              <div
                v-for="suggestion in aiSuggestions"
                :key="suggestion.id"
                class="suggestion-item mb-3"
              >
                <div class="d-flex align-start">
                  <v-icon color="primary" class="mr-2 mt-1"
                    >mdi-lightbulb</v-icon
                  >
                  <div>
                    <h6 class="text-body-2 font-weight-medium mb-1">
                      {{ suggestion.title }}
                    </h6>
                    <p class="text-caption text-grey">
                      {{ suggestion.description }}
                    </p>
                    <v-btn
                      size="x-small"
                      color="primary"
                      variant="text"
                      class="mt-1"
                    >
                      Apply
                    </v-btn>
                  </div>
                </div>
              </div>
            </v-card>

            <v-card variant="outlined" class="pa-4">
              <v-card-title class="text-h6 mb-3">Typography</v-card-title>
              <div
                v-for="font in typography"
                :key="font.id"
                class="font-item mb-3"
              >
                <div class="d-flex align-center justify-space-between">
                  <div>
                    <h6
                      class="text-body-1 font-weight-medium"
                      :style="{ fontFamily: font.family }"
                    >
                      {{ font.name }}
                    </h6>
                    <p class="text-caption text-grey">
                      {{ font.weights.join(", ") }}
                    </p>
                  </div>
                  <v-chip
                    :color="font.status === 'active' ? 'success' : 'warning'"
                    size="small"
                  >
                    {{ font.status }}
                  </v-chip>
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

const designComponents = ref([
  {
    id: 1,
    name: "AI Button Component",
    description: "Smart button with adaptive styling based on context",
    type: "interactive",
    status: "completed",
    version: "2.1.0",
    aiGenerated: true,
  },
  {
    id: 2,
    name: "Smart Form Field",
    description: "Auto-validating form inputs with AI suggestions",
    type: "form",
    status: "in-progress",
    version: "1.3.2",
    aiGenerated: true,
  },
  {
    id: 3,
    name: "Data Visualization Card",
    description: "Dynamic charts and graphs with AI insights",
    type: "display",
    status: "completed",
    version: "3.0.1",
    aiGenerated: false,
  },
  {
    id: 4,
    name: "Navigation Menu",
    description: "Responsive navigation with AI-powered suggestions",
    type: "navigation",
    status: "planned",
    version: "1.0.0",
    aiGenerated: true,
  },
  {
    id: 5,
    name: "Progress Indicator",
    description: "Smart progress bars with predictive completion",
    type: "feedback",
    status: "in-progress",
    version: "2.0.0",
    aiGenerated: true,
  },
]);

const colorPalette = ref([
  { name: "Primary Blue", hex: "#1976D2" },
  { name: "Success Green", hex: "#4CAF50" },
  { name: "Warning Orange", hex: "#FF9800" },
  { name: "Error Red", hex: "#F44336" },
  { name: "Info Cyan", hex: "#00BCD4" },
  { name: "Dark Grey", hex: "#424242" },
  { name: "Light Grey", hex: "#F5F5F5" },
  { name: "White", hex: "#FFFFFF" },
]);

const aiSuggestions = ref([
  {
    id: 1,
    title: "Improve Contrast",
    description: "Increase contrast ratio for better accessibility",
    type: "accessibility",
  },
  {
    id: 2,
    title: "Add Micro-interactions",
    description: "Enhance UX with subtle animations",
    type: "interaction",
  },
  {
    id: 3,
    title: "Optimize for Mobile",
    description: "Improve touch targets and spacing",
    type: "responsive",
  },
]);

const typography = ref([
  {
    id: 1,
    name: "Roboto",
    family: "Roboto, sans-serif",
    weights: ["300", "400", "500", "700"],
    status: "active",
  },
  {
    id: 2,
    name: "Inter",
    family: "Inter, sans-serif",
    weights: ["400", "500", "600", "700"],
    status: "active",
  },
  {
    id: 3,
    name: "Poppins",
    family: "Poppins, sans-serif",
    weights: ["300", "400", "500", "600"],
    status: "planned",
  },
]);

const totalComponents = computed(() => designComponents.value.length);
const aiGeneratedCount = computed(
  () => designComponents.value.filter((c) => c.aiGenerated).length
);
const colorCount = computed(() => colorPalette.value.length);
const fontCount = computed(() => typography.value.length);

function getTypeColor(type: string) {
  switch (type) {
    case "interactive":
      return "primary";
    case "form":
      return "success";
    case "display":
      return "info";
    case "navigation":
      return "warning";
    case "feedback":
      return "error";
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

function createDesignAsset() {
  console.log("Creating new design asset with AI assistance");
}

// Define component name for better debugging
defineOptions({
  name: "Design",
});
</script>

<style scoped>
.design {
  max-width: 1400px;
  margin: 0 auto;
}

.components-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
}

.component-card {
  transition: all 0.3s ease;
}

.component-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.ai-generated {
  border-left: 4px solid #1976d2;
}

.color-palette {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 16px;
}

.color-item {
  height: 80px;
  border-radius: 8px;
  display: flex;
  align-items: flex-end;
  padding: 8px;
  position: relative;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.color-item:hover {
  transform: scale(1.05);
}

.color-info {
  background: rgba(255, 255, 255, 0.9);
  padding: 4px 8px;
  border-radius: 4px;
  width: 100%;
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

.suggestion-item {
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
}

.suggestion-item:last-child {
  border-bottom: none;
}

.font-item {
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
}

.font-item:last-child {
  border-bottom: none;
}
</style>
