<template>
  <v-sheet
    class="d-flex align-center justify-center"
    height="100vh"
    width="100vw"
    color="background"
  >
    <v-container fluid>
      <v-row class="d-flex justify-center">
        <!-- Left Column: Project Name -->
        <v-col cols="12" md="6" lg="4">
          <v-card
            class="mx-auto"
            max-width="500"
            color="surface"
            elevation="8"
            rounded="xl"
            variant="outlined"
          >
            <v-card-text class="pa-6">
              <div class="text-center mb-6">
                <h1 class="text-h3 font-weight-bold mb-2">
                  <span class="gradient-text">Smart Prompt</span>
                </h1>
                <p class="text-body-1 text-medium-emphasis">
                  Name your project and let AI guide you
                </p>
              </div>

              <v-textarea
                v-model="projectName"
                placeholder="Name your project"
                rounded="lg"
                auto-grow
                no-resize
                variant="outlined"
                color="primary"
                class="mb-4"
                bg-color="surface"
                rows="3"
              />

              <div class="d-flex justify-center">
                <v-btn
                  color="primary"
                  variant="elevated"
                  size="large"
                  @click="submitProject"
                  class="px-6"
                  prepend-icon="mdi-content-copy"
                >
                  Copy
                </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- Right Column: Project Description -->
        <v-col cols="12" md="6" lg="4">
          <v-card
            class="mx-auto"
            max-width="500"
            color="surface"
            elevation="8"
            rounded="xl"
            variant="outlined"
          >
            <v-card-text class="pa-6">
              <div class="text-center mb-6">
                <h1 class="text-h3 font-weight-bold mb-2">
                  <span class="gradient-text">Project Details</span>
                </h1>
                <p class="text-body-1 text-medium-emphasis">
                  Review and refine your project description
                </p>
              </div>

              <v-textarea
                v-model="projectDescription"
                placeholder="Describe your project..."
                rounded="lg"
                auto-grow
                no-resize
                variant="outlined"
                color="primary"
                class="mb-4"
                bg-color="surface"
                rows="4"
              />

              <div class="d-flex justify-center gap-3">
                <v-btn
                  color="secondary"
                  variant="outlined"
                  size="large"
                  @click="submitDescription"
                  class="px-6"
                  prepend-icon="mdi-pencil"
                >
                  Edit
                </v-btn>
                <v-btn
                  color="primary"
                  variant="elevated"
                  size="large"
                  @click="router.replace('/dashboard')"
                  class="px-6"
                  prepend-icon="mdi-check"
                >
                  Save Project
                </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const projectName = ref("");
const projectDescription = ref("");
const router = useRouter();

const submitProject = () => {
  console.log("Project Name:", projectName.value);
};

const submitDescription = () => {
  console.log("Project Description:", projectDescription.value);
};
</script>

<style scoped>
.gradient-text {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.v-card {
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

.v-btn {
  font-weight: 600;
  letter-spacing: 0.5px;
}

.v-textarea :deep(.v-field__outline) {
  border-color: rgba(102, 126, 234, 0.3) !important;
}

.v-textarea :deep(.v-field--focused .v-field__outline) {
  border-color: #667eea !important;
}

.gap-3 {
  gap: 12px;
}
</style>
