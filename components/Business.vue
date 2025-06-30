<template>
  <div class="business">
    <v-card variant="outlined" class="pa-6">
      <v-card-title class="d-flex align-center justify-space-between mb-6">
        <div>
          <span class="text-h4">Business Idea Validation</span>
          <p class="text-body-1 text-grey-darken-1 mt-2">
            Validate your business idea and understand your market position
          </p>
        </div>
        <v-btn
          color="primary"
          prepend-icon="mdi-lightbulb-on"
          @click="validateIdea"
          size="large"
        >
          Validate Idea
        </v-btn>
      </v-card-title>

      <v-card-text>
        <v-row>
          <!-- Business Snapshot -->
          <v-col cols="12" lg="8">
            <v-card variant="outlined" class="pa-4 mb-4">
              <v-card-title class="d-flex align-center mb-4">
                <v-icon color="primary" class="mr-2">mdi-chart-box</v-icon>
                <span class="text-h5">Business Snapshot</span>
              </v-card-title>

              <v-row>
                <v-col cols="12" md="6">
                  <v-textarea
                    v-model="businessSnapshot.idea"
                    label="Your Business Idea"
                    variant="outlined"
                    placeholder="Describe your core business idea..."
                    rows="3"
                    class="mb-3"
                  ></v-textarea>

                  <v-text-field
                    v-model="businessSnapshot.targetUser"
                    label="Target User/Persona"
                    variant="outlined"
                    placeholder="Who is your ideal customer?"
                    class="mb-3"
                  ></v-text-field>

                  <v-text-field
                    v-model="businessSnapshot.userPain"
                    label="User Pain Point"
                    variant="outlined"
                    placeholder="What problem are you solving?"
                    class="mb-3"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-select
                    v-model="businessSnapshot.competitorRevenue"
                    :items="revenueOptions"
                    label="Do Competitors Earn Money?"
                    variant="outlined"
                    class="mb-3"
                  ></v-select>

                  <v-text-field
                    v-model="businessSnapshot.marketSize"
                    label="Market Size (TAM/SAM/SOM)"
                    variant="outlined"
                    placeholder="e.g., $10B TAM, $500M SAM, $50M SOM"
                    class="mb-3"
                  ></v-text-field>

                  <v-text-field
                    v-model="businessSnapshot.marketGrowth"
                    label="How Will the Market Grow?"
                    variant="outlined"
                    placeholder="Market growth rate and trends..."
                    class="mb-3"
                  ></v-text-field>
                </v-col>
              </v-row>

              <!-- Validation Score -->
              <v-card variant="tonal" class="pa-3 mt-3">
                <div class="d-flex align-center justify-space-between">
                  <div>
                    <h6 class="text-subtitle-1 font-weight-bold">
                      Idea Validation Score
                    </h6>
                    <p class="text-caption text-grey">
                      Based on market analysis and competitive landscape
                    </p>
                  </div>
                  <div class="text-center">
                    <div
                      class="text-h3 font-weight-bold"
                      :class="getValidationScoreColor()"
                    >
                      {{ validationScore }}%
                    </div>
                    <v-progress-linear
                      :model-value="validationScore"
                      :color="getValidationScoreColor()"
                      height="8"
                      rounded
                    ></v-progress-linear>
                  </div>
                </div>
              </v-card>
            </v-card>

            <!-- Competitive Analysis -->
            <v-card variant="outlined" class="pa-4 mb-4">
              <v-card-title
                class="d-flex align-center justify-space-between mb-4"
              >
                <div class="d-flex align-center">
                  <v-icon color="warning" class="mr-2"
                    >mdi-account-group</v-icon
                  >
                  <span class="text-h5">Competitive Analysis</span>
                </div>
                <v-btn
                  color="secondary"
                  variant="outlined"
                  prepend-icon="mdi-plus"
                  @click="addCompetitor"
                  size="small"
                >
                  Add Competitor
                </v-btn>
              </v-card-title>

              <div
                v-for="competitor in competitors"
                :key="competitor.id"
                class="mb-4"
              >
                <v-card variant="outlined" class="pa-3">
                  <div class="d-flex align-center justify-space-between mb-3">
                    <h6 class="text-h6 font-weight-bold">
                      {{ competitor.name }}
                    </h6>
                    <v-btn
                      icon="mdi-delete"
                      variant="text"
                      size="small"
                      color="error"
                      @click="removeCompetitor(competitor.id)"
                    ></v-btn>
                  </div>

                  <v-row>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="competitor.strengths"
                        label="Strengths"
                        variant="outlined"
                        density="compact"
                        placeholder="What are they good at?"
                        class="mb-2"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="competitor.weaknesses"
                        label="Weaknesses"
                        variant="outlined"
                        density="compact"
                        placeholder="Where do they fall short?"
                        class="mb-2"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-text-field
                    v-model="competitor.differentiation"
                    label="How Can You Stand Out?"
                    variant="outlined"
                    density="compact"
                    placeholder="Your unique value proposition..."
                    class="mb-2"
                  ></v-text-field>
                </v-card>
              </div>

              <!-- Differentiation Strategy -->
              <v-card variant="tonal" class="pa-4 mt-4">
                <h6 class="text-subtitle-1 font-weight-bold mb-3">
                  How Can Your Product Stand Out?
                </h6>
                <v-textarea
                  v-model="differentiationStrategy"
                  label="Competitive Differentiation Strategy"
                  variant="outlined"
                  rows="4"
                  placeholder="Explain how your product will differentiate from competitors..."
                ></v-textarea>
              </v-card>
            </v-card>
          </v-col>

          <!-- App Naming & SEO -->
          <v-col cols="12" lg="4">
            <v-card variant="outlined" class="pa-4 mb-4">
              <v-card-title class="d-flex align-center mb-4">
                <v-icon color="success" class="mr-2">mdi-tag-text</v-icon>
                <span class="text-h5">App Naming & SEO</span>
              </v-card-title>

              <v-text-field
                v-model="appNaming.currentName"
                label="Current App Name"
                variant="outlined"
                placeholder="Enter your app name..."
                class="mb-3"
              ></v-text-field>

              <v-btn
                color="primary"
                variant="outlined"
                block
                @click="generateNameSuggestions"
                class="mb-4"
              >
                Generate SEO-Optimized Names
              </v-btn>

              <!-- Name Suggestions -->
              <div v-if="appNaming.suggestions.length > 0">
                <h6 class="text-subtitle-2 font-weight-bold mb-3">
                  Suggested Names
                </h6>
                <v-list density="compact" class="pa-0">
                  <v-list-item
                    v-for="suggestion in appNaming.suggestions"
                    :key="suggestion.name"
                    class="pa-2 mb-2"
                    :class="{ 'selected-name': suggestion.selected }"
                    @click="selectName(suggestion)"
                  >
                    <template v-slot:prepend>
                      <v-icon
                        :color="suggestion.selected ? 'success' : 'grey'"
                        size="small"
                      >
                        {{
                          suggestion.selected
                            ? "mdi-check-circle"
                            : "mdi-circle-outline"
                        }}
                      </v-icon>
                    </template>
                    <v-list-item-title class="text-body-2 font-weight-medium">
                      {{ suggestion.name }}
                    </v-list-item-title>
                    <v-list-item-subtitle class="text-caption">
                      SEO Score: {{ suggestion.seoScore }}/100
                    </v-list-item-subtitle>
                  </v-list-item>
                </v-list>
              </div>

              <!-- SEO Analysis -->
              <v-card variant="tonal" class="pa-3 mt-4" v-if="selectedName">
                <h6 class="text-subtitle-2 font-weight-bold mb-2">
                  SEO Analysis
                </h6>
                <div class="seo-metrics">
                  <div class="d-flex justify-space-between mb-2">
                    <span class="text-caption">Search Volume</span>
                    <span class="text-caption font-weight-medium">{{
                      selectedName.searchVolume
                    }}</span>
                  </div>
                  <div class="d-flex justify-space-between mb-2">
                    <span class="text-caption">Competition</span>
                    <span class="text-caption font-weight-medium">{{
                      selectedName.competition
                    }}</span>
                  </div>
                  <div class="d-flex justify-space-between">
                    <span class="text-caption">Domain Availability</span>
                    <v-chip
                      :color="
                        selectedName.domainAvailable ? 'success' : 'error'
                      "
                      size="x-small"
                    >
                      {{ selectedName.domainAvailable ? "Available" : "Taken" }}
                    </v-chip>
                  </div>
                </div>
              </v-card>
            </v-card>

            <!-- Market Validation Checklist -->
            <v-card variant="outlined" class="pa-4 mb-4">
              <v-card-title class="d-flex align-center mb-4">
                <v-icon color="info" class="mr-2">mdi-clipboard-check</v-icon>
                <span class="text-h5">Validation Checklist</span>
              </v-card-title>

              <v-list density="compact" class="pa-0">
                <v-list-item
                  v-for="item in validationChecklist"
                  :key="item.id"
                  class="pa-0 mb-2"
                >
                  <template v-slot:prepend>
                    <v-checkbox
                      v-model="item.completed"
                      :color="item.completed ? 'success' : 'grey'"
                      hide-details
                    ></v-checkbox>
                  </template>
                  <v-list-item-title class="text-body-2">
                    {{ item.task }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>

              <div class="text-center mt-4">
                <div class="text-h6 font-weight-bold text-primary">
                  {{ completedChecklistItems }}/{{ validationChecklist.length }}
                </div>
                <div class="text-caption text-grey">
                  Validation Steps Completed
                </div>
              </div>
            </v-card>

            <!-- Quick Actions -->
            <v-card variant="outlined" class="pa-4">
              <v-card-title class="text-h6 mb-3">Quick Actions</v-card-title>
              <v-btn
                color="primary"
                variant="outlined"
                block
                prepend-icon="mdi-magnify"
                @click="conductMarketResearch"
                class="mb-2"
              >
                Conduct Market Research
              </v-btn>
              <v-btn
                color="secondary"
                variant="outlined"
                block
                prepend-icon="mdi-account-group"
                @click="surveyTargetUsers"
                class="mb-2"
              >
                Survey Target Users
              </v-btn>
              <v-btn
                color="info"
                variant="outlined"
                block
                prepend-icon="mdi-chart-line"
                @click="analyzeCompetitors"
              >
                Analyze Competitors
              </v-btn>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

interface BusinessSnapshot {
  idea: string;
  targetUser: string;
  userPain: string;
  competitorRevenue: string;
  marketSize: string;
  marketGrowth: string;
}

interface Competitor {
  id: number;
  name: string;
  strengths: string;
  weaknesses: string;
  differentiation: string;
}

interface NameSuggestion {
  name: string;
  seoScore: number;
  searchVolume: string;
  competition: string;
  domainAvailable: boolean;
  selected: boolean;
}

interface ValidationItem {
  id: number;
  task: string;
  completed: boolean;
}

// Reactive data
const businessSnapshot = ref<BusinessSnapshot>({
  idea: "",
  targetUser: "",
  userPain: "",
  competitorRevenue: "",
  marketSize: "",
  marketGrowth: "",
});

const competitors = ref<Competitor[]>([
  {
    id: 1,
    name: "Competitor A",
    strengths: "",
    weaknesses: "",
    differentiation: "",
  },
]);

const differentiationStrategy = ref("");

const appNaming = ref({
  currentName: "",
  suggestions: [] as NameSuggestion[],
});

const selectedName = ref<NameSuggestion | null>(null);

const validationChecklist = ref<ValidationItem[]>([
  { id: 1, task: "Define clear target audience", completed: false },
  { id: 2, task: "Identify user pain points", completed: false },
  { id: 3, task: "Research market size and growth", completed: false },
  { id: 4, task: "Analyze competitor landscape", completed: false },
  { id: 5, task: "Define unique value proposition", completed: false },
  { id: 6, task: "Validate with potential users", completed: false },
  { id: 7, task: "Check domain and trademark availability", completed: false },
  { id: 8, task: "Create MVP concept", completed: false },
]);

// Options
const revenueOptions = [
  "Yes, significant revenue",
  "Yes, moderate revenue",
  "Yes, minimal revenue",
  "No, not profitable",
  "Unknown",
];

// Computed properties
const validationScore = computed(() => {
  let score = 0;
  const totalFields = 6;

  if (businessSnapshot.value.idea) score += 16.67;
  if (businessSnapshot.value.targetUser) score += 16.67;
  if (businessSnapshot.value.userPain) score += 16.67;
  if (businessSnapshot.value.competitorRevenue) score += 16.67;
  if (businessSnapshot.value.marketSize) score += 16.67;
  if (businessSnapshot.value.marketGrowth) score += 16.67;

  return Math.round(score);
});

const completedChecklistItems = computed(() => {
  return validationChecklist.value.filter((item) => item.completed).length;
});

// Methods
function getValidationScoreColor() {
  if (validationScore.value >= 80) return "success";
  if (validationScore.value >= 60) return "warning";
  return "error";
}

function validateIdea() {
  // Implementation for idea validation
  console.log("Validating idea...");
}

function addCompetitor() {
  const newId = competitors.value.length + 1;
  competitors.value.push({
    id: newId,
    name: `Competitor ${newId}`,
    strengths: "",
    weaknesses: "",
    differentiation: "",
  });
}

function removeCompetitor(id: number) {
  competitors.value = competitors.value.filter((c) => c.id !== id);
}

function generateNameSuggestions() {
  // Simulate AI-generated name suggestions
  const suggestions = [
    {
      name: "TaskFlow Pro",
      seoScore: 85,
      searchVolume: "High",
      competition: "Medium",
      domainAvailable: true,
      selected: false,
    },
    {
      name: "ProductivityHub",
      seoScore: 78,
      searchVolume: "Medium",
      competition: "Low",
      domainAvailable: true,
      selected: false,
    },
    {
      name: "WorkSmart AI",
      seoScore: 92,
      searchVolume: "High",
      competition: "High",
      domainAvailable: false,
      selected: false,
    },
    {
      name: "EfficiencyBoost",
      seoScore: 73,
      searchVolume: "Medium",
      competition: "Low",
      domainAvailable: true,
      selected: false,
    },
  ];

  appNaming.value.suggestions = suggestions;
}

function selectName(suggestion: NameSuggestion) {
  // Deselect all other suggestions
  appNaming.value.suggestions.forEach((s) => (s.selected = false));
  // Select the clicked suggestion
  suggestion.selected = true;
  selectedName.value = suggestion;
}

function conductMarketResearch() {
  console.log("Conducting market research...");
}

function surveyTargetUsers() {
  console.log("Surveying target users...");
}

function analyzeCompetitors() {
  console.log("Analyzing competitors...");
}
</script>

<style scoped>
.selected-name {
  background-color: rgba(76, 175, 80, 0.1);
  border-radius: 8px;
}

.seo-metrics {
  background-color: rgba(0, 0, 0, 0.02);
  border-radius: 8px;
  padding: 12px;
}

/* Dark theme adjustments */
.v-theme--dark .selected-name {
  background-color: rgba(76, 175, 80, 0.2);
}

.v-theme--dark .seo-metrics {
  background-color: rgba(255, 255, 255, 0.05);
}
</style>
